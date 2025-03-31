import React from 'react';
import { ScrollReveal, ShimmerText } from './EnhancedInteractiveElements';
import ProjectCard from './ProjectCard';

export interface ProjectType {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  imageBgColor?: string;
  projectUrl: string;
  videoSrc?: string | null;
  tags?: Array<{
    name: string;
    color: string;
    textColor: string;
  }>;
  chromeExtension?: boolean;
}

interface ProjectsSectionProps {
  projects: ProjectType[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section className="py-16 bg-boring-offwhite">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-12">
            <ShimmerText 
              text="Projects" 
              className="text-4xl font-bold mb-4 text-boring-dark" 
              as="h2"
            />
            <p className="text-boring-gray">
              Check out some of my recent work. I'm passionate about creating clean, 
              efficient solutions to challenging problems.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                name={project.name}
                description={project.description}
                imageUrl={project.imageUrl}
                imageBgColor={project.imageBgColor}
                projectUrl={project.projectUrl}
                videoSrc={project.videoSrc}
                tags={project.tags}
                chromeExtension={project.chromeExtension}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection; 