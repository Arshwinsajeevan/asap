import { FileText, Plus, Search, Filter, Download, Eye, CheckCircle, Clock } from 'lucide-react';

const Invoicing = () => {
  const invoices = [
    { id: 'INV-2026-001', client: 'ASAP HQ', type: 'Course Fees', amount: '₹1,50,000', status: 'Approved', date: '12 Apr 2026' },
    { id: 'INV-2026-002', client: 'State Skill Mission', type: 'Infrastructure Rent', amount: '₹45,000', status: 'Pending', date: '10 Apr 2026' },
    { id: 'INV-2026-003', client: 'Industry Partner A', type: 'Placement Fee', amount: '₹85,000', status: 'Paid', date: '05 Apr 2026' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Invoicing Mechanism</h2>
          <p className="text-slate-400 mt-2">Generate and manage invoices for various institutional services and fees.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: '₹12.5L', color: 'blue' },
          { label: 'Received', value: '₹8.2L', color: 'emerald' },
          { label: 'Pending', value: '₹4.3L', color: 'amber' },
          { label: 'Overdue', value: '₹0.5L', color: 'rose' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
            <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white">Invoice History</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search invoices..."
                className="pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm outline-none w-64"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 text-sm">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Invoice / Date</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Client / Partner</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded border border-slate-700">
                        <FileText size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{inv.id}</p>
                        <p className="text-[10px] text-slate-500">{inv.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{inv.client}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-tight">{inv.type}</td>
                  <td className="px-6 py-4 text-white font-bold">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-fit ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' :
                      inv.status === 'Approved' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {inv.status === 'Paid' && <CheckCircle size={10} />}
                      {inv.status === 'Pending' && <Clock size={10} />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-blue-500"><Download size={18} /></button>
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

export default Invoicing;
