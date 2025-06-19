import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Target, Clock, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gruvbox-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gruvbox-fg0 mb-2">
            Welcome back, {profile?.full_name || 'Student'}!
          </h1>
          <p className="text-gruvbox-fg2">
            Ready to start your next study session?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-orange/20 border border-gruvbox-orange/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-gruvbox-orange" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Active Goals</h3>
            <p className="text-2xl font-bold text-gruvbox-orange">1</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-green/20 border border-gruvbox-green/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-gruvbox-green" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Sessions Today</h3>
            <p className="text-2xl font-bold text-gruvbox-green">0</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-purple/20 border border-gruvbox-purple/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-gruvbox-purple" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">This Week</h3>
            <p className="text-2xl font-bold text-gruvbox-purple">0</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-gruvbox-blue/20 border border-gruvbox-blue/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-gruvbox-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gruvbox-fg0 mb-1">Total Hours</h3>
            <p className="text-2xl font-bold text-gruvbox-blue">0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Start Session */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gruvbox-fg0 mb-6">Start Your Study Session</h2>
              <div className="bg-gruvbox-dark border border-gruvbox-gray-244/20 rounded-lg p-6 text-center">
                <Brain className="w-16 h-16 text-gruvbox-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gruvbox-fg0 mb-2">Ready to Focus?</h3>
                <p className="text-gruvbox-fg3 mb-6">
                  Your AI study buddy is ready to help you stay focused and productive.
                </p>
                <button className="btn btn-primary">
                  Start New Session
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="card">
              <h2 className="text-xl font-bold text-gruvbox-fg0 mb-6">Recent Activity</h2>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gruvbox-gray-244 mx-auto mb-4" />
                <p className="text-gruvbox-fg3">No sessions yet</p>
                <p className="text-sm text-gruvbox-fg4 mt-2">
                  Start your first study session to see your progress here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;