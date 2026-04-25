import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Play, CheckCircle, Award, UserPlus, FilePlus, Calendar, ArrowRight } from 'lucide-react';

const QuickActionItem = ({ icon, label, onClick, primary = false }) => (
  <motion.button
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all group ${
      primary 
        ? 'bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-900/20' 
        : 'bg-white border-slate-200 text-slate-900 hover:border-primary/30'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${primary ? 'bg-primary/20 text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-primary/5'}`}>
        {icon}
      </div>
      <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
    </div>
    <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${primary ? 'text-primary' : 'text-slate-300'}`} />
  </motion.button>
);

const QuickActionsPanel = ({ role, actions = [] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mission Critical Actions</h3>
        <div className="h-px flex-1 bg-slate-100 ml-6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, i) => (
          <QuickActionItem 
            key={i} 
            icon={action.icon} 
            label={action.label} 
            onClick={action.onClick} 
            primary={i === 0} // First one is primary
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
