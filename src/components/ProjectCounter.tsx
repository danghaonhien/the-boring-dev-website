import React, { useState, useEffect } from 'react';

interface ProjectCounterProps {
  isHeroRevealed: boolean;
  productCount: number;
}

const ProjectCounter: React.FC<ProjectCounterProps> = ({ isHeroRevealed, productCount }) => {
  const [displayCount, setDisplayCount] = useState(0);

  // Counter animation effect
  useEffect(() => {
    if (isHeroRevealed) {
      let start = 0;
      const end = productCount;
      if (start === end) {
        setDisplayCount(end); // Ensure final count is set if start === end
        return;
      }

      const duration = 1000;
      const startTime = performance.now();

      const animateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentCount = Math.floor(progress * end);
        setDisplayCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isHeroRevealed, productCount]);

  return (
    <div className="group flex items-end z-10 relative">
      <div className="text-boring-dark font-medium text-[12vw] tracking-tighter">
        {String(displayCount).padStart(2, '0')}
      </div>
      <span
        className="text-boring-dark font-medium text-[12vw] ml-7
                   opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-300 ease-in-out"
      >
        projects
      </span>
    </div>
  );
};

export default ProjectCounter; 