import React, { useState } from 'react';
import { Calendar, Target, Trophy, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { format } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { user, updateDailyGoal } = useUser();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(user?.dailyGoal || 240);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-semibold mb-4">Please sign in</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You need to be signed in to view your profile.
        </p>
        <button className="btn btn-primary">Sign In</button>
      </div>
    );
  }

  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };

  const calculateProgress = (): number => {
    return Math.min(100, (user.totalFocusTime / user.dailyGoal) * 100);
  };

  const handleSaveGoal = () => {
    updateDailyGoal(goalValue);
    setIsEditingGoal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="h-24 w-24 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
              <Trophy className="h-3 w-3 mr-1" />
              <span>{user.streak} Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
            <h2 className="text-xl font-semibold">Today's Progress</h2>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {formatMinutes(user.totalFocusTime)} of {formatMinutes(user.dailyGoal)}
              </span>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {Math.round(calculateProgress())}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Daily Goal</p>
              {isEditingGoal ? (
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    value={goalValue}
                    onChange={(e) => setGoalValue(Math.max(15, parseInt(e.target.value)))}
                    className="input w-20 h-8 text-sm mr-2"
                    min="15"
                    step="15"
                  />
                  <button 
                    onClick={handleSaveGoal}
                    className="text-xs btn btn-primary py-1 px-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center mt-1">
                  <span className="text-xl font-medium">{formatMinutes(user.dailyGoal)}</span>
                  <button 
                    onClick={() => setIsEditingGoal(true)}
                    className="ml-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            
            <div className="h-16 w-16 rounded-full border-4 border-primary-200 dark:border-primary-900/30 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                {formatMinutes(user.totalFocusTime)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2" />
            <h2 className="text-xl font-semibold">Focus Stats</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Total Focus Time</span>
              <span className="font-medium">{formatMinutes(user.totalFocusTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Current Streak</span>
              <span className="font-medium">{user.streak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Focus Sessions Today</span>
              <span className="font-medium">{Math.floor(user.totalFocusTime / 25)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Last Session</span>
              <span className="font-medium">{format(new Date(), 'h:mm a')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <Calendar className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2" />
          <h2 className="text-xl font-semibold">Focus History</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 30 }).map((_, i) => {
            // Generate random activity level for demo
            const level = Math.floor(Math.random() * 4);
            
            return (
              <div 
                key={i}
                className={`h-5 w-5 rounded-sm cursor-pointer transition-colors ${
                  level === 0 ? 'bg-gray-100 dark:bg-gray-700' :
                  level === 1 ? 'bg-accent-200 dark:bg-accent-900/30' :
                  level === 2 ? 'bg-accent-400 dark:bg-accent-700' :
                  'bg-accent-600 dark:bg-accent-500'
                }`}
                title={`${level * 30} minutes on ${format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}`}
              />
            );
          })}
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-100 dark:bg-gray-700 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">0 min</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-accent-200 dark:bg-accent-900/30 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">1-30 min</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-accent-400 dark:bg-accent-700 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">31-60 min</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-accent-600 dark:bg-accent-500 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">60+ min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;