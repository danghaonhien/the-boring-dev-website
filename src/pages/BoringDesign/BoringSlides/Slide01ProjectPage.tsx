import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/PageTransition';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../../../components/EnhancedInteractiveElements'; // Assuming this path is correct
import Header from '../../../components/Header';
// --- Reusable Slide Component ---
interface SlideProps {
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string; // Allow custom styling for the section if needed
}

const Slide: React.FC<SlideProps> = ({ label, title, children, className = "" }) => (
  <section className={` py-12 md:py-12 flex items-center ${className}`}>
    <div className="px-6 pt-12 md:pt-12 lg:pt-12  lg:px-12 w-full">
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

// --- Helper Components (Keep as is) ---
// Helper component for color swatches
const ColorSwatch: React.FC<{ color: string; name: string; hex: string; className?: string }> = ({ color, name, hex, className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full mb-2 shadow-inner ${color}`}></div>
    <p className="font-medium text-sm dark:text-gray-300">{name}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{hex}</p>
  </div>
);

// Helper component for font display
const FontDisplay: React.FC<{ name: string; className: string; weights: string[] }> = ({ name, className, weights }) => (
  // Removed prose class from here as Slide component applies it
  <div>
    <h4 className={`text-2xl mb-2 ${className} dark:text-gray-200`}>{name}</h4>
    <p className={`${className} text-lg mb-2 dark:text-gray-300`}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
    <p className={`${className} text-lg mb-4 dark:text-gray-300`}>abcdefghijklmnopqrstuvwxyz 0123456789</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">Weights: {weights.join(', ')}</p>
  </div>
);

// Placeholder for graph/card examples
const PlaceholderComponent: React.FC<{ title: string; className?: string; isDark?: boolean }> = ({ title, className, isDark }) => (
  <div className={`border rounded-lg p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} ${className}`}>
    <h5 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h5>
    <div className={`h-20 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>[Content Area]</div>
  </div>
);

// --- New Slide Collage Component ---
interface SlideCollageProps {
  cards: React.ReactNode[]; // Accept cards directly
  layout: number[]; // Accept layout array (column spans)
}

// Helper function for basic card structure (can remain outside or be moved if preferred)
const CardPreview: React.FC<{ children: React.ReactNode; className?: string; isDark?: boolean }> =
    ({ children, className = "", isDark = false }) => (
    <div className={`rounded-lg shadow-md overflow-hidden p-4 text-xs min-h-[180px] flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'} ${className}`}>
      {children}
    </div>
);

const SlideCollage: React.FC<SlideCollageProps> = ({ cards, layout }) => {
  // No longer needs variant or internal card definitions/logic
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 not-prose">
      {/* Render the passed-in cards with dynamic column spans */}
      {cards.map((CardComponent, index) => {
        const span = layout[index % layout.length] ?? 1; // Use modulo for safety if cards > layout length
        const gridColumnClass = `md:col-span-${span}`; 
        // Base class will default to col-span-1 (full width) on mobile (grid-cols-1)

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
const Pitch01ProjectPage: React.FC = () => {
  // Remove dark mode state
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Define Card Content Components (specific to this page) ---
  // Using useMemo to avoid redefining these on every render unless variant changes (though variant doesn't exist here anymore, the concept applies if dependencies were added)

  const createCards = useCallback((variant: 1 | 2 | 3) => {
    // Define card content components inside useCallback or useMemo if they depend on props/state
    // For simplicity here, defining them directly, but useCallback ensures stable references if needed.

    const PhasesCard = (
        <CardPreview isDark={variant === 3} className={`col-span-1 ${variant === 3 ? '' : 'bg-gray-200 dark:bg-gray-800'} p-4 space-y-2`}>
          <div className="text-xxs font-medium text-gray-500 dark:text-gray-400">Phases</div>
          {variant === 2 ? (
             <ul className="space-y-1 text-xxs text-gray-700 dark:text-gray-300">
                <li>✓ Phase 1: Research</li>
                <li>✓ Phase 2: Ideation</li>
                <li>✓ Phase 3: Proposal</li>
              </ul>
          ) : (
              <ul className="list-disc list-inside text-xxs text-gray-700 dark:text-gray-300 pl-1">
                <li>Phase 1: Research</li>
                <li>Phase 2: Ideation</li>
                <li>Phase 3: Proposal</li>
              </ul>
          )}
           <div className="text-xxs font-medium text-gray-500 dark:text-gray-400 pt-2">Deliverables</div>
           <ul className="list-disc list-inside text-xxs text-gray-700 dark:text-gray-300 pl-1">
            <li>Deliverable 1</li>
            <li>Deliverable 2</li>
            <li>Deliverable 3</li>
          </ul>
        </CardPreview>
      );

      const TocCard = (
        <CardPreview isDark={variant === 1} className={`col-span-1 ${variant === 1 ? '' : 'bg-gray-200 dark:bg-gray-800'} p-4 ${variant === 2 ? 'text-center' : ''}`}>
           <div className="text-gray-400 dark:text-gray-500 text-4xl font-bold space-y-0 leading-none">
              <div><span className="text-gray-400 dark:text-gray-600">03</span> Process</div>
              <div><span className="text-gray-400 dark:text-gray-600">04</span> Concept</div>
              <div><span className="text-gray-400 dark:text-gray-600">05</span> Results</div>
           </div>
           <div className="text-xxs text-gray-500 dark:text-gray-400 mt-4">Client / Project</div>
        </CardPreview>
      );

      const StatsCard = (
        <CardPreview isDark={variant === 2} className={`col-span-1 ${variant === 2 ? '' : 'bg-gray-200 dark:bg-gray-800'} p-4 space-y-3`}>
           <div className="bg-white dark:bg-gray-700 p-3 rounded text-center flex-grow flex flex-col justify-center relative overflow-hidden">
              <div className="text-xxs text-gray-500 dark:text-gray-400 mb-1">Customers</div>
              <div className="text-2xl font-medium text-black dark:text-white">▲ 20%</div>
              {variant === 3 && (
                <div className="absolute bottom-0 left-0 w-full h-4 opacity-20">
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
                    <polyline points="0,8 20,5 40,7 60,4 80,6 100,3" fill="none" stroke="black" strokeWidth="1"/>
                  </svg>
                </div>
              )}
           </div>
            <div className="bg-white dark:bg-gray-700 p-3 rounded text-center flex-grow flex flex-col justify-center relative overflow-hidden">
              <div className="text-xxs text-gray-500 dark:text-gray-400 mb-1">Downloads</div>
              <div className="text-2xl font-medium text-black dark:text-white">▲ 587</div>
              {variant === 3 && (
                <div className="absolute bottom-0 left-0 w-full h-4 opacity-20">
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
                    <polyline points="0,3 20,6 40,4 60,7 80,5 100,8" fill="none" stroke="black" strokeWidth="1"/>
                  </svg>
                </div>
              )}
           </div>
        </CardPreview>
      );

       const CaseStudyCard = (
         <CardPreview isDark className="col-span-1 flex space-x-2 p-0 overflow-hidden">
            <div className="w-1/3 bg-black p-3">
              <div className="font-semibold text-sm">Case study</div>
              <div className="text-gray-400">Title here</div>
               <div className="text-xxs text-gray-500 mt-8">Client / Project</div>
            </div>
            <div className={`w-2/3 ${variant === 2 ? 'bg-gradient-to-br from-gray-600 to-gray-800' : 'bg-gray-700'}`}></div>
          </CardPreview>
      );

      const ProcessCard = (
         <CardPreview isDark className="col-span-1 p-3">
           <div className="text-xxs text-gray-400">Process</div>
           <div className="font-medium mb-3 text-sm">Highlight the project stages.</div>
           {variant === 1 && (
             <div className="bg-gray-900 h-12 rounded-lg flex items-center justify-between px-2 text-xxs relative">
               <div className={`flex w-full h-3 rounded-full bg-gray-700 overflow-hidden`}>
                  <div className="w-1/5 bg-gray-400"></div>
                  <div className="w-1/5 bg-gray-500"></div>
                  <div className="w-1/5 bg-gray-600"></div>
                  <div className={`w-2/5 bg-gray-800 border-l border-gray-900`}></div>
                </div>
               <div className="absolute bottom-1 right-2 text-gray-500">Today</div>
             </div>
           )}
           {variant === 2 && (
             <ul className="space-y-1 text-xs pl-1">
               <li>1. Services</li>
               <li>2. Ideation</li>
               <li>3. Proposal</li>
               <li>4. Prototyping</li>
               <li>5. Implementation</li>
             </ul>
           )}
           {variant === 3 && (
             <div className="bg-gray-900 h-12 rounded-lg flex items-stretch text-xxs text-center">
               <div className="w-1/5 bg-gray-700 rounded-l-lg flex items-center justify-center p-1 border-r border-black">Services</div>
               <div className="w-1/5 bg-gray-600 flex items-center justify-center p-1 border-r border-black">Ideation</div>
               <div className="w-1/5 bg-gray-500 flex items-center justify-center p-1 border-r border-black">Proposal</div>
               <div className="w-1/5 bg-gray-700 flex items-center justify-center p-1 border-r border-black">Prototype</div>
               <div className="w-1/5 bg-gray-600 rounded-r-lg flex items-center justify-center p-1">Implement</div>
             </div>
           )}
        </CardPreview>
      );

      const ConceptCard = (
         <CardPreview isDark className="col-span-1 p-3">
            <div className="text-xxs text-gray-400">Concept</div>
            <div className="font-medium mb-2 text-sm">Articulate the main concepts...</div>
            <ul className={`space-y-1 text-xs ${variant === 3 ? 'list-decimal list-inside' : ''}`}>
              <li>{variant !== 3 && '>'} Concept description one.</li>
              <li>{variant !== 3 && '>'} Concept description two.</li>
              <li>{variant !== 3 && '>'} Concept description three.</li>
            </ul>
         </CardPreview>
      );

      const RecognitionCard = (
         <CardPreview isDark={variant === 1} className="col-span-1 p-3 space-y-2">
           <div className="font-medium text-sm">Any recognition?</div>
           <div className="text-xxs text-gray-500">Features in industry press...</div>
           <div className={`mt-2 ${variant === 2 ? 'space-y-1' : 'grid grid-cols-2 gap-2'}`}>
             {[...Array(variant === 2 ? 3 : 4)].map((_, i) => (
               <div key={i} className={`bg-black rounded p-1 flex ${variant === 2 ? 'justify-start space-x-2' : 'justify-between'} items-center text-xxs`}>
                 <span className="text-white">Award</span>
                 <span className={`bg-gray-700 ${variant === 2 ? 'w-3 h-3' : 'w-4 h-4'} rounded-sm`}></span>
               </div>
             ))}
           </div>
         </CardPreview>
      );

      const BriefCard = (
         <CardPreview isDark={variant === 2} className={`col-span-1 p-3 ${variant === 3 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
            <div className="text-xxs text-gray-500">Brief</div>
            <div className="font-medium mb-2 text-sm">Provide an overview...</div>
            <div className={`${variant === 3 ? 'space-y-2' : 'grid grid-cols-3 gap-2'}`}>
               <div className="bg-gray-200 dark:bg-gray-700 rounded h-16 flex items-center justify-center text-gray-400 text-xxs">{variant === 3 ? 'Client' : ''}</div>
               <div className="bg-gray-200 dark:bg-gray-700 rounded h-16 flex items-center justify-center text-gray-400 text-xxs">{variant === 3 ? 'Problem' : ''}</div>
               <div className="bg-gray-200 dark:bg-gray-700 rounded h-16 flex items-center justify-center text-gray-400 text-xxs">{variant === 3 ? 'Opportunity' : ''}</div>
               {variant !== 3 && <div className="text-xxs text-gray-500 mt-1">Who's the client?</div>}
               {variant !== 3 && <div className="text-xxs text-gray-500 mt-1">Client's problem?</div>}
               {variant !== 3 && <div className="text-xxs text-gray-500 mt-1">Opportunities?</div>}
            </div>
         </CardPreview>
      );

      const ResultsCard = (
         <CardPreview isDark={variant === 3} className="col-span-1 p-3">
            <div className="text-xxs text-gray-500">Results</div>
            <div className="font-medium mb-2 text-sm">What achievements can you share?</div>
            <div className={`bg-black dark:bg-gray-800/50 rounded h-24 border border-gray-700/50 p-2 flex items-end ${variant === 2 ? 'justify-around' : 'space-x-1'}`}>
               {variant === 3 ? (
                 <div className="flex justify-around w-full h-full items-end">
                    <div className="flex items-end h-full space-x-px">
                        <div className="w-2 h-[40%] bg-gray-500 rounded-t-sm"></div>
                        <div className="w-2 h-[60%] bg-gray-600 rounded-t-sm"></div>
                    </div>
                     <div className="flex items-end h-full space-x-px">
                        <div className="w-2 h-[70%] bg-gray-500 rounded-t-sm"></div>
                        <div className="w-2 h-[50%] bg-gray-600 rounded-t-sm"></div>
                    </div>
                     <div className="flex items-end h-full space-x-px">
                        <div className="w-2 h-[30%] bg-gray-500 rounded-t-sm"></div>
                        <div className="w-2 h-[80%] bg-gray-600 rounded-t-sm"></div>
                    </div>
                 </div>
               ) : variant === 2 ? (
                 <>
                  <div className="w-4 h-[60%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
                  <div className="w-4 h-[40%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
                  <div className="w-4 h-[80%] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full"></div>
                  <div className="w-4 h-[55%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
                  <div className="w-4 h-[70%] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full"></div>
                 </>
               ) : (
                 <>
                   <div className="w-1/5 h-[30%] bg-gray-600 rounded-t-sm"></div>
                   <div className="w-1/5 h-[50%] bg-gray-600 rounded-t-sm"></div>
                   <div className="w-1/5 h-[75%] bg-gray-500 rounded-t-sm"></div>
                   <div className="w-1/5 h-[60%] bg-gray-600 rounded-t-sm"></div>
                   <div className="w-1/5 h-[85%] bg-gray-500 rounded-t-sm"></div>
                 </>
               )}
            </div>
         </CardPreview>
      );

    // Return the array of card components based on variant order
    switch (variant) {
        case 2:
          return [CaseStudyCard, ProcessCard, ConceptCard, PhasesCard, StatsCard, ResultsCard, RecognitionCard, TocCard, BriefCard];
        case 3:
          return [TocCard, BriefCard, StatsCard, RecognitionCard, ConceptCard, CaseStudyCard, ProcessCard, ResultsCard, PhasesCard];
        case 1:
        default:
          return [PhasesCard, TocCard, StatsCard, CaseStudyCard, ProcessCard, ConceptCard, RecognitionCard, BriefCard, ResultsCard];
      }
  }, []); // Empty dependency array for useCallback, as createCards itself doesn't depend on external state/props from Pitch01ProjectPage

  // --- Define Layout Structures ---
  const layoutStandard: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  const layoutA: number[] =        [2, 1, 1, 1, 1, 1, 1, 1, 1]; // First card wide
  const layoutB: number[] =        [1, 2, 1, 1, 1, 1, 1, 1, 1]; // Second card wide
  const layoutC: number[] =        [1, 1, 1, 2, 1, 1, 1, 1, 1]; // Fourth card wide (starts second row)
  const possibleLayouts = useMemo(() => [layoutStandard, layoutA, layoutB, layoutC], []);

  // --- State for Shuffled Cards ---
  const [variant1Cards, setVariant1Cards] = useState(() => createCards(1));
  const [variant2Cards, setVariant2Cards] = useState(() => createCards(2));
  const [variant3Cards, setVariant3Cards] = useState(() => createCards(3));

  // --- State for Layouts ---
  const [variant1Layout, setVariant1Layout] = useState<number[]>(() => layoutStandard);
  const [variant2Layout, setVariant2Layout] = useState<number[]>(() => layoutStandard);
  const [variant3Layout, setVariant3Layout] = useState<number[]>(() => layoutStandard);

  // --- Shuffle Function ---
  // Fisher-Yates (aka Knuth) Shuffle algorithm
  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array]; // Create a shallow copy to avoid mutating the original state directly before setting
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  };

  // Function to shuffle all layouts and card order
  const shuffleAllLayouts = useCallback(() => {
    // Shuffle card order
    setVariant1Cards(prev => shuffleArray(prev));
    setVariant2Cards(prev => shuffleArray(prev));
    setVariant3Cards(prev => shuffleArray(prev));

    // Select a new random layout for each variant
    setVariant1Layout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);
    setVariant2Layout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);
    setVariant3Layout(possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)]);
  }, [possibleLayouts, shuffleArray]);

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-boring-dark text-gray-800 dark:text-gray-200 transition-colors duration-300 relative">
      <Header />

        {/* --- Slide 1: Overview --- */}
        {/* Add padding-top to account for absolute header */}
        <div className=""> 
           <Slide 
             label="Overview" 
             title="Slide 01 - Low Effort, High Impact"
             // Remove top padding from first slide as wrapper adds it
             className="bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent pt-0 mt-0"
           >
              <div className="max-w-3xl  text-left"> 
                 <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-left">
                 This is where we act like we tried really hard. A quick setup of what this is, who it's for, and why it might just accidentally be useful. Minimal slides, maximum vibes. Let's go.
                 </p>
               </div>
           </Slide>
        </div>

        {/* --- Slide 6: Showcase Collage --- */}
        <Slide 
          label="Showcase" 
          title={
            <div className="flex justify-between items-center">
              <span>Template Styles</span>
              {/* Update Shuffle button style and structure */}
              <button
                 onClick={shuffleAllLayouts}
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
          <div className="space-y-8 md:space-y-12"> { /* Wrapper for spacing */ }
             <SlideCollage cards={variant1Cards} layout={variant1Layout} />
             <SlideCollage cards={variant2Cards} layout={variant2Layout} />
             <SlideCollage cards={variant3Cards} layout={variant3Layout} />
          </div>
        </Slide>

      </div>
    </PageTransition>
  );
};

export default Pitch01ProjectPage; 