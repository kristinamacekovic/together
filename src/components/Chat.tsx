import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

interface ChatProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock messages for demo
const mockMessages: Message[] = [
  {
    id: '1',
    userId: '456',
    username: 'Jamie Chen',
    avatar: 'https://i.pravatar.cc/150?img=5',
    text: 'Hey everyone! How\'s the studying going?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '2',
    userId: '789',
    username: 'Taylor Kim',
    avatar: 'https://i.pravatar.cc/150?img=9',
    text: 'Working on my thesis. This room is really helping me stay focused!',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
  {
    id: '3',
    userId: '123',
    username: 'Alex Kim',
    avatar: 'https://i.pravatar.cc/150?img=11',
    text: 'Just finished a pomodoro session. Taking a quick break!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

const Chat: React.FC<ChatProps> = ({ roomId, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      username: user.name,
      avatar: user.avatar,
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 md:w-96 bg-white shadow-lg dark:bg-gray-800 flex flex-col z-20 animate-fade-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white">Room Chat</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.userId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.userId === user?.id ? 'flex-row-reverse' : ''}`}>
              <img 
                src={message.avatar} 
                alt={message.username}
                className="h-8 w-8 rounded-full flex-shrink-0 mx-2"
              />
              
              <div>
                <div className={`rounded-lg px-4 py-2 ${
                  message.userId === user?.id
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                }`}>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {message.userId === user?.id ? 'You' : message.username} • {formatTime(message.timestamp)}
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input flex-1"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="btn btn-primary p-2"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;