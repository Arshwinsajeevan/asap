import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, simulate success and redirect to dashboard
    if (password === 'psw') {
      window.location.href = '/admin/overview';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md fade-in-slide-up">
        {/* Branding Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <img src="/Government_of_Kerala_Logo.png" alt="Govt. of Kerala" className="h-14 object-contain" />
          <img src="/ASAP-logo-28-1.png" alt="ASAP Kerala" className="h-10 object-contain" />
        </div>

        <div className="card-premium p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8 text-sm">Please enter your institutional credentials to access the admin console.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 mb-2 block tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  className="input-field pl-10" 
                  placeholder="admin@asapkerala.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 mb-2 block tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  className="input-field pl-10" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-[#00B4D8] focus:ring-[#00B4D8]" />
                Remember me
              </label>
              <a href="#" className="text-[#00B4D8] font-bold hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary w-full h-12 justify-center text-lg mt-4">
              Access Dashboard
              <LogIn size={20} />
            </button>
          </form>
        </div>

        <div className="text-center mt-10">
          <p className="text-slate-400 text-sm">
            Not an administrator? <a href="/register" className="text-[#007A96] font-bold hover:underline">Register as a Student</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
