import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabaseClient'; // Add this import
import { createPortal } from 'react-dom';

// Define props for the Header, including menu state from parent if needed
interface HeaderProps {
  isRevealed?: boolean; // Example prop, adjust as needed based on LandingPage logic
}

const Header: React.FC<HeaderProps> = ({ 
  isRevealed = true, // Default to revealed if not controlled by parent
}) => {
  const { user, signOut, loading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  // Determine visibility based on reveal state (passed as prop)
  const headerVisibilityClasses = isRevealed ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0';

  // Calculate dropdown position when it's toggled
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // Add some spacing
        right: window.innerWidth - rect.right - window.scrollX
      });
    }
    
    // Handle animation states
    if (isDropdownOpen) {
      setIsAnimating(true);
    } else {
      // Wait for animation to complete before fully closing
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 200); // Match this to the animation duration
      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  // Fetch profile data including avatar when user changes
  useEffect(() => {
    async function fetchProfileData() {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching avatar:', error);
          } else if (data?.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        } catch (error) {
          console.error('Error in profile fetch:', error);
        }
      }
    }
    
    fetchProfileData();
  }, [user?.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  // Function to render the user icon
  const renderUserIcon = () => {
    if (avatarUrl) {
      return (
        <img 
          id="user-avatar-img"
          src={avatarUrl}
          alt="User avatar" 
          className={`w-8 h-8 rounded-full object-cover transition-all ${
            isDropdownOpen ? 'ring-2 ring-boring-main dark:ring-boring-main ring-offset-2 dark:ring-offset-boring-dark' : ''
          }`}
          onError={(e) => {
            console.log("Avatar failed to load, falling back to default icon");
            // If avatar fails to load, hide it and show fallback
            e.currentTarget.style.display = 'none';
            setAvatarUrl(null); // Clear the avatar URL state to trigger fallback
          }}
        />
      );
    }
    
    return (
      <div className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center transition-all ${
        isDropdownOpen ? 'ring-2 ring-boring-main dark:ring-boring-main ring-offset-2 dark:ring-offset-boring-dark' : ''
      }`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-gray-700 dark:text-gray-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </div>
    );
  };

  // Dropdown Portal renders directly to the body
  const DropdownPortal = () => {
    if (!isAnimating) return null;
    
    return createPortal(
      <div 
        ref={dropdownRef}
        className={`fixed w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-[9999] border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-out transform origin-top-right ${
          isDropdownOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        }`}
        style={{
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
        }}
      >
        <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 mb-1">
          {/* Use full_name or username from profile data, fallback */}
          <span className="font-medium">{user?.full_name || user?.username || 'User Name'}</span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">@{user?.email || 'user@example.com'}</span>
        </div>
        <Link 
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white w-full text-left"
          onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
        >
          Dashboard
        </Link>
        <Link 
          to="/settings" 
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white w-full text-left"
          onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
        >
          Settings
        </Link>
        <button 
          onClick={() => {
            signOut();
            setIsDropdownOpen(false); // Close dropdown on sign out
          }} 
          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-800 dark:hover:text-red-300 mt-1 border-t border-gray-200 dark:border-gray-700 pt-2"
        >
          Sign Out
        </button>
      </div>,
      document.body
    );
  };

  return (
    <header
      className={`relative overflow-visible w-full p-6 md:p-12 lg:p-12 bg-offwhite dark:bg-boring-dark ${headerVisibilityClasses}`}
    >
      <div className="flex justify-between items-center">
        <div className="text-boring-dark dark:text-boring-offwhite font-bold text-2xl uppercase">
          {/* Link the logo back to home or landing page */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
             THE BORING DEV
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Dark mode switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-boring-dark text-boring-dark dark:text-boring-offwhite hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>
          {/* Auth State Display - Show loading state briefly if needed */}
          {loading ? (
            <span className="text-sm text-gray-500 dark:text-gray-400">...</span>
          ) : user ? (
            <div className="relative">
              <button 
                ref={buttonRef}
                onClick={async () => {
                  // Refresh avatar when dropdown is opened
                  if (!isDropdownOpen && user?.id) {
                    try {
                      // Try to fetch fresh avatar data
                      const { data, error } = await supabase
                        .from('profiles')
                        .select('avatar_url')
                        .eq('id', user.id)
                        .single();
                        
                      if (error) {
                        console.error('Error refreshing avatar:', error);
                      } else if (data?.avatar_url) {
                        setAvatarUrl(data.avatar_url);
                      }
                    } catch (error) {
                      console.error('Unexpected error refreshing avatar:', error);
                    }
                  }
                  setIsDropdownOpen(!isDropdownOpen);
                }} 
                className="focus:outline-none"
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
              >
                {renderUserIcon()}
              </button>
              
              {/* Dropdown Menu Portal */}
              <DropdownPortal />
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-sm text-boring-dark dark:text-boring-offwhite hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 