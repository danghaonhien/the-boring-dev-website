import React from 'react';

interface DemoWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const DemoWrapper: React.FC<DemoWrapperProps> = ({ children, className = "" }) => (
  <div className={`relative flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-850 border border-gray-200  rounded-lg shadow-sm w-full min-h-[200px] ${className}`}>
    {children}
  </div>
);

export default DemoWrapper; 