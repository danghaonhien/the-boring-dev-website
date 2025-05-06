import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import TILComment from './TILComment';
import TILCommentForm from './TILCommentForm';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  post_id: string;
  username?: string;
  avatar_url?: string;
}

interface TILCommentSectionProps {
  postId: string;
  initialCount: number;
  onCommentCountChange?: (count: number) => void;
}

const TILCommentSection: React.FC<TILCommentSectionProps> = ({ 
  postId, 
  initialCount,
  onCommentCountChange 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState(initialCount);

  // Update the commentCount and notify parent component
  const updateCommentCount = (count: number) => {
    setCommentCount(count);
    if (onCommentCountChange) {
      onCommentCountChange(count);
    }
  };

  const loadComments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('til_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (commentsError) throw commentsError;
      
      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        updateCommentCount(0);
        setLoading(false);
        return;
      }
      
      // Get user profiles 
      const userIds = commentsData.map(comment => comment.user_id);
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);
      
      // Create a map of user profiles
      const profilesMap = (profilesData || []).reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, any>);
      
      // Format comments with user data
      const formattedComments = commentsData.map(comment => {
        const profile = profilesMap[comment.user_id] || {};
        return {
          ...comment,
          username: profile.username || comment.user_id?.split('-')[0] || 'Anonymous',
          avatar_url: profile.avatar_url
        };
      });
      
      setComments(formattedComments);
      updateCommentCount(formattedComments.length);
    } catch (err: any) {
      console.error('Error loading comments:', err);
      setError('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  // Load comments when component mounts
  useEffect(() => {
    loadComments();
    
    // Setup subscription for real-time updates
    const commentsSubscription = supabase
      .channel(`til_comments_${postId}`)
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'til_comments', filter: `post_id=eq.${postId}` }, 
          (payload) => {
            loadComments(); // Reload comments when a new one is added
          })
      .on('postgres_changes', 
          { event: 'DELETE', schema: 'public', table: 'til_comments' }, 
          (payload) => {
            // Check if deleted comment belongs to this post
            if (payload.old && payload.old.post_id === postId) {
              setComments(current => current.filter(comment => comment.id !== payload.old.id));
              const newCount = commentCount - 1;
              updateCommentCount(newCount);
            }
          })
      .subscribe();
    
    return () => {
      supabase.removeChannel(commentsSubscription);
    };
  }, [postId]);

  const handleCommentAdded = () => {
    loadComments();
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments(current => current.filter(comment => comment.id !== commentId));
    const newCount = commentCount - 1;
    updateCommentCount(newCount);
  };

  return (
    <div className="animate-fadeIn">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-boring-offwhite"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400 text-xs py-3 text-center">
          {error}
        </div>
      ) : (
        <>
          {comments.length > 0 && (
            <div className="mb-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {comments.map(comment => (
                  <TILComment
                    key={comment.id}
                    id={comment.id}
                    content={comment.content}
                    created_at={comment.created_at}
                    user_id={comment.user_id}
                    username={comment.username}
                    avatar_url={comment.avatar_url}
                    post_id={comment.post_id}
                    onDelete={handleCommentDeleted}
                  />
                ))}
              </div>
            </div>
          )}

          <TILCommentForm postId={postId} onCommentAdded={handleCommentAdded} />
          
          {comments.length === 0 && !loading && (
            <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-2 mt-2">
              No comments yet. Be the first to comment!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TILCommentSection; 