import React from 'react';
import { Brain, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Together</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your AI-powered study companion that helps you stay focused, motivated, and productive during your study sessions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Together. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;