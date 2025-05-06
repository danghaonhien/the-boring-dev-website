import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TILCommentProps {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  username?: string;
  avatar_url?: string;
  post_id: string;
  onDelete: (id: string) => void;
}

const TILComment: React.FC<TILCommentProps> = ({
  id,
  content,
  created_at,
  user_id,
  username,
  avatar_url,
  post_id,
  onDelete
}) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!username) return '?';
    
    // Split by spaces, dash, or underscore and get first character of each part
    const parts = username.split(/[\s_-]/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    
    // Just get the first 1-2 characters of the username
    return username.slice(0, Math.min(2, username.length)).toUpperCase();
  };

  // Get random color based on username for avatar background
  const getAvatarColor = () => {
    if (!username) return '#718096'; // Default gray
    
    // Simple hash function to get consistent color for same username
    const hash = username.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Get a hue between 0-360 degrees
    const hue = Math.abs(hash % 360);
    
    // Use HSL to get a pleasing color with fixed saturation and lightness
    return `hsl(${hue}, 70%, 60%)`;
  };

  const handleDelete = async () => {
    if (!user || user.id !== user_id) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('til_comments')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Call the parent's onDelete function
      onDelete(id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  return (
    <div className="py-3 px-1">
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
          {avatar_url ? (
            <img 
              src={avatar_url} 
              alt={`${username}'s avatar`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.background = getAvatarColor();
                e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-xs font-bold">${getInitials()}</div>`;
              }}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-white text-xs font-bold" 
              style={{ background: getAvatarColor() }}
            >
              {getInitials()}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-medium text-sm text-gray-900 dark:text-boring-offwhite">
                {username || 'Anonymous'}
                {user && user.id === user_id && 
                  <span className="ml-1 text-xs text-blue-500 dark:text-blue-400">(You)</span>
                }
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{timeAgo}</span>
            </div>
            
            {user && user.id === user_id && !showDeleteConfirm && (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 text-xs"
                disabled={isDeleting}
              >
                Delete
              </button>
            )}
            
            {showDeleteConfirm && (
              <div className="flex space-x-2">
                <button 
                  onClick={handleDelete}
                  className="text-red-500 dark:text-red-400 text-xs hover:text-red-700 dark:hover:text-red-300"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Confirm'}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-gray-500 dark:text-gray-400 text-xs hover:text-gray-700 dark:hover:text-gray-300"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-1 text-sm text-gray-800 dark:text-boring-offwhite break-words prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ children, ...props }) => (
                  <a className="text-boring-blue dark:text-boring-blue-bold hover:underline" {...props} target="_blank" rel="noopener noreferrer">{children}</a>
                ),
                code: ({ children, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return (
                    <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TILComment; 