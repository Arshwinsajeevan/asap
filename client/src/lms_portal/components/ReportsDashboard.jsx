import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Download, 
  Filter, 
  FileText, 
  TrendingUp, 
  Users, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';

export const ReportsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/lms/reports/overview');
        const json = await res.json();
        if (json.success) setData(json);
        else setError(json.message);
      } catch (err) {
        setError('Failed to establish connection with intelligence engine');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const exportToExcel = () => {
    if (!data || !data.trends) return;
    const ws = XLSX.utils.json_to_sheet(data.trends);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enrollment Trends");
    XLSX.writeFile(wb, "LMS_Global_Report_2026.xlsx");
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Aggregating Global Intelligence...</p>
    </div>
  );

  if (error || !data) return (
    <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-200 shadow-xl">
       <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-6">
          <TrendingUp size={40} className="rotate-180 opacity-20" />
       </div>
       <h3 className="text-xl font-black text-slate-900 uppercase italic">Intelligence Engine Offline</h3>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">{error || 'Data packet synchronization failed'}</p>
    </div>
  );

  const COLORS = ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Global <span className="text-primary italic">Intelligence</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Advanced Performance Analytics & Reporting</p>
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
               <Filter size={16} /> Filters
            </button>
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
               <FileSpreadsheet size={18} /> Export Global Ledger
            </button>
         </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Avg Performance', val: `${data?.avgGlobalScore || 0}%`, icon: TrendingUp, color: 'text-primary' },
           { label: 'Active Trainees', val: data?.trends?.reduce((a,b) => a + parseInt(b.count || 0), 0) || 0, icon: Users, color: 'text-slate-900' },
           { label: 'Completion Rate', val: '84%', icon: CheckCircle, color: 'text-emerald-500' },
           { label: 'Audited Batches', val: data?.batchStats?.reduce((a,b) => a + parseInt(b.count || 0), 0) || 0, icon: FileText, color: 'text-slate-900' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <stat.icon size={20} />
                 </div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">{stat.label}</p>
              </div>
              <p className={`text-3xl font-black italic tracking-tighter ${stat.color}`}>{stat.val}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Enrollment Trends */}
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
            <h3 className="text-xl font-black italic uppercase mb-10">Enrollment Velocity</h3>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trends}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Batch Distribution */}
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
            <h3 className="text-xl font-black italic uppercase mb-10">Cohort Distribution</h3>
            <div className="h-80 flex items-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                       data={data.batchStats}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={100}
                       paddingAngle={10}
                       dataKey="count"
                       nameKey="status"
                     >
                        {data.batchStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                        ))}
                     </Pie>
                     <Tooltip 
                       contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '40px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Trainer Performance */}
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 lg:col-span-2">
            <h3 className="text-xl font-black italic uppercase mb-10">Faculty Efficacy Audit</h3>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.trainers}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="email" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
                     <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <Bar dataKey="rating" fill="#0f172a" radius={[10, 10, 0, 0]} barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};
