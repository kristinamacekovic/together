import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface FormData {
  learning_objectives: string;
  study_subjects: string[];
  preferred_session_length: number;
  study_experience: string;
  challenges: string[];
  motivation_factors: string[];
  sessions_per_week: number;
  support_preferences: string[];
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<FormData>({
    learning_objectives: '',
    study_subjects: [],
    preferred_session_length: 25,
    study_experience: '',
    challenges: [],
    motivation_factors: [],
    sessions_per_week: 5,
    support_preferences: []
  });

  const studySubjects = [
    'Mathematics', 'Science', 'Programming', 'Languages', 'Business', 
    'Arts', 'History', 'Literature', 'Medicine', 'Engineering', 
    'Psychology', 'Philosophy', 'Music', 'Other'
  ];

  const studyExperiences = [
    { value: 'beginner', label: 'Beginner - Just starting out' },
    { value: 'intermediate', label: 'Intermediate - Some experience' },
    { value: 'advanced', label: 'Advanced - Quite experienced' },
    { value: 'expert', label: 'Expert - Very experienced' }
  ];

  const commonChallenges = [
    'Staying focused', 'Procrastination', 'Time management', 
    'Understanding material', 'Motivation', 'Distractions',
    'Consistency', 'Setting goals', 'Taking breaks'
  ];

  const motivationFactors = [
    'Career goals', 'Personal growth', 'Academic requirements', 
    'Curiosity', 'Competition', 'Achievement', 'Helping others',
    'Financial success', 'Recognition'
  ];

  const supportPreferences = [
    'Accountability reminders', 'Study technique suggestions', 
    'Progress tracking', 'Motivational messages', 'Break reminders',
    'Goal setting help', 'Focus techniques', 'Time management tips'
  ];

  const sessionLengths = [
    { value: 15, label: '15 minutes' },
    { value: 25, label: '25 minutes (Pomodoro)' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' }
  ];

  const handleArrayToggle = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Get the current user directly from Supabase to ensure we have the latest session data
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(userError?.message || 'You must be logged in to complete onboarding.');
      }

      // Save initial form data
      const { error: formError } = await supabase
        .from('initial_forms')
        .insert({
          user_id: user.id,
          learning_objectives: formData.learning_objectives,
          study_subjects: formData.study_subjects,
          preferred_session_length: formData.preferred_session_length,
          study_experience: formData.study_experience,
          challenges: formData.challenges,
          motivation_factors: formData.motivation_factors
        });

      if (formError) throw formError;

      // Create initial goal based on sessions per week
      const { error: goalError } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: `Complete ${formData.sessions_per_week} study sessions per week`,
          description: `Weekly study goal based on your preferred schedule of ${formData.sessions_per_week} sessions`,
          target_sessions: formData.sessions_per_week * 4, // Monthly target
          status: 'active'
        });

      if (goalError) throw goalError;

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save onboarding data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.learning_objectives.trim().length > 0 && formData.study_subjects.length > 0;
      case 2:
        return formData.study_experience && formData.preferred_session_length;
      case 3:
        return formData.challenges.length > 0 && formData.motivation_factors.length > 0;
      case 4:
        return formData.sessions_per_week > 0 && formData.support_preferences.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-experimental-pink rounded-lg flex items-center justify-center">
              <Brain className="h-7 w-7 text-background-primary" />
            </div>
            <h1 className="text-3xl font-bold text-experimental-pink">Welcome to Together!</h1>
          </div>
          <p className="text-xl text-text-secondary mb-8">
            Let's personalize your AI study buddy to match your learning style and goals
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-background-secondary/30 rounded-full h-2">
              <div 
                className="bg-experimental-pink h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="bg-background-secondary/30 border border-experimental-pink/30 text-experimental-pink p-4 rounded-xl mb-8 text-center">
              {error}
            </div>
          )}

          {/* Step 1: Learning Objectives & Subjects */}
          {currentStep === 1 && (
            <div className="space-y-16">
              <div className="text-center">
                <Target className="w-16 h-16 text-experimental-pink mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-text-primary mb-2">Your Learning Goals</h2>
                <p className="text-text-secondary">Tell us what you want to achieve</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  I'm focusing on
                </h3>
                <textarea
                  value={formData.learning_objectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, learning_objectives: e.target.value }))}
                  className="w-full bg-transparent text-text-primary border-0 border-b-2 border-dotted border-text-muted focus:border-experimental-pink focus:outline-none resize-none pb-2"
                  rows={3}
                  placeholder="your learning goals..."
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  My subjects of interest are
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-4 border-b-2 border-dotted border-text-muted">
                  {studySubjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleArrayToggle('study_subjects', subject)}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        formData.study_subjects.includes(subject)
                          ? 'bg-experimental-pink text-background-primary'
                          : 'bg-transparent border border-text-muted text-text-secondary hover:border-experimental-pink'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Study Preferences */}
          {currentStep === 2 && (
            <div className="space-y-16">
              <div className="text-center">
                <Clock className="w-16 h-16 text-experimental-pink mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-text-primary mb-2">Study Preferences</h2>
                <p className="text-text-secondary">Help us understand your study style</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">
                    Experience level
                  </h3>
                  <div className="space-y-2">
                    {studyExperiences.map((exp) => (
                      <button
                        key={exp.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, study_experience: exp.value }))}
                        className={`block w-full text-left p-2 rounded transition-colors ${
                          formData.study_experience === exp.value
                            ? 'bg-experimental-pink text-background-primary'
                            : 'text-text-secondary hover:text-experimental-pink'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">
                    Session length
                  </h3>
                  <div className="space-y-2">
                    {sessionLengths.map((length) => (
                      <button
                        key={length.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferred_session_length: length.value }))}
                        className={`block w-full text-left p-2 rounded transition-colors ${
                          formData.preferred_session_length === length.value
                            ? 'bg-experimental-pink text-background-primary'
                            : 'text-text-secondary hover:text-experimental-pink'
                        }`}
                      >
                        {length.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Challenges & Motivation */}
          {currentStep === 3 && (
            <div className="space-y-16">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-experimental-pink mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-text-primary mb-2">Challenges & Motivation</h2>
                <p className="text-text-secondary">Help us understand what drives you</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">
                    My challenges are
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {commonChallenges.map((challenge) => (
                      <button
                        key={challenge}
                        type="button"
                        onClick={() => handleArrayToggle('challenges', challenge)}
                        className={`p-2 rounded text-sm transition-colors ${
                          formData.challenges.includes(challenge)
                            ? 'bg-experimental-pink text-background-primary'
                            : 'border border-text-muted text-text-secondary hover:border-experimental-pink'
                        }`}
                      >
                        {challenge}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">
                    What motivates me
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {motivationFactors.map((factor) => (
                      <button
                        key={factor}
                        type="button"
                        onClick={() => handleArrayToggle('motivation_factors', factor)}
                        className={`p-2 rounded text-sm transition-colors ${
                          formData.motivation_factors.includes(factor)
                            ? 'bg-experimental-pink text-background-primary'
                            : 'border border-text-muted text-text-secondary hover:border-experimental-pink'
                        }`}
                      >
                        {factor}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Support */}
          {currentStep === 4 && (
            <div className="space-y-16">
              <div className="text-center">
                <Lightbulb className="w-16 h-16 text-experimental-pink mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-text-primary mb-2">Goals & AI Support</h2>
                <p className="text-text-secondary">Let's set up your study routine</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Sessions per week
                </h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={formData.sessions_per_week}
                    onChange={(e) => setFormData(prev => ({ ...prev, sessions_per_week: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-background-secondary/30 rounded-lg appearance-none cursor-pointer accent-experimental-pink"
                  />
                  <div className="bg-experimental-pink/20 border border-experimental-pink/30 text-experimental-pink px-4 py-2 rounded-lg font-bold min-w-[100px] text-center">
                    {formData.sessions_per_week}
                  </div>
                </div>
                <p className="text-sm text-text-muted">
                  This will create a monthly goal of {formData.sessions_per_week * 4} sessions
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  AI support preferences
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {supportPreferences.map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handleArrayToggle('support_preferences', pref)}
                      className={`p-2 rounded text-sm transition-colors ${
                        formData.support_preferences.includes(pref)
                          ? 'bg-experimental-pink text-background-primary'
                          : 'border border-text-muted text-text-secondary hover:border-experimental-pink'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-text-muted/20">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="text-text-secondary hover:text-experimental-pink disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              PREVIOUS
            </button>

            <div className="flex space-x-2">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index + 1 <= currentStep ? 'bg-experimental-pink' : 'bg-background-secondary/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="text-experimental-electric hover:text-experimental-pink disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-lg flex items-center"
            >
              {loading ? (
                'SAVING...'
              ) : currentStep === totalSteps ? (
                <>
                  COMPLETE SETUP
                  <CheckCircle className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  NEXT
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;