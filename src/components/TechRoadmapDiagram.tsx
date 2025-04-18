import React, { useState, useEffect, useRef } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows'; 
import TechRoadmapCard from './TechRoadmapCard'; // Import the TSX Card component
// Note: Tailwind styles assumed to be globally available or imported elsewhere

// Define Role Type
type SelectedRole = 'engineer' | 'designer' | 'product';

// --- Role Specific Phase Data --- 
const engineerPhases = {
  phase1: { title: 'Phase 1: Framework Frenzy', content: `Learning the "stable" stack.<br/>First commit: a typo fix.` },
  phase2: { title: 'Phase 2: Documentation Deep Dive', content: `Maintaining legacy systems.<br/>Meetings about documentation.` },
  phase3: { title: 'Phase 3: What Even is Code?', content: `"Is this efficient?"<br/>Considers refactoring *everything*.` },
};

const designerPhases = {
  phase1: { title: 'Phase 1: Pixel Pushing Practice', content: `Learning Figma shortcuts.<br/>Making gradients look "right".` },
  phase2: { title: 'Phase 2: Design System Defender', content: `Evangelizing component library.<br/>Meetings about consistency.` },
  phase3: { title: 'Phase 3: Questioning Kerning', content: `"Does this spark joy?"<br/>Considers switching to illustration.` },
};

const productPhases = {
  phase1: { title: 'Phase 1: Requirement Gathering', content: `Translating user needs.<br/>Creating endless tickets.` },
  phase2: { title: 'Phase 2: Roadmap Juggling', content: `Prioritizing features.<br/>Meetings about prioritization.` },
  phase3: { title: 'Phase 3: Strategy Summit Survivor', content: `"What's our North Star?"<br/>Considers becoming a consultant.` },
};

// --- Role Specific End Path Data ---
const engineerEndPaths = {
  burnout: { title: 'Burn Out', content: `(Code looks blurry)` },
  ownPath: { title: 'Pivot Point', content: `(Team lead? DevOps? Farm?)` },
};

const designerEndPaths = {
  burnout: { title: 'Burn Out', content: `(All designs look gray)` },
  ownPath: { title: 'Pivot Point', content: `(UX research? Branding? Pottery?)` },
};

const productEndPaths = {
  burnout: { title: 'Burn Out', content: `(Roadmap feels endless)` },
  ownPath: { title: 'Pivot Point', content: `(Strategy? Consulting? Bakery?)` },
};

// --- Static Initial Card Data ---
const initialCards = {
  engineer: { id: 'engineer', title: 'Engineers', content: 'Keeps the lights on (mostly).' },
  designer: { id: 'designer', title: 'Designers', content: 'Makes the buttons round.' },
  product: { id: 'product', title: 'Product/PMs', content: 'Has "vision." Adds tickets.' }, 
};

// IDs needed for arrows, but titles/content are dynamic now
const endCardIds = {
  burnout: 'burnout',
  ownPath: 'ownPath',
};

// Updated arrow properties for dark theme
const arrowPropsHorizontal = { 
  color: '#4b5563', 
  strokeWidth: 1.5, 
  headSize: 5,       
  path: 'smooth' as const, 
  curveness: 0.6,  
  startAnchor: 'right' as const, 
  endAnchor: 'left' as const 
};

const arrowPropsVertical = { 
  color: '#4b5563', 
  strokeWidth: 1.5, 
  headSize: 5,       
  path: 'smooth' as const, 
  curveness: 0.6, 
  startAnchor: 'bottom' as const, 
  endAnchor: 'top' as const 
};

