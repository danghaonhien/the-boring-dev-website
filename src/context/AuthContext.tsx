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
      return;
    }

    let combinedUser: UserWithProfile = { ...authUser };

    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', authUser.id)
        .single();

      if (profileData) {
        combinedUser = { ...combinedUser, ...profileData };
      } else if (error) {
        console.warn("Profile fetch error:", error.message);
      }
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    } finally {
      setUser(combinedUser);
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
