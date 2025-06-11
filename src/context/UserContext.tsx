import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  totalFocusTime: number; // in minutes
  dailyGoal: number; // in minutes
  streak: number;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  updateFocusTime: (minutes: number) => void;
  updateDailyGoal: (minutes: number) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user for demo purposes
const mockUser: User = {
  id: '123',
  name: 'Alex Kim',
  avatar: 'https://i.pravatar.cc/150?img=11',
  totalFocusTime: 120,
  dailyGoal: 240,
  streak: 3,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const loadUser = async () => {
      try {
        // In a real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user data exists in localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Use mock user for demo
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateFocusTime = (minutes: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      totalFocusTime: user.totalFocusTime + minutes,
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateDailyGoal = (minutes: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      dailyGoal: minutes,
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        setUser, 
        updateFocusTime, 
        updateDailyGoal, 
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};