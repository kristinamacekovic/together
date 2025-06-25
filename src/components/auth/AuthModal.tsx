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

  // Watch for successful authentication on sign-in
  useEffect(() => {
    // Only handle successful sign-ins here. Sign-ups are handled separately.
    if (user && isOpen && mode === 'signin') {
      handleSuccessfulSignIn();
    }
  }, [user, isOpen, mode]);

  // Reset loading state when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError('');
      setSignupSuccess(false);
    }
  }, [isOpen]);

  const handleSuccessfulSignIn = async () => {
    console.log('Handling successful sign-in...');
    try {
      const completed = await hasCompletedOnboarding();
      console.log('Onboarding completed status:', completed);
      if (completed) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      console.error('Error checking onboarding status:', err);
      // Fallback to onboarding on any error during the check
      navigate('/onboarding');
    } finally {
      // Close the modal AFTER navigation has been triggered
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log(`Starting ${mode} process...`);
      
      let result;
      if (mode === 'signup') {
        result = await signUp(email, password, fullName);
      } else {
        result = await signIn(email, password);
      }

      console.log(`${mode} result:`, result);

      if (result.error) {
        console.error(`${mode} error:`, result.error);
        setError(result.error.message || `Failed to ${mode === 'signin' ? 'sign in' : 'sign up'}`);
        setLoading(false);
      } else {
        setSignupSuccess(true);
      }
      
    } catch (err: any) {
      console.error(`Unexpected ${mode} error:`, err);
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
    setSignupSuccess(false);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background-primary/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface-elevated border border-surface-border/30 rounded-2xl shadow-elegant-xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border/30">
          <h2 className="text-2xl font-bold text-text-primary">
            {signupSuccess ? 'Check Your Email' : mode === 'signin' ? 'Welcome Back' : 'Join Together'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-experimental-pink transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {signupSuccess ? (
          <div className="p-6 space-y-4">
            <div className="bg-success-50 border border-success-500/30 text-success-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Success!</h3>
              <p className="text-sm">We've sent a confirmation link to <strong>{email}</strong>.</p>
              <p className="text-sm mt-2">Please click the link in the email to complete your registration and sign in.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-surface-hover hover:bg-surface-active text-text-primary font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-error-50 border border-error-500/30 text-error-700 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background-primary border border-surface-border/50 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-experimental-pink focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-primary border border-surface-border/50 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-experimental-pink focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-background-primary border border-surface-border/50 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-experimental-pink focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center text-2xl font-bold text-experimental-electric hover:text-experimental-electric-hover transition-all duration-300 hover-glow disabled:opacity-50 disabled:cursor-not-allowed py-4"
              >
                {loading ? (
                  'Please wait...'
                ) : (
                  <>
                    <ArrowRight className="w-6 h-6 mr-3 group-hover:translate-x-2 transition-transform duration-300" />
                    {mode === 'signin' ? 'SIGN IN.' : 'CREATE ACCOUNT.'}
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-surface-border/30 text-center">
              <p className="text-text-tertiary">
                {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={switchMode}
                  className="group ml-2 text-experimental-pink hover:text-experimental-pink-hover font-medium transition-all duration-300 inline-flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                  {mode === 'signin' ? 'SIGN UP' : 'SIGN IN'}
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