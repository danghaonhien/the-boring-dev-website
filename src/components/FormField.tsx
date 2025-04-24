import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'textarea';
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  rows = 3,
  helperText
}) => {
  const baseInputClasses = 
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
    "placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 " +
    "sm:text-sm " +
    "disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed " +
    "transition duration-150 ease-in-out " +
    "dark:bg-gray-700 dark:border-gray-600 dark:text-boring-offwhite " +
    "dark:placeholder-gray-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 " +
    "dark:disabled:bg-gray-900 dark:disabled:text-gray-500";
  
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          className={baseInputClasses}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseInputClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
      
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField; 