import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number; // Optional duration in ms, defaults to 10000
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 10000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Clear the timer if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [message, type, duration, onClose]); // Rerun effect if these change

  const baseClasses = "fixed top-5 left-1/2 transform -translate-x-1/2 max-w-md w-full p-4 rounded-lg shadow-lg flex items-center justify-between z-50";
  const typeClasses = type === 'success'
    ? "bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200"
    : "bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200";

  const icon = type === 'success' ? (
    // Success Icon (Checkmark)
    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    // Error Icon (X)
    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <div className="flex items-center">
        {icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className={`ml-4 p-1 rounded-md focus:outline-none focus:ring-2 ${
          type === 'success' 
            ? 'text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 focus:ring-green-400 dark:focus:ring-green-600' 
            : 'text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 focus:ring-red-400 dark:focus:ring-red-600'
        }`}
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Toast; 