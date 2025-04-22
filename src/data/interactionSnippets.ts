const codeSnippets = {
    hoverTabs: `const HoverTabsWithRegret: React.FC = () => {
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
      <DemoWrapper className="items-stretch justify-start">
        <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700"> {/* Removed mb-4 */}
          {tabs.map((tab) => (
            <button
              key={tab}
              onMouseEnter={() => handleMouseEnter(tab)}
              onMouseLeave={handleMouseLeave}
              className={\`px-4 py-2 -mb-px border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out
                \${activeTab === tab ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}
                \${pendingTab === tab ? 'bg-gray-100 dark:bg-gray-700' : ''} \`}
            >
              {tab} {pendingTab === tab ? '(thinking...)' : ''}
            </button>
          ))}
        </div>
        <div className="p-4 flex-grow">
           {activeTab === 'Tab 1' && <p>Content for Tab 1. Seems okay, right?</p>}
           {activeTab === 'Tab 2' && <p>Content for Tab 2. Or maybe this one?</p>}
           {activeTab === 'Tab 3' && <p>Content for Tab 3. Definitely this one... unless?</p>}
        </div>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">Hover over a tab. It waits {REGRET_DELAY}ms before committing, just like you.</p>
      </DemoWrapper>
    );
 };`,
 stickyHeader: `const StickyHeaderDetached: React.FC = () => {
    // In a real scenario, this would likely involve observing scroll position
    // For this demo, we simulate the concept within a container
    return (
      <DemoWrapper className="items-stretch justify-start overflow-hidden"> {/* Allow internal scroll */}
          <div className="h-full flex flex-col">
              <div className="sticky top-0 bg-gray-200 dark:bg-gray-700 p-2 z-10 border-b border-gray-300 dark:border-gray-600">
                  <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">I'm always here. Watching.</p>
              </div>
              <div className="p-4 flex-grow overflow-y-auto">
                  <p className="text-sm mb-2">Scrollable content below the header...</p>
                  <div className="h-48 bg-gray-100 dark:bg-gray-750 rounded flex items-center justify-center text-xs text-gray-400">
                      [More content...]
                  </div>
                   <p className="text-sm mt-2">The header above remains visible within this box, uncaringly.</p>
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 px-4 pb-2">Simulated sticky header within this container.</p>
          </div>
      </DemoWrapper>
    );
  };`,
  loopingBreadcrumbs: `const LoopingBreadcrumbs: React.FC = () => {
    const [path, setPath] = useState(['Home']);
  
    const handleClick = (index: number) => {
      // Always go back to the start on any click
      setPath(['Home']);
      console.log("Ah, back where we started. Predictable.");
    };
  
    return (
      <DemoWrapper className="items-start justify-start">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            {path.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                )}
                <button
                  onClick={() => handleClick(index)}
                  className={\`font-medium \${index === path.length - 1 ? 'text-gray-700 dark:text-gray-200 cursor-default' : 'text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200'}\`}
                  aria-current={index === path.length - 1 ? 'page' : undefined}
                  disabled={index === path.length - 1} // Disable last item visually
                >
                  {item}
                </button>
              </li>
            ))}
          </ol>
        </nav>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click any link (except the last). Notice a theme?</p>
      </DemoWrapper>
    );
  };`,
  slowBackToTop: `const SlowBackToTop: React.FC = () => {
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
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Takes its sweet time. Like finishing that side project.</p>
      </DemoWrapper>
    );
  };`,
  confusedTabs: `const ConfusedTabHighlighting: React.FC = () => {
    const tabs = ['Features', 'Pricing', 'Docs', 'Blog'];
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * tabs.length);
      setHighlightedIndex(randomIndex);
      const timer = setTimeout(() => setHighlightedIndex(null), 1000);
      console.log(\`Highlighting tab \${randomIndex + 1}. No reason.\`);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <DemoWrapper className="items-stretch justify-start">
         <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={\`px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-b-2 border-transparent
                \${highlightedIndex === index
                  ? 'bg-yellow-100 dark:bg-yellow-800 border-yellow-500 text-yellow-700 dark:text-yellow-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}
              \`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 flex-grow">
           <p>Content area. Did you see the highlight? Just random ✨energy✨.</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">Highlights a random tab on load for no reason.</p>
      </DemoWrapper>
    );
  };`,
  lifeAdviceBreadcrumbs: `const LifeAdviceBreadcrumbs: React.FC = () => {
    const path = ['Home', 'Projects', 'Settings'];
    const advice = "You Should Take a Break";
  
    return (
      <DemoWrapper className="items-start justify-start">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm flex-wrap">
            {path.map((item, index) => (
              <li key={item} className="flex items-center">
                <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">{item}</a>
                 <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
              </li>
            ))}
             <li className="font-medium text-gray-700 dark:text-gray-200" aria-current="page">
               {advice}
             </li>
          </ol>
        </nav>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">The path ends with unsolicited, but probably correct, advice.</p>
      </DemoWrapper>
    );
  };`,
    shrinkingNav: `const ShrinkingSideNav: React.FC = () => {
    return (
      <DemoWrapper className="items-stretch justify-start relative h-[200px]">
        <motion.div
          className="bg-gray-100 dark:bg-gray-700 p-3 rounded h-full absolute left-0 top-0 origin-left overflow-hidden"
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
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 absolute bottom-2 right-2">Introvert UI: Hover the nav, it gets smaller.</p>
      </DemoWrapper>
    );
  };`,
    regretfulDropdown: `const RegretfulDropdown: React.FC = () => {
    const [level, setLevel] = useState(0);
    const reset = () => setLevel(0);
  
    return (
      <DemoWrapper className="items-stretch justify-start relative min-h-[150px]">
        <div className="relative">
          <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-left" onClick={() => level < 1 && setLevel(1)} disabled={level >= 1}>
            Level 1 Menu...
          </button>
          {level >= 1 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg p-2">
              <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setLevel(2)} disabled={level >= 2}>Level 2...</button>
              <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={reset}>Cancel</button>
            </div>
          )}
          {level >= 2 && (
             <div className="absolute z-20 mt-10 ml-4 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg p-2">
              <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setLevel(3)} disabled={level >= 3}>Level 3...</button>
              <button className="block w-full text-left py-1 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={reset}>Cancel</button>
            </div>
          )}
           {level >= 3 && (
             <div className="absolute z-30 mt-20 ml-8 w-full bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-600 rounded shadow-lg p-3 text-center">
               <p className="text-red-700 dark:text-red-200">You've gone too far.</p>
               <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1" onClick={reset}>Go back</button>
            </div>
          )}
        </div>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Dig too deep and find only regret.</p>
      </DemoWrapper>
    );
  };`,
    unsureButton: `const UnsureButton: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
  
    return (
      <DemoWrapper>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isHovering ? 'Okay, fine.' : 'Maybe Continue'}
        </button>
      </DemoWrapper>
    );
  };`,
    ghostButtonImposter: `const GhostButtonImposter: React.FC = () => {
    return (
       <DemoWrapper>
          <button className="px-5 py-2 border border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ease-in-out">
              Sorry, were you looking for me?
          </button>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Barely there until you need it. Then, apologetic.</p>
       </DemoWrapper>
    );
  };`,
    excuseInput: `const ExcuseInput: React.FC = () => {
    return (
      <DemoWrapper className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Didn't finish it because..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Prefilled with the universal dev excuse.</p>
      </DemoWrapper>
    );
  };`,
    shakyCheckbox: `const ShakyCheckbox: React.FC = () => {
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
            className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Important Task (Don't skip me)</span>
        </motion.label>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Try unchecking it. It gets a little anxious.</p>
      </DemoWrapper>
    );
  };`,
    areYouSureSureButton: `const AreYouSureSureButton: React.FC = () => {
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
                  className={\`px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out
                      \${clicks === 0 ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                      \${clicks === 1 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                      \${clicks === 2 ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                      \${clicks === 3 ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : ''}
                  \`}
                  disabled={clicks === 3}
              >
                  {messages[clicks]}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Escalates confirmation, then gives up.</p>
          </DemoWrapper>
      );
  };`,
    movingCTA: `const MovingCTA: React.FC = () => {
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
        <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Playfully avoids commitment. Literally.</p>
      </DemoWrapper>
    );
  };`,
    changingLabelButton: `const ChangingLabelButton: React.FC = () => {
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Expresses increasing exasperation with each click.</p>
          </DemoWrapper>
      );
  };`,
    gaslightingGhostButton: `const GaslightingGhostButton: React.FC = () => {
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
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Hover it, then it denies its own existence.</p>
           </DemoWrapper>
      );
  };`,
    existentialAccordion: `const ExistentialAccordion: React.FC = () => {
      const [isOpen, setIsOpen] = useState(false);
  
      return (
          <DemoWrapper className="items-stretch justify-start w-full">
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-t border-b border-gray-200 dark:border-gray-600"
                  aria-expanded={isOpen}
              >
                  <span className="font-medium">Expand for Answers</span>
                  <span className={\`transition-transform \${isOpen ? 'rotate-180' : ''}\`}>
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
                          className="p-4 bg-white dark:bg-gray-800 rounded-b overflow-hidden text-center"
                      >
                         <p className="font-semibold mb-1">Why did you open this?</p>
                         <p className="text-sm">What are you <span className="italic">really</span> looking for in life?</p>
                      </motion.div>
                  )}
              </AnimatePresence>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Promised answers, delivered questions.</p>
          </DemoWrapper>
      );
  };`,
    slowModal: `const SlowModal: React.FC = () => {
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
              <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
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
                              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full relative"
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Builds suspense. Delivers disappointment.</p>
          </DemoWrapper>
      );
  };`,
    passiveAggressiveCarousel: `const PassiveAggressiveCarousel: React.FC = () => {
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
              <div className="relative flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[100px]">
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
                   <span className="text-xs text-gray-500 dark:text-gray-400 h-4">{feedback}</span>
                  <button onClick={handleNext} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 text-center">The navigation arrows seem a little judgmental.</p>
          </DemoWrapper>
      );
  };`,
    unfinishingProgressBar: `const UnfinishingProgressBar: React.FC = () => {
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
                      animate={{ width: \`\${progress}%\` }}
                      transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                   />
                   <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white mix-blend-difference">
                      {Math.round(progress)}%
                   </span>
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Forever stuck at 99%. Just like that side project.</p>
          </DemoWrapper>
      );
  };`,
    loopingForm: `const LoopingMultiStepForm: React.FC = () => {
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
               style={{ width: \`\${(step / totalSteps) * 100}%\` }}
             ></div>
           </div>
        </div>
        <div className="p-4 flex-grow min-h-[80px]">
          {step === 1 && <p>Tell us about your hopes...</p>}
          {step === 2 && <p>Now, your dreams...</p>}
          {step === 3 && <p>Finally, your deepest fears...</p>}
        </div>
        <div className="p-4 flex justify-between border-t dark:border-gray-700">
          <button onClick={handlePrev} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Previous</button>
          <button
            onClick={handleNext}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
          >
            {step === totalSteps ? 'Finish (Loop Back)' : 'Next'}
          </button>
        </div>
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 px-4 text-center">Completing it just brings you back. Just like Monday.</p>
      </DemoWrapper>
    );
  };`,
    neverSavingDraft: `const NeverSavingDraftButton: React.FC = () => {
      const [feedback, setFeedback] = useState<string | null>(null);
  
      const handleClick = () => {
          setFeedback('Saving... (not really)');
          setTimeout(() => {
              setFeedback('Saved! (it wasn\\'t)');
               setTimeout(() => setFeedback(null), 1500);
          }, 1000);
           console.log("Pretending to save draft. It's the thought that counts?");
      };

    return (
           <DemoWrapper>
            <button
                  onClick={handleClick}
                  disabled={!!feedback}
                  className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
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
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Provides the *illusion* of saving. Essential for coping.</p>
        </DemoWrapper>
    );
};`,
    alwaysReopeningDropdown: `const AlwaysReopeningDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const handleToggle = () => setIsOpen(!isOpen);
  
    const handleSelect = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
      console.log(\`Selected \${option}. Aaand it's back.\`);
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-left flex justify-between items-center"
          >
            <span>{selectedOption || 'Select an option...'}</span>
            <svg className={\`w-4 h-4 transition-transform \${isOpen ? 'transform rotate-180' : ''}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg"
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
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">It just wants to be helpful. Maybe too helpful.</p>
        </DemoWrapper>
    );
};`,
    unlabeledSlider: `const UnlabeledSlider: React.FC = () => {
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
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">It changes... something. Good luck.</p>
          </DemoWrapper>
      );
  };`,
    sighingToast: `const SighingToast: React.FC = () => {
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
                          className="max-w-sm w-full bg-gray-800 text-white shadow-lg rounded-lg pointer-events-auto p-4"
                      >
                          <div className="flex-1 w-0 p-4">
                              <p className="text-sm font-medium">{message}</p>
                          </div>
                          <div className="flex border-l border-gray-700">
                              <button
                              onClick={handleDismiss}
                              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-500 dark:text-indigo-700 hover:text-indigo-400 dark:hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                              Dismiss
                              </button>
                          </div>
                     </motion.div>
                  )}
                 </AnimatePresence>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click dismiss. Feel the subtle disapproval.</p>
          </DemoWrapper>
      );
  };`,
    patientSpinner: `const PatientLoadingSpinner: React.FC = () => {
      return (
           <DemoWrapper>
              <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
               <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">Still working on it (and myself).</p>
          </DemoWrapper>
      );
  };`,
    questionableSuccess: `const QuestionableSuccessNotification: React.FC = () => {
      return (
           <DemoWrapper className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
               <div className="flex items-center">
                   <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-lg font-medium text-green-800 dark:text-green-200">Success!?</p>
            </div>
               <p className="text-xs text-green-700 dark:text-green-300 mt-auto pt-4">Celebrates achievement with a healthy dose of uncertainty.</p>
          </DemoWrapper>
      );
  };`,
    apologeticError: `const ApologeticErrorMessage: React.FC = () => {
      return (
           <DemoWrapper className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
               <div className="flex items-center">
                   <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   <p className="text-lg font-medium text-red-800 dark:text-red-200">Sorry, we messed up. Again.</p>
            </div>
                <p className="text-xs text-red-700 dark:text-red-300 mt-auto pt-4">Takes responsibility before you can even assign blame.</p>
        </DemoWrapper>
    );
};`,
    delayedToast: `const DelayedReactionToast: React.FC = () => {
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
                   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
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
              <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Click button. Wait 4 seconds for confirmation.</p>
          </DemoWrapper>
      );
  };`,
    cryingDots: `const CryingLoadingDots: React.FC = () => {
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
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Standard loading dots, plus despair.</p>
        </DemoWrapper>
    );
};`,
    underminingSuccess: `const UnderminingSuccessToast: React.FC = () => {
      return (
           <DemoWrapper className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
               <div className="flex items-center">
                   <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-lg font-medium text-green-800 dark:text-green-200">Success (probably).</p>
               </div>
               <p className="text-xs text-green-700 dark:text-green-300 mt-auto pt-4">Just enough doubt to keep you grounded.</p>
          </DemoWrapper>
      );
  };`,
    comfortingError: `const ComfortingErrorAlert: React.FC = () => {
      return (
           <DemoWrapper className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
               <div className="text-center">
                   <div className="flex justify-center items-center mb-2">
                       <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       <p className="text-lg font-medium text-red-800 dark:text-red-200">Something broke...</p>
                   </div>
                  <p className="text-sm text-red-700 dark:text-red-300">...but you didn't. You're doing great.</p>
               </div>
                <p className="text-xs text-red-700 dark:text-red-300 mt-auto pt-4">It's not you, it's the code. Really.</p>
          </DemoWrapper>
      );
  };`,
    shrinkingSubmit: `const ShrinkingSubmitButton: React.FC = () => {
      return (
          <DemoWrapper>
              <motion.button
                   whileHover={{ scale: 0.9 }}
                   transition={{ type: "spring", stiffness: 300, damping: 15 }}
                   className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 origin-center"
               >
                  Submit (If you must)
              </motion.button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Visibly recoils from commitment on hover.</p>
          </DemoWrapper>
      );
  };`,
    existential404: `const Existential404Demo: React.FC = () => {
      return (
           <DemoWrapper className="items-stretch text-center">
               <h2 className="text-6xl font-thin text-gray-400 dark:text-gray-600">404</h2>
               <p className="mt-4 text-gray-600 dark:text-gray-400">Well, this is awkward.</p>
               <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">No links. No suggestions. Just... this.</p>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Comforting, in a bleak sort of way.</p>
          </DemoWrapper>
      );
  };`,
    hoverPunish: `const HoverPunishTooltip: React.FC = () => {
      return (
           <DemoWrapper>
              <div className="relative group">
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded cursor-default">
                      Hover Here
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Why are you hovering?
                       <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                  </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Questions your every move.</p>
          </DemoWrapper>
      );
  };`,
    existentialDropdown: `const ExistentialDropdown: React.FC = () => {
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
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
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Selecting "Other" triggers a brief identity crisis.</p>
        </DemoWrapper>
    );
};`,
    oversharingSheet: `const OversharingBottomSheet: React.FC = () => {
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
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded absolute top-4 left-1/2 transform -translate-x-1/2"
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
                          className="absolute bottom-0 left-0 right-0 h-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-t-lg shadow-xl p-5 flex flex-col"
                      >
                          <h5 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Here's too much info.</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We're all figuring it out. Like, did you know this component uses absolute positioning and framer-motion? It's trying its best.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                              className="mt-auto ml-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
                             >
                              Close (Please)
                             </button>
                    </motion.div>
                )}
            </AnimatePresence>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">Simulates a bottom sheet appearing.</p>
        </DemoWrapper>
    );
};`,
    hesitantSwipe: `const HesitantSwipeToDelete: React.FC = () => {
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
                          className="relative w-full bg-gray-100 dark:bg-gray-700 p-4 rounded shadow flex justify-between items-center cursor-pointer"
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
               {itemState === 'idle' && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click the item to simulate swiping.</p>}
               {itemState === 'confirming' && <p className="text-xs text-red-500 dark:text-red-400 mt-auto pt-4">Really sure? Click Delete again.</p>}
               {itemState === 'gone' && !showItem && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">It's gone. Hope that was the right choice.</p>}
        </DemoWrapper>
    );
};`,
    rethinkingAccordion: `const RethinkingAccordion: React.FC = () => {
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
                  className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-t border-b border-gray-200 dark:border-gray-600"
                  aria-expanded={isOpen}
              >
                  <span className="font-medium">Important Section</span>
                  <span className={\`transition-transform \${isOpen ? \'rotate-180\' : \'\'}\`}>\n                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>\n                </span>\n            </button>\n            <AnimatePresence initial={false}>\n                {isOpen && (\n                    <motion.div\n                        key="content"\n                        initial="collapsed"\n                        animate="open"\n                        exit="collapsed"\n                        variants={{\n                            open: { opacity: 1, height: "auto" },\n                            collapsed: { opacity: 0, height: 0 }\n                        }}\n                        transition={{ duration: 0.3, ease: "easeInOut" }}\n                        className="p-4 bg-white dark:bg-gray-800 rounded-b overflow-hidden"\n                    >\n                        <AnimatePresence mode="wait">\n                           {isRethinking ? (\n                                <motion.p\n                                    key="overwhelmed-msg"\n                                    initial={{ opacity: 0 }}\n                                    animate={{ opacity: 1 }}\n                                    exit={{ opacity: 0 }}\n                                    transition={{ duration: 0.2 }}\n                                    className="text-red-600 dark:text-red-400 font-semibold"\n                                >\n                                    Too much. Collapsing now.\n                                </motion.p>\n                           ) : (\n                                <motion.p\n                                    key="content-msg"\n                                     initial={{ opacity: 0 }}\n                                    animate={{ opacity: 1 }}\n                                    exit={{ opacity: 0 }}\n                                    transition={{ duration: 0.2 }}\n                                >\n                                    Here\'s the detailed content you wanted...\n                                </motion.p>\n                           )}\n                        </AnimatePresence>\n                    </motion.div>\n                )}\n            </AnimatePresence>\n            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Expands, gets overwhelmed, collapses.</p>\n        </DemoWrapper>\n    );\n};`,
    snoozeSwipe: `const SnoozeSwipeNotification: React.FC = () => {
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
               {itemState === 'idle' && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Click the notification to simulate swiping to snooze.</p>}
               {itemState === 'snoozing' && <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-auto pt-4">Delay the inevitable? Click Snooze again.</p>}
               {itemState === 'gone' && !showItem && <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Snoozed. It'll be back.</p>}
          </DemoWrapper>
      );
  };`,
    placeboZoom: `const PlaceboPinchZoom: React.FC = () => {
     return (
      <DemoWrapper className="items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm border border-dashed border-gray-400 select-none touch-none">
          Try Pinching Here (Visually)
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">That interaction was for you, not the UI.</p>
      </DemoWrapper>
    );
  };`,
    haikuSheet: `const HaikuBottomSheet: React.FC = () => { ... };`,
    // New Button Interaction Snippets (Placeholders)
    changingMindSubmit: `const ChangingMindSubmitButton: React.FC = () => {\\n    const [state, setState] = useState<'idle' | 'thinking' | 'final'>('idle');\\n    const [label, setLabel] = useState('Submit');\\n    const timeoutRef = useRef<NodeJS.Timeout | null>(null);\\n\\n    const handleClick = () => {\\n        if (state !== 'idle') return; // Prevent multiple clicks while thinking\\n\\n        setState('thinking');\\n        setLabel('Wait...');\\n        console.log(\"Submit clicked... rethinking...\");\\n\\n        if (timeoutRef.current) clearTimeout(timeoutRef.current);\\n        timeoutRef.current = setTimeout(() => {\\n            setState('final');\\n            setLabel('Okay fine.');\\n            console.log(\"...Reconsidered. Fine.\");\\n            // Optionally reset after a while\\n            // setTimeout(() => {\\n            //     setState('idle');\\n            //     setLabel('Submit');\\n            // }, 2000);\\n        }, 1500); // 1.5 second thinking time\\n    };\\n\\n     // Cleanup timeout on unmount\\n    useEffect(() => {\\n        return () => {\\n            if (timeoutRef.current) clearTimeout(timeoutRef.current);\\n        };\\n    }, []);\\n\\n    return (\\n        <DemoWrapper>\\n            <motion.button\\n                onClick={handleClick}\\n                className={\`px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out relative overflow-hidden \${\\n                    state === 'idle' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :\\n                    state === 'thinking' ? 'bg-yellow-500 text-white cursor-wait' :\\n                    'bg-green-600 text-white cursor-default' // Final state\\n                }\`}\\n                disabled={state === 'thinking'}\\n            >\\n                <AnimatePresence mode=\"wait\">\\n                    <motion.span\\n                        key={state}\\n                        initial={{ opacity: 0, y: state === 'thinking' ? 0 : 10 }}\\n                        animate={{ opacity: 1, y: 0 }}\\n                        exit={{ opacity: 0, y: -10 }}\\n                        transition={{ duration: 0.2 }}\\n                        className=\"inline-flex items-center\"\\n                    >\\n                        {state === 'thinking' && (\\n                           <motion.svg className=\"animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: \"linear\" }}>\\n                              <circle className=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" strokeWidth=\"4\"></circle>\\n                              <path className=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>\\n                            </motion.svg>\\n                        )}\\n                        {label}\\n                    </motion.span>\\n                </AnimatePresence>\\n\\n            </motion.button>\\n            <p className=\"text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4\">Click -> Spins -> \"Wait...\" -> \"Okay fine.\"</p>\\n        </DemoWrapper>\\n    );\\n};`,
    doNotPressButton: `const DoNotPressButton: React.FC = () => {\\n    const [isHovering, setIsHovering] = useState(false);\\n    const [isClicked, setIsClicked] = useState(false);\\n\\n    const handleClick = () => {\\n        setIsClicked(true);\\n        console.log(\"You were warned.\");\\n    };\\n\\n    return (\\n        <DemoWrapper>\\n            <button\\n                onClick={handleClick}\\n                onMouseEnter={() => setIsHovering(true)}\\n                onMouseLeave={() => setIsHovering(false)}\\n                className={\`px-8 py-4 font-bold text-lg rounded-lg shadow-lg transition-all duration-200 ease-in-out \${\\n                    isClicked\\n                        ? 'bg-gray-500 text-gray-200 cursor-not-allowed scale-95'\\n                        : 'bg-red-600 hover:bg-red-700 text-white transform hover:scale-105'\\n                }\`}\\n                disabled={isClicked}\\n            >\\n                {isClicked ? \"You did this.\" : (isHovering ? \"Seriously.\" : \"Do Not Press\")}\\n            </button>\\n            <p className=\"text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4\">Hover: \"Seriously.\" Click: \"You did this.\"</p>\\n        </DemoWrapper>\\n    );\\n};`,
    cooldownCTA: `const CooldownCTAButton: React.FC = () => {\\n    const [isOnCooldown, setIsOnCooldown] = useState(false);\\n    const cooldownDuration = 3000; // 3 seconds\\n\\n    const handleClick = () => {\\n        if (isOnCooldown) return;\\n\\n        setIsOnCooldown(true);\\n        console.log(\"Button clicked. Entering cooldown...\");\\n        setTimeout(() => {\\n            setIsOnCooldown(false);\\n            console.log(\"...Cooldown finished.\");\\n        }, cooldownDuration);\\n    };\\n\\n    return (\\n        <DemoWrapper>\\n             <button\\n                onClick={handleClick}\\n                className={\`px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out relative overflow-hidden \${\\n                    isOnCooldown\\n                        ? 'bg-gray-400 text-gray-700 cursor-wait'\\n                        : 'bg-blue-600 hover:bg-blue-700 text-white'\\n                }\`}\\n                disabled={isOnCooldown}\\n             >\\n                <AnimatePresence mode=\"wait\">\\n                    <motion.span\\n                        key={isOnCooldown ? 'cooldown' : 'active'}\\n                        initial={{ opacity: 0, y: 10 }}\\n                        animate={{ opacity: 1, y: 0 }}\\n                        exit={{ opacity: 0, y: -10 }}\\n                        transition={{ duration: 0.2 }}\\n                    >\\n                        {isOnCooldown ? 'Brb recharging...' : 'Engage!'}\\n                    </motion.span>\\n                 </AnimatePresence>\\n            </button>\\n            <p className=\"text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4\">After click, label becomes: \"Brb recharging...\"</p>\\n        </DemoWrapper>\\n    );\\n};`,
    moodToggleButton: `const MoodToggleButton: React.FC = () => {\\n    const moods = [\"Click me\", \"Ignore me\", \"Validate me\", \"Never mind.\"];\\n    const [currentMoodIndex, setCurrentMoodIndex] = useState(0);\\n\\n    const handleHover = () => {\\n        setCurrentMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);\\n    };\\n\\n    return (\\n        <DemoWrapper>\\n            <button\\n                onMouseEnter={handleHover}\\n                className=\"px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md min-w-[150px] text-center relative overflow-hidden\"\\n            >\\n                <AnimatePresence mode=\"wait\">\\n                     <motion.span\\n                         key={currentMoodIndex}\\n                         initial={{ opacity: 0, y: 10 }}\\n                         animate={{ opacity: 1, y: 0 }}\\n                         exit={{ opacity: 0, y: -10 }}\\n                         transition={{ duration: 0.2 }}\\n                         className=\"block\" // Ensure span takes full button width for centering\\n                     >\\n                        {moods[currentMoodIndex]}\\n                     </motion.span>\\n                 </AnimatePresence>\\n            </button>\\n            <p className=\"text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4\">Each hover changes the text mood.</p>\\n        </DemoWrapper>\\n    );\\n};`,
    // Placeholders remain as placeholders until components are created
    newFormPattern1: `// TODO: Implement New Form Pattern 1`,
    newFormPattern2: `// TODO: Implement New Form Pattern 2`,
    newFormPattern3: `// TODO: Implement New Form Pattern 3`,
    newFormPattern4: `// TODO: Implement New Form Pattern 4`,
    newMicrointeraction1: `// TODO: Implement New Microinteraction 1`,
    newMicrointeraction2: `// TODO: Implement New Microinteraction 2`,
    newMicrointeraction3: `// TODO: Implement New Microinteraction 3`,
    newMicrointeraction4: `// TODO: Implement New Microinteraction 4`,
    newMobilePattern4: `// TODO: Implement New Mobile Pattern 4`,
    shyCard: `const ShyCard: React.FC = () => {\n    const cardRef = useRef<HTMLDivElement>(null);\n    const [rotate, setRotate] = useState({ x: 0, y: 0 });\n\n    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n        if (!cardRef.current) return;\n        const rect = cardRef.current.getBoundingClientRect();\n        const x = e.clientX - rect.left; // x position within the element.\n        const y = e.clientY - rect.top;  // y position within the element.\n\n        const centerX = rect.width / 2;\n        const centerY = rect.height / 2;\n\n        const rotateX = ((y - centerY) / centerY) * -10; // Max rotate 10deg\n        const rotateY = ((x - centerX) / centerX) * 10;  // Max rotate 10deg\n\n        setRotate({ x: rotateX, y: rotateY });\n    };\n\n    const handleMouseLeave = () => {\n        setRotate({ x: 0, y: 0 }); // Reset rotation\n    };\n\n    return (\n        <DemoWrapper className="items-center justify-center perspective">\n            <motion.div\n                ref={cardRef}\n                onMouseMove={handleMouseMove}\n                onMouseLeave={handleMouseLeave}\n                className="w-48 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 dark:from-purple-600 dark:to-indigo-700 rounded-lg shadow-lg flex items-center justify-center text-white font-medium p-4 text-center cursor-default transform-style-3d"\n                style={{\n                    rotateX: rotate.x,\n                    rotateY: rotate.y,\n                }}\n                transition={{ type: \'spring\', stiffness: 300, damping: 20 }}\n            >\n                Give me space.\n            </motion.div>\n            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Tilts away from your cursor. It\'s shy.</p>\n            {/* Add CSS for perspective and transform-style if not globally defined */}\n            <style>{\`.perspective { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; }\`}</style>\n        </DemoWrapper>\n    );\n};`,
    unhelpfulHover: `const UnhelpfulHoverReveal: React.FC = () => {\n    return (\n         <DemoWrapper>\n            <div className="relative group">\n                <span className="inline-block bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded cursor-help">\n                    Hover for info\n                </span>\n                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    There\'s nothing here. Just vibes.\n                     <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>\n                </div>\n            </div>\n            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">Reveals absolutely nothing useful on hover.</p>\n        </DemoWrapper>\n    );\n};`,
    passiveFlipCard: `const PassiveAggressiveFlipCard: React.FC = () => {\n    const [isFlipped, setIsFlipped] = useState(false);\n\n    return (\n        <DemoWrapper className="items-center justify-center perspective h-[150px]">\n            <motion.div\n                className="w-48 h-32 relative cursor-pointer transform-style-3d"\n                onClick={() => setIsFlipped(!isFlipped)}\n                animate={{ rotateY: isFlipped ? 180 : 0 }}\n                transition={{ duration: 0.5 }}\n            >\n                {/* Front */}\n                <motion.div\n                    className="absolute w-full h-full bg-blue-500 dark:bg-blue-700 rounded-lg shadow-md flex items-center justify-center text-white p-4 text-center backface-hidden"\n                     style={{ rotateY: 0 }} // Explicitly set rotateY to prevent flickering issues\n                >\n                    Click to Flip\n                </motion.div>\n                {/* Back */}\n                <motion.div\n                    className="absolute w-full h-full bg-yellow-400 dark:bg-yellow-600 rounded-lg shadow-md flex items-center justify-center text-gray-800 p-4 text-center backface-hidden"\n                    style={{ rotateY: 180 }} // Start flipped\n                >\n                    Was that worth the click?\n                </motion.div>\n            </motion.div>\n             <p className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full text-center">Flips over to question your choices.</p>\n             {/* Add CSS for perspective, transform-style, backface-visibility */}\n             <style>{\`\n                .perspective { perspective: 1000px; }\n                .transform-style-3d { transform-style: preserve-3d; }\n                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }\n            \`}</style>\n        </DemoWrapper>\n    );\n};`,
    overwhelmedCard: `const OverwhelmedExpandableCard: React.FC = () => {\n    const [isOpen, setIsOpen] = useState(false);\n    const [isOverwhelmed, setIsOverwhelmed] = useState(false);\n    const timeoutRef = useRef<NodeJS.Timeout | null>(null);\n    const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n\n    const handleClick = () => {\n        if (isOpen || isOverwhelmed) return; // Prevent interaction while closing/overwhelmed\n\n        setIsOpen(true);\n        console.log("Expanding... oh no.");\n        if (timeoutRef.current) clearTimeout(timeoutRef.current);\n        timeoutRef.current = setTimeout(() => {\n            setIsOverwhelmed(true);\n            console.log("Too much!");\n             // Start collapsing after showing overwhelmed message\n             if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);\n             collapseTimeoutRef.current = setTimeout(() => {\n                 setIsOpen(false);\n                 // Delay resetting overwhelmed state until after collapse animation might finish (approx 300ms)\n                 if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);\n                 resetTimeoutRef.current = setTimeout(() => setIsOverwhelmed(false), 300);\n                 console.log("Collapsing. Phew.");\n             }, 800); // How long to show the overwhelmed message\n        }, 1000); // How long to stay open before getting overwhelmed\n    };\n\n    useEffect(() => {\n        // Cleanup all timeouts on unmount\n        return () => {\n            if (timeoutRef.current) clearTimeout(timeoutRef.current);\n            if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);\n            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);\n        };\n    }, []);\n\n\n    return (\n        <DemoWrapper className="items-stretch justify-start w-full">\n            <button\n                onClick={handleClick}\n                className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-t border-b border-gray-200 dark:border-gray-600"\n                aria-expanded={isOpen}\n                disabled={isOpen || isOverwhelmed}\n            >\n                <span className="font-medium">Expand Content</span>\n                <span className={\`transition-transform \${isOpen ? \'rotate-180\' : \'\'}\`}>\n                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>\n                </span>\n            </button>\n            <AnimatePresence initial={false}>\n                {isOpen && (\n                    <motion.div\n                        key="content-overwhelmed"\n                        initial="collapsed"\n                        animate="open"\n                        exit="collapsed"\n                        variants={{\n                            open: { opacity: 1, height: "auto" },\n                            collapsed: { opacity: 0, height: 0 }\n                        }}\n                        transition={{ duration: 0.3, ease: "easeInOut" }}\n                        className="p-4 bg-white dark:bg-gray-800 rounded-b overflow-hidden"\n                    >\n                        <AnimatePresence mode="wait">\n                           {isOverwhelmed ? (\n                                <motion.p\n                                    key="overwhelmed-msg"\n                                    initial={{ opacity: 0 }}\n                                    animate={{ opacity: 1 }}\n                                    exit={{ opacity: 0 }}\n                                    transition={{ duration: 0.2 }}\n                                    className="text-red-600 dark:text-red-400 font-semibold"\n                                >\n                                    Too much. Collapsing now.\n                                </motion.p>\n                           ) : (\n                                <motion.p\n                                    key="content-msg"\n                                     initial={{ opacity: 0 }}\n                                    animate={{ opacity: 1 }}\n                                    exit={{ opacity: 0 }}\n                                    transition={{ duration: 0.2 }}\n                                >\n                                    Here\'s the detailed content you wanted...\n                                </motion.p>\n                           )}\n                        </AnimatePresence>\n                    </motion.div>\n                )}\n            </AnimatePresence>\n            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 text-center">Expands, gets overwhelmed, collapses.</p>\n        </DemoWrapper>\n    );\n};`,
};

export default codeSnippets; 