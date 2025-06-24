import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  hasCompletedOnboarding: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (error) {
        console.error("Error fetching initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 Starting sign up...');
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      console.log('📝 Sign up result:', error ? 'Error' : 'Success');
      return { error };
    } catch (error) {
      console.error('❌ Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null); // Clear profile on sign out
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...updates } : null);
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const hasCompletedOnboarding = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('initial_forms')
        .select('id')
        .eq('user_id', user.id)
        .single();

      return !error && !!data;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    hasCompletedOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};