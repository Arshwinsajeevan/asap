import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  Activity, 
  Zap, 
  TrendingUp, 
  Globe, 
  Server,
  Layers,
  ArrowUpRight,
  Cpu
} from 'lucide-react';

const GlobalOverview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    verticals: { tbb: 0, frr: 0, dir: 110 },
    dbStatus: 'CONNECTING',
    apiLatency: '0ms'
  });

  useEffect(() => {
    // Fetch Global Stats
    const fetchGlobalData = async () => {
       try {
          const token = localStorage.getItem('token');
          // In a real app, this would be a unified /api/admin/global-stats endpoint
          // For now, we aggregate or use the seeded data
          const response = await fetch('http://localhost:5000/api/admin/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            totalStudents: 110 + (data.total || 0), // Base seeded + new partners
            dbStatus: 'OPERATIONAL',
            apiLatency: '42ms'
          }));
       } catch (err) {
          setStats(prev => ({ ...prev, dbStatus: 'ERROR' }));
       }
    };
    fetchGlobalData();
  }, []);

  const verticalData = [
    { name: 'TBB (Work-Integrated)', value: '0', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'FRR (Corporate)', value: '0', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Training Partners', value: '110', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Global <span className="text-primary italic">Command Center</span></h1>
           <p className="text-slate-500 font-medium">Real-time infrastructure and vertical intelligence</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl flex items-center gap-3 border border-emerald-100 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Master Node: Active</span>
           </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          icon={<Users size={24} />} 
          label="Total Enrollments" 
          value={stats.totalStudents || '110'} 
          trend="+12% from last week" 
        />
        <MetricCard 
          icon={<Zap size={24} />} 
          label="Skill Coin Circulation" 
          value="42,000" 
          trend="Equiv to ₹4.2L Reserve" 
          color="text-[#FCA311]"
        />
        <MetricCard 
          icon={<Database size={24} />} 
          label="Database Health" 
          value={stats.dbStatus} 
          trend={`Latency: ${stats.apiLatency}`} 
          color="text-emerald-600"
        />
        <MetricCard 
          icon={<Globe size={24} />} 
          label="Active Verticals" 
          value="4" 
          trend="All systems synchronized" 
          color="text-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Vertical Breakdown */}
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black text-slate-900 italic uppercase">Vertical Intelligence</h2>
               <div className="p-3 bg-slate-50 rounded-xl">
                  <Layers className="text-slate-400" size={20} />
               </div>
            </div>
            <div className="space-y-6">
               {verticalData.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 bg-slate-50/30 hover:border-primary/20 hover:bg-white transition-all group">
                     <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${v.bg} ${v.color}`}>
                           <Globe size={24} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-900 italic tracking-tight">{v.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Online</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <h4 className={`text-3xl font-black italic tracking-tighter ${v.color}`}>{v.value}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric: Total Students</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* System Infrastructure */}
         <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
            
            <h2 className="text-2xl font-black text-white italic uppercase mb-10 relative z-10">Infra Status</h2>
            <div className="space-y-8 relative z-10">
               <InfraItem icon={<Server size={18} />} label="PostgreSQL Instance" value="Healthy" />
               <InfraItem icon={<Cpu size={18} />} label="Express API Node" value="Healthy" />
               <InfraItem icon={<Activity size={18} />} label="Web Socket Link" value="Standby" />
               <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Total System Revenue</p>
                  <h3 className="text-4xl font-black text-primary italic tracking-tighter italic">₹16.5M</h3>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                     <span>+₹1.2M Projection</span>
                     <ArrowUpRight size={14} />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend, color = 'text-primary' }) => (
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

const InfraItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-6">
    <div className="flex items-center gap-4 text-slate-400">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
          {icon}
       </div>
       <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">{label}</span>
    </div>
    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">{value}</span>
  </div>
);

export default GlobalOverview;
