import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BatchManagement from './training/BatchManagement';
import PlaceholderPage from './PlaceholderPage';

const TrainingAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="batches" />} />
      <Route path="batches" element={<BatchManagement />} />
      <Route path="courses" element={<PlaceholderPage title="Course Frameworks" />} />
      <Route path="assessments" element={<PlaceholderPage title="Assessment Management" />} />
    </Routes>
  );
};

export default TrainingAdmin;
