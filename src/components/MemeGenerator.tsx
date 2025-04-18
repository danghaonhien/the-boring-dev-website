import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all available images
import cameraIcon from '../assets/images/meme/camera.png';
import frame0 from '../assets/images/meme/frame.png'; 
import frame1 from '../assets/images/meme/frame1.png';
import frame2 from '../assets/images/meme/frame2.png';
import frame3 from '../assets/images/meme/frame3.png';
import frame4 from '../assets/images/meme/frame4.png';
import frame5 from '../assets/images/meme/frame5.png';
import frame6 from '../assets/images/meme/frame6.png';
import frame7 from '../assets/images/meme/frame7.png';
import frame8 from '../assets/images/meme/frame8.png';
import frame9 from '../assets/images/meme/frame9.png';
import frame10 from '../assets/images/meme/frame10.png';
import frame11 from '../assets/images/meme/frame11.png';
import frame12 from '../assets/images/meme/frame12.png';
import frame13 from '../assets/images/meme/frame13.png';
import frame14 from '../assets/images/meme/frame14.png';
import frame15 from '../assets/images/meme/frame15.png';
import frame16 from '../assets/images/meme/frame16.png';
import frame17 from '../assets/images/meme/frame17.png';
import frame18 from '../assets/images/meme/frame18.png';
import frame19 from '../assets/images/meme/frame19.png';
import frame20 from '../assets/images/meme/frame20.png';
import frame21 from '../assets/images/meme/frame21.png';
import frame22 from '../assets/images/meme/frame22.png';
import frame23 from '../assets/images/meme/frame23.png';


// Array of available meme frames
const memeFrames = [
  frame0, frame1, frame2, frame3, frame4, frame5,
  frame6, frame7, frame8, frame9, frame10, frame11, frame12, frame13, frame14, frame15, frame16, frame17, frame18, frame19, frame20, frame21, frame22, frame23
];

const MemeGenerator: React.FC = () => {
  const [showMeme, setShowMeme] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false); 
  // State to hold the currently selected meme frame
  const [currentMemeFrame, setCurrentMemeFrame] = useState(memeFrames[0]); 

  const handleCameraClick = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150); 

    // Select a random frame
    const randomIndex = Math.floor(Math.random() * memeFrames.length);
    const nextMemeFrame = memeFrames[randomIndex];
    // Ensure different frame if resetting (optional, prevents same frame twice in a row)
    // if (showMeme && nextMemeFrame === currentMemeFrame && memeFrames.length > 1) {
    //   const nextIndex = (randomIndex + 1) % memeFrames.length;
    //   nextMemeFrame = memeFrames[nextIndex];
    // }
    setCurrentMemeFrame(nextMemeFrame);

    if (showMeme) {
      setShowMeme(false);
      setTimeout(() => {
        // Flash again on regenerate
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);
        // Reselect frame for the new animation instance
        const newRandomIndex = Math.floor(Math.random() * memeFrames.length);
        setCurrentMemeFrame(memeFrames[newRandomIndex]);
        setTimeout(() => setShowMeme(true), 50); 
      }, 300); 
    } else {
      setTimeout(() => setShowMeme(true), 50); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative py-24 pb-96  bg-boring-lightgray  shadow-inner overflow-hidden">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-boring-dark mb-8 text-center px-4">
        Need a Break? Generate a Meme!
      </h2>

      {/* Instructional text */}
      <p className="text-boring-dark/70 mb-6 text-center text-sm px-4">
        Click the camera for a random dev meme!
      </p>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80"> {/* Container */}
        {/* Camera Image */}
        <motion.img
          src={cameraIcon}
          alt="Polaroid Camera - Click to generate meme"
          className="absolute inset-0 w-full h-full object-contain cursor-pointer z-10"
          onClick={handleCameraClick}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />

        {/* Flash Effect */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              key="flash"
              className="absolute top-[5.5%] left-[32%] w-[35%] h-[11%] bg-white rounded-lg z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: 1, transition: { duration: 0.15, times: [0, 0.5, 1] } }} 
              exit={{ opacity: 0 }}
            >
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Meme Frame - Now uses currentMemeFrame state */}
        <AnimatePresence>
          {showMeme && (
            <motion.img
              key={currentMemeFrame} // Use image path as key to force re-render on change
              src={currentMemeFrame} // Use the state variable for the image source
              alt="Generated Meme Frame"
              className="absolute bottom-[-20%] left-1/2 w-[70%] h-auto object-contain z-0"
              style={{ translateX: '-50%' }}
              initial={{ y: '0%', opacity: 0.8, scale: 0.9 }} 
              animate={{ 
                y: '90%', 
                opacity: 1, 
                scale: 1,
                transition: { duration: 1.5, ease: [0.4, 0, 0.6, 1] } 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                transition: { duration: 0.3 } 
              }} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemeGenerator; 