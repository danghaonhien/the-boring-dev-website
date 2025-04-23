import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './EnhancedInteractiveElements';
import { Link } from 'react-router-dom';
import BoringDesignsHeader from './BoringDesignsHeader';
import { ComponentCollageHero } from './ComponentCollageHero';
import useMediaQuery from '../hooks/useMediaQuery';

// --- Interface Definitions (Define Interfaces First) ---
interface Project {
  id: string;
  title: string;
  description: string;
  slideComponent1: React.ReactNode;
  slideComponent2: React.ReactNode | null; // Allow null for interactions
  tags: string[];
  caseStudyLink?: string;
}

interface Category {
  id: string;
  title: string;
  projects: Project[];
}

// --- Helper Slide Components ---
const PlaceholderGraphic: React.FC<{ className?: string; text?: string }> = ({ className = 'bg-gray-300', text }) => (
  <div className={`w-full h-32 rounded flex items-center justify-center text-gray-500 text-sm ${className}`}>
    {text || '[Graphic]'}
  </div>
);

const SlideIntroSlide: React.FC = () => (
  <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div>
      <h3 className="text-4xl lg:text-5xl font-bold text-black dark:text-white">Slide - 01</h3>
      <p className="text-gray-400 dark:text-gray-500 text-2xl">Template</p>
    </div>
    <div className="mt-auto pt-4 text-right">
      <p className="text-3xl lg:text-6xl font-semibold text-black dark:text-white mb-6">
          Low Effort,<br/> High Impact
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto max-w-[60%]">
      Minimal slides, maximum vibes.
      </p>
    </div>
  </div>
);
const SlideIntroSlide2: React.FC = () => (
  <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div>
      <h3 className="text-4xl lg:text-5xl font-bold text-black dark:text-white">Slide - 02</h3>
      <p className="text-gray-400 dark:text-gray-500 text-2xl">Template</p>
    </div>
    <div className="mt-auto pt-4 text-right">
      <p className="text-3xl lg:text-6xl font-semibold text-black dark:text-white mb-6">
      Roadmap to<br/> Somewhere (Probably)
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto max-w-[60%]">
      Timelines are flexible. Vibes are not.
      </p>
    </div>
  </div>
);
const SlideIntroSlide3: React.FC = () => (
  <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div>
      <h3 className="text-4xl lg:text-5xl font-bold text-black dark:text-white">Slide - 03</h3>
      <p className="text-gray-400 dark:text-gray-500 text-2xl">Template</p>
    </div>
    <div className="mt-auto pt-4 text-right">
      <p className="text-3xl lg:text-6xl font-semibold text-black dark:text-white mb-6">
          Typography vs<br/> Impostor Syndrome
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto max-w-[60%]">
     Good font is a choice, not a default.
      </p>
    </div>
  </div>
);
const DSIntroSlide1: React.FC = () => (
  <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div>
      <h3 className="text-4xl lg:text-5xl font-bold text-black dark:text-white">Design System - 01</h3>
      <p className="text-gray-400 dark:text-gray-500 text-2xl">Template</p>
    </div>
    <div className="mt-auto pt-4 text-right">
      <p className="text-3xl lg:text-6xl font-semibold text-black dark:text-white mb-6">
      A system so simple, <br/> it kinda works
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto max-w-[60%]">
      Just enough structure to stop chaos, not enough to start a fight.
      </p>
    </div>
  </div>
);


