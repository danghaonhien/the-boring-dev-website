import React, { useState, useEffect, useRef, ReactNode, CSSProperties, FC, cloneElement, isValidElement, Children, useCallback } from 'react';

// Animated underline link
export const AnimatedLink: React.FC<{ 
  href: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ 
  href, 
  children,
  className = ''
}) => {
  return (
    <a 
      href={href}
      className={`relative inline-block group transition-colors duration-300 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-boring-main group-hover:bg-boring-slate transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></span>
    </a>
  );
};

// Scroll reveal element that animates when in view
export const ScrollReveal: React.FC<{ 
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}> = ({ 
  children, 
  direction = 'up',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8';
      case 'down':
        return '-translate-y-8';
      case 'left':
        return 'translate-x-8';
      case 'right':
        return '-translate-x-8';
      default:
        return 'translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Card with parallax hover effect
export const ParallaxCard: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ 
  children,
  className = ''
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (between -0.5 and 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Set rotation (more subtle)
    setRotation({
      x: -y * 8, // Rotate around X axis (horizontal)
      y: x * 8,  // Rotate around Y axis (vertical)
    });
    
    // Set position for parallax effect
    setPosition({
      x: x * 15,
      y: y * 15,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl transition-all duration-200 ease-out ${className} ${
        isHovering ? 'shadow-lg z-10' : 'shadow-md'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
    >
      <div
        className="relative z-10 h-full"
        style={{
          transform: `translateX(${position.x}px) translateY(${position.y}px)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Magnetic button that follows the cursor
export const MagneticButton: React.FC<{ 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ 
  children,
  onClick,
  className = ''
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to button center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Set position with a dampening factor for subtlety
    setPosition({
      x: x * 0.2,
      y: y * 0.2,
    });
  };

  const resetPosition = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-md font-medium transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetPosition}
      onClick={() => {
        resetPosition();
        onClick?.();
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out',
      }}
    >
      {children}
    </button>
  );
};

// Interactive icon that pulses and rotates
export const InteractiveIcon: React.FC<{ 
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  pulseOnHover?: boolean;
  children?: React.ReactNode;
}> = ({ 
  icon,
  onClick,
  className = '',
  pulseOnHover = true,
  children
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div
      className={`relative transition-all duration-300 cursor-pointer
        ${pulseOnHover && isHovering ? 'animate-pulse-subtle' : ''}
        ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div className={`transition-transform duration-300 ${isHovering ? 'scale-110' : 'scale-100'}`}>
        {icon || children}
      </div>
    </div>
  );
};

// Background gradient blob that moves subtly 
export const AnimatedGradientBlob: React.FC<{
  color1?: string;
  color2?: string;
  className?: string;
}> = ({
  color1 = 'from-boring-main/40',
  color2 = 'to-boring-slate/30',
  className = ''
}) => {
  return (
    <div className={`absolute animate-spin-slow pointer-events-none ${className}`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${color1} ${color2} blur-2xl opacity-50`} />
    </div>
  );
};

// Text that has a typing animation
export const TypewriterText: React.FC<{
  text: string;
  typingSpeed?: number;
  delay?: number;
  cursorColor?: string;
  className?: string;
}> = ({
  text,
  typingSpeed = 100,
  delay = 500,
  cursorColor = 'border-boring-main',
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    // Initial delay before typing starts
    const initialTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    
    return () => clearTimeout(initialTimer);
  }, [delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
    
    return () => clearInterval(interval);
  }, [isTyping, text, typingSpeed]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      <span className={`inline-block w-0.5 h-5 -mb-0.5 ml-0.5 ${cursorVisible ? cursorColor : 'border-transparent'} animate-pulse-subtle`}>&nbsp;</span>
    </div>
  );
};

// Button with ripple effect
export const RippleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ref?: React.RefObject<HTMLButtonElement>;
}> = ({ 
  children,
  onClick,
  className = '',
  type = "button",
  ...props
}) => {
  const [rippleArray, setRippleArray] = useState<{ x: number, y: number, size: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const clearRipples = () => {
      setRippleArray([]);
    };
    
    return () => clearRipples();
  }, []);
  
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const size = Math.max(button.offsetWidth, button.offsetHeight) * 2;
    
    setRippleArray([...rippleArray, { x, y, size }]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRippleArray(prev => prev.slice(1));
    }, 600);
  };
  
  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={(e) => {
        createRipple(e);
        onClick?.();
      }}
      type={type}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {rippleArray.map((ripple, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white/20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: 'ripple 0.6s linear',
          }}
        />
      ))}
      <style>
        {`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
        `}
      </style>
    </button>
  );
};

