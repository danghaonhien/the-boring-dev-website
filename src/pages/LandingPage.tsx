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
import rewordThisHero from '../assets/images/reword-this/reword-this-hero.png';
import rewordThisSlide2 from '../assets/images/reword-this/reword-this-slide-2.png';
import rewordThisSlide3 from '../assets/images/reword-this/reword-this-slide-3.png';
import rewordThisSlide4 from '../assets/images/reword-this/reword-this-slide-4.png';


// Product images for the slider
const productImages = [
  rewordThisHero,
  rewordThisSlide2,
  rewordThisSlide3,
  rewordThisSlide4,

];

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [productAnimationTriggered, setProductAnimationTriggered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          }, 500);
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate product images
  useEffect(() => {
    if (productAnimationTriggered && productImages.length > 1) {
      const sliderInterval = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(sliderInterval);
    }
  }, [productAnimationTriggered]);

  // Handle scroll events for product animation and scroll direction
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
      
      // Trigger product animation when scrolled to product section
      if (productRef.current) {
        const productPosition = productRef.current.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;
        
        if (productPosition < triggerPoint && !productAnimationTriggered) {
          setProductAnimationTriggered(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productAnimationTriggered, lastScrollY]);

  // Calculate parallax factor for smooth scrolling
  const getParallaxStyle = (speed: number = 0.2) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
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
              the <span className="bg-white text-boring-main px-3 py-1 rounded-md shadow-lg">boring</span> dev
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
                    Distinctive website solutions for leading and rising companies
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className="mb-8">
                    <WaveText 
                      text="Simple tools, thoughtful design." 
                      className="text-xl text-boring-dark opacity-90"
                      waveSpeed={4}
                    />
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={400}>
                  <MagneticButton
                    className="px-6 py-3 bg-boring-main text-boring-offwhite rounded-md font-medium hover:bg-boring-main/90 transition-colors"
                  >
                    Explore Projects
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

        {/* Product Section */}
        <section 
          ref={productRef} 
          className="min-h-screen relative flex flex-col items-center justify-center py-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              {/* Product Image with enhanced animations and carousel */}
              <div 
                className="w-full md:w-3/5 mb-12 md:mb-0 transition-all duration-1200 ease-out transform-gpu relative"
                style={{
                  transform: productAnimationTriggered 
                    ? `translateX(-20%) ${scrollDirection === 'down' ? 'scale(0.98)' : 'scale(1.02)'}`
                    : 'translateX(0) scale(1)',
                  opacity: productAnimationTriggered ? 0.95 : 1,
                  transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                {/* Featured Product tag - positioned at top of the parent container */}
                <div 
                  className="absolute -top-6 right-8 bg-white px-4 py-2 rounded-full text-sm font-bold text-boring-main shadow-lg border-2 border-boring-main/20 backdrop-blur-sm z-30"
                  style={{
                    opacity: productAnimationTriggered ? 1 : 0,
                    transition: 'all 0.6s ease 0.8s'
                  }}
                >
                  <span className="flex items-center whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    Featured Product
                  </span>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-boring-main/10 rounded-full blur-lg animate-pulse-slow"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-boring-slate/10 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                
                <div className="relative bg-gradient-to-br from-boring-dark/5 to-boring-slate/10 p-4 md:p-8 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Product image slider */}
                  <div className="relative">
                    {productImages.map((img, index) => (
                      <div 
                        key={index}
                        className="transition-all duration-1000 ease-in-out absolute inset-0"
                        style={{
                          opacity: currentImageIndex === index ? 1 : 0,
                          transform: `translateX(${(index - currentImageIndex) * 10}%) scale(${currentImageIndex === index ? 1 : 0.9})`,
                          zIndex: currentImageIndex === index ? 10 : 0,
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`Product ${index + 1}`} 
                          className="w-full max-w-xl mx-auto drop-shadow-2xl transition-all duration-700 hover:drop-shadow-3xl rounded-lg"
                          style={{
                            transform: `${productAnimationTriggered ? 'scale(1.05)' : 'scale(1)'}`,
                            transition: 'transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        />
                      </div>
                    ))}
                    
                    {/* Current image for initial load and fallback */}
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt="Reword This" 
                      className={`w-full max-w-xl mx-auto drop-shadow-2xl transition-all duration-700 hover:drop-shadow-3xl rounded-lg ${productImages.length > 1 ? 'invisible' : 'visible'}`}
                      style={{
                        transform: `${productAnimationTriggered ? 'scale(1.05)' : 'scale(1)'}`,
                        transition: 'transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    />
                  </div>
                  
                  {/* Slider indicators - visible if there are multiple images */}
                  {productImages.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-4 z-20">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'bg-boring-main w-6' 
                              : 'bg-boring-slate/40 hover:bg-boring-slate/60'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View product image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
              </div>
              
              {/* Product Info with refined staggered animation */}
              <div 
                className="w-full md:w-2/5 transition-all duration-1000 ease-out transform-gpu"
                style={{
                  transform: productAnimationTriggered ? 'translateX(0)' : 'translateX(100%)',
                  opacity: productAnimationTriggered ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <div style={{ 
                  transitionDelay: '0.1s',
                  opacity: productAnimationTriggered ? 1 : 0,
                  transform: productAnimationTriggered ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s ease 0.1s'
                }}>
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 text-boring-dark">
                    <span className="inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-boring-main/30 after:bottom-1 after:left-0 after:rounded-full">
                      Reword This
                    </span>
                  </h3>
                </div>
                
                <div style={{ 
                  transitionDelay: '0.3s', 
                  opacity: productAnimationTriggered ? 1 : 0, 
                  transform: productAnimationTriggered ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s ease 0.3s' 
                }}>
                  <p className="text-lg text-boring-dark/80 mb-6 leading-relaxed">
                    An AI-powered text paraphrasing application that helps users rewrite content for improved clarity, tone, and engagement. Built with React, Node.js, and OpenAI.
                  </p>
                </div>
                
                <div 
                  className="flex flex-wrap gap-4"
                  style={{ 
                    opacity: productAnimationTriggered ? 1 : 0, 
                    transform: productAnimationTriggered ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s ease 0.5s'
                  }}
                >
                  <a 
                    href="/reword-this" 
                    className="group px-6 py-3 bg-boring-main text-boring-offwhite rounded-md font-medium relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-boring-main/30"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      Visit Site 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-boring-dark/20 transition-all duration-300 group-hover:h-full"></span>
                  </a>
                  
                  <a 
                    href="#" 
                    className="group px-6 py-3 bg-boring-dark text-boring-offwhite rounded-md font-medium relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-boring-dark/30"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Add to Chrome</span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-boring-main/30 transition-all duration-300 group-hover:h-full"></span>
                  </a>
                </div>
                
                {/* Add tags with staggered animation */}
                <div 
                  className="mt-6 flex flex-wrap gap-2"
                  style={{ 
                    opacity: productAnimationTriggered ? 1 : 0, 
                    transform: productAnimationTriggered ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s ease 0.7s'
                  }}
                >
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">React</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Node.js</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">OpenAI</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">TailwindCSS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Section with parallax effect */}
        <section className="py-20 bg-boring-dark relative overflow-hidden">
          <AnimatedGradientBlob 
            color1="from-boring-slate/10" 
            color2="to-boring-main/5" 
            className="absolute top-0 right-0 w-96 h-96" 
          />
          
          <div 
            className="container mx-auto px-4 relative z-10"
            style={getParallaxStyle(-0.1)}
          >
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-6 text-boring-offwhite">
                For 10 years, we've been delivering powerful,
                <br />
                tailor-made websites
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="text-xl text-boring-offwhite/80 max-w-3xl">
                that have helped brands anchor their authority. Now, we're harnessing
                this cargo of expertise to propel your projects toward new and exciting horizons.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LandingPage; 