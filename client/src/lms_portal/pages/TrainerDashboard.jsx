import React from 'react';
import { Calendar, Users, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TrainerDashboard = () => {
  const schedule = [
    { time: '09:00 AM', topic: 'Advanced React Patterns', batch: 'BATCH-TBB-101', venue: 'Virtual Room A', status: 'COMPLETED' },
    { time: '11:30 AM', topic: 'State Management with Redux', batch: 'BATCH-TBB-101', venue: 'Virtual Room A', status: 'ONGOING' },
    { time: '02:00 PM', topic: 'API Integration Workshop', batch: 'BATCH-FRR-204', venue: 'Skill Park TVM', status: 'UPCOMING' },
    { time: '04:30 PM', topic: 'Trainer Sync Meeting', batch: 'STAFF-CORE', venue: 'Zoom', status: 'UPCOMING' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Instructor <span className="text-cyan-400">Terminal</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Session delivery and trainee evaluation interface</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Today's Timeline</h2>
              <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-widest">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                Live: 2 Sessions Remaining
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:left-[2.75rem] before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-800 before:border-l before:border-white/5">
              {schedule.map((session, i) => (
                <div key={i} className="relative pl-24 group">
                  <div className={`absolute left-0 top-1.5 w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-[10px] uppercase tracking-tighter italic z-10 transition-all ${
                    session.status === 'COMPLETED' ? 'bg-slate-800 border-slate-700 text-slate-500' :
                    session.status === 'ONGOING' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30' :
                    'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    {session.time.split(' ')[0]}<br/>{session.time.split(' ')[1]}
                  </div>
                  <div className={`p-6 rounded-[2rem] border transition-all ${
                    session.status === 'ONGOING' ? 'bg-slate-800/80 border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-2xl' : 'bg-slate-800/30 border-white/5 hover:border-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-lg tracking-tight uppercase italic">{session.topic}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <Users size={12} /> {session.batch}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <MapPin size={12} /> {session.venue}
                          </span>
                        </div>
                      </div>
                      {session.status === 'ONGOING' ? (
                        <button className="px-6 py-3 bg-cyan-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-600/20 active:scale-95 transition-all">
                          Mark Attendance
                        </button>
                      ) : (
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                          session.status === 'COMPLETED' ? 'text-emerald-400' : 'text-slate-600'
                        }`}>
                          {session.status === 'COMPLETED' && <CheckCircle size={14} />}
                          {session.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4 italic">Next Step:<br/>Batch Evaluation</h3>
            <p className="text-sm font-bold text-blue-100/80 mb-8 leading-relaxed italic">
              Submit final feedback for BATCH-FRR-102. Certificates will be auto-generated upon submission.
            </p>
            <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:gap-4 transition-all">
              Launch Assessor <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8">Trainer Stats</h2>
            <div className="space-y-8">
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Hours Delivered</span>
                <span className="text-xl font-black text-white italic">128.5h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Feedback Rating</span>
                <span className="text-xl font-black text-emerald-400 italic">4.9/5</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Active Trainees</span>
                <span className="text-xl font-black text-white italic">420</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
