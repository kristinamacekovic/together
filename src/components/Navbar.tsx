import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gruvbox-dark/95 backdrop-blur-sm shadow-lg border-b border-gruvbox-gray-244/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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
            <button className="btn btn-primary">
              Start Studying Free
            </button>
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
              <button className="btn btn-primary w-full">
                Start Studying Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;