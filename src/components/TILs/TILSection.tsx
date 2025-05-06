import React, { useState, useEffect } from 'react';
import TILPostForm from './TILPostForm';
import TILFeed from './TILFeed';
import { useAuth } from '../../context/AuthContext';

type SortOption = 'recent' | 'popular';

const TILSection: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const { user } = useAuth();

  // Get the header text based on sorting option
  const getSortHeaderText = () => {
    return sortBy === 'recent' ? 'Recent Posts' : 'Most Popular Posts';
  };

  const handlePostCreated = () => {
    // Increment the key to force a refresh of the feed
    setRefreshKey(prev => prev + 1);
  };

  const handleSortChange = (option: SortOption) => {
    if (option === sortBy) return;
    setSortBy(option);
    setIsDropdownOpen(false);
    // Reset view to initial 5 posts when sort changes
    setShowAllPosts(false);
    // Refresh the feed with the new sort option
    setRefreshKey(prev => prev + 1);
  };

  // Toggle between showing all posts and just the first 5
  const toggleShowAllPosts = () => {
    setShowAllPosts(prev => !prev);
  };
  
  // Update total post count from TILFeed
  const updateTotalPostCount = (count: number) => {
    setTotalPostCount(count);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && 
          event.target && 
          !(event.target as HTMLElement).closest('.sort-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-boring-dark">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-boring-dark dark:text-boring-offwhite">
            Today I Learned
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Share a new tip, resource, or lesson with the community.
          </p>
          {!user && (
            <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-100 dark:border-amber-900/30">
              <strong>Sign in</strong> to share your own tips and like posts from others.
            </div>
          )}
        </div>

        <div className="mb-6">
          <TILPostForm onPostCreated={handlePostCreated} />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div 
              className="flex items-center relative group"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h3 className="text-xl font-semibold text-boring-dark dark:text-boring-offwhite mr-2">
                {getSortHeaderText()}
              </h3>
              
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`p-1 rounded transition-all ${isHeaderHovered || isDropdownOpen ? 'opacity-100' : 'opacity-0'} text-gray-500 hover:text-boring-blue dark:text-gray-400 dark:hover:text-boring-blue-bold focus:outline-none`}
                  aria-label="Sort options"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1 border border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => handleSortChange('recent')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortBy === 'recent'
                          ? 'bg-gray-100 dark:bg-gray-700 text-boring-blue dark:text-boring-blue-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Most Recent
                    </button>
                    <button 
                      onClick={() => handleSortChange('popular')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortBy === 'popular'
                          ? 'bg-gray-100 dark:bg-gray-700 text-boring-blue dark:text-boring-blue-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Most Popular
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
              aria-label="Refresh posts"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          
          <TILFeed 
            key={refreshKey} 
            sortBy={sortBy} 
            showAllPosts={showAllPosts} 
            onTotalCountUpdate={updateTotalPostCount} 
          />
          
          {!showAllPosts && totalPostCount > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={toggleShowAllPosts}
                className="px-4 py-2 bg-boring-slate text-white rounded-md hover:bg-boring-blue-bold transition-colors"
              >
                View More
              </button>
            </div>
          )}
          {showAllPosts && totalPostCount > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={toggleShowAllPosts}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Show Less
              </button>
            </div>
          )}
          
          {/* <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
              For administrators: If you're seeing errors, make sure to run the database setup script from 
              <code className="mx-1 px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">src/components/TILs/setup_db.sql</code>
              in your Supabase SQL editor.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default TILSection; 