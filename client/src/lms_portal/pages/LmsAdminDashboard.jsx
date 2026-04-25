import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  Settings, 
  ShieldCheck, 
  ArrowUpRight, 
  Database, 
  Layers,
  GraduationCap
} from 'lucide-react';

const LmsAdminDashboard = () => {
  const programs = [
    { name: 'ASAP Skill Combo', students: 1240, status: 'ACTIVE', revenue: '₹4.2L' },
    { name: 'KASE Integrated', students: 850, status: 'PLANNING', revenue: '₹2.8L' },
    { name: 'Vocational High School', students: 3200, status: 'ACTIVE', revenue: '₹12.5L' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">LMS <span className="text-primary italic">Admin Control</span></h1>
        <p className="text-slate-500 font-medium tracking-tight">System-wide monitoring of academic and training operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard icon={<Layers size={24} />} label="Active Programs" value="24" trend="12,500 Total Seats" color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={<GraduationCap size={24} />} label="Total Trainees" value="8.4K" trend="+240 New this week" color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard icon={<Users size={24} />} label="Empaneled Trainers" value="184" trend="98% Certification Level" color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={<Database size={24} />} label="Resource Health" value="100%" trend="Cloud Sync Active" color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Program Performance */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">Training Vertical Performance</h2>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:text-primary transition-all font-black text-[10px] uppercase tracking-widest">
                 Export Report <ArrowUpRight size={14} />
              </button>
           </div>

           <div className="space-y-4">
              {programs.map((program, i) => (
                <div key={i} className="group flex items-center justify-between p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                   <div className="flex items-center gap-8">
                      <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                         <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{program.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">
                          {program.students} Enrolled • Avg Score: 84%
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-12">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                         <p className="text-xl font-black text-slate-900 italic tracking-tighter">{program.revenue}</p>
                      </div>
                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        program.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {program.status}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* System Logs & Security */}
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
           <h2 className="text-2xl font-black italic uppercase mb-10">Governance Logs</h2>
           
           <div className="space-y-6">
              <LogItem icon={<ShieldCheck size={18} />} label="Security Audit" time="2 hours ago" status="CLEAN" />
              <LogItem icon={<BarChart3 size={18} />} label="Stats Sync" time="4 hours ago" status="COMPLETE" />
              <LogItem icon={<Settings size={18} />} label="System Patch" time="1 day ago" status="v2.4.1" />
              
              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 italic">Next Scheduled Maintenance</p>
                 <h3 className="text-2xl font-black text-primary italic tracking-tight italic">Global Backup</h3>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Sunday • 02:00 AM IST</p>
                 <button className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                    System Control
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, color, bg }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20"
  >
    <div className={`p-4 rounded-2xl ${bg} ${color} w-fit mb-8 border border-white shadow-sm`}>
       {icon}
    </div>
    <div className="space-y-1">
       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
       <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">{value}</h3>
       <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-wider italic">{trend}</p>
    </div>
  </motion.div>
);

const LogItem = ({ icon, label, time, status }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-6">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-primary">
          {icon}
       </div>
       <div>
          <p className="text-sm font-bold tracking-tight italic">{label}</p>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{time}</p>
       </div>
    </div>
    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">{status}</span>
  </div>
);

export default LmsAdminDashboard;
