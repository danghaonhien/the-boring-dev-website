import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import LandingColorTheme from '../components/LandingColorTheme';
import InteractiveElements, { AnimatedGradientText, FloatingElement } from '../components/InteractiveElements';
import { 
  AnimatedLink, 
  ScrollReveal, 
  ParallaxCard,
  AnimatedGradientBlob,
  MagneticButton,
  TypewriterText,
  TiltCard,
  ExpandingCircleButton,
  WaveText,
  MagneticSection,
  ShimmerText,
  BorderGradientButton,
  TextSplitter,
  HoverTracker,
  PulseGrowButton,
  VideoTooltip
} from '../components/EnhancedInteractiveElements';
import EnhancedInteractiveElementsShowcase from '../components/EnhancedInteractiveElementsShowcase';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import ProjectsSection, { ProjectType } from '../components/ProjectsSection';
import DesignSystem from '../components/DesignSystem';
import rewordThisHero from '../assets/images/reword-this/reword-this-hero.png';
import rewordThisVideo from '../assets/videos/reword-this/reword-this-demo.mp4';
import BoringStoriesSection from '../components/BoringStoriesSection';

const HomePage = () => {
  const projects: ProjectType[] = [
    {
      id: 1,
      name: 'Reword This',
      description: 'An AI-powered text paraphrasing application that helps users rewrite content for improved clarity, tone, and engagement. Built with React, Node.js, and OpenAI.',
      imageUrl: rewordThisHero,
      projectUrl: '/reword-this',
      videoSrc: rewordThisVideo,
      tags: [
        { name: "React", color: "bg-blue-100", textColor: "text-blue-800" },
        { name: "Node.js", color: "bg-green-100", textColor: "text-green-800" },
        { name: "OpenAI", color: "bg-purple-100", textColor: "text-purple-800" },
        { name: "TailwindCSS", color: "bg-yellow-100", textColor: "text-yellow-800" }
      ],
      chromeExtension: true
    },
    {
      id: 2,
      name: 'Modern Blog Platform',
      description: 'A full-featured blogging platform with rich text editing, user authentication, and comment functionality. Responsive design for all devices.',
      imageBgColor: 'bg-gradient-to-br from-green-500 to-teal-600',
      projectUrl: '#',
      videoSrc: null,
      tags: [
        { name: "Typescript", color: "bg-blue-100", textColor: "text-blue-800" },
        { name: "Next.js", color: "bg-yellow-100", textColor: "text-yellow-800" },
        { name: "MongoDB", color: "bg-green-100", textColor: "text-green-800" },
        { name: "AWS", color: "bg-red-100", textColor: "text-red-800" }
      ],
      chromeExtension: true
    },
    {
      id: 3,
      name: 'E-commerce Dashboard',
      description: 'An analytics dashboard for e-commerce businesses with real-time sales tracking, inventory management, and customer insights. Customizable reports and visualizations.',
      imageBgColor: 'bg-gradient-to-br from-red-500 to-orange-600',
      projectUrl: '#',
      videoSrc: null,
      tags: [
        { name: "React", color: "bg-blue-100", textColor: "text-blue-800" },
        { name: "Redux", color: "bg-indigo-100", textColor: "text-indigo-800" },
        { name: "Node.js", color: "bg-green-100", textColor: "text-green-800" },
        { name: "MySQL", color: "bg-blue-100", textColor: "text-blue-800" }
      ],
      chromeExtension: true
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-boring-offwhite">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-theme-gradient py-20 relative overflow-hidden">
          <AnimatedGradientBlob className="top-1/2 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2" />
          <AnimatedGradientBlob 
            color1="from-boring-slate/20" 
            color2="to-boring-main/10" 
            className="bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3" 
          />
          
          <div className="container mx-auto relative z-10">
            <ScrollReveal>
              <h1 className="text-5xl font-bold mb-4 text-boring-offwhite">
                The <AnimatedGradientText>Boring</AnimatedGradientText> Dev
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="mb-8">
                <WaveText 
                  text="Simple tools, thoughtful design." 
                  className="text-xl text-boring-offwhite opacity-90"
                  waveSpeed={4}
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <MagneticButton
                className="px-6 py-3 bg-boring-main/20 border border-boring-offwhite/30 rounded-md font-medium text-boring-offwhite hover:bg-boring-main/30 transition-colors"
              >
                Explore Projects
              </MagneticButton>
            </ScrollReveal>
            
            <MagneticSection className="mt-12 relative" intensity={30}>
              <div className="animate-float inline-block bg-boring-main/20 p-2 rounded-full" data-magnetic>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boring-offwhite" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </MagneticSection>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection projects={projects} />

        {/* Boring Tech Stories Section */}
        <BoringStoriesSection />

        {/* About Section & Contact Combined */}
        <section className="py-16 bg-boring-dark relative overflow-hidden">
          <AnimatedGradientBlob 
            color1="from-boring-slate/10" 
            color2="to-boring-main/5" 
            className="top-0 right-0 w-96 h-96" 
          />
          
          <div className="container mx-auto relative z-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Column */}
              <div>
                <ScrollReveal>
                  <TextSplitter 
                    text="About the Maker" 
                    className="text-3xl font-bold mb-8 text-boring-offwhite"
                    hoverColor="text-boring-slate" 
                  />
                  <TiltCard className="bg-boring-dark/50 p-6 rounded-lg backdrop-blur-sm mb-8">
                    <p className="text-xl text-boring-offwhite opacity-80">
                      Built by Nhien Dang — a solo dev and designer building smart, boring tools that just work.
                    </p>
                  </TiltCard>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className="flex space-x-6">
                    <HoverTracker 
                      intensity={10}
                      rotation={false}
                      scale={1.1}
                    >
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-boring-offwhite hover:text-opacity-80 transition-transform"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </HoverTracker>
                    
                    <HoverTracker 
                      intensity={10}
                      rotation={false}
                      scale={1.1}
                    >
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-boring-offwhite hover:text-opacity-80 transition-transform"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </HoverTracker>
                    
                    <HoverTracker 
                      intensity={10}
                      rotation={false}
                      scale={1.1}
                    >
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-boring-offwhite hover:text-opacity-80 transition-transform"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </HoverTracker>
                  </div>
                </ScrollReveal>
              </div>
              
              {/* Contact Column */}
              <div>
                <ScrollReveal>
                  <ShimmerText
                    text="Get in touch"
                    as="h2"
                    className="text-3xl font-bold mb-4 text-boring-offwhite"
                    shimmerColor="rgba(255, 255, 255, 0.15)"
                    duration={2.5}
                  />
                  <p className="text-boring-offwhite/80 mb-6">Feel free to reach out for collaborations or just a friendly hello</p>
                </ScrollReveal>
                
                <ScrollReveal delay={100}>
                  <div className="bg-boring-dark/50 p-6 rounded-lg backdrop-blur-sm">
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Elements Showcase */}
        <EnhancedInteractiveElementsShowcase />

        {/* Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
};

export default HomePage; 