// --- NEW Font Display Preview Component (Based on Slide03) ---
const FontDisplayPreview: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
  <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full ${isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}>
    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Inter</div>
    <div style={{ fontFamily: "'Inter', sans-serif" }} className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      <p style={{ fontWeight: 300 }} className="text-[10px] leading-tight">Light (Aa)</p>
      <p style={{ fontWeight: 400 }} className="text-[10px] leading-tight">Regular (Bb)</p>
      <p style={{ fontWeight: 500 }} className="text-[10px] leading-tight">Medium (Cc)</p>
    </div>
    <div className={`text-[9px] mt-auto pt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
      Sizes: 14px, 18px, 30px<br/>
      Use: UI, Body, Headings
    </div>
  </div>
);

// --- Slide 02 Preview Components (Based on Slide02ProjectPage) ---

const GraphStatsPreview: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
  <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-black border border-gray-200'}`}>
    <div className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Performance</div>
    <div className="flex-grow flex items-end justify-center space-x-1 h-16 px-1">
      {[30, 60, 45, 75, 50].map((value, index) => (
        <div key={index} className={`w-1/6 rounded-t bg-gradient-to-t ${index === 2 ? 'from-blue-500 to-blue-600' : (isDark ? 'from-gray-600 to-gray-700' : 'from-gray-300 to-gray-400')}`} style={{ height: `${value}%` }}></div>
      ))}
    </div>
    <div className={`mt-1 text-center text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>KPIs</div>
  </div>
);

const PhasesTimelinePreview: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => (
  <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full ${isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}>
    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Phases</div>
    <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>High-Level Stages</div>
    {/* Simplified timeline */}
    <div className="relative w-full h-4 my-2">
      <div className={`absolute left-0 right-0 top-1/2 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'} -translate-y-1/2`}></div>
      <div className="relative flex justify-between h-full">
        {[...Array(5)].map((_, index) => (
          <div key={`marker-${index}`} className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border ${isDark ? 'bg-black border-gray-500' : 'bg-white border-gray-500'}`} style={{ left: `${(index / 4) * 100}%` }}></div>
        ))}
      </div>
    </div>
    <div className={`grid grid-cols-4 gap-1 text-[9px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
      <div>Disc.</div> <div>Design</div> <div>Dev.</div> <div>Launch</div>
    </div>
  </div>
);

const QuarterlyGridPreview: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
   <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black border border-gray-200'}`}>
    <div className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Quarterly Plan</div>
    <div className="grid grid-cols-2 gap-1 flex-grow text-[10px]">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'} p-1 rounded`}><strong>Q1:</strong> Init, Plan</div>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'} p-1 rounded`}><strong>Q2:</strong> Dev, Alpha</div>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'} p-1 rounded`}><strong>Q3:</strong> Refine, Beta</div>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'} p-1 rounded`}><strong>Q4:</strong> Launch, Next</div>
    </div>
  </div>
);

const CompetitorSlide: React.FC = () => (
  <div className="bg-black p-6 rounded-lg shadow-md h-full text-white flex space-x-4">
    <div className="w-1/3">
      <p className="text-xs text-gray-400 mb-1">Market</p>
      <h3 className="text-lg font-medium mb-4">Competitors</h3>
      <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </div>
    <div className="w-2/3 bg-gray-900 rounded p-4 relative flex items-center justify-center">
      <div className="absolute top-2 left-2 text-xs text-gray-500">Product Y</div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">Product X</div>
      <div className="absolute top-2 right-2 text-xs text-gray-500">Product Z</div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">Product W</div>
      <div className="w-px h-full bg-gray-700 absolute left-1/2 top-0"></div>
      <div className="h-px w-full bg-gray-700 absolute top-1/2 left-0"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full absolute" style={{ top: 'calc(50% - 6px)', left: 'calc(50% - 6px)' }}></div>
      <p className="text-xs text-gray-400 absolute" style={{ top: 'calc(50% - 16px)', left: 'calc(50% + 8px)' }}>Your Offering</p>
    </div>
  </div>
);

const VisionSlide: React.FC = () => (
   <div className="bg-black p-6 rounded-lg shadow-md h-full text-white flex space-x-4">
      <div className="w-1/3">
         <p className="text-xs text-gray-400 mb-1">Vision</p>
         <h3 className="text-lg font-medium mb-4">To become an essential component of the XXX industry</h3>
         <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
      <div className="w-2/3 bg-gray-900 rounded p-4 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
              {[...Array(7)].map((_, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center text-xs ${i === 3 ? 'bg-gray-400 text-black' : 'bg-gray-700 text-gray-400' }`}>Logo</div>
              ))}
          </div>
      </div>
   </div>
);

const FinancialsSlide: React.FC = () => (
  <div className="bg-black p-6 rounded-lg shadow-md h-full text-white flex space-x-4">
    <div className="w-2/3">
      <p className="text-xs text-gray-400 mb-1">Business</p>
      <h3 className="text-lg font-medium mb-4">Financial projections</h3>
      <div className="text-xs text-gray-400 space-y-1">
          <p>Marketing</p>
          <ul className="list-disc list-inside text-gray-500 ml-2">
              <li>Website visitors: 150,000</li>
              <li>Sign-ups: 30,000</li>
          </ul>
           <p className="mt-2">Product</p>
           <ul className="list-disc list-inside text-gray-500 ml-2">
              <li>Activation rate: 15%</li>
          </ul>
      </div>
    </div>
    <div className="w-1/3 flex flex-col justify-between items-end">
        <div className="w-4 h-4 rounded-full bg-gray-700"></div>
        <div className="space-y-2">
            <div className="w-16 h-8 bg-gray-700 rounded text-xs flex items-center justify-center">TAM</div>
            <div className="w-16 h-8 bg-gray-700 rounded text-xs flex items-center justify-center">SOM</div>
        </div>
    </div>
  </div>
);

// --- NEW Interaction Card Component ---
const InteractionCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md h-full flex flex-col border border-gray-200 dark:border-gray-700">
    <h5 className="text-md font-semibold text-boring-dark dark:text-white mb-2">{title}</h5>
    <p className="text-sm text-boring-dark/80 dark:text-gray-300 flex-grow">{description}</p>
     <div className="mt-3 h-1 bg-boring-main/20 rounded-full w-1/2 group-hover:w-full transition-all duration-300"></div>
  </div>
);

// --- NEW Collage Slideshow Component (Defined after helpers, before data) ---
const CollageSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardPreviews = [
    // Phases Card Preview
    <div className="bg-gray-200 p-4 space-y-2 rounded-lg text-xs w-full h-full flex flex-col justify-center">
      <div className="text-xxs font-medium text-gray-500">Phases</div>
      <ul className="list-disc list-inside text-xxs text-gray-700 pl-1">
        <li>Phase 1: Research</li> <li>Phase 2: Ideation</li> <li>Phase 3: Proposal</li>
      </ul>
      <div className="text-xxs font-medium text-gray-500 pt-2">Deliverables</div>
      <ul className="list-disc list-inside text-xxs text-gray-700 pl-1">
        <li>Deliverable 1</li> <li>Deliverable 2</li> <li>Deliverable 3</li>
      </ul>
    </div>,
    // TOC Card Preview
    <div className="bg-gray-200 p-4 rounded-lg text-xs w-full h-full flex flex-col justify-center">
       <div className="text-gray-400 text-xl font-bold space-y-0 leading-tight">
          <div><span className="text-gray-400">03</span> Process</div>
          <div><span className="text-gray-400">04</span> Concept</div>
          <div><span className="text-gray-400">05</span> Results</div>
       </div>
       <div className="text-xxs text-gray-500 mt-2">Client / Project</div>
    </div>,
     // Stats Card Preview
    <div className="bg-gray-200 p-4 space-y-2 rounded-lg text-xs w-full h-full flex flex-col justify-center">
       <div className="bg-white p-2 rounded text-center">
          <div className="text-xxs text-gray-500 mb-1">Customers</div>
          <div className="text-lg font-medium text-black">▲ 20%</div>
       </div>
        <div className="bg-white p-2 rounded text-center">
          <div className="text-xxs text-gray-500 mb-1">Downloads</div>
          <div className="text-lg font-medium text-black">▲ 587</div>
       </div>
    </div>,
    // Case Study Card Preview
     <div className="bg-black text-white col-span-1 flex space-x-2 p-0 overflow-hidden rounded-lg text-xs w-full h-full">
        <div className="w-1/3 bg-black p-3 flex flex-col justify-between">
          <div>
            <div className="font-semibold text-sm">Case study</div>
            <div className="text-gray-400 text-xxs">Title here</div>
          </div>
           <div className="text-xxs text-gray-500">Client</div>
        </div>
        <div className="w-2/3 bg-gray-700"></div>
      </div>,
      // Process Card Preview (Simple List Version)
     <div className="bg-black text-white p-4 rounded-lg text-xs w-full h-full flex flex-col justify-center">
       <div className="text-xxs text-gray-400">Process</div>
       <div className="font-medium mb-1 text-sm">Project Stages</div>
       <ul className="space-y-0 text-xxs pl-1">
           <li>1. Services</li> <li>2. Ideation</li> <li>3. Proposal</li> <li>4. Proto</li> <li>5. Impl.</li>
       </ul>
    </div>,
     // Concept Card Preview
     <div className="bg-black text-white p-4 rounded-lg text-xs w-full h-full flex flex-col justify-center">
        <div className="text-xxs text-gray-400">Concept</div>
        <div className="font-medium mb-1 text-sm">Main Concepts</div>
        <ul className="space-y-0 text-xxs">
          <li>{'>'} Concept one.</li> <li>{'>'} Concept two.</li> <li>{'>'} Concept three.</li>
        </ul>
     </div>,
     // Recognition Card Preview
     <div className="bg-white p-4 space-y-1 rounded-lg text-xs w-full h-full flex flex-col justify-center">
       <div className="font-medium text-sm">Recognition</div>
       <div className="text-xxs text-gray-500">Industry Press</div>
       <div className="grid grid-cols-2 gap-1 mt-1">
         {[...Array(4)].map((_, i) => (
           <div key={i} className="bg-black rounded p-1 flex justify-between items-center text-xxs">
             <span className="text-white">Award</span> <span className="bg-gray-700 w-3 h-3 rounded-sm"></span>
           </div>
         ))}
       </div>
     </div>,
      // Brief Card Preview
     <div className="bg-white p-4 rounded-lg text-xs w-full h-full flex flex-col justify-center">
        <div className="text-xxs text-gray-500">Brief</div>
        <div className="font-medium mb-1 text-sm">Overview</div>
        <div className="grid grid-cols-3 gap-1">
           <div className="bg-gray-200 rounded h-8"></div> <div className="bg-gray-200 rounded h-8"></div> <div className="bg-gray-200 rounded h-8"></div>
           <div className="text-xxs text-gray-500 mt-0.5">Client?</div> <div className="text-xxs text-gray-500 mt-0.5">Problem?</div> <div className="text-xxs text-gray-500 mt-0.5">Opps?</div>
        </div>
     </div>,
      // Results Card Preview
     <div className="bg-white p-4 rounded-lg text-xs w-full h-full flex flex-col justify-center">
        <div className="text-xxs text-gray-500">Results</div>
        <div className="font-medium mb-1 text-sm">Achievements</div>
        <div className="bg-black rounded h-10 border border-gray-700/50 p-1 flex items-end space-x-px">
            <div className="w-1/5 h-[30%] bg-gray-600"></div> <div className="w-1/5 h-[50%] bg-gray-600"></div> <div className="w-1/5 h-[75%] bg-gray-500"></div> <div className="w-1/5 h-[60%] bg-gray-600"></div> <div className="w-1/5 h-[85%] bg-gray-500"></div>
        </div>
     </div>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardPreviews.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [cardPreviews.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="transform scale-150 w-[50%]">
             {cardPreviews[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- NEW Slide 02 Slideshow Component ---
const Slide02Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use the specific preview components for Slide 02
  const slidePreviews = [
    <GraphStatsPreview isDark={false} />,
    <PhasesTimelinePreview isDark />,
    <QuarterlyGridPreview isDark={false} />,
    // Add more previews if desired, perhaps dark versions?
     <GraphStatsPreview isDark />,
     <QuarterlyGridPreview isDark />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidePreviews.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [slidePreviews.length]);

  // Reuse structure from CollageSlideshow but with scale adjustment if needed
  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-4" // Add padding back
        >
          {/* Apply scaling to fit the small preview components well */}
          <div className="transform scale-125 w-[60%]">
            {slidePreviews[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- NEW Slide 03 Slideshow Component ---
const Slide03Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a few different font previews for the slideshow
  const slidePreviews = [
    <FontDisplayPreview isDark={false} />, // Inter light
    <FontDisplayPreview isDark={true} />,  // Inter dark
    // Add previews for other fonts if desired, e.g.:
     <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full bg-white text-black border border-gray-200`}> {/* Roboto Light */} 
      <div className={`font-semibold mb-1 text-black`}>Roboto</div>
      <div style={{ fontFamily: "'Roboto', sans-serif" }} className={`mb-2 text-gray-700`}>
        <p style={{ fontWeight: 300 }} className="text-[10px] leading-tight">Light (Aa)</p>
        <p style={{ fontWeight: 400 }} className="text-[10px] leading-tight">Regular (Bb)</p>
        <p style={{ fontWeight: 500 }} className="text-[10px] leading-tight">Medium (Cc)</p>
      </div>
      <div className={`text-[9px] mt-auto pt-1 text-gray-600`}>
        Sizes: 16px, 24px, 36px<br/> Use: UI, Android, Body
      </div>
    </div>,
     <div className={`rounded-lg shadow-md overflow-hidden p-3 text-xxs flex flex-col h-full bg-black text-white`}> {/* Playfair Dark */} 
      <div className={`font-semibold mb-1 text-white`}>Playfair Display</div>
      <div style={{ fontFamily: "'Playfair Display', serif" }} className={`mb-2 text-gray-300`}>
        <p style={{ fontWeight: 400 }} className="text-[10px] leading-tight">Regular (Aa)</p>
        <p style={{ fontWeight: 700 }} className="text-[10px] leading-tight">Bold (Bb)</p>
        <p style={{ fontWeight: 900 }} className="text-[10px] leading-tight">Black (Cc)</p>
      </div>
      <div className={`text-[9px] mt-auto pt-1 text-gray-500`}>
        Sizes: 3xl, 5xl, 6xl<br/> Use: Headlines, Luxury
      </div>
    </div>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidePreviews.length);
    }, 2500); // Cycle every 2.5 seconds
    return () => clearInterval(interval);
  }, [slidePreviews.length]);

  // Reusing the animation structure from Slide02Slideshow
  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex} // Key change triggers animation
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -15 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          {/* Scale the preview slightly to fit better */}
          <div className="transform scale-150 w-[50%] lg:w-[25%]">
            {slidePreviews[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- NEW Interaction Preview Components --- 

const PreviewHoverTabs: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <div className="flex space-x-1 mb-1">
      <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
      <div className="w-4 h-2 bg-indigo-300 ring-1 ring-indigo-500 rounded-sm"></div>
      <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
    </div>
    <div className="w-10 h-4 bg-white border border-gray-300 rounded-sm"></div>
    <div className="mt-1 text-gray-500">Hover Tabs</div>
  </div>
);

const PreviewUnsureButton: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <div className="px-2 py-0.5 bg-indigo-500 text-white rounded text-[8px]">Maybe?</div>
    <div className="mt-1 text-gray-500">Unsure Button</div>
  </div>
);

