import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_sessions: number;
  completed_sessions: number;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export interface InitialForm {
  id: string;
  user_id: string;
  learning_objectives: string;
  study_subjects: string[];
  preferred_session_length: number;
  study_experience?: string;
  challenges: string[];
  motivation_factors: string[];
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  conversation_id: string;
  conversation_url?: string;
  conversation_name?: string;
  replica_id?: string;
  persona_id?: string;
  status?: string;
  requested_session_length?: number;
  actual_duration?: number; // Duration in minutes from Tavus webhook
  started_at?: string;
  ended_at?: string;
  created_at: string;
}

export interface SessionResponse {
  id: string;
  session_id: string;
  user_id: string;
  desired_outcomes: string;
  focus_areas: string[];
  energy_level: number;
  confidence_level: number;
  notes?: string;
  created_at: string;
}