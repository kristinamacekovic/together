import React from 'react';
import { Brain, Clock, Target, Zap, Play, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Study Smarter with Your
              <span className="text-primary-600 block">AI Study Buddy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Meet your personal AI study companion that keeps you focused, motivated, and accountable. 
              Experience the power of studying together, even when you're alone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up">
              <button className="btn btn-primary text-lg px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Start Your First Session
              </button>
              <button className="btn btn-secondary text-lg px-8 py-4">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Study with an AI Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI study companion provides the accountability and motivation you need to achieve your learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Intelligent Companion</h3>
              <p className="text-gray-600">
                Your AI buddy understands your study patterns and adapts to provide personalized motivation and guidance.
              </p>
            </div>

            <div className="card text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Time Management</h3>
              <p className="text-gray-600">
                Built-in Pomodoro timer and focus sessions help you maintain optimal productivity throughout your study time.
              </p>
            </div>

            <div className="card text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Goal Tracking</h3>
              <p className="text-gray-600">
                Set study goals and let your AI buddy help you stay on track with progress monitoring and encouragement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with your AI study buddy in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Goals</h3>
              <p className="text-gray-600">
                Tell your AI buddy what you want to study and your learning objectives for the session.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Your Session</h3>
              <p className="text-gray-600">
                Begin your focused study session with your AI companion providing guidance and motivation.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Review your achievements and get insights to improve your future study sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transform Your Study Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Say goodbye to procrastination and hello to productive, focused study sessions with your AI companion.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Accountability</h4>
                    <p className="text-gray-600">Your AI buddy is always available to keep you on track.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Motivation</h4>
                    <p className="text-gray-600">Receive encouragement tailored to your learning style and goals.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Focus Enhancement</h4>
                    <p className="text-gray-600">Minimize distractions with guided focus techniques and timers.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Progress Insights</h4>
                    <p className="text-gray-600">Track your study habits and see your improvement over time.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl p-8 text-center">
              <Zap className="h-24 w-24 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Boost Your Productivity?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of students who have transformed their study habits with AI-powered companionship.
              </p>
              <button className="btn btn-primary text-lg px-8 py-4">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Journey to Better Study Habits Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Experience the difference an AI study buddy can make. No credit card required.
          </p>
          <button className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4">
            Begin Your First Session
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;