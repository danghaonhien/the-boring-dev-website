import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';

interface ProfileData {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export type UserWithProfile = User & Partial<ProfileData>;

interface AuthContextType {
  session: Session | null;
  user: UserWithProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialSessionChecked, setInitialSessionChecked] = useState(false);

  const fetchAndSetUserWithProfile = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    let combinedUser: UserWithProfile = { ...authUser };
    
    try {
      // First check if the user record exists in the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', authUser.id)
        .single();
      
      // If user doesn't exist in users table, create it
      if (userError && userError.code === 'PGRST116') {
        const { error: insertUserError } = await supabase
          .from('users')
          .insert({ 
            id: authUser.id,
            email: authUser.email
          });
        
        if (insertUserError) {
          console.error("Failed to create user record");
        }
      }
      
      // Now try to fetch profile data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', authUser.id)
        .single();

      if (profileData) {
        combinedUser = { ...combinedUser, ...profileData };
      } else if (error) {
        // Creating a profile entry if it doesn't exist
        if (error.code === 'PGRST116') { // Code for "no rows returned"
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ 
              id: authUser.id,
              updated_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error("Failed to create profile");
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch profile");
    } finally {
      setUser(combinedUser);
      setLoading(false); // Make sure loading is set to false even on error
    }
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        await fetchAndSetUserWithProfile(newSession?.user ?? null);
        setLoading(false);
        setInitialSessionChecked(true);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await fetchAndSetUserWithProfile(session?.user ?? null);
      setLoading(false);
      setInitialSessionChecked(true);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [fetchAndSetUserWithProfile]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign out error");
  };

  const refreshUserProfile = useCallback(async () => {
    await fetchAndSetUserWithProfile(session?.user ?? null);
  }, [session, fetchAndSetUserWithProfile]);

  const value = {
    session,
    user,
    loading: !initialSessionChecked || loading,
    signOut,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
