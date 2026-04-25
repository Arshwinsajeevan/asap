import React from 'react';
import LmsAdminDashboard from './pages/LmsAdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PlacementDashboard from './pages/PlacementDashboard';

const LmsDashboard = ({ user }) => {
  const renderDashboard = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <LmsAdminDashboard user={user} />;
      case 'TRAINER':
        return <TrainerDashboard user={user} />;
      case 'STUDENT':
        return <StudentDashboard user={user} />;
      case 'CORPORATE':
        return <RecruiterDashboard user={user} />;
      case 'PLACEMENT_OFFICER':
        return <PlacementDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderDashboard()}
    </div>
  );
};

export default LmsDashboard;
