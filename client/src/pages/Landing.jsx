import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowRight, Lock, Globe, Users, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

const Landing = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('enroll');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [regData, setRegData] = useState({ name: '', email: '', password: '', institute: '', phone: '', category: 'Training Partner' });
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection to server failed');
      console.error(err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regData.name,
          email: regData.email,
          password: regData.password,
          institute_name: regData.institute,
          phone: regData.phone,
          category: regData.category
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please wait for admin approval.');
        setTimeout(() => {
          setActiveTab('login');
          setSuccess('');
        }, 3000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection to server failed');
      console.error(err);
    }
  };

  const districts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", 
    "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", 
    "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
  ];

  return (
    <div className="h-screen w-screen bg-background font-sans overflow-hidden flex flex-col text-slate-600 page-transition">
      
      {/* 01. FIXED NAVIGATION */}
      <nav className="h-[92px] w-full px-12 flex justify-between items-center border-b border-border bg-white shadow-sm z-50">
        <div className="flex items-center gap-6">
          <img src="/Government_of_Kerala_Logo.png" alt="Government of Kerala" className="h-12 w-auto" />
          <img src="/ASAP-logo-28-1.png" alt="ASAP Kerala" className="h-10 w-auto" />
          <p className="text-[11px] font-black text-primary uppercase tracking-widest hidden sm:block ml-4">
            {window.location.pathname.includes('tbb') ? 'TBB Zone' :
             window.location.pathname.includes('frr') ? 'FRR Zone' : 'Partner Portal'}
          </p>
        </div>
        <div className="flex items-center gap-10">
           <NavAction active={activeTab === 'enroll'} onClick={() => setActiveTab('enroll')} label="Enrollment" />
           <NavAction active={activeTab === 'login'} onClick={() => setActiveTab('login')} label="Institutional Login" />
           <a 
              href="https://asapkerala.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-all"
           >
              Main Site <ExternalLink size={14} strokeWidth={2} />
           </a>
        </div>
      </nav>

      {/* 02. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col lg:flex-row w-full relative overflow-y-auto min-h-0 custom-scrollbar">
        
        {/* LEFT PANEL: HERO & INFO (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col justify-start px-12 xl:px-32 pt-10 pb-20 space-y-16 relative bg-gradient-to-br from-primary/5 via-transparent to-transparent">
          
          <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-[11px] font-black text-primary uppercase tracking-widest">Empanellment Cycle 2026-27</div>
              <span className="text-xs font-bold text-slate-400 italic tracking-wider">Access – Learning – Careers</span>
            </div>
            <h2 className="text-6xl xl:text-8xl font-black text-text leading-[1.05] tracking-tighter mb-8 italic">
              {activeTab === 'enroll' ? (
                <>Kerala’s <span className="text-primary italic whitespace-nowrap">Future-Forward</span> <br />Upskilling Academy.</>
              ) : (
                <>Partner <br /><span className="text-primary italic whitespace-nowrap">Secure</span> <br />Network.</>
              )}
            </h2>
            <p className="text-lg font-medium leading-relaxed max-w-2xl text-slate-500">
               {activeTab === 'enroll' ? (
                 "ASAP Kerala is a Section-8 Company under the Department of Higher Education, Government of Kerala. We focus on skilling students and the community to enhance employability through state-of-the-art infrastructure."
               ) : (
                 "Secure gateway for empanelled training partners and accredited institutions to manage skill development programs across the state of Kerala."
               )}
            </p>
          </motion.div>

          <div className="flex gap-12 pt-4">
             <SmallStat num="2.7L+" label="Students Trained" />
             <SmallStat num="150+" label="Skill Courses" />
             <SmallStat num="16" label="Skill Parks" />
             <SmallStat num="19" label="Skill Sectors" />
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-border max-w-xl pb-10">
            <FeatureItem title="Future-proof Courses" desc="Industry-relevant curriculum" />
            <FeatureItem title="Training Centres" desc="State-wide accessible network" />
            <FeatureItem title="Expert Mentors" desc="Mentored by industry leaders" />
            <FeatureItem title="Placement Support" desc="Direct linkage with recruiters" />
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE FORM (40%) */}
        <div className="w-full lg:w-[40%] relative flex flex-col items-center px-8 xl:px-12 pt-10 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none opacity-50" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white border border-border p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,180,216,0.15)] relative z-10"
            >
              <div className="flex flex-col gap-1 mb-12">
                <h3 className="text-base font-black text-text uppercase tracking-widest italic">{activeTab === 'enroll' ? 'Registration' : 'Login'}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Academy Portal</p>
              </div>

              <form onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-8">
                {activeTab === 'enroll' ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Institution Name</label>
                       <ThinField placeholder="e.g. Skill Park" value={regData.institute} onChange={(e) => setRegData({...regData, institute: e.target.value, name: e.target.value})} icon={Building2} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Category</label>
                        <select 
                          className="input-field h-14 py-0 px-4 font-bold text-text bg-white" 
                          value={regData.category}
                          onChange={(e) => setRegData({...regData, category: e.target.value})}
                        >
                           <option>Accreditation</option>
                           <option>Training Partner</option>
                           <option>Empanelled Training Partner</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Mobile</label>
                         <ThinField placeholder="+91 XXXX" value={regData.phone} onChange={(e) => setRegData({...regData, phone: e.target.value})} icon={Phone} label={null} />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Contact Email</label>
                        <ThinField placeholder="contact@institute.com" value={regData.email} onChange={(e) => setRegData({...regData, email: e.target.value})} icon={Mail} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Choose Password</label>
                        <ThinField type="password" placeholder="••••••••" value={regData.password} onChange={(e) => setRegData({...regData, password: e.target.value})} icon={Lock} />
                    </div>
                    {success && <p className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest text-center">{success}</p>}
                    {error && <p className="text-[11px] text-rose-500 font-bold uppercase tracking-widest text-center">{error}</p>}
                  </div>
                ) : (
                   <div className="space-y-8">
                    <ThinField label="Partner Email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="email@asap.com" icon={Users} />
                    <ThinField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" icon={Lock} />
                    {error && <p className="text-[11px] text-rose-500 font-bold uppercase tracking-widest text-center">{error}</p>}
                   </div>
                )}

                <button className="w-full bg-accent hover:bg-accent-hover text-white text-xs font-black uppercase tracking-[0.2em] py-6 rounded-2xl transition-all shadow-xl shadow-accent/20 mt-6 flex items-center justify-center gap-3 active:scale-95">
                  {activeTab === 'enroll' ? 'CREATE PARTNER ACCOUNT' : 'ACCESS PORTAL'}
                  <ArrowRight size={20} strokeWidth={2} />
                </button>
              </form>

              <div className="mt-10 text-center border-t border-border pt-8">
                 <button onClick={() => setActiveTab(activeTab === 'enroll' ? 'login' : 'enroll')} className="text-xs font-black text-slate-400 hover:text-primary transition-all uppercase tracking-widest underline underline-offset-8">
                   {activeTab === 'enroll' ? 'Already a partner? Login' : 'Enroll AS A NEW Institution'}
                 </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 03. SLIM FOOTER STICKY */}
      <footer className="h-24 w-full px-12 flex justify-between items-center border-t border-border bg-white z-10">
         <div className="flex flex-col gap-3">
            <div className="flex gap-10 font-bold text-[11px] uppercase tracking-widest text-slate-400">
               <span className="hover:text-primary cursor-pointer transition-colors">About Us</span>
               <span className="hover:text-primary cursor-pointer transition-colors">Initiatives</span>
               <span className="hover:text-primary cursor-pointer transition-colors">Careers</span>
               <span className="hover:text-primary cursor-pointer transition-colors">RTI ACT</span>
               <span className="hover:text-primary cursor-pointer transition-colors">Noticeboard</span>
               <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
            </div>
            <div className="flex gap-8 items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <span className="flex items-center gap-2"><Mail size={14} className="text-primary" strokeWidth={2} /> info@asapkerala.gov.in</span>
               <span className="flex items-center gap-2"><Phone size={14} className="text-primary" strokeWidth={2} /> 0471 277 2500</span>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[11px] font-black text-text uppercase tracking-widest mb-1.5">© 2026 Additional Skill Acquisition Programme Kerala</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">A Government of Kerala Undertaking</p>
         </div>
      </footer>
    </div>
  );
};

const NavAction = ({ active, onClick, label }) => (
  <button onClick={onClick} className={`text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-primary border-b-2 border-primary pb-2' : 'text-slate-400 hover:text-text'}`}>
    {label}
  </button>
);

const SmallStat = ({ num, label }) => (
  <div>
    <p className="text-5xl font-black text-text leading-none mb-2 tabular-nums">{num}</p>
    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{label}</p>
  </div>
);

const ThinField = ({ label, placeholder, type = "text", value, onChange, icon: Icon }) => (
  <div className="space-y-2">
    {label && <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">{label}</label>}
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary cursor-text">
        <Icon size={16} strokeWidth={2} />
      </div>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        className="input-field pl-12 h-14" 
        placeholder={placeholder} 
      />
    </div>
  </div>
);

const FeatureItem = ({ title, desc }) => (
  <div className="space-y-2">
    <p className="text-sm font-black text-text uppercase tracking-tight">{title}</p>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
  </div>
);

export default Landing;
