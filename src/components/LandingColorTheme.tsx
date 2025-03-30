import React from 'react';
import { ScrollReveal, ParallaxCard } from './EnhancedInteractiveElements';

const ColorBox: React.FC<{ color: string; name: string; hex: string }> = ({ color, name, hex }) => (
  <div className="flex-1">
    <ParallaxCard className="h-full">
      <div className={`${color} h-32 rounded-t-lg shadow-sm`}></div>
      <div className="bg-white p-4 rounded-b-lg shadow-sm">
        <p className="font-bold text-boring-dark">{name}</p>
        <p className="text-boring-gray text-sm">{hex}</p>
      </div>
    </ParallaxCard>
  </div>
);

const LandingColorTheme: React.FC = () => {
  return (
    <section className="py-16 bg-boring-offwhite">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-12 text-center text-boring-dark">Color Theme</h2>
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto px-4">
          <ScrollReveal delay={100}>
            <ColorBox color="bg-boring-main" name="Main" hex="#3F72AF" />
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <ColorBox color="bg-boring-dark" name="Dark" hex="#112D4E" />
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <ColorBox color="bg-boring-slate" name="Slate" hex="#DBE2EF" />
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <ColorBox color="bg-boring-offwhite" name="Off White" hex="#F9F7F7" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LandingColorTheme; 