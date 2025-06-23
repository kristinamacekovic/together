import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
  const mountedRef = useRef(true);
  const signOutInProgressRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;
        
        if (error) {
          console.error('❌ Error getting initial session:', error);
          setLoading(false);
          return;
        }
        
        console.log('✅ Initial session loaded:', session?.user?.email || 'No user');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Error in initializeAuth:', error);
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mountedRef.current) return;
      
      console.log('🔄 Auth state changed:', event, session?.user?.email || 'No user');
      
      setSession(session); // Set session immediately

      if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out - clearing user/profile state');
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const profileExists = await fetchProfile(session.user.id);
        if (profileExists && mountedRef.current) {
          // Profile exists, user is valid
          setUser(session.user);
        } else if (mountedRef.current) {
          // No profile found for a valid session, treat as logged out
          console.warn('⚠️ No profile found for user, clearing session.');
          setUser(null);
          setProfile(null);
          // Optionally, sign them out completely to clear the invalid JWT
          await supabase.auth.signOut();
        }
      } else {
        // No session user
        setUser(null);
        setProfile(null);
      }
      setLoading(false); // Set loading to false after all checks
    });

    return () => {
      console.log('🧹 Cleaning up auth context');
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string): Promise<boolean> => {
    if (!mountedRef.current) return false;
    try {
      console.log('📋 [fetchProfile] Start for user:', userId);
      setLoading(true); // Set loading true at the start of the fetch
      console.log('📋 [fetchProfile] Before supabase.from().select()');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      console.log('📋 [fetchProfile] After supabase.from().select()', { data, error });

      if (!mountedRef.current) return false;

      if (error) {
        console.error('❌ Error fetching profile:', error);
        setProfile(null);
        return false; // Profile does not exist or error occurred
      } else {
        console.log('✅ Profile fetched successfully');
        setProfile(data);
        return true; // Profile exists
      }
    } catch (error) {
      console.error('❌ Error in fetchProfile:', error);
      if (mountedRef.current) {
        setProfile(null);
      }
      return false;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
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
    try {
      console.log('🔑 Starting sign in...');
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('🔑 Sign in result:', error ? 'Error' : 'Success');
      return { error };
      
    } catch (error) {
      console.error('❌ Sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    // Prevent multiple simultaneous sign out attempts
    if (signOutInProgressRef.current) {
      console.log('⏳ Sign out already in progress, skipping...');
      return;
    }

    try {
      console.log('👋 Starting sign out process...');
      signOutInProgressRef.current = true;
      const { error } = await supabase.auth.signOut();
      console.log('🔄 supabase.auth.signOut() finished', error);
      if (error) {
        console.error('❌ Supabase sign out error:', error);
        throw error;
      }

      console.log('✅ Supabase sign out successful');

      // Clear state immediately (the auth state change listener will also handle this)
      if (mountedRef.current) {
        setUser(null);
        setProfile(null);
        setSession(null);
      }

      console.log('✅ Sign out completed successfully');

    } catch (error) {
      console.error('❌ Error during sign out:', error);

      // Even if there's an error, clear the state to ensure UI consistency
      if (mountedRef.current) {
        setUser(null);
        setProfile(null);
        setSession(null);
      }

      // Re-throw the error so the UI can handle it
      throw error;
    } finally {
      signOutInProgressRef.current = false;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error && mountedRef.current) {
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