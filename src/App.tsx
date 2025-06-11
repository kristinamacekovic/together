import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { SoundProvider } from './context/SoundContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SoundProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="room/:roomId" element={<RoomPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SoundProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;