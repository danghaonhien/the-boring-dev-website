import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ScrollReveal } from './EnhancedInteractiveElements';

// Assuming Category and Project interfaces are defined elsewhere or passed in
// If not, they should be defined here or imported.
interface Project {
  id: string;
  // Add other necessary project properties if needed for calculation
}

interface Category {
  id: string;
  title: string;
  projects: Project[];
}

interface BoringDesignsHeaderProps {
  categories: Category[];
  title: string;
}

const BoringDesignsHeader: React.FC<BoringDesignsHeaderProps> = ({ categories, title }) => {
  const totalProjects = useMemo(() => {
    return categories.reduce((count, category) => count + category.projects.length, 0);
  }, [categories]);

  const count = useMotionValue(0);
  // Transform the motion value to a rounded integer for display
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    // Animate the count motion value from 0 to the actual totalProjects
    const controls = animate(count, totalProjects, {
      duration: 1, // Adjust duration as needed (e.g., 1 second)
      ease: "easeOut" // Optional: add easing
    });

    // Return cleanup function to stop animation if component unmounts
    // or totalProjects changes mid-animation
    return controls.stop;
  }, [totalProjects, count]); // Depend on totalProjects and the motion value itself

  return (
    <ScrollReveal>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold text-boring-dark text-center md:text-left mb-4 md:mb-0">
          {title}
        </h2>
        <div className="text-center md:text-right">
          <div className="text-sm text-boring-dark/70 uppercase tracking-wider mb-1">
            Total Projects
          </div>
          {/* Display the animated rounded motion value */}
          <motion.div
            // Remove previous animation props, the value itself is animated now
            className="text-5xl md:text-6xl font-bold text-boring-dark"
          >
            {rounded}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BoringDesignsHeader; 