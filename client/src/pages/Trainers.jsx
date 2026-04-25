import React, { useState } from 'react';
import { UserSquare2, UserPlus, Search, ShieldCheck, Star, MapPin, X, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Trainers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trainers = [
    { 
      id: 'TRN-101', 
      name: 'Dr. Vineeth K', 
      expertise: ['Cloud Computing', 'AWS'], 
      rating: 4.8, 
      batches: 2,
      status: 'Mapped',
      availability: 'Weekdays'
    },
    { 
      id: 'TRN-102', 
      name: 'Priya Mani', 
      expertise: ['UI/UX Design', 'Figma'], 
      rating: 4.9, 
      batches: 1,
      status: 'Available',
      availability: 'Weekends'
    },
    { 
      id: 'TRN-103', 
      name: 'Arun George', 
      expertise: ['Python', 'Django', 'React'], 
      rating: 4.7, 
      batches: 0,
      status: 'Pending Verification',
      availability: 'Full-time'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Trainer Management</h2>
          <p className="text-slate-500 mt-2 font-medium">Onboard trainers and request mapping for specific courses.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center gap-2 border-border">
            <UserSquare2 size={18} />
            Map Trainer
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <UserPlus size={18} />
            Register Trainer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or skill..."
              className="input-field pl-10 pr-4 py-3 w-full"
            />
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-border">
            {['All', 'Mapped', 'Available', 'Verified'].map((filter, idx) => (
              <button 
                key={filter} 
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                   idx === 0 ? 'bg-white text-primary shadow-sm border border-border' : 'text-slate-400 hover:text-text'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="card-premium p-8 space-y-6 hover:border-primary/30 transition-all group bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center font-black text-2xl text-primary italic">
                  {trainer.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  trainer.status === 'Mapped' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  trainer.status === 'Available' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {trainer.status}
                </span>
                <div className="flex items-center gap-1.5 text-accent">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-black italic">{trainer.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black text-text group-hover:text-primary transition-colors uppercase italic tracking-tight">{trainer.name}</h4>
              <p className="text-primary text-[10px] font-black tracking-widest uppercase">{trainer.id}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {trainer.expertise.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-border uppercase tracking-wide">
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Availability</span>
                <span className="text-text">{trainer.availability}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Active Batches</span>
                <span className="text-text">{trainer.batches}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-50 hover:bg-primary text-slate-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-border hover:border-primary shadow-sm">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 border border-border shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <UserPlus className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">Trainer Registration</h3>
                  <p className="text-slate-500 text-sm font-medium">Onboard a new subject matter expert to your institution.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="input-field py-3 font-bold" placeholder="E.g. Dr. Arun" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</label>
                    <input type="text" className="input-field py-3 font-bold" placeholder="91XXXXXXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Expertise / Skills</label>
                  <input type="text" className="input-field py-3 font-bold" placeholder="E.g. React, Cloud, Python" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highest Qualification</label>
                  <select className="input-field py-3 font-black uppercase text-xs tracking-widest">
                    <option>PhD / Doctorate</option>
                    <option>Masters Degree</option>
                    <option>Bachelors Degree</option>
                    <option>Professional Certification</option>
                  </select>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button onClick={() => setIsModalOpen(false)} type="button" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-border">Cancel</button>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="btn-accent px-10 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/20">Register Trainer <ArrowRight size={16} /></button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Trainers;
