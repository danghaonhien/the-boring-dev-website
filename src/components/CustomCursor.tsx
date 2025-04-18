import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // Start hidden

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) {
        setIsVisible(true); // Show cursor once mouse moves
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false); // Hide cursor when mouse leaves window
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true); // Show cursor when mouse enters window
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Clean up listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]); // Re-run if isVisible changes to attach/detach listeners correctly

  return (
    <div 
      className={`fixed pointer-events-none z-50 transition-opacity duration-100 ease-linear ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${position.x}px`, 
        top: `${position.y}px`,
        // Style the cursor: Adjust size, color, border as needed
        width: '40px', 
        height: '40px', 
        border: '2px solid black', // Black border
        borderRadius: '50%', // Make it a circle
        transform: 'translate(-50%, -50%)', // Center the circle on the cursor position
        mixBlendMode: 'difference', // Creates effect similar to image over text
        backgroundColor: 'white', // Needed for mix-blend-mode difference
      }}
    />
  );
};

export default CustomCursor; 