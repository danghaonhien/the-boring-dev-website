import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
}

interface SideNavProps {
  sections: Section[];
  isOpen: boolean;
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ sections, isOpen, onClose }) => {
  // Add scroll-behavior: smooth to the html element in your global CSS (e.g., index.css)
  // html { scroll-behavior: smooth; }

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(
    // Initial check - might not be accurate server-side or before mount
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return; // Guard for SSR

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = () => {
      setIsLargeScreen(mediaQuery.matches);
    };

    // Set initial state accurately after mount
    handleResize();

    // Add listener
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Effect to handle scroll spying
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      let currentSectionId: string | null = null;
      const offset = 100; // Offset from the top of the viewport

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is within the viewport (considering the offset)
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSectionId = section.id;
          }
        }
      });

      // If no section is perfectly at the offset, find the one closest to the top above the offset
      if (!currentSectionId) {
        let minTopAboveOffset = Infinity;
        sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < offset && rect.top < minTopAboveOffset) {
              minTopAboveOffset = rect.top;
              // If it's above the viewport entirely, maybe don't select it unless it's the very last one scrolled past
              // For simplicity, let's just find the highest one above the offset
            }
          }
        });
         // Fallback: find the section whose top is closest to the offset *from below* if nothing else is found
         // Or alternatively, the section whose top is closest but *above* the offset
        let closestSectionId: string | null = null;
        let smallestDistance = Infinity;

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                const distance = Math.abs(rect.top - offset);
                // Prioritize sections that are visible or partially visible near the offset
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                     if (distance < smallestDistance) {
                        smallestDistance = distance;
                        closestSectionId = section.id;
                    }
                }
            }
        });
         setActiveSectionId(closestSectionId);


      } else {
         setActiveSectionId(currentSectionId);
      }

    };

    // Debounce or Throttle the scroll handler for performance
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const debouncedScrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50); // Adjust delay as needed
    };


    window.addEventListener('scroll', debouncedScrollHandler);
    handleScroll(); // Initial check

    // Cleanup listener on unmount
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [sections]); // Re-run if sections change

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && !isLargeScreen && (
          <motion.div
            key="sidenav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Side Navigation Panel */}
      <motion.nav
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg /* Base mobile: fixed */
          transition-transform duration-300 ease-in-out /* Keep transition for smoothness */
          h-full overflow-y-auto py-8 px-4
          /* Desktop: sticky, in-flow, visible */
          lg:sticky lg:top-24 lg:z-10 lg:h-[calc(100vh-6rem)]
          lg:w-64 lg:flex-shrink-0 lg:px-8 lg:py-8
          lg:bg-transparent lg:dark:bg-transparent lg:shadow-none
          lg:transform-none /* Keep this just in case, remove lg:relative lg:inset-auto */
        `}
        animate={{
          x: isLargeScreen ? '0%' : (isOpen ? '0%' : '-100%'),
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        aria-hidden={!isLargeScreen && !isOpen}
      >
        <button onClick={onClose} className="absolute top-4 right-4 lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-4 pl-4 lg:hidden">Menu</h3>

        <ul className="space-y-2 border-l border-gray-200 dark:border-gray-700 pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={handleLinkClick}
                className={`
                  block text-sm transition-colors duration-200 py-1 relative
                  before:absolute before:left-[-17px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full
                  ${activeSectionId === section.id
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold before:bg-indigo-600 dark:before:bg-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 before:bg-transparent hover:before:bg-indigo-400'
                  }
                `}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default SideNav; 