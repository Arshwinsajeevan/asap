import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuickActionsPanel from '../components/QuickActionsPanel';
import { 
  Users, 
  Video, 
  FileCheck, 
  Calendar, 
  MessageSquare, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const TrainerDashboard = ({ user }) => {
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
      case 'Sessions Today': return <Video size={24} />;
      case 'Total Trainees': return <Users size={24} />;
      case 'Avg Attendance': return <UserCheck size={24} />;
      case 'Pending Evaluations': return <FileCheck size={24} />;
      default: return <TrendingUp size={24} />;
    }
  };

  const getAction = (label) => {
    switch (label) {
      case 'Sessions Today': return () => navigate('/lms-dashboard/schedule');
      case 'Total Trainees': return () => navigate('/lms-dashboard/batches');
      case 'Pending Evaluations': return () => navigate('/lms-dashboard/assessments');
      default: return null;
    }
  };

  const schedule = [
    { time: '10:00 AM', topic: 'React Advanced Patterns', batch: 'B1-PY-002', type: 'ONLINE' },
    { time: '02:00 PM', topic: 'State Management (Redux)', batch: 'B2-JS-015', type: 'HYBRID' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Instructor <span className="text-primary italic">Console</span></h1>
        <p className="text-slate-500 font-medium tracking-tight">Managing academic delivery and student progress</p>
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
          { label: 'Start Session', icon: <Video size={18} />, onClick: () => navigate('/lms-dashboard/schedule') },
          { label: 'Mark Attendance', icon: <UserCheck size={18} />, onClick: () => navigate('/lms-dashboard/attendance') },
          { label: 'Add Evaluation', icon: <FileCheck size={18} />, onClick: () => navigate('/lms-dashboard/assessments') },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">Today's Sessions</h2>
              <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary transition-all">
                 View Full Calendar
              </button>
           </div>

           <div className="space-y-6">
              {schedule.map((session, i) => (
                <div key={i} className="group flex items-center justify-between p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                   <div className="flex items-center gap-8">
                      <div className="flex flex-col items-center justify-center w-20 h-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
                         <span className="text-xs font-black text-primary">{session.time.split(' ')[0]}</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{session.time.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{session.topic}</h4>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-200/50 px-3 py-1 rounded-lg">Batch: {session.batch}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                             session.type === 'ONLINE' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-emerald-50 text-emerald-500 border border-emerald-100'
                           }`}>{session.type}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <Video size={20} />
                      </button>
                      <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <ArrowUpRight size={20} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Actions & Tasks */}
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
           <h2 className="text-2xl font-black italic uppercase mb-10">Academic Tasks</h2>
           
           <div className="space-y-6">
              <TaskItem icon={<FileCheck size={18} />} label="Grade Python Projects" count="12 Pending" />
              <TaskItem icon={<MessageSquare size={18} />} label="Student Feedback" count="08 New" />
              <TaskItem icon={<Clock size={18} />} label="Attendance Log" count="Due by EOD" />
              
              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                 <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="text-primary" size={24} />
                 </div>
                 <h3 className="text-xl font-black text-white italic tracking-tight italic">Semester Planning</h3>
                 <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest leading-relaxed">
                   Review upcoming syllabus for Q3-Vertical-Integrated batches.
                 </p>
                 <button className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                    Launch Planner
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

const TaskItem = ({ icon, label, count }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-6">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-primary">
          {icon}
       </div>
       <div>
          <p className="text-sm font-bold tracking-tight italic">{label}</p>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{count}</p>
       </div>
    </div>
    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-500">
       <ArrowUpRight size={14} />
    </div>
  </div>
);

export default TrainerDashboard;