const PreviewStickyHeader: React.FC = () => (
  <div className="w-full h-full bg-white border border-gray-300 p-1 rounded flex flex-col text-xxs overflow-hidden">
    <div className="bg-gray-300 p-0.5 text-[8px] text-center text-gray-600 rounded-t-sm sticky top-0">Header</div>
    <div className="flex-grow bg-gray-100 h-4 mt-1"></div>
    <div className="mt-auto pt-1 text-gray-500 text-center">Sticky Header</div>
  </div>
);

const PreviewLoopingBreadcrumbs: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-start text-xxs">
    <div className="flex items-center space-x-0.5 text-[8px]">
      <span className="text-indigo-500 underline">Home</span>
      <span>&gt;</span>
      <span className="text-indigo-500 underline">...</span>
      <span>&gt;</span>
      <span className="text-gray-600">Loop</span>
    </div>
    <div className="mt-1 text-gray-500 self-center">Looping Nav</div>
  </div>
);

const PreviewSlowBackToTop: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <div className="px-1.5 py-0.5 border border-gray-400 rounded text-[8px] text-gray-600">Back ^</div>
    <div className="mt-1 text-gray-500">Slow Scroll</div>
  </div>
);

const PreviewGhostButtonImposter: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <div className="px-1.5 py-0.5 border border-indigo-400 border-dashed rounded text-[8px] text-indigo-500 opacity-60">Ghost?</div>
    <div className="mt-1 text-gray-500">Ghost Button</div>
  </div>
);

