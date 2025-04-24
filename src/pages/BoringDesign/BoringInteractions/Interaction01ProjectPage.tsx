import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../../../components/EnhancedInteractiveElements';
import { DemoShowcase } from '../../../components/DemoShowcase'; // Corrected path
import { DemoWrapper } from '../../../components/DemoWrapper'; // Corrected path
import codeSnippets from '../../../data/interactionSnippets'; // Corrected path
import SideNav from '../../../components/SideNav'; // Import SideNav
import Header from '../../../components/Header';
// --- Reusable Slide Component (MODIFIED TO ACCEPT ID) ---
interface SlideProps {
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string; // Allow custom styling for the section if needed
  id?: string; // Add id prop
}

const Slide: React.FC<SlideProps> = ({ label, title, children, className = "", id }) => (
  // Add id and scroll-mt-24 (adjust value if header height changes)
  <section id={id} className={`py-12 md:py-16 flex items-center scroll-mt-24 ${className}`}>
    <div className="px-6 pt-12 md:pt-12 lg:pt-12  lg:px-6 w-full"> {/* Use container for centering */}
      {/* <ScrollReveal> */}{/* Temporarily commented out */}
        {label && (
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
            {label}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h2>
        {/* Removed prose class wrapper, apply styling within children if needed */}
        <div className="max-w-none">
          {children}
        </div>
      {/* </ScrollReveal> */}{/* Temporarily commented out */}
    </div>
  </section>
);

// --- Interaction Components ---

// 1. Hover Tabs with Regret Delay
const HoverTabsWithRegret: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Tab 1');
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const REGRET_DELAY = 200; // ms

  const handleMouseEnter = (tabName: string) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setPendingTab(tabName); // Visually indicate potential switch
    hoverTimeout.current = setTimeout(() => {
      setActiveTab(tabName);
      setPendingTab(null);
      hoverTimeout.current = null;
    }, REGRET_DELAY);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setPendingTab(null); // Clear pending state on leave
  };

   // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <DemoWrapper className="items-stretch justify-start"> {/* Override alignment */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onMouseEnter={() => handleMouseEnter(tab)}
            onMouseLeave={handleMouseLeave}
            className={`px-4 py-2 -mb-px border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out \${activeTab === tab ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'} \${pendingTab === tab ? 'bg-gray-100 ' : ''}`} // Restored dark:text-indigo-400 and dark:text-gray-400
          >
            {tab} {pendingTab === tab ? '(thinking...)' : ''}
          </button>
        ))}
      </div>
      <div className="p-4 flex-grow"> {/* Use flex-grow to fill space */}
         {/* Add dark mode text color */}
         {activeTab === 'Tab 1' && <p className="text-gray-700 dark:text-gray-700">Content for Tab 1. Seems okay, right?</p>}
         {activeTab === 'Tab 2' && <p className="text-gray-700 dark:text-gray-700">Content for Tab 2. Or maybe this one?</p>}
         {activeTab === 'Tab 3' && <p className="text-gray-700 dark:text-gray-700">Content for Tab 3. Definitely this one... unless?</p>}
      </div>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">Hover over a tab. It waits {REGRET_DELAY}ms before committing, just like you.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// 2. Primary Button That's Never Sure
const UnsureButton: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <DemoWrapper> {/* Use the consistent wrapper */}
      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {isHovering ? 'Okay, fine.' : 'Maybe Continue'}
      </button>
    </DemoWrapper>
  );
};

// 3. Sticky Header, Emotionally Detached
const StickyHeaderDetached: React.FC = () => {
  // In a real scenario, this would likely involve observing scroll position
  // For this demo, we simulate the concept within a container
  return (
    <DemoWrapper className="items-stretch justify-start overflow-hidden"> {/* Allow internal scroll */}
        <div className="h-full flex flex-col">
            <div className="sticky top-0 bg-gray-200  p-2 z-10 border-b border-gray-300 dark:border-gray-600">
                <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-700">I'm always here. Watching.</p>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
                <p className="text-sm mb-2">Scrollable content below the header...</p>
                <div className="h-48 bg-gray-100  rounded flex items-center justify-center text-xs text-gray-400">
                    [More content...]
                </div>
                 <p className="text-sm mt-2">The header above remains visible within this box, uncaringly.</p>
            </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 px-4 pb-2">Simulated sticky header within this container.</p> {/* Restored dark:text-gray-400 */}
        </div>
    </DemoWrapper>
  );
};



