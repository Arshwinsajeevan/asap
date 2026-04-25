import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  RefreshCcw, 
  Database, 
  Wifi, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const IntegrationPanel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchStatus = async () => {
    setSyncing(true);
    try {
      const res = await fetch('http://localhost:5000/api/lms/integrations/status');
      const json = await res.json();
      if (json.success) setData(json);
    } catch (err) {
      console.error('Failed to fetch integration status');
    } finally {
      setLoading(false);
      setTimeout(() => setSyncing(false), 800);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Connecting to Gateway...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">System <span className="text-primary italic">Governance</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Cross-Module Integration & Sync Status</p>
         </div>
         <button 
           onClick={fetchStatus}
           disabled={syncing}
           className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all disabled:opacity-50"
         >
            <RefreshCcw size={18} className={syncing ? 'animate-spin' : ''} /> 
            {syncing ? 'Synchronizing...' : 'Force Global Sync'}
         </button>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {data?.integrations.map((module) => (
           <div key={module.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-2 h-full ${module.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
              <div className="flex justify-between items-start mb-8">
                 <div className={`p-4 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all`}>
                    <Database size={24} />
                 </div>
                 <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${
                    module.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                 }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${module.status === 'SUCCESS' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                    {module.status}
                 </div>
              </div>

              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{module.name}</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{module.details}</p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Last Sync</p>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight italic mt-1">
                       {new Date(module.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Latency</p>
                    <p className="text-[10px] font-black text-primary uppercase tracking-tight italic mt-1">{module.latency}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Sync Logs */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 pointer-events-none" />
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                  <Activity size={24} />
               </div>
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Live Transmission Log</h3>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Encrypted Payload Stream</p>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left border-b border-white/10">
                     <th className="pb-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Module</th>
                     <th className="pb-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Event</th>
                     <th className="pb-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Timestamp</th>
                     <th className="pb-6 text-right text-[10px] font-black uppercase text-slate-500 tracking-widest">Result</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {data?.logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-white/5 transition-all">
                       <td className="py-6">
                          <p className="text-[11px] font-black uppercase italic tracking-tight">{log.module}</p>
                       </td>
                       <td className="py-6">
                          <p className="text-[10px] font-medium text-slate-400">{log.event}</p>
                       </td>
                       <td className="py-6 text-slate-400 font-mono text-[10px]">
                          {new Date(log.timestamp).toLocaleString()}
                       </td>
                       <td className="py-6 text-right">
                          <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                             log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                             {log.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
