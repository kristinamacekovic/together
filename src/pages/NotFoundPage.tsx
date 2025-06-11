import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-6">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center"
      >
        <Home className="h-4 w-4 mr-2" />
        <span>Go Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;