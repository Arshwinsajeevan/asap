import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Logic matching user requirements
    setTimeout(() => {
      if (password === 'psw' && email.startsWith('partner')) {
        navigate('/partner-zone');
      } else {
        setError('Invalid credentials. Use partner1, partner2... and psw');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md fade-in-slide-up">
        {/* Branding Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <img src="/Government_of_Kerala_Logo.png" alt="Govt" className="h-14 object-contain" />
          <img src="/ASAP-logo-28-1.png" alt="ASAP" className="h-10 object-contain" />
        </div>

        <div className="card-premium p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Partner Sign In</h3>
            <p className="text-slate-500 text-sm mt-1">Access institutional membership dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Username</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="partner1, partner2, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="psw"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-12 justify-center text-lg mt-4"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100/50 text-center mt-6">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm text-slate-500 hover:text-[#00B4D8] font-bold transition-colors"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
