import { FileCheck, ClipboardList, PenTool, Upload, Award, ExternalLink } from 'lucide-react';

const Assessments = () => {
  const assessmentGroups = [
    { 
      id: 'G1', 
      batch: 'DA-2026-B1', 
      course: 'Data Analytics', 
      type: 'Internal', 
      status: 'Open', 
      completion: '85%',
      deadline: '20 Apr 2026'
    },
    { 
      id: 'G2', 
      batch: 'CS-2026-B1', 
      course: 'Cyber Security', 
      type: 'Practical', 
      status: 'Awaiting External', 
      completion: '100%',
      deadline: '15 Apr 2026'
    },
    { 
      id: 'G3', 
      batch: 'ML-2026-B2', 
      course: 'AI & ML', 
      type: 'Internal', 
      status: 'Upcoming', 
      completion: '0%',
      deadline: '30 Apr 2026'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Assessments & Scores</h2>
          <p className="text-slate-500 mt-2 font-medium">Manage internal assessments, grade students, and submit for final certification.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 border-border">
            <Upload size={18} />
            Bulk Upload Scores
          </button>
          <button className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus size={18} />
            New Assessment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-premium p-8 border-b-4 border-blue-500 bg-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Internal Assessments</p>
              <h3 className="text-3xl font-black text-text italic">42 <span className="text-slate-300 not-italic uppercase text-xs">Active</span></h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <ClipboardList className="text-blue-500" size={24} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-6 font-black uppercase tracking-widest">Awaiting grading: 12</p>
        </div>

        <div className="card-premium p-8 border-b-4 border-amber-500 bg-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Final Submissions</p>
              <h3 className="text-3xl font-black text-text italic">18 <span className="text-slate-300 not-italic uppercase text-xs">Ready</span></h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <PenTool className="text-amber-500" size={24} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-6 font-black uppercase tracking-widest">Due this week: 5</p>
        </div>

        <div className="card-premium p-8 border-b-4 border-emerald-500 bg-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Certifications Issued</p>
              <h3 className="text-3xl font-black text-text italic">1,248</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <Award className="text-emerald-500" size={24} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-6 font-black uppercase tracking-widest">+124 this month</p>
        </div>
      </div>

      <div className="card-premium bg-white overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-black text-text uppercase italic tracking-tight">Batch-wise Assessment Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Batch / Course</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Completion</th>
                <th className="px-8 py-5">Deadline</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assessmentGroups.map((group) => (
                <tr key={group.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-black text-text uppercase italic">{group.batch}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{group.course}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-slate-500 text-xs font-bold uppercase">{group.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                        <div 
                          className={`h-full rounded-full ${group.completion === '100%' ? 'bg-emerald-500' : 'bg-primary shadow-[0_0_10px_rgba(0,180,216,0.2)]'}`} 
                          style={{ width: group.completion }} 
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.completion}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-slate-500 text-xs font-bold">{group.deadline}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      group.status === 'Open' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      group.status === 'Awaiting External' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-primary hover:text-accent flex items-center gap-2 ml-auto text-[10px] font-black uppercase tracking-widest transition-all hover:gap-4">
                      Enter Scores
                      <ExternalLink size={16} />
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

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Assessments;
