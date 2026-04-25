import { Award, CheckCircle2, Download, Search, Printer, Share2 } from 'lucide-react';

const Results = () => {
  const certifyList = [
    { id: 'CERT-001', name: 'Rahul R', course: 'Data Analytics', batch: 'DA-2026-B1', score: '88%', date: '12 Apr 2026' },
    { id: 'CERT-002', name: 'Meera Nair', course: 'Data Analytics', batch: 'DA-2026-B1', score: '92%', date: '12 Apr 2026' },
    { id: 'CERT-003', name: 'Arun V', course: 'Cyber Security', batch: 'CS-2026-B1', score: '85%', date: '10 Apr 2026' },
    { id: 'CERT-004', name: 'Sonia S', course: 'Cyber Security', batch: 'CS-2026-B1', score: '78%', date: '10 Apr 2026' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Results & Certification</h2>
          <p className="text-slate-500 mt-2 font-medium">View final student results, generate certificates and track digital issuance.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 border-border">
            <Printer size={18} />
            Bulk Print
          </button>
          <button className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20">
            <Award size={18} />
            Issue Digital Certificates
          </button>
        </div>
      </div>

      <div className="card-premium p-10 bg-gradient-to-br from-primary/5 via-white to-accent/5 border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <Award className="text-primary" size={64} />
          </div>
          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">Certification Readiness</h3>
            <p className="text-slate-500 max-w-xl font-medium">
              Currently, 2 batches have completed their final assessments. 42 certificates are pending digital verification and issuance. 
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-black block uppercase tracking-widest">Pending Issuance</span>
                <span className="text-2xl font-black text-text italic">42</span>
              </div>
              <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-black block uppercase tracking-widest">Digital Sync</span>
                <span className="text-2xl font-black text-emerald-500 uppercase italic">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-premium overflow-hidden bg-white">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-black text-text uppercase italic tracking-tight">Issued Certificates</h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search certificate ID or name..."
                className="input-field pl-12 pr-4 py-3 text-sm w-full"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Certificate ID</th>
                <th className="px-8 py-5">Student</th>
                <th className="px-8 py-5">Course / Batch</th>
                <th className="px-8 py-5 text-center">Final Score</th>
                <th className="px-8 py-5">Issue Date</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {certifyList.map((cert) => (
                <tr key={cert.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-6 font-mono text-[10px] font-black text-primary tracking-widest">{cert.id}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-text uppercase italic">{cert.name}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      <p className="text-text font-black italic mb-0.5">{cert.course}</p>
                      <p>{cert.batch}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-black text-xs border border-emerald-100">
                      {cert.score}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-slate-500 text-xs font-bold">{cert.date}</td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl border border-transparent hover:border-border transition-all">
                        <Download size={20} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl border border-transparent hover:border-border transition-all">
                        <Share2 size={20} />
                      </button>
                    </div>
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

export default Results;
