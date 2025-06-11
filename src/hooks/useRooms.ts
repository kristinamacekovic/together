import { useState, useEffect } from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  topic: string;
  isPrivate: boolean;
  createdAt: string;
}

// Sample room data
const sampleRooms: Room[] = [
  {
    id: 'study-lounge',
    name: 'Study Lounge',
    description: 'A quiet space for focused study sessions',
    participants: 12,
    topic: 'General',
    isPrivate: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'coding-cave',
    name: 'Coding Cave',
    description: 'For developers working on projects',
    participants: 8,
    topic: 'Programming',
    isPrivate: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exam-prep',
    name: 'Exam Prep',
    description: 'Preparing for upcoming exams together',
    participants: 15,
    topic: 'Education',
    isPrivate: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'creative-corner',
    name: 'Creative Corner',
    description: 'For artists, writers, and creative minds',
    participants: 6,
    topic: 'Arts',
    isPrivate: false,
    createdAt: new Date().toISOString(),
  },
];

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // In a real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 800));
        setRooms(sampleRooms);
      } catch (err) {
        setError('Failed to load rooms. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const joinRoom = async (roomId: string) => {
    try {
      // In a real app, API call to join room
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.id === roomId 
            ? { ...room, participants: room.participants + 1 } 
            : room
        )
      );
      return true;
    } catch (err) {
      setError('Failed to join room. Please try again.');
      return false;
    }
  };

  const leaveRoom = async (roomId: string) => {
    try {
      // In a real app, API call to leave room
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.id === roomId && room.participants > 0
            ? { ...room, participants: room.participants - 1 } 
            : room
        )
      );
      return true;
    } catch (err) {
      setError('Failed to leave room. Please try again.');
      return false;
    }
  };

  const createRoom = async (roomData: Omit<Room, 'id' | 'participants' | 'createdAt'>) => {
    try {
      // In a real app, API call to create room
      const newRoom: Room = {
        ...roomData,
        id: Math.random().toString(36).substring(2, 9),
        participants: 1, // Creator joins automatically
        createdAt: new Date().toISOString(),
      };
      
      setRooms(prevRooms => [...prevRooms, newRoom]);
      return newRoom.id;
    } catch (err) {
      setError('Failed to create room. Please try again.');
      return null;
    }
  };

  const getRoom = (roomId: string) => {
    return rooms.find(room => room.id === roomId) || null;
  };

  return {
    rooms,
    isLoading,
    error,
    joinRoom,
    leaveRoom,
    createRoom,
    getRoom,
  };
};