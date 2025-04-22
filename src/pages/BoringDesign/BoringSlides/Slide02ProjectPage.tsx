import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/PageTransition';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../../../components/EnhancedInteractiveElements'; // Assuming this path is correct

// --- Reusable Slide Component ---
interface SlideProps {
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string; // Allow custom styling for the section if needed
}

const Slide: React.FC<SlideProps> = ({ label, title, children, className = "" }) => (
  <section className={` py-12 md:py-12 flex items-center ${className}`}>
    <div className="px-12 w-full">
      <ScrollReveal>
        {label && (
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {label}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12">
          {title}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Applying prose for basic styling, but children can override */}
          {children}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// --- Helper Components (Keep as is, assuming they are useful) ---
// Helper component for color swatches (Can be removed if not used)
const ColorSwatch: React.FC<{ color: string; name: string; hex: string; className?: string }> = ({ color, name, hex, className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full mb-2 shadow-inner ${color}`}></div>
    <p className="font-medium text-sm dark:text-gray-300">{name}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{hex}</p>
  </div>
);

// Helper component for font display (Can be removed if not used)
const FontDisplay: React.FC<{ name: string; className: string; weights: string[] }> = ({ name, className, weights }) => (
  <div>
    <h4 className={`text-2xl mb-2 ${className} dark:text-gray-200`}>{name}</h4>
    <p className={`${className} text-lg mb-2 dark:text-gray-300`}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
    <p className={`${className} text-lg mb-4 dark:text-gray-300`}>abcdefghijklmnopqrstuvwxyz 0123456789</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">Weights: {weights.join(', ')}</p>
  </div>
);

// Helper function for basic card structure
const CardPreview: React.FC<{ children: React.ReactNode; className?: string; isDark?: boolean }> =
    ({ children, className = "", isDark = false }) => (
    <div className={`rounded-lg shadow-md overflow-hidden p-4 text-xs min-h-[180px] flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'} ${className}`}>
      {children}
    </div>
);

// --- New Slide Collage Component ---
interface SlideCollageProps {
  cards: React.ReactNode[]; // Accept cards directly
  layout: number[]; // Accept layout array (column spans)
}

const SlideCollage: React.FC<SlideCollageProps> = ({ cards, layout }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 not-prose">
      {cards.map((CardComponent, index) => {
        const span = layout[index % layout.length] ?? 1; // Use modulo for safety if cards > layout length
        const gridColumnClass = `md:col-span-${span}`;

        return (
          <div key={index} className={`${gridColumnClass}`}>
            {CardComponent}
          </div>
        );
      })}
    </div>
  );
};


// --- Main Page Component ---
const Pitch02ProjectPage: React.FC = () => { // Renamed component

  // --- Define New Card Content Components (Planning/Phases Theme) ---
  const createCards = useCallback((variant: 'propositions') => {

    // ---- Planning Card Components ----

    // NEW: Graph Stats Card Component (Modernized)
    const GraphStatsCard: React.FC<{ isDark?: boolean, data?: number[] }> = ({ isDark = false, data = [30, 60, 45, 75, 50] }) => { // Respects isDark prop
        const maxValue = 100; // Assume percentage-based height
        // Define gradients for bars - Uses isDark
        const barGradientFrom = isDark ? 'from-gray-600' : 'from-gray-300';
        const barGradientTo = isDark ? 'to-gray-700' : 'to-gray-400';
        const highlightGradientFrom = 'from-blue-500';
        const highlightGradientTo = 'to-blue-600';

        return (
            <CardPreview isDark={isDark} className={`flex flex-col p-4 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border border-gray-200'}`}> {/* Adjusted bg */}
              <div className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Performance Snapshot</div> {/* Larger title */}
              {/* Adjusted height, spacing */}
              <div className="flex-grow flex items-end justify-center space-x-3 h-32 px-2">
                {data.map((value, index) => {
                    const isHighlighted = index === Math.floor(data.length / 2); // Highlight middle bar
                    const gradientClasses = isHighlighted
                        ? `${highlightGradientFrom} ${highlightGradientTo}`
                        : `${barGradientFrom} ${barGradientTo}`;
                    return (
                        <div
                            key={index}
                            className={`w-1/6 rounded-t-md bg-gradient-to-t ${gradientClasses} transition-all duration-300 hover:opacity-80`}
                            style={{ height: `${Math.min(value, maxValue)}%` }}
                            title={`Value: ${value}`}
                        ></div>
                    );
                })}
              </div>
               {/* Simplified labels or remove if not needed */}
               <div className={`mt-3 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Key Performance Indicators</div>
            </CardPreview>
        );
    };

    // Phases Timeline Card (Using Linear Horizontal Timeline)
    const PhasesTimelineCard: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => { // Default to dark, but prop can override
      const phases = [
          { title: "Discovery & Research", desc: "Understanding the problem space, user needs, and market context." },
          { title: "Design & Prototyping", desc: "Developing concepts, wireframes, and interactive prototypes." },
          { title: "Development & Testing", desc: "Building the solution and ensuring quality through rigorous testing." },
          { title: "Launch & Iteration", desc: "Deploying the solution and planning for future improvements." }
      ];
      const numPhases = phases.length;

      return (
        <CardPreview isDark={isDark} className={`col-span-2 md:col-span-3 p-6 ${isDark ? 'bg-black' : 'bg-white'}`}>
             <div className={`text-xxs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1 uppercase tracking-wider`}>Project Timeline</div>
             <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Phases</h3>
             <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>High-Level Stages</p>
             <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-700'} mb-10 max-w-md`}>A visual overview of the project's key phases, outlining the progression from initiation to completion and expected milestones.</p>

            {/* Linear Timeline Implementation */}
            <div className="relative w-full h-16 mb-4">
                {/* Background Line */}
                <div className={`absolute left-0 right-0 top-1/2 h-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} -translate-y-1/2`}></div>

                {/* Phase Markers & Progress Fill */}
                <div className="relative flex justify-between h-full">
                    {/* Progress fill for the first phase */}
                    <div
                        className={`absolute top-1/2 left-0 h-0.5 ${isDark ? 'bg-gray-400' : 'bg-gray-600'} -translate-y-1/2`}
                        style={{ width: `${100 / numPhases}%` }}
                    ></div>

                    {/* Markers at the start of each phase + end */}
                    {[...Array(numPhases + 1)].map((_, index) => (
                        <div
                            key={`marker-${index}`}
                            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${isDark ? 'bg-black border-gray-500' : 'bg-white border-gray-500'}`}
                            style={{ left: `${(index / numPhases) * 100}%` }}
                        >
                            {/* Highlight first marker? */}
                            {index === 0 && <div className={`w-full h-full rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'}`}></div>}
                        </div>
                    ))}
                </div>
             </div>

             {/* Phase Descriptions - Aligned with markers */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                 {phases.map((phase, n) => (
                    <div key={n} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left pl-1`}>
                        <div className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{`0${n + 1} ${phase.title}`}</div>
                        <div className="text-xxs leading-relaxed">{phase.desc}</div>
                    </div>
                 ))}
             </div>
        </CardPreview>
      );
    };

    // Quarterly Grid Card (Based on Image 3 - No Lorem)
    const QuarterlyGridCard: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => { // Default to light
       // Example: Replace months with potential focus areas or milestones
       const quarters = {
         Q1: ['Initiation', 'Planning', 'Setup'],
         Q2: ['Core Feature Dev', 'Alpha Release', 'User Feedback'],
         Q3: ['Refinement', 'Beta Release', 'Marketing Prep'],
         Q4: ['Launch', 'Post-Launch Support', 'Next Steps'],
       };
       return (
        <CardPreview isDark={isDark} className={`col-span-2 md:col-span-3 p-6 ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
             <div className={`text-xxs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1 uppercase tracking-wider`}>Quarterly Plan</div>
             <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Q1 - Q4</h3>
             <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Key Objectives & Focus</p>
             <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-700'} mb-8 max-w-md`}>A breakdown of the year's primary goals and activities, distributed across quarters to ensure steady progress and alignment.</p>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                {Object.entries(quarters).map(([q, items]) => (
                  <div key={q}>
                     <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3 uppercase`}>{q}</div>
                     <div className="space-y-3">
                        {items.map(item => (
                            <div key={item} className={`rounded-md p-3 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'}`}>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-200': 'text-gray-800'} mb-1`}>{item}</div>
                                <div className={`text-xxs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Focus Area</div>
                            </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
        </CardPreview>
       );
    };

     // Roadmap Timeline Card (Based on Image 4 - No Lorem)
    const RoadmapTimelineCard: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => ( // Default to dark
        <CardPreview isDark={isDark} className={`col-span-2 md:col-span-3 p-6 ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className={`text-xxs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1 uppercase tracking-wider`}>Development Roadmap</div>
            <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Roadmap</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Key Milestones & Timeline</p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-700'} mb-10 max-w-md`}>This timeline highlights significant milestones, showing the projected path and key delivery points over the coming weeks.</p>

            <div className="relative w-full h-auto overflow-x-auto py-4 whitespace-nowrap">
                <div className={`absolute left-4 right-4 h-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} style={{top: 'calc(50% - 1px)'}}></div>
                <div className="relative flex justify-between w-full px-2 md:px-4 min-w-[400px] md:min-w-full">
                    {/* Example milestones */}
                    {[{label: 'Week 1', tasks: []}, {label: 'Today', tasks: ['Kick-off Meeting', 'Requirements Finalized'] }, {label: 'Week 3', tasks: []}, {label: 'Week 4', tasks: []}, {label: 'Week 5', tasks: []}].map(({label, tasks}) => (
                         <div key={label} className="flex flex-col items-center z-10 mx-4 md:mx-0">
                            <div className={`w-3 h-3 rounded-full border-2 ${isDark ? 'bg-black border-gray-400' : 'bg-white border-gray-600'}`}></div>
                             <div className={`mt-3 text-xs font-medium px-2 py-0.5 rounded ${label === 'Today' ? (isDark ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black') : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>{label}</div>
                             {label === 'Today' && tasks.length > 0 && (
                                <div className={`mt-2 text-xxs ${isDark ? 'text-gray-500' : 'text-gray-600'} text-center leading-tight space-y-0.5`}>
                                   {tasks.map(task => <div key={task}>- {task}</div>)}
                                </div>
                              )}
                        </div>
                    ))}
                </div>
            </div>
        </CardPreview>
    );

    // --- Assemble Card Sets Based on Variant ---
    // Simplify to only one set

    const planningCardsSet1 = [
        <GraphStatsCard data={[50, 80, 60]} />, 
        <GraphStatsCard isDark data={[70, 40, 90]} />, 
        <GraphStatsCard data={[30, 55, 85, 40]} />,
        <PhasesTimelineCard isDark />,
        <RoadmapTimelineCard isDark />,
        <QuarterlyGridCard isDark={false}/>,
    ];

    // Explicitly return the set
    return planningCardsSet1;
  }, []);

  // --- Define Layout Structures ---
  // Adjust layouts for 6 cards
  const layoutStandard: number[] = [1, 1, 1, 1, 1, 1]; // 6 cards, all span 1
  const layoutWideMiddle: number[] = [1, 1, 1, 3, 3, 3]; // This layout works fine for 6 cards too (spans apply md+)

  const possibleLayouts = useMemo(() => [layoutStandard, layoutWideMiddle], []);


  // --- State for Cards & Layouts ---
  // Simplify state to only one variant
  const [cards, setCards] = useState(() => createCards('propositions')); // Type doesn't strictly matter now
  const [layout, setLayout] = useState<number[]>(() => layoutWideMiddle);

  // --- Shuffle Function (Fisher-Yates) ---
  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  };

  // --- Shuffle All Layouts and Card Orders ---
  // Simplify shuffle function
  const shuffleAll = useCallback(() => {
    // Shuffle card order within the single set
    setCards(prev => shuffleArray(prev));

    // Select a new random layout for the single variant
    setLayout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);

    // Remove shuffling for variants 2 and 3
    /*
    setVariant2Cards(prev => shuffleArray(prev));
    setVariant3Cards(prev => shuffleArray(prev));
    setVariant2Layout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);
    setVariant3Layout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);
    */
  }, [possibleLayouts]); // Simplified dependencies

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300 relative">
        {/* Header */}
        <header className="p-6 md:p-12 w-full absolute top-0 left-0 z-20">
            <div className="flex justify-between items-center">
                <Link to="/">
                  <div className="text-gray-900 dark:text-gray-100 font-bold text-2xl uppercase">
                    THE BORING DEV
                  </div>
                </Link>
            </div>
        </header>

        {/* --- Slide 1: Introduction --- */}
        <div className="pt-24  md:pt-32 ">
           <Slide
             label="Planning & Strategy" // Updated Label
             title="Slide 02 - Visualizing the Plan" // Updated Title
             className="bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent pt-12 mt-0"
           >
              <div className="max-w-3xl text-left">
                 <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-left">
                 Presenting the strategic approach. This slide showcases various methods for visualizing project phases, timelines, organizational structures, and quarterly goals. Ideal components for strategy presentations or project initiation meetings.
                 </p>
               </div>
           </Slide>
        </div>

        {/* --- Slide 2: Showcase Collage --- */}
        <Slide
          label="Templates" // Updated Label
          title={
            <div className="flex justify-between items-center">
              <span>Planning Component Examples</span> {/* Updated Title */}
              <button
                 onClick={shuffleAll} // Updated function name
                 className="ml-4 relative overflow-hidden group flex justify-center items-center text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-full px-4 py-1 text-sm transition-colors duration-300 ease-in-out whitespace-nowrap hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-black hover:border-gray-900 dark:hover:border-gray-100"
                 aria-label="Shuffle card layouts"
               >
                 <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      Shuffle
                    </span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                      Shuffle
                    </span>
                  </span>
               </button>
            </div>
          }
        >
          <div className="space-y-8 md:space-y-12">
             <SlideCollage cards={cards} layout={layout} />
          </div>
        </Slide>

      </div>
    </PageTransition>
  );
};

export default Pitch02ProjectPage; // Updated export 