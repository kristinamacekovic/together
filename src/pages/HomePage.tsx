import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';

export function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="experimental-gradient-bg">
      {/* Full viewport hero section */}
      <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Brand - smaller and positioned elegantly */}
          <div className="mb-12 lg:mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">together</h1>
          </div>
          
          {/* Main headline - controlled line breaks */}
          <div className="mb-8 lg:mb-12">
            <h2 className="font-black text-experimental-pink uppercase tracking-tight leading-[0.85]">
              <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-2 lg:mb-4">
                AI ACCOUNTABILITY
              </div>
              <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                PARTNER
              </div>
            </h2>
          </div>
          
          {/* Description text - better sizing and spacing */}
          <div className="mb-8 lg:mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-text-primary leading-relaxed max-w-4xl">
              Stay focused with AI-powered accountability coaching. Perfect for ADHD, remote work, and studying.
            </p>
          </div>
          
          {/* CTA - proportional sizing */}
          <div className="mb-8">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="group flex items-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-experimental-electric hover:text-experimental-electric-hover transition-all duration-300 hover-glow"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 mr-4 lg:mr-6 group-hover:translate-x-2 lg:group-hover:translate-x-4 transition-transform duration-300" />
              START FREE TODAY.
            </button>
          </div>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}