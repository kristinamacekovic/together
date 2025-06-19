/*
  # Initial Schema Setup for Together AI Study Buddy

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text, optional)
      - `target_sessions` (integer)
      - `completed_sessions` (integer, default 0)
      - `status` (text, enum: active, completed, paused)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `initial_forms`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `learning_objectives` (text)
      - `study_subjects` (text array)
      - `preferred_session_length` (integer, minutes)
      - `study_experience` (text)
      - `challenges` (text array)
      - `motivation_factors` (text array)
      - `created_at` (timestamp)
    
    - `sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `goal_id` (uuid, references goals, optional)
      - `title` (text)
      - `planned_duration` (integer, minutes)
      - `actual_duration` (integer, minutes, optional)
      - `status` (text, enum: planned, in_progress, completed, cancelled)
      - `started_at` (timestamp, optional)
      - `completed_at` (timestamp, optional)
      - `created_at` (timestamp)
    
    - `session_responses`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references sessions)
      - `user_id` (uuid, references profiles)
      - `desired_outcomes` (text)
      - `focus_areas` (text array)
      - `energy_level` (integer, 1-10)
      - `confidence_level` (integer, 1-10)
      - `notes` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for reading/writing user-specific records
*/

-- Create custom types
CREATE TYPE goal_status AS ENUM ('active', 'completed', 'paused');
CREATE TYPE session_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  target_sessions integer NOT NULL DEFAULT 1,
  completed_sessions integer DEFAULT 0,
  status goal_status DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create initial_forms table
CREATE TABLE IF NOT EXISTS initial_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  learning_objectives text NOT NULL,
  study_subjects text[] DEFAULT '{}',
  preferred_session_length integer DEFAULT 25,
  study_experience text,
  challenges text[] DEFAULT '{}',
  motivation_factors text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  goal_id uuid REFERENCES goals(id) ON DELETE SET NULL,
  title text NOT NULL,
  planned_duration integer NOT NULL DEFAULT 25,
  actual_duration integer,
  status session_status DEFAULT 'planned',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create session_responses table
CREATE TABLE IF NOT EXISTS session_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  desired_outcomes text NOT NULL,
  focus_areas text[] DEFAULT '{}',
  energy_level integer CHECK (energy_level >= 1 AND energy_level <= 10),
  confidence_level integer CHECK (confidence_level >= 1 AND confidence_level <= 10),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE initial_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for goals
CREATE POLICY "Users can read own goals"
  ON goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own goals"
  ON goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON goals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for initial_forms
CREATE POLICY "Users can read own initial forms"
  ON initial_forms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own initial forms"
  ON initial_forms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own initial forms"
  ON initial_forms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for sessions
CREATE POLICY "Users can read own sessions"
  ON sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions"
  ON sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for session_responses
CREATE POLICY "Users can read own session responses"
  ON session_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own session responses"
  ON session_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own session responses"
  ON session_responses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_goals_updated_at'
  ) THEN
    CREATE TRIGGER update_goals_updated_at
      BEFORE UPDATE ON goals
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;