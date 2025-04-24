import React from 'react';

interface AvatarUploadProps {
  previewUrl: string | null;
  defaultUrl: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  previewUrl,
  defaultUrl,
  onFileChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={previewUrl || defaultUrl}
        alt="Avatar Preview"
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm dark:shadow-boring-main/20"
        onError={(e) => {
          e.currentTarget.src = defaultUrl;
        }}
      />
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Profile image
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          disabled={disabled}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 
                     file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                     file:text-sm file:font-semibold 
                     file:bg-indigo-50 file:text-indigo-700 
                     dark:file:bg-indigo-900 dark:file:text-indigo-300 
                     hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max file size: 2MB.</p>
      </div>
    </div>
  );
};

export default AvatarUpload; 