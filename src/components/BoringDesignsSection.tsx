import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './EnhancedInteractiveElements';
import { Link } from 'react-router-dom';
import BoringDesignsHeader from './BoringDesignsHeader';
import { ComponentCollageHero } from './ComponentCollageHero';

// --- Interface Definitions (Define Interfaces First) ---
interface Project {
  id: string;
  title: string;
  description: string;
  slideComponent1: React.ReactNode;
  slideComponent2: React.ReactNode;
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

// --- DUMMY DATA (Using the Components defined above) ---
const boringDesignsData: Category[] = [
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
    id: 'interactions',
    title: 'Boring Interactions',
    projects: [
       {
        id: 'interaction-proj-1',
        title: 'Interactive Demo 1',
        description: 'Exploring subtle animations and user feedback mechanisms.',
        slideComponent1: <PlaceholderGraphic text="Interaction 1" className="bg-gray-200 dark:bg-gray-800"/>,
        slideComponent2: <PlaceholderGraphic text="Interaction 2" className="bg-gray-200 dark:bg-gray-800"/>,
        tags: ['Microinteractions', 'Animation', 'UX'],
        caseStudyLink: '#',
      },
    ],
  },
];

// --- AccordionItem Component ---
const AccordionItem: React.FC<{ category: Category; isOpen: boolean; onToggle: () => void }> = ({ category, isOpen, onToggle }) => {
  return (
    <div className="border-b border-boring-slate/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="group relative flex justify-between items-center w-full px-4 py-6 text-left text-2xl md:text-3xl font-medium text-boring-dark transition-colors duration-200 overflow-hidden"
        aria-expanded={isOpen}
        aria-controls={`content-${category.id}`}
      >
        <div className="absolute inset-0 w-full h-full bg-boring-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left z-0"></div>

        <div className="relative z-10 flex justify-between items-center w-full transition-transform duration-300 ease-out group-hover:-translate-y-1">
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            {category.title}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-3xl transition-colors duration-300 group-hover:text-white"
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
              open: { opacity: 1, height: 'auto', marginTop: '1rem', marginBottom: '2rem' },
              collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
            role="region"
            aria-labelledby={`button-${category.id}`}
          >
            {category.projects.length > 0 ? (
              <div className="space-y-16 md:space-y-24">
                {category.projects.map((project: Project, index: number) => (
                  <ScrollReveal key={project.id} delay={index * 100}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"> 
                      <div className="h-72 md:h-[440px]"> 
                         {project.slideComponent1} 
                      </div>
                       <div className="h-72 md:h-[440px]"> 
                         {project.slideComponent2}
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row justify-between md:items-end">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-xl font-semibold text-boring-dark mb-1">{project.title}</h4>
                            <p className="text-boring-dark/80 mb-3 max-w-md">{project.description}</p>
                             {project.caseStudyLink && project.caseStudyLink !== '#' && ( 
                                <Link to={project.caseStudyLink} className="text-boring-main hover:underline font-medium text-sm uppercase tracking-wider">
                                Read Full Case Study
                                </Link>
                            )}
                            {project.caseStudyLink === '#' && (
                                   <Link to={project.caseStudyLink} className="text-boring-main hover:underline font-medium text-sm uppercase tracking-wider">
                                   Read Full Case Study
                                   </Link>
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
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(boringDesignsData[0]?.id || null);

  const handleToggle = (id: string) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
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
               isOpen={openCategoryId === category.id}
               onToggle={() => handleToggle(category.id)}
             />
           ))}
         </div>
       </div>
    </section>
  );
};

export default BoringDesignsSection; 