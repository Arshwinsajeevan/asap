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
        return <LmsAdminDashboard />;
      case 'TRAINER':
        return <TrainerDashboard />;
      case 'STUDENT':
        return <StudentDashboard />;
      case 'CORPORATE':
        return <RecruiterDashboard />;
      case 'PLACEMENT_OFFICER':
        return <PlacementDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderDashboard()}
    </div>
  );
};

export default LmsDashboard;