const PreviewShakyCheckbox: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <div className="flex items-center space-x-1">
      <div className="w-2.5 h-2.5 border border-gray-500 rounded-sm bg-white relative">
        {/* Tiny check */} 
        <svg className="w-2 h-2 absolute top-px left-px text-indigo-600" fill="currentColor" viewBox="0 0 16 16">
           <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
      </div>
      <span className="text-[8px] text-gray-600">Task?</span>
    </div>
    <div className="mt-1 text-gray-500">Shaky Checkbox</div>
  </div>
);

const PreviewExcuseInput: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <input type="text" placeholder="Excuse..." className="w-16 px-1 py-0.5 text-[8px] border border-gray-400 rounded-sm bg-white placeholder-gray-400" readOnly />
    <div className="mt-1 text-gray-500">Excuse Input</div>
  </div>
);

const PreviewLoopingForm: React.FC = () => (
  <div className="w-full h-full bg-white border border-gray-300 p-1.5 rounded flex flex-col text-xxs overflow-hidden">
     <div className="text-center text-[8px] font-medium mb-1">Step 1/3</div>
     <div className="w-full h-1 bg-gray-200 rounded-full mb-2">
       <div className="w-1/3 h-full bg-indigo-500 rounded-full"></div>
     </div>
     <div className="flex-grow h-4 bg-gray-100 rounded-sm mb-2"></div>
     <div className="flex justify-end">
        <button className="px-1 py-0 bg-indigo-500 text-white rounded text-[7px]">Next</button>
     </div>
     <div className="mt-auto pt-1 text-gray-500 text-center text-[9px]">Looping Form</div>
  </div>
);

