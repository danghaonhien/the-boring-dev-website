import React from 'react';

interface ColorSwatchProps {
  name: string;
  hex: string;
  className: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, hex, className }) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-24 h-24 rounded-md shadow-md ${className}`}
        title={hex}
      ></div>
      <p className="mt-2 font-medium">{name}</p>
      <p className="text-sm text-boring-gray">{hex}</p>
    </div>
  );
};

const DesignSystem: React.FC = () => {
  return (
    <div className="section bg-boring-offwhite">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-boring-dark">The Boring Dev Design System</h2>
        
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <ColorSwatch name="Main" hex="#0001D0" className="bg-boring-main" />
            <ColorSwatch name="Gray" hex="#626973" className="bg-boring-gray" />
            <ColorSwatch name="Slate" hex="#79818C" className="bg-boring-slate" />
            <ColorSwatch name="Off White" hex="#F2F2F0" className="bg-boring-offwhite border border-gray-200" />
            <ColorSwatch name="Dark" hex="#0D0D0D" className="bg-boring-dark" />
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Typography</h3>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-boring-dark">Heading 1</h1>
              <p className="text-boring-gray">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-boring-dark">Heading 2</h2>
              <p className="text-boring-gray">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-boring-dark">Heading 3</h3>
              <p className="text-boring-gray">text-2xl font-semibold</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-boring-dark">Heading 4</h4>
              <p className="text-boring-gray">text-xl font-semibold</p>
            </div>
            <div>
              <p className="text-base text-boring-dark">Body text - Regular paragraph text.</p>
              <p className="text-boring-gray">text-base</p>
            </div>
            <div>
              <p className="text-sm text-boring-dark">Small text - Used for supporting information.</p>
              <p className="text-boring-gray">text-sm</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-boring-dark">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h4 className="text-lg font-semibold mb-2 text-boring-dark">Card Title</h4>
              <p className="text-boring-gray">This is a standard card component that can be used throughout the landing page.</p>
            </div>
            <div className="card bg-boring-main text-boring-offwhite">
              <h4 className="text-lg font-semibold mb-2">Card with main Background</h4>
              <p className="text-boring-offwhite opacity-80">This card uses the primary main color as background.</p>
            </div>
            <div className="card bg-boring-dark text-boring-offwhite">
              <h4 className="text-lg font-semibold mb-2">Card with Dark Background</h4>
              <p className="text-boring-offwhite opacity-80">This card uses the dark color as background.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem; 