import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 rounded-full blur-3xl -mr-16 -mt-16`} />
    <div className="flex items-center justify-between mb-6">
      <div className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center border border-${color}-500/20`}>
        <Icon className={`text-${color}-400`} size={28} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</span>
      <span className="text-4xl font-black text-white tracking-tighter italic">{value}</span>
    </div>
  </motion.div>
);

const LmsAdminDashboard = () => {
  const stats = [
    { title: 'Global Programs', value: '42', icon: BookOpen, trend: '+12%', color: 'blue' },
    { title: 'Active Trainers', value: '156', icon: Users, trend: '+8%', color: 'cyan' },
    { title: 'Total Trainees', value: '2.4k', icon: GraduationCap, trend: '+24%', color: 'indigo' },
    { title: 'Daily Sessions', value: '89', icon: Calendar, trend: '+5%', color: 'emerald' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Command <span className="text-blue-500">Center</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time infrastructure analytics for ASAP Kerala</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Active Training Batches</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Live monitoring across all verticals</p>
              </div>
              <button className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 px-6 py-3 rounded-2xl border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
                View All <ArrowUpRight size={14} />
              </button>
           </div>

           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group flex items-center justify-between p-6 bg-slate-800/30 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center font-black text-white italic border border-white/5">
                        TBB
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase tracking-tight">Cloud Computing Foundation v{i}</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Batch Code: BATCH-00{i} • Trainer: Dr. Arjun K.</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-10">
                      <div className="flex flex-col items-end">
                         <span className="text-xs font-black text-white tracking-tighter italic">85% Progress</span>
                         <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                         </div>
                      </div>
                      <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
           <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8">System Health</h2>
           <div className="space-y-8">
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Server Load</span>
                    <span className="text-cyan-400">Normal</span>
                 </div>
                 <div className="h-4 bg-slate-800 rounded-lg p-1">
                    <div className="h-full bg-cyan-500/50 rounded-md" style={{ width: '45%' }} />
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>DB Integrity</span>
                    <span className="text-emerald-400">Verified</span>
                 </div>
                 <div className="h-4 bg-slate-800 rounded-lg p-1">
                    <div className="h-full bg-emerald-500/50 rounded-md" style={{ width: '92%' }} />
                 </div>
              </div>
              <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/20 rounded-[2rem]">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Automated Report</p>
                 <p className="text-xs text-slate-300 font-bold leading-relaxed">
                   System optimization complete. All 42 training programs are synchronized with the Finance Module.
                 </p>
                 <button className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20">
                    Run Diagnostic
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Mocking GraduationCap for local use
const GraduationCap = (props) => <BookOpen {...props} />;

export default LmsAdminDashboard;
