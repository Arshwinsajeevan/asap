import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight, Activity, Cpu } from 'lucide-react';

const SuperAdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@asapkerala.org');
  const [password, setPassword] = useState('psw');
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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* HUD Background Elements */}
      <div className="absolute inset-0 opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      {/* Cyberpunk Circles */}
      <div className="absolute w-[800px] h-[800px] border border-blue-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[600px] h-[600px] border border-cyan-500/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
           {/* Security Scanner Line */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[pulse_2s_infinite]" />

           <div className="flex flex-col items-center text-center mb-12">
              <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6 group">
                 <ShieldCheck className="text-cyan-400 group-hover:scale-110 transition-transform" size={40} strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Global Command <span className="text-cyan-400">Auth</span></h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">ASAP Kerala Master Infrastructure</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Root Identity</label>
                 <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-20 bg-slate-800/50 border border-white/5 rounded-3xl pl-16 pr-6 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="root@asapkerala.org"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Neural Key</label>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-20 bg-slate-800/50 border border-white/5 rounded-3xl pl-16 pr-6 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">{error}</p>
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full h-20 bg-cyan-600 hover:bg-cyan-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-cyan-600/20 transition-all active:scale-95 flex items-center justify-center gap-4 group"
              >
                {loading ? 'Decrypting...' : 'Establish Connection'}
                {!loading && <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />}
              </button>
           </form>

           <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
              <div className="flex items-center gap-4">
                 <div className="flex gap-1">
                    <Activity size={12} className="text-cyan-400" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">System Online</span>
                 </div>
              </div>
              <p className="text-[9px] font-bold text-white uppercase tracking-widest">Auth Protocol 7.4.2</p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogin;
