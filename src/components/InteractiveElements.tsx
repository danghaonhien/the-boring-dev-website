import React, { useState, useEffect } from 'react';

// Color change button that cycles through theme colors on hover
export const ColorChangeButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoverState, setHoverState] = useState(false);
  
  return (
    <button 
      className={`px-6 py-3 rounded-md font-medium transition-all duration-300 
        ${hoverState 
          ? 'bg-boring-slate text-boring-offwhite' 
          : 'bg-boring-main text-boring-offwhite'}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      {children}
    </button>
  );
};

// Gradient text that animates on hover
export const AnimatedGradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="inline-block relative transition-all duration-300 hover:scale-105">
      <span className="bg-gradient-to-r from-boring-main to-boring-slate bg-clip-text text-transparent animate-gradient-x font-bold">
        {children}
      </span>
    </span>
  );
};

// Card that elevates on hover
export const ElevatedCard: React.FC<{ title: string; description: string; icon?: React.ReactNode }> = ({ 
  title, 
  description,
  icon
}) => {
  return (
    <div className="bg-boring-offwhite p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      {icon && <div className="mb-4 text-boring-main">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2 text-boring-dark">{title}</h3>
      <p className="text-boring-gray">{description}</p>
    </div>
  );
};

// Collapsible section
export const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ 
  title, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-boring-slate/20 rounded-lg overflow-hidden mb-4">
      <button 
        className={`w-full p-4 text-left font-semibold transition-colors duration-200 flex justify-between items-center
          ${isOpen ? 'bg-boring-main text-boring-offwhite' : 'bg-boring-offwhite text-boring-dark'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

// Tabs component
export const TabsComponent: React.FC<{ tabs: { title: string; content: React.ReactNode }[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div>
      <div className="flex border-b border-boring-slate/20 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium transition-colors duration-200 
              ${activeTab === index 
                ? 'text-boring-main border-b-2 border-boring-main' 
                : 'text-boring-gray hover:text-boring-dark'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="py-2">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

// Custom checkbox with animation
export const AnimatedCheckbox: React.FC<{ 
  label?: string;
  checked?: boolean;
  onChange?: () => void;
  id?: string;
  labelColor?: string;
}> = ({ 
  label,
  checked = false,
  onChange,
  id,
  labelColor = 'text-boring-dark'
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  
  const handleToggle = () => {
    if (onChange) {
      onChange();
    } else {
      setIsChecked(!isChecked);
    }
  };
  
  return (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={handleToggle}>
      <div 
        className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center
          ${isChecked 
            ? 'bg-boring-main border-boring-main' 
            : 'border-boring-offwhite/50 bg-transparent'}`}
        id={id}
      >
        {isChecked && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-boring-offwhite" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      {label && <span className={`text-sm ${labelColor}`}>{label}</span>}
    </div>
  );
};

// Floating element animation
export const FloatingElement: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-float">
      {children}
    </div>
  );
};

// Color theme switcher for demo
export const ThemeModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <button 
      className={`relative inline-flex items-center px-4 py-2 rounded-full transition-colors duration-300
        ${darkMode ? 'bg-boring-dark' : 'bg-boring-offwhite'}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      <span 
        className={`absolute left-1 top-1 w-8 h-8 rounded-full transition-transform duration-300 shadow
          ${darkMode ? 'translate-x-full bg-boring-slate' : 'bg-boring-main'}`}
      />
      <span className={`mr-3 ml-9 ${darkMode ? 'text-boring-offwhite' : 'text-boring-dark'}`}>
        {darkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

// Demo component that showcases all interactive elements
const InteractiveElements: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-boring-dark">
          Interactive <AnimatedGradientText>Elements</AnimatedGradientText>
        </h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <ElevatedCard 
            title="Hover Me" 
            description="This card elevates slightly when you hover over it, creating a subtle interaction."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905c0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            }
          />
          <ElevatedCard 
            title="Interactive Design" 
            description="Interactivity improves user engagement and makes your website feel more dynamic."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
          <ElevatedCard 
            title="Smooth Animations" 
            description="Subtle animations create a polished, professional feel for your website."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12 space-x-4">
            <ColorChangeButton>
              Interactive Button
            </ColorChangeButton>
            <ThemeModeToggle />
            <FloatingElement>
              <span className="inline-block p-4 bg-boring-main text-boring-offwhite rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </span>
            </FloatingElement>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Collapsible Content</h3>
            <CollapsibleSection title="Click to expand this section">
              <p className="text-boring-gray mb-4">
                Collapsible sections are great for FAQs, documentation, or any content that you want to keep organized but accessible.
              </p>
              <div className="flex space-x-2">
                <AnimatedCheckbox label="Option 1" />
                <AnimatedCheckbox label="Option 2" />
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Another expandable section">
              <p className="text-boring-gray">
                You can have multiple collapsible sections. They're a great way to organize related content without taking up too much space.
              </p>
            </CollapsibleSection>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-boring-dark">Tabbed Content</h3>
            <TabsComponent 
              tabs={[
                {
                  title: "Tab 1",
                  content: (
                    <p className="text-boring-gray">
                      This is the content for the first tab. Tabs are great for organizing related content and saving space.
                    </p>
                  )
                },
                {
                  title: "Tab 2",
                  content: (
                    <div>
                      <p className="text-boring-gray mb-4">
                        This is the content for the second tab. You can include any content you want here.
                      </p>
                      <ColorChangeButton>Button in Tab</ColorChangeButton>
                    </div>
                  )
                },
                {
                  title: "Tab 3",
                  content: (
                    <div className="flex space-x-4">
                      <ElevatedCard 
                        title="Card in Tab" 
                        description="You can nest components within tabs for complex layouts."
                      />
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveElements; 