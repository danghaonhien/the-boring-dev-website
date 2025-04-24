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

// Debug utility for profile loading issues
export const debugProfileLoading = async (userId: string) => {
  // Removed detailed logging for security reasons
  try {
    // Check if user exists in auth.users
    const { data: authUser, error: authError } = await supabase
      .rpc('get_auth_user_by_id', { user_id: userId });
    
    // Check if user exists in public.users
    const { data: publicUser, error: publicUserError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    // If no public user but auth user exists, create public user
    if (publicUserError && publicUserError.code === 'PGRST116' && authUser) {
      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .insert({ 
          id: userId,
          email: authUser.email || 'unknown@example.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
    }
    
    // If no profile but public user exists, create profile
    if (profileError && profileError.code === 'PGRST116' && (publicUser || authUser)) {
      const { data: insertedProfile, error: insertProfileError } = await supabase
        .from('profiles')
        .insert({ 
          id: userId,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
    }
    
    return true;
  } catch (e) {
    console.error("Debug process error occurred");
    return false;
  }
}; 