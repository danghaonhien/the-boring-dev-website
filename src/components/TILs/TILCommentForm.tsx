import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const TILCommentForm: React.FC<{ postId: string; onCommentAdded: () => void }> = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxLength = 500;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when it mounts
  useEffect(() => {
    if (textareaRef.current && user) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!user) {
      setError('Please sign in to post a comment.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Insert the comment
      const { error: commentError } = await supabase
        .from('til_comments')
        .insert([
          {
            content: comment.trim(),
            post_id: postId,
            user_id: user.id,
          },
        ]);

      if (commentError) throw commentError;

      setComment('');
      onCommentAdded();
    } catch (err: any) {
      console.error('Error posting comment:', err);
      setError(err.message || 'Failed to post your comment. Please try again.');
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
    const selectedText = comment.substring(start, end);
    
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
    
    const newComment = comment.substring(0, start) + formattedText + comment.substring(end);
    
    if (newComment.length <= maxLength) {
      setComment(newComment);
      // Give React time to update the textarea value before attempting to set selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  return (
    <div className="mt-2">
      {user ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-5 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
            <textarea
              ref={textareaRef}
              className="w-full p-3 border-none outline-none dark:bg-gray-800 dark:text-boring-offwhite resize-none"
              placeholder="Add to the discussion"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
              disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="22" y1="7" x2="2" y2="7"></line>
                  </svg>
                </button>
              </div>
              
              <div className="ml-auto">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.length}/{maxLength}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Supports markdown formatting
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setComment('')}
                className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={isSubmitting || !comment.trim()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  !comment.trim()
                    ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-boring-main text-white dark:bg-boring-blue-bold hover:bg-boring-blue-bold dark:hover:bg-boring-blue-light focus:outline-none transition-colors'
                }`}
              >
                {isSubmitting ? 'Posting...' : 'Submit'}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-2 text-xs text-red-500 dark:text-red-400">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-boring-dark-surface2">
          Please sign in to join the discussion.
        </div>
      )}
    </div>
  );
};

export default TILCommentForm; 