// Main component with demos of all enhanced elements
const EnhancedInteractiveElements: React.FC = () => {
  return (
    <section className="py-16 bg-boring-offwhite relative overflow-hidden">
      {/* Background blobs */}
      <AnimatedGradientBlob className="top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2" />
      <AnimatedGradientBlob 
        color1="from-boring-slate/30" 
        color2="to-boring-main/20" 
        className="bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2" 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 text-center text-boring-dark">
            Enhanced <span className="bg-gradient-to-r from-boring-main to-boring-slate bg-clip-text text-transparent animate-gradient-x-slow">Interactive</span> Elements
          </h2>
          <p className="text-boring-gray text-center mb-12">Smoother animations and more consistent interactions</p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal delay={100}>
            <ParallaxCard className="bg-white p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 text-boring-dark">Parallax Card Effect</h3>
              <p className="text-boring-gray mb-4">This card creates a 3D effect as you move your cursor over it, with content that shifts relative to the background.</p>
              <div className="flex justify-center mt-6">
                <MagneticButton 
                  className="bg-boring-main text-boring-offwhite px-6 py-3 rounded-md"
                >
                  Magnetic Button
                </MagneticButton>
              </div>
            </ParallaxCard>
          </ScrollReveal>
          
          <ScrollReveal delay={200} direction="right">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-semibold mb-4 text-boring-dark">Ripple Effect & Animations</h3>
              <p className="text-boring-gray mb-4">Interactive elements with engaging animations and effects.</p>
              
              <div className="mb-6">
                <TypewriterText text="This text types itself automatically..." />
              </div>
              
              <div className="flex space-x-4 mb-6">
                <InteractiveIcon 
                  icon={
                    <div className="w-12 h-12 bg-boring-main/10 rounded-full flex items-center justify-center text-boring-main">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  }
                />
                <InteractiveIcon 
                  icon={
                    <div className="w-12 h-12 bg-boring-main/10 rounded-full flex items-center justify-center text-boring-main">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  }
                />
                <InteractiveIcon 
                  icon={
                    <div className="w-12 h-12 bg-boring-main/10 rounded-full flex items-center justify-center text-boring-main">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }
                />
              </div>
              
              <div className="flex justify-center">
                <RippleButton className="bg-boring-main text-boring-offwhite px-6 py-3 rounded-md">
                  Click for Ripple Effect
                </RippleButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={300}>
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Navigation & Links</h3>
            <p className="text-boring-gray mb-4">Enhanced navigation elements with smooth hover effects.</p>
            
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <AnimatedLink href="#">Home</AnimatedLink>
              <AnimatedLink href="#">About</AnimatedLink>
              <AnimatedLink href="#">Services</AnimatedLink>
              <AnimatedLink href="#">Portfolio</AnimatedLink>
              <AnimatedLink href="#">Contact</AnimatedLink>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="text-center">
          <ScrollReveal delay={400}>
            <p className="text-boring-gray mb-6">These enhanced interactive elements create a more engaging user experience</p>
            <div className="animate-bounce-subtle inline-block">
              <MagneticButton 
                className="bg-boring-main text-boring-offwhite px-8 py-4 rounded-md"
              >
                Get Started
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card - a card with realistic 3D tilt effect on hover
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glareEffect?: boolean;
  tiltMax?: number;
}> = ({
  children,
  className = '',
  glareEffect = true,
  tiltMax = 15
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovering) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate tilt
    const tiltX = (((mouseY / rect.height) * 2 - 1) * -tiltMax);
    const tiltY = (((mouseX / rect.width) * 2 - 1) * tiltMax);
    
    // Calculate glare position (as percentage)
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setTilt({ x: tiltX, y: tiltY });
    setGlarePosition({ x: glareX, y: glareY });
  };

  const resetTilt = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {glareEffect && (
        <div 
          className="absolute inset-0 bg-gradient-radial-white opacity-0 transition-opacity pointer-events-none z-20"
          style={{
            opacity: isHovering ? 0.15 : 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
            backgroundSize: '150% 150%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

// Draggable Element - an element that can be dragged within its container
export const DraggableElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  constrainToParent?: boolean;
  onDragEnd?: (x: number, y: number) => void;
}> = ({
  children,
  className = '',
  constrainToParent = true,
  onDragEnd
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    const rect = elementRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !elementRef.current) return;
      
      const parentRect = elementRef.current.parentElement?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const elementRect = elementRef.current.getBoundingClientRect();
      
      let newX = e.clientX - parentRect.left - dragOffset.current.x;
      let newY = e.clientY - parentRect.top - dragOffset.current.y;
      
      // Constrain to parent boundaries if needed
      if (constrainToParent) {
        newX = Math.max(0, Math.min(newX, parentRect.width - elementRect.width));
        newY = Math.max(0, Math.min(newY, parentRect.height - elementRect.height));
      }
      
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = () => {
      if (isDragging && onDragEnd) {
        onDragEnd(position.x, position.y);
      }
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, constrainToParent, onDragEnd]);
  
  return (
    <div
      ref={elementRef}
      className={`absolute cursor-grab ${isDragging ? 'cursor-grabbing z-50' : ''} ${className}`}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'box-shadow 0.3s ease-out',
        boxShadow: isDragging ? '0 8px 15px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {children}
    </div>
  );
};

// Expanding Circle Button - a button that expands a circle background on hover
export const ExpandingCircleButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  circleColor?: string;
  onClick?: () => void;
}> = ({
  children,
  className = '',
  circleColor = 'bg-boring-main',
  onClick
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span 
        className={`absolute inset-0 ${circleColor} rounded-full transform origin-center transition-all duration-500 ease-out`}
        style={{
          top: '50%',
          left: '50%',
          width: isHovering ? '300%' : '0%',
          height: isHovering ? '300%' : '0%',
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.15 : 0,
        }}
      />
    </button>
  );
};

// Wave Text - text with a wave animation effect
export const WaveText: React.FC<{
  text: string;
  className?: string;
  waveSpeed?: number;
  waveIntensity?: number;
}> = ({
  text,
  className = '',
  waveSpeed = 3,
  waveIntensity = 8
}) => {
  const getAnimationDelay = (index: number) => {
    return `${(index * 0.05) % 1}s`;
  };
  
  return (
    <div className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block animate-float-subtle"
          style={{
            animationDelay: getAnimationDelay(index),
            animationDuration: `${waveSpeed}s`,
            transform: `translateY(0px)`,
            display: char === ' ' ? 'inline' : 'inline-block',
            width: char === ' ' ? '0.25em' : 'auto',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// Magnetic Section - a section that attracts elements towards cursor
export const MagneticSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  radius?: number;
}> = ({
  children,
  className = '',
  intensity = 20,
  radius = 150
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  
  // Add CSS for magnetic elements
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      [data-magnetic] {
        transition: transform 0.3s ease-out;
      }
    `;
    
    // Append to document head
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Apply magnetic effect to children
    const elements = sectionRef.current.querySelectorAll('[data-magnetic]');
    elements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();
      const elementCenterX = elementRect.left + elementRect.width / 2 - rect.left;
      const elementCenterY = elementRect.top + elementRect.height / 2 - rect.top;
      
      // Calculate distance to mouse
      const deltaX = e.clientX - rect.left - elementCenterX;
      const deltaY = e.clientY - rect.top - elementCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Apply magnetic effect if within radius
      if (distance < radius) {
        const factor = 1 - distance / radius;
        const moveX = deltaX * factor * (intensity / 100);
        const moveY = deltaY * factor * (intensity / 100);
        
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        (element as HTMLElement).style.transform = '';
      }
    });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
    
    // Reset all elements
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('[data-magnetic]');
      elements.forEach((element) => {
        (element as HTMLElement).style.transform = '';
      });
    }
  };
  
  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="magnetic-elements">
        {children}
      </div>
      {mousePosition && (
        <div
          className="pointer-events-none absolute bg-gradient-radial-white opacity-10 rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: radius * 2,
            height: radius * 2,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
};

// GlowingCard Component with dynamic hover effects
export const GlowingCard: FC<{
  children: ReactNode;
  className?: string;
  gradientColors?: string;
  hoverScale?: number;
  glowIntensity?: number;
}> = ({ 
  children, 
  className = '', 
  gradientColors = 'from-purple-500 to-blue-500',
  hoverScale = 1.02,
  glowIntensity = 15
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
        boxShadow: isHovered ? `0 0 ${glowIntensity}px 0 rgba(79, 70, 229, 0.3)` : '0 0 0 0 rgba(0, 0, 0, 0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-0 transition-opacity duration-500 rounded-xl -z-10`}
        style={{ opacity: isHovered ? 0.7 : 0 }}
      />
      
      {/* Card content */}
      <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl transition-colors duration-500">
        {children}
      </div>
      
      {/* Background glow effect */}
      <div 
        className="absolute -inset-1 rounded-xl blur-xl bg-gradient-to-br opacity-0 transition-opacity duration-500 -z-20"
        style={{ 
          opacity: isHovered ? 0.15 : 0,
          background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
        }}
      />
    </div>
  );
};

// AnimatedGradientButton with hover effects
export const AnimatedGradientButton: FC<{
  children: ReactNode;
  className?: string;
  gradientColors?: string;
  onClick?: () => void;
  disabled?: boolean;
  animationDuration?: number;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}> = ({
  children,
  className = '',
  gradientColors = 'from-purple-500 via-pink-500 to-indigo-500',
  onClick,
  disabled = false,
  animationDuration = 3,
  size = 'md',
  rounded = 'md'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden transition-all 
        ${sizeClasses[size]} 
        ${roundedClasses[rounded]} 
        font-medium shadow-md 
        hover:shadow-lg 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
        ${className}
      `}
      style={{ 
        transition: 'all 0.3s ease',
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r ${gradientColors} 
          bg-gradient-animate z-0
        `}
        style={{ 
          backgroundSize: '200% 200%',
          animation: `gradient-x ${animationDuration}s ease infinite ${isHovered ? '0.5s' : '3s'}`
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10 text-white">{children}</span>
      
      {/* Overlay for hover effect */}
      <div 
        className="absolute inset-0 bg-black opacity-0 transition-opacity z-5"
        style={{ opacity: isHovered && !disabled ? 0.1 : 0 }}
      />
    </button>
  );
};

// ShimmerEffect component for text and cards
export const ShimmerEffect: FC<{
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerWidth?: string;
  duration?: number;
  delay?: number;
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;
}> = ({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.3)',
  shimmerWidth = '30%',
  duration = 2.5,
  delay = 0,
  direction = 'ltr',
  disabled = false
}) => {
  // Creating keyframes using CSS variables
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    // Add keyframes for shimmer effect
    style.innerHTML = `
      @keyframes shimmer-ltr {
        0% {
          transform: translateX(-100%);
          background: linear-gradient(to right, transparent 0%, ${shimmerColor} 50%, transparent 100%);
          background-size: ${shimmerWidth} 100%;
        }
        100% {
          transform: translateX(100%);
          background: linear-gradient(to right, transparent 0%, ${shimmerColor} 50%, transparent 100%);
          background-size: ${shimmerWidth} 100%;
        }
      }
      @keyframes shimmer-rtl {
        0% {
          transform: translateX(100%);
          background: linear-gradient(to left, transparent 0%, ${shimmerColor} 50%, transparent 100%);
          background-size: ${shimmerWidth} 100%;
        }
        100% {
          transform: translateX(-100%);
          background: linear-gradient(to left, transparent 0%, ${shimmerColor} 50%, transparent 100%);
          background-size: ${shimmerWidth} 100%;
        }
      }
    `;
    
    // Append to head
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, [shimmerColor, shimmerWidth]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        isolation: 'isolate'
      }}
    >
      {/* The content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* The shimmer overlay */}
      {!disabled && (
        <div 
          className="absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0 -z-10"
            style={{
              background: 'linear-gradient(to right, transparent, transparent)',
              animation: `shimmer-${direction} ${duration}s infinite linear ${delay}s`,
            }}
          />
        </div>
      )}
    </div>
  );
};

// ShimmerText specifically for text elements
export const ShimmerText: FC<{
  text: string;
  className?: string;
  shimmerColor?: string;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}> = ({
  text,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.3)',
  duration = 2.5,
  as = 'span'
}) => {
  const Element = as;
  
  return (
    <ShimmerEffect
      shimmerColor={shimmerColor}
      duration={duration}
      className={className}
    >
      <Element>{text}</Element>
    </ShimmerEffect>
  );
};

