import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ArrowRight
} from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock logic for the requested credentials
    const mockPartners = {
      'partner1': 'audit_round_1',
      'partner2': 'physical_verification',
      'partner3': 'active'
    };

    setTimeout(() => {
      if (mockPartners[email] && password === 'psw') {
        onLogin(mockPartners[email]);
      } else {
        setError('Invalid credentials. Use partner1/2/3 and psw');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full glass-card p-10 space-y-8 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] rounded-full" />
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg mx-auto mb-4">A</div>
          <h3 className="text-2xl font-bold text-white">Partner Sign In</h3>
          <p className="text-slate-500 text-sm">Access your membership dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium"
                placeholder="partner1, partner2, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium"
                placeholder="psw"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="pt-6 border-t border-slate-800/50 text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-sm text-slate-500 hover:text-blue-400 font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
