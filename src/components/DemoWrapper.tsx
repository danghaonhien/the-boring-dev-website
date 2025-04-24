import React from 'react';

interface DemoWrapperProps {
  children: React.ReactNode;
  className?: string;
  forceLightMode?: boolean;
}

export const DemoWrapper: React.FC<DemoWrapperProps> = ({ children, className = "", forceLightMode = false }) => (
  <div className={`relative flex flex-col items-center justify-center p-4 sm:p-6 ${forceLightMode ? 'bg-white border-gray-200 text-gray-900' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'} border rounded-lg shadow-sm w-full min-h-[200px] ${className}`}>
    {children}
  </div>
);

export default DemoWrapper; 