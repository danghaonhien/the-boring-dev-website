import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { useTheme } from '../context/ThemeContext';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine visibility based on reveal state (passed as prop)
  const headerVisibilityClasses = isRevealed ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`w-full p-6 md:p-12 lg:p-12  bg-offwhite dark:bg-boring-dark ${headerVisibilityClasses}`}
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
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="focus:outline-none"
                aria-label="User menu"
              >
                {/* Placeholder Avatar - Replace with actual user image if available */}
                <img 
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=A0AEC0&color=FFFFFF&size=32&rounded=true&bold=true`} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-boring-dark rounded-lg shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-boring-offwhite border-b border-gray-200 dark:border-gray-700 mb-1">
                    {/* Use full_name or username from profile data, fallback */}
                    <span className="font-medium">{user.full_name || user.username || 'User Name'}</span>
                    <span className="block text-xs text-gray-500 dark:text-boring-offwhite/70">@{user.email || 'user@example.com'}</span>
                  </div>
                  <Link 
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-boring-offwhite hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-boring-main w-full text-left z-50"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-boring-offwhite hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-boring-main w-full text-left z-50"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false); // Close dropdown on sign out
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-800 mt-1 border-t border-gray-200 dark:border-gray-700 pt-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-boring-dark dark:text-boring-offwhite hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm text-boring-dark dark:text-boring-offwhite font-medium bg-gray-200 dark:bg-boring-dark px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 