import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import Timer from '../components/Timer';
import SoundPlayer from '../components/SoundPlayer';
import Chat from '../components/Chat';
import { useUser } from '../context/UserContext';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { getRoom, joinRoom, leaveRoom } = useRooms();
  const { user } = useUser();
  const [room, setRoom] = useState(getRoom(roomId || ''));
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participants] = useState([
    { id: '123', name: 'Alex Kim', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '456', name: 'Jamie Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '789', name: 'Taylor Kim', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '101', name: 'Jordan Patel', avatar: 'https://i.pravatar.cc/150?img=12' },
  ]);

  useEffect(() => {
    if (roomId) {
      const currentRoom = getRoom(roomId);
      setRoom(currentRoom);
      
      if (currentRoom) {
        joinRoom(roomId);
        
        // Clean up when leaving the room
        return () => {
          leaveRoom(roomId);
        };
      }
    }
  }, [roomId, getRoom, joinRoom, leaveRoom]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-semibold mb-4">Room not found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The room you're looking for doesn't exist or has been closed.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Room Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
              {room.description}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={toggleChat}
              className={`btn ${isChatOpen ? 'btn-primary' : 'btn-outline'}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer and Sound Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <Timer className="mb-8" />
            
            <div className="flex justify-center">
              <SoundPlayer />
            </div>
          </div>
        </div>

        {/* Participants Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Participants</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-5 w-5 mr-1" />
              <span>{participants.length}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {participants.map(participant => (
              <div key={participant.id} className="flex items-center">
                <img 
                  src={participant.avatar} 
                  alt={participant.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">
                    {participant.id === user?.id ? `${participant.name} (You)` : participant.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <Chat roomId={roomId || ''} isOpen={isChatOpen} onClose={toggleChat} />
    </div>
  );
};

export default RoomPage;