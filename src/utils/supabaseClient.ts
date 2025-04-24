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
    // Use the fixed repair_user_profile function instead of manual checks
    const { data, error } = await supabase
      .rpc('repair_user_profile', { target_user_id: userId });
    
    if (error) {
      console.error("Debug process error occurred");
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Debug process error occurred");
    return false;
  }
};

// Helper for avatar uploads
export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  try {
    // Check if avatars bucket exists, if not create it
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error("Error checking storage buckets");
      throw bucketsError;
    }
    
    const avatarBucketExists = buckets?.some(bucket => bucket.name === 'avatars');
    
    // Create the avatars bucket if it doesn't exist
    if (!avatarBucketExists) {
      const { error: createBucketError } = await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 2097152, // 2MB
      });
      
      if (createBucketError) {
        console.error("Failed to create avatars bucket");
        throw createBucketError;
      }
    }
    
    // Ensure proper file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const safeExt = allowedExts.includes(fileExt) ? fileExt : 'jpg';
    
    // Create a unique file path
    const filePath = `${userId}/${Date.now()}.${safeExt}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { 
        upsert: true,
        contentType: file.type
      });
    
    if (uploadError) {
      console.error("Avatar upload error");
      throw uploadError;
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    if (!urlData?.publicUrl) {
      console.error("Could not get public URL for avatar");
      return null;
    }
    
    return urlData.publicUrl;
  } catch (error) {
    console.error("Avatar upload process failed");
    return null;
  }
}; 