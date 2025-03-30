import React, { useState } from 'react';
import { 
  AnimatedGradientButton,
  PulseGrowButton,
  MagneticButton,
  BorderGradientButton,
  ShimmerText,
  GlowingCard,
  ScrollReveal
} from './EnhancedInteractiveElements';

// Design system color component
const ColorSwatch: React.FC<{ 
  name: string; 
  hex: string; 
  textColor?: string;
}> = ({ name, hex, textColor = "text-white" }) => {
  return (
    <div className="mb-4 mr-4">
      <div 
        className={`h-20 w-full rounded-t-lg flex items-end p-2 ${textColor}`}
        style={{ backgroundColor: hex }}
      >
        {name}
      </div>
      <div className="bg-white p-2 rounded-b-lg shadow-sm text-xs text-boring-gray">
        {hex}
      </div>
    </div>
  );
};

// Typography component
const Typography: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-boring-dark">Typography</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold mb-2 text-boring-dark">Heading 1</h1>
        <h2 className="text-3xl font-bold mb-2 text-boring-dark">Heading 2</h2>
        <h3 className="text-2xl font-bold mb-2 text-boring-dark">Heading 3</h3>
        <h4 className="text-xl font-bold mb-2 text-boring-dark">Heading 4</h4>
        <h5 className="text-lg font-bold mb-2 text-boring-dark">Heading 5</h5>
        <h6 className="text-base font-bold mb-6 text-boring-dark">Heading 6</h6>
        
        <p className="text-lg mb-2 text-boring-dark">Large paragraph text for important content.</p>
        <p className="text-base mb-2 text-boring-dark">Regular paragraph text for most content areas.</p>
        <p className="text-sm mb-6 text-boring-gray">Small text for captions and secondary information.</p>
        
        <div className="flex flex-wrap mb-4">
          <span className="mr-4 font-normal text-boring-dark">Normal</span>
          <span className="mr-4 font-medium text-boring-dark">Medium</span>
          <span className="mr-4 font-semibold text-boring-dark">Semibold</span>
          <span className="mr-4 font-bold text-boring-dark">Bold</span>
        </div>
      </div>
    </div>
  );
};

// Buttons showcase
const Buttons: React.FC = () => {
  const [demoToggle, setDemoToggle] = useState(false);
  
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-boring-dark">Buttons</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-boring-dark">Standard Buttons</h4>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Primary
            </button>
            <button className="bg-boring-slate text-boring-offwhite px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Secondary
            </button>
            <button className="bg-boring-offwhite text-boring-main border border-boring-main px-4 py-2 rounded-md hover:bg-boring-main/5 transition-colors">
              Outline
            </button>
            <button className="bg-boring-gray/20 text-boring-gray px-4 py-2 rounded-md opacity-60 cursor-not-allowed">
              Disabled
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-boring-dark">Sizes</h4>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-boring-main text-boring-offwhite px-2 py-1 text-xs rounded">
              Small
            </button>
            <button className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
              Medium
            </button>
            <button className="bg-boring-main text-boring-offwhite px-6 py-3 text-lg rounded-lg">
              Large
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-boring-dark">Interactive Buttons</h4>
          <div className="flex flex-wrap gap-4 mb-4">
            <AnimatedGradientButton size="md" rounded="md">
              Gradient
            </AnimatedGradientButton>
            
            <PulseGrowButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
              Pulse Effect
            </PulseGrowButton>
            
            <MagneticButton className="bg-boring-main text-boring-offwhite px-4 py-2 rounded-md">
              Magnetic
            </MagneticButton>
            
            <BorderGradientButton className="px-4 py-2">
              Border Gradient
            </BorderGradientButton>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3 text-boring-dark">Toggle</h4>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDemoToggle(!demoToggle)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${demoToggle ? 'bg-boring-main' : 'bg-boring-gray/30'}`}
            >
              <span 
                className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300"
                style={{ transform: demoToggle ? 'translateX(6px)' : 'translateX(0)' }}
              />
            </button>
            <span className="text-boring-gray">Toggle state: {demoToggle ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card styles
const Cards: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-boring-dark">Cards</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-2 text-boring-dark">Standard Card</h4>
          <p className="text-boring-gray mb-4">This is a basic card component with standard styling.</p>
          <button className="text-boring-main text-sm font-medium">Learn More</button>
        </div>
        
        <div className="bg-boring-slate/5 p-6 rounded-lg shadow-sm border border-boring-slate/20">
          <h4 className="text-lg font-medium mb-2 text-boring-dark">Outlined Card</h4>
          <p className="text-boring-gray mb-4">This card uses a subtle border and background.</p>
          <button className="text-boring-main text-sm font-medium">Learn More</button>
        </div>
        
        <GlowingCard className="p-2">
          <div className="p-4">
            <h4 className="text-lg font-medium mb-2 text-boring-dark">Interactive Card</h4>
            <p className="text-boring-gray mb-4">This card has hover effects and a gradient border.</p>
            <button className="text-boring-main text-sm font-medium">Learn More</button>
          </div>
        </GlowingCard>
      </div>
    </div>
  );
};

