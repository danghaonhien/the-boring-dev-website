import React from 'react';
import { Link } from 'react-router-dom';
import { VideoTooltip, AnimatedLink, ParallaxCard } from './EnhancedInteractiveElements';

interface TechnologyTag {
  name: string;
  color: string;
  textColor: string;
}

interface ProjectCardProps {
  name: string;
  description: string;
  imageUrl?: string;
  imageBgColor?: string;
  icon?: React.ReactNode;
  projectUrl: string;
  videoSrc?: string | null;
  tags?: TechnologyTag[];
  chromeExtension?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  name, 
  description, 
  imageUrl, 
  imageBgColor,
  icon,
  projectUrl, 
  videoSrc,
  tags = [],
  chromeExtension = false
}) => {
  return (
    <ParallaxCard className="h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <div 
          className={`h-60 relative overflow-hidden group ${imageBgColor || ''}`}
          style={{ 
            background: !imageUrl && !imageBgColor ? 'linear-gradient(to bottom right, #3B82F6, #2563EB)' : '' 
          }}
        >
          {imageUrl ? (
            <VideoTooltip
              videoSrc={videoSrc || ''}
              position="center"
              width="380px"
              arrowSize={10}
            >
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 transition-transform bg-boring-main/40 p-3 rounded-full backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-boring-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Hover for demo
                </div>
              </div>
            </VideoTooltip>
          ) : videoSrc ? (
            <VideoTooltip
              videoSrc={videoSrc}
              position="center"
              width="380px"
              arrowSize={10}
            >
              <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                {icon || (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-boring-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Hover for demo
                  </div>
                </div>
              </div>
            </VideoTooltip>
          ) : (
            <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              {icon || (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              )}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">Demo coming soon</span>
            </div>
          )}
        </div>

        <div className="p-8 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-boring-dark mb-3">{name}</h3>
          <p className="text-boring-gray mb-6 line-clamp-3">{description}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={`px-3 py-1 ${tag.color} ${tag.textColor} rounded-full text-xs font-medium`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto">
            <AnimatedLink 
              href={projectUrl} 
              className="text-boring-main font-medium"
            >
              View Project →
            </AnimatedLink>
            
            {chromeExtension && (
              <a 
                href="#" 
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                </svg>
                Add to Chrome
              </a>
            )}
          </div>
        </div>
      </div>
    </ParallaxCard>
  );
};

export default ProjectCard; 