import React from 'react';
import { Brain, Clock, Target, TrendingUp, CheckCircle, Play, Users, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your AI
              <span className="text-primary-600"> Study Buddy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay focused, motivated, and accountable with your personal AI companion that adapts to your study style and keeps you on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
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
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose an AI Study Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get all the benefits of studying with a partner, available 24/7 and perfectly tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Accountability</h3>
              <p className="text-gray-600">
                Your AI buddy learns your patterns, reminds you to stay focused, and celebrates your achievements.
              </p>
            </div>

            <div className="card text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Pomodoro Timer</h3>
              <p className="text-gray-600">
                Intelligent break scheduling that adapts to your productivity patterns and energy levels.
              </p>
            </div>

            <div className="card text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Goal Tracking</h3>
              <p className="text-gray-600">
                Set study goals and let your AI buddy help you break them down into achievable milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your study sessions with AI-powered support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Set Your Goals</h3>
              <p className="text-gray-600">
                Tell your AI buddy what you want to study and your preferred session length.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Your Session</h3>
              <p className="text-gray-600">
                Your AI buddy will guide you through focused work periods and strategic breaks.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Review your productivity insights and celebrate your achievements together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Study Habits
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the power of having a dedicated study partner that's always available, never judges, and continuously adapts to help you succeed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Availability</h4>
                    <p className="text-gray-600">Study whenever inspiration strikes, day or night</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Experience</h4>
                    <p className="text-gray-600">AI that learns and adapts to your unique study style</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Increased Focus</h4>
                    <p className="text-gray-600">Stay on track with gentle reminders and motivation</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Progress Insights</h4>
                    <p className="text-gray-600">Understand your productivity patterns and improve over time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">85% More Productive</h4>
                    <p className="text-sm text-gray-600">Average improvement in focus time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">10,000+ Students</h4>
                    <p className="text-sm text-gray-600">Trust Together for their studies</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">2.5 Hours</h4>
                    <p className="text-sm text-gray-600">Average daily study time increase</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instant Setup</h4>
                    <p className="text-sm text-gray-600">Start studying in under 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Study Sessions?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already discovered the power of AI-assisted studying.
            </p>
            <button className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Start Your Free Session Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;