// TextReveal component that reveals text on hover with magnetic effect
export const MagneticTextReveal: FC<{
  hiddenText: string;
  visibleText: string;
  className?: string;
  hiddenTextColor?: string;
  visibleTextColor?: string;
}> = ({
  hiddenText,
  visibleText,
  className = '',
  hiddenTextColor = 'text-boring-main',
  visibleTextColor = 'text-boring-dark'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distX = (e.clientX - centerX) / 10;
    const distY = (e.clientY - centerY) / 10;
    
    // Limit the movement
    const limitedX = Math.min(Math.max(distX, -10), 10);
    const limitedY = Math.min(Math.max(distY, -5), 5);
    
    setPosition({ x: limitedX, y: limitedY });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden inline-block cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetPosition();
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Visible text that slides up when hovered */}
      <span
        className={`block transition-transform duration-300 ${visibleTextColor}`}
        style={{
          transform: isHovered ? `translateY(-100%) translateX(${position.x}px) translateY(${position.y}px)` : 'translateY(0)',
        }}
      >
        {visibleText}
      </span>
      
      {/* Hidden text that is revealed when visible text slides up */}
      <span
        className={`absolute top-0 left-0 transition-transform duration-300 ${hiddenTextColor}`}
        style={{
          transform: isHovered ? `translateY(0) translateX(${position.x}px) translateY(${position.y}px)` : 'translateY(100%)',
        }}
      >
        {hiddenText}
      </span>
    </div>
  );
};

