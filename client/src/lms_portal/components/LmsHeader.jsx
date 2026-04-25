import React from 'react';
import { Bell, Search, User, Globe, Command } from 'lucide-react';

const LmsHeader = ({ user }) => {
  return (
    <header className="h-24 bg-slate-900/50 backdrop-blur-3xl border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <div className="relative group flex-1 min-w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search programs, trainees, or documentation..." 
            className="w-full h-12 bg-slate-800/50 border border-white/5 rounded-2xl pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-lg border border-white/5 pointer-events-none">
            <Command size={10} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-6 border-r border-slate-800 pr-6">
          <button className="p-3 text-slate-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900" />
          </button>
          <button className="p-3 text-slate-400 hover:text-white transition-colors">
            <Globe size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/30 p-1.5 pr-4 rounded-2xl border border-white/5">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <User size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-white tracking-tight uppercase">{user?.name || 'Authorized User'}</span>
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none">{user?.role || 'SECURED'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LmsHeader;
