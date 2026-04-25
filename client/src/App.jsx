import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PartnersZone from './partner_portal/pages/PartnersZone';
import AdminZone from './partner_portal/pages/AdminZone';
import Sidebar from './partner_portal/components/Sidebar';
import Header from './partner_portal/components/Header';

import Landing from './pages/Landing';
import PortalHome from './pages/PortalHome';
import AsapWebsite from './pages/AsapWebsite';
import GlobalOverview from './pages/GlobalOverview';
import SuperAdminLogin from './pages/SuperAdminLogin';
import LmsDashboard from './lms_portal/LmsDashboard';
import LmsLogin from './lms_portal/LmsLogin';
import LmsLanding from './lms_portal/LmsLanding';

import { useLocation } from 'react-router-dom';

const PortalShell = ({ user, handleLogout, children }) => {
  const location = useLocation();
  const isSuperAdmin = user?.role === 'ADMIN' && user?.category === 'ALL';
  const isAdminPortal = user?.role === 'ADMIN';

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden font-sans w-full">
      <Sidebar status={user?.status?.toLowerCase()} isAdmin={isAdminPortal} user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} partnerStatus={user?.status?.toLowerCase()} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Render Login/Landing if not authenticated
  if (!user) {
    const path = window.location.pathname;
    if (path === '/') return <AsapWebsite />;
    if (path === '/superadmin') return <SuperAdminLogin onLogin={handleLogin} />;
    if (path.includes('lms-dashboard')) return <LmsLanding onLogin={handleLogin} />;
    if (path.includes('partner') || path.includes('tbb') || path.includes('frr')) return <Landing onLogin={handleLogin} />;
    if (path.includes('finance')) return <AsapWebsite />;
    return <PortalHome onLogin={handleLogin} />;
  }

  const isSuperAdmin = user?.role === 'ADMIN' && user?.category === 'ALL';
  const isAdminPortal = user?.role === 'ADMIN';

  return (
    <Router>
      <Routes>
        <Route path="/*" element={
          <PortalShell user={user} handleLogout={handleLogout}>
            <Routes>
              <Route path="/lms-dashboard/*" element={<LmsDashboard user={user} />} />
              <Route path="/tbb-zone/*" element={<PartnersZone status={user?.status?.toLowerCase()} category="TBB" />} />
              <Route path="/frr-zone/*" element={<PartnersZone status={user?.status?.toLowerCase()} category="FRR" />} />
              <Route path="/partners-zone/*" element={<PartnersZone status={user?.status?.toLowerCase()} category={user?.category} />} />
              <Route path="/partner-zone/*" element={<PartnersZone status={user?.status?.toLowerCase()} category={user?.category} />} />

              {isAdminPortal && (
                <Route path="/admin/*" element={<AdminZone adminCategory={isSuperAdmin ? 'ALL' : user?.category} />} />
              )}

              <Route path="/" element={
                <Navigate to={
                  isSuperAdmin ? "/admin" : 
                  user?.role === 'TRAINER' || user?.role === 'STUDENT' ? "/lms-dashboard" :
                  "/partners-zone"
                } replace />
              } />
            </Routes>
          </PortalShell>
        } />
      </Routes>
    </Router>
  );
}


export default App;
