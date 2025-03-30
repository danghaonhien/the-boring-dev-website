import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLink, MagneticButton } from './EnhancedInteractiveElements';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-boring-dark py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-boring-offwhite font-bold text-xl hover:opacity-90 transition-opacity">
            The Boring Dev
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-boring-offwhite focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <AnimatedLink href="#projects" className="text-boring-offwhite hover:text-opacity-90 transition-colors">
              Projects
            </AnimatedLink>
            <AnimatedLink href="#" className="text-boring-offwhite hover:text-opacity-90 transition-colors">
              About
            </AnimatedLink>
            <AnimatedLink href="#" className="text-boring-offwhite hover:text-opacity-90 transition-colors">
              Contact
            </AnimatedLink>
            <MagneticButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all">
              Get In Touch
            </MagneticButton>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <a href="#projects" className="text-boring-offwhite hover:text-opacity-90 transition-colors p-2">
              Projects
            </a>
            <a href="#" className="text-boring-offwhite hover:text-opacity-90 transition-colors p-2">
              About
            </a>
            <a href="#" className="text-boring-offwhite hover:text-opacity-90 transition-colors p-2">
              Contact
            </a>
            <a href="#" className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all text-center">
              Get In Touch
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 