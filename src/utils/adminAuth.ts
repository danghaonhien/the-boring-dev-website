import { supabase } from './supabaseClient';

// Check if current user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
};

// Check if user has admin role - FIXED with better error handling
export const isAdmin = async () => {
  try {
    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return false;
    }
    
    if (!session) {
      console.log('No active session found');
      return false;
    }
    
    // Log the current user ID for debugging
    console.log('Checking admin status for user ID:', session.user.id);
    
    // Query admin_users table with service role to bypass RLS
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    
    if (error) {
      console.error('Admin check error:', error);
      return false;
    }
    
    console.log('Admin check result:', data ? 'Is Admin' : 'Not Admin');
    return !!data; // Convert to boolean
  } catch (err) {
    console.error('Unexpected error checking admin status:', err);
    return false;
  }
};

// Login function for admins - FIXED with better error messages
export const loginAdmin = async (email: string, password: string) => {
  try {
    // First attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      throw error;
    }
    
    if (!data.session) {
      console.error('No session returned from login');
      throw new Error('Login failed - no session returned');
    }
    
    // Check if the authenticated user is an admin
    const isUserAdmin = await isAdmin();
    
    if (!isUserAdmin) {
      // Sign out if user is not an admin
      await supabase.auth.signOut();
      console.error('User is not an admin:', email);
      throw new Error('You do not have admin privileges');
    }
    
    return data;
  } catch (err) {
    // Ensure we're signed out if anything fails
    await supabase.auth.signOut();
    throw err;
  }
};

// Logout function
export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Admin-only data fetching wrapper
export const fetchWithAdminCheck = async <T>(
  fetchFn: () => Promise<T>
): Promise<T> => {
  const admin = await isAdmin();
  
  if (!admin) {
    throw new Error('Unauthorized access');
  }
  
  return fetchFn();
}; 