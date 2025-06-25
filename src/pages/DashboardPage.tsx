import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, InitialForm, Goal, Session } from '../lib/supabase';
import { 
  Edit3, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditableField {
  field: keyof InitialForm;
  isEditing: boolean;
}

// Move constants outside the component
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

const defaultFormData: Partial<InitialForm> = {
  learning_objectives: '',
  study_subjects: [],
  preferred_session_length: 25,
  study_experience: '',
  challenges: [],
  motivation_factors: []
};

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const userId = user?.id;
  const [initialForm, setInitialForm] = useState<InitialForm | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string>('');
  const [editableField, setEditableField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const [saving, setSaving] = useState(false);
  const [hasOnboardingData, setHasOnboardingData] = useState(false);
  const mountedRef = useRef(true);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'context' | 'analytics'>('context');
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    try {
      // Fetch in parallel
      const [
        { data: formData, error: formError },
        { data: goalsData, error: goalsError },
        { data: sessionsData, error: sessionsError }
      ] = await Promise.all([
        supabase.from('initial_forms').select('*').eq('user_id', userId).single(),
        supabase.from('goals').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false })
      ]);

      if (!mountedRef.current) return;

      if (formError && formError.code !== 'PGRST116') {
        throw new Error(`Failed to load profile data: ${formError.message}`);
      } else {
        setInitialForm(formData);
        setHasOnboardingData(!!formData);
      }

      if (goalsError) {
        throw new Error(`Failed to load goals: ${goalsError.message}`);
      } else {
        setGoals(goalsData || []);
      }

      if (sessionsError) {
        throw new Error(`Failed to load sessions: ${sessionsError.message}`);
      } else {
        setSessions(sessionsData || []);
      }
    } catch (error: any) {
      if (mountedRef.current) {
        setError(error.message || 'Failed to load dashboard data.');
      }
    }
  }, [userId]);

  useEffect(() => {
    mountedRef.current = true;
    fetchUserData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchUserData]);

  const sessionStats = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const sessionsToday = sessions.filter(s => new Date(s.created_at) >= today).length;
    const sessionsThisWeek = sessions.filter(s => new Date(s.created_at) >= startOfWeek).length;
    const totalHours = sessions.reduce((acc, s) => acc + (s.actual_duration || s.planned_duration || 0), 0) / 60;

    return {
      sessionsToday,
      sessionsThisWeek,
      totalHours: totalHours.toFixed(1),
    };
  }, [sessions]);

  const createConversation = async () => {
    if (!initialForm) {
      setError('Please fill out your onboarding details first.');
      return;
    }

    setIsCreatingSession(true);
    setError('');
    setSessionUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-conversation', {
        body: initialForm,
      })

      if (error) {
        throw error;
      }

      if (data.conversation_url) {
        setSessionUrl(data.conversation_url);
      } else {
        throw new Error('Failed to get conversation URL.');
      }
    } catch (error: any) {
      setError(`Failed to create session: ${error.message}`);
    } finally {
      setIsCreatingSession(false);
    }
  };

  const retryLoading = () => {
    console.log('🔄 Retrying dashboard data fetch...');
    setError('');
    fetchUserData();
  };

  const startEditing = (field: keyof InitialForm) => {
    const currentValue = initialForm?.[field] ?? defaultFormData[field];
    setEditableField({ field, isEditing: true });
    setEditValue(currentValue);
  };

  const cancelEditing = () => {
    setEditableField(null);
    setEditValue('');
  };

  const saveField = useCallback(async () => {
    if (!editableField || !userId) return;

    setSaving(true);
    setError('');

    try {
      // Always check if a record exists for this user
      const { data: existing, error: fetchError } = await supabase
        .from('initial_forms')
        .select('*')
        .eq('user_id', userId)
        .single();

      let saveError = null;
      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('initial_forms')
          .update({ [editableField.field]: editValue })
          .eq('user_id', userId);
        saveError = error;
      } else {
        // Insert new record
        const newRecord: Partial<InitialForm> = {
          ...defaultFormData,
          user_id: userId,
          [editableField.field]: editValue,
        };
        const { error } = await supabase
          .from('initial_forms')
          .insert(newRecord as InitialForm);
        saveError = error;
      }
      if (saveError) throw saveError;

      // Always fetch the latest record after save
      const { data: latest, error: latestError } = await supabase
        .from('initial_forms')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (latestError) throw latestError;
      setInitialForm(latest);
      setHasOnboardingData(true);
      setEditableField(null);
      setEditValue('');
    } catch (error: any) {
      console.error('❌ Error saving field:', error);
      setError(`Failed to save ${editableField.field}: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }, [userId, editableField, editValue]);

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

  const getFieldValue = (field: keyof InitialForm) => {
    return initialForm?.[field] ?? defaultFormData[field];
  };

  const isFieldEmpty = (field: keyof InitialForm) => {
    const value = getFieldValue(field);
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value || value === '';
  };

  // Show error state with retry option
  if (error) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">Unable to Load Dashboard</h2>
          <p className="text-text-secondary mb-6 leading-relaxed">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={retryLoading}
              className="bg-experimental-electric hover:bg-experimental-electric-hover text-text-primary font-bold py-3 px-6 rounded-lg transition-colors w-full uppercase tracking-wide"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-surface-border hover:bg-surface-active text-text-secondary font-bold py-3 px-6 rounded-lg transition-colors w-full uppercase tracking-wide"
            >
              Refresh Page
            </button>
          </div>
          <p className="text-xs text-text-muted mt-4">
            If this problem persists, please check your internet connection.
          </p>
        </div>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* Hero-style Header */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-text-primary mb-8 leading-tight">
            Welcome back, {profile?.full_name?.split(' ')[0]?.toLowerCase() || 'username'}
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex space-x-8 mb-12">
            <button
              onClick={() => setActiveTab('context')}
              className={`text-lg font-bold uppercase tracking-wide pb-2 transition-colors ${
                activeTab === 'context'
                  ? 'text-experimental-pink border-b-2 border-experimental-pink'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              CONTEXT
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`text-lg font-bold uppercase tracking-wide pb-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'text-experimental-pink border-b-2 border-experimental-pink'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              ANALYTICS
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'context' && (
          <div className="space-y-16">
            {/* Onboarding Status */}
            {!hasOnboardingData && (
              <div className="text-text-secondary text-lg mb-8">
                Complete your profile to get personalized study sessions.
              </div>
            )}

            {/* Learning Objectives - Minimal Style */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl lg:text-3xl font-medium text-text-primary">
                  I'm focusing on
                </h3>
                {editableField?.field !== 'learning_objectives' && (
                  <button
                    onClick={() => startEditing('learning_objectives')}
                    className="text-text-muted hover:text-experimental-pink transition-colors p-2"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {editableField?.field === 'learning_objectives' ? (
                <div className="space-y-4">
                  <textarea
                    value={editValue as string}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full bg-transparent text-text-primary text-xl lg:text-2xl border-0 border-b-2 border-dotted border-text-muted focus:border-experimental-pink focus:outline-none resize-none pb-2"
                    rows={2}
                    placeholder="your learning goals..."
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={saveField}
                      disabled={saving}
                      className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium"
                    >
                      {saving ? 'SAVING...' : 'SAVE'}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-text-muted hover:text-text-secondary transition-colors font-medium"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="text-xl lg:text-2xl border-b-2 border-dotted border-text-muted pb-2 cursor-pointer hover:border-experimental-pink transition-colors"
                  onClick={() => startEditing('learning_objectives')}
                >
                  {getFieldValue('learning_objectives') ? (
                    <span className="text-experimental-pink">
                      {getFieldValue('learning_objectives')}
                    </span>
                  ) : (
                    <span className="text-text-secondary">your learning goals...</span>
                  )}
                </div>
              )}
            </div>

            {/* Study Subjects - Minimal Style */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl lg:text-3xl font-medium text-text-primary">
                  My subjects of interest are
                </h3>
                {editableField?.field !== 'study_subjects' && (
                  <button
                    onClick={() => startEditing('study_subjects')}
                    className="text-text-muted hover:text-experimental-pink transition-colors p-2"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {editableField?.field === 'study_subjects' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-4 border-b-2 border-dotted border-experimental-pink">
                    {studySubjects.map(subject => (
                      <button
                        key={subject}
                        onClick={() => handleArrayToggle(subject)}
                        className={`p-2 rounded text-sm font-medium transition-colors ${
                          (editValue as string[])?.includes(subject)
                            ? 'bg-experimental-pink text-background-primary'
                            : 'bg-transparent border border-text-muted text-text-secondary hover:border-experimental-pink'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={saveField}
                      disabled={saving}
                      className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium"
                    >
                      {saving ? 'SAVING...' : 'SAVE'}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-text-muted hover:text-text-secondary transition-colors font-medium"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-b-2 border-dotted border-text-muted pb-2 cursor-pointer hover:border-experimental-pink transition-colors"
                  onClick={() => startEditing('study_subjects')}
                >
                  {(getFieldValue('study_subjects') as string[])?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {(getFieldValue('study_subjects') as string[]).map((subject, index) => (
                        <span key={subject} className="text-xl lg:text-2xl text-experimental-pink font-medium">
                          {subject}
                          {index < (getFieldValue('study_subjects') as string[]).length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xl lg:text-2xl text-text-secondary">your subjects...</span>
                  )}
                </div>
              )}
            </div>

            {/* Additional Fields in Minimal Style */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Experience Level */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">
                    Experience level
                  </h3>
                  {editableField?.field !== 'study_experience' && (
                    <button
                      onClick={() => startEditing('study_experience')}
                      className="text-text-muted hover:text-experimental-pink transition-colors p-1"
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
                          onClick={() => setEditValue(exp.value)}
                          className={`block w-full text-left p-2 rounded transition-colors ${
                            editValue === exp.value
                              ? 'bg-experimental-pink text-background-primary'
                              : 'text-text-secondary hover:text-experimental-pink'
                          }`}
                        >
                          {exp.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={saveField}
                        disabled={saving}
                        className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium text-sm"
                      >
                        {saving ? 'SAVING...' : 'SAVE'}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-text-muted hover:text-text-secondary transition-colors font-medium text-sm"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-b border-dotted border-text-muted pb-1 cursor-pointer hover:border-experimental-pink transition-colors"
                    onClick={() => startEditing('study_experience')}
                  >
                    {getFieldValue('study_experience') ? (
                      <span className="text-experimental-pink">
                        {formatExperienceLabel(getFieldValue('study_experience') as string)}
                      </span>
                    ) : (
                      <span className="text-text-secondary">select level...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Session Length */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">
                    Preferred session length
                  </h3>
                  {editableField?.field !== 'preferred_session_length' && (
                    <button
                      onClick={() => startEditing('preferred_session_length')}
                      className="text-text-muted hover:text-experimental-pink transition-colors p-1"
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
                          onClick={() => setEditValue(length.value)}
                          className={`block w-full text-left p-2 rounded transition-colors ${
                            editValue === length.value
                              ? 'bg-experimental-pink text-background-primary'
                              : 'text-text-secondary hover:text-experimental-pink'
                          }`}
                        >
                          {length.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={saveField}
                        disabled={saving}
                        className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium text-sm"
                      >
                        {saving ? 'SAVING...' : 'SAVE'}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-text-muted hover:text-text-secondary transition-colors font-medium text-sm"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-b border-dotted border-text-muted pb-1 cursor-pointer hover:border-experimental-pink transition-colors"
                    onClick={() => startEditing('preferred_session_length')}
                  >
                    <span className="text-experimental-pink">
                      {formatSessionLength(getFieldValue('preferred_session_length') as number)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Challenges and Motivation in compact form */}
            <div className="space-y-8">
              {/* Challenges */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">
                    My main challenges
                  </h3>
                  {editableField?.field !== 'challenges' && (
                    <button
                      onClick={() => startEditing('challenges')}
                      className="text-text-muted hover:text-experimental-pink transition-colors p-1"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {editableField?.field === 'challenges' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {commonChallenges.map((challenge) => (
                        <button
                          key={challenge}
                          onClick={() => handleArrayToggle(challenge)}
                          className={`p-2 rounded text-sm transition-colors ${
                            (editValue as string[])?.includes(challenge)
                              ? 'bg-experimental-pink text-background-primary'
                              : 'border border-text-muted text-text-secondary hover:border-experimental-pink'
                          }`}
                        >
                          {challenge}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={saveField}
                        disabled={saving}
                        className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium text-sm"
                      >
                        {saving ? 'SAVING...' : 'SAVE'}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-text-muted hover:text-text-secondary transition-colors font-medium text-sm"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-b border-dotted border-text-muted pb-1 cursor-pointer hover:border-experimental-pink transition-colors"
                    onClick={() => startEditing('challenges')}
                  >
                    {(getFieldValue('challenges') as string[])?.length > 0 ? (
                      <span className="text-experimental-pink">
                        {(getFieldValue('challenges') as string[]).join(', ')}
                      </span>
                    ) : (
                      <span className="text-text-secondary">select challenges...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Motivation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">
                    What motivates me
                  </h3>
                  {editableField?.field !== 'motivation_factors' && (
                    <button
                      onClick={() => startEditing('motivation_factors')}
                      className="text-text-muted hover:text-experimental-pink transition-colors p-1"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {editableField?.field === 'motivation_factors' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {motivationFactors.map((factor) => (
                        <button
                          key={factor}
                          onClick={() => handleArrayToggle(factor)}
                          className={`p-2 rounded text-sm transition-colors ${
                            (editValue as string[])?.includes(factor)
                              ? 'bg-experimental-pink text-background-primary'
                              : 'border border-text-muted text-text-secondary hover:border-experimental-pink'
                          }`}
                        >
                          {factor}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={saveField}
                        disabled={saving}
                        className="text-experimental-electric hover:text-experimental-pink transition-colors font-medium text-sm"
                      >
                        {saving ? 'SAVING...' : 'SAVE'}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-text-muted hover:text-text-secondary transition-colors font-medium text-sm"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-b border-dotted border-text-muted pb-1 cursor-pointer hover:border-experimental-pink transition-colors"
                    onClick={() => startEditing('motivation_factors')}
                  >
                    {(getFieldValue('motivation_factors') as string[])?.length > 0 ? (
                      <span className="text-experimental-pink">
                        {(getFieldValue('motivation_factors') as string[]).join(', ')}
                      </span>
                    ) : (
                      <span className="text-text-secondary">select motivations...</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Prominent Session Launcher */}
            <div className="pt-16 border-t border-text-muted/20">
              <div className="text-center">
                {sessionUrl ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-medium text-text-primary">
                        Your session is ready
                      </h3>
                      <a
                        href={sessionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-experimental-electric hover:bg-experimental-electric-hover text-text-primary font-bold py-4 px-12 rounded-lg transition-all duration-200 hover:scale-105 text-lg"
                      >
                        JOIN SESSION →
                      </a>
                    </div>
                    <button
                      onClick={() => setSessionUrl(null)}
                      className="text-text-muted hover:text-text-secondary transition-colors"
                    >
                      Create another session
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-medium text-text-primary">
                      Ready to start?
                    </h3>
                    <button
                      onClick={createConversation}
                      disabled={isCreatingSession || !hasOnboardingData}
                      className="bg-experimental-electric hover:bg-experimental-electric-hover disabled:bg-surface-border disabled:text-text-muted text-text-primary font-bold py-4 px-12 rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100 text-lg"
                    >
                      {isCreatingSession ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-text-primary mr-3"></div>
                          CREATING...
                        </div>
                      ) : (
                        'START SESSION'
                      )}
                    </button>
                    {!hasOnboardingData && (
                      <p className="text-text-muted text-sm">
                        Complete your profile above to enable sessions
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-16">
            {/* Stats in minimal style */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-experimental-pink mb-2">
                  {goals.filter(g => g.status === 'active').length}
                </div>
                <div className="text-text-secondary">Active goals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-experimental-pink mb-2">
                  {sessionStats.sessionsToday}
                </div>
                <div className="text-text-secondary">Today</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-experimental-pink mb-2">
                  {sessionStats.sessionsThisWeek}
                </div>
                <div className="text-text-secondary">This week</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-light text-experimental-pink mb-2">
                  {sessionStats.totalHours}
                </div>
                <div className="text-text-secondary">Total hours</div>
              </div>
            </div>

            {/* Recent Sessions */}
            {sessions.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-text-primary">Recent sessions</h3>
                <div className="space-y-4">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex justify-between items-center py-3 border-b border-dotted border-text-muted">
                      <div>
                        <div className="text-text-primary">
                          {new Date(session.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-text-secondary text-sm">
                          {formatSessionLength(session.actual_duration || session.planned_duration || 0)}
                        </div>
                      </div>
                      <div className="text-text-secondary text-sm">
                        {session.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;