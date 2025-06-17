import React from 'react';
import { Brain, Twitter, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gruvbox-dark border-t border-gruvbox-gray-244/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gruvbox-accent-gradient rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-gruvbox-dark" />
              </div>
              <span className="text-2xl font-bold gradient-text">Together</span>
            </div>
            <p className="text-gruvbox-fg3 mb-6 max-w-md leading-relaxed">
              Your AI-powered study companion that helps you stay focused, motivated, and productive during your study sessions. Available 24/7 to support your learning journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gruvbox-gray-244 hover:text-gruvbox-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gruvbox-gray-244 hover:text-gruvbox-orange transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gruvbox-gray-244 hover:text-gruvbox-orange transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gruvbox-fg1 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">Benefits</a></li>
              <li><a href="#" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gruvbox-fg1 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">About</a></li>
              <li><a href="#" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">Blog</a></li>
              <li><a href="#" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">Contact</a></li>
              <li><a href="#" className="text-gruvbox-fg3 hover:text-gruvbox-orange transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gruvbox-gray-244/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gruvbox-gray-244 text-sm">
              © 2024 Together. All rights reserved.
            </p>
            <p className="text-gruvbox-gray-244 text-sm flex items-center mt-2 md:mt-0">
              Made with <Heart className="h-4 w-4 text-gruvbox-red-bright mx-1" /> for students worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;