import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed

// Define the shape of the profile data fetched from the database
interface ProfileData {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  // Add other fields from your profiles table if needed in the context
  // website_url?: string | null;
  // location?: string | null;
  // bio?: string | null;
  // ... etc.
}

// Define the richer user type combining Auth User and ProfileData
// We make ProfileData fields optional as they might not exist immediately
export type UserWithProfile = User & Partial<ProfileData>;


// Define the shape of the context state
interface AuthContextType {
  session: Session | null;
  user: UserWithProfile | null; // Use the richer type
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>; // Add refresh function
}

// Create the context with a default undefined value to prevent usage outside the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  // Use the richer type for the user state
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true); // Start loading until initial check is done

  // Function to fetch profile data and merge with auth user
  const fetchAndSetUserWithProfile = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }
    

    // Start with the basic auth user data
    let combinedUser: UserWithProfile = { ...authUser };

    try {
      setLoading(true); // Indicate loading profile data specifically
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        // Select only the fields defined in ProfileData
        .select('username, full_name, avatar_url')
        .eq('id', authUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // Ignore 'Row not found' error initially
        console.error("Error fetching profile data:", profileError);
        // Optionally handle specific errors
      }

      if (profileData) {
        // Merge profile data into the user object
        combinedUser = { ...combinedUser, ...profileData };
      }
    } catch (error) {
      console.error("Exception fetching profile data:", error);
    } finally {
      setUser(combinedUser); // Set the combined user (even if profile fetch failed)
      setLoading(false); // Stop loading
    }
  }, []);


  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component

    // 1. Get initial session and profile
    async function getInitialSessionAndProfile() {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();

        if (error) throw error;
        if (isMounted) {
          setSession(initialSession);
          // Fetch profile based on initial user
          await fetchAndSetUserWithProfile(initialSession?.user ?? null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (isMounted) setLoading(false); // Ensure loading stops on error
      }
      // setLoading(false) is handled within fetchAndSetUserWithProfile now
    }

    getInitialSessionAndProfile();

    // 2. Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (isMounted) {
          setSession(currentSession);
          // Fetch profile based on the user from the current session
          await fetchAndSetUserWithProfile(currentSession?.user ?? null);
        }
      }
    );

    // Cleanup function
    return () => {
      isMounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
    // Add fetchAndSetUserWithProfile to dependency array
  }, [fetchAndSetUserWithProfile]);

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
    }
    // State (session, user) will be updated by onAuthStateChange listener triggering fetchAndSetUserWithProfile
  };

  // Refresh function to be called after profile updates
  const refreshUserProfile = useCallback(async () => {
    // Re-use the fetching logic, passing the current auth user
    await fetchAndSetUserWithProfile(session?.user ?? null);
  }, [session, fetchAndSetUserWithProfile]); // Depend on session and the fetcher


  // Value provided by the context
  const value = {
    session,
    user,
    loading,
    signOut,
    refreshUserProfile // Provide the refresh function
  };

  // Optional: Show a global loading indicator while auth/profile is loading
  // if (loading) {
  //   return <div>Loading Authentication...</div>;
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 