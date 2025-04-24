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
      console.log("AuthContext: No auth user provided");
      setUser(null);
      setLoading(false);
      return;
    }

    console.log("AuthContext: Fetching profile for user:", authUser.id);
    let combinedUser: UserWithProfile = { ...authUser };
    
    try {
      // First check if the user record exists in the users table
      console.log("AuthContext: Checking if user exists in users table");
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', authUser.id)
        .single();
      
      console.log("User data check result:", { userData, error: userError });
      
      // If user doesn't exist in users table, create it
      if (userError && userError.code === 'PGRST116') {
        console.log("AuthContext: Creating user record in users table");
        const { error: insertUserError } = await supabase
          .from('users')
          .insert({ 
            id: authUser.id,
            email: authUser.email
          });
        
        if (insertUserError) {
          console.error("Failed to create user record:", insertUserError);
        }
      }
      
      // Now try to fetch profile data
      console.log("AuthContext: Now fetching profile data");
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', authUser.id)
        .single();

      console.log("Profile data result:", { profileData, error });
 
      if (profileData) {
        console.log("Profile data fetched successfully:", profileData);
        combinedUser = { ...combinedUser, ...profileData };
      } else if (error) {
        console.error("Profile fetch error:", error.message);
        // Creating a profile entry if it doesn't exist
        if (error.code === 'PGRST116') { // Code for "no rows returned"
          console.log("No profile found, creating a new one");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ 
              id: authUser.id,
              updated_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error("Failed to create profile:", insertError.message);
          } else {
            console.log("Profile created successfully");
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    } finally {
      console.log("Setting user in context:", combinedUser);
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
    if (error) console.error("Sign out error:", error.message);
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
