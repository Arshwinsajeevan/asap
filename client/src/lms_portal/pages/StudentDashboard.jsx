import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Coins, 
  Play, 
  FileText, 
  ChevronRight,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const courses = [
    { name: 'UI/UX Design Mastery', progress: 75, nextClass: 'Today, 2:00 PM', instructor: 'Arjun K.' },
    { name: 'Full Stack Development', progress: 40, nextClass: 'Tomorrow, 10:00 AM', instructor: 'Sarah L.' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Learner <span className="text-indigo-400">Hub</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your personalized skill-building environment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-900/20">
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                 <Coins size={24} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 italic">Skill Coin Balance</span>
           </div>
           <div className="flex flex-col">
              <span className="text-5xl font-black tracking-tighter italic">1,250</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-60">≈ 125.00 INR Value</span>
           </div>
           <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
              Redeem Rewards
           </button>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                 <Target size={24} className="text-emerald-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Skill Score</span>
           </div>
           <div>
              <span className="text-5xl font-black text-white tracking-tighter italic">840<span className="text-lg text-slate-600 ml-2">/1000</span></span>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                 <TrendingUp size={12} /> Top 5% of Kerala
              </p>
           </div>
           <div className="h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" style={{ width: '84%' }} />
           </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                 <Clock size={24} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Attendance Avg</span>
           </div>
           <div>
              <span className="text-5xl font-black text-white tracking-tighter italic">92%</span>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-2 italic">Certificate Eligible</p>
           </div>
           <div className="h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" style={{ width: '92%' }} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
           <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 italic">My Courses</h2>
           <div className="space-y-6">
              {courses.map((course, i) => (
                <div key={i} className="group p-6 bg-slate-800/30 border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all cursor-pointer">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Play size={20} className="text-white fill-current" />
                         </div>
                         <div>
                            <h4 className="font-bold text-white uppercase tracking-tight italic">{course.name}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic mt-0.5">Instructor: {course.instructor}</p>
                         </div>
                      </div>
                      <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                         <ChevronRight size={18} />
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase italic">{course.progress}%</span>
                   </div>
                   <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Clock size={12} /> Next: {course.nextClass}
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
           <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 italic">Skill Passport Assets</h2>
           <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/30 border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 transition-all">
                 <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <FileText size={32} className="text-blue-400" />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Digital Résumé</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/30 border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 transition-all">
                 <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                    <Award size={32} className="text-emerald-400" />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Skill Card ID</span>
              </button>
           </div>
           
           <div className="mt-8 p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem]">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                    <Award className="text-white" size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">Latest Achievement</h4>
                    <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Fast Learner: 5 Sessions streak</p>
                 </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-bold italic">
                You've earned 50 Skill Coins for consistent participation this week! Keep it up.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
