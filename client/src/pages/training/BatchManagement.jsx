import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, MapPin } from 'lucide-react';

const BatchManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/training/batches')
      .then(res => res.json())
      .then(data => {
        setBatches(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="fade-in-slide-up">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="section-title">Batch Management</h2>
          <p className="text-slate-500">Plan and track training deliveries across all verticals.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Create New Batch
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Batch ID, Course, or Trainer..." 
            className="input-field pl-10"
          />
        </div>
        <select className="input-field w-48">
          <option>All Modes</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Hybrid</option>
        </select>
      </div>

      {/* Batch Grid */}
      {loading ? (
        <div className="flex justify-center p-20 text-slate-400 font-bold animate-pulse">
          Fetching Batch Live Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="card-premium">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-1 rounded uppercase tracking-wider">
                  {batch.batch_code || batch.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  batch.enrolled >= batch.capacity ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {batch.enrolled >= batch.capacity ? 'Full' : 'Enrollment Open'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{batch.courseTitle || batch.course}</h3>
              
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span>Trainer: <strong className="text-slate-900">{batch.trainerName || batch.trainer}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Starts on: <strong>{new Date(batch.start_date).toLocaleDateString()}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" />
                  <span>Mode: <strong>{batch.mode}</strong></span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Enrollment</span>
                  <span>{batch.enrolled || 0} / {batch.capacity}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FF6900] h-full transition-all duration-500" 
                    style={{ width: `${((batch.enrolled || 0) / batch.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full py-2 text-sm font-bold text-[#00B4D8] hover:bg-[#00B4D8]/5 rounded-lg border border-[#00B4D8]/30 transition-colors">
                Manage Batch Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Basic Modal Implementation (Functional logic pending) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-8 shadow-2xl scale-100 transition-all">
            <h3 className="text-2xl font-bold mb-2">Create New Batch</h3>
            <p className="text-slate-500 mb-6">Enter batch details to initialize training delivery.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Course Selection</label>
                <select className="input-field">
                  <option>Select a course...</option>
                  <option>Full Stack Development</option>
                  <option>Cloud Architecture</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Start Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Mode</label>
                  <select className="input-field">
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Allocated Trainer</label>
                <input type="text" className="input-field" placeholder="Search verified trainers..." />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 btn-primary justify-center">
                Create Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;
