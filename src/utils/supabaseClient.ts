import { createClient } from '@supabase/supabase-js';

// Environment variables need to be set up in .env file at the root
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables - prevents runtime errors if not set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file or environment configuration.'
  );
  // In development, provide clear error message
  if (import.meta.env.DEV) {
    throw new Error(
      'Supabase environment variables are missing. Check .env file and ensure it contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
    );
  }
}

// Enhanced options for the Supabase client
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  // Default headers for all requests
  global: {
    headers: {
      'X-Client-Info': `the-boring-dev-website/${import.meta.env.PACKAGE_VERSION || 'unknown'}`
    }
  }
};

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', options);

// Helper function to sanitize input before sending to Supabase
export const sanitizeInput = (input: string): string => {
  // Simple sanitization to prevent SQL injection and XSS
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .trim();
};

// Helper function for error handling
export const handleSupabaseError = (error: any, defaultMessage = 'An error occurred'): string => {
  if (import.meta.env.DEV) {
    console.error('Supabase error:', error);
  }
  
  // Return user-friendly error message
  if (error?.message) {
    // Don't expose sensitive error details to users in production
    if (import.meta.env.PROD && error.message.includes('auth')) {
      return 'Authentication error. Please try again.';
    }
    if (import.meta.env.PROD && error.message.includes('permission')) {
      return 'Permission denied. Please check your credentials.';
    }
    return error.message;
  }
  
  return defaultMessage;
}; 