const PreviewNeverSavingDraft: React.FC = () => (
  <div className="w-full h-full bg-gray-200 p-2 rounded flex flex-col justify-center items-center text-xxs">
    <button className="px-1.5 py-0.5 border border-gray-400 rounded text-[8px] text-gray-600">Save Draft</button>
     <div className="text-green-600 text-[8px] mt-0.5 h-2">Saved! (...)</div>
    <div className="mt-1 text-gray-500">Fake Save</div>
  </div>
);

// --- NEW Interaction Slideshow Component ---
const InteractionPreviewSlideshow: React.FC<{ previews: React.ReactNode[] }> = ({ previews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (previews.length <= 1) return; // Don't cycle if only one preview
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % previews.length);
    }, 2800); // Adjust timing as needed
    return () => clearInterval(interval);
  }, [previews.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
      <AnimatePresence initial={false} mode="wait"> 
        <motion.div
          key={currentIndex} // Key change triggers animation
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }} 
          transition={{ duration: 0.35, ease: "easeInOut" }} 
          className="absolute inset-0 flex items-center justify-center p-4" // Padding inside the motion div
        >
          {/* Removed scale-90 from this div */}
          <div className="w-full h-full">
            {previews[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- DUMMY DATA (Using the Components defined above) ---
const boringDesignsData: Category[] = [
    {
        id: 'design-systems',
        title: 'Boring Design Systems',
        projects: [
          {
            id: 'design-system-01',
            title: 'The Boring Design System',
            description: 'A system so simple, it kinda works. Just enough structure to stop chaos, not enough to start a fight.',
            slideComponent1: <DSIntroSlide1 />,
            slideComponent2: <ComponentCollageHero />,
            tags: ['Design System', 'UI Kit', 'Tokens', 'React'],
            caseStudyLink: '/projects/design-system-01',
          },
        ],
      },
  {
    id: 'boring-slides',
    title: 'Boring Slides',
    projects: [
      {
        id: 'slide-01',
        title: 'Slide 01: Low Effort, High Impact',
        description: 'Minimalist presentation template focused on core messaging and clean aesthetics.',
        slideComponent1: <SlideIntroSlide />,
        slideComponent2: <CollageSlideshow />,
        tags: ['Presentation', 'Minimalism', 'Template'],
        caseStudyLink: '/projects/slide-01',
      },
      {
        id: 'slide-02',
        title: 'Slide 02: Roadmap to Somewhere',
        description: 'Visualizing timelines and project phases without overcomplicating things.',
        slideComponent1: <SlideIntroSlide2 />,
        slideComponent2: <Slide02Slideshow />,
        tags: ['Roadmap', 'Timeline', 'Strategy'],
        caseStudyLink: '/projects/slide-02',
      },
      {
        id: 'slide-03',
        title: 'Slide 03: Typography vs Impostor Syndrome',
        description: 'Focusing on font choices and visual hierarchy in presentation design.',
        slideComponent1: <SlideIntroSlide3 />,
        slideComponent2: <Slide03Slideshow />,
        tags: ['Typography', 'Design', 'Visual Hierarchy'],
        caseStudyLink: '/projects/slide-03',
      },
    ],
  },
  
   {
    id: 'interactions',
    title: 'Boring Interactions',
    projects: [
       // Card 1
       {
        id: 'interaction-hover-effect',
        title: 'Hover Tabs w/ Regret Delay',
        description: 'Adds a 200ms delay for indecisive users.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewHoverTabs />, <PreviewLoopingForm /> ]} />,
        slideComponent2: null, 
        tags: ['Hover', 'Delay', 'Regret'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 2
      {
        id: 'interaction-unsure-button',
        title: 'Unsure Primary Button',
        description: 'Label: "Maybe Continue" / Hover: "Okay, fine." ',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewUnsureButton />, <PreviewShakyCheckbox />]} />,
        slideComponent2: null,
        tags: ['Button', 'Hover', 'Indecision'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 3
      {
        id: 'interaction-sticky-header',
        title: 'Detached Sticky Header',
        description: 'Always visible. Never invested.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewStickyHeader />, <PreviewExcuseInput />]} />,
        slideComponent2: null,
        tags: ['Sticky', 'Scroll', 'Layout'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 4
      {
        id: 'interaction-looping-replacement',
        title: 'Breadcrumbs That Forget',
        description: 'Navigation that leads somewhere unexpected.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewNeverSavingDraft />, <PreviewHoverTabs />]} />,
        slideComponent2: null,
        tags: ['Navigation', 'Surprise', 'Existential'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 5
      {
        id: 'interaction-slow-scroll',
        title: 'Slow Back To Top',
        description: 'For devs who just need a moment.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewSlowBackToTop />, <PreviewGhostButtonImposter />]} />,
        slideComponent2: null,
        tags: ['Scroll', 'Button', 'Patience'],
        caseStudyLink: '/projects/interaction-01',
      },
       // Card 6
       {
        id: 'interaction-ghost-imposter',
        title: 'Ghost Button w/ Impostor Syndrome',
        description: 'Invisible until hovered, then apologetic.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewGhostButtonImposter />, <PreviewNeverSavingDraft />]} />,
        slideComponent2: null,
        tags: ['Button', 'Ghost', 'Hover', 'Anxiety'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 7
       {
        id: 'interaction-excuse-input',
        title: 'Input Auto-filled with Excuses',
        description: 'Placeholder: "Didn\'t finish it because..." ',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewExcuseInput />, <PreviewHoverTabs />]} />,
        slideComponent2: null,
        tags: ['Input', 'Form', 'Placeholder', 'Humor'],
        caseStudyLink: '/projects/interaction-01',
      },
      // Card 8
       {
        id: 'interaction-shaky-checkbox',
        title: 'Checkbox That Shakes If Skipped',
        description: 'But not in a judgmental way.',
        slideComponent1: <InteractionPreviewSlideshow previews={[<PreviewShakyCheckbox />, <PreviewSlowBackToTop />]} />,
        slideComponent2: null,
        tags: ['Checkbox', 'Animation', 'Feedback', 'Anxiety'],
        caseStudyLink: '/projects/interaction-01',
      },
    ],
  },
];

// --- AccordionItem Component ---
const AccordionItem: React.FC<{ category: Category; isOpen: boolean; onToggle: () => void; isMobile: boolean }> = ({ category, isOpen, onToggle, isMobile }) => {
  
  // Slice projects only for interactions on mobile
  const interactionProjectsToShow = (category.id === 'interactions' && isMobile)
    ? category.projects.slice(0, 4)
    : category.projects;

  return (
    <div className="border-b border-boring-slate/20 last:border-b-0">
      <button
        onClick={onToggle}
        className={`
          group relative flex justify-between items-center w-full px-4 py-6
          text-left text-2xl md:text-3xl font-medium
          transition-colors duration-300 ease-out overflow-hidden
          ${
            isOpen
              ? 'bg-boring-dark text-white' // Open state: Dark bg, white text
              : 'bg-transparent text-boring-dark hover:text-white' // Added hover:text-white here
          }
        `}
        aria-expanded={isOpen}
        aria-controls={`content-${category.id}`}
      >
        {!isOpen && (
          <div className="absolute inset-0 w-full h-full bg-boring-dark transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out origin-bottom z-0"></div>
        )}

        <div className={`relative z-10 flex justify-between items-center w-full`}>
          <span className={`relative z-10 transition-colors duration-150 ${isOpen ? '' : ''}`}> 
            {category.title}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`relative z-10 text-3xl transition-colors duration-150`}
          >
            {isOpen ? '-' : '+'}
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`content-${category.id}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { 
                opacity: 1, 
                maxHeight: '3000px', // Adjusted max height for safety
                marginTop: '1rem', 
                marginBottom: '2rem' 
              },
              collapsed: { 
                opacity: 0, 
                maxHeight: 0, 
                marginTop: 0, 
                marginBottom: 0 
              }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
            role="region"
            aria-labelledby={`button-${category.id}`}
          >
            {/* Check original category.projects length before rendering */} 
            {category.projects.length > 0 ? ( 
              <div className="pb-8 md:pb-12"> {/* Added padding bottom */}
                {/* Conditionally render layout based on category */}
                {category.id === 'interactions' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Use the sliced array ONLY for interactions */} 
                      {interactionProjectsToShow.map((project: Project, index: number) => ( 
                        <ScrollReveal key={project.id} delay={index * 50}>
                          <div className="h-full group">
                             <div className="h-56">
                              {project.slideComponent1}
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                    {/* "View All" Link for Interactions */} 
                    <div className="mt-12 text-left">
                       <Link to="/projects/interaction-01" className="inline-block bg-boring-main text-white px-6 py-3 rounded-md hover:bg-boring-dark transition-colors font-medium text-sm uppercase tracking-wider shadow-md hover:shadow-lg">
                        View All Interactions
                       </Link>
                    </div>
                  </>
                ) : (
                  /* Original layout for other categories - use full projects array */ 
                  <div className="space-y-16 md:space-y-24">
                    {category.projects.map((project: Project, index: number) => ( 
                      <ScrollReveal key={project.id} delay={index * 100}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                          <div className="h-72 md:h-[440px]">
                           {project.slideComponent1}
                          </div>
                           {project.slideComponent2 && ( /* Only render if slideComponent2 exists */
                             <div className="h-72 md:h-[440px]">
                               {project.slideComponent2}
                            </div>
                          )}
                        </div>
                        {/* Keep the title/desc/tags section for non-interaction projects */} 
                        <div className="mt-6 flex flex-col md:flex-row justify-between md:items-end">
                            <div className="mb-4 md:mb-0">
                                <h4 className="text-xl font-semibold text-boring-dark mb-1">{project.title}</h4>
                                <p className="text-boring-dark/80 mb-3 max-w-md">{project.description}</p>
                                 {project.caseStudyLink && project.caseStudyLink !== '#' && (
                                    <Link to={project.caseStudyLink} className="text-boring-main hover:underline font-medium text-sm uppercase tracking-wider">
                                    Read Full Case Study
                                    </Link>
                                )}
                                {project.caseStudyLink === '#' && category.id !== 'interactions' && ( // Hide placeholder link for interactions
                                       <span className="text-gray-400 font-medium text-sm uppercase tracking-wider"> {/* Ensure this is span */} 
                                       Case Study Coming Soon
                                       </span>
                                )}
                            </div>
                           <div className="text-left md:text-right flex flex-wrap gap-2 justify-start md:justify-end">
                                {project.tags.map((tag: string) => (
                                <span key={tag} className="bg-boring-main/10 text-boring-main px-3 py-1 rounded-full text-xs font-medium">
                                    {tag}
                                </span>
                                ))}
                            </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-boring-dark/70 py-4">No projects yet in this category.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main BoringDesignsSection Component ---
const BoringDesignsSection: React.FC = () => {
  // State to hold an array of open category IDs
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([boringDesignsData[0]?.id || ' '].filter(id => id !== ' ')); // Default open first item if it exists
  
  // Use the hook here - below 640px is considered mobile
  const isMobile = useMediaQuery('(max-width: 639px)');

  const handleToggle = (id: string) => {
    setOpenCategoryIds(prevOpenIds => 
      prevOpenIds.includes(id)
        ? prevOpenIds.filter(openId => openId !== id) // Remove id if present
        : [...prevOpenIds, id] // Add id if not present
    );
  };

  return (
    <section className="py-20 md:py-32 relative">
       <div className="relative z-10 ">
         <BoringDesignsHeader categories={boringDesignsData} title="Boring Designs" />

         <div className="">
           {boringDesignsData.map((category: Category) => (
             <AccordionItem
               key={category.id}
               category={category}
               isOpen={openCategoryIds.includes(category.id)} // Check if ID is in the array
               onToggle={() => handleToggle(category.id)}
               isMobile={isMobile} // Pass the mobile status down
             />
           ))}
         </div>
       </div>
    </section>
  );
};

export default BoringDesignsSection; 