import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { signIn, signUp, user, hasCompletedOnboarding } = useAuth();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setFullName('');
      setShowPassword(false);
      setLoading(false);
      setError('');
      setSignupSuccess(false);
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle successful sign-in navigation
  useEffect(() => {
    if (user && isOpen && mode === 'signin' && !loading) {
      const handleNavigation = async () => {
        try {
          const hasOnboarding = await hasCompletedOnboarding();
          navigate(hasOnboarding ? '/dashboard' : '/onboarding');
          onClose();
        } catch (err) {
          navigate('/onboarding');
          onClose();
        }
      };
      handleNavigation();
    }
  }, [user, isOpen, mode, loading, hasCompletedOnboarding, navigate, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          throw new Error('Full name is required');
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        setSignupSuccess(true);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        // Navigation handled by useEffect
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface-elevated rounded-2xl shadow-elegant-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border/30">
          <h2 className="text-2xl font-bold text-text-primary">
            {signupSuccess ? "Check Your Email" : mode === 'signin' ? "Welcome Back" : "Join Together"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-experimental-pink transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {signupSuccess ? (
          <div className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-experimental-faded-blue rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-experimental-electric" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Verification Required</h3>
                <p className="text-text-secondary">
                  We've sent a verification link to <span className="font-medium">{email}</span>. 
                  Please check your email and click the link to complete your registration.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-experimental-faded-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-experimental-blue-hover transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background-primary border border-surface-border rounded-lg focus:border-experimental-electric focus:ring-1 focus:ring-experimental-electric outline-none transition-colors text-text-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-primary border border-surface-border rounded-lg focus:border-experimental-electric focus:ring-1 focus:ring-experimental-electric outline-none transition-colors text-text-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-background-primary border border-surface-border rounded-lg focus:border-experimental-electric focus:ring-1 focus:ring-experimental-electric outline-none transition-colors text-text-primary"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-experimental-electric text-black font-bold py-3 px-4 rounded-lg hover:bg-experimental-electric-hover transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="px-6 pb-6 text-center">
              <p className="text-text-secondary">
                {mode === 'signin'
                  ? "Don't have an account? "
                  : "Already have an account? "
                }
                <button
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-experimental-electric hover:text-experimental-pink font-medium transition-colors"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;