// PulseGrowButton that grows on hover and pulses on click
export const PulseGrowButton: FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  growScale?: number;
  pulseColor?: string;
  pulseSize?: number;
  disabled?: boolean;
}> = ({
  children,
  onClick,
  className = '',
  growScale = 1.05,
  pulseColor = 'rgba(255, 255, 255, 0.7)',
  pulseSize = 150,
  disabled = false
}) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Create keyframes dynamically
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    // Add keyframes for pulse effect
    style.innerHTML = `
      @keyframes pulse-ping {
        0% {
          opacity: 1;
        }
        75%, 100% {
          transform: translate(-50%, -50%) scale(${pulseSize});
          opacity: 0;
        }
      }
    `;
    
    // Append to head
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, [pulseSize]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create pulse effect
    if (buttonRef.current) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 600);
      
      if (onClick) onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden transition-transform duration-300 ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        transform: isHovered && !disabled ? `scale(${growScale})` : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Pulse effect */}
      {isPulsing && (
        <span
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '10px',
            height: '10px',
            transform: 'translate(-50%, -50%)',
            background: pulseColor,
            opacity: '0',
            animation: 'pulse-ping 1s cubic-bezier(0, 0, 0.2, 1) forwards',
          }}
        />
      )}
    </button>
  );
};

// BorderGradientButton with animated gradient border
export const BorderGradientButton: FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  gradientColors?: string;
  borderWidth?: number;
  animationDuration?: number;
  disabled?: boolean;
  textColor?: string;
  hoverTextColor?: string;
}> = ({
  children,
  className = '',
  onClick,
  gradientColors = 'from-purple-500 via-pink-500 to-blue-500',
  borderWidth = 2,
  animationDuration = 3,
  disabled = false,
  textColor = 'text-boring-dark',
  hoverTextColor = 'text-white'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`relative rounded-md overflow-hidden ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Gradient border background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} bg-gradient-animate transition-all duration-300`}
        style={{ 
          backgroundSize: '200% 200%',
          animation: `gradient-x ${animationDuration}s linear infinite`,
        }}
      />
      
      {/* Inner background that covers the gradient except for the border */}
      <div 
        className="absolute bg-white dark:bg-gray-800 rounded-sm transition-all duration-300"
        style={{ 
          top: borderWidth,
          left: borderWidth,
          right: borderWidth,
          bottom: borderWidth,
          transform: isHovered && !disabled ? 'scale(0.96)' : 'scale(1)',
          opacity: isHovered && !disabled ? 0 : 1
        }}
      />
      
      {/* Button content */}
      <div 
        className={`relative z-10 px-4 py-2 transition-colors duration-300 ${isHovered && !disabled ? hoverTextColor : textColor}`}
      >
        {children}
      </div>
    </button>
  );
};

