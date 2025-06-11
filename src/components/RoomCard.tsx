import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock } from 'lucide-react';
import { Room } from '../hooks/useRooms';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <Link to={`/room/${room.id}`} className="room-card group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {room.name}
        </h3>
        {room.isPrivate && (
          <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {room.description}
      </p>
      
      <div className="mt-auto flex justify-between items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {room.topic}
        </span>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4 mr-1" />
          <span>{room.participants}</span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;