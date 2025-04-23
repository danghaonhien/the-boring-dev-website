import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

// Define props for the Header, including menu state from parent if needed
interface HeaderProps {
  isRevealed?: boolean; // Example prop, adjust as needed based on LandingPage logic
}

const Header: React.FC<HeaderProps> = ({ 
  isRevealed = true, // Default to revealed if not controlled by parent
}) => {
  const { user, signOut, loading } = useAuth();
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
      className={`w-full transition-all duration-1000 transform ${headerVisibilityClasses}`}
    >
      <div className="flex justify-between items-center">
        <div className="text-boring-dark font-bold text-2xl uppercase">
          {/* Link the logo back to home or landing page */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
             THE BORING DEV
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auth State Display - Show loading state briefly if needed */}
          {loading ? (
            <span className="text-sm text-gray-500">...</span>
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
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200 mb-1">
                    {/* Use full_name or username from profile data, fallback */}
                    <span className="font-medium">{user.full_name || user.username || 'User Name'}</span>
                    <span className="block text-xs text-gray-500">@{user.email || 'user@example.com'}</span>
                  </div>
                  <Link 
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false); // Close dropdown on sign out
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800 mt-1 border-t border-gray-200 pt-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-boring-dark hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm text-boring-dark font-medium bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
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