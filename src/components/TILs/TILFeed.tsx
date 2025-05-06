import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import TILCard from './TILCard';
import { useAuth } from '../../context/AuthContext';

interface TILPost {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  username?: string;
  avatar_url?: string;
  likes_count: number;
  comments_count: number;
  liked_by_user: boolean;
}

type SortOption = 'recent' | 'popular';

interface TILFeedProps {
  sortBy: SortOption;
  showAllPosts?: boolean;
  onTotalCountUpdate?: (count: number) => void;
}

const TILFeed: React.FC<TILFeedProps> = ({ 
  sortBy, 
  showAllPosts = false, 
  onTotalCountUpdate 
}) => {
  const [posts, setPosts] = useState<TILPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load posts from Supabase
  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simple query first - doesn't rely on foreign key relationships
      const { data: postsData, error: postsError } = await supabase
        .from('til_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (postsError) {
        throw postsError;
      }

      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Get user profiles separately 
      const userIds = postsData.map(post => post.user_id);
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);

      // Create a map of user profiles
      const profilesMap = (profilesData || []).reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, any>);

      // Get all likes for these posts
      const { data: allLikesData } = await supabase
        .from('til_likes')
        .select('post_id, user_id')
        .in('post_id', postsData.map(post => post.id));

      // Get comment counts for these posts
      let commentCounts: Record<string, number> = {};
      try {
        // First get all comments
        const { data: allCommentsData } = await supabase
          .from('til_comments')
          .select('post_id')
          .in('post_id', postsData.map(post => post.id));
          
        // Count manually
        if (allCommentsData) {
          allCommentsData.forEach(comment => {
            commentCounts[comment.post_id] = (commentCounts[comment.post_id] || 0) + 1;
          });
        }
      } catch (error) {
        console.warn('Error counting comments:', error);
      }

      // Calculate like counts and user likes
      const likeCounts: Record<string, number> = {};
      let userLikes: Record<string, boolean> = {};
      
      if (allLikesData) {
        // Count likes for each post
        allLikesData.forEach(like => {
          likeCounts[like.post_id] = (likeCounts[like.post_id] || 0) + 1;
          
          // Check if current user liked this post
          if (user && like.user_id === user.id) {
            userLikes[like.post_id] = true;
          }
        });
      }

      // Format posts with profile data
      let formattedPosts = postsData.map(post => {
        const profile = profilesMap[post.user_id] || {};
        return {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user_id: post.user_id,
          username: profile.username || post.user_id?.split('-')[0] || 'Anonymous',
          avatar_url: profile.avatar_url,
          likes_count: likeCounts[post.id] || 0,
          comments_count: commentCounts[post.id] || 0,
          liked_by_user: !!userLikes[post.id]
        };
      });

      // Sort posts based on the current sort option
      if (sortBy === 'popular') {
        formattedPosts.sort((a, b) => b.likes_count - a.likes_count);
      }
      // If sortBy is 'recent', we've already sorted by created_at in the database query

      setPosts(formattedPosts);
      
      // Update the parent component with the total count of posts
      if (onTotalCountUpdate) {
        onTotalCountUpdate(formattedPosts.length);
      }
    } catch (err: any) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount, when user changes, or when sort option changes
  useEffect(() => {
    loadPosts();
    
    // Subscribe to new posts, updates, and deletes
    const postsSubscription = supabase
      .channel('public:til_posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'til_posts' }, (payload) => {
        loadPosts(); // Reload all posts when a new post is added
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'til_posts' }, (payload) => {
        // Handle deletes locally to avoid a full reload
        setPosts(current => {
          const filtered = current.filter(post => post.id !== payload.old.id);
          if (onTotalCountUpdate) {
            onTotalCountUpdate(filtered.length);
          }
          return filtered;
        });
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(postsSubscription);
    };
  }, [user?.id, sortBy]);

  // Handle post likes
  const handlePostLike = async (postId: string, liked: boolean) => {
    if (!user) return;

    try {
      if (liked) {
        // Add like
        await supabase
          .from('til_likes')
          .insert([
            { post_id: postId, user_id: user.id }
          ]);
      } else {
        // Remove like
        await supabase
          .from('til_likes')
          .delete()
          .match({ post_id: postId, user_id: user.id });
      }

      // If sorting by popularity, update the sort order after a like/unlike
      if (sortBy === 'popular') {
        const updatedPosts = [...posts];
        const index = updatedPosts.findIndex(post => post.id === postId);
        if (index !== -1) {
          updatedPosts[index] = {
            ...updatedPosts[index],
            likes_count: liked ? updatedPosts[index].likes_count + 1 : updatedPosts[index].likes_count - 1,
            liked_by_user: liked
          };
          // Re-sort the posts
          updatedPosts.sort((a, b) => b.likes_count - a.likes_count);
          setPosts(updatedPosts);
        }
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      // The UI was already updated optimistically, so we don't need to do anything else here
    }
  };

  // Handle post deletion
  const handlePostDelete = (postId: string) => {
    setPosts(current => {
      const filtered = current.filter(post => post.id !== postId);
      if (onTotalCountUpdate) {
        onTotalCountUpdate(filtered.length);
      }
      return filtered;
    });
  };

  // Get the posts to display based on the showAllPosts prop
  const displayPosts = showAllPosts ? posts : posts.slice(0, 5);

  return (
    <div>
      {loading && posts.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-boring-offwhite"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400 text-center py-8">
          {error}
          <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
            <p>Make sure you have run the database setup script from:</p>
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/components/TILs/setup_db.sql</code>
          </div>
        </div>
      ) : (
        <div>
          {posts.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              No posts yet. Be the first to share!
            </div>
          ) : (
            <div>
              {displayPosts.map(post => (
                <TILCard
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  created_at={post.created_at}
                  user_id={post.user_id}
                  username={post.username || 'Anonymous'}
                  avatar_url={post.avatar_url}
                  likes_count={post.likes_count}
                  comments_count={post.comments_count}
                  liked_by_user={post.liked_by_user}
                  onLike={handlePostLike}
                  onDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TILFeed; 