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

const TILFeed: React.FC = () => {
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
      const formattedPosts = postsData.map(post => {
        const profile = profilesMap[post.user_id] || {};
        return {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user_id: post.user_id,
          username: profile.username || post.user_id?.split('-')[0] || 'Anonymous',
          avatar_url: profile.avatar_url,
          likes_count: likeCounts[post.id] || 0,
          comments_count: 0, // Comments not implemented yet
          liked_by_user: !!userLikes[post.id]
        };
      });

      setPosts(formattedPosts);
    } catch (err: any) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount and when user changes
  useEffect(() => {
    loadPosts();
    
    // Subscribe to new posts
    const postsSubscription = supabase
      .channel('public:til_posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'til_posts' }, (payload) => {
        loadPosts(); // Reload all posts for simplicity
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(postsSubscription);
    };
  }, [user?.id]);

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
    } catch (err) {
      console.error('Error toggling like:', err);
      // The UI was already updated optimistically, so we don't need to do anything else here
    }
  };

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
      ) : posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
          No posts yet. Be the first to share!
        </div>
      ) : (
        <div>
          {posts.map(post => (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TILFeed; 