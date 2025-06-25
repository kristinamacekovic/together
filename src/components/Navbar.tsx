import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  
  const { user, profile, signOut } = useAuth();
  
  // Check if we're on dashboard page
  const isDashboardPage = location.pathname === '/dashboard';

  // Handle scroll to show/hide logo
  useEffect(() => {
    const handleScroll = () => {
      // Always show logo on dashboard, or when scrolled past hero on other pages
      setShowLogo(isDashboardPage || window.scrollY > 200);
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDashboardPage]);

  // Reset menu states when user changes
  useEffect(() => {
    console.log('👤 User state changed in navbar:', user?.email || 'No user');
    
    if (!user) {
      console.log('🔄 User signed out, resetting navbar states');
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      setIsSigningOut(false);
    }
  }, [user]);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      setIsSigningOut(false);
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <>
      <nav className="bg-background-primary/80 backdrop-blur-md border-b border-surface-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative flex items-center h-20">
            {/* Logo - only show when scrolled, aligned with hero */}
            <div className="w-full flex items-center">
              <div className={`transition-all duration-300 ${
                showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <span 
                  className="text-2xl font-bold text-text-primary cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Together
                </span>
              </div>
            </div>

            {/* Desktop Navigation - positioned on the right */}
            <div className="hidden md:flex items-center space-x-8 absolute right-6 lg:right-12">
              <a href="#features" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
                How It Works
              </a>
              <a href="#benefits" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
                Benefits
              </a>
              
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => !isSigningOut && setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-3 text-text-secondary hover:text-experimental-pink transition-colors ${
                      isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSigningOut}
                  >
                    <div className="w-8 h-8 bg-experimental-pink rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-background-primary" />
                    </div>
                    <span className="font-medium">
                      {isSigningOut ? 'Signing out...' : (profile?.full_name || 'User')}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && !isSigningOut && (
                    <div className="absolute right-0 mt-3 w-48 bg-surface-elevated border border-surface-border rounded-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-surface-border">
                        <p className="text-sm text-text-tertiary truncate">{profile?.email}</p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="w-full text-left px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-experimental-pink transition-colors flex items-center space-x-3"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full text-left px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-experimental-pink transition-colors flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-text-secondary hover:text-experimental-pink transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-experimental-electric hover:bg-experimental-electric-hover text-text-primary font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button - positioned on the right */}
            <div className="md:hidden absolute right-6">
                              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-text-secondary hover:text-experimental-purple transition-colors"
                  disabled={isSigningOut}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-surface-border/30">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
                  Features
                </a>
                <a href="#how-it-works" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
                  How It Works
                </a>
                <a href="#benefits" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
                  Benefits
                </a>
                
                {user ? (
                  <div className="pt-4 border-t border-surface-border/30">
                    <div className="flex items-center space-x-3 mb-4">
                                              <div className="w-8 h-8 bg-experimental-pink rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-background-primary" />
                        </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary truncate">
                          {isSigningOut ? 'Signing out...' : (profile?.full_name || 'User')}
                        </p>
                        <p className="text-sm text-text-tertiary truncate">{profile?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={handleDashboardClick}
                        className="w-full bg-surface-elevated hover:bg-surface-hover text-text-primary font-medium px-4 py-3 rounded-lg transition-colors flex items-center space-x-3"
                        disabled={isSigningOut}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full bg-surface-elevated hover:bg-surface-hover text-text-secondary font-medium px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-surface-border/30 space-y-3">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="w-full text-text-secondary hover:text-experimental-pink transition-colors font-medium py-2 text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="w-full bg-experimental-electric hover:bg-experimental-electric-hover text-text-primary font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;