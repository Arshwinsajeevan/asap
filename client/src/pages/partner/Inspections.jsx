import { ClipboardCheck, Calendar, Clock, MapPin, Search } from 'lucide-react';

const Inspections = () => {
  const inspections = [
    { 
      id: 'INS-001', 
      type: 'Infrastructure Audit', 
      date: '15 Apr 2026', 
      time: '10:00 AM', 
      inspector: 'Dr. Ramesh Kumar',
      status: 'Scheduled',
      location: 'Main Block, Skill Park'
    },
    { 
      id: 'INS-002', 
      type: 'Safety Compliance', 
      date: '12 Apr 2026', 
      time: '02:30 PM', 
      inspector: 'Sarah Wilson',
      status: 'Completed',
      location: 'Lab A & B'
    },
    { 
      id: 'INS-003', 
      type: 'Quality Assurance', 
      date: '10 Apr 2026', 
      time: '11:00 AM', 
      inspector: 'Amit Shah',
      status: 'In Progress',
      location: 'Training Hall 1'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Inspections</h2>
          <p className="text-slate-500 mt-2 font-medium">Track site audits, infrastructure checks and quality inspections.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Calendar size={18} />
          Request New Inspection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Audits', value: '42', color: 'blue' },
          { label: 'Pending', value: '5', color: 'amber' },
          { label: 'Completed', value: '34', color: 'emerald' },
          { label: 'Re-inspections', value: '3', color: 'rose' },
        ].map((stat) => (
          <div key={stat.label} className="card-premium p-6 bg-white border border-border shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black italic mt-1 text-text`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="text-xl font-black text-text uppercase italic tracking-tight">Inspection History</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search inspections..."
              className="input-field pl-10 pr-4 py-2 w-full md:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-5">Type / ID</th>
                <th className="px-8 py-5">Date & Time</th>
                <th className="px-8 py-5">Inspector</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inspections.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-text group-hover:text-primary transition-colors">{ins.type}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{ins.id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-text text-sm font-bold">
                        <Calendar size={14} className="text-primary" />
                        {ins.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                        <Clock size={14} />
                        {ins.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-text text-sm font-bold">
                    {ins.inspector}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <MapPin size={14} className="text-primary" />
                      {ins.location}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      ins.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      ins.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {ins.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-primary hover:text-primary-dark text-[10px] font-black uppercase tracking-widest">
                      View Report
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

export default Inspections;
