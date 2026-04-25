import React from 'react';
import { Users, GraduationCap, Briefcase, Search, Filter, ArrowUpRight, CheckCircle, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const PlacementDashboard = () => {
  const eligibleTrainees = [
    { name: 'Arshwin S.', course: 'Cloud Computing', score: 92, status: 'MATCHED' },
    { name: 'Meera Nair', course: 'UI/UX Design', score: 88, status: 'INTERVIEWING' },
    { name: 'Rahul Das', course: 'Full Stack', score: 85, status: 'ELIGIBLE' },
    { name: 'Sreya P.', course: 'Data Analytics', score: 94, status: 'PLACED' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Placement <span className="text-primary italic">Intelligence</span></h1>
        <p className="text-slate-500 font-medium">Matching certified talent with global career opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={<GraduationCap size={24} />} label="Total Graduates" value="1,240" trend="+15% this month" />
        <StatCard icon={<Target size={24} />} label="Job Matches" value="458" trend="85% Success Rate" color="text-emerald-600" />
        <StatCard icon={<Briefcase size={24} />} label="Active Openings" value="82" trend="12 New Today" color="text-amber-600" />
        <StatCard icon={<Users size={24} />} label="In Pipeline" value="320" trend="Awaiting Interview" color="text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">Talent Matching Queue</h2>
              <div className="flex gap-4">
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search skills..." className="pl-12 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-primary/30" />
                 </div>
                 <button className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-primary transition-all">
                    <Filter size={20} />
                 </button>
              </div>
           </div>

           <div className="space-y-4">
              {eligibleTrainees.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black italic">
                        {t.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 uppercase tracking-tight">{t.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                          {t.course} • Score: {t.score}%
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-10">
                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        t.status === 'PLACED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        t.status === 'MATCHED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {t.status}
                      </div>
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
           <h2 className="text-2xl font-black italic uppercase mb-10">Recruitment Analytics</h2>
           <div className="space-y-8">
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Corporate Satisfaction</span>
                    <span className="text-emerald-400">High</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-lg p-1">
                    <div className="h-full bg-emerald-500/50 rounded-md" style={{ width: '95%' }} />
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Skills GAP</span>
                    <span className="text-amber-400">Moderate</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-lg p-1">
                    <div className="h-full bg-amber-500/50 rounded-md" style={{ width: '42%' }} />
                 </div>
              </div>

              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 italic">Next Hiring Drive</p>
                 <h3 className="text-2xl font-black text-primary italic tracking-tight italic">TCS Smart Hiring</h3>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Date: 15 May 2026</p>
                 <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all">
                    Register Batch
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, color = 'text-primary' }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20"
  >
    <div className={`p-4 rounded-2xl bg-slate-50 w-fit mb-8 ${color}`}>
       {icon}
    </div>
    <div className="space-y-1">
       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
       <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{value}</h3>
       <p className="text-[10px] font-bold text-slate-400 mt-4 leading-relaxed">{trend}</p>
    </div>
  </motion.div>
);

export default PlacementDashboard;
