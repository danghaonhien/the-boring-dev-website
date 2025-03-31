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
import DesignSystem from '../components/DesignSystem';
import rewordThisHero from '../assets/images/reword-this/reword-this-hero.png';
import rewordThisVideo from '../assets/videos/reword-this/reword-this-demo.mp4';

const HomePage = () => {
  const projects = [
    {
      id: 1,
      name: 'BuildBuddy',
      description: 'BuildBuddy is a construction project management app that helps teams track progress, manage resources, and communicate effectively.',
      imageUrl: '/projects/BuildBuddy.webp',
      projectUrl: '#',
    },
    {
      id: 2,
      name: 'TastyTable',
      description: 'TastyTable is a recipe sharing platform that allows users to discover, save, and share their favorite recipes with friends and family.',
      imageUrl: '/projects/TastyTable.webp',
      projectUrl: '#',
    },
    {
      id: 3,
      name: 'StormTracker',
      description: 'StormTracker is a weather monitoring app that provides real-time updates and alerts for severe weather conditions in your area.',
      imageUrl: '/projects/StormTracker.webp',
      projectUrl: '#',
    },
  ];

  const [videoSources] = useState({
    rewordThis: rewordThisVideo,
    blogApp: null, // No video available yet
    ecommerceDashboard: null, // No video available yet
  });

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
          
          <div className="container mx-auto text-center relative z-10">
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
        <section className="py-16 bg-boring-offwhite">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ShimmerText 
                text="Projects" 
                className="text-4xl font-bold mb-4 text-boring-dark" 
                as="h2"
              />
              <p className="text-boring-gray max-w-2xl mx-auto">
                Check out some of my recent work. I'm passionate about creating clean, 
                efficient solutions to challenging problems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {/* Reword This Project */}
              <ParallaxCard className="h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="h-60 relative overflow-hidden group">
                    <VideoTooltip
                      videoSrc={videoSources.rewordThis}
                      position="center"
                      width="380px"
                      arrowSize={10}
                    >
                      <img 
                        src={rewordThisHero} 
                        alt="Reword This" 
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
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-boring-dark mb-3">Reword This</h3>
                    <p className="text-boring-gray mb-6 line-clamp-3">
                      An AI-powered text paraphrasing application that helps users rewrite content for improved clarity, 
                      tone, and engagement. Built with React, Node.js, and OpenAI.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">React</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Node.js</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">OpenAI</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">TailwindCSS</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <AnimatedLink 
                        href="/reword-this" 
                        className="text-boring-main font-medium"
                      >
                        View Project →
                      </AnimatedLink>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                        </svg>
                        Add to Chrome
                      </a>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
              
              {/* Blog App Project */}
              <ParallaxCard className="h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="h-60 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center group relative">
                    {videoSources.blogApp ? (
                      <VideoTooltip
                        videoSrc={videoSources.blogApp}
                        position="center"
                        width="380px"
                        arrowSize={10}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white cursor-pointer group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
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
                      </VideoTooltip>
                    ) : (
                      <div className="relative group-hover:scale-110 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">Demo coming soon</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-boring-dark mb-3">Modern Blog Platform</h3>
                    <p className="text-boring-gray mb-6 line-clamp-3">
                      A full-featured blogging platform with rich text editing, user authentication, 
                      and comment functionality. Responsive design for all devices.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Typescript</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Next.js</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">MongoDB</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">AWS</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <AnimatedLink 
                        href="#" 
                        className="text-boring-main font-medium"
                      >
                        View Project →
                      </AnimatedLink>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                        </svg>
                        Add to Chrome
                      </a>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
              
              {/* E-commerce Dashboard Project */}
              <ParallaxCard className="h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="h-60 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center group relative">
                    {videoSources.ecommerceDashboard ? (
                      <VideoTooltip
                        videoSrc={videoSources.ecommerceDashboard}
                        position="center"
                        width="380px"
                        arrowSize={10}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white cursor-pointer group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
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
                      </VideoTooltip>
                    ) : (
                      <div className="relative group-hover:scale-110 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">Demo coming soon</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-boring-dark mb-3">E-commerce Dashboard</h3>
                    <p className="text-boring-gray mb-6 line-clamp-3">
                      An analytics dashboard for e-commerce businesses with real-time sales tracking,
                      inventory management, and customer insights. Customizable reports and visualizations.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">React</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">Redux</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Node.js</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">MySQL</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <AnimatedLink 
                        href="#" 
                        className="text-boring-main font-medium"
                      >
                        View Project →
                      </AnimatedLink>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                        </svg>
                        Add to Chrome
                      </a>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-boring-dark relative overflow-hidden">
          <AnimatedGradientBlob 
            color1="from-boring-slate/10" 
            color2="to-boring-main/5" 
            className="top-0 right-0 w-96 h-96" 
          />
          
          <div className="container mx-auto text-center max-w-2xl relative z-10">
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
              <div className="flex justify-center space-x-6">
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
            
            <ScrollReveal delay={300}>
              <div className="mt-8">
                <PulseGrowButton 
                  className="bg-boring-main/30 text-boring-offwhite px-6 py-3 rounded-lg mt-4 backdrop-blur-sm"
                  pulseColor="rgba(255, 255, 255, 0.3)"
                  growScale={1.03}
                  pulseSize={100}
                >
                  Contact Me
                </PulseGrowButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-boring-slate/5">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <ShimmerText
                text="Get in touch"
                as="h2"
                className="text-3xl font-bold mb-2 text-center"
                shimmerColor="rgba(0, 1, 13, 0.15)"
                duration={2.5}
              />
              <p className="text-boring-gray text-center mb-12">Feel free to reach out for collaborations or just a friendly hello</p>
            </ScrollReveal>
            
            <div className="max-w-lg mx-auto">
              <ScrollReveal delay={100}>
                <ContactForm />
              </ScrollReveal>
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