const TechRoadmapDiagram: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>('engineer');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false); // State for hover
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkScreenSize);

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseenter', handleMouseEnter); // Use mouseenter
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseenter', handleMouseEnter);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleRoleSelect = (role: SelectedRole) => {
    setSelectedRole(role);
  };

  // Select phase data based on state
  const currentPhases = 
    selectedRole === 'engineer' ? engineerPhases :
    selectedRole === 'designer' ? designerPhases :
    productPhases; 

  // Select end path data based on state
  const currentEndPaths = 
    selectedRole === 'engineer' ? engineerEndPaths :
    selectedRole === 'designer' ? designerEndPaths :
    productEndPaths;

  // --- Mobile Layout --- 
  const renderMobileLayout = () => (
    <div className="w-full px-4">
      {/* Role Selection Tabs - Stronger selected style */}
      <div className="flex justify-center space-x-4 mb-8 border-b border-boring-slate/30 pb-4">
        {(Object.keys(initialCards) as SelectedRole[]).map((role) => (
          <button
            key={role}
            onClick={() => handleRoleSelect(role)}
            className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 
              ${selectedRole === role 
                ? 'bg-boring-main text-boring-offwhite font-semibold' /* Stronger selected style */
                : 'text-boring-offwhite/70 hover:bg-boring-slate/10 hover:text-boring-offwhite font-medium'}
            `}
          >
            {initialCards[role].title} 
          </button>
        ))}
      </div>

      {/* Vertical Diagram for Selected Role */}
      <Xwrapper key={selectedRole}> {/* Key needed here too */}
        <div className="flex flex-col items-center gap-8">
          {/* Phase 1 */}
          <TechRoadmapCard 
            id="phase1" 
            title={currentPhases.phase1.title}
            content={currentPhases.phase1.content}
            widthClass="w-full max-w-xs" // Constrain width on mobile
          />
          {/* Phase 2 */}
           <TechRoadmapCard 
            id="phase2"
            title={currentPhases.phase2.title}
            content={currentPhases.phase2.content}
            widthClass="w-full max-w-xs"
          />
          {/* Phase 3 */}
           <TechRoadmapCard 
            id="phase3"
            title={currentPhases.phase3.title}
            content={currentPhases.phase3.content}
            widthClass="w-full max-w-xs"
          />
          {/* End Paths Container (horizontal split on mobile) */}
          <div className="flex flex-row gap-4 w-full justify-center">
             <TechRoadmapCard 
               id={endCardIds.burnout}
               title={currentEndPaths.burnout.title}
               content={currentEndPaths.burnout.content}
               widthClass="w-1/2 max-w-[150px]" // Half width, max
               textColor="text-boring-offwhite"
             />
             <TechRoadmapCard 
               id={endCardIds.ownPath}
               title={currentEndPaths.ownPath.title}
               content={currentEndPaths.ownPath.content}
               widthClass="w-1/2 max-w-[150px]" // Half width, max
               textColor="text-boring-offwhite"
             />
          </div>
        </div>
        {/* Vertical Arrows */}
        <Xarrow start="phase1" end="phase2" {...arrowPropsVertical} />
        <Xarrow start="phase2" end="phase3" {...arrowPropsVertical} />
        <Xarrow start="phase3" end={endCardIds.burnout} {...arrowPropsVertical} /> 
        <Xarrow start="phase3" end={endCardIds.ownPath} {...arrowPropsVertical} /> 
      </Xwrapper>
    </div>
  );

  // --- Desktop Layout --- 
  const renderDesktopLayout = () => (
    <Xwrapper key={selectedRole}> 
      <div className="flex items-center justify-center w-full gap-12 p-6"> 
        {/* Column 1: Starting Points */} 
        <div className="flex flex-col items-center space-y-8">
           <TechRoadmapCard 
            {...initialCards.engineer} 
            bgColor="bg-gray-700/70 backdrop-blur-sm" 
            widthClass="w-full md:w-44" 
            isSelected={selectedRole === 'engineer'}
            onClick={() => handleRoleSelect('engineer')}
          /> 
          <TechRoadmapCard 
            {...initialCards.designer} 
            bgColor="bg-gray-700/70 backdrop-blur-sm" 
            widthClass="w-full md:w-44" 
            isSelected={selectedRole === 'designer'}
            onClick={() => handleRoleSelect('designer')}
          />
          <TechRoadmapCard 
            {...initialCards.product} 
            bgColor="bg-gray-700/70 backdrop-blur-sm" 
            widthClass="w-full md:w-44" 
            isSelected={selectedRole === 'product'}
            onClick={() => handleRoleSelect('product')}
          />
        </div>
        {/* Column 2: Phase 1 */} 
        <div className="flex flex-col items-center">
          <TechRoadmapCard 
            key={`phase1-${selectedRole}`}
            id="phase1" 
            title={currentPhases.phase1.title}
            content={currentPhases.phase1.content}
            widthClass="w-full md:w-60" 
          />
        </div>
        {/* Column 3: Phase 2 */} 
        <div className="flex flex-col items-center">
           <TechRoadmapCard 
            key={`phase2-${selectedRole}`}
            id="phase2"
            title={currentPhases.phase2.title}
            content={currentPhases.phase2.content}
            widthClass="w-full md:w-60" 
          />
        </div>
        {/* Column 4: Phase 3 */} 
        <div className="flex flex-col items-center">
           <TechRoadmapCard 
            key={`phase3-${selectedRole}`}
            id="phase3"
            title={currentPhases.phase3.title}
            content={currentPhases.phase3.content}
            widthClass="w-full md:w-60" 
          />
        </div>
        {/* Column 5: End Paths */} 
        <div className="flex flex-col items-center space-y-8">
           <TechRoadmapCard 
             key={`burnout-${selectedRole}`}
             id={endCardIds.burnout}
             title={currentEndPaths.burnout.title}
             content={currentEndPaths.burnout.content}
             widthClass="w-full md:w-44" 
             textColor="text-boring-offwhite"
           />
           <TechRoadmapCard 
             key={`ownpath-${selectedRole}`}
             id={endCardIds.ownPath}
             title={currentEndPaths.ownPath.title}
             content={currentEndPaths.ownPath.content}
             widthClass="w-full md:w-44" 
             textColor="text-boring-offwhite"
           />
        </div>
      </div>
      {/* --- Arrow Definitions - Conditional rendering for initial arrows --- */} 
      {selectedRole === 'engineer' && (
        <Xarrow start={initialCards.engineer.id} end="phase1" {...arrowPropsHorizontal} />
      )}
      {selectedRole === 'designer' && (
        <Xarrow start={initialCards.designer.id} end="phase1" {...arrowPropsHorizontal} /> 
      )}
      {selectedRole === 'product' && (
        <Xarrow start={initialCards.product.id} end="phase1" {...arrowPropsHorizontal} /> 
      )}
      {/* Arrows connecting phases and end paths remain */}
      <Xarrow start="phase1" end="phase2" {...arrowPropsHorizontal} />
      <Xarrow start="phase2" end="phase3" {...arrowPropsHorizontal} /> 
      <Xarrow start="phase3" end={endCardIds.burnout} {...arrowPropsHorizontal} /> 
      <Xarrow start="phase3" end={endCardIds.ownPath} {...arrowPropsHorizontal} /> 
    </Xwrapper>
  );

  // Inline styles for setting CSS custom properties
  const containerStyle: React.CSSProperties = {
    ['--mouse-x' as string]: `${mousePosition.x}px`,
    ['--mouse-y' as string]: `${mousePosition.y}px`,
    ['--glow-opacity' as string]: isHovering ? 0.25 : 0, // Increased opacity from 0.15 to 0.25
  };

  // CSS for the pseudo-element glow effect
  const glowStyles = `
    .glow-container::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit; /* Match parent's border radius */
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        rgba(90, 88, 166, 1), /* Use main color, opacity controlled below */
        transparent 80%
      );
      opacity: var(--glow-opacity);
      transition: opacity 0.3s ease-in-out;
    }
  `;

  return (
    <>
      <style>{glowStyles}</style> { /* Inject styles */}
      <div 
        ref={containerRef}
        style={containerStyle} // Apply custom properties
        className="glow-container bg-boring-dark relative text-boring-offwhite flex flex-col items-center justify-start pt-10 pb-20 font-sans overflow-auto  shadow-inner min-w-full"
        // Added glow-container class and relative
      >
        <h2 className="relative z-10 text-3xl font-bold mb-10 md:mb-16 text-center text-boring-offwhite px-4">
          The Hilariously Real "Boring" Tech Roadmap
        </h2>
        
        <div className="relative z-10 w-full"> 
          {isMobile ? renderMobileLayout() : renderDesktopLayout()}
        </div>
      </div>
    </>
  );
};

export default TechRoadmapDiagram; 