// FlipCard component that flips on hover to reveal back content
export const FlipCard: FC<{
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
  flipDirection?: 'horizontal' | 'vertical';
  flipDuration?: number;
}> = ({
  frontContent,
  backContent,
  className = '',
  flipDirection = 'horizontal',
  flipDuration = 0.6
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Set transform style based on flip direction and state
  const getTransformStyle = (isFront: boolean) => {
    if (flipDirection === 'horizontal') {
      return isFlipped 
        ? isFront ? 'rotateY(180deg)' : 'rotateY(0)'
        : isFront ? 'rotateY(0)' : 'rotateY(-180deg)';
    } else {
      return isFlipped 
        ? isFront ? 'rotateX(180deg)' : 'rotateX(0)'
        : isFront ? 'rotateX(0)' : 'rotateX(-180deg)';
    }
  };

  return (
    <div 
      className={`flip-card-container ${className}`}
      style={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="flip-card-inner relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: `transform ${flipDuration}s`,
          transform: isFlipped 
            ? (flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)')
            : 'rotate(0)',
        }}
      >
        {/* Front side */}
        <div 
          className="flip-card-front absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {frontContent}
        </div>
        
        {/* Back side */}
        <div 
          className="flip-card-back absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};

// TextSplitter component that splits and animates text on hover
export const TextSplitter: FC<{
  text: string;
  className?: string;
  hoverColor?: string;
  staggerDelay?: number;
}> = ({
  text,
  className = '',
  hoverColor = 'text-boring-main',
  staggerDelay = 0.03
}) => {
  const letters = text.split('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div 
      ref={containerRef}
      className={`inline-flex ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`transition-all duration-200 transform inline-block ${
            hoveredIndex !== null ? hoverColor : ''
          }`}
          style={{
            transitionDelay: `${Math.abs(hoveredIndex !== null ? (index - hoveredIndex) * staggerDelay : 0)}s`,
            transform: hoveredIndex !== null 
              ? `translateY(${Math.sin((index - hoveredIndex) * 0.5) * 10}px)` 
              : 'translateY(0)',
          }}
          onMouseEnter={() => setHoveredIndex(index)}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

// ProgressiveImageReveal component that reveals an image based on scroll
export const ProgressiveImageReveal: FC<{
  src: string;
  alt: string;
  className?: string;
  revealDirection?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  duration?: number;
  threshold?: number;
  previewBlur?: number;
}> = ({
  src,
  alt,
  className = '',
  revealDirection = 'left',
  duration = 0.6,
  threshold = 0.2,
  previewBlur = 5
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine mask style based on direction and intersection state
  const getMaskStyle = (): CSSProperties => {
    if (!isIntersecting) {
      return { clipPath: getInitialClipPath() };
    }
    
    return {
      clipPath: 'inset(0)',
      transition: `clip-path ${duration}s ease-in-out`
    };
  };
  
  // Get initial clip path based on reveal direction
  const getInitialClipPath = (): string => {
    switch (revealDirection) {
      case 'left':
        return 'inset(0 100% 0 0)';
      case 'right':
        return 'inset(0 0 0 100%)';
      case 'top':
        return 'inset(100% 0 0 0)';
      case 'bottom':
        return 'inset(0 0 100% 0)';
      case 'center':
        return 'inset(50% 50% 50% 50%)';
      default:
        return 'inset(0 100% 0 0)';
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    
    if (img) {
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
      }
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Low-resolution preview (blurred) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          filter: `blur(${previewBlur}px)`,
          transform: 'scale(1.1)', // Prevent blur from showing edges
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      {/* Main image with reveal effect */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          ...getMaskStyle(),
          opacity: isLoaded ? 1 : 0,
          transition: `opacity 0.5s ease-in-out, clip-path ${duration}s ease-in-out`
        }}
      />
    </div>
  );
};

// Hover tracker that adds subtle movement to an element
export const HoverTracker: FC<{
  children: ReactNode;
  className?: string;
  intensity?: number;
  rotation?: boolean;
  scale?: number;
}> = ({
  children,
  className = '',
  intensity = 5,
  rotation = true,
  scale = 1.02
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovering) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position relative to center (values from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Set position for translation
    setPosition({ 
      x: x * intensity, 
      y: y * intensity 
    });
    
    // Set rotation (more subtle)
    setRotate({
      x: -y * 10, // Rotate around X axis (horizontal)
      y: x * 10,  // Rotate around Y axis (vertical)
    });
  };

  const resetEffects = () => {
    setPosition({ x: 0, y: 0 });
    setRotate({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetEffects}
      style={{
        transform: `
          translateX(${position.x}px) 
          translateY(${position.y}px)
          ${rotation ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : ''}
          scale(${isHovering ? scale : 1})
        `,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
};

// Magnetic Interactive Card
interface MagneticInteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  backgroundGradient?: boolean;
}

export const MagneticInteractiveCard: React.FC<MagneticInteractiveCardProps> = ({
  children,
  className = '',
  strength = 30,
  backgroundGradient = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / (rect.width / 2) * strength;
      const moveY = (e.clientY - centerY) / (rect.height / 2) * strength;
      
      setPosition({ x: moveX, y: moveY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (card) {
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [strength, isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-[1.02]' : ''
      } ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${position.y * 0.05}deg) rotateY(${-position.x * 0.05}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
    >
      {backgroundGradient && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-boring-main/10 to-transparent opacity-70 z-0"></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Popover Button
interface PopoverButtonProps {
  buttonText: string;
  children: React.ReactNode;
  buttonClassName?: string;
  popoverClassName?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const PopoverButton: React.FC<PopoverButtonProps> = ({
  buttonText,
  children,
  buttonClassName = '',
  popoverClassName = '',
  position = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPositionClasses = () => {
    switch(position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'top-full mt-2';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className={`px-4 py-2 bg-boring-main text-boring-offwhite rounded-md hover:bg-opacity-90 transition-colors ${buttonClassName}`}
        onClick={togglePopover}
      >
        {buttonText}
      </button>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 p-4 bg-white rounded-lg shadow-lg min-w-[200px] transform origin-top-left transition-opacity duration-200 ${
            getPositionClasses()
          } ${popoverClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Interactive Toggle
interface InteractiveToggleProps {
  label?: string;
  initialState?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  colors?: {
    active: string;
    inactive: string;
    thumb: string;
  };
}

export const InteractiveToggle: React.FC<InteractiveToggleProps> = ({
  label,
  initialState = false,
  onChange,
  size = 'md',
  colors = {
    active: 'bg-boring-main',
    inactive: 'bg-boring-gray/30',
    thumb: 'bg-white',
  },
}) => {
  const [isChecked, setIsChecked] = useState(initialState);
  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleSizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      thumbTransform: 'translateX(16px)',
    },
    md: {
      track: 'w-12 h-6',
      thumb: 'w-4 h-4',
      thumbTransform: 'translateX(24px)',
    },
    lg: {
      track: 'w-16 h-8',
      thumb: 'w-6 h-6',
      thumbTransform: 'translateX(32px)',
    },
  };

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    
    if (onChange) {
      onChange(newState);
    }

    // Add ripple effect
    if (toggleRef.current) {
      const ripple = document.createElement('span');
      const size = Math.max(toggleRef.current.offsetWidth, toggleRef.current.offsetHeight);
      
      ripple.style.width = ripple.style.height = `${size * 2.5}px`;
      ripple.style.left = `${-size * 0.75}px`;
      ripple.style.top = `${-size * 0.75}px`;
      ripple.className = 'absolute rounded-full pointer-events-none bg-boring-main/20 animate-scale-fade-out';
      
      toggleRef.current.appendChild(ripple);
      
      setTimeout(() => {
        if (toggleRef.current && toggleRef.current.contains(ripple)) {
          toggleRef.current.removeChild(ripple);
        }
      }, 500);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label className="text-boring-dark cursor-pointer" onClick={handleToggle}>
          {label}
        </label>
      )}
      <div
        ref={toggleRef}
        onClick={handleToggle}
        className={`relative ${toggleSizes[size].track} rounded-full cursor-pointer transition-colors duration-300 overflow-hidden ${
          isChecked ? colors.active : colors.inactive
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-1 ${toggleSizes[size].thumb} rounded-full ${colors.thumb} shadow-md transition-transform duration-300`}
          style={{
            transform: isChecked ? `translateY(-50%) ${toggleSizes[size].thumbTransform}` : 'translateY(-50%) translateX(0)',
          }}
        />
      </div>
    </div>
  );
};

// Tab Group Component
interface TabProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: number | string;
}

export const Tab: React.FC<TabProps> = ({ label, active = false, onClick, badge }) => {
  return (
    <button
      className={`px-4 py-2 rounded-t-md transition-all duration-200 relative ${
        active 
          ? 'bg-white text-boring-main font-medium border-t border-l border-r border-boring-slate/20' 
          : 'bg-boring-slate/10 text-boring-gray hover:bg-boring-slate/20'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {label}
        {badge !== undefined && (
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
            active ? 'bg-boring-main text-white' : 'bg-boring-slate/30 text-boring-dark'
          }`}>
            {badge}
          </span>
        )}
      </div>
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-boring-main rounded-full" />
      )}
    </button>
  );
};

interface TabGroupProps {
  tabs: Array<{
    id: string;
    label: string;
    badge?: number | string;
  }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const TabGroup: React.FC<TabGroupProps> = ({ 
  tabs, 
  activeTab, 
  onChange, 
  className = ""
}) => {
  return (
    <div className={`flex border-b border-boring-slate/20 ${className}`}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          badge={tab.badge}
          active={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
        />
      ))}
    </div>
  );
};

// Collapsible Section
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
  className?: string;
  iconPosition?: 'left' | 'right';
  borderColor?: string;
  titleClassName?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  initialOpen = false,
  className = "",
  iconPosition = 'right',
  borderColor = "border-boring-slate/20",
  titleClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    initialOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current && isOpen) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    });
    
    resizeObserver.observe(contentRef.current);
    
    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isOpen) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 transform transition-transform duration-300 ${
        isOpen ? 'rotate-180' : ''
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <div className={`border ${borderColor} rounded-md ${className}`}>
      <button
        onClick={toggleOpen}
        className={`w-full p-4 flex items-center justify-between text-left font-medium ${titleClassName}`}
      >
        {iconPosition === 'left' && renderIcon()}
        <span>{title}</span>
        {iconPosition === 'right' && renderIcon()}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ height: contentHeight ? `${contentHeight}px` : '0px' }}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  );
};

// Rating Stars Component
interface RatingStarsProps {
  total?: number;
  initialRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  color?: string;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  total = 5,
  initialRating = 0,
  size = 'md',
  interactive = true,
  onChange,
  color = 'text-yellow-400',
  className = '',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSetRating = (newRating: number) => {
    if (!interactive) return;
    
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(total)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <span
            key={index}
            onClick={() => handleSetRating(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            className={`cursor-${interactive ? 'pointer' : 'default'} transition-transform duration-150 ${
              interactive && 'hover:scale-110'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${starSizes[size]} ${
                isFilled ? color : 'text-gray-300'
              } transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

// Notification Badge Component
interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  children: React.ReactNode;
  className?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClick?: (e: React.MouseEvent) => void;
  animate?: boolean;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  children,
  className = '',
  badgeColor = 'bg-boring-main',
  badgeTextColor = 'text-white',
  position = 'top-right',
  onClick,
  animate = true,
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  
  const positionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2',
  };
  
  return (
    <div 
      className={`relative inline-flex ${className}`}
      onClick={onClick}
    >
      {children}
      
      {count > 0 && (
        <span 
          className={`absolute ${positionClasses[position]} flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs font-bold ${badgeColor} ${badgeTextColor} ${
            animate ? 'animate-pulse-subtle' : ''
          }`}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

// TabsWithSlider Component
interface TabsWithSliderProps {
  tabs: Array<{
    id: string;
    label: string;
    badge?: number | string;
    icon?: React.ReactNode;
  }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'contained' | 'pills';
  fullWidth?: boolean;
  sliderColor?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

export const TabsWithSlider: React.FC<TabsWithSliderProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  variant = 'underline',
  fullWidth = false,
  sliderColor = 'bg-boring-main',
  tabClassName = "",
  activeTabClassName = "",
}) => {
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const sliderRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [sliderStyles, setSliderStyles] = useState({
    width: 0,
    height: 0,
    transform: 'translateX(0)',
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [movingTab, setMovingTab] = useState<string | null>(null);
  const [moveDirection, setMoveDirection] = useState<'left' | 'right' | null>(null);
  
  // Threshold for swipe (in pixels)
  const minSwipeDistance = 50;

  // Initialize and measure tabs
  useEffect(() => {
    const calculateInitialDimensions = () => {
      const activeTabElement = tabsRef.current.get(activeTab);
      if (!activeTabElement || !tabsContainerRef.current) return;

      // Calculate tallest tab for consistent height
      let maxHeight = 0;
      tabsRef.current.forEach((tabEl) => {
        const height = tabEl.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      setContentHeight(maxHeight);
      updateSliderPosition();
    };

    calculateInitialDimensions();
    window.addEventListener('resize', calculateInitialDimensions);
    
    return () => {
      window.removeEventListener('resize', calculateInitialDimensions);
    };
  }, [tabs]);

  // Update slider position when tab changes
  useEffect(() => {
    updateSliderPosition();
  }, [activeTab, variant]);

  const updateSliderPosition = () => {
    const activeTabElement = tabsRef.current.get(activeTab);
    if (!activeTabElement || !tabsContainerRef.current) return;
    
    const { width, height, left } = activeTabElement.getBoundingClientRect();
    const parentLeft = tabsContainerRef.current.getBoundingClientRect().left;
    
    if (variant === 'pills') {
      setSliderStyles({
        width: width,
        height: height,
        transform: `translateX(${left - parentLeft}px)`,
      });
    } else {
      setSliderStyles({
        width: width,
        height: 2,
        transform: `translateX(${left - parentLeft}px)`,
      });
    }
  };

  const getTabStyles = (isActive: boolean) => {
    switch(variant) {
      case 'underline':
        return `border-b-2 ${isActive ? activeTabClassName || `border-transparent font-medium ${sliderColor === 'bg-boring-main' ? 'text-boring-main' : 'text-boring-dark'}` : `border-transparent text-boring-gray ${tabClassName}`}`;
      case 'contained':
        return `${isActive ? activeTabClassName || `bg-white font-medium ${sliderColor === 'bg-boring-main' ? 'text-boring-main' : 'text-boring-dark'}` : `bg-transparent text-boring-gray ${tabClassName}`}`;
      case 'pills':
        return `rounded-full ${isActive ? activeTabClassName || `font-medium z-20 ${sliderColor === 'bg-boring-main' ? 'text-white' : 'text-white'}` : `text-boring-gray ${tabClassName}`}`;
      default:
        return '';
    }
  };

  const renderSlider = () => {
    if (variant === 'pills') {
      return (
        <div
          ref={sliderRef}
          className={`absolute z-10 rounded-full transition-all duration-300 ${sliderColor}`}
          style={{
            width: `${sliderStyles.width}px`,
            height: `${sliderStyles.height}px`,
            transform: sliderStyles.transform,
          }}
        />
      );
    }

    return (
      <div
        ref={sliderRef}
        className={`absolute z-10 h-0.5 bottom-0 transition-all duration-300 ${sliderColor}`}
        style={{
          width: `${sliderStyles.width}px`,
          transform: sliderStyles.transform,
        }}
      />
    );
  };

  // Handle touch events for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Find current tab index
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    if (isLeftSwipe && currentIndex < tabs.length - 1) {
      // Navigate to next tab
      handleTabChange(tabs[currentIndex + 1].id, 'right');
    } else if (isRightSwipe && currentIndex > 0) {
      // Navigate to previous tab
      handleTabChange(tabs[currentIndex - 1].id, 'left');
    }
    
    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleTabChange = (tabId: string, direction: 'left' | 'right' | null = null) => {
    if (activeTab === tabId) return;
    
    // Determine direction if not provided
    if (!direction) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      const newIndex = tabs.findIndex(tab => tab.id === tabId);
      direction = newIndex > currentIndex ? 'right' : 'left';
    }
    
    // For pills style, add movement animation
    if (variant === 'pills') {
      setMovingTab(activeTab);
      setMoveDirection(direction);
      
      // Clear animation after it completes
      setTimeout(() => {
        setMovingTab(null);
        setMoveDirection(null);
      }, 300);
    }
    
    onChange(tabId);
  };

  const getTabMovementClass = (tabId: string) => {
    if (variant !== 'pills' || movingTab !== tabId) return '';
    
    return moveDirection === 'right' 
      ? 'animate-slide-out-left' 
      : 'animate-slide-out-right';
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={tabsContainerRef}
        className={`flex ${fullWidth ? 'w-full' : ''} relative`}
        style={{ height: contentHeight > 0 ? `${contentHeight}px` : 'auto' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {renderSlider()}
        <div className="flex overflow-x-auto scrollbar-hide" style={{ width: '100%' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabsRef.current.set(tab.id, el);
              }}
              className={`px-4 py-2 z-10 transition-all duration-200 whitespace-nowrap ${
                fullWidth ? 'flex-1 text-center' : ''
              } ${getTabStyles(activeTab === tab.id)} ${getTabMovementClass(tab.id)}`}
              onClick={() => handleTabChange(tab.id)}
              style={{ height: '100%' }}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id && variant === 'pills' 
                      ? 'bg-white/30 text-white z-20' 
                      : activeTab === tab.id 
                        ? 'bg-boring-main/15 text-boring-main' 
                        : 'bg-boring-slate/30 text-boring-dark'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Accordion Tabs Component (alternative tab style)
interface AccordionTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  initialActiveTab?: string;
  allowMultiple?: boolean;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}

export const AccordionTabs: React.FC<AccordionTabsProps> = ({
  tabs,
  initialActiveTab,
  allowMultiple = false,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
}) => {
  const [activeTabs, setActiveTabs] = useState<Set<string>>(
    new Set(initialActiveTab ? [initialActiveTab] : [])
  );
  
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [contentHeights, setContentHeights] = useState<Record<string, number>>({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Measure content heights whenever tabs or active state changes
  const measureContentHeights = useCallback(() => {
    setTimeout(() => {
      const newHeights: Record<string, number> = {};
      contentRefs.current.forEach((contentEl, tabId) => {
        if (contentEl) {
          newHeights[tabId] = contentEl.scrollHeight;
        }
      });
      setContentHeights(newHeights);
    }, 10); // Small delay to ensure DOM has updated
  }, [tabs]);
  
  // Initialize measurement
  useEffect(() => {
    measureContentHeights();
    window.addEventListener('resize', measureContentHeights);
    
    // Mark initial render complete after a short delay (for animations to work properly)
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 50);
    
    return () => {
      window.removeEventListener('resize', measureContentHeights);
      clearTimeout(timer);
    };
  }, [tabs, measureContentHeights]);
  
  // Re-measure heights when active tabs change
  useEffect(() => {
    measureContentHeights();
  }, [activeTabs, measureContentHeights]);
  
  const toggleTab = (tabId: string) => {
    if (allowMultiple) {
      const newActiveTabs = new Set(activeTabs);
      if (newActiveTabs.has(tabId)) {
        newActiveTabs.delete(tabId);
      } else {
        newActiveTabs.add(tabId);
      }
      setActiveTabs(newActiveTabs);
    } else {
      if (activeTabs.has(tabId)) {
        // If clicking the active tab, close it
        setActiveTabs(new Set());
      } else {
        // Otherwise, make only this tab active
        setActiveTabs(new Set([tabId]));
      }
    }
  };

  return (
    <div className={`border rounded-md overflow-hidden ${className}`}>
      {tabs.map((tab, index) => {
        const isActive = activeTabs.has(tab.id);
        const isLast = index === tabs.length - 1;
        
        return (
          <div key={tab.id} className={`${!isLast ? 'border-b' : ''}`}>
            <button
              className={`w-full px-4 py-3 flex items-center justify-between text-left ${
                isActive ? activeTabClassName || 'bg-boring-main/5 text-boring-dark font-medium' : tabClassName || 'text-boring-gray'
              }`}
              onClick={() => toggleTab(tab.id)}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-[height,opacity] duration-300 ease-in-out`}
              style={{
                height: isActive ? `${contentHeights[tab.id] || 'auto'}px` : '0px',
                opacity: isActive ? 1 : 0,
              }}
            >
              <div 
                ref={(el) => {
                  if (el) {
                    contentRefs.current.set(tab.id, el);
                    if (isActive && contentHeights[tab.id] === undefined) {
                      measureContentHeights();
                    }
                  }
                }}
                className={`p-4 ${contentClassName}`}
              >
                {tab.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnhancedInteractiveElements; 