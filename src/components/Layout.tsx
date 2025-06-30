import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onGetStartedClick={openAuthModal} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Layout;