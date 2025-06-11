import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Together</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-primary-600 transition-colors">
              Benefits
            </a>
            <button className="btn btn-primary">
              Start Studying
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
                How It Works
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-primary-600 transition-colors">
                Benefits
              </a>
              <button className="btn btn-primary w-full">
                Start Studying
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;