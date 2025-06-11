import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BarChart } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import RoomCard from '../components/RoomCard';

const HomePage: React.FC = () => {
  const { rooms, isLoading } = useRooms();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent animate-fade-in">
          Study and Work Together
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto animate-slide-up">
          Join a virtual study room and boost your productivity with focused sessions, ambient sounds, and a supportive community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/room/study-lounge" className="btn btn-primary text-base px-8 py-3">
            Join a Room
          </Link>
          <Link to="/profile" className="btn btn-outline text-base px-8 py-3">
            View Profile
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Study Together?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stay Focused</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use our customizable Pomodoro timer to structure your work and maintain peak productivity.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Accountability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join virtual rooms with others who are working toward similar goals and motivate each other.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your study habits, set daily goals, and see your productivity improve over time.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Rooms */}
      <section className="py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Rooms</h2>
          <Link to="/room/study-lounge" className="text-primary-600 dark:text-primary-400 hover:underline">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.slice(0, 3).map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;