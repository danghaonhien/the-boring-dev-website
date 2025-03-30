import React, { useState, useEffect, useRef } from 'react';
import {
  AnimatedLink,
  ScrollReveal,
  ParallaxCard,
  MagneticButton,
  InteractiveIcon,
  AnimatedGradientBlob,
  TypewriterText,
  MagneticSection,
  GlowingCard,
  AnimatedGradientButton,
  ShimmerEffect,
  ShimmerText,
  MagneticTextReveal,
  PulseGrowButton,
  BorderGradientButton,
  FlipCard,
  ProgressiveImageReveal
} from './EnhancedInteractiveElements';
import DesignSystem from './DesignSystem';

// New Interactive Element: Magnetic Interactive Card
interface MagneticInteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  backgroundGradient?: boolean;
}

const MagneticInteractiveCard: React.FC<MagneticInteractiveCardProps> = ({
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

// New Interactive Element: PopoverButton
interface PopoverButtonProps {
  buttonText: string;
  children: React.ReactNode;
  buttonClassName?: string;
  popoverClassName?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const PopoverButton: React.FC<PopoverButtonProps> = ({
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

// New Interactive Element: Interactive Toggle
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

const InteractiveToggle: React.FC<InteractiveToggleProps> = ({
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
      const rect = toggleRef.current.getBoundingClientRect();
      
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

const EnhancedInteractiveElementsShowcase: React.FC = () => {
  return (
    <div className="py-16 bg-boring-offwhite">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 text-center">Interactive Elements</h2>
          <p className="text-boring-gray text-center mb-10">Explore our collection of interactive UI elements</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Buttons</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 gap-4">
              <div>
                <p className="text-boring-gray mb-2">Animated Gradient Button</p>
                <AnimatedGradientButton size="md" rounded="md">
                  Hover Me
                </AnimatedGradientButton>
              </div>

              <div>
                <p className="text-boring-gray mb-2">Pulse Grow Button</p>
                <PulseGrowButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
                  Click Me
                </PulseGrowButton>
              </div>

              <div>
                <p className="text-boring-gray mb-2">Border Gradient Button</p>
                <BorderGradientButton className="px-4 py-2">
                  Border Effect
                </BorderGradientButton>
              </div>

              <div>
                <p className="text-boring-gray mb-2">Magnetic Button</p>
                <MagneticButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
                  Follow Cursor
                </MagneticButton>
              </div>

              <div>
                <p className="text-boring-gray mb-2">Popover Button</p>
                <PopoverButton buttonText="Click for Popover">
                  <div className="text-boring-dark">
                    <h4 className="font-medium mb-2">Popover Content</h4>
                    <p className="text-boring-gray text-sm mb-2">This is a custom popover component with flexible positioning.</p>
                    <a href="#" className="text-boring-main text-sm">Learn More</a>
                  </div>
                </PopoverButton>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Toggle & Links</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <p className="text-boring-gray mb-2">Interactive Toggle</p>
                <div className="space-y-4">
                  <InteractiveToggle label="Default Toggle" />
                  <InteractiveToggle 
                    label="Custom Colors" 
                    size="lg"
                    colors={{
                      active: "bg-green-500",
                      inactive: "bg-red-300",
                      thumb: "bg-white"
                    }}
                  />
                  <InteractiveToggle 
                    label="Small Size" 
                    size="sm"
                    initialState={true}
                  />
                </div>
              </div>

              <div>
                <p className="text-boring-gray mb-2">Animated Link</p>
                <AnimatedLink href="#" className="text-boring-main">
                  Hover to see underline effect
                </AnimatedLink>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Cards</h3>
            <div className="space-y-6">
              <GlowingCard className="p-5">
                <h4 className="text-lg font-medium mb-2 text-boring-dark">Glowing Card</h4>
                <p className="text-boring-gray">Hover over this card to see the glowing effect around the borders.</p>
              </GlowingCard>

              <MagneticInteractiveCard backgroundGradient={true} className="p-5 bg-white">
                <h4 className="text-lg font-medium mb-2 text-boring-dark">Magnetic Interactive Card</h4>
                <p className="text-boring-gray">Move your cursor around the card to see the tilt effect.</p>
              </MagneticInteractiveCard>

              <FlipCard
                frontContent={
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <h4 className="text-xl font-medium mb-2 text-boring-dark">Flip Card Front</h4>
                    <p className="text-boring-gray text-center">Hover to see the back side</p>
                  </div>
                }
                backContent={
                  <div className="flex flex-col items-center justify-center h-full p-6 bg-boring-main text-boring-offwhite">
                    <h4 className="text-xl font-medium mb-2">Flip Card Back</h4>
                    <p className="text-center opacity-90">This is the back content</p>
                  </div>
                }
                className="h-[200px]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Parallax & Image Effects</h3>
            <div className="space-y-6">
              <ParallaxCard className="p-5 bg-white min-h-[150px]">
                <h4 className="text-lg font-medium mb-2 text-boring-dark">Parallax Card</h4>
                <p className="text-boring-gray">Move your cursor around to see the elements shift in 3D space.</p>
              </ParallaxCard>

              <div className="bg-white p-5 rounded-lg shadow-sm">
                <p className="text-boring-gray mb-2">Progressive Image Reveal</p>
                <ProgressiveImageReveal
                  src="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=3270&auto=format&fit=crop"
                  alt="Sample Image"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Text Effects</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-boring-gray mb-2">Shimmer Text</p>
                <ShimmerText
                  text="This text has a shimmer effect"
                  className="text-xl font-semibold text-boring-dark"
                  shimmerColor="rgba(0, 1, 13, 0.2)"
                  duration={3}
                />
              </div>
              
              <div>
                <p className="text-boring-gray mb-2">Shimmer Effect (on any element)</p>
                <ShimmerEffect duration={2.5}>
                  <div className="bg-boring-main/10 p-4 rounded-lg">
                    <p className="text-boring-dark">Custom element with shimmer</p>
                  </div>
                </ShimmerEffect>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Background Effects</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm relative overflow-hidden min-h-[200px]">
            <AnimatedGradientBlob 
              className="opacity-20"
              color1="#00010D"
              color2="#364556"
            />
            <div className="relative z-10">
              <h4 className="text-lg font-medium mb-4 text-boring-dark">Animated Gradient Background</h4>
              <p className="text-boring-gray mb-4">This container has an animated gradient blob in the background that adds subtle movement.</p>
              <PulseGrowButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
                Interactive Element
              </PulseGrowButton>
            </div>
          </div>
        </div>

        {/* Design System Integration */}
        <DesignSystem />
      </div>
    </div>
  );
};

export default EnhancedInteractiveElementsShowcase; 