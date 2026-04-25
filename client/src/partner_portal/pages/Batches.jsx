import React, { useState, useEffect } from 'react';
import { LayoutGrid, Plus, Search, Calendar, Users, Clock, ArrowRight, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/partners/batches', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        const mapped = data.map(b => ({
          id: b.id.substring(0, 8).toUpperCase(),
          name: b.name,
          course: b.course.title,
          students: b._count.enrollments,
          maxStudents: 30, // Default for now
          startDate: b.startDate ? new Date(b.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending',
          progress: b.status === 'ACTIVE' ? 35 : 0, // Mock progress if active
          status: b.status.toLowerCase()
        }));
        setBatches(mapped);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const [activeTab, setActiveTab] = useState('All Batches');

  const filteredBatches = batches.filter(batch => {
    if (activeTab === 'All Batches') return true;
    return batch.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Training Batches</h2>
          <p className="text-slate-500 mt-2 font-medium">Create and track training batches, schedules and class progress.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Create New Batch
        </button>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        {['All Batches', 'Active', 'Upcoming', 'Completed'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === tab ? 'bg-white text-primary shadow-sm border border-border' : 'text-slate-400 hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="w-12 h-12 text-primary animate-spin" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Retrieving Training Batches...</p>
          </div>
        ) : filteredBatches.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <LayoutGrid className="text-primary/30" size={40} />
             </div>
             <p className="text-lg font-black text-slate-400 uppercase italic tracking-tight">No {activeTab} Found</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Start by creating a new training batch</p>
          </div>
        ) : (
          filteredBatches.map((batch) => (
            <div key={batch.id} className="card-premium flex flex-col group hover:border-primary/50 transition-all duration-500 bg-white shadow-sm overflow-hidden">
              <div className="p-8 space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    batch.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    batch.status === 'completed' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-primary/5 text-primary border-primary/10'
                  }`}>
                    {batch.status}
                  </span>
                  <span className="text-slate-400 text-[10px] font-black tracking-[0.2em]">{batch.id}</span>
                </div>
                
                <div>
                  <h4 className="text-xl font-black text-text group-hover:text-primary transition-colors uppercase italic leading-tight tracking-tight">{batch.name}</h4>
                  <p className="text-slate-500 text-xs font-medium mt-1.5">{batch.course}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-50">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Users size={14} />
                      <span>Students</span>
                    </div>
                    <p className="text-text font-black italic">{batch.students} <span className="text-slate-300 font-medium not-italic">/ {batch.maxStudents}</span></p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Calendar size={14} />
                      <span>Starts</span>
                    </div>
                    <p className="text-text font-black italic">{batch.startDate}</p>
                  </div>
                </div>

                {(batch.status === 'active' || batch.status === 'completed') && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="text-primary">{batch.status === 'completed' ? 100 : batch.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className={`h-full ${batch.status === 'completed' ? 'bg-emerald-500' : 'bg-primary'} rounded-full shadow-[0_0_10px_rgba(0,180,216,0.2)]`}
                        style={{ width: `${batch.status === 'completed' ? 100 : batch.progress}%` }} 
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-8 py-5 bg-slate-50/50 border-t border-border flex justify-between items-center group-hover:bg-primary/5 transition-all">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <Clock size={14} className="text-primary" />
                  <span>Next class: Mon, 10:00 AM</span>
                </div>
                <button className="text-primary flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
                  Track
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 border border-border shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <Calendar className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">New Batch Request</h3>
                  <p className="text-slate-500 text-sm font-medium">Request a new batch commencement for approved courses.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Course</label>
                  <select className="input-field py-3 font-black uppercase text-xs tracking-widest">
                    <option>Python Full Stack Development</option>
                    <option>Data Analytics & Visualization</option>
                    <option>Digital Marketing Advanced</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planned Start Date</label>
                    <input type="date" className="input-field py-3 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Capacity</label>
                    <input type="number" defaultValue="30" className="input-field py-3 font-bold" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button onClick={() => setIsModalOpen(false)} type="button" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-border">Cancel</button>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setToast("Batch request submitted for head office approval!");
                      setTimeout(() => setToast(null), 5000);
                    }} 
                    type="button" 
                    className="btn-accent px-10 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/20"
                  >
                    Submit Request <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 20 }}
            className="fixed bottom-10 right-10 z-[100] bg-primary text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 italic">Submitted</p>
              <p className="font-bold text-sm">{toast}</p>
            </div>
            <button onClick={() => setToast(null)} className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Batches;
