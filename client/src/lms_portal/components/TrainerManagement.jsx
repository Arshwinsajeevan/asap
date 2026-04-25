import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Star, 
  IndianRupee, 
  Layers, 
  ArrowLeft, 
  ArrowRight,
  GraduationCap, 
  CheckCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  Award,
  MoreHorizontal
} from 'lucide-react';

export const TrainerManagementView = ({ onSelectTrainer }) => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/lms/trainers');
        const data = await res.json();
        if (data.success) setTrainers(data.trainers);
      } catch (err) {} finally { setLoading(false); }
    };
    fetchTrainers();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center animate-pulse text-slate-400 font-black uppercase text-[10px] tracking-widest italic">Synchronizing Faculty Registry...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Faculty <span className="text-primary italic">Intelligence</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Expert Resource Management & Performance Audit</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <motion.div 
            key={trainer.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onSelectTrainer(trainer)}
            className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 cursor-pointer group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all overflow-hidden border border-slate-100">
                  <User size={28} />
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                     <Star size={14} fill="currentColor" />
                     <span className="text-sm font-black italic">{parseFloat(trainer.avg_rating).toFixed(1)}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Global Rating</span>
               </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic mb-2 group-hover:text-primary transition-colors">{trainer.email.split('@')[0]}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">{trainer.qualifications || 'Certified Professional'}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
               <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Active Cohorts</p>
                  <p className="text-lg font-black text-slate-900 italic">{trainer.active_batches || 0}</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Total Earnings</p>
                  <p className="text-lg font-black text-emerald-600 italic">₹{parseInt(trainer.total_payout).toLocaleString()}</p>
               </div>
            </div>
          </motion.div>
        ))}
        {trainers.length === 0 && (
          <div className="col-span-full p-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-[3rem]">
             <User size={48} className="mx-auto mb-4 opacity-20" />
             <p className="text-[10px] font-black uppercase tracking-widest">No Faculty Members Found in Registry</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const TrainerDetailView = ({ trainer, onBack }) => {
  const [details, setDetails] = useState({ batches: [], payouts: [], feedbacks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd have a dedicated GET /trainers/:id detail endpoint
    // For now we'll simulate it since we already have core trainer stats
    setLoading(false);
  }, [trainer.id]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
         <button 
           onClick={onBack}
           className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all shadow-sm"
         >
           <ArrowLeft size={16} /> Back to Faculty
         </button>
         <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">Audit Record</button>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Update Profile</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Performance Hub */}
           <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black text-slate-900 italic uppercase">Academic Portfolio</h3>
                 <div className="flex items-center gap-6">
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Experience</p>
                       <p className="text-lg font-black text-slate-900 italic">{trainer.experience_years || 5}+ Yrs</p>
                    </div>
                    <div className="w-[1px] h-10 bg-slate-100" />
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Compliance</p>
                       <p className="text-lg font-black text-emerald-500 italic">100%</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem]">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 italic">Active Assignments</h4>
                    <div className="space-y-4">
                       {[1, 2].map(i => (
                         <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                  <Layers size={18} />
                               </div>
                               <div>
                                  <p className="text-sm font-black italic">B-PY-202{i} • Python Fullstack</p>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">42 Active Trainees</p>
                               </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-200" />
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 italic">Recent Faculty Feedback</h4>
                    <div className="space-y-4">
                       <div className="p-6 bg-slate-50 rounded-2xl">
                          <div className="flex items-center gap-1 text-amber-500 mb-2">
                             <Star size={12} fill="currentColor" />
                             <Star size={12} fill="currentColor" />
                             <Star size={12} fill="currentColor" />
                             <Star size={12} fill="currentColor" />
                             <Star size={12} fill="currentColor" />
                          </div>
                          <p className="text-sm font-medium italic text-slate-600">"Excellent delivery of complex concepts. The hands-on sessions were highly effective."</p>
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-3">— Student from Batch B-PY-2024</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           {/* Financial Audit */}
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black italic uppercase italic">Payroll Intelligence</h3>
                 <IndianRupee className="text-primary opacity-20" size={32} />
              </div>
              
              <div className="space-y-8">
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">Global Payout to Date</p>
                    <p className="text-4xl font-black italic tracking-tighter">₹{parseInt(trainer.total_payout).toLocaleString()}</p>
                 </div>

                 <div className="space-y-4 pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Payout</span>
                       <span className="text-sm font-bold italic">₹42,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Commission Accrued</span>
                       <span className="text-sm font-bold italic text-emerald-400">₹8,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Cycle</span>
                       <span className="text-sm font-bold italic">May 05, 2026</span>
                    </div>
                 </div>

                 <button className="w-full mt-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    View Complete Ledger
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/20">
              <h3 className="text-xl font-black italic uppercase mb-8">Certifications</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700">
                    <Award size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">NSQF Level 6 Certified</span>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700">
                    <Award size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Adobe Creative Expert</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
