import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const LmsLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Access Denied');
      }
    } catch (err) {
      setError('Neural Link Failure: Connection Timeout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 shadow-2xl relative">
           <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6">
                 <GraduationCap className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">LMS <span className="text-blue-500">Terminal</span></h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Unified Learning & Training System</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Registry ID (Email)</label>
                 <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-16 bg-slate-800/50 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="user@asapkerala.org"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Security Key</label>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-16 bg-slate-800/50 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="••••••••"
                      required
                    />
                 </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest italic">{error}</p>
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                {loading ? 'Authenticating...' : 'Access Portal'}
                {!loading && <ArrowRight size={18} />}
              </button>
           </form>

           <div className="mt-10 pt-8 border-t border-white/5 flex justify-center items-center opacity-40">
              <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-blue-500" />
                 <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] italic">Secure SSL Protocol Verified</span>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LmsLogin;
