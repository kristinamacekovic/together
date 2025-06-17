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
    <div className="bg-gruvbox-dark text-gruvbox-fg1">
      {/* Hero Section */}
      <section className="relative gruvbox-gradient-bg py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gruvbox-orange/5 via-transparent to-gruvbox-yellow/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center bg-gruvbox-dark-soft border border-gruvbox-orange/30 text-gruvbox-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ students worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gruvbox-fg0 mb-6 leading-tight">
              Meet Your AI
              <span className="gradient-text block"> Study Buddy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gruvbox-fg2 mb-10 max-w-4xl mx-auto leading-relaxed">
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
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gruvbox-fg3">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gruvbox-red to-gruvbox-red-bright rounded-full border-2 border-gruvbox-dark"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-gruvbox-blue to-gruvbox-blue-bright rounded-full border-2 border-gruvbox-dark"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-gruvbox-green to-gruvbox-green-bright rounded-full border-2 border-gruvbox-dark"></div>
                </div>
                <span className="text-sm font-medium">Join 10,000+ students</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-gruvbox-yellow-bright mr-2">
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
      <section id="features" className="py-24 bg-gruvbox-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gruvbox-fg0 mb-6">
              Why Choose an AI Study Buddy?
            </h2>
            <p className="text-xl text-gruvbox-fg2 max-w-3xl mx-auto leading-relaxed">
              Get all the benefits of studying with a partner, available 24/7 and perfectly tailored to your unique learning needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-orange/20 border border-gruvbox-orange/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-gruvbox-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">AI-Powered Accountability</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Your AI buddy learns your patterns, reminds you to stay focused, and celebrates your achievements with personalized motivation.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-green/20 border border-gruvbox-green/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-gruvbox-green" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Smart Pomodoro Timer</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Intelligent break scheduling that adapts to your productivity patterns and energy levels throughout the day.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-purple/20 border border-gruvbox-purple/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-gruvbox-purple" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Goal Tracking</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Set study goals and let your AI buddy help you break them down into achievable milestones with progress tracking.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-yellow/20 border border-gruvbox-yellow/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-10 h-10 text-gruvbox-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Progress Analytics</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Detailed insights into your study habits, productivity trends, and areas for improvement with actionable recommendations.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-aqua/20 border border-gruvbox-aqua/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-10 h-10 text-gruvbox-aqua" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Conversational Support</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Chat with your AI buddy for motivation, study tips, or just to stay accountable during challenging study sessions.
              </p>
            </div>

            <div className="card text-center animate-slide-up group">
              <div className="w-20 h-20 bg-gruvbox-blue/20 border border-gruvbox-blue/30 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-gruvbox-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Privacy First</h3>
              <p className="text-gruvbox-fg3 leading-relaxed">
                Your study data and conversations are completely private and secure, with no sharing or selling of personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gruvbox-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gruvbox-fg0 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gruvbox-fg2 max-w-3xl mx-auto leading-relaxed">
              Get started in minutes and transform your study sessions with AI-powered support that grows with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 gruvbox-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-gruvbox-dark">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Set Your Goals</h3>
              <p className="text-gruvbox-fg3 leading-relaxed text-lg">
                Tell your AI buddy what you want to study, your preferred session length, and any specific challenges you're facing.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-gruvbox-green to-gruvbox-green-bright rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-gruvbox-dark">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Start Your Session</h3>
              <p className="text-gruvbox-fg3 leading-relaxed text-lg">
                Your AI buddy will guide you through focused work periods, strategic breaks, and provide motivation when you need it most.
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-gruvbox-purple to-gruvbox-purple-bright rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-3xl font-bold text-gruvbox-dark">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gruvbox-fg0 mb-4">Track & Improve</h3>
              <p className="text-gruvbox-fg3 leading-relaxed text-lg">
                Review your productivity insights, celebrate achievements, and get personalized recommendations for better study habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gruvbox-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gruvbox-fg0 mb-8">
                Transform Your Study Habits
              </h2>
              <p className="text-xl text-gruvbox-fg2 mb-10 leading-relaxed">
                Experience the power of having a dedicated study partner that's always available, never judges, and continuously adapts to help you succeed.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gruvbox-green/20 border border-gruvbox-green/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-gruvbox-green" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gruvbox-fg0 mb-2">24/7 Availability</h4>
                    <p className="text-gruvbox-fg3 leading-relaxed">Study whenever inspiration strikes, day or night, with consistent support</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gruvbox-blue/20 border border-gruvbox-blue/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-gruvbox-blue" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gruvbox-fg0 mb-2">Personalized Experience</h4>
                    <p className="text-gruvbox-fg3 leading-relaxed">AI that learns and adapts to your unique study style and preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gruvbox-purple/20 border border-gruvbox-purple/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-gruvbox-purple" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gruvbox-fg0 mb-2">Increased Focus</h4>
                    <p className="text-gruvbox-fg3 leading-relaxed">Stay on track with gentle reminders, motivation, and distraction management</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gruvbox-orange/20 border border-gruvbox-orange/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-gruvbox-orange" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gruvbox-fg0 mb-2">Progress Insights</h4>
                    <p className="text-gruvbox-fg3 leading-relaxed">Understand your productivity patterns and improve over time with data-driven insights</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="bg-gruvbox-dark border border-gruvbox-gray-244/20 rounded-2xl p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gruvbox-orange/20 border border-gruvbox-orange/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="w-10 h-10 text-gruvbox-orange" />
                    </div>
                    <h4 className="text-2xl font-bold text-gruvbox-fg0 mb-2">85%</h4>
                    <p className="text-gruvbox-fg2 font-medium">More Productive</p>
                    <p className="text-sm text-gruvbox-fg4 mt-1">Average improvement in focus time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gruvbox-green/20 border border-gruvbox-green/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-gruvbox-green" />
                    </div>
                    <h4 className="text-2xl font-bold text-gruvbox-fg0 mb-2">10,000+</h4>
                    <p className="text-gruvbox-fg2 font-medium">Happy Students</p>
                    <p className="text-sm text-gruvbox-fg4 mt-1">Trust Together for their studies</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gruvbox-purple/20 border border-gruvbox-purple/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-10 h-10 text-gruvbox-purple" />
                    </div>
                    <h4 className="text-2xl font-bold text-gruvbox-fg0 mb-2">2.5 Hours</h4>
                    <p className="text-gruvbox-fg2 font-medium">Daily Increase</p>
                    <p className="text-sm text-gruvbox-fg4 mt-1">Average study time improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gruvbox-yellow/20 border border-gruvbox-yellow/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-10 h-10 text-gruvbox-yellow" />
                    </div>
                    <h4 className="text-2xl font-bold text-gruvbox-fg0 mb-2">2 Minutes</h4>
                    <p className="text-gruvbox-fg2 font-medium">Quick Setup</p>
                    <p className="text-sm text-gruvbox-fg4 mt-1">Start studying immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gruvbox-accent-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gruvbox-dark/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gruvbox-dark mb-8">
              Ready to Transform Your Study Sessions?
            </h2>
            <p className="text-xl text-gruvbox-dark/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who have already discovered the power of AI-assisted studying. Start your journey to better focus and productivity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn bg-gruvbox-dark text-gruvbox-orange hover:bg-gruvbox-dark-soft text-lg shadow-xl">
                <Play className="w-6 h-6 mr-3" />
                Start Your Free Session Now
              </button>
              <button className="btn border-2 border-gruvbox-dark text-gruvbox-dark hover:bg-gruvbox-dark hover:text-gruvbox-orange text-lg">
                <MessageCircle className="w-6 h-6 mr-3" />
                Chat with AI Demo
              </button>
            </div>
            <p className="text-gruvbox-dark/70 text-sm mt-6">
              No credit card required • Free forever • Start in 2 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;