import React, { useState } from 'react';
import { Search, Bell, UserCircle, LogOut, Mail, Phone, MapPin, Building2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onLogout, partnerStatus }) => {
  const [showProfile, setShowProfile] = useState(false);

  const mockData = {
    'audit_round_1': { name: 'Audit Partner', email: 'partner1@asap.com', phone: '9876543210', address: 'Cyberpark, Kozhikode, KL', type: 'Private Centre' },
    'physical_verification': { name: 'Verification Partner', email: 'partner2@asap.com', phone: '9446000000', address: 'Technopark, Trivandrum, KL', type: 'Government Aided' },
    'active': { name: 'Approved Partner', email: 'partner3@asap.com', phone: '9123456789', address: 'ASAP Community Skill Park, Kochi', type: 'Skill Provider' }
  };

  const partner = mockData[partnerStatus] || { name: 'Guest Partner', email: '-', phone: '-', address: '-', type: 'Guest' };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} strokeWidth={2} />
        </span>
        <input
          type="text"
          placeholder="Search for courses, partners, batches..."
          className="input-field pl-10"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-primary transition-colors">
          <Bell size={20} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
        </button>
        
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors uppercase tracking-tight">{partner.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{partner.type}</p>
            </div>
            <button className="text-slate-500 group-hover:text-primary transition-colors">
              <UserCircle size={32} strokeWidth={2} />
            </button>
            <ChevronDown size={14} strokeWidth={2} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-80 bg-white border border-border rounded-2xl shadow-2xl p-6 space-y-6 z-50"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <Building2 className="text-primary" size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text uppercase tracking-tight">{partner.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{partner.type}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-5 border-t border-border">
                      <div className="flex items-start gap-3">
                        <Mail size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                          <p className="text-xs text-text">{partner.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Contact</p>
                          <p className="text-xs text-text">{partner.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Address</p>
                          <p className="text-xs text-text leading-relaxed">{partner.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <button 
                      onClick={onLogout}
                      className="w-full py-4 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all text-xs font-black flex items-center justify-center gap-2 tracking-widest"
                    >
                      <LogOut size={14} strokeWidth={2} /> LOG OUT
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
