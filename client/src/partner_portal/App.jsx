import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PartnersZone from './pages/PartnersZone';
import AdminZone from './pages/AdminZone';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Landing from './pages/Landing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <Landing onLogin={handleLogin} />;
  }

  const isAdmin = user?.role === 'ADMIN';

  return (
    <Router>
      <div className="flex h-screen bg-background text-text overflow-hidden font-sans">
        <Sidebar status={user?.status?.toLowerCase()} isAdmin={isAdmin} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onLogout={handleLogout} partnerStatus={user?.status?.toLowerCase()} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
            <Routes>
              {isAdmin ? (
                <>
                  <Route path="/admin/*" element={<AdminZone />} />
                  <Route path="/" element={<Navigate to="/admin" replace />} />
                </>
              ) : (
                <>
                  <Route path="/partners-zone/*" element={<PartnersZone status={user?.status?.toLowerCase()} />} />
                  <Route path="/" element={<Navigate to="/partners-zone" replace />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}


export default App;
