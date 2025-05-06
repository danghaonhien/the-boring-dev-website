import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

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
  onLike
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(liked_by_user);
  const [likesCount, setLikesCount] = useState(likes_count);
  const [isSaving, setIsSaving] = useState(false);

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
  
  return (
    <div className="bg-white dark:bg-boring-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
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
        <div>
          <div className="font-medium text-gray-900 dark:text-boring-offwhite">
            {username || 'Anonymous'}
            {user && user.id === user_id && <span className="ml-2 text-xs text-blue-500 dark:text-blue-400">(You)</span>}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</div>
        </div>
      </div>
      
      <div className="mb-4 text-gray-800 dark:text-boring-offwhite whitespace-pre-wrap break-words">
        {content}
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
        
        <div className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {comments_count}
        </div>
        
        <div className="ml-auto">
          {user && user.id === user_id && (
            <button className="hover:text-gray-700 dark:hover:text-gray-300" title="More options">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TILCard; 