import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  X, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  User, 
  ArrowRight,
  MoreVertical,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';

export const SessionCalendarView = ({ sessions, onRefresh, trainers, batches }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Academic <span className="text-primary italic">Timeline</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Global Session Scheduler & Monitoring</p>
         </div>
         <button 
           onClick={() => setShowCreate(true)}
           className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
         >
            <Plus size={18} /> Schedule Session
         </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="group flex items-center justify-between p-8 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-xl transition-all">
             <div className="flex items-center gap-10">
                <div className="w-20 text-center border-r border-slate-100 pr-10">
                   <p className="text-2xl font-black text-slate-900 italic">{new Date(session.scheduled_at).getDate()}</p>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{new Date(session.scheduled_at).toLocaleString('default', { month: 'short' })}</p>
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        session.session_type === 'ONLINE' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                         {session.session_type}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">{session.topic_name}</h4>
                   </div>
                   <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Clock size={12} /> {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flex items-center gap-2"><Calendar size={12} /> {session.batch_code}</span>
                      <span className="flex items-center gap-2"><User size={12} /> {session.teacher_email || 'TBD'}</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-6">
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  session.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-primary/5 text-primary border-primary/10'
                }`}>
                  {session.status}
                </div>
                <button 
                  onClick={() => { setSelectedSession(session); setShowAttendance(true); }}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                >
                  Mark Attendance
                </button>
             </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && (
          <SessionCreateModal 
            onClose={() => setShowCreate(false)} 
            onSuccess={() => { onRefresh(); setShowCreate(false); }}
            trainers={trainers}
            batches={batches}
          />
        )}
        {showAttendance && (
          <AttendanceModal 
            session={selectedSession} 
            onClose={() => setShowAttendance(false)} 
            onSuccess={() => { onRefresh(); setShowAttendance(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SessionCreateModal = ({ onClose, onSuccess, trainers, batches }) => {
  const [formData, setFormData] = useState({
    batch_id: '',
    topic_name: '',
    teacher_id: '',
    scheduled_at: '',
    session_type: 'ONLINE'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/lms/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="px-12 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Schedule <span className="text-primary italic">Session</span></h2>
           <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <X size={18} />
           </button>
        </div>
        <form onSubmit={handleSubmit} className="p-12 space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Target Batch</label>
              <select required value={formData.batch_id} onChange={e => setFormData({...formData, batch_id: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                 <option value="">Select Cohort</option>
                 {batches.map(b => <option key={b.id} value={b.id}>{b.batch_code} - {b.course_title}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Topic / Agenda</label>
              <input required value={formData.topic_name} onChange={e => setFormData({...formData, topic_name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" placeholder="e.g. Introduction to React Hooks" />
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Instructor</label>
                 <select value={formData.teacher_id} onChange={e => setFormData({...formData, teacher_id: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                    <option value="">Select Teacher</option>
                    {trainers.map(t => <option key={t.id} value={t.id}>{t.email}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Mode</label>
                 <select value={formData.session_type} onChange={e => setFormData({...formData, session_type: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none">
                    <option value="ONLINE">ONLINE</option>
                    <option value="OFFLINE">OFFLINE</option>
                 </select>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Schedule Time</label>
              <input type="datetime-local" required value={formData.scheduled_at} onChange={e => setFormData({...formData, scheduled_at: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
           </div>
           <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
             Commit to Timeline
           </button>
        </form>
      </motion.div>
    </div>
  );
};

const AttendanceModal = ({ session, onClose, onSuccess }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/lms/sessions/${session.id}/attendance`);
        const data = await res.json();
        if (data.success) setList(data.attendance.map(a => ({ ...a, status: a.attendance_status || 'PRESENT' })));
      } catch (err) {} finally { setLoading(false); }
    };
    fetchList();
  }, [session.id]);

  const toggleStatus = (enrollment_id) => {
    setList(prev => prev.map(item => 
      item.enrollment_id === enrollment_id 
        ? { ...item, status: item.status === 'PRESENT' ? 'ABSENT' : 'PRESENT' } 
        : item
    ));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/lms/sessions/${session.id}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marks: list.map(item => ({ enrollment_id: item.enrollment_id, status: item.status })) })
      });
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="px-12 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Mark <span className="text-primary italic">Attendance</span></h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{session.topic_name} • {session.batch_code}</p>
           </div>
           <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <X size={18} />
           </button>
        </div>
        <div className="p-12 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
           {list.map(item => (
             <div key={item.enrollment_id} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all ${item.status === 'PRESENT' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                      {item.status === 'PRESENT' ? <Check size={18} /> : <X size={18} />}
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight italic">{item.email.split('@')[0]}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{item.student_tag_id}</p>
                   </div>
                </div>
                <button 
                  onClick={() => toggleStatus(item.enrollment_id)}
                  className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                    item.status === 'PRESENT' ? 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50' : 'bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-50'
                  }`}
                >
                  Mark {item.status === 'PRESENT' ? 'Absent' : 'Present'}
                </button>
             </div>
           ))}
        </div>
        <div className="p-10 border-t border-slate-100 flex gap-6">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Discard</button>
           <button onClick={handleSubmit} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
             Submit Attendance Registry
           </button>
        </div>
      </motion.div>
    </div>
  );
};
