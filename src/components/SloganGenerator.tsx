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
  "\"An open-source cry for help.\"",

  // New slogans added below
  "\"Just enough motivation to push to GitHub.\"",
  "\"We build. We vibe. We occasionally cry.\"",
  "\"Because productivity is overrated.\"",
  "\"Come for the tools, stay for the emotional damage.\"",
  "\"One breakpoint away from a breakdown.\"",
  "\"Designing dreams and debugging life.\"",
  "\"Join us. We're 70% tabs, 30% panic.\"",
  "\"Where burnout meets build week.\"",
  "\"Running on localhost and iced coffee.\"",
  "\"A safe space for half-baked side projects.\"",
  "\"Productivity is a myth. Community is real.\"",
  "\"Keyboard shortcuts > life choices.\"",
  "\"For devs who ship feelings, not features.\"",
  "\"Minimalist code. Maximalist chaos.\"",
  "\"It's not a phase. It's a dev cycle.\"",
  "\"Pushing code and coping mechanisms.\"",
  "\"We don't do agile. We do vibes.\"",
  "\"Less hustle, more hover states.\"",
  "\"If you're lost, you're home.\"",
  "\"We don't ship fast. We ship eventually.\"",
  "\"Because sometimes beige is bold.\"",
  "\"Minimal effort. Maximum reuse.\"",
  "\"No gradients. No problems.\"",
  "\"The system that says, 'meh, it works.'\"",
  "\"It's a system. It's boring. It's beautiful.\"",
  "\"We're not lazy. We're just efficient.\"",
  "\"Designed for vibes, not validation.\"",
  "\"One button. Three variants. Infinite apathy.\"",
  "\"Not perfect. But it ships.\"",
  "\"Designed for vibes, not validation.\"",





  // More slogans added
  "\"Scaling slowly. Panicking quietly.\"",
  "\"Our roadmap is feelings-based.\"",
  "\"Where 'quick sync' means emotional support.\"",
  "\"We push code, not agendas.\"",
  "\"Aligning on vibes, not KPIs.\"",
  "\"Meetings today, therapy tomorrow, repeat.\"",
  "\"Deadlines close, morale closer to zero.\"",
  "\"Push code, ignore Jira, look busy.\"",
  "\"Another sprint, another existential crisis.\"",
  "\"Zoom face on, soul checked out.\"",
  "\"Deliverables late, sarcasm right on time.\"",
  "\"Design review? More like roast session.\"",
  "\"Low energy, high-resolution mockups only.\"",
  "\"We deploy emotions and occasional features.\"",
  "\"Aligning on chaos, shipping with vibes.\"",
  "\"Let's not sync, just silently suffer.\"",
  "\"Your roadmap ends at therapy.\"",
  "\"OKRs are vibes and nap goals.\"",
  "\"Where feedback is passive aggressive art.\"",
  "\"Burnout? That's just bonus leave.\"",
  "\"Work-life balance, mostly just Slack.\"",
  "\"Logged in, tuned out, still typing.\"",
  "\"Quarterly planning, emotional damage included.\"",
  "\"Corporate synergy, but make it cry.\"",
  "\"Backlog deep, patience deeper, barely.\"",
  "\"We plan in sprints, we cry in loops.\"",

  "\"From wireframes to existential dread.\"",

  "\"Where 'final_v2' is never final.\"",

  "\"Your career is a roadmap… kind of.\"",

  "\"Debugging life one commit at a time.\"",

  "\"Design, dev, deploy, doubt.\"",

  "\"This roadmap has no ETA. Just vibes.\"",

  "\"When in doubt, push to prod.\"",

  "\"Too junior for this. Too senior to care.\"",

  "\"It's not burnout. It's feature creep.\"",

  "\"Navigating chaos with sticky notes and sass.\"",

  "\"Think less, design more. Or the opposite.”",

  "\"From bootcamp to breakdown—here we go.\"",

  "\"Aligning pixels and personal goals (barely).\"",

  "\"Just following the roadmap... into the void.\"",

  "\"Devs dream in bugs. Designers dream in grids.\"",

  "\"Every detour is a new feature.\"",

  "\"We ship code and cope creatively.\"",

  "\"This is a safe space for Ctrl+Z.\"",

  "\"Let's build things and slowly unravel.\"",
];

const defaultSlogan = "\"Low-key building, high-key tired.\""; // Default with quotes
// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?*%$#@_-'; // No longer needed globally

const SloganGenerator = () => {
  const [targetSlogan, setTargetSlogan] = useState(defaultSlogan); // The actual slogan we want to show
  const [displayText, setDisplayText] = useState(defaultSlogan); // What's currently shown
  const [isAnimating, setIsAnimating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle'); // State for copy feedback
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

  // Function to copy the current slogan to clipboard
  const handleCopy = async () => {
    if (isAnimating) return; // Don't copy during animation
    try {
      // Remove surrounding quotes before copying if they exist
      const textToCopy = displayText.startsWith('"') && displayText.endsWith('"') 
        ? displayText.slice(1, -1) 
        : displayText;
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally: Set a 'failed' status here to show an error icon/message
    }
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
    <div className="group flex flex-col md:flex-row items-start md:items-center mb-4 z-10 relative min-h-[10em] md:min-h-[4em] lg:min-h-[7em]">
      {/* Slogan Text */}
      <p className={`text-boring-dark dark:text-boring-offwhite font-medium text-4xl md:text-xl lg:text-[3rem] flex-grow md:mr-4 transition-opacity duration-200 min-h-[4em] md:min-h-0 leading-tight ${isAnimating ? ' overflow-hidden md:overflow-visible' : ''}`}>
        {displayText}
      </p>
      
      {/* Buttons Container */}
      <div className="mt-3 md:mt-0 flex-shrink-0 flex items-center space-x-2"> 
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded-full text-boring-dark/60 dark:text-boring-offwhite/60 transition-colors duration-200 ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-boring-dark/10 dark:hover:bg-boring-offwhite/10 hover:text-boring-dark dark:hover:text-boring-offwhite'
          }`}
          aria-label={copyStatus === 'copied' ? "Copied slogan" : "Copy slogan"}
          disabled={isAnimating}
          title={copyStatus === 'copied' ? "Copied!" : "Copy slogan"} // Tooltip
        >
          {copyStatus === 'copied' ? (
            // Checkmark Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-boring-main" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            // Copy Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>

        {/* Generate Button */}
        <button
          onClick={generateNewSlogan}
          className={`relative overflow-hidden group flex justify-center items-center text-boring-dark dark:text-boring-offwhite border border-boring-dark/30 dark:border-boring-offwhite/30 rounded-full px-4 py-1 text-sm transition-colors duration-300 ease-in-out whitespace-nowrap ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-boring-dark hover:text-boring-offwhite hover:border-boring-dark dark:hover:bg-boring-offwhite/10 dark:hover:text-boring-offwhite dark:hover:border-boring-offwhite'}"`}
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