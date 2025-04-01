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

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsHeroRevealed(true);
          },200);
        },200);
      }
    }, 100);

    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
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

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-boring-offwhite overflow-hidden">
        {/* Initial Loading Screen */}
        <div 
          className={`fixed inset-0 bg-boring-dark z-50 flex items-center justify-center transition-opacity duration-1000 ${
            isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md px-4 relative">
            <h1 className="text-6xl font-bold text-boring-offwhite mb-12 absolute bottom-full left-0">
              the <span className="inline-block bg-white text-transparent bg-clip-text bg-gradient-to-r from-white to-boring-slate px-3 py-3 rounded-md">boring</span> dev
            </h1>
            
            <div className="h-2 w-full bg-boring-slate/30 rounded-full overflow-hidden shadow-lg">
              <div 
                className="h-full bg-boring-main rounded-full transition-all duration-300 ease-out shadow-inner shadow-boring-main/50"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <p className="mt-2 text-boring-offwhite/80 text-right font-mono">
              {loadingProgress}%
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-between">
          <AnimatedGradientBlob className="absolute top-1/2 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <AnimatedGradientBlob 
            color1="from-boring-slate/20" 
            color2="to-boring-main/10" 
            className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 opacity-50" 
          />
          
          {/* Header */}
          <header 
            className={`w-full pt-8 pb-4 transition-all duration-1000 transform ${
              isHeroRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={getParallaxStyle(0.1)}
          >
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-boring-dark">
                  the <AnimatedGradientText>boring</AnimatedGradientText> dev
                </h1>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <Link to="/about" className="text-boring-dark hover:text-boring-main transition-colors">
                  About
                </Link>
                <Link to="/projects" className="text-boring-dark hover:text-boring-main transition-colors">
                  Projects
                </Link>
                <Link to="/contact" className="text-boring-dark hover:text-boring-main transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          
          {/* Hero Content */}
          <div 
            className={`container mx-auto px-4 flex-1 flex items-center transition-all duration-1000 transform ${
              isHeroRevealed ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollReveal>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 text-boring-dark leading-tight">
                 from Boredom springs Greatness
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className="mb-8">
                    <WaveText 
                      text="Boring tools, thoughtful design." 
                      className="text-xl text-boring-dark opacity-90"
                      waveSpeed={4}
                    />
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={400}>
                  <MagneticButton
                    className="px-6 py-3 bg-boring-main text-boring-offwhite rounded-md font-medium hover:bg-boring-main/90 transition-colors"
                    onClick={() => scrollToSection(productRef.current)}
                  >
                    Explore Products
                  </MagneticButton>
                </ScrollReveal>
              </div>
              
              <div className="hidden md:block">
                <ScrollReveal>
                  <div className="relative">
                    <div className="absolute inset-0 bg-boring-slate/5 rounded-md -rotate-6 transform-gpu"></div>
                    <div className="absolute inset-0 bg-boring-main/5 rounded-md rotate-3 transform-gpu"></div>
                    <div className="relative bg-boring-dark/5 p-8 rounded-md border border-boring-slate/10">
                      <ShimmerText
                        text="IN BUSINESS SINCE"
                        className="text-sm font-medium text-boring-dark/70 mb-1"
                        shimmerColor="rgba(100, 100, 100, 0.2)"
                        duration={3}
                      />
                      <p className="text-4xl font-serif font-bold text-boring-dark">©2016</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div 
            ref={scrollRef}
            className={`flex justify-center pb-8 transition-all duration-1000 ${
              isHeroRevealed ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              opacity: Math.max(0, 1 - scrollPosition / 500)
            }}
          >
            <div className="animate-bounce bg-boring-main/20 p-2 w-10 h-10 ring-1 ring-boring-slate/20 shadow-lg rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-boring-slate" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Large Text Section with Scroll Animation - Replacing the old parallax section */}
        <section className="max-h-[100vh] flex items-center justify-center py-24 relative overflow-hidden">
          {/* Text container with scroll-based opacity */}
          <div 
            className="container mx-auto px-4 text-center transition-opacity duration-1000"
            style={{
              opacity: Math.max(0, 1 - (scrollPosition / (window.innerHeight * 1.2))),
              transform: `translateY(${Math.min(0, -(scrollPosition * 0.08))}px)`
            }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-boring-dark leading-tight mb-6">
              Boring, <span className="text-boring-main">yet</span>
              <br />
              <span className="ml-4 md:ml-8">Powerful.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-boring-dark/70 max-w-3xl mx-auto">
              Building digital experiences that last
            </p>
          </div>
          
          {/* Indicator to scroll showing only when text is visible */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-700"
            style={{
              opacity: Math.max(0, 0.8 - (scrollPosition / (window.innerHeight * 0.8)))
            }}
          >
            <p className="text-boring-dark/50 mb-2 text-sm font-medium">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-boring-dark/30 rounded-full flex justify-center p-1">
              <div 
                className="w-1 h-1 bg-boring-main rounded-full animate-scroll-pulse" 
                style={{
                  animationDuration: '1.5s',
                  animationIterationCount: 'infinite'
                }}
              ></div>
            </div>
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
            
            {/* <div className="text-center mt-12">
              <ScrollReveal delay={600}>
                <a 
                  href="/case-studies" 
                  className="group px-6 py-3 bg-boring-offwhite text-boring-dark rounded-md font-medium relative overflow-hidden inline-flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-boring-offwhite/20"
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    View Case Studies
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-boring-main/70 transition-all duration-300 group-hover:h-full"></span>
                </a>
              </ScrollReveal>
            </div> */}
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
    </PageTransition>
  );
};

export default LandingPage; 