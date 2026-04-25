import React from 'react';
import { Filter, ChevronDown, CheckCircle2, Clock, Star, Users } from 'lucide-react';

const FilterIntelligence = ({ role }) => {
  const getFilters = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { label: 'Batch', icon: <Users size={14} />, options: ['All Batches', 'Morning', 'Evening'] },
          { label: 'Trainer', icon: <Star size={14} />, options: ['All Trainers', 'Lead', 'Guest'] },
          { label: 'Status', icon: <CheckCircle2 size={14} />, options: ['Active', 'Planned', 'Completed'] },
        ];
      case 'STUDENT':
        return [
          { label: 'Course Status', icon: <Clock size={14} />, options: ['Ongoing', 'Completed', 'Upcoming'] },
          { label: 'Skill Level', icon: <Star size={14} />, options: ['Beginner', 'Intermediate', 'Advanced'] },
        ];
      case 'CORPORATE':
        return [
          { label: 'Skill', icon: <Users size={14} />, options: ['Python', 'React', 'Design'] },
          { label: 'Score', icon: <Star size={14} />, options: ['90%+', '80%+', '70%+'] },
          { label: 'Cert', icon: <CheckCircle2 size={14} />, options: ['Certified', 'Provisional'] },
        ];
      default:
        return [];
    }
  };

  const filters = getFilters();

  return (
    <div className="flex items-center gap-4 py-6 border-b border-slate-100 mb-8 overflow-x-auto custom-scrollbar no-scrollbar">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
        <Filter size={14} /> Intelligence Filters
      </div>
      
      {filters.map((f, i) => (
        <button key={i} className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:border-primary/30 transition-all group whitespace-nowrap">
           <span className="text-slate-400 group-hover:text-primary transition-colors">{f.icon}</span>
           <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{f.label}:</span>
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{f.options[0]}</span>
           <ChevronDown size={12} className="text-slate-300" />
        </button>
      ))}
      
      <div className="ml-auto text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic pr-4">
        Live Filtering Active
      </div>
    </div>
  );
};

export default FilterIntelligence;
