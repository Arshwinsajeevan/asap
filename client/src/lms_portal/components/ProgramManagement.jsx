import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  BookOpen, 
  X, 
  CheckCircle,
  AlertCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProgramManagementView = ({ programs, trainers, onRefresh }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const handleEdit = (program) => {
    setEditingProgram(program);
    setShowCreate(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Filter programs by name or code..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={() => { setEditingProgram(null); setShowCreate(true); }}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={18} /> Create New Program
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Program Identity</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Timeline & Mode</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Assigned Trainer</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {programs.map((program) => (
              <tr key={program.id} className="group hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/10">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight italic">{program.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CODE: {program.batch_code || 'TBD'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        {program.start_date ? new Date(program.start_date).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                        program.mode === 'ONLINE' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {program.mode || 'ONLINE'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{program.trainer_email || 'Not Assigned'}</span>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    program.batch_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    program.batch_status === 'COMPLETED' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {program.batch_status || 'DRAFT'}
                  </span>
                </td>
                <td className="px-8 py-8 text-right">
                  <button 
                    onClick={() => handleEdit(program)}
                    className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showCreate && (
          <ProgramCreateModal 
            onClose={() => setShowCreate(false)} 
            trainers={trainers} 
            onSuccess={() => { onRefresh(); setShowCreate(false); }}
            editingProgram={editingProgram}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProgramCreateModal = ({ onClose, trainers, onSuccess, editingProgram }) => {
  const [formData, setFormData] = useState(editingProgram ? {
    ...editingProgram,
    sector: editingProgram.metadata?.sector || '',
    nsqf: editingProgram.metadata?.nsqf || '',
    trainer_id: editingProgram.trainer_id || ''
  } : {
    title: '',
    duration_hours: 40,
    fee: 0,
    level: 'Intermediate',
    skills: '',
    objectives: '',
    sector: '',
    nsqf: '',
    mode: 'ONLINE',
    start_date: '',
    end_date: '',
    trainer_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProgram 
        ? `http://localhost:5000/api/lms/programs/${editingProgram.id}`
        : 'http://localhost:5000/api/lms/programs';
      
      const res = await fetch(url, {
        method: editingProgram ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()) : formData.skills
        })
      });
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (err) {
      console.error('Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-12 py-8 bg-slate-50 border-b border-slate-100">
           <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
                {editingProgram ? 'Update' : 'Configure'} <span className="text-primary italic">Program</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Intelligence Layer Setup</p>
           </div>
           <button onClick={onClose} className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Program Title</label>
                 <input 
                   required
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary transition-all outline-none"
                   placeholder="e.g. Data Analytics Professional"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Delivery Mode</label>
                 <select 
                   value={formData.mode}
                   onChange={e => setFormData({...formData, mode: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary transition-all outline-none appearance-none"
                 >
                    <option value="ONLINE">ONLINE (Synchronous)</option>
                    <option value="OFFLINE">OFFLINE (Physical)</option>
                    <option value="HYBRID">HYBRID (Blended)</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Level</label>
                 <input 
                   value={formData.level}
                   onChange={e => setFormData({...formData, level: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                   placeholder="e.g. Advanced"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Duration (Hours)</label>
                 <input 
                   type="number"
                   value={formData.duration_hours}
                   onChange={e => setFormData({...formData, duration_hours: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Assign Trainer</label>
                 <select 
                   value={formData.trainer_id}
                   onChange={e => setFormData({...formData, trainer_id: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary transition-all outline-none appearance-none"
                 >
                    <option value="">Select Instructor</option>
                    {trainers.map(t => (
                      <option key={t.id} value={t.id}>{t.email}</option>
                    ))}
                 </select>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Skills Covered (Comma separated)</label>
              <input 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                placeholder="Python, AWS, React, DevOps"
              />
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sector</label>
                 <input 
                   value={formData.sector}
                   onChange={e => setFormData({...formData, sector: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                   placeholder="e.g. Information Technology"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">NSQF / SSC Code</label>
                 <input 
                   value={formData.nsqf}
                   onChange={e => setFormData({...formData, nsqf: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                   placeholder="e.g. L4-IT-ASAP"
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                onClick={onClose}
                className="w-full py-5 bg-slate-100 text-slate-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Discard Changes
              </button>
              <button 
                type="submit"
                className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                {editingProgram ? 'Update Program Matrix' : 'Deploy Program Instance'} <ArrowRight size={16} />
              </button>
           </div>
        </form>
      </motion.div>
    </div>
  );
};
