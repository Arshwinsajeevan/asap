import { CreditCard, ArrowUpRight, ArrowDownLeft, Search, Filter, Download } from 'lucide-react';

const Payments = () => {
  const transactions = [
    { id: 'TXN-9821', type: 'Inspection Fee', amount: '₹15,000', date: '14 Apr 2026', status: 'Success', method: 'Razorpay' },
    { id: 'TXN-9820', type: 'Batch Enrollment', amount: '₹1,20,000', date: '12 Apr 2026', status: 'Success', method: 'Bank Transfer' },
    { id: 'TXN-9819', type: 'Assessment Fee', amount: '₹4,500', date: '10 Apr 2026', status: 'Pending', method: 'UPI' },
    { id: 'TXN-9818', type: 'Invoicing Settlement', amount: '₹85,000', date: '08 Apr 2026', status: 'Success', method: 'Bank Transfer' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Payments & Invoices</h2>
          <p className="text-slate-400 mt-2">Manage course fees, assessment payments, and institutional settlements.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <CreditCard size={18} />
            Add Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Balance</p>
              <p className="text-3xl font-bold text-white mt-1">₹4,25,000</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <CreditCard className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-emerald-500 text-sm font-medium">
            <ArrowUpRight size={16} />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Earned Rewards</p>
              <p className="text-3xl font-bold text-white mt-1">₹32,400</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <ArrowUpRight className="text-emerald-500" size={24} />
            </div>
          </div>
          <p className="mt-4 text-slate-500 text-sm">TP reward settlements pending: 2</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Dues</p>
              <p className="text-3xl font-bold text-white mt-1">₹12,800</p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <ArrowDownLeft className="text-amber-500" size={24} />
            </div>
          </div>
          <p className="mt-4 text-slate-500 text-sm">Includes assessment & audit fees</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-white">Transaction Logs</h3>
            <div className="flex bg-slate-800/50 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-blue-600 text-white">All</button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-400 hover:text-white transition-colors">Pending</button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-400 hover:text-white transition-colors">Failed</button>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm outline-none transition-colors w-full md:w-48 focus:border-blue-500"
              />
            </div>
            <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 text-sm">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">{txn.id}</td>
                  <td className="px-6 py-4 text-slate-100 font-medium">{txn.type}</td>
                  <td className="px-6 py-4 text-white font-bold">{txn.amount}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{txn.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700">{txn.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      txn.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
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

export default Payments;
