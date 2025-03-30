import React from 'react';
import { Link } from 'react-router-dom';
import { GlowingCard } from './EnhancedInteractiveElements';

interface ProjectCardProps {
  name: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, imageUrl, projectUrl }) => {
  return (
    <GlowingCard 
      className="h-full"
      gradientColors="from-boring-main/60 to-boring-slate/60"
      hoverScale={1.03}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-boring-dark">{name}</h3>
        <p className="text-boring-gray mb-6 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <Link
            to={projectUrl}
            className="inline-block bg-boring-main text-boring-offwhite px-4 py-2 rounded-md hover:bg-opacity-90 transition-all transform hover:translate-y-[-2px]"
          >
            View Project
          </Link>
        </div>
      </div>
    </GlowingCard>
  );
};

export default ProjectCard; 