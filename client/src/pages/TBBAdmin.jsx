import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SkillCoinManagement from './tbb/SkillCoinManagement';
import MembershipManagement from './tbb/MembershipManagement';
import PlaceholderPage from './PlaceholderPage';

const TBBAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="coins" />} />
      <Route path="coins" element={<SkillCoinManagement />} />
      <Route path="membership" element={<MembershipManagement />} />
      <Route path="market" element={<PlaceholderPage title="E-Commerce Marketplace" />} />
      <Route path="mentors" element={<PlaceholderPage title="Mentor Management" />} />
    </Routes>
  );
};

export default TBBAdmin;
