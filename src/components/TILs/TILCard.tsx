import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import TILCommentSection from './TILCommentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TILCardProps {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  likes_count: number;
  comments_count: number;
  liked_by_user: boolean;
  onLike: (id: string, liked: boolean) => void;
  onDelete: (id: string) => void;
}

const TILCard: React.FC<TILCardProps> = ({
  id,
  content,
  created_at,
  user_id,
  username,
  avatar_url,
  likes_count,
  comments_count,
  liked_by_user,
  onLike,
  onDelete
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(liked_by_user);
  const [likesCount, setLikesCount] = useState(likes_count);
  const [commentsCount, setCommentsCount] = useState(comments_count);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = async () => {
    if (!user) return;
    if (isSaving) return;

    setIsSaving(true);
    const newLikedState = !isLiked;
    
    try {
      // Update UI optimistically
      setIsLiked(newLikedState);
      setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
      
      // Call the parent's onLike function
      onLike(id, newLikedState);
    } catch (error) {
      // Revert UI on error
      setIsLiked(!newLikedState);
      setLikesCount(prev => !newLikedState ? prev + 1 : prev - 1);
      console.error('Error toggling like:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user || user.id !== user_id) return;
    
    setIsDeleting(true);
    try {
      // First delete related likes
      await supabase
        .from('til_likes')
        .delete()
        .eq('post_id', id);
      
      // Then delete related comments
      await supabase
        .from('til_comments')
        .delete()
        .eq('post_id', id);
      
      // Finally delete the post
      const { error } = await supabase
        .from('til_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Call the parent's onDelete function
      onDelete(id);
    } catch (error) {
      console.error('Error deleting post:', error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

  const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
  
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

  // Handle click outside for options menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showOptions && 
          event.target && 
          !(event.target as HTMLElement).closest('.options-button')) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);
  
  // This callback will be passed to TILCommentSection 
  // to update comment count when comments are added or deleted
  const handleCommentCountChange = (newCount: number) => {
    setCommentsCount(newCount);
  };
  
  // Add a visual animation when the comment button is clicked
  const commentBtnRef = React.useRef<HTMLButtonElement>(null);
  
  const handleCommentClick = () => {
    // Add a small pulse animation to the button when clicked
    if (commentBtnRef.current) {
      commentBtnRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        if (commentBtnRef.current) {
          commentBtnRef.current.classList.remove('animate-pulse');
        }
      }, 300);
    }
    
    setShowComments(!showComments);
  };
  
  return (
    <div className="bg-white dark:bg-boring-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      {showDeleteConfirm ? (
        <div className="text-center py-8">
          <p className="text-gray-800 dark:text-boring-offwhite mb-4">
            Are you sure you want to delete this post?
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
            This action cannot be undone. All comments and likes will also be deleted.
          </p>
          <div className="space-x-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
              {isDeleting ? 'Deleting...' : 'Delete Post'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-boring-offwhite rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              {avatar_url ? (
                <img 
                  src={avatar_url} 
                  alt={`${username}'s avatar`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = getAvatarColor();
                    e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-sm font-bold">${getInitials()}</div>`;
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-white text-sm font-bold" 
                  style={{ background: getAvatarColor() }}
                >
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-boring-offwhite">
                    {username || 'Anonymous'}
                    {user && user.id === user_id && <span className="ml-2 text-xs text-blue-500 dark:text-blue-400">(You)</span>}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</div>
                </div>
                
                {user && user.id === user_id && (
                  <div className="relative options-button">
                    <button 
                      onClick={() => setShowOptions(!showOptions)}
                      className="hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label="Post options"
                      title="Post options"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                    
                    {showOptions && (
                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1 border border-gray-200 dark:border-gray-700">
                        <button 
                          onClick={() => {
                            setShowOptions(false);
                            setShowDeleteConfirm(true);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Delete post
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-4 text-gray-800 dark:text-boring-offwhite break-words prose prose-base max-w-none dark:prose-invert">
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
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <button 
              onClick={handleLikeClick}
              disabled={!user || isSaving}
              className={`flex items-center mr-4 ${!user ? 'opacity-60 cursor-not-allowed' : 'hover:text-gray-700 dark:hover:text-gray-300'} ${isLiked ? 'text-blue-500 dark:text-blue-400' : ''}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill={isLiked ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLiked ? 0 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount}
            </button>
            
            <button 
              ref={commentBtnRef}
              onClick={handleCommentClick}
              className={`flex items-center ${showComments ? 'text-blue-500 dark:text-blue-400' : ''} hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {commentsCount}
            </button>
          </div>
          
          {showComments && (
            <div 
              className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out opacity-100 max-h-[500px]"
            >
              <TILCommentSection 
                postId={id} 
                initialCount={commentsCount} 
                onCommentCountChange={handleCommentCountChange} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TILCard; 