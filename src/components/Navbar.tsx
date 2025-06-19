import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const { user, profile, signOut } = useAuth();

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
    if (isSigningOut) {
      console.log('⏳ Sign out already in progress, ignoring click');
      return;
    }
    
    try {
      console.log('🚪 Starting sign out from navbar...');
      setIsSigningOut(true);
      
      // Close menus immediately for instant feedback
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      
      // Perform sign out
      await signOut();
      
      // Navigate to home page
      navigate('/');
      
      console.log('✅ Navbar sign out completed successfully');
      
    } catch (error) {
      console.error('❌ Error during navbar sign out:', error);
      
      // Even if there's an error, navigate to home and reset state
      navigate('/');
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      
    } finally {
      // Reset signing out state
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
      <nav className="bg-gruvbox-dark/95 backdrop-blur-sm shadow-lg border-b border-gruvbox-gray-244/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 gruvbox-accent-gradient rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-gruvbox-dark" />
              </div>
              <span className="text-2xl font-bold gradient-text">Together</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                How It Works
              </a>
              <a href="#benefits" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                Benefits
              </a>
              
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => !isSigningOut && setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-2 text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors ${
                      isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSigningOut}
                  >
                    <div className="w-8 h-8 bg-gruvbox-orange rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gruvbox-dark" />
                    </div>
                    <span className="font-medium">
                      {isSigningOut ? 'Signing out...' : (profile?.full_name || 'User')}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && !isSigningOut && (
                    <div className="absolute right-0 mt-2 w-48 bg-gruvbox-dark-soft border border-gruvbox-gray-244/20 rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gruvbox-gray-244/20">
                        <p className="text-sm text-gruvbox-fg2 truncate">{profile?.email}</p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="w-full text-left px-4 py-2 text-gruvbox-fg2 hover:bg-gruvbox-dark hover:text-gruvbox-orange transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full text-left px-4 py-2 text-gruvbox-fg2 hover:bg-gruvbox-dark hover:text-gruvbox-orange transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="btn btn-primary"
                  >
                    Start Studying Free
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors"
                disabled={isSigningOut}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gruvbox-gray-244/20">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                  How It Works
                </a>
                <a href="#benefits" className="text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors font-medium">
                  Benefits
                </a>
                
                {user ? (
                  <div className="pt-4 border-t border-gruvbox-gray-244/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gruvbox-orange rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gruvbox-dark" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gruvbox-fg1 truncate">
                          {isSigningOut ? 'Signing out...' : (profile?.full_name || 'User')}
                        </p>
                        <p className="text-sm text-gruvbox-fg3 truncate">{profile?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={handleDashboardClick}
                        className="btn btn-secondary w-full"
                        disabled={isSigningOut}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </button>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="btn btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {isSigningOut ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gruvbox-gray-244/20 space-y-3">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="btn btn-secondary w-full"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="btn btn-primary w-full"
                    >
                      Start Studying Free
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