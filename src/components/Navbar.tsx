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
  
  const { user, profile, signOut } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      console.log('Starting sign out process...');
      
      // Close menus immediately
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      
      // Sign out
      await signOut();
      
      console.log('Sign out completed, navigating to home...');
      // Navigate to home page
      navigate('/');
      
      console.log('Sign out process complete');
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if there's an error, try to navigate away
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      navigate('/');
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gruvbox-fg2 hover:text-gruvbox-orange transition-colors"
                  >
                    <div className="w-8 h-8 bg-gruvbox-orange rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gruvbox-dark" />
                    </div>
                    <span className="font-medium">{profile?.full_name || 'User'}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gruvbox-dark-soft border border-gruvbox-gray-244/20 rounded-lg shadow-xl py-2">
                      <div className="px-4 py-2 border-b border-gruvbox-gray-244/20">
                        <p className="text-sm text-gruvbox-fg2">{profile?.email}</p>
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
                        className="w-full text-left px-4 py-2 text-gruvbox-fg2 hover:bg-gruvbox-dark hover:text-gruvbox-orange transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
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
                      <div>
                        <p className="font-medium text-gruvbox-fg1">{profile?.full_name || 'User'}</p>
                        <p className="text-sm text-gruvbox-fg3">{profile?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={handleDashboardClick}
                        className="btn btn-secondary w-full"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="btn btn-secondary w-full"
                      >
                        Sign Out
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