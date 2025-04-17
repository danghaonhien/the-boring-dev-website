import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal, AnimatedGradientBlob } from './EnhancedInteractiveElements';
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

// Define product types
interface Product {
  id: number;
  name: string;
  description: string;
  images?: string[];
  tagPosition?: 'left' | 'right';
  tagText?: string;
  layout?: 'default' | 'reverse';
  bgColor?: string;
  tags: Array<{
    name: string;
    color: string;
    textColor: string;
  }>;
  links: Array<{
    text: string;
    url: string;
    primary?: boolean;
  }>;
}

interface ProductsSectionProps {
  scrollToRef: (elementRef: HTMLElement | null) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ scrollToRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [productAnimationTriggered, setProductAnimationTriggered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Refs for product sections
  const productRef = useRef<HTMLDivElement>(null);
  const secondProductRef = useRef<HTMLDivElement>(null);
  const thirdProductRef = useRef<HTMLDivElement>(null);

  // Products data
  const products: Product[] = [
    {
      id: 1,
      name: "Reword This",
      description: "An AI-powered text paraphrasing application that helps users rewrite content for improved clarity, tone, and engagement. Built with React, Node.js, and OpenAI.",
      images: productImages,
      tagPosition: "right",
      tagText: "Featured Product",
      layout: "default",
      tags: [
        { name: "React", color: "bg-blue-100", textColor: "text-blue-800" },
        { name: "Node.js", color: "bg-green-100", textColor: "text-green-800" },
        { name: "OpenAI", color: "bg-purple-100", textColor: "text-purple-800" },
        { name: "TailwindCSS", color: "bg-yellow-100", textColor: "text-yellow-800" }
      ],
      links: [
        { text: "Visit Site", url: "/reword-this", primary: true },
        { text: "Add to Chrome", url: "#", primary: false }
      ]
    },
    {
      id: 2,
      name: "Code Helper",
      description: "An intelligent coding assistant that helps developers write cleaner, more efficient code through AI-powered suggestions, bug detection, and performance optimizations.",
      layout: "reverse",
      tagPosition: "left",
      tagText: "New Release",
      tags: [
        { name: "TypeScript", color: "bg-indigo-100", textColor: "text-indigo-800" },
        { name: "JavaScript", color: "bg-yellow-100", textColor: "text-yellow-800" },
        { name: "VS Code", color: "bg-green-100", textColor: "text-green-800" },
        { name: "Google Cloud", color: "bg-red-100", textColor: "text-red-800" }
      ],
      links: [
        { text: "Learn More", url: "/code-helper", primary: true },
        { text: "Try Beta", url: "#", primary: false }
      ]
    },
    {
      id: 3,
      name: "DataSync Pro",
      description: "Enterprise-grade database synchronization tool that ensures real-time data consistency across multiple platforms, with built-in conflict resolution and automated backups.",
      bgColor: "bg-boring-offwhite/50",
      tagPosition: "right",
      tagText: "Coming Soon",
      tags: [
        { name: "PostgreSQL", color: "bg-blue-100", textColor: "text-blue-800" },
        { name: "Redis", color: "bg-orange-100", textColor: "text-orange-800" },
        { name: "MongoDB", color: "bg-purple-100", textColor: "text-purple-800" },
        { name: "AWS", color: "bg-teal-100", textColor: "text-teal-800" }
      ],
      links: [
        { text: "Join Waitlist", url: "/datasync-pro", primary: true },
        { text: "Documentation", url: "#", primary: false }
      ]
    }
  ];

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

  // Calculate opacity based on scroll position
  const calculateSectionOpacity = (section: HTMLElement | null, offset = 300, speed = 1) => {
    if (!section) return 1;
    
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    // When section is coming into view from bottom
    if (sectionTop > window.innerHeight - offset) {
      return 0;
    }
    
    // When section is in view
    if (sectionTop > 0) {
      return Math.min(1, (window.innerHeight - sectionTop) / (window.innerHeight * 0.5 * speed));
    }
    
    // When section is scrolling out of view
    if (sectionTop > -sectionHeight) {
      return Math.max(0, 1 - (Math.abs(sectionTop) / (sectionHeight * 0.5 * speed)));
    }
    
    return 0;
  };

  // Function to render a product section
  const renderProductSection = (product: Product, index: number) => {
    const isFirst = index === 0;
    const sectionRef = isFirst ? productRef : index === 1 ? secondProductRef : thirdProductRef;
    const isReverse = product.layout === "reverse";
    
    return (
      <section 
        key={product.id}
        ref={sectionRef}
        className={`max-h-[100vh] relative flex flex-col items-center justify-center py-24 ${product.bgColor || ""}`}
        style={{
          opacity: calculateSectionOpacity(sectionRef.current, 200, 0.7),
          transition: 'opacity 0.8s ease-out'
        }}
      >
        <div>
          <div className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-8 lg:gap-16 relative`}>
            {/* Product Image */}
            <div 
              className="w-full md:w-1/2 lg:w-3/5 mb-12 md:mb-0 transition-all duration-1200 ease-out transform-gpu relative"
              style={{
                transform: productAnimationTriggered 
                  ? `translateX(${window.innerWidth < 768 ? '0' : window.innerWidth < 1024 
                    ? (isReverse ? '10%' : '-10%') 
                    : (isReverse ? '20%' : '-20%')}) ${scrollDirection === 'down' ? 'scale(0.98)' : 'scale(1.02)'}`
                  : 'translateX(0) scale(1)',
                opacity: productAnimationTriggered ? 0.95 : 1,
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {/* Product tag */}
              <div 
                className={`absolute -top-6 ${product.tagPosition === "left" ? "left-8" : "right-8"} bg-white px-4 py-2 rounded-full text-sm font-bold text-boring-main shadow-lg border-2 border-boring-main/20 backdrop-blur-sm z-30`}
                style={{
                  opacity: productAnimationTriggered ? 1 : 0,
                  transition: 'all 0.6s ease 0.8s'
                }}
              >
                <span className="flex items-center whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  {product.tagText || "Featured"}
                </span>
              </div>

              {/* Decorative elements */}
              <div className={`absolute -top-8 ${isReverse ? "-right-8" : "-left-8"} w-16 h-16 bg-boring-main/10 rounded-full blur-lg animate-pulse-slow`}></div>
              <div className={`absolute -bottom-12 ${isReverse ? "-left-12" : "-right-12"} w-32 h-32 bg-boring-slate/10 rounded-full blur-xl animate-pulse-slow`} style={{animationDelay: '1s'}}></div>
              
              <div className="relative bg-gradient-to-br from-boring-dark/5 to-boring-slate/10 p-4 md:p-8 rounded-2xl shadow-2xl overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  /* Product image slider */
                  <div className="relative">
                    {product.images.map((img, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className="transition-all duration-1000 ease-in-out absolute inset-0"
                        style={{
                          opacity: isFirst && currentImageIndex === imgIndex ? 1 : 0,
                          transform: `translateX(${isFirst ? (imgIndex - currentImageIndex) * 10 : 0}%) scale(${isFirst && currentImageIndex === imgIndex ? 1 : 0.9})`,
                          zIndex: isFirst && currentImageIndex === imgIndex ? 10 : 0,
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} ${imgIndex + 1}`} 
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
                      src={isFirst ? product.images[currentImageIndex] : product.images[0]} 
                      alt={product.name} 
                      className={`w-full max-w-xl mx-auto drop-shadow-2xl transition-all duration-700 hover:drop-shadow-3xl rounded-lg ${isFirst && product.images.length > 1 ? 'invisible' : 'visible'}`}
                      style={{
                        transform: `${productAnimationTriggered ? 'scale(1.05)' : 'scale(1)'}`,
                        transition: 'transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    />
                  </div>
                ) : (
                  /* Placeholder image for products without images */
                  <div className="w-full h-64 md:h-80 bg-gradient-to-r from-boring-slate/20 to-boring-main/20 rounded-lg flex items-center justify-center">
                    <div className="p-8 bg-white/80 rounded-lg shadow-lg backdrop-blur-sm">
                      <h4 className="text-boring-dark text-2xl font-bold">{product.name}</h4>
                      <p className="text-boring-dark/70">{product.description.split('.')[0]}</p>
                    </div>
                  </div>
                )}
                
                {/* Slider indicators - visible if there are multiple images */}
                {isFirst && product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-4 z-20">
                    {product.images.map((_, imgIndex) => (
                      <button
                        key={imgIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentImageIndex === imgIndex 
                            ? 'bg-boring-main w-6' 
                            : 'bg-boring-slate/40 hover:bg-boring-slate/60'
                        }`}
                        onClick={() => setCurrentImageIndex(imgIndex)}
                        aria-label={`View product image ${imgIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div 
              className="w-full md:w-1/2 lg:w-2/5 transition-all duration-1000 ease-out transform-gpu"
              style={{
                transform: productAnimationTriggered ? 'translateX(0)' : `translateX(${window.innerWidth < 768 
                  ? (isReverse ? '-100px' : '100px') 
                  : window.innerWidth < 1024 
                    ? (isReverse ? '-50%' : '50%') 
                    : (isReverse ? '-100%' : '100%')})`,
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
                    {product.name}
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
                  {product.description}
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
                {product.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.url} 
                    className={`group px-6 py-3 ${link.primary 
                      ? 'bg-boring-main text-boring-offwhite' 
                      : 'bg-boring-dark text-boring-offwhite'} rounded-md font-medium relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-${link.primary ? 'boring-main' : 'boring-dark'}/30`}
                  >
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      {link.text}
                      {link.primary && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </span>
                    <span className={`absolute bottom-0 left-0 w-full h-0 ${link.primary 
                      ? 'bg-boring-dark/20'
                      : 'bg-boring-main/30'} transition-all duration-300 group-hover:h-full`}></span>
                  </a>
                ))}
              </div>
              
              {/* Product tags */}
              <div 
                className="mt-6 flex flex-wrap gap-2"
                style={{ 
                  opacity: productAnimationTriggered ? 1 : 0, 
                  transform: productAnimationTriggered ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s ease 0.7s'
                }}
              >
                {product.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`${tag.color} ${tag.textColor} text-xs px-2 py-1 rounded-full`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {products.map((product, index) => renderProductSection(product, index))}
    </>
  );
};

export default ProductsSection; 