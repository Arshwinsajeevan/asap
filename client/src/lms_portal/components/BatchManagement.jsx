import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  ArrowRight, 
  X, 
  UserPlus, 
  CheckCircle, 
  Clock, 
  BarChart3,
  ArrowLeft,
  Calendar,
  Building2,
  FileCheck,
  User
} from 'lucide-react';

export const BatchManagementView = ({ onSelectBatch, trainers, programs }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetchBatches = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lms/batches');
      const data = await res.json();
      if (data.success) setBatches(data.batches);
    } catch (err) {
      console.error('Failed to fetch batches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Batch <span className="text-primary italic">Command</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Active Training Cohorts Registry</p>
         </div>
         <button 
           onClick={() => setShowCreate(true)}
           className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
         >
            <Plus size={18} /> Deploy New Batch
         </button>
      </div>

      <AnimatePresence>
        {showCreate && (
          <BatchCreateModal 
            onClose={() => setShowCreate(false)} 
            onSuccess={() => { fetchBatches(); setShowCreate(false); }}
            trainers={trainers}
            courses={programs}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {batches.map((batch) => (
          <motion.div 
            key={batch.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onSelectBatch(batch)}
            className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 cursor-pointer group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <Users size={20} />
               </div>
               <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                 batch.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
               }`}>
                 {batch.status}
               </span>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic mb-2 group-hover:text-primary transition-colors">{batch.course_title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">CODE: {batch.batch_code}</p>
            
            <div className="space-y-4 pt-6 border-t border-slate-50">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Trainees Enrolled</span>
                  <span className="text-sm font-black text-slate-900 italic">{batch.trainee_count} / 40</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(batch.trainee_count / 40) * 100}%` }}
                    className="h-full bg-primary rounded-full"
                  />
               </div>
               <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Calendar size={12} /> Starts: {new Date(batch.start_date).toLocaleDateString()}
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const BatchDetailView = ({ batch, onBack }) => {
  const [trainees, setTrainees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssign, setShowAssign] = useState(false);
  const [subView, setSubView] = useState('ROSTER'); // ROSTER, EVALUATION

  const fetchTrainees = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/lms/batches/${batch.id}/trainees`);
      const data = await res.json();
      if (data.success) setTrainees(data.trainees);
    } catch (err) {} 
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/lms/batches/${batch.id}/analytics`);
      const data = await res.json();
      if (data.success) setAnalytics(data);
    } catch (err) {} finally { setLoading(false); }
  };

  useEffect(() => {
    fetchTrainees();
    fetchAnalytics();
  }, [batch.id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Computing Batch Analytics...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
         <button 
           onClick={onBack}
           className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all shadow-sm"
         >
           <ArrowLeft size={16} /> Back to Batches
         </button>
         <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setSubView('ROSTER')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subView === 'ROSTER' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Batch Roster
            </button>
            <button 
              onClick={() => setSubView('EVALUATION')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subView === 'EVALUATION' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Evaluation Intel
            </button>
         </div>
         <button 
           onClick={() => setShowAssign(true)}
           className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
         >
           <UserPlus size={18} /> Bulk Assignment
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {subView === 'ROSTER' ? (
             <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
                <h3 className="text-2xl font-black text-slate-900 italic uppercase mb-8">Cohort Roster</h3>
                <div className="space-y-4">
                   {trainees?.map((t) => (
                     <div key={t.id || Math.random()} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                              <User size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight italic">{t.email?.split('@')[0] || 'Trainee'}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">TAG ID: {t.student_tag_id || 'N/A'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment</p>
                              <p className="text-sm font-black text-emerald-600 italic">{t.payment_status || 'SUCCESS'}</p>
                           </div>
                           <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                              <BarChart3 size={18} />
                           </button>
                        </div>
                     </div>
                   ))}
                   {(!trainees || trainees.length === 0) && (
                     <div className="p-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-[3rem]">
                        <Users size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No Trainees Assigned Yet</p>
                     </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
                <h3 className="text-2xl font-black text-slate-900 italic uppercase mb-8">Performance <span className="text-primary italic">Intelligence</span></h3>
                <div className="space-y-4">
                   {analytics?.trainees?.map((t) => (
                     <div key={t.enrollment_id || Math.random()} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[2.5rem]">
                        <div className="flex items-center gap-6">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic ${t.status === 'PASS' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-rose-50 text-rose-500 border border-rose-100'}`}>
                              {t.finalScore || 0}%
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight italic">{t.email?.split('@')[0] || 'Trainee'}</p>
                              <div className="flex gap-4 mt-1">
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ATT: {Math.round(t.attendancePct || 0)}%</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ASM: {t.assessmentPct || 0}%</p>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${t.status === 'PASS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}>
                              {t.status || 'N/A'}
                           </span>
                           <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                              <FileCheck size={18} />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
              <h3 className="text-xl font-black italic uppercase mb-8">Cohort Intelligence</h3>
              <div className="space-y-8">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">Avg Performance</p>
                    <p className="text-4xl font-black italic">{Math.round(analytics?.summary.avgScore || 0)}%</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                       <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest mb-1 italic">Passed</p>
                       <p className="text-xl font-black italic">{analytics?.summary.passCount || 0}</p>
                    </div>
                    <div className="p-6 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                       <p className="text-[9px] font-black uppercase text-rose-500 tracking-widest mb-1 italic">Retake</p>
                       <p className="text-xl font-black italic">{analytics?.summary.failCount || 0}</p>
                    </div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">Projected Completion</p>
                    <p className="text-sm font-bold italic">June 24, 2026</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">Assessment Readiness</p>
                    <div className="flex items-center gap-3 mt-2">
                       <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-2/3 rounded-full" />
                       </div>
                       <span className="text-[10px] font-black tracking-widest italic">65%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showAssign && (
          <TraineeAssignmentModal 
            batchId={batch.id} 
            onClose={() => setShowAssign(false)} 
            onSuccess={() => { fetchTrainees(); setShowAssign(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TraineeAssignmentModal = ({ batchId, onClose, onSuccess }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/lms/students');
        const data = await res.json();
        if (data.success) setAllStudents(data.students);
      } catch (err) {} finally { setLoading(false); }
    };
    fetchStudents();
  }, []);

  const handleToggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/lms/batches/${batchId}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_ids: selected })
      });
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="px-12 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Bulk <span className="text-primary italic">Enrollment</span></h2>
           <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <X size={18} />
           </button>
        </div>
        <div className="p-12 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
           {allStudents.map(s => (
             <div 
               key={s.id} 
               onClick={() => handleToggle(s.id)}
               className={`flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer ${
                 selected.includes(s.id) ? 'bg-primary/5 border-primary shadow-sm' : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200'
               }`}
             >
                <div className="flex items-center gap-4">
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                     selected.includes(s.id) ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200'
                   }`}>
                      {selected.includes(s.id) && <CheckCircle size={14} />}
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900 tracking-tight italic uppercase">{s.email.split('@')[0]}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{s.student_tag_id}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
        <div className="p-10 border-t border-slate-100 flex gap-6">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={handleSubmit}
             disabled={selected.length === 0}
             className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
           >
             Confirm Enrollment ({selected.length})
           </button>
        </div>
      </motion.div>
    </div>
  );
};

const BatchCreateModal = ({ onClose, onSuccess, trainers, courses }) => {
  const [formData, setFormData] = useState({
    batch_code: '',
    course_id: '',
    trainer_id: '',
    start_date: '',
    mode: 'ONLINE',
    status: 'PLANNED'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/lms/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="px-12 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Deploy <span className="text-primary italic">Batch</span></h2>
           <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <X size={18} />
           </button>
        </div>
        <form onSubmit={handleSubmit} className="p-12 space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Batch Code</label>
              <input required value={formData.batch_code} onChange={e => setFormData({...formData, batch_code: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" placeholder="e.g. B2-PY-2026" />
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Course / Program</label>
                 <select required value={formData.course_id} onChange={e => setFormData({...formData, course_id: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Assign Trainer</label>
                 <select value={formData.trainer_id} onChange={e => setFormData({...formData, trainer_id: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                    <option value="">Select Trainer</option>
                    {trainers.map(t => <option key={t.id} value={t.id}>{t.email}</option>)}
                 </select>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Start Date</label>
                 <input type="date" required value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Mode</label>
                 <select value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                    <option value="ONLINE">ONLINE</option>
                    <option value="OFFLINE">OFFLINE</option>
                 </select>
              </div>
           </div>
           <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
             Launch Batch Instance
           </button>
        </form>
      </motion.div>
    </div>
  );
};
