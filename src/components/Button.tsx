import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 disabled:opacity-50";
  
  const variantClasses = {
    primary: `bg-indigo-600 hover:bg-indigo-700 text-white 
              dark:bg-indigo-700 dark:hover:bg-indigo-600 
              ${disabled ? 'cursor-not-allowed bg-indigo-400 dark:bg-indigo-800 dark:text-gray-300' : ''}`,
    secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 
                dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 
                ${disabled ? 'cursor-not-allowed bg-gray-300 dark:bg-gray-800 dark:text-gray-400' : ''}`,
    danger: `bg-red-600 hover:bg-red-700 text-white 
             dark:bg-red-700 dark:hover:bg-red-600 
             ${disabled ? 'cursor-not-allowed bg-red-400 dark:bg-red-900 dark:text-gray-300' : ''}`,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 