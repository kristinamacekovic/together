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
    <div className="min-h-screen bg-gruvbox-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 gruvbox-accent-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-7 w-7 text-gruvbox-dark" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Welcome to Together!</h1>
          </div>
          <p className="text-xl text-gruvbox-fg2 mb-8">
            Let's personalize your AI study buddy to match your learning style and goals
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gruvbox-fg3 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gruvbox-dark-soft rounded-full h-2">
              <div 
                className="gruvbox-accent-gradient h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="card max-w-2xl mx-auto">
          {error && (
            <div className="bg-gruvbox-red/20 border border-gruvbox-red/30 text-gruvbox-red-bright p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Learning Objectives & Subjects */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <Target className="w-16 h-16 text-gruvbox-orange mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-2">Your Learning Goals</h2>
                <p className="text-gruvbox-fg3">Tell us what you want to achieve</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What are your main learning objectives? *
                </label>
                <textarea
                  value={formData.learning_objectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, learning_objectives: e.target.value }))}
                  className="w-full h-32 px-4 py-3 bg-gruvbox-dark border border-gruvbox-gray-244/30 rounded-lg text-gruvbox-fg1 placeholder-gruvbox-fg4 focus:outline-none focus:ring-2 focus:ring-gruvbox-orange focus:border-transparent resize-none"
                  placeholder="Describe what you want to achieve through your study sessions..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What subjects are you studying? * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {studySubjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleArrayToggle('study_subjects', subject)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.study_subjects.includes(subject)
                          ? 'bg-gruvbox-orange/20 border-gruvbox-orange text-gruvbox-orange'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-orange/50'
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
            <div className="space-y-8">
              <div className="text-center">
                <Clock className="w-16 h-16 text-gruvbox-green mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-2">Study Preferences</h2>
                <p className="text-gruvbox-fg3">Help us understand your study style</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  How would you describe your study experience? *
                </label>
                <div className="space-y-3">
                  {studyExperiences.map((exp) => (
                    <button
                      key={exp.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, study_experience: exp.value }))}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        formData.study_experience === exp.value
                          ? 'bg-gruvbox-green/20 border-gruvbox-green text-gruvbox-green'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-green/50'
                      }`}
                    >
                      <div className="font-medium">{exp.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What's your preferred study session length? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sessionLengths.map((length) => (
                    <button
                      key={length.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, preferred_session_length: length.value }))}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        formData.preferred_session_length === length.value
                          ? 'bg-gruvbox-blue/20 border-gruvbox-blue text-gruvbox-blue'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-blue/50'
                      }`}
                    >
                      {length.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Challenges & Motivation */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-gruvbox-purple mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-2">Challenges & Motivation</h2>
                <p className="text-gruvbox-fg3">Help us understand what drives you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What are your biggest study challenges? * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commonChallenges.map((challenge) => (
                    <button
                      key={challenge}
                      type="button"
                      onClick={() => handleArrayToggle('challenges', challenge)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.challenges.includes(challenge)
                          ? 'bg-gruvbox-red/20 border-gruvbox-red text-gruvbox-red-bright'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-red/50'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What motivates you most to study? * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {motivationFactors.map((factor) => (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => handleArrayToggle('motivation_factors', factor)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.motivation_factors.includes(factor)
                          ? 'bg-gruvbox-yellow/20 border-gruvbox-yellow text-gruvbox-yellow'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-yellow/50'
                      }`}
                    >
                      {factor}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Support */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <Lightbulb className="w-16 h-16 text-gruvbox-aqua mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-2">Goals & AI Support</h2>
                <p className="text-gruvbox-fg3">Let's set up your study routine</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  How many study sessions would you like to complete per week? *
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={formData.sessions_per_week}
                    onChange={(e) => setFormData(prev => ({ ...prev, sessions_per_week: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gruvbox-dark-soft rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="bg-gruvbox-orange/20 border border-gruvbox-orange/30 text-gruvbox-orange px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">
                    {formData.sessions_per_week} sessions
                  </div>
                </div>
                <p className="text-sm text-gruvbox-fg4 mt-2">
                  This will create a monthly goal of {formData.sessions_per_week * 4} sessions
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gruvbox-fg2 mb-3">
                  What type of support would be most helpful from your AI study buddy? * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {supportPreferences.map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handleArrayToggle('support_preferences', pref)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.support_preferences.includes(pref)
                          ? 'bg-gruvbox-aqua/20 border-gruvbox-aqua text-gruvbox-aqua'
                          : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-aqua/50'
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
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gruvbox-gray-244/20">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index + 1 <= currentStep ? 'bg-gruvbox-orange' : 'bg-gruvbox-gray-244/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Saving...'
              ) : currentStep === totalSteps ? (
                <>
                  Complete Setup
                  <CheckCircle className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Next
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