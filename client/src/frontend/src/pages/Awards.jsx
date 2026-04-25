import { Trophy, Star, Award, Search, ExternalLink } from 'lucide-react';

const Awards = () => {
  const awards = [
    { 
      id: 'AW-2026-01', 
      title: 'Best Skill Park of the Year', 
      winner: 'ASAP Skill Park, Trivandrum', 
      category: 'Excellence', 
      date: 'Jan 2026',
      icon: <Trophy className="text-amber-500" size={32} />
    },
    { 
      id: 'AW-2026-02', 
      title: 'Highest Placement Record', 
      winner: 'Government ITI, Kalamassery', 
      category: 'Performance', 
      date: 'Feb 2026',
      icon: <Star className="text-blue-500" size={32} />
    },
    { 
      id: 'AW-2026-03', 
      title: 'Innovation in Training', 
      winner: 'TKM College, Kollam', 
      category: 'Innovation', 
      date: 'Mar 2026',
      icon: <Award className="text-emerald-500" size={32} />
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Institutional Awards</h2>
          <p className="text-slate-400 mt-2">Recognizing excellence among training partners and skill parks.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Star size={18} />
          Nominate Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((aw) => (
          <div key={aw.id} className="glass-card relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              {aw.icon}
            </div>
            <div className="p-8 space-y-6">
              <div className="p-4 bg-slate-800 rounded-2xl w-fit border border-slate-700">
                {aw.icon}
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{aw.category}</span>
                <h3 className="text-xl font-bold text-white leading-tight uppercase tracking-tight group-hover:text-amber-500 transition-colors">
                  {aw.title}
                </h3>
              </div>
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Winner</p>
                  <p className="text-white font-medium mt-1 uppercase text-sm tracking-tight">{aw.winner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase">Date</p>
                  <p className="text-slate-300 font-medium mt-1 text-sm">{aw.date}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 border-t border-slate-800 flex justify-center">
              <button className="text-xs font-bold text-blue-500 flex items-center gap-2 hover:gap-3 transition-all">
                VIEW CITATION <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-12 text-center bg-gradient-to-t from-blue-600/5 to-transparent border-blue-500/10">
        <h4 className="text-2xl font-bold text-white mb-4">Upcoming: ASAP Kerala Annual Excellence Awards 2026</h4>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Nominations are now open for the annual awards ceremony. Participate to showcase your institution's contribution to Kerala's skill ecosystem.
        </p>
        <button className="mt-8 px-8 py-3 bg-white text-[#0f172a] font-bold rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest text-sm">
          Submit Nomination
        </button>
      </div>
    </div>
  );
};

export default Awards;
