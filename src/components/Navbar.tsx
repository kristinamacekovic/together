import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, LogOut, User } from 'lucide-react';

interface NavbarProps {
  onGetStartedClick: () => void;
}

export default function Navbar({ onGetStartedClick }: NavbarProps) {
  const { user, signOut, profile, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="bg-background-primary/80 backdrop-blur-md border-b border-surface-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo - only show when scrolled, aligned with hero */}
          <div className="flex-shrink-0">
            <div className={`transition-all duration-300 ${
              showLogo ? 'opacity-100' : 'opacity-0'
            }`}>
              <a href="#hero" className="text-2xl font-bold text-text-primary cursor-pointer">
                together
              </a>
            </div>
          </div>

          {/* Desktop Navigation & Auth - positioned on the right */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/#how-it-works" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
              How It Works
            </a>
            <a href="/#features" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
              Features
            </a>
            <a href="/#who-its-for" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
              Who It's For
            </a>
            <a href="/#pricing" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
              Pricing
            </a>
            <a href="/#faq" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium">
              FAQ
            </a>

            {loading ? (
              <div className="w-8 h-8 border-2 border-experimental-electric border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="flex items-center space-x-2 bg-experimental-faded-blue text-white font-medium py-2 px-4 rounded-lg hover:bg-experimental-blue-hover transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{profile?.full_name || user.email || 'User'}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-surface-border/30 rounded-lg shadow-elegant-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-text-primary hover:bg-surface-hover transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-text-secondary hover:bg-surface-hover hover:text-experimental-pink transition-colors flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onGetStartedClick}
                className="group flex items-center bg-experimental-faded-blue text-experimental-electric font-bold py-2 px-4 rounded-lg hover:bg-experimental-blue-hover transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
                Focus
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-tertiary hover:text-white hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-6 border-t border-surface-border/30">
          <div className="flex flex-col space-y-4 px-6">
            <a href="/#how-it-works" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
              How It Works
            </a>
            <a href="/#features" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
              Features
            </a>
            <a href="/#who-its-for" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
              Who It's For
            </a>
            <a href="/#pricing" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
              Pricing
            </a>
            <a href="/#faq" className="text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2">
              FAQ
            </a>
            
            {loading ? (
              <div className="pt-4 border-t border-surface-border/30 flex justify-center">
                <div className="w-6 h-6 border-2 border-experimental-electric border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              <div className="pt-4 border-t border-surface-border/30">
                <div className="text-text-primary font-medium mb-2 px-2">
                  {profile?.full_name || user.email || 'User'}
                </div>
                <Link to="/dashboard" className="w-full flex justify-center items-center bg-experimental-faded-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-experimental-blue-hover transition-colors">
                  Go to Dashboard
                </Link>
                <button onClick={handleSignOut} className="w-full mt-2 text-text-tertiary hover:text-experimental-pink transition-colors font-medium py-2 flex items-center justify-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-surface-border/30">
                <button
                  onClick={onGetStartedClick}
                  className="group w-full flex justify-center items-center bg-experimental-faded-blue text-experimental-electric font-bold py-3 px-4 rounded-lg hover:bg-experimental-blue-hover transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
                  Focus
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}