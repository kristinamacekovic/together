import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize, Minimize, AlertTriangle } from 'lucide-react';
import { supabase, Session } from '../lib/supabase'; // Import supabase client and Session type

const ConversationPage: React.FC = () => {
  const { conversationUrl: sessionId } = useParams<{ conversationUrl: string }>(); // Use correct param name and alias to sessionId
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayDuration, setDisplayDuration] = useState('00:00:00');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setError('No session ID provided.');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setSession(data);
        } else {
          throw new Error('Session not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch session details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Timer and duration logic
  useEffect(() => {
    if (!session) return;

    const { status, created_at, ended_at } = session;

    if (status === 'completed' || status === 'cancelled') {
      if (ended_at) {
        const start = new Date(created_at).getTime();
        const end = new Date(ended_at).getTime();
        setDisplayDuration(formatDuration(end - start));
      } else {
        // Fallback for ended sessions without an end time
        setDisplayDuration('Finished');
      }
      return; // Stop here, no timer needed
    }

    // For active sessions, set up a running timer
    const startTime = new Date(created_at).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      setDisplayDuration(formatDuration(now - startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusDisplay = () => {
    const status = session?.status || 'planned';
    switch (status) {
      case 'planned':
        return { text: 'Connecting...', color: 'bg-yellow-500', pulse: true };
      case 'in_progress':
        return { text: 'Active', color: 'bg-green-500', pulse: false };
      case 'completed':
      case 'cancelled':
        return { text: 'Ended', color: 'bg-red-500', pulse: false };
      default:
        return { text: 'Unknown', color: 'bg-gray-500', pulse: false };
    }
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const handleBackToDashboard = () => navigate('/dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-experimental-pink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-4 text-center">
        <div>
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Error Loading Session</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button
            onClick={handleBackToDashboard}
            className="bg-experimental-electric hover:bg-experimental-electric-hover text-text-primary font-bold py-2 px-4 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const renderIframe = () => (
    session?.conversation_url ? (
      <iframe
        src={session.conversation_url}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full border-none"
        title="Tavus Conversation"
      />
    ) : (
      <div className="flex items-center justify-center h-full text-white text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Conversation Not Available</h2>
          <p>The conversation link for this session is missing.</p>
        </div>
      </div>
    )
  );
  
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <h2 className="text-white font-bold">Focus Session</h2>
          <button
            onClick={toggleFullscreen}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Minimize className="w-5 h-5" />
            <span className="text-sm">Exit Fullscreen</span>
          </button>
        </div>
        {renderIframe()}
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
              <h1 className="text-2xl font-bold text-text-primary">{session?.title || 'Focus Session'}</h1>
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
            <div className="bg-surface-elevated rounded-2xl overflow-hidden shadow-elegant-lg h-[500px] lg:h-[600px]">
              {renderIframe()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                     <span className="font-mono">{displayDuration}</span>
                   </div>
                 </div>
                <div>
                  <span className="text-text-secondary text-sm">AI Partner</span>
                  <div className="text-experimental-pink font-medium mt-1">Focus Partner</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-elevated rounded-2xl p-6 shadow-elegant">
              <h3 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h3>
              <button
                onClick={toggleFullscreen}
                className="w-full flex items-center justify-center space-x-2 bg-experimental-electric hover:bg-experimental-electric-hover text-background-primary font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <Maximize className="w-4 h-4" />
                <span>Fullscreen Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage; 