import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed

// Define a UserWithProfile type that extends User with profile fields
interface UserProfile {
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  // Add other profile fields as needed
}

type UserWithProfile = User & UserProfile;

// Define the shape of the context state
interface AuthContextType {
  session: Session | null;
  user: UserWithProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

// Create the context with a default undefined value to prevent usage outside the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true); // Start loading until initial check is done

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component
    
    // Safety timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("Auth loading timed out, forcing loading to false");
        setLoading(false);
      }
    }, 5000); // 5 second fallback timeout

    // 1. Get initial session
    async function getInitialSession() {
      try {
        console.log("Getting initial session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting initial session:", error);
          if (isMounted) setLoading(false);
          return;
        }
        
        if (isMounted) {
          // Store session if we have one
          setSession(session);
          
          if (session?.user) {
            console.log("User found in session:", session.user.id);
            // Just use the auth user directly for now
            setUser(session.user as UserWithProfile);
          } else {
            setUser(null);
          }
          
          // Always set loading to false
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
        if (isMounted) setLoading(false);
      }
    }

    getInitialSession();

    // 2. Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          console.log(`Supabase auth event: ${event}`);
          
          // Update session state
          setSession(session);
          
          if (session?.user) {
            // Just use the auth user directly for now
            setUser(session.user as UserWithProfile);
          } else {
            setUser(null);
          }
          
          // Mark auth loading as complete
          setLoading(false);
        }
      }
    );

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [loading]);

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
    }
    // State will be updated by onAuthStateChange listener
  };

  // Function to fetch user with profile data
  const fetchUserWithProfile = async (userId: string, currentAuthUser: User) => {
    try {
      if (!currentAuthUser) return null;
      
      // Get profile data - keep this simple
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', userId)
        .single();
      
      // Combine auth user with profile data, even if profile is null
      return {
        ...currentAuthUser,
        ...(profileData || {})
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return currentAuthUser as UserWithProfile;
    }
  };

  // Function to refresh user profile data
  const refreshUserProfile = async () => {
    try {
      if (!session?.user?.id) return;
      
      const updatedUser = await fetchUserWithProfile(session.user.id, session.user);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };

  // Value provided by the context
  const value = {
    session,
    user,
    loading,
    signOut,
    refreshUserProfile
  };

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