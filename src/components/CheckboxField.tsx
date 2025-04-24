import React from 'react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center">
      <input 
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-1 dark:focus:ring-indigo-700 dark:focus:ring-offset-gray-800 
                   border-gray-300 dark:border-gray-600 rounded 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-gray-700 dark:checked:bg-indigo-700"
      />
      <label 
        htmlFor={id} 
        className="ml-2 block text-sm text-gray-900 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxField; 