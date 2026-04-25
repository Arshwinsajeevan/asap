import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import CentreProfile from './CentreProfile';
import Requisitions from './Requisitions';
import Inspections from './Inspections';
import Payments from './Payments';
import Students from './Students';
import Batches from './Batches';
import Trainers from './Trainers';
import LiveTracking from './LiveTracking';
import Assessments from './Assessments';
import Results from './Results';
import Reports from './Reports';
import Invoicing from './Invoicing';
import Awards from './Awards';
import Settlements from './Settlements';
import Scholarships from './Scholarships';

import Onboarding from './Onboarding';

const PartnersZone = ({ status }) => {
  return (
    <div className="page-transition">
      <Onboarding partnerStatus={status}>
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<CentreProfile />} />
          <Route path="requisitions" element={<Requisitions />} />
          <Route path="inspections" element={<Inspections />} />
          <Route path="payments" element={<Payments />} />
          <Route path="students" element={<Students />} />
          <Route path="batches" element={<Batches />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="live-tracking" element={<LiveTracking />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="results" element={<Results />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoicing" element={<Invoicing />} />
          <Route path="awards" element={<Awards />} />
          <Route path="settlements" element={<Settlements />} />
          <Route path="scholarships" element={<Scholarships />} />
        </Routes>
      </Onboarding>
    </div>
  );
};

export default PartnersZone;


