import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';

const ConversationPage: React.FC = () => {
  const { conversationUrl } = useParams<{ conversationUrl: string }>();
  const navigate = useNavigate();
  const decodedUrl = conversationUrl ? decodeURIComponent(conversationUrl) : '';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionStatus, setSessionStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');

  // Update current time every second for duration calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate session status detection (in real app, this would monitor the iframe/Tavus state)
  useEffect(() => {
    // Set to active after a short delay to simulate connection
    const connectTimer = setTimeout(() => {
      setSessionStatus('active');
    }, 2000);

    // Monitor for session end (this is a placeholder - you'd integrate with Tavus events)
    const checkSessionTimer = setInterval(() => {
      // In a real implementation, you'd check if the iframe shows "You've left the call"
      // or listen to Tavus webhook events
      try {
        // This is a simplified check - you might need to implement postMessage communication
        // with the iframe or use Tavus webhooks for accurate session state
        const iframe = document.querySelector('iframe[title="Tavus Conversation"]') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          // Real implementation would check iframe content or use Tavus API
          // For now, we'll keep it active unless manually ended
        }
      } catch (error) {
        // Cross-origin restrictions prevent direct iframe content access
        // In production, use Tavus webhooks or postMessage API
      }
    }, 5000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(checkSessionTimer);
    };
  }, []);

  const formatDuration = (startTime: Date, currentTime: Date): string => {
    const diffMs = currentTime.getTime() - startTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusDisplay = () => {
    switch (sessionStatus) {
      case 'connecting':
        return { text: 'Connecting...', color: 'bg-warning-500', pulse: true };
      case 'active':
        return { text: 'Active', color: 'bg-success-500', pulse: false };
      case 'ended':
        return { text: 'Ended', color: 'bg-error-500', pulse: false };
      default:
        return { text: 'Unknown', color: 'bg-surface-border', pulse: false };
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleEndSession = () => {
    setSessionStatus('ended');
    // In a real app, you'd call Tavus API to end the session
    // For now, we'll just update the local state and optionally navigate back
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000); // Give user time to see the "ended" status
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <h2 className="text-white font-bold">Focus Session - Fullscreen</h2>
          <button
            onClick={toggleFullscreen}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Minimize className="w-5 h-5" />
            <span className="text-sm">Exit Fullscreen</span>
          </button>
        </div>
        {decodedUrl ? (
          <iframe
            src={decodedUrl}
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-full border-none"
            title="Tavus Conversation"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-center">
            <div>
              <h2 className="text-xl font-bold mb-2">Invalid Conversation</h2>
              <p>Invalid or missing conversation URL.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="bg-background-primary border-b border-surface-border/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="group flex items-center text-text-secondary hover:text-experimental-pink transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="w-px h-6 bg-surface-border/50"></div>
              <h1 className="text-2xl font-bold text-text-primary">Focus Session</h1>
            </div>
            <button
              onClick={toggleFullscreen}
              className="flex items-center space-x-2 text-text-secondary hover:text-experimental-pink transition-colors"
            >
              <Maximize className="w-5 h-5" />
              <span className="font-medium">Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Call */}
          <div className="lg:col-span-2">
            <div className="bg-surface-elevated rounded-2xl overflow-hidden shadow-elegant-lg">
              {decodedUrl ? (
                <iframe
                  src={decodedUrl}
                  allow="camera; microphone; fullscreen; display-capture"
                  className="w-full h-[500px] lg:h-[600px] border-none"
                  title="Tavus Conversation"
                />
              ) : (
                <div className="h-[500px] lg:h-[600px] flex items-center justify-center text-center">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary mb-2">Invalid Conversation</h2>
                    <p className="text-text-secondary">Invalid or missing conversation URL.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Info */}
            <div className="bg-surface-elevated rounded-2xl p-6 shadow-elegant">
              <h3 className="text-lg font-bold text-text-primary mb-4">Session Details</h3>
              <div className="space-y-3">
                                 <div>
                   <span className="text-text-secondary text-sm">Status</span>
                   <div className="flex items-center space-x-2 mt-1">
                     <div className={`w-2 h-2 ${getStatusDisplay().color} rounded-full ${getStatusDisplay().pulse ? 'animate-pulse' : ''}`}></div>
                     <span className="text-text-primary font-medium">{getStatusDisplay().text}</span>
                   </div>
                 </div>
                 <div>
                   <span className="text-text-secondary text-sm">Duration</span>
                   <div className="text-text-primary font-medium mt-1">
                     <span className="font-mono">{formatDuration(sessionStartTime, currentTime)}</span>
                   </div>
                 </div>
                <div>
                  <span className="text-text-secondary text-sm">AI Partner</span>
                  <div className="text-experimental-pink font-medium mt-1">Focus Partner</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-elevated rounded-2xl p-6 shadow-elegant">
              <h3 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={toggleFullscreen}
                  className="w-full flex items-center justify-center space-x-2 bg-experimental-electric hover:bg-experimental-electric-hover text-background-primary font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                  <span>Fullscreen Mode</span>
                </button>
                                 <button
                   onClick={handleEndSession}
                   className="w-full bg-surface-hover hover:bg-surface-active text-text-primary font-medium py-3 px-4 rounded-lg transition-colors"
                 >
                   End Session
                 </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-surface-elevated rounded-2xl p-6 shadow-elegant">
              <h3 className="text-lg font-bold text-text-primary mb-4">Session Tips</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-experimental-pink rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share your goals clearly with your AI partner</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-experimental-pink rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ask for accountability check-ins</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-experimental-pink rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use the fullscreen mode for focused sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage; 