import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ScrollReveal, 
  AnimatedGradientBlob, 
  MagneticButton,
  ShimmerText,
  WaveText
} from '../components/EnhancedInteractiveElements';
import { AnimatedGradientText } from '../components/InteractiveElements';
import PageTransition from '../components/PageTransition';
import ProductsSection from '../components/ProductsSection';

// Define the total number of products (based on ProductsSection.tsx)
const productCount = 3; 

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [startCurtainAnimation, setStartCurtainAnimation] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + 5, 100);
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Keep 100% visible, start curtain, then set isLoading to false AFTER curtain finishes
        const curtainStartTime = 150; // Delay before curtain starts moving
        const curtainDuration = 700; // Duration of the curtain animation
        
        setTimeout(() => setStartCurtainAnimation(true), curtainStartTime); 

        // Set isLoading to false only after curtain animation completes
        setTimeout(() => {
          setIsLoading(false); // Now safe to hide loading state
          // Reveal hero section slightly after isLoading is false
          setTimeout(() => setIsHeroRevealed(true), 50); 
        }, curtainStartTime + curtainDuration); 

      }
    }, 100);

    // Prevent scrolling during loading and curtain animation
    if (isLoading) { // Only need isLoading check now
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      clearInterval(interval);
      document.body.style.overflow = ''; // Ensure overflow is reset on unmount
    };
  }, [isLoading]);

  // Handle scroll events for scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Determine scroll direction
      if (scrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(scrollY);
      
      // Update general scroll position
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Counter animation effect
  useEffect(() => {
    if (isHeroRevealed) {
      let start = 0;
      const end = productCount;
      if (start === end) return;

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
  }, [isHeroRevealed]);

  // Calculate parallax factor for smooth scrolling
  const getParallaxStyle = (speed: number = 0.2) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  // Scroll to section handler
  const scrollToSection = (elementRef: HTMLElement | null) => {
    if (elementRef) {
      elementRef.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* Initial Loading Screen Container */}
        <div 
          className={`fixed inset-0 z-50 overflow-hidden ${
            startCurtainAnimation ? 'pointer-events-none' : '' 
          }`}
        >
          {/* Single Vertical Slide-Up Curtain */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-white transition-transform duration-700 ease-in-out ${
              startCurtainAnimation ? '-translate-y-full' : 'translate-y-0'
            }`}
          ></div>

          {/* Loading Content - Container no longer fades */}
          <div 
            className={`absolute inset-0 p-12 flex flex-col justify-between min-h-screen ${
              !isLoading ? 'invisible' : '' // Hide container when loading is fully done
            }`}
          >
            {/* Header visible during loading (Top) - Fades out when curtain starts */}
            <header className={`w-full transition-opacity duration-500 ease-linear ${startCurtainAnimation ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex justify-between items-center">
                  {/* Site Name */}
                  <div className="text-boring-dark font-bold text-2xl uppercase">
                    THE BORING DEV
                  </div>
                  
                  {/* Spinning Plus Sign/Button - Added inline-block */}
                  {/* <button className={`text-boring-dark text-4xl font-bold origin-center inline-block ${isLoading ? 'animate-spin' : ''}`}>
                    +
                  </button> */}
              </div>
            </header>

            {/* Content Area Mimicking Hero's Bottom Alignment */}
            <div className="flex-grow flex flex-col justify-end">
              {/* Loading Percentage (Bottom Left) */}
              <div className="text-boring-dark font-bold text-[25vw] leading-none select-none text-left">
                {loadingProgress}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Wrapper - Adjusted padding */}
        <div className="p-12  relative z-10">
          {/* Hero Section */}
          <section 
            className={`relative min-h-screen pb-12 flex flex-col justify-between transition-opacity duration-500 ${
              isHeroRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Header with Site Name and Plus - Added pl-12 */}
            <header 
              className={`w-full transition-all duration-1000 transform  ${
                isHeroRevealed ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0' 
              }`}
            >
              <div className="flex justify-between items-center">
                {/* Site Name */}
                <div className="text-boring-dark font-bold text-2xl uppercase">
                  THE BORING DEV
                </div>
                
                {/* Static Plus Sign/Button */}
                <button className="text-boring-dark text-4xl font-bold">
                  +
                </button>
              </div>
            </header>
            
            {/* Content Area: Counter above BORING text - Removed invalid w=full */}
            <div className="flex-grow flex flex-col justify-end  "> 
              {/* Project Counter with Hover Effect - Removed pl-12 */}
              <div className="group flex items-end z-10 relative"> 
                <div className="text-boring-dark font-medium text-9xl tracking-tighter">
                  {String(displayCount).padStart(2, '0')}
                </div>
                <span className="text-boring-dark font-medium text-2xl ml-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  projects
                </span>
              </div>

              {/* Large BORING Text at the bottom - Removed width/margin */}
              <h1 
                className="text-boring-dark font-bold text-[25vw] leading-none select-none text-left"
              >
                BORING
              </h1>
            </div>
          </section>

          {/* Products Section */}
          <div ref={productRef}>
            <ProductsSection scrollToRef={scrollToSection} />
          </div>

          {/* Boring Stories Section */}
          <section className="py-24 bg-boring-dark relative overflow-hidden">
            <AnimatedGradientBlob 
              color1="from-boring-main/10" 
              color2="to-boring-slate/5" 
              className="absolute bottom-0 left-0 w-96 h-96 -translate-x-1/2 translate-y-1/2" 
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <ScrollReveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-boring-offwhite inline-block relative">
                    Boring Stories
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-boring-main/30 rounded-full"></span>
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <p className="text-xl text-boring-offwhite/80 max-w-3xl mx-auto">
                    Real-world impact from our seemingly ordinary solutions
                  </p>
                </ScrollReveal>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Story Card 1 */}
                <ScrollReveal delay={300}>
                  <div className="bg-boring-dark/50 backdrop-blur-sm p-8 rounded-xl border border-boring-slate/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-boring-main/5 hover:border-boring-main/20 hover:-translate-y-1">
                    <div className="mb-6">
                      <span className="text-boring-main text-4xl font-serif">"</span>
                    </div>
                    
                    <p className="text-boring-offwhite/90 mb-6 leading-relaxed">
                      The team at Boring Dev transformed our outdated website into a modern, responsive platform that perfectly captures our brand identity. Their attention to detail is unmatched.
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-boring-main/20 rounded-full flex items-center justify-center text-boring-main font-bold">
                        JD
                      </div>
                      <div className="ml-4">
                        <h4 className="text-boring-offwhite font-medium">Jane Doe</h4>
                        <p className="text-boring-offwhite/60 text-sm">Marketing Director, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                
                {/* Story Card 2 */}
                <ScrollReveal delay={400}>
                  <div className="bg-boring-dark/50 backdrop-blur-sm p-8 rounded-xl border border-boring-slate/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-boring-main/5 hover:border-boring-main/20 hover:-translate-y-1">
                    <div className="mb-6">
                      <span className="text-boring-main text-4xl font-serif">"</span>
                    </div>
                    
                    <p className="text-boring-offwhite/90 mb-6 leading-relaxed">
                      We've seen a 40% increase in user engagement since implementing Boring Dev's custom solution. Their strategic approach to UX design has been a game-changer for our platform.
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-boring-main/20 rounded-full flex items-center justify-center text-boring-main font-bold">
                        MS
                      </div>
                      <div className="ml-4">
                        <h4 className="text-boring-offwhite font-medium">Mark Smith</h4>
                        <p className="text-boring-offwhite/60 text-sm">CEO, NextGen Solutions</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                
                {/* Story Card 3 */}
                <ScrollReveal delay={500}>
                  <div className="bg-boring-dark/50 backdrop-blur-sm p-8 rounded-xl border border-boring-slate/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-boring-main/5 hover:border-boring-main/20 hover:-translate-y-1">
                    <div className="mb-6">
                      <span className="text-boring-main text-4xl font-serif">"</span>
                    </div>
                    
                    <p className="text-boring-offwhite/90 mb-6 leading-relaxed">
                      What impressed me the most was how Boring Dev translated our complex requirements into an intuitive interface. Our users love the simplicity while still having access to powerful features.
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-boring-main/20 rounded-full flex items-center justify-center text-boring-main font-bold">
                        AJ
                      </div>
                      <div className="ml-4">
                        <h4 className="text-boring-offwhite font-medium">Alex Johnson</h4>
                        <p className="text-boring-offwhite/60 text-sm">Product Manager, Innovate Inc.</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-boring-offwhite relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-boring-dark">
                    the <AnimatedGradientText>boring</AnimatedGradientText> dev
                  </h3>
                  <p className="text-boring-dark/70 mt-2">
                    Simple tools, thoughtful design.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-8">
                  <div>
                    <h4 className="text-boring-dark font-medium mb-3">Links</h4>
                    <ul className="space-y-2">
                      <li><a href="/about" className="text-boring-dark/70 hover:text-boring-main transition-colors">About</a></li>
                      <li><a href="/projects" className="text-boring-dark/70 hover:text-boring-main transition-colors">Projects</a></li>
                      <li><a href="/contact" className="text-boring-dark/70 hover:text-boring-main transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-boring-dark font-medium mb-3">Social</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-boring-dark/70 hover:text-boring-main transition-colors">Twitter</a></li>
                      <li><a href="#" className="text-boring-dark/70 hover:text-boring-main transition-colors">GitHub</a></li>
                      <li><a href="#" className="text-boring-dark/70 hover:text-boring-main transition-colors">LinkedIn</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-boring-dark font-medium mb-3">Legal</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-boring-dark/70 hover:text-boring-main transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="text-boring-dark/70 hover:text-boring-main transition-colors">Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-boring-slate/20 text-center text-boring-dark/60 text-sm">
                &copy; {new Date().getFullYear()} The Boring Dev. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default LandingPage; 