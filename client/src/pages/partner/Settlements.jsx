import { HandCoins, ArrowUpRight, Clock, CheckCircle, Search, Download } from 'lucide-react';

const Settlements = () => {
  const settlements = [
    { id: 'SET-901', partner: 'Training Partner X', entitlement: 'TP Reward', amount: '₹42,500', status: 'In Process', bank: 'SBI **** 1234' },
    { id: 'SET-902', partner: 'Empaneled Inst. B', entitlement: 'Enrollment Incentive', amount: '₹12,000', status: 'Completed', bank: 'Federal **** 5678' },
    { id: 'SET-903', partner: 'Skill Park Alpha', entitlement: 'Operational Grant', amount: '₹2,50,000', status: 'Awaiting Approval', bank: 'Canara **** 9012' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Reward Settlements</h2>
          <p className="text-slate-400 mt-2">Manage training partner (TP) rewards, incentives and institutional settlements.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <HandCoins size={18} />
          New Settlement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 flex items-center gap-6 border-l-4 border-emerald-500">
          <div className="p-4 bg-emerald-500/10 rounded-2xl">
            <CheckCircle className="text-emerald-500" size={32} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Settled (FY 26-27)</p>
            <p className="text-4xl font-bold text-white mt-1">₹42.80 Lakhs</p>
            <div className="flex items-center gap-2 text-emerald-500 text-sm mt-2">
              <ArrowUpRight size={16} />
              <span>+18% from last FY</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex items-center gap-6 border-l-4 border-amber-500">
          <div className="p-4 bg-amber-500/10 rounded-2xl">
            <Clock className="text-amber-500" size={32} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pending Requests</p>
            <p className="text-4xl font-bold text-white mt-1">₹5.24 Lakhs</p>
            <p className="text-slate-400 text-sm mt-2">8 requests awaiting verification</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">Settlement Logs</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or Partner..."
              className="pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm outline-none w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 text-sm">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Settlement ID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Partner</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Bank Details</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {settlements.map((set) => (
                <tr key={set.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-400">{set.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white uppercase text-sm">{set.partner}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs font-medium uppercase">{set.entitlement}</td>
                  <td className="px-6 py-4 text-white font-bold">{set.amount}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-mono">{set.bank}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      set.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      set.status === 'In Process' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-amber-500/10 text-amber-500 font-bold'
                    }`}>
                      {set.status}
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

export default Settlements;
