import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Building, 
  MapPin, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Globe2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const AsapWebsite = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <img src="/ASAP-logo-28-1.png" alt="ASAP" className="h-10" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 italic">Government of Kerala</span>
        </div>
        <div className="hidden lg:flex items-center gap-8">
           {['Courses', 'Skill Parks', 'Initiatives', 'About Us', 'Contact'].map(link => (
             <a key={link} href="#" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-tight">{link}</a>
           ))}
        </div>
        <div className="flex items-center gap-4">
           <button className="text-sm font-bold text-slate-500 hover:text-slate-900 px-6 py-2">Search</button>
           <a 
             href="/admin"
             className="bg-primary text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
           >
             Login Portal
           </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-32">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-bl-[200px] z-0" />
         
         <div className="px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <span className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6 block italic underline decoration-wavy underline-offset-8">Kerala's Skill Revolution</span>
               <h1 className="text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8 italic">
                 Empowering <br />
                 <span className="text-[#FCA311]">The Future.</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed mb-10">
                 Additional Skill Acquisition Programme (ASAP) Kerala is a government company under the Higher Education Department, bridging the gap between education and employability.
               </p>
               <div className="flex gap-4">
                  <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all hover:gap-5">
                    Explore Courses <ArrowRight size={20} />
                  </button>
                  <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all">
                    Our Impact
                  </button>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
               <div className="h-[600px] bg-slate-200 rounded-[4rem] overflow-hidden shadow-2xl relative">
                  <img 
                     src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                     alt="Students" 
                     className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
               </div>
               {/* Floating stat card */}
               <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6">
                  <div className="p-4 bg-emerald-50 rounded-2xl">
                     <TrendingUp className="text-emerald-500" size={32} />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">2.7L+</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students Trained</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Stats Section */}
      <section className="px-12 py-32 bg-slate-50">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               { icon: <BookOpen className="text-primary" />, value: '150+', label: 'Skill Courses' },
               { icon: <Building className="text-primary" />, value: '16', label: 'Community Skill Parks' },
               { icon: <Globe2 className="text-primary" />, value: '19', label: 'Priority Sectors' },
               { icon: <Users className="text-primary" />, value: '250+', label: 'Industry Partners' },
            ].map((stat, i) => (
               <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm transition-all hover:scale-[1.02] cursor-pointer group">
                  <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-6 group-hover:bg-primary/5 transition-colors">
                     {stat.icon}
                  </div>
                  <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">{stat.value}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Course Categories */}
      <section className="px-12 py-32">
         <div className="flex justify-between items-end mb-16">
            <div>
               <h2 className="text-5xl font-black italic tracking-tight uppercase">Featured <span className="text-primary">Sectors.</span></h2>
               <p className="text-slate-500 font-medium mt-4">Industry-driven training in emerging technologies.</p>
            </div>
            <button className="text-sm font-bold text-primary flex items-center gap-2 group decoration-primary">
               View All Sectors <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
               { title: 'IT & ITES', desc: 'Full Stack, Data Science, AI/ML Specialist', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070' },
               { title: 'Healthcare', desc: 'Geriatric Care, Patient Care Assistive', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070' },
               { title: 'Logistics', desc: 'Supply Chain, Warehouse Management', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070' },
            ].map((cat, i) => (
               <div key={i} className="group relative h-[450px] rounded-[3.5rem] overflow-hidden cursor-pointer">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-10">
                     <h3 className="text-3xl font-black text-white italic">{cat.title}</h3>
                     <p className="text-white/60 text-sm mt-3">{cat.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-32 pb-12 px-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full bg-primary/5 pointer-events-none" />
         <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10 border-b border-white/5 pb-20 mb-12">
            <div className="col-span-2">
               <img src="/ASAP-logo-28-1.png" alt="ASAP" className="h-16 mb-8 brightness-0 invert" />
               <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                 Building a skilled Kerala. A Section-8 company under the Department of Higher Education, Government of Kerala.
               </p>
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">Quick Links</h4>
               <div className="flex flex-col gap-4 text-sm font-bold text-slate-300">
                  <a href="#">RTI Act</a>
                  <a href="#">Noticeboard</a>
                  <a href="#">Skill Parks</a>
                  <a href="#">Tenders</a>
               </div>
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">Contact</h4>
               <p className="text-slate-300 text-sm font-medium">info@asapkerala.gov.in</p>
               <p className="text-slate-300 text-sm font-medium mt-2">0471 277 2500</p>
            </div>
         </div>
         <div className="flex justify-between items-center opacity-30 text-[10px] font-black uppercase tracking-widest">
            <p>© 2026 ASAP KERALA</p>
            <p>A Government of Kerala Undertaking</p>
         </div>
      </footer>
    </div>
  );
};

export default AsapWebsite;
