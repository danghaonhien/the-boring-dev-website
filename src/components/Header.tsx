import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

// Define props for the Header, including menu state from parent if needed
interface HeaderProps {
  isRevealed?: boolean; // Example prop, adjust as needed based on LandingPage logic
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isRevealed = true, // Default to revealed if not controlled by parent
  isMenuOpen = false, // Default state
  toggleMenu = () => {} // Default no-op function
}) => {
  const { user, signOut, loading } = useAuth();

  // Determine visibility based on reveal state (passed as prop)
  const headerVisibilityClasses = isRevealed ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none';

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
            <>
              {/* Display user email or link to profile page later */}
              <span className="text-sm text-boring-dark hidden sm:inline">{user.email}</span>
              <button
                onClick={signOut}
                className="text-sm text-boring-dark hover:underline"
              >
                Sign Out
              </button>
            </>
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

          {/* Menu Toggle Button (State managed by parent via props) */}
          <button
            className="text-boring-dark text-4xl font-bold z-30 relative"
            onClick={toggleMenu} // Use the function passed via props
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            disabled={!isRevealed} // Disable if the header isn't fully revealed
          >
            {isMenuOpen ? '\u00D7' : '+'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 