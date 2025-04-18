import React, { useState, useEffect } from 'react';

interface WordCycleProps {
  words: string[];
  interval?: number; // Time each word is fully visible + transition time
  transitionDuration?: number; // Duration of the fade effect
  className?: string; // Allow passing additional classes for styling
}

const WordCycle: React.FC<WordCycleProps> = ({ 
  words,
  interval = 1000, // Default interval if not provided
  transitionDuration = 500, // Default transition duration
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  // Calculate the length of the longest word
  useEffect(() => {
    if (words && words.length > 0) {
      const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");
      setMaxLength(longestWord.length);
    } else {
      setMaxLength(0);
    }
  }, [words]); // Recalculate if the words array changes

  // Word cycling logic
  useEffect(() => {
    if (words.length <= 1) return;

    const fadeOutTimeout = setTimeout(() => {
      setIsFading(true);
      const changeWordTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsFading(false);
      }, transitionDuration);
      return () => clearTimeout(changeWordTimeout);
    }, interval - transitionDuration);

    return () => clearTimeout(fadeOutTimeout);
  }, [currentIndex, words, interval, transitionDuration]);

  return (
    <span 
      className={`inline-block transition-opacity ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'} ${className}`}
      style={{
        transitionDuration: `${transitionDuration}ms`,
        minWidth: `${maxLength}ch`, // Set min-width based on the longest word's character count
        textAlign: 'left', // Align text to the left within the container
      }} 
    >
      {/* Display the current word or a placeholder if empty */}
      {words[currentIndex] || ''}
    </span>
  );
};

export default WordCycle; 