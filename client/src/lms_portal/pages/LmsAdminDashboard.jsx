import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuickActionsPanel from '../components/QuickActionsPanel';
import FilterIntelligence from '../components/FilterIntelligence';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  Settings, 
  ShieldCheck, 
  ArrowUpRight, 
  Database, 
  Layers,
  GraduationCap,
  UserCheck,
  Plus,
  UserPlus
} from 'lucide-react';



const LmsAdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/lms/dashboard/stats?userId=${user?.id}&role=${user?.role}`);
        const data = await res.json();
        if (data.success) setStats(data.stats);
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  const getIcon = (label) => {
    switch (label) {
      case 'Total Programs': return <Layers size={24} />;
      case 'Active Batches': return <BookOpen size={24} />;
      case 'Completion Rate': return <GraduationCap size={24} />;
      case 'Trainer Performance': return <UserCheck size={24} />;
      default: return <BarChart3 size={24} />;
    }
  };

  const getAction = (label) => {
    switch (label) {
      case 'Total Programs': return () => navigate('/lms-dashboard/programs');
      case 'Active Batches': return () => navigate('/lms-dashboard/batches');
      default: return null;
    }
  };
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
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-white rounded-[2.5rem] animate-pulse" />)
        ) : (
          stats.map((stat, i) => (
            <StatCard 
              key={i}
              icon={getIcon(stat.label)} 
              label={stat.label} 
              value={stat.value} 
              trend={stat.trend} 
              color={stat.color}
              bg={stat.bg}
              onClick={getAction(stat.label)}
            />
          ))
        )}
      </div>

      <QuickActionsPanel 
        actions={[
          { label: 'Create Program', icon: <Plus size={18} />, onClick: () => navigate('/lms-dashboard/programs') },
          { label: 'Add Batch', icon: <Layers size={24} />, onClick: () => navigate('/lms-dashboard/batches') },
          { label: 'Assign Trainer', icon: <UserPlus size={18} />, onClick: () => navigate('/lms-dashboard/trainers') },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Program Performance */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">Training Vertical Performance</h2>
           </div>

           <FilterIntelligence role="ADMIN" />

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

const StatCard = ({ icon, label, value, trend, color, bg, onClick }) => (
  <motion.div 
    whileHover={onClick ? { y: -10, scale: 1.02 } : { y: -5 }}
    onClick={onClick}
    className={`bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 transition-all ${onClick ? 'cursor-pointer hover:border-primary/30' : ''}`}
  >
    <div className="flex justify-between items-start mb-8">
      <div className={`p-4 rounded-2xl ${bg} ${color} border border-white shadow-sm`}>
         {icon}
      </div>
      {onClick && (
        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-primary">
          <ArrowUpRight size={16} />
        </div>
      )}
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
