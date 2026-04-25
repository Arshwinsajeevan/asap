import React from 'react';
import { Briefcase, Users, UserCheck, Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const RecruiterDashboard = () => {
  const jobs = [
    { title: 'Frontend Developer Intern', applicants: 124, interviews: 8, status: 'ACTIVE' },
    { title: 'Python Backend Engineer', applicants: 45, interviews: 12, status: 'ACTIVE' },
    { title: 'UI/UX Designer (Contract)', applicants: 89, interviews: 5, status: 'CLOSED' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Talent <span className="text-emerald-400">Acquisition</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Corporate Portal for Recruitment and Internship Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                 <Briefcase size={24} className="text-emerald-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Postings</span>
           </div>
           <span className="text-5xl font-black text-white tracking-tighter">12</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                 <Users size={24} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Applicants</span>
           </div>
           <span className="text-5xl font-black text-white tracking-tighter">568</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                 <UserCheck size={24} className="text-amber-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Interviews Today</span>
           </div>
           <span className="text-5xl font-black text-white tracking-tighter">04</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Active Gigs & Jobs</h2>
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-600/20">
                 Post New Opening
              </button>
           </div>

           <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="group flex items-center justify-between p-6 bg-slate-800/30 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white italic ${job.status === 'ACTIVE' ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                        {job.title[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase tracking-tight">{job.title}</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
                          {job.applicants} Applicants • {job.interviews} Shortlisted
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        job.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-white/5'
                      }`}>
                        {job.status}
                      </div>
                      <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                         <ArrowRight size={18} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
           <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8">Upcoming Interviews</h2>
           <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-white/5">
                   <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">Candidate ID: STU-440{i}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Today at {i + 1}:00 PM</p>
                   </div>
                </div>
              ))}
              <button className="w-full mt-4 py-4 border border-dashed border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-blue-500/50 hover:text-blue-400 transition-all">
                 View Full Calendar
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
