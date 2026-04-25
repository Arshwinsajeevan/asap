import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Zap, Award, Globe, BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react';
import LmsLogin from './LmsLogin';

const LmsLanding = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LmsLogin onLogin={onLogin} />;
  }

  const features = [
    { title: 'Gamified Learning', desc: 'Earn Skill Coins for every session and milestone.', icon: Zap, color: 'text-amber-400' },
    { title: 'Digital Credentials', desc: 'Auto-generated certificates with QR authenticity.', icon: Award, color: 'text-emerald-400' },
    { title: 'Career Pathways', desc: 'AI-driven recommendations based on your performance.', icon: Globe, color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="h-24 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">ASAP <span className="text-blue-500">LMS</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Programs', 'Skill Economy', 'Mentorship', 'FAQ'].map(link => (
            <a key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">{link}</a>
          ))}
          <button 
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
          >
            Access Terminal
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 px-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                <ShieldCheck size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Official Portal for ASAP Kerala Students</span>
              </div>
              <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                Build your <br/>
                <span className="text-blue-500">Talent Economy</span>
              </h1>
              <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-lg italic">
                The next generation of skill management is here. Earn while you learn, build a digital passport, and connect with global recruiters.
              </p>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="group px-10 py-5 bg-white text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:gap-6 transition-all shadow-2xl"
                >
                  Enter Portal <ArrowRight size={20} />
                </button>
                <div className="flex -space-x-3">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800" />
                   ))}
                   <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-blue-600 flex items-center justify-center text-[10px] font-black">2k+</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-[4rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-blue-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border border-blue-500/40 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                 <GraduationCap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" size={120} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-10 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col items-center text-center mb-20">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Engineered for <span className="text-blue-500">Excellence</span></h2>
                <div className="w-20 h-1 bg-blue-600 mt-6 rounded-full" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="p-10 bg-slate-800/40 border border-white/5 rounded-[3rem] hover:bg-slate-800 transition-all group">
                     <div className={`w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform ${f.color}`}>
                        <f.icon size={32} />
                     </div>
                     <h3 className="text-xl font-black uppercase tracking-tight italic mb-4">{f.title}</h3>
                     <p className="text-slate-500 font-bold leading-relaxed italic">{f.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-10">
          <div className="max-w-5xl mx-auto bg-blue-600 rounded-[4rem] p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/40">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
             <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-8 relative z-10">Start Your Journey Today</h2>
             <p className="text-xl font-bold text-blue-100 mb-12 max-w-2xl mx-auto italic relative z-10">
               Join over 2,000 students already building their future with ASAP Kerala's Unified Portal.
             </p>
             <button 
                onClick={() => setShowLogin(true)}
                className="px-12 py-6 bg-white text-blue-600 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10"
             >
               Launch Dashboard Now
             </button>
          </div>
        </section>
      </main>

      <footer className="py-20 px-10 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
               <GraduationCap className="text-blue-500" size={18} />
             </div>
             <span className="text-lg font-black tracking-tighter uppercase">ASAP <span className="text-blue-500">LMS</span></span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">© 2025 ASAP Kerala • Learning & Training Management System</p>
           <div className="flex gap-6">
              <BookOpen size={16} className="text-slate-600" />
              <Globe size={16} className="text-slate-600" />
              <Zap size={16} className="text-slate-600" />
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LmsLanding;
