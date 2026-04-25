import React from 'react';
import { Coins, TrendingUp, ArrowDownCircle, ArrowUpCircle, Settings2 } from 'lucide-react';

const CoinMetric = ({ title, value, icon: Icon, color }) => (
  <div className="card-premium flex items-center gap-4">
    <div className={`p-4 rounded-xl bg-${color}/10 text-${color}`}>
      <Icon size={24} strokeWidth={2} />
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const SkillCoinManagement = () => {
  const earningRules = [
    { activity: 'Student Registration', coins: 100, status: 'Active' },
    { activity: 'Full Profile Completion', coins: 500, status: 'Active' },
    { activity: 'Course Completion (Base)', coins: 50, status: 'Active' },
    { activity: 'Mentoring Session', coins: 100, status: 'Active' },
    { activity: 'Game Milestone', coins: 'Up to 10k', status: 'Paused' },
  ];

  return (
    <div className="fade-in-slide-up">
      <header className="mb-8">
        <h2 className="section-title">Skill Coin Economy</h2>
        <p className="text-slate-500">Manage digital rewards, redemption rates, and virtual currency circulation.</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CoinMetric title="Total Circulation" value="14,562,000" icon={Coins} color="[#FF6900]" />
        <CoinMetric title="Coins Earned (MTD)" value="245,000" icon={ArrowUpCircle} color="[#00B4D8]" />
        <CoinMetric title="Coins Redeemed" value="89,400" icon={ArrowDownCircle} color="emerald-600" />
        <CoinMetric title="Conversion Rate" value="10:1 (INR)" icon={TrendingUp} color="indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earning Rules */}
        <div className="lg:col-span-2 card-premium">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Earning Rules & Triggers</h3>
            <button className="btn-primary py-2 text-xs">
              <Settings2 size={16} />
              Set Master Rules
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                  <th className="pb-4">Activity Name</th>
                  <th className="pb-4 text-center">Coins Awarded</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {earningRules.map((rule, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-semibold text-slate-700">{rule.activity}</td>
                    <td className="py-4 text-center">
                      <span className="font-bold text-[#FF6900]">+{rule.coins}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        rule.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-[#00B4D8] font-bold cursor-pointer hover:underline">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Redemption Policy */}
        <div className="card-premium bg-slate-900 border-none">
          <h3 className="text-lg font-bold text-white mb-4">Redemption Policy</h3>
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/60 text-xs font-bold uppercase mb-2">Value Configuration</p>
              <div className="flex justify-between items-end">
                <span className="text-white text-2xl font-bold">10 <span className="text-sm font-normal text-white/40">Coins</span></span>
                <span className="text-white/40 mb-1">=</span>
                <span className="text-emerald-400 text-2xl font-bold">₹1 <span className="text-sm font-normal text-emerald-400/60">INR</span></span>
              </div>
            </div>
            
            <div>
              <p className="text-white/60 text-xs font-bold uppercase mb-3">Redemption Limits</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Min. Redemption</span>
                  <span className="text-white font-bold">1,000 Coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Max. Single Trans.</span>
                  <span className="text-white font-bold">50,000 Coins</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors mt-4">
              Update Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCoinManagement;
