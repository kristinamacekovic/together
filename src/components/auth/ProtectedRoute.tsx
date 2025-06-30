import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can return a loading indicator here if you prefer
    return null;
  }

  // If auth is done and there's no user, redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // If we have a user, render the requested component
  return children;
};

export default ProtectedRoute;