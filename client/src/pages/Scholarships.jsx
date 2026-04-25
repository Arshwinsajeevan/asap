import React, { useState } from 'react';
import { GraduationCap, Megaphone, Calendar, Users, ArrowRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Scholarships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scholarships] = useState([
    {
      id: 1,
      title: 'ASAP Excellence Scholarship 2026',
      description: 'Full tuition fee waiver for top performing students in Artificial Intelligence and Data Science modules.',
      eligibility: 'Minimum 85% in assessments',
      deadline: '20 May 2026',
      beneficiaries: '50 Students',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Industry Partner Grant',
      description: 'Support for students from economically backward backgrounds for vocational training.',
      eligibility: 'Family income below 2.5 LPA',
      deadline: '15 June 2026',
      beneficiaries: '200 Students',
      status: 'Coming Soon'
    }
  ]);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Scholarships & Grants</h2>
          <p className="text-slate-500 mt-2 font-medium">Announce and manage scholarship opportunities for your students.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-fit shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Announce New Scholarship
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics */}
        <div className="lg:col-span-1 space-y-8">
          <div className="card-premium p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <h3 className="text-lg font-black text-text mb-6 flex items-center gap-3 uppercase italic tracking-tight">
              <Megaphone size={20} className="text-primary" />
              Impact Summary
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-white/50">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Funds</span>
                <span className="text-text font-black italic text-lg">₹25.5 Lakhs</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/50">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Target Students</span>
                <span className="text-text font-black italic text-lg">450+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Programs</span>
                <span className="text-text font-black italic text-lg">3</span>
              </div>
            </div>
          </div>

          <div className="card-premium p-8 bg-white">
            <h3 className="text-lg font-black text-text mb-6 uppercase italic tracking-tight">Guidelines</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">Scholarships must be approved by ASAP Kerala head office.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">Funds will be disbursed directly to student accounts.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">Attendance criteria (min 75%) applies to all scholarship holders.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Scholarship List */}
        <div className="lg:col-span-2 space-y-8">
          {scholarships.map((s) => (
            <div key={s.id} className="card-premium p-8 hover:border-primary/50 transition-all group bg-white">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                    <GraduationCap className="text-primary" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-text uppercase italic tracking-tight">{s.title}</h4>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </div>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all border border-border">
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                {s.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Calendar size={14} className="text-primary" />
                    <span>Deadline</span>
                  </div>
                  <p className="text-text font-black italic">{s.deadline}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Users size={14} className="text-primary" />
                    <span>Beneficiaries</span>
                  </div>
                  <p className="text-text font-black italic">{s.beneficiaries}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <GraduationCap size={14} className="text-primary" />
                    <span>Eligibility</span>
                  </div>
                  <p className="text-text font-black italic truncate" title={s.eligibility}>{s.eligibility}</p>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full py-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center gap-4 group">
            <div className="w-14 h-14 bg-slate-50 group-hover:bg-primary/10 rounded-full flex items-center justify-center transition-all border border-slate-100 group-hover:border-primary/20">
              <Plus size={28} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">Add Collaborative Industry Scholarship</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 border border-border shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <Megaphone className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">Announce Scholarship</h3>
                  <p className="text-slate-500 text-sm font-medium">Fill in the details for the new scholarship program.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scholarship Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Merit-cum-Means 2026"
                      className="input-field py-4 font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Beneficiaries</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 100 students"
                      className="input-field py-4 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Briefly describe the scholarship objective and benefits..."
                    className="input-field py-4 font-bold min-h-[120px]"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligibility Criteria</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Annual income < 3L"
                      className="input-field py-4 font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Application Deadline</label>
                    <input 
                      type="date" 
                      className="input-field py-4 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-8 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-10 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest border border-border"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-accent px-12 py-4 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                  >
                    Submit Announcement
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scholarships;
