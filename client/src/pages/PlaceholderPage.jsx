import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center fade-in-slide-up">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🛠️</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-2 max-w-md">
        This module is currently under construction according to the SRS specifications. 
        Admin controls for this vertical will be functional soon.
      </p>
      <button className="btn-primary mt-6">Return to Overview</button>
    </div>
  );
};

export default PlaceholderPage;
