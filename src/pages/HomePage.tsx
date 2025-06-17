import React from 'react';
import { 
  Brain, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Play, 
  Users, 
  Zap, 
  Star,
  MessageCircle,
  BarChart3,
  Shield
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ students worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Meet Your AI
              <span className="gradient-text block"> Study Buddy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Stay focused, motivated, and accountable with your personal AI companion that adapts to your study style and keeps you on track 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="btn btn-primary text-lg">
                <Play className="w-6 h-6 mr-3" />
                Start Your First Session
              </button>
              <button className="btn btn-secondary text-lg">
                <MessageCircle className="w-6 h-6 mr-3" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium">Join 10,000+ students</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose an AI Study Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get all the benefits of studying with a partner, available 24/7 and perfectly tailored to your unique learning needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Accountability</h3>
              <p className="text-gray-600 leading-relaxed">
                Your AI buddy learns your patterns, reminds you to stay focused, and celebrates your achievements with personalized motivation.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Pomodoro Timer</h3>
              <p className="text-gray-600 leading-relaxed">
                Intelligent break scheduling that adapts to your productivity patterns and energy levels throughout the day.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Goal Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Set study goals and let your AI buddy help you break them down into achievable milestones with progress tracking.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed insights into your study habits, productivity trends, and areas for improvement with actionable recommendations.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-10 h-10 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conversational Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with your AI buddy for motivation, study tips, or just to stay accountable during challenging study sessions.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">
                Your study data and conversations are completely private and secure, with no sharing or selling of personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get started in minutes and transform your study sessions with AI-powered support that grows with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Set Your Goals</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Tell your AI buddy what you want to study, your preferred session length, and any specific challenges you're facing.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Session</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your AI buddy will guide you through focused work periods, strategic breaks, and provide motivation when you need it most.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track & Improve</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Review your productivity insights, celebrate achievements, and get personalized recommendations for better study habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Transform Your Study Habits
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Experience the power of having a dedicated study partner that's always available, never judges, and continuously adapts to help you succeed.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h4>
                    <p className="text-gray-600 leading-relaxed">Study whenever inspiration strikes, day or night, with consistent support</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Personalized Experience</h4>
                    <p className="text-gray-600 leading-relaxed">AI that learns and adapts to your unique study style and preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Increased Focus</h4>
                    <p className="text-gray-600 leading-relaxed">Stay on track with gentle reminders, motivation, and distraction management</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Progress Insights</h4>
                    <p className="text-gray-600 leading-relaxed">Understand your productivity patterns and improve over time with data-driven insights</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 rounded-3xl p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="w-10 h-10 text-primary-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">85%</h4>
                    <p className="text-gray-600 font-medium">More Productive</p>
                    <p className="text-sm text-gray-500 mt-1">Average improvement in focus time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h4>
                    <p className="text-gray-600 font-medium">Happy Students</p>
                    <p className="text-sm text-gray-500 mt-1">Trust Together for their studies</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-10 h-10 text-purple-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">2.5 Hours</h4>
                    <p className="text-gray-600 font-medium">Daily Increase</p>
                    <p className="text-sm text-gray-500 mt-1">Average study time improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-10 h-10 text-orange-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">2 Minutes</h4>
                    <p className="text-gray-600 font-medium">Quick Setup</p>
                    <p className="text-sm text-gray-500 mt-1">Start studying immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Study Sessions?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who have already discovered the power of AI-assisted studying. Start your journey to better focus and productivity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg shadow-xl">
                <Play className="w-6 h-6 mr-3" />
                Start Your Free Session Now
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg">
                <MessageCircle className="w-6 h-6 mr-3" />
                Chat with AI Demo
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              No credit card required • Free forever • Start in 2 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;