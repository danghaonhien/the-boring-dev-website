import React, { ReactNode } from 'react';

interface FormContainerProps {
  title: string;
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md isolate">
      <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-boring-offwhite">
        {title}
      </h2>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default FormContainer; 