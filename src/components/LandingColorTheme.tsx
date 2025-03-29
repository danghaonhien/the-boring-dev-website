import React from 'react';

interface ColorProps {
  name: string;
  hex: string;
  className: string;
}

const ColorBox: React.FC<ColorProps> = ({ name, hex, className }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className={`w-24 h-24 rounded-lg shadow-md mb-2 ${className}`}></div>
      <p className="font-semibold">{name}</p>
      <p className="text-boring-gray text-sm">{hex}</p>
    </div>
  );
};

const LandingColorTheme: React.FC = () => {
  return (
    <div className="bg-boring-offwhite py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-boring-dark mb-8 text-center">Landing Page Color Theme</h2>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-boring-dark">Primary Colors</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
            <ColorBox name="Main" hex="#00010D" className="bg-boring-main" />
            <ColorBox name="Gray" hex="#626973" className="bg-boring-gray" />
            <ColorBox name="Slate" hex="#79818C" className="bg-boring-slate" />
            <ColorBox name="Off White" hex="#F2F2F0" className="bg-boring-offwhite border border-gray-200" />
            <ColorBox name="Dark" hex="#0D0D0D" className="bg-boring-dark" />
          </div>
          
          <h3 className="text-xl font-semibold mb-6 text-boring-dark">Gradients</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="h-24 bg-theme-gradient rounded-lg shadow-md mb-2"></div>
              <p className="font-semibold">Horizontal Gradient</p>
              <p className="text-boring-gray text-sm">Main → Slate</p>
            </div>
            <div>
              <div className="h-24 bg-theme-gradient-vertical rounded-lg shadow-md mb-2"></div>
              <p className="font-semibold">Vertical Gradient</p>
              <p className="text-boring-gray text-sm">Main → Slate</p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-6 text-boring-dark">Text Colors</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-theme-main font-semibold mb-1">Main Text</p>
              <p className="text-theme-main text-sm">This text uses the main color (#00010D)</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-theme-dark font-semibold mb-1">Dark Text</p>
              <p className="text-theme-dark text-sm">This text uses the dark color (#0D0D0D)</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-theme-slate font-semibold mb-1">Slate Text</p>
              <p className="text-theme-slate text-sm">This text uses the slate color (#79818C)</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md bg-boring-dark">
              <p className="text-theme-offwhite font-semibold mb-1">Off White Text</p>
              <p className="text-theme-offwhite text-sm">This text uses the off white color (#F2F2F0)</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-theme-gray font-semibold mb-1">Gray Text</p>
              <p className="text-theme-gray text-sm">This text uses the gray color (#626973)</p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-6 text-boring-dark">Background Examples</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-theme-main p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Main Background</h4>
              <p className="opacity-80 text-sm">Content on main background with off-white text</p>
            </div>
            <div className="bg-theme-dark p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Dark Background</h4>
              <p className="opacity-80 text-sm">Content on dark background with off-white text</p>
            </div>
            <div className="bg-theme-slate p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Slate Background</h4>
              <p className="opacity-80 text-sm">Content on slate background with off-white text</p>
            </div>
            <div className="bg-theme-offwhite p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Off White Background</h4>
              <p className="opacity-80 text-sm">Content on off-white background with dark text</p>
            </div>
          </div>
          
          <div className="bg-theme-gradient p-6 rounded-lg mb-8">
            <h4 className="font-semibold mb-2">Gradient Background</h4>
            <p className="opacity-80 text-sm">Content on gradient background with off-white text</p>
          </div>
          
          <h3 className="text-xl font-semibold mb-6 text-boring-dark">Buttons with Theme Colors</h3>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-boring-main text-boring-offwhite rounded hover:bg-opacity-90 transition-all">
              Main Button
            </button>
            <button className="px-4 py-2 bg-boring-dark text-boring-offwhite rounded hover:bg-opacity-90 transition-all">
              Dark Button
            </button>
            <button className="px-4 py-2 bg-boring-slate text-boring-offwhite rounded hover:bg-opacity-90 transition-all">
              Slate Button
            </button>
            <button className="px-4 py-2 bg-boring-offwhite text-boring-dark rounded border border-boring-gray hover:bg-gray-100 transition-all">
              Light Button
            </button>
            <button className="px-4 py-2 bg-theme-gradient rounded hover:opacity-90 transition-all">
              Gradient Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingColorTheme; 