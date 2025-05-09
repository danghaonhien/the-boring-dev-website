import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ideaGeneratorImage from '../assets/images/idea/ideaGenerator.png'; // Assuming the path is correct
import { ideas, Idea } from '../data/ideaGeneratorData'; // Import data

const IdeaGenerator: React.FC = () => {
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const generateIdea = () => {
    setIsVisible(false); // Hide current idea to trigger exit animation
    const randomIndex = Math.floor(Math.random() * ideas.length);
    const newIdea = ideas[randomIndex];

    // Allow time for exit animation before showing new idea
    setTimeout(() => {
      setCurrentIdea(newIdea);
      setIsVisible(true); // Show new idea
    }, 300); // Match animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-boring-hero-bg dark:bg-boring-dark rounded-lg  relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-boring-dark dark:text-boring-offwhite text-center">
        Need a tiny, useful feature idea?
      </h2>
      <p className="text-boring-dark/80 dark:text-boring-offwhite/80 mb-8 text-center max-w-xl">
        Click the console for a random low-effort, high-impact feature!
      </p>
      <div className="relative w-full max-w-2xl cursor-pointer group" onClick={generateIdea}>
        <img
          src={ideaGeneratorImage}
          alt="Idea Generator Screen - Click to generate"
          className="w-full h-auto rounded-md transition-transform duration-300 ease-in-out group-hover:scale-[1.0001]"
        />
        {/* Idea Display Area - Positioned over the screen part of the image */}
        <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-8 md:p-12 lg:p-16 xl:p-auto  ">
          {/* Adjust padding based on image screen area */}
          <div className="w-[calc(100%-20%)] lg:w-[calc(100%-15%)] lg:h-[calc(100%-50%)] h-[calc(100%-52%)] bg-gray-700 bg-opacity-60 backdrop-blur-sm  rounded-md lg:rounded-xl flex items-center justify-center overflow-hidden mt-3 lg:mt-2">
             {/* Approximate screen area percentage - adjust as needed */}
            <AnimatePresence mode="wait">
              {isVisible && currentIdea && (
                <motion.div
                  key={currentIdea.title} // Key ensures re-render on change
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-left p-4 text-boring-offwhite max-w-full"
                >
                  <h3 className="text-[11px] sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-boring-offwhite/90">{currentIdea.title}</h3>
                  <p className="text-[11px] sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">{currentIdea.description}</p>
                  <p className="text-[11px] sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 italic text-boring-offwhite/90">
                    <span className="font-semibold">Solves:</span> {currentIdea.problem}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {currentIdea.tags.map((tag) => (
                      <span key={tag} className="text-[8px] md:text-[12px] lg:text-[14px] sm:text-xs bg-boring-slate/90 text-boring-offwhite px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              {!currentIdea && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="text-boring-offwhite text-center p-4 text-md sm:text-base md:text-lg lg:text-3xl font-bold"
                 >
                    Touch me if you dare!
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator; 