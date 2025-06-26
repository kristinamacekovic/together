import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Toast {
  type: 'success' | 'error';
  message: string;
  show: boolean;
}

const EmailVerificationHandler: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useState<Toast>({ type: 'success', message: '', show: false });
  const navigate = useNavigate();
  const { user, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    const handleEmailVerification = async () => {
      // Check if this is an email verification callback
      const type = searchParams.get('type');
      const tokenHash = searchParams.get('token_hash');
      const next = searchParams.get('next');
      
      if (type === 'email_change' || type === 'signup' || type === 'recovery') {
        if (tokenHash) {
          try {
            // Exchange the token for a session
            const { data, error } = await supabase.auth.verifyOtp({
              token_hash: tokenHash,
              type: type as any
            });

            if (error) {
              throw error;
            }

            // Clear URL parameters
            setSearchParams({});

            // Show success message
            if (type === 'signup') {
              setToast({
                type: 'success',
                message: 'Email verified successfully! Welcome to Together.',
                show: true
              });

              // Wait a moment to show the success message, then redirect
              setTimeout(async () => {
                try {
                  const completed = await hasCompletedOnboarding();
                  if (completed) {
                    navigate('/dashboard');
                  } else {
                    navigate('/onboarding');
                  }
                } catch {
                  // Default to onboarding if there's any error
                  navigate('/onboarding');
                }
              }, 2000);
            } else if (type === 'email_change') {
              setToast({
                type: 'success',
                message: 'Email updated successfully!',
                show: true
              });
            } else if (type === 'recovery') {
              setToast({
                type: 'success',
                message: 'Password reset successful!',
                show: true
              });
            }

          } catch (error: any) {
            console.error('Email verification error:', error);
            
            // Clear URL parameters
            setSearchParams({});
            
            // Show error message
            setToast({
              type: 'error',
              message: error.message || 'Email verification failed. Please try again or contact support.',
              show: true
            });
          }
        } else {
          // Invalid verification link
          setSearchParams({});
          setToast({
            type: 'error',
            message: 'Invalid verification link. Please try again or contact support.',
            show: true
          });
        }
      }

      // Handle error cases from URL
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      
      if (error) {
        setSearchParams({});
        setToast({
          type: 'error',
          message: errorDescription || 'Verification failed. Please try again.',
          show: true
        });
      }
    };

    handleEmailVerification();
  }, [searchParams, setSearchParams, navigate, hasCompletedOnboarding]);

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  if (!toast.show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className={`
        flex items-center gap-3 p-4 rounded-lg shadow-elegant-xl max-w-md
        ${toast.type === 'success' 
          ? 'bg-green-50 border border-green-200 text-green-800' 
          : 'bg-red-50 border border-red-200 text-red-800'
        }
      `}>
        {toast.type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        )}
        
        <p className="text-sm font-medium flex-1">
          {toast.message}
        </p>
        
        <button
          onClick={closeToast}
          className={`
            p-1 rounded-full transition-colors
            ${toast.type === 'success' 
              ? 'hover:bg-green-100 text-green-600' 
              : 'hover:bg-red-100 text-red-600'
            }
          `}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationHandler; 