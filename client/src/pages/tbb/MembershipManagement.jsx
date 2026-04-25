import React from 'react';
import { ShieldCheck, ShieldAlert, Award, Star, Gem, Zap } from 'lucide-react';

const TierCard = ({ tier, coins, privilege, color, icon: Icon }) => (
  <div className={`card-premium border-t-4 border-t-${color} relative overflow-hidden`}>
    <div className={`absolute top-0 right-0 p-4 opacity-5 text-${color}`}>
      <Icon size={120} strokeWidth={1} />
    </div>
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`text-${color}`} size={24} />
      <h3 className="text-xl font-bold">{tier}</h3>
    </div>
    <div className="mb-6">
      <p className="text-slate-500 text-xs font-bold uppercase">Welcome Bonus</p>
      <p className="text-3xl font-black text-slate-900">{coins} <span className="text-sm font-medium text-slate-400">Coins</span></p>
    </div>
    <div className="space-y-3 mb-8">
      <p className="text-xs font-bold text-slate-400 uppercase">Privileges</p>
      {privilege.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>{p}</span>
        </div>
      ))}
    </div>
    <button className={`w-full py-2 rounded-lg border border-${color} text-${color} font-bold hover:bg-${color} hover:text-white transition-all`}>
      Edit Tier Config
    </button>
  </div>
);

const MembershipManagement = () => {
  const tiers = [
    { tier: 'Basic', coins: 1, privilege: ['Free limited activities', 'Shared forums'], color: 'slate-400', icon: Award },
    { tier: 'Silver', coins: 10, privilege: ['Priority learning content', 'Skill Passport v1'], color: 'slate-300', icon: Zap },
    { tier: 'Gold', coins: 100, privilege: ['Event participation', 'Ad-free experience'], color: '[#FF6900]', icon: Star },
    { tier: 'Diamond', coins: 1000, privilege: ['Early access products', 'Skill Card (Physical)'], color: '[#00B4D8]', icon: Gem },
    { tier: 'Platinum', coins: 2000, privilege: ['Exclusive Mentoring', 'Fast-track Placements'], color: 'indigo-600', icon: ShieldAlert },
  ];

  return (
    <div className="fade-in-slide-up">
      <header className="mb-8">
        <h2 className="section-title">Membership & Tiers</h2>
        <p className="text-slate-500">Define student membership privileges and initial onboarding rewards.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {tiers.map((t, i) => (
          <TierCard key={i} {...t} />
        ))}
      </div>

      <div className="mt-12 card-premium">
        <h3 className="text-lg font-bold mb-6">Tier Upgrading Business Logic</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Automated Upgrades</h4>
            <p className="text-xs text-slate-500">Memberships upgrade automatically when Skill Score milestones are met (e.g., Gold at 5,000 pts).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Purchase/Redeem</h4>
            <p className="text-xs text-slate-500">Students can upgrade using Skill Coins or Direct Payment (linked to Marketplace).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Admin Control</h4>
            <p className="text-xs text-slate-500">Manual overrides available from student profile view for edge cases or scholarships.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipManagement;
