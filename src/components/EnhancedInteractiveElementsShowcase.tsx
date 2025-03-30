import React, { useState, useEffect, useRef } from 'react';
import {
  AnimatedGradientButton,
  AnimatedGradientBlob,
  AnimatedLink,
  ProgressiveImageReveal,
  ParallaxCard,
  MagneticButton,
  GlowingCard,
  FlipCard,
  PulseGrowButton,
  BorderGradientButton,
  ShimmerEffect,
  ShimmerText,
  ScrollReveal,
  MagneticInteractiveCard,
  PopoverButton,
  InteractiveToggle,
  TabGroup,
  CollapsibleSection,
  RatingStars,
  NotificationBadge,
  TabsWithSlider,
  AccordionTabs
} from './EnhancedInteractiveElements';
import DesignSystem from './DesignSystem';

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

        {/* New Interactive UI Components Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Interactive UI Components</h3>
          
          {/* Tabs Demo - Enhanced with new components */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <p className="text-boring-gray mb-4">Tab Navigation</p>
            <div className="space-y-8">
              <div>
                <h4 className="text-boring-dark font-medium mb-3">Basic Tabs</h4>
                <TabGroupDemo />
              </div>
              
              <div>
                <h4 className="text-boring-dark font-medium mb-3">Tabs with Sliding Indicator (Underline Style)</h4>
                <TabsWithSliderDemo variant="underline" />
              </div>
              
              <div>
                <h4 className="text-boring-dark font-medium mb-3">Tabs with Sliding Indicator (Pills Style)</h4>
                <TabsWithSliderDemo variant="pills" />
              </div>
              
              <div>
                <h4 className="text-boring-dark font-medium mb-3">Tabs with Sliding Indicator (Contained Style)</h4>
                <div className="bg-boring-slate/10 p-1 rounded-md">
                  <TabsWithSliderDemo variant="contained" />
                </div>
              </div>
              
              <div>
                <h4 className="text-boring-dark font-medium mb-3">Accordion Tabs</h4>
                <AccordionTabsDemo />
              </div>
            </div>
          </div>
          
          {/* Collapsible Sections Demo */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <p className="text-boring-gray mb-4">Collapsible Sections</p>
            <div className="space-y-4">
              <CollapsibleSection 
                title="Getting Started" 
                initialOpen={true}
                titleClassName="text-boring-dark"
              >
                <p className="text-boring-gray">
                  This is the expanded content of the first section. The content will smoothly 
                  expand and collapse with a nice animation when you click the header.
                </p>
              </CollapsibleSection>
              
              <CollapsibleSection 
                title="Advanced Features" 
                titleClassName="text-boring-dark"
              >
                <p className="text-boring-gray">
                  This section contains information about advanced features. You can toggle
                  it open or closed. The height animation adjusts automatically to the content.
                </p>
                <div className="mt-3 pt-3 border-t border-boring-slate/10">
                  <p className="text-boring-gray">
                    Additional content can be added here, and the animation will adjust accordingly.
                  </p>
                </div>
              </CollapsibleSection>
              
              <CollapsibleSection 
                title="Left Icon Example" 
                iconPosition="left"
                titleClassName="text-boring-dark"
              >
                <p className="text-boring-gray">
                  This section has the icon positioned on the left instead of the right.
                </p>
              </CollapsibleSection>
            </div>
          </div>
          
          {/* Rating Stars Demo */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <p className="text-boring-gray mb-4">Rating Component</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-boring-dark mb-2">Interactive Rating:</p>
                <RatingDemo />
              </div>
              <div>
                <p className="text-sm text-boring-dark mb-2">Rating Sizes:</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-boring-gray w-10">Small:</span>
                    <RatingStars initialRating={4} size="sm" interactive={false} />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-boring-gray w-10">Medium:</span>
                    <RatingStars initialRating={4} size="md" interactive={false} />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-boring-gray w-10">Large:</span>
                    <RatingStars initialRating={4} size="lg" interactive={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Badge Demo */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-boring-gray mb-4">Notification Badges</p>
            <div className="flex flex-wrap gap-6">
              <NotificationBadge count={5} className="block">
                <button className="p-3 bg-boring-slate/10 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boring-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </NotificationBadge>
              
              <NotificationBadge count={12} badgeColor="bg-green-500" position="top-left">
                <button className="p-3 bg-boring-slate/10 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boring-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </NotificationBadge>
              
              <NotificationBadge count={99} maxCount={9} badgeColor="bg-red-500" position="bottom-right">
                <button className="p-3 bg-boring-slate/10 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boring-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </NotificationBadge>
              
              <NotificationBadge count={0}>
                <button className="p-3 bg-boring-slate/10 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boring-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </button>
              </NotificationBadge>
            </div>
          </div>
        </div>

        {/* Design System Integration */}
        <DesignSystem />
      </div>
    </div>
  );
};

// Tab Group Demo Component
const TabGroupDemo = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [contentHeight, setContentHeight] = useState(150); // Minimum height
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  
  useEffect(() => {
    // Calculate and set the maximum height of all tab contents
    const calculateMaxHeight = () => {
      let maxHeight = 150; // Minimum height
      contentRefs.current.forEach((contentEl) => {
        if (contentEl && contentEl.scrollHeight > maxHeight) {
          maxHeight = contentEl.scrollHeight;
        }
      });
      setContentHeight(maxHeight);
    };
    
    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, []);
  
  const tabs = [
    {
      id: 'tab1',
      label: 'Dashboard',
    },
    {
      id: 'tab2',
      label: 'Projects',
      badge: 3,
    },
    {
      id: 'tab3',
      label: 'Settings',
    },
    {
      id: 'tab4',
      label: 'Notifications',
      badge: '9+',
    },
  ];
  
  return (
    <div className="rounded-md overflow-hidden">
      <TabGroup 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      <div className="bg-white relative" style={{ minHeight: `${contentHeight}px` }}>
        {/* Use absolute positioning for tab content to prevent layout shifts */}
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab1' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab1', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Dashboard Content</h3>
            <p className="text-boring-gray">This is the dashboard tab content. Click on another tab to see it change.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab2' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab2', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Projects Content</h3>
            <p className="text-boring-gray">Here you would see your project list. This tab has a badge indicating 3 new projects.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab3' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab3', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Settings Content</h3>
            <p className="text-boring-gray">This tab contains user settings and preferences.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab4' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab4', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Notifications Content</h3>
            <p className="text-boring-gray">You have 9+ unread notifications. This tab has a badge to indicate this.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// TabsWithSlider Demo Component
const TabsWithSliderDemo = ({ variant }: { variant: 'underline' | 'contained' | 'pills' }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [contentHeight, setContentHeight] = useState(150); // Minimum height
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  
  useEffect(() => {
    // Calculate and set the maximum height of all tab contents
    const calculateMaxHeight = () => {
      let maxHeight = 150; // Minimum height
      contentRefs.current.forEach((contentEl) => {
        if (contentEl && contentEl.scrollHeight > maxHeight) {
          maxHeight = contentEl.scrollHeight;
        }
      });
      setContentHeight(maxHeight);
    };
    
    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, []);
  
  const tabs = [
    {
      id: 'tab1',
      label: 'Dashboard',
      icon: variant !== 'pills' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ) : undefined,
    },
    {
      id: 'tab2',
      label: 'Projects',
      badge: 3,
      icon: variant !== 'pills' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ) : undefined,
    },
    {
      id: 'tab3',
      label: 'Settings',
      icon: variant !== 'pills' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ) : undefined,
    },
    {
      id: 'tab4',
      label: 'Notifications',
      badge: '9+',
      icon: variant !== 'pills' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ) : undefined,
    },
  ];

  // Define specific styles for each variant
  let containerClass = '';
  let sliderColor = 'bg-boring-main';
  
  if (variant === 'pills') {
    containerClass = 'p-1 bg-boring-slate/10 rounded-full';
    sliderColor = 'bg-boring-main';
  } else if (variant === 'contained') {
    containerClass = '';
    sliderColor = 'bg-boring-main';
  }
  
  // Adding a taller minimum height for the tabs content on pills
  const contentMinHeight = variant === 'pills' ? 160 : 150;
  
  return (
    <div className="rounded-md overflow-hidden">
      <div className={containerClass}>
        <TabsWithSlider 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab}
          variant={variant}
          sliderColor={sliderColor}
          fullWidth={variant === 'contained'}
        />
      </div>
      <div className="bg-white relative" style={{ minHeight: `${Math.max(contentHeight, contentMinHeight)}px` }}>
        {/* Use absolute positioning for tab content to prevent layout shifts */}
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab1' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab1', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Dashboard Content</h3>
            <p className="text-boring-gray">This enhanced tab uses a sliding indicator for better visual feedback. The slider smoothly transitions between tabs.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab2' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab2', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Projects Content</h3>
            <p className="text-boring-gray">Here you would see your project list. This tab has a badge indicating 3 new projects.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab3' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab3', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Settings Content</h3>
            <p className="text-boring-gray">This tab contains user settings and preferences. Try the different tab styles to see how they look and feel.</p>
          </div>
        </div>
        
        <div 
          className={`absolute top-0 left-0 w-full p-4 transition-opacity duration-300 ${activeTab === 'tab4' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          ref={(el) => {
            if (el) contentRefs.current.set('tab4', el);
          }}
        >
          <div>
            <h3 className="text-lg font-medium text-boring-dark mb-2">Notifications Content</h3>
            <p className="text-boring-gray">You have 9+ unread notifications. This tab has a badge to indicate this.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// AccordionTabs Demo Component
const AccordionTabsDemo = () => {
  const tabs = [
    {
      id: 'tab1',
      label: 'Getting Started',
      content: (
        <div>
          <h3 className="text-lg font-medium text-boring-dark mb-2">Welcome to the Accordion Tabs</h3>
          <p className="text-boring-gray mb-3">
            This accordion tab interface allows for vertical expansion of content sections. 
            Each tab can be opened and closed independently.
          </p>
          <p className="text-boring-gray">
            Click on any header to toggle its content visibility.
          </p>
        </div>
      ),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'tab2',
      label: 'Features & Options',
      content: (
        <div>
          <h3 className="text-lg font-medium text-boring-dark mb-2">Accordion Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-boring-gray">
            <li>Smooth height animation when opening/closing</li>
            <li>Option to allow multiple open tabs simultaneously</li>
            <li>Support for icons in tab headers</li>
            <li>Fully keyboard accessible</li>
            <li>Customizable styling for active and inactive states</li>
          </ul>
        </div>
      ),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: 'tab3',
      label: 'Usage Examples',
      content: (
        <div>
          <h3 className="text-lg font-medium text-boring-dark mb-2">When to Use Accordion Tabs</h3>
          <p className="text-boring-gray mb-3">
            Accordion tabs are ideal for:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-boring-gray">
            <li>FAQ sections</li>
            <li>Product details on mobile views</li>
            <li>Settings panels with multiple categories</li>
            <li>Content that needs to be progressively disclosed</li>
            <li>Showing a lot of content in a limited vertical space</li>
          </ul>
        </div>
      ),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];
  
  return (
    <AccordionTabs 
      tabs={tabs} 
      initialActiveTab="tab1"
      allowMultiple={false}
      className="border-boring-slate/20"
    />
  );
};

// Rating Stars Demo Component
const RatingDemo = () => {
  const [rating, setRating] = useState(3);
  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  
  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <RatingStars
          initialRating={rating}
          onChange={setRating}
          color="text-yellow-400"
        />
        <span className="text-boring-dark ml-2">
          {rating > 0 ? ratingLabels[rating - 1] : 'Not rated'}
        </span>
      </div>
      <p className="text-sm text-boring-gray">
        Click on a star to change your rating. Hover to see a preview.
      </p>
    </div>
  );
};

export default EnhancedInteractiveElementsShowcase; 