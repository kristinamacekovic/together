import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, Mail, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UsageData {
  totalMinutesUsed: number;
  limitMinutes: number;
  remainingMinutes: number;
  usagePercentage: number;
  isOverLimit: boolean;
  totalSessions: number;
  completedSessions: number;
  lastUpdated: string;
}

interface UsageTrackerProps {
  showInDashboard?: boolean; // For compact dashboard display
  onUsageStatusChange?: (isOverLimit: boolean) => void; // Callback to notify parent components
}

const UsageTracker: React.FC<UsageTrackerProps> = ({ showInDashboard = false, onUsageStatusChange }) => {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsageData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-total-usage', {
        method: 'GET'
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Usage data received:', data);
      setUsageData(data);
      
      // Auto-show modal if over limit or very close (>90%)
      if (data && (data.isOverLimit || data.usagePercentage >= 90)) {
        setShowModal(true);
      }
    } catch (err: any) {
      console.error('Usage fetch error:', err);
      setError(err.message || 'Failed to fetch usage data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData();
    
    // Refresh usage data every 5 minutes
    const interval = setInterval(fetchUsageData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Notify parent component when usage status changes
  useEffect(() => {
    if (usageData && onUsageStatusChange) {
      onUsageStatusChange(usageData.isOverLimit);
    }
  }, [usageData?.isOverLimit, onUsageStatusChange]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-500 bg-surface-elevated border-red-200';
    if (percentage >= 90) return 'text-orange-500 bg-surface-elevated border-orange-200';
    if (percentage >= 75) return 'text-yellow-500 bg-surface-elevated border-yellow-200';
    return 'text-green-500 bg-surface-elevated border-green-200';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 90) return 'bg-orange-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return showInDashboard ? (
      <div className="bg-surface-elevated rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-surface-border rounded w-24 mb-2"></div>
        <div className="h-6 bg-surface-border rounded w-16"></div>
      </div>
    ) : null;
  }

  if (error || (!usageData && !loading)) {
    return showInDashboard ? (
      <div className="bg-surface-elevated rounded-lg p-4 text-center">
        <Clock className="w-5 h-5 text-text-secondary mx-auto mb-2" />
        <p className="text-xs text-text-secondary">Usage data unavailable</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    ) : null;
  }

  // Dashboard compact view
  if (showInDashboard && usageData) {
    return (
      <div className={`rounded-lg p-4 border ${getStatusColor(usageData.usagePercentage)}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sm">Usage</span>
          </div>
          {usageData.isOverLimit && <AlertTriangle className="w-4 h-4 text-red-500" />}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>{formatTime(usageData.totalMinutesUsed)} used</span>
            <span>{formatTime(usageData.remainingMinutes)} left</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(usageData.usagePercentage)}`}
              style={{ width: `${Math.min(usageData.usagePercentage, 100)}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-center font-medium">
            {usageData.usagePercentage}% of {formatTime(usageData.limitMinutes)}
          </div>
        </div>
        
        {(usageData.isOverLimit || usageData.usagePercentage >= 90) && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-2 w-full text-xs bg-experimental-pink hover:bg-experimental-pink/80 text-white py-1 px-2 rounded transition-colors"
          >
            {usageData.isOverLimit ? 'Limit Exceeded' : 'View Details'}
          </button>
        )}
      </div>
    );
  }

  // Usage limit modal
  if (!usageData) return null;
  
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                usageData.isOverLimit ? 'bg-red-100' : 'bg-orange-100'
              }`}>
                <AlertTriangle className={`w-8 h-8 ${
                  usageData.isOverLimit ? 'text-red-500' : 'text-orange-500'
                }`} />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {usageData.isOverLimit ? 'Usage Limit Exceeded' : 'Approaching Usage Limit'}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {usageData.isOverLimit 
                  ? `You've used ${formatTime(usageData.totalMinutesUsed)} out of your ${formatTime(usageData.limitMinutes)} free allowance.`
                  : `You've used ${usageData.usagePercentage}% of your free allowance (${formatTime(usageData.totalMinutesUsed)} out of ${formatTime(usageData.limitMinutes)}).`
                }
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Usage Progress</span>
                  <span className="text-sm font-medium">{usageData.usagePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressBarColor(usageData.usagePercentage)}`}
                    style={{ width: `${Math.min(usageData.usagePercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(usageData.totalMinutesUsed)} used</span>
                  <span>{usageData.remainingMinutes > 0 ? `${formatTime(usageData.remainingMinutes)} remaining` : 'Limit exceeded'}</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  To continue using the service beyond your free allowance, please contact us:
                </p>
                
                <a
                  href="mailto:macekovick+1@gmail.com?subject=Usage Limit Exceeded - Together AI Study Buddy"
                  className="inline-flex items-center space-x-2 bg-experimental-pink hover:bg-experimental-pink/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </a>
                
                <p className="text-xs text-gray-500 mt-3">
                  macekovick+1@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsageTracker; 