import React, { useState, useEffect, useRef } from 'react';
// Removed MagneticButton import as it wasn't used
// import { MagneticButton } from './EnhancedInteractiveElements';

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
  const [displayText, setDisplayText] = useState(defaultSlogan); // What's currently shown
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null); // Use requestAnimationFrame
  const revealedCountRef = useRef<number>(0); // Track revealed characters
  const lastUpdateTimeRef = useRef<number>(0); // Track time for reveal progression
  const shuffleCharsRef = useRef<string>(''); // Characters allowed for shuffling

  // Helper function to generate a random character from allowed set
  const getRandomChar = (allowedChars: string): string => {
    if (!allowedChars) return ' '; // Handle empty case
    return allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
  };

  // Function to generate a new random slogan and trigger animation
  const generateNewSlogan = () => {
    if (isAnimating) return; // Prevent re-triggering

    // --- Select New Slogan (same logic as before) ---
    let newSlogan = targetSlogan;
    if (slogans.length > 1) {
      while (newSlogan === targetSlogan) {
        const randomIndex = Math.floor(Math.random() * slogans.length);
        newSlogan = slogans[randomIndex];
      }
    } else if (slogans.length === 1) {
      newSlogan = slogans[0];
    } else {
      newSlogan = "No slogans available.";
    }
    if (newSlogan === targetSlogan && slogans.length > 1) return;
    // --- End Select New Slogan ---

    setTargetSlogan(newSlogan);
    setIsAnimating(true);
    revealedCountRef.current = 0; // Reset revealed count
    lastUpdateTimeRef.current = performance.now(); // Reset timer
    // Generate unique non-space characters from the new slogan for shuffling
    shuffleCharsRef.current = Array.from(new Set(newSlogan.replace(/\s/g, ''))).join('') || ' ';

    // Clear previous animation frame if any
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // --- Animation Loop using requestAnimationFrame ---
    const animate = (currentTime: number) => {
      const targetLength = newSlogan.length;
      const revealSpeed = 50; // Milliseconds per character reveal

      // Calculate how many characters *should* be revealed by now
      const elapsedTime = currentTime - lastUpdateTimeRef.current;
      const shouldRevealCount = Math.min(targetLength, Math.floor(elapsedTime / revealSpeed));

      // Update revealed count if it needs to increase
      if (shouldRevealCount > revealedCountRef.current) {
        revealedCountRef.current = shouldRevealCount;
      }

      const currentRevealed = revealedCountRef.current;

      // Build the display string
      let tempDisplay = '';
      for (let i = 0; i < targetLength; i++) {
        if (i < currentRevealed) {
          // Use the final character if revealed
          tempDisplay += newSlogan[i];
        } else {
          // Otherwise, use a random character from the allowed set
          tempDisplay += getRandomChar(shuffleCharsRef.current);
        }
      }
      setDisplayText(tempDisplay);

      // Continue animation if not all characters are revealed
      if (currentRevealed < targetLength) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished
        setDisplayText(newSlogan); // Ensure final text is correct
        setIsAnimating(false);
        animationFrameRef.current = null;
      }
    };

    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup animation frame on component unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="group flex flex-col md:flex-row md:items-center mb-4 z-10 relative min-h-[9em] md:min-h-[3em]">
      <p className={`text-boring-dark font-medium text-3xl md:text-xl lg:text-[3rem] flex-grow md:mr-4 transition-opacity duration-200 ${isAnimating ? 'whitespace-nowrap overflow-hidden md:overflow-visible leading-normal' : 'leading-tight'}`}>
        {/* Render text directly, font style is now always the same */}
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