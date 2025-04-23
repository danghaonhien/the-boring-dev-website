import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed

// Define the shape of the context state
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create the context with a default undefined value to prevent usage outside the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start loading until initial check is done

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component

    // 1. Get initial session
    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getInitialSession();

    // 2. Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          console.log(`Supabase auth event: ${event}`);
          setSession(session);
          setUser(session?.user ?? null);
          // We can set loading to false here too, as we now know the auth state
          setLoading(false);
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
  }, []);

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
    }
    // State will be updated by onAuthStateChange listener
  };

  // Value provided by the context
  const value = {
    session,
    user,
    loading,
    signOut
  };

  // Don't render children until the initial loading is complete
  // Or show a loading indicator
  // if (loading) {
  //   return <div>Loading Authentication...</div>; // Optional global loading indicator
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