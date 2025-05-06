import React, { useState, useRef } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;
  
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

  // Format text functions
  const insertFormat = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = 0;
    
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = selectedText.length ? end + 4 : start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = selectedText.length ? end + 2 : start + 1;
        break;
      case 'link':
        formattedText = selectedText ? `[${selectedText}](url)` : '[](url)';
        newCursorPos = selectedText.length ? end + 6 : start + 3;
        break;
      case 'ordered-list':
        formattedText = selectedText ? `\n1. ${selectedText}` : '\n1. ';
        newCursorPos = start + formattedText.length;
        break;
      case 'unordered-list':
        formattedText = selectedText ? `\n- ${selectedText}` : '\n- ';
        newCursorPos = start + formattedText.length;
        break;
      case 'heading':
        formattedText = selectedText ? `\n## ${selectedText}` : '\n## ';
        newCursorPos = start + formattedText.length;
        break;
      case 'code':
        formattedText = selectedText ? `\`${selectedText}\`` : '``';
        newCursorPos = selectedText.length ? end + 2 : start + 1;
        break;
      case 'codeblock':
        formattedText = selectedText ? `\n\`\`\`\n${selectedText}\n\`\`\`\n` : '\n```\n\n```\n';
        newCursorPos = selectedText.length ? end + 8 : start + 5;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    
    if (newContent.length <= maxLength) {
      setContent(newContent);
      // Give React time to update the textarea value before attempting to set selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };
  
  return (
    <div className="bg-white dark:bg-boring-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
          <textarea
            ref={textareaRef}
            className="w-full p-3 border-none outline-none dark:bg-gray-800 dark:text-boring-offwhite resize-none"
            placeholder="Share a new tip, resource, or lesson..."
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting || !user}
            maxLength={maxLength}
          />
          
          <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-t border-gray-200 dark:border-gray-600 flex items-center flex-wrap">
            {/* Formatting toolbar */}
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <button 
                type="button" 
                onClick={() => insertFormat('bold')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Bold"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('italic')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Italic"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="4" x2="10" y2="4"></line>
                  <line x1="14" y1="20" x2="5" y2="20"></line>
                  <line x1="15" y1="4" x2="9" y2="20"></line>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('link')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Link"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('ordered-list')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Numbered List"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="9" y1="6" x2="20" y2="6"></line>
                  <line x1="9" y1="12" x2="20" y2="12"></line>
                  <line x1="9" y1="18" x2="20" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('unordered-list')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Bullet List"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('heading')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Heading"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12h12"></path>
                  <path d="M6 4h12"></path>
                  <path d="M9 4v16"></path>
                  <path d="M15 4v16"></path>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('code')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Inline Code"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormat('codeblock')}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                title="Code Block"
                disabled={!user}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="22" y1="7" x2="2" y2="7"></line>
                </svg>
              </button>
            </div>

            <div className="ml-auto">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {content.length}/{maxLength}
              </span>
            </div>
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
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {!user ? (
              <span className="text-amber-600 dark:text-amber-400">Sign in to post</span>
            ) : (
              <span>Supports markdown formatting</span>
            )}
          </div>
          
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