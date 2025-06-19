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