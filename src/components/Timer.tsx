import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useTimer, TimerMode } from '../hooks/useTimer';
import TimerSettings from './TimerSettings';

interface TimerProps {
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ className = '' }) => {
  const timer = useTimer();
  const [showSettings, setShowSettings] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Renew animation when timer resets or changes modes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [timer.mode, timer.isActive]);

  const handleStartPause = () => {
    if (timer.isActive) {
      if (timer.isPaused) {
        timer.resume();
      } else {
        timer.pause();
      }
    } else {
      timer.start();
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Calculate progress percentage (inverse for visual representation)
  const progressPercent = 100 - timer.progress;
  
  // Determine color based on mode
  const getProgressColor = () => {
    switch (timer.mode) {
      case 'focus':
        return 'text-primary-600 dark:text-primary-400';
      case 'shortBreak':
        return 'text-secondary-600 dark:text-secondary-400';
      case 'longBreak':
        return 'text-accent-600 dark:text-accent-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getModeLabel = (mode: TimerMode): string => {
    switch (mode) {
      case 'focus':
        return 'Focus';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getTextColor = () => {
    switch (timer.mode) {
      case 'focus':
        return 'text-primary-700 dark:text-primary-300';
      case 'shortBreak':
        return 'text-secondary-700 dark:text-secondary-300';
      case 'longBreak':
        return 'text-accent-700 dark:text-accent-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  const getButtonColor = () => {
    switch (timer.mode) {
      case 'focus':
        return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300';
      case 'shortBreak':
        return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300';
      case 'longBreak':
        return 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex space-x-3 mb-6">
        {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((mode) => (
          <button
            key={mode}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timer.mode === mode 
                ? getButtonColor()
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => {
              if (!timer.isActive || window.confirm('Changing modes will reset the timer. Continue?')) {
                timer.reset();
                timer.setMode(mode);
              }
            }}
          >
            {getModeLabel(mode)}
          </button>
        ))}
      </div>

      <div 
        className="relative w-64 h-64 mb-6 flex items-center justify-center"
        key={animationKey}
      >
        <div 
          className={`absolute inset-0 rounded-full border-8 ${getProgressColor()}`}
          style={{ 
            background: `conic-gradient(currentColor ${100 - progressPercent}%, transparent 0%)`,
            opacity: 0.2
          }}
        />
        <div className="flex flex-col items-center justify-center z-10">
          <div className={`text-5xl font-semibold mb-3 ${getTextColor()}`}>
            {timer.formattedTime}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {getModeLabel(timer.mode)} • Round {timer.round}/{timer.config.rounds}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={timer.reset}
          aria-label="Reset timer"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          className={`p-3 rounded-full transition-colors ${
            timer.isActive && !timer.isPaused
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/50'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/50'
          }`}
          onClick={handleStartPause}
          aria-label={timer.isActive && !timer.isPaused ? 'Pause timer' : 'Start timer'}
        >
          {timer.isActive && !timer.isPaused ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
        <button
          className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={toggleSettings}
          aria-label="Timer settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {showSettings && (
        <TimerSettings
          config={timer.config}
          onUpdate={timer.updateConfig}
          onClose={toggleSettings}
        />
      )}
    </div>
  );
};

export default Timer;