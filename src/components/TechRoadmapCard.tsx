import React from 'react';

interface TechRoadmapCardProps {
  id: string;
  title: string;
  content: string;
  bgColor?: string;
  textColor?: string;
  widthClass?: string; // Optional width override
  isSelected?: boolean; // Add isSelected prop
  onClick?: () => void; // Add onClick prop
}

/**
 * TechRoadmapCard Component
 * Displays a single box (node) in the roadmap diagram.
 */
const TechRoadmapCard: React.FC<TechRoadmapCardProps> = ({ 
  id, 
  title, 
  content, 
  bgColor = 'bg-gray-800/70 backdrop-blur-sm', // Slightly less opaque default
  textColor = 'text-boring-offwhite', // Adjusted default text color
  widthClass = 'w-full md:w-64', // Default width, responsive
  isSelected = false, // Default isSelected to false
  onClick,
}) => {
  const isSelectable = !!onClick; 

  const baseClasses = `p-3 rounded-lg shadow-md border flex flex-col justify-center transition-all duration-200 ${widthClass} ${bgColor} ${textColor}`;

  // Conditional classes - Lower opacity for inactive selectable
  const conditionalClasses = isSelectable
    ? isSelected
      ? 'border-boring-main/80 scale-105 cursor-pointer' 
      : 'border-boring-slate/20 opacity-40 cursor-pointer hover:opacity-60 hover:border-boring-slate/40' // Lowered opacity to 40, hover to 60
    : 'border-boring-slate/20 cursor-default'; 

  return (
    <div
      id={id} // Crucial: This ID is used by Xarrow to target the element
      onClick={onClick} // Apply onClick handler
      className={`${baseClasses} ${conditionalClasses}`} // Apply conditional styling and cursor
    >
      {/* Card Title - More prominent */}
      <h3 className="text-xl font-semibold mb-2 text-left">{title}</h3>
      {/* Card Content - Less prominent */}
      <div
        className="text-xs text-left text-boring-offwhite/70"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default TechRoadmapCard; 