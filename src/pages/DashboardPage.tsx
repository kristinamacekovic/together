import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, InitialForm, Goal } from '../lib/supabase';
import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Edit3, 
  Save, 
  X, 
  User,
  BookOpen,
  Zap,
  Heart,
  Settings,
  CheckCircle
} from 'lucide-react';

interface EditableField {
  field: keyof InitialForm;
  isEditing: boolean;
}

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [initialForm, setInitialForm] = useState<InitialForm | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const [saving, setSaving] = useState(false);

  // Form options (same as onboarding)
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

  const sessionLengths = [
    { value: 15, label: '15 minutes' },
    { value: 25, label: '25 minutes (Pomodoro)' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' }
  ];

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch initial form data
      const { data: formData, error: formError } = await supabase
        .from('initial_forms')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (formError && formError.code !== 'PGRST116') {
        console.error('Error fetching form data:', formError);
      } else if (formData) {
        setInitialForm(formData);
      }

      // Fetch goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (goalsError) {
        console.error('Error fetching goals:', goalsError);
      } else {
        setGoals(goalsData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (field: keyof InitialForm) => {
    if (!initialForm) return;
    
    setEditableField({ field, isEditing: true });
    setEditValue(initialForm[field]);
  };

  const cancelEditing = () => {
    setEditableField(null);
    setEditValue('');
  };

  const saveField = async () => {
    if (!editableField || !initialForm || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('initial_forms')
        .update({ [editableField.field]: editValue })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setInitialForm(prev => prev ? { ...prev, [editableField.field]: editValue } : null);
      setEditableField(null);
      setEditValue('');
    } catch (error) {
      console.error('Error updating field:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleArrayToggle = (value: string) => {
    const currentArray = editValue as string[];
    if (currentArray.includes(value)) {
      setEditValue(currentArray.filter(item => item !== value));
    } else {
      setEditValue([...currentArray, value]);
    }
  };

  const formatExperienceLabel = (value: string) => {
    const exp = studyExperiences.find(e => e.value === value);
    return exp ? exp.label : value;
  };

  const formatSessionLength = (minutes: number) => {
    const length = sessionLengths.find(l => l.value === minutes);
    return length ? length.label : `${minutes} minutes`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gruvbox-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gruvbox-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gruvbox-fg2">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gruvbox-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gruvbox-orange rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gruvbox-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gruvbox-fg0">
                Welcome back, {profile?.full_name || 'Student'}!
              </h1>
              <p className="text-gruvbox-fg2">
                Ready to continue your learning journey?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-orange/20 border border-gruvbox-orange/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-gruvbox-orange" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Active Goals</h3>
            <p className="text-2xl font-bold text-gruvbox-orange">{goals.filter(g => g.status === 'active').length}</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-green/20 border border-gruvbox-green/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-gruvbox-green" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Sessions Today</h3>
            <p className="text-2xl font-bold text-gruvbox-green">0</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-purple/20 border border-gruvbox-purple/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-gruvbox-purple" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">This Week</h3>
            <p className="text-2xl font-bold text-gruvbox-purple">0</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-blue/20 border border-gruvbox-blue/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-gruvbox-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Total Hours</h3>
            <p className="text-2xl font-bold text-gruvbox-blue">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Start Session */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-6">Start Your Study Session</h2>
              <div className="bg-gruvbox-dark border border-gruvbox-gray-244/20 rounded-lg p-6 text-center">
                <Brain className="w-16 h-16 text-gruvbox-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gruvbox-fg0 mb-2">Ready to Focus?</h3>
                <p className="text-gruvbox-fg3 mb-6">
                  Your AI study buddy is ready to help you stay focused and productive.
                </p>
                <button className="btn btn-primary">
                  Start New Session
                </button>
              </div>
            </div>

            {/* Learning Profile */}
            {initialForm && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gruvbox-fg0 flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-gruvbox-orange" />
                    Your Learning Profile
                  </h2>
                  <p className="text-sm text-gruvbox-fg4">Click any field to edit</p>
                </div>

                <div className="space-y-6">
                  {/* Learning Objectives */}
                  <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-gruvbox-orange" />
                        Learning Objectives
                      </h3>
                      {editableField?.field !== 'learning_objectives' && (
                        <button
                          onClick={() => startEditing('learning_objectives')}
                          className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {editableField?.field === 'learning_objectives' ? (
                      <div className="space-y-3">
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full h-32 px-4 py-3 bg-gruvbox-dark border border-gruvbox-gray-244/30 rounded-lg text-gruvbox-fg1 placeholder-gruvbox-fg4 focus:outline-none focus:ring-2 focus:ring-gruvbox-orange focus:border-transparent resize-none"
                          placeholder="Describe your learning objectives..."
                        />
                        <div className="flex space-x-3">
                          <button
                            onClick={saveField}
                            disabled={saving}
                            className="btn btn-primary text-sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-secondary text-sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gruvbox-fg2 leading-relaxed">
                        {initialForm.learning_objectives}
                      </p>
                    )}
                  </div>

                  {/* Study Subjects */}
                  <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-gruvbox-green" />
                        Study Subjects
                      </h3>
                      {editableField?.field !== 'study_subjects' && (
                        <button
                          onClick={() => startEditing('study_subjects')}
                          className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {editableField?.field === 'study_subjects' ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {studySubjects.map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => handleArrayToggle(subject)}
                              className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                                (editValue as string[]).includes(subject)
                                  ? 'bg-gruvbox-green/20 border-gruvbox-green text-gruvbox-green'
                                  : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-green/50'
                              }`}
                            >
                              {subject}
                            </button>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={saveField}
                            disabled={saving}
                            className="btn btn-primary text-sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-secondary text-sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {initialForm.study_subjects?.map((subject) => (
                          <span
                            key={subject}
                            className="bg-gruvbox-green/20 border border-gruvbox-green/30 text-gruvbox-green px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Study Experience & Session Length */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-gruvbox-purple" />
                          Experience Level
                        </h3>
                        {editableField?.field !== 'study_experience' && (
                          <button
                            onClick={() => startEditing('study_experience')}
                            className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {editableField?.field === 'study_experience' ? (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {studyExperiences.map((exp) => (
                              <button
                                key={exp.value}
                                type="button"
                                onClick={() => setEditValue(exp.value)}
                                className={`w-full p-3 rounded-lg border text-left transition-all ${
                                  editValue === exp.value
                                    ? 'bg-gruvbox-purple/20 border-gruvbox-purple text-gruvbox-purple'
                                    : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-purple/50'
                                }`}
                              >
                                <div className="font-medium text-sm">{exp.label}</div>
                              </button>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={saveField}
                              disabled={saving}
                              className="btn btn-primary text-sm"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="btn btn-secondary text-sm"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gruvbox-fg2">
                          {formatExperienceLabel(initialForm.study_experience || '')}
                        </p>
                      )}
                    </div>

                    <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-gruvbox-blue" />
                          Session Length
                        </h3>
                        {editableField?.field !== 'preferred_session_length' && (
                          <button
                            onClick={() => startEditing('preferred_session_length')}
                            className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {editableField?.field === 'preferred_session_length' ? (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {sessionLengths.map((length) => (
                              <button
                                key={length.value}
                                type="button"
                                onClick={() => setEditValue(length.value)}
                                className={`w-full p-3 rounded-lg border text-center transition-all ${
                                  editValue === length.value
                                    ? 'bg-gruvbox-blue/20 border-gruvbox-blue text-gruvbox-blue'
                                    : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-blue/50'
                                }`}
                              >
                                {length.label}
                              </button>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={saveField}
                              disabled={saving}
                              className="btn btn-primary text-sm"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="btn btn-secondary text-sm"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gruvbox-fg2">
                          {formatSessionLength(initialForm.preferred_session_length || 25)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-gruvbox-red-bright" />
                        Study Challenges
                      </h3>
                      {editableField?.field !== 'challenges' && (
                        <button
                          onClick={() => startEditing('challenges')}
                          className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {editableField?.field === 'challenges' ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {commonChallenges.map((challenge) => (
                            <button
                              key={challenge}
                              type="button"
                              onClick={() => handleArrayToggle(challenge)}
                              className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                                (editValue as string[]).includes(challenge)
                                  ? 'bg-gruvbox-red/20 border-gruvbox-red text-gruvbox-red-bright'
                                  : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-red/50'
                              }`}
                            >
                              {challenge}
                            </button>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={saveField}
                            disabled={saving}
                            className="btn btn-primary text-sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-secondary text-sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {initialForm.challenges?.map((challenge) => (
                          <span
                            key={challenge}
                            className="bg-gruvbox-red/20 border border-gruvbox-red/30 text-gruvbox-red-bright px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {challenge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Motivation Factors */}
                  <div className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gruvbox-fg0 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-gruvbox-yellow" />
                        What Motivates You
                      </h3>
                      {editableField?.field !== 'motivation_factors' && (
                        <button
                          onClick={() => startEditing('motivation_factors')}
                          className="text-gruvbox-fg4 hover:text-gruvbox-orange transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {editableField?.field === 'motivation_factors' ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {motivationFactors.map((factor) => (
                            <button
                              key={factor}
                              type="button"
                              onClick={() => handleArrayToggle(factor)}
                              className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                                (editValue as string[]).includes(factor)
                                  ? 'bg-gruvbox-yellow/20 border-gruvbox-yellow text-gruvbox-yellow'
                                  : 'bg-gruvbox-dark border-gruvbox-gray-244/30 text-gruvbox-fg3 hover:border-gruvbox-yellow/50'
                              }`}
                            >
                              {factor}
                            </button>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={saveField}
                            disabled={saving}
                            className="btn btn-primary text-sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-secondary text-sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {initialForm.motivation_factors?.map((factor) => (
                          <span
                            key={factor}
                            className="bg-gruvbox-yellow/20 border border-gruvbox-yellow/30 text-gruvbox-yellow px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals */}
            <div className="card">
              <h2 className="text-xl font-bold text-gruvbox-fg0 mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-gruvbox-orange" />
                Your Goals
              </h2>
              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="border border-gruvbox-gray-244/20 rounded-lg p-4">
                      <h3 className="font-semibold text-gruvbox-fg0 mb-2">{goal.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gruvbox-fg3">
                          {goal.completed_sessions || 0} / {goal.target_sessions} sessions
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.status === 'active' 
                            ? 'bg-gruvbox-green/20 text-gruvbox-green' 
                            : goal.status === 'completed'
                            ? 'bg-gruvbox-blue/20 text-gruvbox-blue'
                            : 'bg-gruvbox-gray-244/20 text-gruvbox-gray-244'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                      <div className="w-full bg-gruvbox-dark-soft rounded-full h-2 mt-3">
                        <div 
                          className="bg-gruvbox-orange h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min(((goal.completed_sessions || 0) / goal.target_sessions) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gruvbox-gray-244 mx-auto mb-4" />
                  <p className="text-gruvbox-fg3">No goals yet</p>
                  <p className="text-sm text-gruvbox-fg4 mt-2">
                    Complete onboarding to create your first goal
                  </p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-bold text-gruvbox-fg0 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gruvbox-blue" />
                Recent Activity
              </h2>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gruvbox-gray-244 mx-auto mb-4" />
                <p className="text-gruvbox-fg3">No sessions yet</p>
                <p className="text-sm text-gruvbox-fg4 mt-2">
                  Start your first study session to see your progress here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;