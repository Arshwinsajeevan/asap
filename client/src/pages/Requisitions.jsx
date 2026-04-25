import React, { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Clock, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Requisitions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const requisitions = [
    { id: 'REQ-001', course: 'Artificial Intelligence & ML', slots: 50, date: '2026-04-10', status: 'Approved' },
    { id: 'REQ-002', course: 'Robotics Process Automation', slots: 30, date: '2026-04-12', status: 'Pending' },
    { id: 'REQ-003', course: 'Data Analytics with Python', slots: 40, date: '2026-04-14', status: 'Rejected' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Course Requisitions</h2>
          <p className="text-slate-500 mt-2 font-medium">Request new courses or additional student targets for your center.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> New Requisition
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search requisitions..."
                className="input-field pl-10 pr-4 py-2 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:border-primary transition-all">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-5">ID</th>
                <th className="px-8 py-5">Course Name</th>
                <th className="px-8 py-5">Target Slots</th>
                <th className="px-8 py-5">Request Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requisitions.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-black text-[10px] tracking-widest text-primary">{req.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-white">
                        <BookOpen size={18} />
                      </div>
                      <span className="font-bold text-text uppercase italic tracking-tight">{req.course}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-text font-black italic">{req.slots} <span className="text-slate-400 not-italic font-medium text-xs ml-1 lowercase">students</span></span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={14} className="text-primary" />
                      {req.date}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-500 border-rose-100'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-primary hover:text-primary-dark text-[10px] font-black uppercase tracking-widest">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* New Requisition Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 border border-border shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <FileText className="text-emerald-500" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">Course Requisition</h3>
                  <p className="text-slate-500 text-sm font-medium">Submit a new course requisition for approval.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Name</label>
                    <select className="input-field py-3 font-black text-xs uppercase tracking-widest">
                      <option>Python Full Stack Development</option>
                      <option>AI & Machine Learning</option>
                      <option>Robotics & Automation</option>
                      <option>Cloud Computing (AWS/Azure)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Batch Size</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 30"
                      className="input-field py-3 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Start Date</label>
                    <input 
                      type="date" 
                      className="input-field py-3 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Training Mode</label>
                    <select className="input-field py-3 font-black text-xs uppercase tracking-widest">
                      <option>Offline (at Skill Park)</option>
                      <option>Online / Virtual</option>
                      <option>Blended Learning</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Requirements (Optional)</label>
                  <textarea 
                    rows="3"
                    placeholder="Specific lab infrastructure or trainer requirements..."
                    className="input-field py-3 font-medium"
                  ></textarea>
                </div>

                <div className="pt-8 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-border"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-accent px-12 py-3 shadow-lg shadow-primary/20 text-[10px] font-black uppercase tracking-widest"
                  >
                    Submit Requisition
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Requisitions;
