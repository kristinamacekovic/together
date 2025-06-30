import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import { HomePage } from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ConversationPage from './pages/ConversationPage';
import EmailVerificationHandler from './components/auth/EmailVerificationHandler';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { loading, user } = useAuth();
  
  console.log('🔍 App: Render - loading:', loading, 'user:', user?.email || 'none');

  if (loading) {
    console.log('🔍 App: Showing loading screen');
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-experimental-electric border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 App: Rendering main content');
  return (
    <>
      <EmailVerificationHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/conversation/:conversationUrl" element={<ConversationPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;