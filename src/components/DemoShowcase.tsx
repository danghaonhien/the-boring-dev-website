import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ClipboardIcon, InfoIcon as LucideInfoIcon, Zap as BoltIcon, Lightbulb } from 'lucide-react'; // Using lucide directly

// --- Helper Icons (Consider moving to a dedicated icon file if used elsewhere) ---
// Note: Using lucide-react for consistency now. If specific SVGs were needed, define them here.
// const InfoIcon = () => <LucideInfoIcon className="w-4 h-4 inline mr-1" />; // Example if needed separately
// const BoltIcon = () => <BoltIcon className="w-4 h-4 inline mr-1" />;
// const LightbulbIcon = () => <Lightbulb className="w-4 h-4 inline mr-1" />;

// --- Dev Panel Component ---
interface DevPanelProps {
  isCodeVisible: boolean; // Needed to show/hide copy btn
  codeSnippet: string;
  onCopy: () => void;
  copySuccess: boolean;
}

const DevPanel: React.FC<DevPanelProps> = ({
  isCodeVisible,
  codeSnippet, // Keep for potential future use, though unused in button logic now
  onCopy,
  copySuccess,
}) => {
  return (
    <div className="mt-auto p-3 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-b-md flex justify-end items-center space-x-2 w-full">
      {/* Copy Button (visible only when code is shown) */}
      {isCodeVisible && (
           <button
               onClick={onCopy}
               className="p-1.5 rounded text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
               title="Copy Code"
           >
           {copySuccess ? (
               <CheckIcon className="w-4 h-4 text-green-500" />
           ) : (
               <ClipboardIcon className="w-4 h-4" />
           )}
           </button>
       )}
    </div>
  );
};


// --- Showcase Wrapper Component ---
export interface DemoShowcaseProps {
  title: string;
  description: React.ReactNode;
  effort: 'Low' | 'Medium' | 'High' | 'Existential';
  usefulness?: 'Practical' | 'Conceptual' | 'Mildly Concerning';
  codeSnippet: string;
  children: React.ReactNode;
  className?: string;
}

export const DemoShowcase: React.FC<DemoShowcaseProps> = ({
  title,
  description,
  effort,
  usefulness,
  codeSnippet,
  children,
  className = '',
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const effortColor = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Existential: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  const usefulnessColor = {
    Practical: 'border-blue-500',
    Conceptual: 'border-indigo-500',
    'Mildly Concerning': 'border-pink-500',
  };

   const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }, [codeSnippet]);

  return (
    <div className={`bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-8 overflow-hidden flex flex-col ${className}`}>
      {/* Header Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {/* Flex container for Title and Toggle */}
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            {/* Preview/Code Toggle */}
            <div className="flex space-x-1 flex-shrink-0 ml-4">
                 <button
                     onClick={() => setIsCodeVisible(false)}
                     className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                     !isCodeVisible
                         ? 'border border-gray-500 text-gray-700 bg-transparent dark:text-gray-300 dark:border-gray-600'
                         : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                     }`}
                 >
                     Preview
                 </button>
                 <button
                     onClick={() => setIsCodeVisible(true)}
                     className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                     isCodeVisible
                         ? 'border border-gray-500 text-gray-700 bg-transparent dark:text-gray-300 dark:border-gray-600'
                         : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                     }`}
                 >
                     Dev
                 </button>
            </div>
        </div>
        {/* End Flex container */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</div>
        <div className="flex items-center space-x-3 text-xs">
          <span className={`px-2 py-0.5 rounded-full flex items-center ${effortColor[effort]}`}>
             <BoltIcon className="w-3 h-3 mr-1" /> Effort: {effort}
          </span>
          {/* Conditionally render usefulness tag */}
          {usefulness && usefulness.trim() !== '' && (
            <span className={`px-2 py-0.5 rounded-full border flex items-center ${usefulnessColor[usefulness as keyof typeof usefulnessColor] || 'border-gray-500'} text-gray-700 dark:text-gray-300`}>
              <Lightbulb className="w-3 h-3 mr-1" /> {usefulness}
            </span>
          )}
        </div>
      </div>

      {/* Component Demo Area - Rendered if not in code view */}
       {!isCodeVisible && (
         <div className="p-4 flex justify-center bg-gray-50 dark:bg-gray-900 h-90 flex-grow overflow-y-auto">
           {children}
         </div>
       )}


      {/* Code Snippet Area - Rendered if in code view */}
      {isCodeVisible && (
        <div className="bg-gray-100 dark:bg-gray-950 overflow-y-scroll flex-grow h-80">
          <pre className="language-tsx !m-0 !p-4 !text-sm !leading-relaxed !whitespace-pre-wrap !break-words h-full">
              <code className="language-tsx">
                  {codeSnippet.trim()}
              </code>
          </pre>
        </div>
      )}

      {/* Dev Panel positioned at the bottom */}
       <DevPanel
           isCodeVisible={isCodeVisible}
           codeSnippet={codeSnippet}
           onCopy={handleCopy}
           copySuccess={copySuccess}
       />
    </div>
  );
};

// Default export is helpful if this is the primary component in the file
export default DemoShowcase; 