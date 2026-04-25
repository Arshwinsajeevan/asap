import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Award, 
  Activity, 
  Clock, 
  BookOpen, 
  Play, 
  Calendar, 
  ArrowUpRight,
  Target,
  Trophy
} from 'lucide-react';

const StudentDashboard = () => {
  const myCourses = [
    { title: 'UI/UX Design Mastery', instructor: 'Arjun K.', progress: 75, color: 'bg-indigo-600' },
    { title: 'Cloud Computing Foundation', instructor: 'Sarah J.', progress: 30, color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Learner <span className="text-primary italic">Hub</span></h1>
        <p className="text-slate-500 font-medium tracking-tight">Your personalized skill-building environment</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          icon={<Zap size={24} />} 
          label="Skill Coin Balance" 
          value="1,250" 
          trend="≈ ₹125.00 INR Value" 
          color="text-amber-500"
          bg="bg-amber-50"
        />
        <StatCard 
          icon={<Target size={24} />} 
          label="Skill Score" 
          value="840/1000" 
          trend="TOP 5% OF KERALA" 
          color="text-emerald-500"
          bg="bg-emerald-50"
        />
        <StatCard 
          icon={<Activity size={24} />} 
          label="Attendance Avg" 
          value="92%" 
          trend="CERTIFICATE ELIGIBLE" 
          color="text-blue-500"
          bg="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">My Active Courses</h2>
              <BookOpen className="text-slate-300" size={24} />
           </div>

           <div className="space-y-6">
              {myCourses.map((course, i) => (
                <div key={i} className="group p-6 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            <Play size={20} fill="currentColor" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900 uppercase tracking-tight">{course.title}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Instructor: {course.instructor}</p>
                         </div>
                      </div>
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <span>Course Progress</span>
                         <span className="text-primary">{course.progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${course.progress}%` }}
                           className={`h-full ${course.color} rounded-full shadow-sm`}
                         />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Skill Passport Assets */}
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
           <h2 className="text-2xl font-black italic uppercase mb-10">Skill Passport Assets</h2>
           
           <div className="space-y-6">
              <AssetItem icon={<Award size={18} />} label="Professional Python Cert" date="Mar 2024" />
              <AssetItem icon={<Trophy size={18} />} label="Soft Skills Milestone" date="Feb 2024" />
              <AssetItem icon={<Clock size={18} />} label="50+ Learning Hours" date="Ongoing" />
              
              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 italic">Next Assessment</p>
                 <h3 className="text-2xl font-black text-primary italic tracking-tight italic">Logical Reasoning</h3>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Tomorrow • 10:00 AM</p>
                 <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all">
                    Prepare Now
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
    <div className={`p-4 rounded-2xl ${bg} ${color} w-fit mb-8 border border-white`}>
       {icon}
    </div>
    <div className="space-y-1">
       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
       <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">{value}</h3>
       <p className="text-[10px] font-bold text-slate-400 mt-6 leading-relaxed uppercase tracking-wider">{trend}</p>
    </div>
  </motion.div>
);

const AssetItem = ({ icon, label, date }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-6">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-primary">
          {icon}
       </div>
       <div>
          <p className="text-sm font-bold tracking-tight italic">{label}</p>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{date}</p>
       </div>
    </div>
    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
       <ArrowUpRight size={14} />
    </div>
  </div>
);

export default StudentDashboard;
