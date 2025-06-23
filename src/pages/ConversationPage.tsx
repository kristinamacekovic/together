import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConversationPage: React.FC = () => {
  const { conversationUrl } = useParams<{ conversationUrl: string }>();
  const decodedUrl = conversationUrl ? decodeURIComponent(conversationUrl) : '';

  useEffect(() => {
    // Set body and html to have no margin/overflow for full viewport
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.margin = '';
      document.body.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      {decodedUrl ? (
        <iframe
          src={decodedUrl}
          allow="camera; microphone; fullscreen; display-capture"
          style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
          title="Tavus Conversation"
        />
      ) : (
        <div style={{ color: '#fff', textAlign: 'center', paddingTop: '20vh' }}>
          Invalid or missing conversation URL.
        </div>
      )}
    </div>
  );
};

export default ConversationPage; 