import React, { useState, useEffect, useRef } from 'react';
import { MagneticButton } from './EnhancedInteractiveElements';

// Array of slogans (with quotes)
const slogans = [
  "\"Low-key building, high-key tired.\"",


  "\"We ship vibes, not features.\"",
  "\"Just some pixels, code, and existential dread.\"",

  "\"Join us. We have bugs and emotional support.\"",
  "\"For devs, designers, and digital gremlins.\"",
  "\"Quietly quitting hustle culture since 2025.\"",
  "\"Your side project's safe space.\"",

  "\"We don't move fast. We don't break things. We nap.\"",
  "\"Code. Cry. Coffee. Repeat.\"",

  "\"Your daily dose of 'meh, it compiles.'\"",
  "\"Building quietly. Judging loudly.\"",

  "\"It's not a bug, it's a feature. Of my personality.\"",
  "\"We believe in clean code and emotional chaos.\"",
  "\"Welcome to the soft launch of your burnout.\"",
  "\"Minimalist tools for maximalist overthinkers.\"",
  "\"We make stuff. Sometimes on purpose.\"",
  "\"Community for devs who can't even.\"",

  "\"Let's pretend we're working together.\"",
  "\"Code is temporary. Regret is forever.\"",
  "\"We write code and cry in Tailwind.\"",

  "\"Powered by caffeine, memes, and bad decisions.\"",
  "\"A portfolio site. A cry for help. Same thing.\"",
  "\"For devs who don't want to network. Just lurk.\"",
  "\"Where burnout meets minimalism.\"",

  "\"✨Functionally stable. Emotionally debuggable.✨\"",
  "\"Silently judging your semicolons.\"",
  "\"The Wi-Fi's mid but the vibes are immaculate.\"",
  "\"Where side projects go to chill, not die.\"",
  "\"This is not a drill. It's a dropdown menu.\"",
  "\"A soft space for hard refreshes.\"",
  "\"Currently compiling our self-worth.\"",

  "\"We don't push to main on Fridays. We cry.\"",
  "\"Helping devs feel seen (but not too seen).\"",
  "\"All the bugs. None of the blame.\"",
  "\"It's giving… broken production.\"",


  "\"A calm corner of the internet with mild chaos.\"",
  "\"Deploying our feelings since forever.\"",
  "\"We test in prod and heal in community.\"",
  "\"Hot takes. Cold brews. Lukewarm motivation.\"",
  "\"No hustle, no clout, just Ctrl+Z.\"",
  "\"Emotionally available. Barely scalable.\"",
  "\"An open-source cry for help.\""
];

const defaultSlogan = "\"Low-key building, high-key tired.\""; // Default with quotes
// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?*%$#@_-'; // No longer needed globally

const SloganGenerator = () => {
  const [targetSlogan, setTargetSlogan] = useState(defaultSlogan); // The actual slogan we want to show
  const [displayText, setDisplayText] = useState(defaultSlogan); // What's currently shown (can be shuffled)
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to generate a random string of a given length using characters from the target
  const generateRandomString = (length: number, allowedChars: string): string => {
    let result = '';
    const uniqueChars = Array.from(new Set(allowedChars.replace(/\s/g, ''))).join('') || ' '; // Use unique non-space chars, fallback to space
    
    for (let i = 0; i < length; i++) {
      result += uniqueChars.charAt(Math.floor(Math.random() * uniqueChars.length));
    }
    return result;
  };

  // Function to generate a new random slogan and trigger animation
  const generateNewSlogan = () => {
    if (isAnimating) return; // Prevent starting animation if already running

    let newSlogan = targetSlogan;
    // Ensure the new slogan is different from the current one, unless there's only one slogan
    if (slogans.length > 1) {
      while (newSlogan === targetSlogan) {
        const randomIndex = Math.floor(Math.random() * slogans.length);
        newSlogan = slogans[randomIndex];
      }
    } else if (slogans.length === 1) {
      newSlogan = slogans[0]; // Just set it if there's only one
    } else {
      newSlogan = "No slogans available."; // Handle empty array case
    }

    if (newSlogan === targetSlogan && slogans.length > 1) return; // Do nothing if the slogan didn't change

    setTargetSlogan(newSlogan); // Update the target slogan
    setIsAnimating(true);

    const animationDuration = 600; // Total animation time (ms)
    const shuffleInterval = 40;   // How often to change characters (ms)
    const targetLength = newSlogan.length;
    const allowedCharsForShuffle = newSlogan; // Use the new slogan's characters

    // Clear previous timers if any
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Start shuffling
    intervalRef.current = setInterval(() => {
      setDisplayText(generateRandomString(targetLength, allowedCharsForShuffle));
    }, shuffleInterval);

    // Stop shuffling after animationDuration
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsAnimating(false);
      setDisplayText(newSlogan); // Set the final target slogan
      intervalRef.current = null;
      timeoutRef.current = null;
    }, animationDuration);
  };

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="group flex flex-col md:flex-row md:items-center mb-4 z-10 relative min-h-[9em] md:min-h-[3em]">
      <p className={`text-boring-dark font-medium text-3xl md:text-xl lg:text-[3rem] tracking-tight flex-grow md:mr-4 transition-opacity duration-200 ${isAnimating ? 'whitespace-nowrap overflow-hidden md:overflow-visible leading-normal' : 'leading-tight'}`}>
        {displayText}
      </p>
      <div className="mt-3 md:mt-0 flex-shrink-0">
        <button
          onClick={generateNewSlogan}
          className={`relative overflow-hidden group flex justify-center items-center text-boring-dark border border-boring-dark/30 rounded-full px-4 py-1 text-sm transition-colors duration-300 ease-in-out whitespace-nowrap ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-boring-dark hover:text-boring-offwhite hover:border-boring-dark'}`}
          aria-label="Generate new slogan"
          disabled={isAnimating}
        >
          {isAnimating ? (
            <span className="inline-block">Generating...</span>
          ) : (
            <span className="relative block overflow-hidden">
              <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                Generate
              </span>
              <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                Generate
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SloganGenerator; 