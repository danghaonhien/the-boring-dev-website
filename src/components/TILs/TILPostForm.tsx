import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';

interface TILPostFormProps {
  onPostCreated: () => void;
}

const TILPostForm: React.FC<TILPostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You need to be logged in to post');
      return;
    }
    
    if (!content.trim()) {
      setError('Post cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // Check if the til_posts table exists
      const { count, error: checkError } = await supabase
        .from('til_posts')
        .select('*', { count: 'exact', head: true });
      
      if (checkError && checkError.message.includes('does not exist')) {
        throw new Error('The til_posts table does not exist. Please run the setup_db.sql script first.');
      }
      
      // Insert new post
      const { data, error: insertError } = await supabase
        .from('til_posts')
        .insert([
          { content: content.trim(), user_id: user.id }
        ]);
      
      if (insertError) throw insertError;
      
      // Clear form and show success message
      setContent('');
      setSuccessMessage('Your post was successfully created!');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      // Notify parent to refresh posts
      onPostCreated();
    } catch (err: any) {
      console.error('Error creating post:', err);
      
      if (err.message.includes('does not exist')) {
        setError('Database setup required. Please ask an administrator to run the setup script.');
      } else if (err.message.includes('permission denied')) {
        setError('You do not have permission to post. Please check your login status.');
      } else if (err.message.includes('foreign key constraint')) {
        setError('User profile not found. Please complete your profile first.');
      } else {
        setError(err.message || 'Failed to create post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-boring-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-boring-offwhite resize-none"
            placeholder="Share a new tip, resource, or lesson..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting || !user}
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{content.length}/500</span>
            {!user && <span className="text-amber-600 dark:text-amber-400">Sign in to post</span>}
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm mb-4 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="text-green-500 dark:text-green-400 text-sm mb-4 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30">
            {successMessage}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors
              ${(isSubmitting || !user) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || !user}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TILPostForm; 