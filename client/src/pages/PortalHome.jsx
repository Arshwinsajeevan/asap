import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight,
  Info,
  X,
  Mail,
  Lock,
  ExternalLink,
  Copy
} from 'lucide-react';

const PortalHome = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCred, setSelectedCred] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const credentials = [
    { role: 'Super Admin', url: 'http://localhost:5173/superadmin', email: 'admin@asapkerala.org', psw: 'psw', redirects: '/admin', scope: 'Global Master Access' },
    { role: 'TBB Admin', url: 'http://localhost:5173/tbb-zone', email: 'tbb-admin@asap.com', psw: 'psw', redirects: '/tbb-zone', scope: 'TBB Vertical Context' },
    { role: 'FRR Admin', url: 'http://localhost:5173/frr-zone', email: 'frr-admin@asap.com', psw: 'psw', redirects: '/frr-zone', scope: 'FRR/Corporate Context' },
    { role: 'Partner Admin', url: 'http://localhost:5173/partner-zone', email: 'partner1@asap.com', psw: 'psw', redirects: '/partner-zone', scope: 'ATP Institutional View' },
    { role: 'LMS Admin', url: 'http://localhost:5173/lms-dashboard', email: 'lmsadmin@asap.com', psw: 'psw', redirects: '/lms-dashboard', scope: 'Learning & Training Management' },
  ];

  const copyToClipboard = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    alert('URL Copied: ' + text);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const openLogin = (cred) => {
    setSelectedCred(cred);
    setUsername(cred.email);
    setPassword(cred.psw);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans">
      {/* Navbar */}
      <nav className="w-full h-24 bg-white border-b border-slate-200 flex items-center justify-between px-12 z-50 relative">
        <div className="flex items-center gap-6">
          <img src="/Government_of_Kerala_Logo.png" alt="Govt" className="h-12" />
          <div className="h-8 w-px bg-slate-200" />
          <img src="/ASAP-logo-28-1.png" alt="ASAP" className="h-10" />
          <span className="ml-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Unified Portal Directory</span>
        </div>
      </nav>

      {/* Main Directory */}
      <main className="max-w-[1400px] mx-auto px-12 py-20">
         <div className="mb-16">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Institutional Access <span className="text-primary italic">Directory</span></h1>
            <p className="text-slate-500 mt-4 text-lg font-medium">Simplified entry points for all ASAP Kerala vertical administrators.</p>
         </div>

         <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                     <ShieldCheck className="text-primary" size={28} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Institutional Access Directory</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Reference URLs and credentials for development roles</p>
                  </div>
               </div>
               <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <Info size={16} className="text-primary" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Password: <span className="text-primary">psw</span></p>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <th className="py-6 px-12 italic"># Account Role</th>
                        <th className="py-6 px-6">Login URL</th>
                        <th className="py-6 px-6">Test Email</th>
                        <th className="py-6 px-6">Redirect Target</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {credentials.map((cred) => (
                        <tr 
                          key={cred.role} 
                          className="group hover:bg-slate-50 transition-all relative"
                        >
                           <td className="py-10 px-12">
                              <div className="flex flex-col">
                                 <p className="text-xl font-black text-slate-900 tracking-tight italic group-hover:text-primary transition-colors">{cred.role}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">{cred.scope}</p>
                              </div>
                           </td>
                            <td className="py-10 px-6">
                               <div className="flex items-center gap-2">
                                  <span 
                                    onClick={(e) => { e.stopPropagation(); window.open(cred.url, '_blank'); }}
                                    className="group/url flex items-center gap-2 cursor-pointer text-[10px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                                  >
                                    {cred.url} <ExternalLink size={12} className="opacity-0 group-hover/url:opacity-100 transition-opacity" />
                                  </span>
                                  <button 
                                    onClick={(e) => copyToClipboard(e, cred.url)}
                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all"
                                    title="Copy URL"
                                  >
                                    <Copy size={14} />
                                  </button>
                               </div>
                            </td>
                           <td className="py-10 px-6">
                              <code className="text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">{cred.email}</code>
                           </td>
                           <td className="py-10 px-6 font-bold text-slate-400 italic text-sm">
                              {cred.redirects}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </main>

      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg p-12 relative shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-12">
                <div className="p-4 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                   <ShieldCheck className="text-primary" size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{selectedCred?.role} Login</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unified Authentication Gateway</p>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Institutional Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="email" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white font-bold text-slate-900 transition-all"
                      placeholder="admin@asap.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 px-1">Secure Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white font-bold text-slate-900 transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{error}</p>
                  </motion.div>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-slate-900 text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  {loading ? 'Authenticating...' : 'Enter Console'}
                  {!loading && <ArrowRight size={20} />}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="h-40 flex flex-col items-center justify-center border-t border-slate-200 bg-white mt-auto px-12 text-center opacity-40">
        <div className="flex items-center gap-4 mb-4">
           <img src="/ASAP-logo-28-1.png" className="h-6" alt="ASAP" />
           <p className="text-[10px] font-black uppercase tracking-widest italic">A Government of Kerala Undertaking</p>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 UNIFIED PORTAL DIRECTORY</p>
      </footer>
    </div>
  );
};

export default PortalHome;
