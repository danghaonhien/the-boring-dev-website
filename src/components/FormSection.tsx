import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-md space-y-4 bg-transparent">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-boring-offwhite">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection; 