import React, { useState, useEffect } from 'react';
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
  <section className={` py-16 md:py-24 flex items-center ${className}`}>
    <div className="px-4 w-full">
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
  variant: 1 | 2 | 3;
}

const SlideCollage: React.FC<SlideCollageProps> = ({ variant }) => {
  // Helper function for basic card structure
  const CardPreview: React.FC<{ children: React.ReactNode; className?: string; isDark?: boolean }> = 
    ({ children, className = "", isDark = false }) => (
    <div className={`rounded-lg shadow-md overflow-hidden p-4 text-xs min-h-[180px] flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'} ${className}`}>
      {children}
    </div>
  );

  // Define card content as components or JSX elements for easier shuffling
  const PhasesCard = (
    <CardPreview className="col-span-1 bg-gray-200 dark:bg-gray-800 p-4 space-y-2">
      <div className="text-xxs font-medium text-gray-500 dark:text-gray-400">Phases</div>
      {/* Variant 2: Checkmarks */} 
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
    <CardPreview className={`col-span-1 bg-gray-200 dark:bg-gray-800 p-4 ${variant === 2 ? 'text-center' : ''}`}>
       <div className="text-gray-400 dark:text-gray-500 text-4xl font-bold space-y-0 leading-none">
          <div><span className="text-gray-400 dark:text-gray-600">03</span> Process</div>
          <div><span className="text-gray-400 dark:text-gray-600">04</span> Concept</div>
          <div><span className="text-gray-400 dark:text-gray-600">05</span> Results</div>
       </div>
       <div className="text-xxs text-gray-500 dark:text-gray-400 mt-4">Client / Project</div>
    </CardPreview>
  );

  const StatsCard = (
    <CardPreview className="col-span-1 bg-gray-200 dark:bg-gray-800 p-4 space-y-3">
       <div className="bg-white dark:bg-gray-700 p-3 rounded text-center flex-grow flex flex-col justify-center relative overflow-hidden">
          <div className="text-xxs text-gray-500 dark:text-gray-400 mb-1">Customers</div>
          <div className="text-2xl font-medium text-black dark:text-white">▲ 20%</div>
          {/* Variant 3: Add simple graph hint */}
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
           {/* Variant 3: Add simple graph hint */}
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
       
       {/* Variant-specific Process Visualizations */}
       {variant === 1 && (
         <div className="bg-gray-900 h-12 rounded-lg flex items-center justify-between px-2 text-xxs relative">
            {/* Original Timeline Placeholder */}
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
     <CardPreview className="col-span-1 p-3 space-y-2">
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
     <CardPreview className={`col-span-1 p-3 ${variant === 3 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
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
     <CardPreview className="col-span-1 p-3">
        <div className="text-xxs text-gray-500">Results</div>
        <div className="font-medium mb-2 text-sm">What achievements can you share?</div>
        {/* Enhanced Placeholder Graph - Variant styles */}
        <div className={`bg-black dark:bg-gray-800/50 rounded h-24 border border-gray-700/50 p-2 flex items-end ${variant === 2 ? 'justify-around' : 'space-x-1'}`}>
           {variant === 3 ? (
             // Variant 3: Grouped bars
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
             // Variant 2: Round bars
             <>
              <div className="w-4 h-[60%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
              <div className="w-4 h-[40%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
              <div className="w-4 h-[80%] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full"></div>
              <div className="w-4 h-[55%] bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
              <div className="w-4 h-[70%] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full"></div>
             </>
           ) : (
             // Variant 1: Original square bars
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

  // Define card order based on variant
  let cards;
  switch (variant) {
    case 2:
      cards = [
        CaseStudyCard, ProcessCard, ConceptCard, // Row 1
        PhasesCard, StatsCard, ResultsCard,       // Row 2
        RecognitionCard, TocCard, BriefCard,        // Row 3
      ];
      break;
    case 3:
      cards = [
        TocCard, BriefCard, StatsCard,            // Row 1
        RecognitionCard, ConceptCard, CaseStudyCard, // Row 2
        ProcessCard, ResultsCard, PhasesCard,      // Row 3
      ];
      break;
    case 1:
    default:
      cards = [
        PhasesCard, TocCard, StatsCard,            // Row 1
        CaseStudyCard, ProcessCard, ConceptCard, // Row 2
        RecognitionCard, BriefCard, ResultsCard,      // Row 3
      ];
      break;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 not-prose">
      {cards.map((Card, index) => <React.Fragment key={index}>{Card}</React.Fragment>)}
    </div>
  );
};

// --- Main Page Component ---
const Pitch01ProjectPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300 relative">
        
        {/* Dark Mode Toggle - Positioned fixed for visibility */}
         <button
             onClick={() => setIsDarkMode(!isDarkMode)}
             className="fixed top-4 right-4 z-50 p-2 rounded bg-gray-200 dark:bg-gray-800 text-xs hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
             aria-label="Toggle Dark Mode"
           >
             {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>

        {/* --- Slide 1: Overview --- */}
        <Slide 
          label="Overview" 
          title="Pitch - 01 Template"
          className="bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent" // Subtle gradient for first slide
        >
           <div className="max-w-3xl mx-auto text-center"> 
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                A presentation template designed to help you craft compelling and persuasive pitches, featuring clear guidelines for a consistent and professional look.
              </p>
            </div>
        </Slide>

        {/* --- Slide 6: Showcase Collage --- */}
        <Slide label="Showcase" title="Template Styles">
          <div className="space-y-8 md:space-y-12"> { /* Wrapper for spacing */ }
             <SlideCollage variant={1} /> 
             <SlideCollage variant={2} /> 
             <SlideCollage variant={3} /> 
          </div>
        </Slide>

      </div>
    </PageTransition>
  );
};

export default Pitch01ProjectPage; 