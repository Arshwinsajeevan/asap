import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Calendar, 
  ArrowUpRight, 
  Search, 
  Filter,
  CheckCircle2,
  TrendingUp,
  Building2
} from 'lucide-react';

const RecruiterDashboard = () => {
  const jobs = [
    { title: 'Frontend Developer Intern', applicants: 124, interviews: 8, status: 'ACTIVE' },
    { title: 'Python Backend Engineer', applicants: 45, interviews: 12, status: 'ACTIVE' },
    { title: 'UI/UX Designer (Contract)', applicants: 89, interviews: 5, status: 'CLOSED' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Talent <span className="text-primary italic">Acquisition</span></h1>
        <p className="text-slate-500 font-medium tracking-tight">Corporate Portal for Recruitment and Internship Management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard icon={<Briefcase size={24} />} label="Active Postings" value="12" trend="04 Gigs Posted Today" color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={<Users size={24} />} label="Total Applicants" value="568" trend="+12% from last week" color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard icon={<UserCheck size={24} />} label="Interviews" value="04" trend="Scheduled for today" color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={<TrendingUp size={24} />} label="Hire Rate" value="82%" trend="Across all verticals" color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Postings */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">Active Gigs & Openings</h2>
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                 Post New Opening
              </button>
           </div>

           <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="group flex items-center justify-between p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                   <div className="flex items-center gap-8">
                      <div className={`w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all`}>
                         <Building2 size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight italic uppercase">{job.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">
                          {job.applicants} Applicants • {job.interviews} Shortlisted
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        job.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}>
                        {job.status}
                      </div>
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Interviews & Notifications */}
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
           <h2 className="text-2xl font-black italic uppercase mb-10">Live Pipeline</h2>
           
           <div className="space-y-6">
              <CandidateItem name="STU-4401" role="Frontend Dev" time="2:00 PM" />
              <CandidateItem name="STU-4402" role="UX Designer" time="4:30 PM" />
              <CandidateItem name="STU-4405" role="Python Eng" time="Tomorrow" />
              
              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-blue-400" size={24} />
                 </div>
                 <h3 className="text-xl font-black text-white italic tracking-tight italic">Assessment Review</h3>
                 <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest leading-relaxed">
                   Batch B2-PY-015 test results are ready for shortlisting.
                 </p>
                 <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all">
                    View Results
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

const CandidateItem = ({ name, role, time }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-6">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-primary">
          <Calendar size={18} />
       </div>
       <div>
          <p className="text-sm font-bold tracking-tight italic">ID: {name}</p>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{role} • {time}</p>
       </div>
    </div>
    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
       <ArrowUpRight size={14} />
    </div>
  </div>
);

export default RecruiterDashboard;
