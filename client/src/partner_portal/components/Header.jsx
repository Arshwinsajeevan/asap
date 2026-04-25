import React, { useState } from 'react';
import { Search, Bell, UserCircle, LogOut, Mail, Phone, MapPin, Building2, ChevronDown, BookOpen, Layers, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onLogout, partnerStatus, user }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.length > 1) {
      setIsSearching(true);
      try {
        const res = await fetch(`http://localhost:5000/api/lms/search?query=${val}`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error('Search failed');
      } finally {
        setIsSearching(false);
      }
    } else {
      setResults([]);
    }
  };

  const displayName = user?.email?.split('@')[0] || 'Guest User';
  const displayRole = user?.role || 'Guest';

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} strokeWidth={2} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for courses, trainers, batches..."
          className="input-field pl-10"
        />

        <AnimatePresence>
          {searchTerm.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-[120%] bg-white border border-border rounded-2xl shadow-2xl p-4 z-50"
            >
              {isSearching ? (
                <div className="p-8 text-center text-slate-400">
                   <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Scanning Registry...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                   {['Program', 'STUDENT', 'TRAINER', 'Batch'].map(cat => {
                     const catResults = results.filter(r => r.category === cat);
                     if (catResults.length === 0) return null;
                     return (
                       <div key={cat} className="space-y-2">
                         <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">{cat === 'Program' ? 'Academic Programs' : cat === 'STUDENT' ? 'Trainees' : cat === 'TRAINER' ? 'Instructors' : 'Training Batches'}</h4>
                         <div className="space-y-1">
                            {catResults.map((res, i) => (
                              <button key={i} className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group text-left">
                                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary border border-slate-100">
                                    {cat === 'Program' ? <BookOpen size={18} /> : cat === 'Batch' ? <Layers size={18} /> : <Users size={18} />}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{res.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.category}</p>
                                 </div>
                              </button>
                            ))}
                         </div>
                       </div>
                     );
                   })}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400">
                   <p className="text-[10px] font-black uppercase tracking-widest">No Intelligence Matches Found</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
              <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors uppercase tracking-tight">{displayName}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{displayRole}</p>
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
                        <UserCircle className="text-primary" size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text uppercase tracking-tight">{displayName}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{displayRole}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-5 border-t border-border">
                      <div className="flex items-start gap-3">
                        <Mail size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                          <p className="text-xs text-text">{user?.email || '-'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Contact</p>
                          <p className="text-xs text-text">{user?.mobile || 'Not Linked'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={14} strokeWidth={2} className="text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Category</p>
                          <p className="text-xs text-text leading-relaxed">{user?.category || 'General'}</p>
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
