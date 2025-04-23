import React from 'react';

interface OAuthButtonProps {
  providerName: string; // e.g., "Google", "GitHub"
  icon: React.ReactNode; // SVG or other icon component
  onClick: () => void;
  disabled?: boolean;
}

export default function OAuthButton({ providerName, icon, onClick, disabled }: OAuthButtonProps) {
  return (
    <button
      type="button" // Important: type="button" to prevent form submission
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2`}
    >
      <span className="mr-2">{icon}</span>
      Continue with {providerName}
    </button>
  );
} 