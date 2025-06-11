import { useState, useRef, useCallback, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerConfig {
  focus: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
  rounds: number;
}

const DEFAULT_CONFIG: TimerConfig = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  rounds: 4,
};

export const useTimer = () => {
  const [config, setConfig] = useState<TimerConfig>(DEFAULT_CONFIG);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(config.focus * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [round, setRound] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const { updateFocusTime } = useUser();

  // Effect to update timeLeft when mode or config changes
  useEffect(() => {
    let duration = 0;
    
    switch (mode) {
      case 'focus':
        duration = config.focus;
        break;
      case 'shortBreak':
        duration = config.shortBreak;
        break;
      case 'longBreak':
        duration = config.longBreak;
        break;
    }
    
    setTimeLeft(duration * 60);
  }, [mode, config]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const calculateProgress = useCallback((): number => {
    let totalSeconds = 0;
    
    switch (mode) {
      case 'focus':
        totalSeconds = config.focus * 60;
        break;
      case 'shortBreak':
        totalSeconds = config.shortBreak * 60;
        break;
      case 'longBreak':
        totalSeconds = config.longBreak * 60;
        break;
    }
    
    return (timeLeft / totalSeconds) * 100;
  }, [config, mode, timeLeft]);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current!);
          
          // If focus session is completed, update total focus time
          if (mode === 'focus') {
            updateFocusTime(config.focus);
          }
          
          // Handle timer completion and mode transitions
          if (mode === 'focus') {
            // Determine if we need a short break or long break
            const nextRound = round < config.rounds ? round + 1 : 1;
            if (round === config.rounds) {
              setMode('longBreak');
            } else {
              setMode('shortBreak');
            }
            setRound(nextRound);
          } else {
            // After any break, go back to focus mode
            setMode('focus');
          }
          
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [config, mode, round, updateFocusTime]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    start();
  }, [start]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    let duration = 0;
    switch (mode) {
      case 'focus':
        duration = config.focus;
        break;
      case 'shortBreak':
        duration = config.shortBreak;
        break;
      case 'longBreak':
        duration = config.longBreak;
        break;
    }
    
    setTimeLeft(duration * 60);
    setIsActive(false);
    setIsPaused(false);
  }, [config, mode]);

  const updateConfig = useCallback((newConfig: Partial<TimerConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
    
    // Reset the timer when config changes
    reset();
  }, [reset]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    progress: calculateProgress(),
    isActive,
    isPaused,
    mode,
    round,
    config,
    start,
    pause,
    resume,
    reset,
    updateConfig,
    setMode,
  };
};