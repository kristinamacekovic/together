import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gruvbox-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gruvbox-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gruvbox-fg2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen bg-gruvbox-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Authentication Required</h2>
          <p className="text-gruvbox-fg2">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;