// 5. "Back to Top" That Scrolls Too Slowly
const SlowBackToTop: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleClick = () => {
    setIsScrolling(true);
    // Simulate slow scroll with a timeout
    setTimeout(() => {
      setIsScrolling(false);
       // In a real app: window.scrollTo({ top: 0, behavior: 'smooth' });
       // Here, we just pretend.
      console.log("Okay, we're 'at the top'. Eventually.");
    }, 1500); // 1.5 seconds feels like an eternity
  };

  return (
    <DemoWrapper>
      <button
        onClick={handleClick}
        disabled={isScrolling}
        className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-wait"
      >
        {isScrolling ? 'Scrolling... glacially...' : 'Back to Top (Emotionally)'}
      </button>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Takes its sweet time. Like finishing that side project.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// 6. Ghost Button with Impostor Syndrome
const GhostButtonImposter: React.FC = () => {
  return (
     <DemoWrapper>
        <button className="px-5 py-2 border border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ease-in-out"> {/* Restored dark:text-indigo-400 */}
            Sorry, were you looking for me?
        </button>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Barely there until you need it. Then, apologetic.</p> {/* Restored dark:text-gray-400 */}
     </DemoWrapper>
  );
};

// 7. Input That Auto-Fills with Excuses
const ExcuseInput: React.FC = () => {
  return (
    <DemoWrapper className="w-full max-w-sm">
      <input
        type="text"
        placeholder="Didn't finish it because..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-300 rounded bg-white  text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Prefilled with the universal dev excuse.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// 8. Checkbox That Shakes If You Skip It
const ShakyCheckbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true); // Start checked
  const [shake, setShake] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (!checked) { // Shake when unchecked (skipped)
      setShake(true);
      setTimeout(() => setShake(false), 300); // Remove shake class after animation
    }
  };

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0], // Simple horizontal shake
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  return (
    <DemoWrapper>
      <motion.label
        className="flex items-center space-x-2 cursor-pointer"
        animate={shake ? shakeAnimation : {}}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600  dark:checked:bg-indigo-500"
        />
        <span className="text-gray-800 dark:text-gray-200">Important Task (Don't skip me)</span>
      </motion.label>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Try unchecking it. It gets a little anxious.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// --- Form Patterns ---

// 9. Multi-Step Form That Loops Back to Step 1
const LoopingMultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    setStep((prevStep) => (prevStep === totalSteps ? 1 : prevStep + 1));
     if (step === totalSteps) {
       console.log("And... we're back at the beginning. Deeply philosophical.");
     }
  };

  const handlePrev = () => {
    setStep((prevStep) => (prevStep === 1 ? totalSteps : prevStep - 1));
  };

  return (
    <DemoWrapper className="items-stretch justify-start w-full max-w-md">
      <div className="p-4 border-b dark:border-gray-700">
        <h4 className="font-medium text-center">Step {step} of {totalSteps}</h4>
         {/* Simple progress bar */}
         <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2">
           <div
             className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out"
             style={{ width: `${(step / totalSteps) * 100}%` }}
           ></div>
         </div>
      </div>
      <div className="p-4 flex-grow min-h-[80px]">
        {step === 1 && <p>Tell us about your hopes...</p>}
        {step === 2 && <p>Now, your dreams...</p>}
        {step === 3 && <p>Finally, your deepest fears...</p>}
      </div>
      <div className="p-4 flex justify-between border-t dark:border-gray-700">
        <button onClick={handlePrev} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Previous</button> {/* Restored dark:text-gray-400 */}
        <button
          onClick={handleNext}
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
        >
          {step === totalSteps ? 'Finish (Loop Back)' : 'Next'}
        </button>
      </div>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 px-4 text-center">Completing it just brings you back. Just like Monday.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// 10. "Save as Draft" That Never Really Saves
const NeverSavingDraftButton: React.FC = () => {
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleClick = () => {
        setFeedback('Saving... (not really)');
        setTimeout(() => {
            setFeedback('Saved! (it wasn\'t)');
             setTimeout(() => setFeedback(null), 1500);
        }, 1000);
         console.log("Pretending to save draft. It's the thought that counts?");
    };

    return (
         <DemoWrapper>
             <button
                onClick={handleClick}
                disabled={!!feedback}
                className="px-5 py-2 border border-gray-300 dark:border-gray-300 rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
             >
                Save as Draft
             </button>
             <AnimatePresence>
                {feedback && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-green-600 dark:text-green-400 mt-3 absolute bottom-4"
                    >
                        {feedback}
                    </motion.p>
                )}
             </AnimatePresence>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Provides the *illusion* of saving. Essential for coping.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 11. Dropdown That Always Reopens
const AlwaysReopeningDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(`Selected ${option}. Aaand it's back.`);
    // Reopen after a short delay
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 500);
  };

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dropdownRef]);

  const options = ['Option A', 'Option B', 'Help'];

  return (
    <DemoWrapper className="items-stretch justify-start">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggle}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-300 rounded bg-white  text-left flex justify-between items-center"
        >
          <span>{selectedOption || 'Select an option...'}</span>
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-1 w-full bg-white border border-gray-300 dark:border-gray-300 rounded shadow-lg"
            >
              <ul>
                {options.map(option => (
                  <li key={option}>
                    <button
                      onClick={() => handleSelect(option)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">It just wants to be helpful. Maybe too helpful.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// 12. Slider with No Labels
const UnlabeledSlider: React.FC = () => {
    const [value, setValue] = useState(50);

    return (
        <DemoWrapper>
            <label htmlFor="unlabeled-slider" className="sr-only">Mysterious Slider</label>
            <input
                id="unlabeled-slider"
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
             <p className="text-sm mt-3">Current Value: <span className="font-mono">{value}</span></p>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">It changes... something. Good luck.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// --- Feedback & System Responses ---

// 13. Toasts That Sigh When Dismissed
const SighingToast: React.FC = () => {
    const [showToast, setShowToast] = useState(true);
    const [message, setMessage] = useState("Something happened.");

    const handleDismiss = () => {
        setMessage("Okay... *sigh*");
        console.log("Toast dismissed. It felt that.");
        setTimeout(() => {
             setShowToast(false);
             // Reset after a delay so it can reappear for demo
             setTimeout(() => {
                 setShowToast(true);
                 setMessage("Something happened.");
             }, 2000);
        }, 1000);
    };

    return (
        <DemoWrapper className="justify-end">
             <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="max-w-sm w-full bg-gray-800 text-white shadow-lg rounded-lg pointer-events-auto flex" // Use flex here
                    >
                        <div className="flex-1 w-0 p-4"> {/* Content padding */} 
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        <div className="flex border-l border-gray-700"> {/* Button container */} 
                            <button
                            onClick={handleDismiss}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Confirmed dark:text-indigo-400 is present
                            >
                            Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click dismiss. Feel the subtle disapproval.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 14. Loading Spinner That Asks for Patience
const PatientLoadingSpinner: React.FC = () => {
    return (
         <DemoWrapper>
            <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* Restored dark:text-indigo-400 */}
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
             <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">Still working on it (and myself).</p>
        </DemoWrapper>
    );
};

// 15. "Success!" Notification That Ends With a Question Mark
const QuestionableSuccessNotification: React.FC = () => {
    return (
         <DemoWrapper className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
             <div className="flex items-center">
                 <svg className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-lg font-medium text-green-800 dark:text-green-200">Success!?</p>
             </div>
             <p className="text-xs text-green-700 dark:text-green-300 mt-auto pt-4">Celebrates achievement with a healthy dose of uncertainty.</p>
        </DemoWrapper>
    );
};

// 16. Error Message That Apologizes First
const ApologeticErrorMessage: React.FC = () => {
    return (
         <DemoWrapper className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
             <div className="flex items-center">
                 <svg className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <p className="text-lg font-medium text-red-800 dark:text-red-200">Sorry, we messed up. Again.</p>
             </div>
              <p className="text-xs text-red-700 dark:text-red-300 mt-auto pt-4">Takes responsibility before you can even assign blame.</p>
        </DemoWrapper>
    );
};

// --- Microinteractions & Easter Eggs ---

// 17. Form Submit Button That Shrinks on Hover
const ShrinkingSubmitButton: React.FC = () => {
    return (
        <DemoWrapper>
            <motion.button
                 whileHover={{ scale: 0.9 }}
                 transition={{ type: "spring", stiffness: 300, damping: 15 }}
                 className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 origin-center"
             >
                Submit (If you must)
            </motion.button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Visibly recoils from commitment on hover.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 18. 404 Page That Just Sits With You
const Existential404Demo: React.FC = () => {
    return (
         <DemoWrapper className="items-stretch text-center">
             <h2 className="text-6xl font-thin text-gray-400 dark:text-gray-600">404</h2>
             <p className="mt-4 text-gray-600 dark:text-gray-400">Well, this is awkward.</p> {/* Restored dark:text-gray-400 */}
             <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">No links. No suggestions. Just... this.</p>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Comforting, in a bleak sort of way.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 19. Hover Tooltip That Says 'Why are you hovering?'
const HoverPunishTooltip: React.FC = () => {
    return (
         <DemoWrapper>
            <div className="relative group">
                <span className="inline-block bg-gray-200  px-3 py-1 rounded cursor-default">
                    Hover Here
                </span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Why are you hovering?
                     <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Questions your every move.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 20. Dropdown Easter Egg
const ExistentialDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setShowQuiz(value === 'Other');
    if (value === 'Other') {
        console.log("Initiating existential dread sequence.");
    }
  };

  const options = ['Developer', 'Designer', 'Manager', 'Other'];

  return (
    <DemoWrapper>
      <select
        value={selectedOption}
        onChange={handleSelect}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white "
      >
        <option value="" disabled>Select your role...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <AnimatePresence>
        {showQuiz && (
           <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded text-center"
            >
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Existential Quiz Unlocked!</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Who are you, *really*?</p>
           </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Selecting "Other" triggers a brief identity crisis.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// --- Mobile Patterns ---

// 21. Bottom Sheet That Overshares
const OversharingBottomSheet: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DemoWrapper className="items-stretch justify-end w-full relative overflow-hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-gray-200  rounded absolute top-4 left-1/2 transform -translate-x-1/2"
            >
                Show Bottom Sheet
            </button>
             <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="bottom-sheet"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute bottom-0 left-0 right-0 h-auto bg-white border-t border-gray-200 dark:border-gray-700 rounded-t-lg shadow-xl p-5 flex flex-col"
                    >
                        <h5 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Here's too much info.</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We're all figuring it out. Like, did you know this component uses absolute positioning and framer-motion? It's trying its best.</p> {/* Restored dark:text-gray-400 */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-auto ml-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
                        >
                            Close (Please)
                        </button>
                    </motion.div>
                )}
             </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">Simulates a bottom sheet appearing.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 22. Swipe to Delete That Hesitates
const HesitantSwipeToDelete: React.FC = () => {
    const [itemState, setItemState] = useState('idle'); // idle, confirming, gone
    const [showItem, setShowItem] = useState(true);

    const handleSwipe = () => {
        if (itemState === 'idle') {
            setItemState('confirming');
            console.log("Swipe initiated. Are you sure?");
        }
    };

    const handleConfirm = () => {
        if (itemState === 'confirming') {
            setItemState('gone');
            console.log("Okay... deleting... wait-");
            setTimeout(() => {
                setShowItem(false); // Actually remove after a delay
                 console.log("Gone.");
                 // Reset for demo purposes
                setTimeout(() => {
                    setShowItem(true);
                    setItemState('idle');
                }, 2000);
            }, 500);
        }
    };

    const handleCancel = () => {
        if (itemState === 'confirming') {
            setItemState('idle');
            console.log("Phew. Changed your mind?");
        }
    };

    return (
        <DemoWrapper className="w-full overflow-hidden">
             <AnimatePresence>
                {showItem && (
                    <motion.div
                        key="swipe-item"
                        initial={{ x: 0 }}
                        animate={{ x: itemState === 'confirming' ? '-50%' : (itemState === 'gone' ? '-100%' : 0) }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative w-full bg-gray-100  p-4 rounded shadow flex justify-between items-center cursor-pointer"
                        onClick={handleSwipe} // Simulate swipe start on click for demo
                    >
                        <span className="text-gray-800 dark:text-gray-200">Swipe Me (Click Here)</span>
                         {/* Confirmation buttons revealed on swipe */}
                         <div className="absolute top-0 right-0 h-full flex items-center translate-x-full">
                             <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white h-full px-3 text-xs">Cancel</button>
                             <button onClick={handleConfirm} className="bg-red-600 hover:bg-red-700 text-white h-full px-3 text-xs rounded-r">Delete?</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
             {itemState === 'idle' && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click the item to simulate swiping.</p>} {/* Restored dark:text-gray-400 */}
             {itemState === 'confirming' && <p className="text-xs text-red-500 dark:text-red-400 mt-auto pt-4">Really sure? Click Delete again.</p>}
             {itemState === 'gone' && !showItem && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">It's gone. Hope that was the right choice.</p>} {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// 23. Tap to Expand, Collapse, Then Rethink
const RethinkingAccordion: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRethinking, setIsRethinking] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        const currentlyOpen = isOpen;
        setIsOpen(!currentlyOpen);
        setIsRethinking(false); // Reset rethinking state

        if (currentlyOpen) { // If closing
            console.log("Closing... wait, maybe not?");
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsRethinking(true);
                // Optionally re-open slightly or show indicator
                // For now, just a state change and log
                console.log("Okay, reconsidering closure.");
                // You could potentially set isOpen(true) again briefly here
                setTimeout(() => setIsRethinking(false), 700); // End rethink phase
            }, 400); // Delay before rethinking
        }
    };

     useEffect(() => {
        // Cleanup timeout on unmount
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <DemoWrapper className="items-stretch justify-start w-full">
            <button
                onClick={handleClick}
                className="w-full flex justify-between items-center p-3 bg-gray-100  rounded-t border-b border-gray-200 dark:border-gray-600"
                aria-expanded={isOpen}
            >
                <span className="font-medium">Important Section</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="p-4 bg-white rounded-b overflow-hidden"
                    >
                        This is the content. It seems important, but closing it might trigger second thoughts.
                        {isRethinking && <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2">Hmm, maybe keep this open?</p>} {/* Restored dark:text-gray-400 */}
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Collapsing it causes brief existential doubt.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};
// --- NEW COMPONENTS START HERE ---

// --- Navigation Patterns (New) ---

// New Nav 1: Confused Tab Highlighting
const ConfusedTabHighlighting: React.FC = () => {
  const tabs = ['Features', 'Pricing', 'Docs', 'Blog'];
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tabs.length);
    setHighlightedIndex(randomIndex);
    const timer = setTimeout(() => setHighlightedIndex(null), 1000);
    console.log(`Highlighting tab ${randomIndex + 1}. No reason.`);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DemoWrapper className="items-stretch justify-start">
       <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-b-2 border-transparent
              ${
                highlightedIndex === index
                  ? 'bg-yellow-100 dark:bg-yellow-800 border-yellow-500 text-yellow-700 dark:text-yellow-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' // Restored dark:text-gray-400
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 flex-grow">
         <p>Content area. Did you see the highlight? Just random ✨energy✨.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">Highlights a random tab on load for no reason.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Nav 2: Breadcrumbs with Life Advice
const LifeAdviceBreadcrumbs: React.FC = () => {
  const path = ['Home', 'Projects', 'Settings'];
  const advice = "You Should Take a Break";

  return (
    <DemoWrapper className="items-start justify-start">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm flex-wrap">
          {path.map((item, index) => (
            <li key={item} className="flex items-center">
              <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">{item}</a> {/* Restored dark:text-indigo-400 */}
               <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
            </li>
          ))}
           <li className="font-medium text-gray-700 dark:text-gray-400" aria-current="page">
             {advice}
           </li>
        </ol>
      </nav>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">The path ends with unsolicited, but probably correct, advice.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Nav 3: Side Nav That Shrinks When You Hover
const ShrinkingSideNav: React.FC = () => {
  return (
    // Remove max-w-xs from DemoWrapper
    <DemoWrapper className="items-stretch justify-start relative h-[200px]">
      <motion.div
        className="bg-gray-100  p-3 rounded h-full absolute left-0 top-0 origin-left overflow-hidden"
        initial={{ width: '120px' }}
        whileHover={{ width: '80px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <nav>
          <ul>
            <li className="mb-2 whitespace-nowrap overflow-hidden text-ellipsis"><a href="#" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</a></li>
            <li className="mb-2 whitespace-nowrap overflow-hidden text-ellipsis"><a href="#" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">Analytics</a></li>
            <li className="mb-2 whitespace-nowrap overflow-hidden text-ellipsis"><a href="#" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">Settings</a></li>
            <li className="mb-2 whitespace-nowrap overflow-hidden text-ellipsis"><a href="#" className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400">Logout</a></li>
          </ul>
        </nav>
      </motion.div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 absolute bottom-2 right-2">Introvert UI: Hover the nav, it gets smaller.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Nav 4: Multi-Level Dropdown That Ends in Regret
const RegretfulDropdown: React.FC = () => {
  const [level, setLevel] = useState(0);
  const reset = () => setLevel(0);

  return (
    // Remove max-w-xs from DemoWrapper
    <DemoWrapper className="items-stretch justify-start relative min-h-[150px]">
      <div className="relative">
        <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-300 rounded bg-white  text-left" onClick={() => level < 1 && setLevel(1)} disabled={level >= 1}>
          Level 1 Menu...
        </button>
        {level >= 1 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 dark:border-gray-300 rounded shadow-lg p-2">
            <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-300" onClick={() => setLevel(2)} disabled={level >= 2}>Level 2...</button>
            <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-300" onClick={reset}>Cancel</button>
          </div>
        )}
        {level >= 2 && (
           <div className="absolute z-20 mt-10 ml-4 w-full bg-white border border-gray-300 dark:border-gray-300 rounded shadow-lg p-2">
            <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-300" onClick={() => setLevel(3)} disabled={level >= 3}>Level 3...</button>
            <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-300" onClick={reset}>Cancel</button>
          </div>
        )}
         {level >= 3 && (
           <div className="absolute z-30 mt-20 ml-8 w-full bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-600 rounded shadow-lg p-3 text-center">
             <p className="text-red-700 dark:text-red-200">You've gone too far.</p>
             <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1" onClick={reset}>Go back</button> {/* Restored dark:text-indigo-400 */}
          </div>
        )}
      </div>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Dig too deep and find only regret.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};
// --- Component Interactions (New Buttons & Cards) ---

// New Button 1: Are You Sure-Sure Button
const AreYouSureSureButton: React.FC = () => {
    const [clicks, setClicks] = useState(0);
    const messages = [
        "Perform Risky Action",
        "Are you sure?",
        "Are you sure-sure?",
        "Never mind, I'm scared."
    ];

    const handleClick = () => {
        setClicks((prev) => (prev + 1) % messages.length);
        if (clicks === 2) {
            console.log("Okay, aborting. Crisis averted.");
        }
    };

    return (
        <DemoWrapper>
            <button
                onClick={handleClick}
                className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out
                    ${clicks === 0 ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                    ${clicks === 1 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                    ${clicks === 2 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                    ${clicks === 3 ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : ''}
                `}
                disabled={clicks === 3}
            >
                {messages[clicks]}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Escalates confirmation, then gives up.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Button 2: CTA That Moves When Hovered
const MovingCTA: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const parent = button.offsetParent as HTMLElement; // More reliable parent
    if (!parent) return;

    const buttonRect = button.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    // Calculate position relative to the offset parent
    const maxX = parent.clientWidth - buttonRect.width;
    const maxY = parent.clientHeight - buttonRect.height - 20; // Adjust for potential text below

    setPosition({
      x: Math.max(0, Math.random() * maxX),
      y: Math.max(0, Math.random() * maxY)
    });
     console.log("Button evaded hover!");
  };

  return (
    <DemoWrapper className="relative items-start justify-start overflow-hidden h-[150px]">
      <motion.button
        className="absolute px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow-lg"
        style={{ top: position.y, left: position.x }}
        onMouseEnter={handleHover}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        initial={false} // Prevent initial animation
      >
        Click Me If You Can
      </motion.button>
      <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Playfully avoids commitment. Literally.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Button 3: Button That Changes Label Each Click
const ChangingLabelButton: React.FC = () => {
    const [clicks, setClicks] = useState(0);
    const labels = ["Click me", "Again?", "Still?", "Okay stop.", "Seriously.", "I give up."];

    const handleClick = () => {
        setClicks((prev) => (prev + 1) % labels.length);
         if (clicks === labels.length - 2) {
             console.log("Button judgment intensifies.");
         }
    };

    return (
        <DemoWrapper>
             <button
                onClick={handleClick}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md min-w-[120px] text-center"
             >
                {labels[clicks]}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Expresses increasing exasperation with each click.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Button 4: Ghost Button That Gaslights
const GaslightingGhostButton: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
         <DemoWrapper>
             <div className="relative group">
                <button
                    className="px-5 py-2 border border-dashed border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-600 rounded opacity-50 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ease-in-out"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                 >
                    Maybe a Button?
                </button>
                 <AnimatePresence>
                 {showTooltip && (
                     <motion.div
                         initial={{ opacity: 0, y: 5 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 5 }}
                         className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded pointer-events-none"
                     >
                        I was never here.
                         <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                    </motion.div>
                 )}
                 </AnimatePresence>
             </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Hover it, then it denies its own existence.</p> {/* Restored dark:text-gray-400 */}
         </DemoWrapper>
    );
};

// New Card 1: Accordion with Existential Questions
const ExistentialAccordion: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DemoWrapper className="items-stretch justify-start w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-100  rounded-t border-b border-gray-200 dark:border-gray-600"
                aria-expanded={isOpen}
            >
                <span className="font-medium">Expand for Answers</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content-existential"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-4 bg-white  rounded-b overflow-hidden text-center"
                    >
                       <p className="font-semibold mb-1">Why did you open this?</p>
                       <p className="text-sm">What are you <span className="italic">really</span> looking for in life?</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Promised answers, delivered questions.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Card 2: Modal That Opens Slowly to Build Suspense
const SlowModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Effect to add/remove body scroll lock
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      // Cleanup function to reset overflow when component unmounts while open
      return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <DemoWrapper className="w-full">
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-gray-200  rounded">
                Open Slow Modal
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="slow-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.0 }} // Painfully slow backdrop fade-in
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                        onClick={() => setIsOpen(false)} // Close on backdrop click
                    >
                        <motion.div
                            key="slow-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 2.0, delay: 0.5 }} // Even slower content appearance
                            className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        >
                            <h3 className="text-lg font-medium mb-3">Important Announcement</h3>
                            <p className="text-sm mb-4">You waited all this time... for this?</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-label="Close modal"
                             >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                             </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Builds suspense. Delivers disappointment.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Card 3: Carousel with Passive-Aggressive Arrows
const PassiveAggressiveCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);
    const items = ['Slide 1', 'Slide 2', 'Slide 3'];
    const [feedback, setFeedback] = useState('');

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % items.length);
        setFeedback("Oh, you want to see more? Fine.");
        setTimeout(() => setFeedback(''), 1500);
    };
    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length);
         setFeedback("Going back already? Typical.");
        setTimeout(() => setFeedback(''), 1500);
    };

    return (
        <DemoWrapper className="w-full items-stretch justify-between">
            <div className="relative flex-grow flex items-center justify-center bg-gray-100  rounded p-4 min-h-[100px]">
                 <AnimatePresence mode="wait">
                     <motion.div
                         key={index}
                         initial={{ opacity: 0, x: 50 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -50 }}
                         transition={{ duration: 0.3 }}
                         className="text-center font-medium"
                     >
                         {items[index]}
                     </motion.div>
                 </AnimatePresence>
            </div>
             <div className="flex justify-between items-center mt-3 w-full">
                <button onClick={handlePrev} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                 <span className="text-xs text-gray-500 dark:text-gray-400 h-4">{feedback}</span> {/* Restored dark:text-gray-400 */}
                <button onClick={handleNext} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 text-center">The navigation arrows seem a little judgmental.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Card 4: Progress Bar That Never Finishes
const UnfinishingProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (progress < 99) {
             timer = setTimeout(() => {
                setProgress((prev) => Math.min(prev + Math.random() * 5, 99));
            }, 300 + Math.random() * 500);
        }
        return () => clearTimeout(timer);
    }, [progress]);

     // Reset progress if it somehow reaches 99 for demo looping
    useEffect(() => {
        if (progress >= 99) {
            const resetTimer = setTimeout(() => setProgress(0), 2000);
            return () => clearTimeout(resetTimer);
        }
    }, [progress]);

    return (
        <DemoWrapper className="w-full">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 relative overflow-hidden">
                <motion.div
                    className="bg-indigo-600 h-4 rounded-full absolute left-0 top-0"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                 />
                 <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white mix-blend-difference">
                    {Math.round(progress)}%
                 </span>
            </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Forever stuck at 99%. Just like that side project.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};


// --- Feedback & System Responses (New) ---

// New Feedback 1: Toasts with Delayed Reactions
const DelayedReactionToast: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toastId = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        setIsLoading(true);
        setShowToast(false); // Hide previous toast if any
        if (toastId.current) clearTimeout(toastId.current);
        console.log("Action triggered... now wait for it...");

        setTimeout(() => {
            setShowToast(true);
            setIsLoading(false);
            console.log("...There it is!");
             // Hide toast after a while
             toastId.current = setTimeout(() => setShowToast(false), 3000);
        }, 4000); // 4 second delay
    };

     // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (toastId.current) clearTimeout(toastId.current);
        };
    }, []);

    return (
        <DemoWrapper className="justify-center relative h-[150px]">
             <button
                 onClick={handleClick}
                 disabled={isLoading}
                 className="px-4 py-2 bg-gray-200  rounded disabled:opacity-50"
             >
                 {isLoading ? 'Thinking...' : 'Do Something'}
            </button>
             <div className="absolute bottom-5 right-5 z-20">
                 <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-sm w-full bg-gray-800 text-white shadow-lg rounded-lg pointer-events-auto p-4"
                        >
                             Oh yeah, that worked.
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Click button. Wait 4 seconds for confirmation.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Feedback 2: Loading Dots That Cry
const CryingLoadingDots: React.FC = () => {
  return (
    <DemoWrapper>
      <div className="flex items-end space-x-1">
        <motion.span
          className="w-2 h-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6, delay: 0 }}
        />
        <motion.span
          className="w-2 h-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6, delay: 0.2 }}
        />
        <motion.span
          className="w-2 h-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6, delay: 0.4 }}
        />
         <span className="ml-2 text-xl">😔</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Standard loading dots, plus despair.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Feedback 3: Success Toast That Undermines You
const UnderminingSuccessToast: React.FC = () => {
    return (
         <DemoWrapper className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
             <div className="flex items-center">
                 <svg className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-lg font-medium text-green-800 dark:text-green-200">Success (probably).</p>
             </div>
             <p className="text-xs text-green-700 dark:text-green-300 mt-auto pt-4">Just enough doubt to keep you grounded.</p>
        </DemoWrapper>
    );
};

// New Feedback 4: Error Alert That Comforts You
const ComfortingErrorAlert: React.FC = () => {
    return (
         <DemoWrapper className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
             <div className="text-center">
                 <div className="flex justify-center items-center mb-2">
                     <svg className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     <p className="text-lg font-medium text-red-800 dark:text-red-200">Something broke...</p>
                 </div>
                <p className="text-sm text-red-700 dark:text-red-300">...but you didn't. You're doing great.</p>
             </div>
              <p className="text-xs text-red-700 dark:text-red-300 mt-auto pt-4">It's not you, it's the code. Really.</p>
        </DemoWrapper>
    );
};

// --- Mobile/Touch Patterns (New) ---

// New Mobile 1: Swipe to Snooze Notification
const SnoozeSwipeNotification: React.FC = () => {
    const [itemState, setItemState] = useState('idle'); // idle, snoozing, gone
    const [showItem, setShowItem] = useState(true);

    const handleSwipe = () => {
        if (itemState === 'idle') {
            setItemState('snoozing');
            console.log("Swipe initiated for snooze...");
        }
    };

    const handleConfirmSnooze = () => {
        if (itemState === 'snoozing') {
            setItemState('gone');
            console.log("Okay, snoozed. See you later (maybe).");
            setTimeout(() => {
                setShowItem(false);
                 // Reset for demo purposes
                setTimeout(() => {
                    setShowItem(true);
                    setItemState('idle');
                }, 2000);
            }, 500);
        }
    };
     const handleCancelSnooze = () => {
        if (itemState === 'snoozing') {
            setItemState('idle');
        }
    };

    return (
        <DemoWrapper className="w-full overflow-hidden">
             <AnimatePresence>
                {showItem && (
                    <motion.div
                        key="snooze-item"
                        initial={{ x: 0 }}
                        animate={{ x: itemState === 'snoozing' ? '-50%' : (itemState === 'gone' ? '-100%' : 0) }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative w-full bg-blue-100 dark:bg-blue-900 p-4 rounded shadow flex justify-between items-center cursor-pointer border border-blue-200 dark:border-blue-700"
                        onClick={handleSwipe} // Simulate swipe start
                    >
                        <span className="text-blue-800 dark:text-blue-200 text-sm">Important Reminder</span>
                         {/* Snooze action revealed */}
                         <div className="absolute top-0 right-0 h-full flex items-center translate-x-full">
                             <button onClick={(e)=>{e.stopPropagation(); handleCancelSnooze();}} className="bg-gray-500 hover:bg-gray-600 text-white h-full px-3 text-xs">Cancel</button>
                             <button onClick={(e)=>{e.stopPropagation(); handleConfirmSnooze();}} className="bg-yellow-500 hover:bg-yellow-600 text-white h-full px-3 text-xs rounded-r">Snooze</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
             {itemState === 'idle' && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click the notification to simulate swiping to snooze.</p>} {/* Restored dark:text-gray-400 */}
             {itemState === 'snoozing' && <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-auto pt-4">Delay the inevitable? Click Snooze again.</p>}
             {itemState === 'gone' && !showItem && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Snoozed. It'll be back.</p>} {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Mobile 2: Pinch to Zoom, But Nothing Changes
const PlaceboPinchZoom: React.FC = () => {
  return (
    <DemoWrapper className="items-center justify-center text-center">
      <div className="w-32 h-32 bg-gray-200  rounded flex items-center justify-center text-sm border border-dashed border-gray-400 select-none touch-none">
        Try Pinching Here (Visually)
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">That interaction was for you, not the UI.</p> {/* Restored dark:text-gray-400 */}
    </DemoWrapper>
  );
};

// New Mobile 3: Bottom Sheet That's Just a Haiku
const HaikuBottomSheet: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Effect to add/remove body scroll lock
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <DemoWrapper className="items-stretch justify-end w-full relative overflow-hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-gray-200  rounded absolute top-4 left-1/2 transform -translate-x-1/2"
            >
                Read Haiku
            </button>
             <AnimatePresence>
                {isOpen && (
                    <motion.div
                         key="haiku-sheet-backdrop"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end"
                         onClick={() => setIsOpen(false)}
                     >
                        <motion.div
                            key="haiku-sheet-content"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full h-auto bg-white border-t border-gray-200 dark:border-gray-700 rounded-t-lg shadow-xl p-5 flex flex-col text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-3 font-serif italic">
                                scroll down, scroll back<br/>
                                nothing more to see down here<br/>
                                go touch grass, please now
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-2 mx-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
                            >
                                Okay
                            </button>
                        </motion.div>
                    </motion.div>
                )}
             </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Opens a bottom sheet containing only a haiku.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};


// --- NEW COMPONENTS END HERE ---


// --- Section Data for SideNav ---
const sections = [
  { id: 'navigation-patterns', title: 'Navigation Patterns' },
  { id: 'component-interactions', title: 'Component Interactions' },
  { id: 'form-patterns', title: 'Form Patterns' },
  { id: 'feedback-responses', title: 'Feedback & Responses' },
  { id: 'microinteractions-easter-eggs', title: 'Microinteractions & Eggs' }, // Corrected typo
  { id: 'mobile-patterns', title: 'Mobile Patterns' },
];

// --- Main Page Component ---
const Interaction01ProjectPage: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile nav

  return (
    <PageTransition>
      <div className="min-h-screen bg-offwhite dark:bg-boring-dark text-boring-dark dark:text-boring-offwhite transition-colors duration-300 relative">
        {/* Use shared Header component, remove custom header */}
        <Header />
        {/* Flex container for SideNav and Main Content */}
        {/* Adjust top padding to match Header height (p-6 md:p-12 lg:p-12) */}
        <div className="flex ">
          {/* Side Navigation - Pass state and handler */}
          <SideNav
             sections={sections}
             isOpen={isMobileNavOpen}
             onClose={() => setIsMobileNavOpen(false)}
           />
          {/* Main Content Area takes remaining space */}
          <main className="flex-grow min-w-0">
            {/* Title Slide - No ID needed, adjust padding */}
            <section className="text-left pt-24 lg:pt-32 md:py-20 px-6 md:px-8 lg:px-12"> {/* Added horizontal padding */}
               <ScrollReveal>
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                     Interaction Library <span className="text-indigo-600 ">for Boring Devs</span>
                   </h1>
                   {/* Note: Removed extra px-12 from here as padding is now on the parent section */}
                   <p className="text-lg md:text-xl text-gray-600  max-w-2xl ">
                     Quirky, practical, low-effort UI/UX patterns that do just enough (with a side of existential dread).
                   </p> {/* Fix potential extra closing tag here? Let's ensure it's closed properly */} 
               </ScrollReveal>
            </section>

            {/* Navigation Patterns Section - Add ID */}
            <Slide id={sections[0].id} label="🧭 Navigation Patterns" title="Finding things without getting lost (too much)">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
               <DemoShowcase
                 title="Hover Tabs with Regret Delay"
                 description="Adds a 200ms delay for indecisive users. Mentally realistic."
                 effort="Medium" codeSnippet={codeSnippets.hoverTabs}
               >
                 <HoverTabsWithRegret />
               </DemoShowcase>
               <DemoShowcase
                  title="Sticky Header, Emotionally Detached"
                  description="Always visible. Never invested."
                  effort="Low" codeSnippet={codeSnippets.stickyHeader}
               >
                  <StickyHeaderDetached />
               </DemoShowcase>
       
               <DemoShowcase
                  title="'Back to Top' That Scrolls Too Slowly"
                  description={"For devs who just need a moment."}
                  effort="Low" codeSnippet={codeSnippets.slowBackToTop}
               >
                  <SlowBackToTop />
               </DemoShowcase>
           
               <DemoShowcase
                 title="Breadcrumbs with Life Advice"
                 description={`Ends with: "You Should Take a Break".`}
                 effort="Low" codeSnippet={codeSnippets.lifeAdviceBreadcrumbs}
               >
                 <LifeAdviceBreadcrumbs />
               </DemoShowcase>
               <DemoShowcase
                 title="Side Nav That Shrinks When You Hover"
                 description="Introvert UI: It gets smaller when you approach it."
                 effort="Medium" codeSnippet={codeSnippets.shrinkingNav}
               >
                 <ShrinkingSideNav />
               </DemoShowcase>
               <DemoShowcase
                 title="Multi-Level Dropdown That Ends in Regret"
                 description={`After 3 levels it just says, "You\'ve gone too far."`}
                 effort="Medium" codeSnippet={codeSnippets.regretfulDropdown}
               >
                 <RegretfulDropdown />
               </DemoShowcase>
             </div>
          </Slide>

          {/* Component Interactions Section - Add ID */}
          <Slide id={sections[1].id} label="🧩 Component Interactions" title="Buttons, inputs, and components that don't try too hard">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
               <DemoShowcase
                 title="Primary Button That's Never Sure"
                 description={`Label: "Maybe Continue" / Hover: "Okay, fine."`}
                 effort="Low" codeSnippet={codeSnippets.unsureButton}
               >
                 <UnsureButton />
               </DemoShowcase>
               <DemoShowcase
                 title="Ghost Button with Impostor Syndrome"
                 description="Invisible until hovered, then apologetically outlined."
                 effort="Low" codeSnippet={codeSnippets.ghostButtonImposter}
               >
                 <GhostButtonImposter />
               </DemoShowcase>
               <DemoShowcase
                 title="Input That Auto-Fills with Excuses"
                 description={`Placeholder: "Didn\'t finish it because..."`}
                 effort="Low" codeSnippet={codeSnippets.excuseInput}
               >
                 <ExcuseInput />
               </DemoShowcase>
               <DemoShowcase
                 title="Checkbox That Shakes If You Skip It"
                 description="But not in a judgmental way."
                 effort="Medium" codeSnippet={codeSnippets.shakyCheckbox}
               >
                 <ShakyCheckbox />
               </DemoShowcase>
               <DemoShowcase
                  title="Are You Sure-Sure Button"
                  description="Click 1: Sure? Click 2: Sure-sure? Click 3: Never mind."
                  effort="Low" codeSnippet={codeSnippets.areYouSureSureButton}
               >
                  <AreYouSureSureButton />
               </DemoShowcase>
               <DemoShowcase
                  title="CTA That Moves When Hovered"
                  description="Playfully avoids commitment. Literally."
                  effort="High" codeSnippet={codeSnippets.movingCTA}
               >
                  <MovingCTA />
               </DemoShowcase>
               <DemoShowcase
                  title="Button That Changes Label Each Click"
                  description={`"Click me" → "Again?" → "Still?" → "Okay stop."`}
                  effort="Low" codeSnippet={codeSnippets.changingLabelButton}
               >
                  <ChangingLabelButton />
               </DemoShowcase>
               <DemoShowcase
                  title="Ghost Button That Gaslights"
                  description={`Hover: "I was never here."`}
                  effort="Medium" codeSnippet={codeSnippets.gaslightingGhostButton}
               >
                  <GaslightingGhostButton />
               </DemoShowcase>
               <DemoShowcase
                  title="Accordion with Existential Questions"
                  description={`Expands to: "Why did you open this?"`}
                  effort="Low" codeSnippet={codeSnippets.existentialAccordion}
               >
                  <ExistentialAccordion />
               </DemoShowcase>
               <DemoShowcase
                  title="Modal That Opens Slowly"
                  description="Builds suspense. Delivers disappointment."
                  effort="Medium" codeSnippet={codeSnippets.slowModal}
               >
                  <SlowModal />
               </DemoShowcase>
               <DemoShowcase
                  title="Carousel with Passive-Aggressive Arrows"
                  description={`"Oh, you want to see more? Fine."`}
                  effort="Medium" codeSnippet={codeSnippets.passiveAggressiveCarousel}
               >
                  <PassiveAggressiveCarousel />
               </DemoShowcase>
               <DemoShowcase
                  title="Progress Bar That Never Finishes"
                  description="Stuck at 99%. Just like your side project."
                  effort="Medium" codeSnippet={codeSnippets.unfinishingProgressBar}
               >
                  <UnfinishingProgressBar />
               </DemoShowcase>
               {/* NEW BUTTONS ADDED HERE */}
               <DemoShowcase
                  title="Submit Button That Changes Its Mind"
                  description={`Click -> Spin -> "Wait..." -> "Okay fine."}`}
                  effort="Medium" codeSnippet={codeSnippets.changingMindSubmit}
               >
                   <ChangingMindSubmitButton />
               </DemoShowcase>
               <DemoShowcase
                  title={`"Do Not Press" Button`}
                  description={`Obvious red button. Hover: "Seriously." Click: "You did this."`}
                  effort="Low" codeSnippet={codeSnippets.doNotPressButton}
               >
                   <DoNotPressButton />
               </DemoShowcase>
               <DemoShowcase
                  title="CTA Button With Cooldown"
                  description={`After click, label becomes: "Brb recharging..."`}
                  effort="Low" codeSnippet={codeSnippets.cooldownCTA}
               >
                   <CooldownCTAButton />
               </DemoShowcase>
               <DemoShowcase
                  title="Button with Mood Toggle"
                  description={`Hover changes text: "Click me" -> "Ignore me" -> "Validate me" -> "Never mind."}`}
                  effort="Medium" codeSnippet={codeSnippets.moodToggleButton}
               >
                   <MoodToggleButton />
               </DemoShowcase>
               {/* --- NEW CARD DEMOS --- */}
                <DemoShowcase
                  title="Card That Tilts Away From Cursor"
                  description="It's shy. Give it space."
                  effort="Medium" codeSnippet={codeSnippets.shyCard} // Placeholder snippet key
               >
                   <ShyCard />
               </DemoShowcase>
               <DemoShowcase
                  title="Hover Reveal That's Not Helpful"
                  description={`Hover → "There's nothing here. Just vibes."`}
                  effort="Low" codeSnippet={codeSnippets.unhelpfulHover} // Placeholder snippet key
               >
                   <UnhelpfulHoverReveal />
               </DemoShowcase>
               <DemoShowcase
                  title="Flip Card That's Passive-Aggressive"
                  description={`Back side: "Was that worth the click?"`}
                  effort="Medium" codeSnippet={codeSnippets.passiveFlipCard} // Placeholder snippet key
               >
                   <PassiveAggressiveFlipCard />
               </DemoShowcase>
               <DemoShowcase
                  title="Expandable Card That's Overwhelmed"
                  description={`Open → Text: "Too much. Collapsing now."`}
                  effort="Medium" codeSnippet={codeSnippets.overwhelmedCard} // Placeholder snippet key
               >
                   <OverwhelmedExpandableCard />
               </DemoShowcase>
             </div>
           </Slide>

           {/* Form Patterns Section - Add ID */}
           <Slide id={sections[2].id} label="🎛️ Form Patterns" title="Collecting input you probably won't read">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
               <DemoShowcase
                 title="Multi-Step Form That Loops Back"
                 description="Because self-discovery is never linear."
                 effort="Medium" codeSnippet={codeSnippets.loopingForm}
               >
                 <LoopingMultiStepForm />
               </DemoShowcase>
               <DemoShowcase
                 title={`"Save as Draft" That Never Really Saves`}
                 description="Just like your dreams."
                 effort="Low" codeSnippet={codeSnippets.neverSavingDraft}
               >
                 <NeverSavingDraftButton />
               </DemoShowcase>
               <DemoShowcase
                 title="Dropdown That Always Reopens"
                 description="It's trying to help. It's not."
                 effort="Medium" codeSnippet={codeSnippets.alwaysReopeningDropdown}
               >
                 <AlwaysReopeningDropdown />
               </DemoShowcase>
               <DemoShowcase
                 title="Slider with No Labels"
                 description="Adjusts something. Who knows what."
                 effort="Low" codeSnippet={codeSnippets.unlabeledSlider}
               >
                 <UnlabeledSlider />
               </DemoShowcase>
               {/* Placeholder Form Patterns */}
               <DemoShowcase title="New Form Pattern 1" description="..." effort="Low" codeSnippet={codeSnippets.newFormPattern1}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Form Pattern 2" description="..." effort="Low" codeSnippet={codeSnippets.newFormPattern2}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Form Pattern 3" description="..." effort="Low" codeSnippet={codeSnippets.newFormPattern3}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Form Pattern 4" description="..." effort="Low" codeSnippet={codeSnippets.newFormPattern4}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
             </div>
           </Slide>

           {/* Feedback & System Responses Section - Add ID */}
           <Slide id={sections[3].id} label="🔔 Feedback & System Responses" title="Toasts, alerts, and confirmations that feel... human">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
               <DemoShowcase
                 title="Toasts That Sigh When Dismissed"
                 description="You closed it. It closed you."
                 effort="Medium" codeSnippet={codeSnippets.sighingToast}
               >
                 <SighingToast />
               </DemoShowcase>
               <DemoShowcase
                 title="Loading Spinner That Asks for Patience"
                 description={`Caption: "Still working on it (and myself)."`}
                 effort="Low" codeSnippet={codeSnippets.patientSpinner}
               >
                 <PatientLoadingSpinner />
               </DemoShowcase>
               <DemoShowcase
                 title={`"Success!" Notification That Ends With a Question Mark`}
                 description="Because... was it?"
                 effort="Low" codeSnippet={codeSnippets.questionableSuccess}
               >
                 <QuestionableSuccessNotification />
               </DemoShowcase>
               <DemoShowcase
                 title="Error Message That Apologizes First"
                 description={`"Sorry, we messed up. Again."`}
                 effort="Low" codeSnippet={codeSnippets.apologeticError}
               >
                 <ApologeticErrorMessage />
               </DemoShowcase>
               <DemoShowcase
                  title="Toasts with Delayed Reactions"
                  description={`Click something → 4 seconds later: "Oh yeah, that worked."`}
                  effort="Medium" codeSnippet={codeSnippets.delayedToast}
               >
                  <DelayedReactionToast />
               </DemoShowcase>
               <DemoShowcase
                  title="Loading Dots That Cry"
                  description={`Typing-like animation with a side of despair: "😔"`}
                  effort="Low" codeSnippet={codeSnippets.cryingDots}
               >
                  <CryingLoadingDots />
               </DemoShowcase>
               <DemoShowcase
                  title="Success Toast That Undermines You"
                  description={`"Success (probably)."`}
                  effort="Low" codeSnippet={codeSnippets.underminingSuccess}
               >
                  <UnderminingSuccessToast />
               </DemoShowcase>
               <DemoShowcase
                  title="Error Alert That Comforts You"
                  description={`..."but you didn\'t. You\'re doing great."`}
                  effort="Low" codeSnippet={codeSnippets.comfortingError}
               >
                  <ComfortingErrorAlert />
               </DemoShowcase>
             </div>
           </Slide>

           {/* Microinteractions & Easter Eggs Section - Add ID */}
           <Slide id={sections[4].id} label="💬 Microinteractions & Easter Eggs" title="For small animations and delightful sadness">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
               <DemoShowcase
                 title="Form Submit Button That Shrinks on Hover"
                 description={`"I don\'t want this responsibility."`}
                 effort="Medium" codeSnippet={codeSnippets.shrinkingSubmit}
               >
                  <ShrinkingSubmitButton />
               </DemoShowcase>
               <DemoShowcase
                 title="404 Page That Just Sits With You"
                 description="No links. Just vibes."
                 effort="Low" codeSnippet={codeSnippets.existential404}
               >
                  <Existential404Demo />
               </DemoShowcase>
               <DemoShowcase
                 title="Hover Tooltip That Says 'Why are you hovering?'"
                 description="Curiosity = punished."
                 effort="Low" codeSnippet={codeSnippets.hoverPunish}
               >
                  <HoverPunishTooltip />
               </DemoShowcase>
               <DemoShowcase
                 title="Dropdown Easter Egg"
                 description={`Selecting "Other" opens an existential quiz.`}
                 effort="Medium" codeSnippet={codeSnippets.existentialDropdown}
               >
                  <ExistentialDropdown />
               </DemoShowcase>
               {/* Placeholder Microinteractions */}
               <DemoShowcase title="New Microinteraction 1" description="..." effort="Low" codeSnippet={codeSnippets.newMicrointeraction1}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Microinteraction 2" description="..." effort="Low" codeSnippet={codeSnippets.newMicrointeraction2}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Microinteraction 3" description="..." effort="Low" codeSnippet={codeSnippets.newMicrointeraction3}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
               <DemoShowcase title="New Microinteraction 4" description="..." effort="Low" codeSnippet={codeSnippets.newMicrointeraction4}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
             </div>
           </Slide>

           {/* Mobile Patterns Section - Add ID */}
           <Slide id={sections[5].id} label="📱 Mobile Patterns" title="For when users scroll through their feelings">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12"> {/* Adjusted grid gap */}
                <DemoShowcase
                  title="Bottom Sheet That Overshares"
                  description={`Title: "Here\'s too much info." / Subtext: "We\'re all figuring it out."`}
                  effort="Medium" codeSnippet={codeSnippets.oversharingSheet}
                >
                   <OversharingBottomSheet />
                </DemoShowcase>
                <DemoShowcase
                  title="Swipe to Delete That Hesitates"
                  description="You sure? Really sure? Okay… (Wait—gone.)"
                  effort="Medium" codeSnippet={codeSnippets.hesitantSwipe}
                >
                   <HesitantSwipeToDelete />
                </DemoShowcase>
                <DemoShowcase
                  title="Tap to Expand, Collapse, Then Rethink"
                  description="Accordion with self-doubt built-in."
                  effort="Medium" codeSnippet={codeSnippets.rethinkingAccordion}
                >
                   <RethinkingAccordion />
                </DemoShowcase>
                <DemoShowcase
                  title="Swipe to Snooze Notification"
                  description="Not delete — just delay the emotion for later."
                  effort="Medium" codeSnippet={codeSnippets.snoozeSwipe}
                >
                   <SnoozeSwipeNotification />
                </DemoShowcase>
                <DemoShowcase
                  title="Pinch to Zoom, But Nothing Changes"
                  description="That was for you. Not the UI."
                  effort="Low" codeSnippet={codeSnippets.placeboZoom}
                >
                   <PlaceboPinchZoom />
                </DemoShowcase>
                <DemoShowcase
                  title="Bottom Sheet That's Just a Haiku"
                  description=" scroll down, scroll back..."
                  effort="Low" codeSnippet={codeSnippets.haikuSheet}
                >
                   <HaikuBottomSheet />
                </DemoShowcase>
                {/* Placeholder Mobile Patterns */}
                <DemoShowcase title="New Mobile Pattern 4" description="..." effort="Low" codeSnippet={codeSnippets.newMobilePattern4}><DemoWrapper><span className="text-gray-400 italic">Placeholder</span></DemoWrapper></DemoShowcase>
              </div>
           </Slide>


        </main>
      </div> {/* End Flex container */}

    </div>
    </PageTransition>
  );
};
export default Interaction01ProjectPage;

// --- BUTTON INTERACTIONS (NEW) ---

// New Button 5: Submit Button That Changes Its Mind
const ChangingMindSubmitButton: React.FC = () => {
    const [state, setState] = useState<'idle' | 'thinking' | 'final'>('idle');
    const [label, setLabel] = useState('Submit');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        if (state !== 'idle') return; // Prevent multiple clicks while thinking

        setState('thinking');
        setLabel('Wait...');
        console.log("Submit clicked... rethinking...");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setState('final');
            setLabel('Okay fine.');
            console.log("...Reconsidered. Fine.");
            // Optionally reset after a while
            // setTimeout(() => {
            //     setState('idle');
            //     setLabel('Submit');
            // }, 2000);
        }, 1500); // 1.5 second thinking time
    };

     // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <DemoWrapper>
            <motion.button
                onClick={handleClick}
                className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out relative overflow-hidden ${
                    state === 'idle' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :
                    state === 'thinking' ? 'bg-yellow-500 text-white cursor-wait' :
                    'bg-green-600 text-white cursor-default' // Final state
                }`}
                disabled={state === 'thinking'}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={state}
                        initial={{ opacity: 0, y: state === 'thinking' ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center"
                    >
                        {state === 'thinking' && (
                           <motion.svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </motion.svg>
                        )}
                        {label}
                    </motion.span>
                </AnimatePresence>

            </motion.button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click -&gt; Spins -&gt; "Wait..." -&gt; "Okay fine."</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};


// New Button 6: "Do Not Press" Button
const DoNotPressButton: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        console.log("You were warned.");
    };

    return (
        <DemoWrapper>
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`px-8 py-4 font-bold text-lg rounded-lg shadow-lg transition-all duration-200 ease-in-out ${
                    isClicked
                        ? 'bg-gray-500 text-gray-200 cursor-not-allowed scale-95'
                        : 'bg-red-600 hover:bg-red-700 text-white transform hover:scale-105'
                }`}
                disabled={isClicked}
            >
                {isClicked ? "You did this." : (isHovering ? "Seriously." : "Do Not Press")}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Hover: "Seriously." Click: "You did this."</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Button 7: CTA Button With Cooldown
const CooldownCTAButton: React.FC = () => {
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const cooldownDuration = 3000; // 3 seconds

    const handleClick = () => {
        if (isOnCooldown) return;

        setIsOnCooldown(true);
        console.log("Button clicked. Entering cooldown...");
        setTimeout(() => {
            setIsOnCooldown(false);
            console.log("...Cooldown finished.");
        }, cooldownDuration);
    };

    return (
        <DemoWrapper>
             <button
                onClick={handleClick}
                className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out relative overflow-hidden ${
                    isOnCooldown
                        ? 'bg-gray-400 text-gray-700 cursor-wait'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isOnCooldown}
             >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isOnCooldown ? 'cooldown' : 'active'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOnCooldown ? 'Brb recharging...' : 'Engage!'}
                    </motion.span>
                 </AnimatePresence>
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">After click, label becomes: "Brb recharging..."</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};


// New Button 8: Button with Mood Toggle
const MoodToggleButton: React.FC = () => {
    const moods = ["Click me", "Ignore me", "Validate me", "Never mind."];
    const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

    const handleHover = () => {
        setCurrentMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);
    };

    return (
        <DemoWrapper>
            <button
                onMouseEnter={handleHover}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md min-w-[150px] text-center relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                     <motion.span
                         key={currentMoodIndex}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.2 }}
                         className="block" // Ensure span takes full button width for centering
                     >
                        {moods[currentMoodIndex]}
                     </motion.span>
                 </AnimatePresence>
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Each hover changes the text mood.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// --- END NEW BUTTON INTERACTIONS ---


// --- Form Patterns ---
// ... existing code ...


// New Card 5: Card That Tilts Away From Cursor
const ShyCard: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotate 10deg
        const rotateY = ((x - centerX) / centerX) * 10;  // Max rotate 10deg

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 }); // Reset rotation
    };

    return (
        <DemoWrapper className="items-center justify-center perspective">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-48 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 dark:from-purple-600 dark:to-indigo-700 rounded-lg shadow-lg flex items-center justify-center text-white font-medium p-4 text-center cursor-default transform-style-3d"
                style={{
                    rotateX: rotate.x,
                    rotateY: rotate.y,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                Give me space.
            </motion.div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Tilts away from your cursor. It's shy.</p> {/* Restored dark:text-gray-400 */}
            {/* Add CSS for perspective and transform-style if not globally defined */}
            <style>{`.perspective { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; }`}</style>
        </DemoWrapper>
    );
};

// New Card 6: Hover Reveal That's Not Helpful
const UnhelpfulHoverReveal: React.FC = () => {
    return (
         <DemoWrapper>
            <div className="relative group">
                <span className="inline-block bg-gray-200  px-4 py-2 rounded cursor-help">
                    Hover for info
                </span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    There's nothing here. Just vibes.
                     <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Reveals absolutely nothing useful on hover.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};

// New Card 7: Flip Card That's Passive-Aggressive
const PassiveAggressiveFlipCard: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <DemoWrapper className="items-center justify-center perspective h-[150px]">
            <motion.div
                className="w-48 h-32 relative cursor-pointer transform-style-3d"
                onClick={() => setIsFlipped(!isFlipped)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Front */}
                <motion.div
                    className="absolute w-full h-full bg-blue-500 dark:bg-blue-700 rounded-lg shadow-md flex items-center justify-center text-white p-4 text-center backface-hidden"
                     style={{ rotateY: 0 }} // Explicitly set rotateY to prevent flickering issues
                >
                    Click to Flip
                </motion.div>
                {/* Back */}
                <motion.div
                    className="absolute w-full h-full bg-yellow-400 dark:bg-yellow-600 rounded-lg shadow-md flex items-center justify-center text-gray-800 p-4 text-center backface-hidden"
                    style={{ rotateY: 180 }} // Start flipped
                >
                    Was that worth the click?
                </motion.div>
            </motion.div>
             <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Flips over to question your choices.</p> {/* Restored dark:text-gray-400 */}
             {/* Add CSS for perspective, transform-style, backface-visibility */}
             <style>{`
                .perspective { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            `}</style>
        </DemoWrapper>
    );
};

// New Card 8: Expandable Card That's Overwhelmed
const OverwhelmedExpandableCard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverwhelmed, setIsOverwhelmed] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        if (isOpen || isOverwhelmed) return; // Prevent interaction while closing/overwhelmed

        setIsOpen(true);
        console.log("Expanding... oh no.");
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOverwhelmed(true);
            console.log("Too much!");
             // Start collapsing after showing overwhelmed message
             if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
             collapseTimeoutRef.current = setTimeout(() => {
                 setIsOpen(false);
                 // Delay resetting overwhelmed state until after collapse animation might finish (approx 300ms)
                 if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
                 resetTimeoutRef.current = setTimeout(() => setIsOverwhelmed(false), 300);
                 console.log("Collapsing. Phew.");
             }, 800); // How long to show the overwhelmed message
        }, 1000); // How long to stay open before getting overwhelmed
    };

    useEffect(() => {
        // Cleanup all timeouts on unmount
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        };
    }, []);


    return (
        <DemoWrapper className="items-stretch justify-start w-full">
            <button
                onClick={handleClick}
                className="w-full flex justify-between items-center p-3 bg-gray-100  rounded-t border-b border-gray-200 dark:border-gray-600"
                aria-expanded={isOpen}
                disabled={isOpen || isOverwhelmed}
            >
                <span className="font-medium">Expand Content</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content-overwhelmed"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="p-4 bg-white rounded-b overflow-hidden text-center"
                    >
                        <AnimatePresence mode="wait">
                           {isOverwhelmed ? (
                                <motion.p
                                    key="overwhelmed-msg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-red-600 dark:text-red-400 font-semibold" // Restored dark:text-red-400
                                >
                                    Too much. Collapsing now.
                                </motion.p>
                           ) : (
                                <motion.p
                                    key="content-msg"
                                     initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Here's the detailed content you wanted...
                                </motion.p>
                           )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Expands, gets overwhelmed, collapses.</p> {/* Restored dark:text-gray-400 */}
        </DemoWrapper>
    );
};



