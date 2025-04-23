import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for SSR compatibility, though likely not needed here)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Initial check
    documentChangeHandler();

    // Listen for changes
    // Use addEventListener/removeEventListener for modern compatibility
    try {
        mediaQueryList.addEventListener('change', documentChangeHandler);
    } catch (e) {
      // Fallback for older browsers (e.g., Safari < 14)
        // Check if addListener exists before calling
        if (typeof mediaQueryList.addListener === 'function') {
             mediaQueryList.addListener(documentChangeHandler);
        }
    }


    // Cleanup listener on component unmount
    return () => {
       try {
           mediaQueryList.removeEventListener('change', documentChangeHandler);
       } catch (e) {
           // Check if removeListener exists before calling
           if (typeof mediaQueryList.removeListener === 'function') {
               mediaQueryList.removeListener(documentChangeHandler);
           }
       }
    };
  }, [query]); // Re-run effect if query changes

  return matches;
}

export default useMediaQuery; 