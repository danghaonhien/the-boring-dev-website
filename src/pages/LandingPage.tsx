import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import SloganGenerator from '../components/SloganGenerator';
import WordCycle from '../components/WordCycle';
import CustomCursor from '../components/CustomCursor';
import TechRoadmapDiagram from '../components/TechRoadmapDiagram';
import MemeGenerator from '../components/MemeGenerator';
// import boringSvg from '../assets/images/homepage/BORING.svg'; // Removed SVG import

// Array of slogans
// const slogans = [...];

// Define neon colors outside the component or at the top level if preferred
const neonColors = ['#5A58A6', '#F2B705', '#204C73', '#F2AB9B','#F26D3D', '#D9D9D9']; // Updated colors from image

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [startCurtainAnimation, setStartCurtainAnimation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track mobile state (md breakpoint)
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoverColor, setHoverColor] = useState<string | null>(null); // State for hover color
  // const [currentSlogan, setCurrentSlogan] = useState("..."); // REMOVED slogan state

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

  // Toggle Menu Function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to track screen size for conditional menu behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's default md breakpoint
    };
    window.addEventListener('resize', checkScreenSize);
    // Initial check in case the initial state was wrong (e.g., SSR)
    checkScreenSize(); 
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Effect to prevent body scroll ONLY on mobile when menu is open
  // and handle scrollbar shift
  useEffect(() => {
    // Only apply scroll lock if menu is open AND on mobile
    if (isMenuOpen && isMobile) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Reset styles if menu is closed OR if screen is not mobile
      document.body.style.paddingRight = '';
      // Only reset overflow if not loading (initial load state)
      if (!isLoading) {
        document.body.style.overflow = '';
      }
    }
    
    // Cleanup function ensures reset if component unmounts while menu is open on mobile
    return () => {
      // Check if we NEEDED to clean up (menu was open on mobile when unmounting)
      if (isMobile) { 
        document.body.style.paddingRight = '';
        if (!isLoading) {
          document.body.style.overflow = ''; 
        }
      }
    };
  // Depend on isMenuOpen, isMobile, and isLoading
  }, [isMenuOpen, isMobile, isLoading]);

  // Function to get a random neon color
  const getRandomNeonColor = () => {
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  };

  return (
    <PageTransition>
      <div 
        className="relative min-h-screen bg-boring-hero-bg overflow-hidden"
        style={{ cursor: isMobile ? 'auto' : 'none' }}
      >
        {!isMobile && <CustomCursor />}
        
        <div 
          className="absolute inset-0 h-screen z-0 
                     bg-[url('/src/assets/images/hero-grid-background.svg')]
                     bg-cover bg-center bg-no-repeat"
          aria-hidden="true" // Hide from screen readers
        ></div>

        <div 
          className={`fixed inset-0 z-50 bg-boring-dark transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            startCurtainAnimation ? '-translate-y-full pointer-events-none' : 'translate-y-0'
          }`}
        >
          <div 
            className={`absolute inset-0 p-6 md:p-12 flex flex-col justify-between pb-20 h-screen overflow-y-auto md:min-h-screen md:overflow-y-visible transition-opacity duration-700 ease-linear ${
              !isLoading ? 'opacity-100' : 'opacity-100'
            } ${startCurtainAnimation ? 'opacity-0' : 'opacity-100'}`}
          >
            <header className={`w-full transition-opacity duration-700 ease-linear ${startCurtainAnimation ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex justify-between items-center">
                  <div className="text-boring-offwhite font-bold text-2xl uppercase">
                    THE BORING DEV
                  </div>
              </div>
            </header>

            <div className="flex-grow flex flex-col justify-end">
              <div className="text-boring-offwhite font-bold text-[25vw] leading-none select-none text-left">
                {loadingProgress}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-12 relative z-10 min-h-screen">
          <section 
            className={`relative h-screen overflow-y-auto md:min-h-screen md:overflow-y-visible pb-32 md:pb-12 flex flex-col justify-between transition-opacity duration-500 ${
              isHeroRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <header 
              className={`w-full transition-all duration-1000 transform  ${
                isHeroRevealed ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0' 
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-boring-dark font-bold text-2xl uppercase">
                  THE BORING DEV
                </div>
                
                <button 
                  className="text-boring-dark text-4xl font-bold z-30 relative"
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  disabled={!isHeroRevealed}
                >
                  {isMenuOpen ? '\u00D7' : '+'}
                </button>
              </div>
            </header>
            
            <div className="flex-grow flex flex-col justify-end">
              <SloganGenerator />

              <motion.h1
                className="text-boring-dark font-bold text-[22vw]  md:text-[22vw] lg:text-[24.5vw] fhd:text-[25vw] leading-none select-none text-left overflow-hidden flex"
                initial="rest"
                whileHover="hover"
                animate="rest"
                onHoverStart={() => {
                  setHoverColor(getRandomNeonColor());
                }}
                onHoverEnd={() => {
                  setHoverColor(null); // Reset color on hover end
                }}
              >
                {'BORING'.split('').map((char, index) => {
                  const isRevealedClass = isHeroRevealed ? 'translate-y-0' : 'translate-y-full';
                  const delay = 100 + index * 50;
                  
                  // Define neon colors // MOVED OUTSIDE
                  // const neonColors = ['#39FF14', '#FF073A', '#00FFFF', '#FFD700', '#FF00FF']; 

                  const variants = {
                    rest: { 
                      y: 0, 
                      x: 0, 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0,
                      color: '#1F2937', // Keep initial dark color
                      transition: { 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 15,
                        delay: index * 0.05
                      } 
                    },
                    hover: {
                      y: -15,
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      // Use the state hoverColor, fallback to initial dark if null
                      color: hoverColor || '#1F2937', 
                      transition: { 
                        duration: 0.3,
                        ease: 'easeOut',
                        delay: index * 0.04
                      }
                    }
                  };

                  return (
                    <motion.span
                      key={index}
                      className={`inline-block transition-transform duration-700 ease-out ${isRevealedClass}`}
                      style={{ 
                        transitionDelay: `${delay}ms`, 
                        willChange: 'transform, color',
                        color: '#1F2937' // Explicitly set initial color here
                      }}
                      variants={variants}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </motion.h1>
            </div>
          </section>
   {/* Large Text Section */}
          <section className="py-20 md:py-32">
            
              <div className="text-left text-4xl md:text-5xl lg:text-8xl font-medium text-boring-dark leading-tight">
                <ScrollReveal>
                  <span className="reveal-text-line inline-block pl-42">We're a community of devs,</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={50}>
                  <span className="reveal-text-line inline-block">designers, {' '}</span>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <WordCycle 
                    words={["daydreamers", "rulebreakers", "wanderers"]} 
                    interval={3000}
                    className="inline-block reveal-text-line" 
                  />
                </ScrollReveal>
                {' '}
                <ScrollReveal delay={150}>
                  <span className="reveal-text-line inline-block">who take breaks more</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={200}>
                  <span className="reveal-text-line inline-block">seriously than deadlines.</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={250}>
                  <span className="reveal-text-line inline-block">Come vibe with us.</span>
                </ScrollReveal> 
              </div>
          
          </section>

          {/* Tech Roadmap Section */}
          <section className="py-20 md:py-32">
            <ScrollReveal delay={300}> {/* Added ScrollReveal for smooth appearance */}
              <TechRoadmapDiagram />
            </ScrollReveal>
          </section>

          {/* Meme Generator Section */}
          <section className="py-20 md:py-32">
            <ScrollReveal delay={300}> {/* Added ScrollReveal for smooth appearance */}
              <MemeGenerator />
            </ScrollReveal>
          </section>

    {/* Large Text Section */}

          <section className="py-20 md:py-32">
            
              <div className="text-right text-4xl md:text-5xl lg:text-8xl font-medium text-boring-dark leading-tight">
                <ScrollReveal>
                  <span className="reveal-text-line inline-block pl-42">We're a community of devs,</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={50}>
                  <span className="reveal-text-line inline-block">designers, {' '}</span>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <WordCycle 
                    words={["daydreamers", "rulebreakers", "wanderers"]} 
                    interval={3000}
                    className="inline-block reveal-text-line" 
                  />
                </ScrollReveal>
                {' '}
                <ScrollReveal delay={150}>
                  <span className="reveal-text-line inline-block">who take breaks more</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={200}>
                  <span className="reveal-text-line inline-block">seriously than deadlines.</span>
                </ScrollReveal>{' '}
                <ScrollReveal delay={250}>
                  <span className="reveal-text-line inline-block">Come vibe with us.</span>
                </ScrollReveal> 
              </div>
          
          </section>


          <nav 
            className={`
              fixed inset-0 p-12 bg-white z-40 flex flex-col 
              md:absolute md:top-28 md:right-12 md:inset-auto md:p-0 md:bg-transparent md:z-20 md:block
              transition-all duration-300 ease-in-out
              ${
                isMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-4 pointer-events-none md:translate-y-0'
              }`}
          >
            <header className="w-full md:hidden">
              <div className="flex justify-between items-center">
                <div className="text-boring-dark font-bold text-2xl uppercase">
                  THE BORING DEV
                </div>
                <button 
                  className="text-boring-dark text-4xl font-bold" 
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>
            </header>

            <ul className="space-y-4 text-right mt-20 md:mt-0">
              <li>
                <Link 
                  to="/products" 
                  className="text-boring-dark hover:text-boring-main text-4xl md:text-3xl font-medium uppercase transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-boring-dark hover:text-boring-main text-4xl md:text-3xl font-medium uppercase transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-boring-dark hover:text-boring-main text-4xl md:text-3xl font-medium uppercase transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div ref={productRef}>
            <ProductsSection scrollToRef={scrollToSection} />
          </div>

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