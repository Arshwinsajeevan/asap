import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter, FileText } from 'lucide-react';

const Reports = () => {
  const reports = [
    { title: 'Enrollment Summary', category: 'General', format: 'PDF/Excel', lastGen: '14 Apr 2026' },
    { title: 'Batch Performance Report', category: 'Training', format: 'PDF', lastGen: '12 Apr 2026' },
    { title: 'Student Attendance Logs', category: 'Tracking', format: 'Excel', lastGen: 'Daily Auto-gen' },
    { title: 'Assessment Results (All)', category: 'Academic', format: 'Excel/CSV', lastGen: '10 Apr 2026' },
    { title: 'Placement Status Report', category: 'Outcomes', format: 'PDF', lastGen: '01 Apr 2026' },
    { title: 'Financial Settlement Report', category: 'Accounts', format: 'PDF/Excel', lastGen: 'Monthly' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Analytics & Reports</h2>
          <p className="text-slate-400 mt-2">Generate comprehensive reports across all training and administrative modules.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Calendar size={18} />
            Schedule Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <BarChart3 size={18} />
            Generate New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            Enrollment Trends
          </h3>
          <div className="flex-1 flex items-end justify-between gap-2 pt-4">
            {[40, 65, 45, 90, 55, 75, 85].map((h, i) => (
              <div key={i} className="w-full bg-blue-600/20 rounded-t-lg relative group overflow-hidden">
                <div 
                  className="bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-400" 
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-widest">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        <div className="glass-card p-6 min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-emerald-500" />
            Batch Status Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 scale-110">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="60 40" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-60" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-black text-white">42</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center">
              <span className="block text-sm font-black text-blue-500">18</span>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Active</span>
            </div>
            <div className="text-center border-x border-slate-800">
              <span className="block text-sm font-black text-emerald-500">12</span>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Done</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-black text-amber-500">12</span>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Pending</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            Placement Rate
          </h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">72%</span>
            <p className="text-slate-400 text-sm mt-2 font-medium">Successful Placements</p>
            <div className="mt-8 flex gap-3">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold border border-purple-500/20">+4.2% YoY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">Standard Reports Table</h3>
          <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Filter size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 text-sm">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Last Generated</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Formats</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <tr key={report.title} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="text-slate-500" size={18} />
                      <p className="font-semibold text-white">{report.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{report.category}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{report.lastGen}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 text-xs font-bold">{report.format}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-500 hover:scale-110 transition-transform">
                      <Download size={18} />
                    </button>
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

export default Reports;