// Form elements
const FormElements: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-boring-dark">Form Elements</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-boring-dark font-medium mb-2">Text Input</label>
            <input 
              type="text" 
              className="w-full p-2 border border-boring-slate/30 rounded focus:ring-2 focus:ring-boring-main/20 focus:border-boring-main focus:outline-none transition-all" 
              placeholder="Type here..."
            />
          </div>
          
          <div>
            <label className="block text-boring-dark font-medium mb-2">Select Menu</label>
            <select className="w-full p-2 border border-boring-slate/30 rounded focus:ring-2 focus:ring-boring-main/20 focus:border-boring-main focus:outline-none transition-all appearance-none bg-arrow-down bg-no-repeat bg-right">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          
          <div>
            <label className="block text-boring-dark font-medium mb-2">Textarea</label>
            <textarea 
              className="w-full p-2 border border-boring-slate/30 rounded focus:ring-2 focus:ring-boring-main/20 focus:border-boring-main focus:outline-none transition-all" 
              placeholder="Type here..."
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-boring-dark font-medium mb-4">Checkbox & Radio</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="checkbox1" 
                  className="w-4 h-4 text-boring-main border-boring-slate/30 rounded focus:ring-boring-main/20"
                />
                <label htmlFor="checkbox1" className="ml-2 text-boring-dark">Checkbox option</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="radio1" 
                  name="radiogroup" 
                  className="w-4 h-4 text-boring-main border-boring-slate/30 focus:ring-boring-main/20"
                />
                <label htmlFor="radio1" className="ml-2 text-boring-dark">Radio option 1</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="radio2" 
                  name="radiogroup" 
                  className="w-4 h-4 text-boring-main border-boring-slate/30 focus:ring-boring-main/20"
                />
                <label htmlFor="radio2" className="ml-2 text-boring-dark">Radio option 2</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animations and interactions
const Animations: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-boring-dark">Animations & Interactions</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-boring-dark font-medium">Hover Scale</div>
            <div className="w-24 h-24 bg-boring-slate/20 rounded-lg transform transition-transform hover:scale-110 hover:shadow-lg flex items-center justify-center text-boring-gray">
              Hover Me
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 text-boring-dark font-medium">Subtle Float</div>
            <div className="w-24 h-24 bg-boring-slate/20 rounded-lg animate-float-subtle flex items-center justify-center text-boring-gray">
              Floating
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 text-boring-dark font-medium">Pulse Effect</div>
            <div className="w-24 h-24 bg-boring-slate/20 rounded-lg animate-pulse-subtle flex items-center justify-center text-boring-gray">
              Pulsing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main design system component
const DesignSystem: React.FC = () => {
  return (
    <section className="py-16 bg-boring-offwhite">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <ShimmerText
            text="Design System"
            as="h2"
            className="text-3xl font-bold mb-2 text-center"
            shimmerColor="rgba(0, 1, 13, 0.2)"
            duration={3}
          />
          <p className="text-boring-gray text-center mb-12">A comprehensive guide to The Boring Dev's UI components</p>
        </ScrollReveal>
        
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ColorSwatch name="Main" hex="#00010D" />
            <ColorSwatch name="Gray" hex="#626973" />
            <ColorSwatch name="Slate" hex="#79818C" />
            <ColorSwatch name="Dark" hex="#0D0D0D" />
            <ColorSwatch name="Off White" hex="#F2F2F0" textColor="text-boring-dark" />
          </div>
        </div>
        
        <Typography />
        <Buttons />
        <Cards />
        <FormElements />
        <Animations />
      </div>
    </section>
  );
};

export default DesignSystem; 