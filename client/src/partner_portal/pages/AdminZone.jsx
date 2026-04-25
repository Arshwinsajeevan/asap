import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreHorizontal, 
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText,
  Eye,
  Mail,
  Phone,
  Calendar,
  X,
  MapPin,
  CreditCard
} from 'lucide-react';

import { Routes, Route, useLocation, Link } from 'react-router-dom';

const AdminZone = ({ adminCategory }) => {
  const [partners, setPartners] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewPartner, setViewPartner] = useState(null);

  useEffect(() => {
    fetchData();
  }, [adminCategory]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const cat = adminCategory || 'ALL';
      const [partnersRes, statsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/admin/partners?category=${cat}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`http://localhost:5000/api/admin/stats?category=${cat}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const partnersData = await partnersRes.json();
      const statsData = await statsRes.json();

      if (Array.isArray(partnersData)) setPartners(partnersData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/partners/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchData();
        if (viewPartner && viewPartner.id === id) {
          setViewPartner({...viewPartner, status: newStatus});
        }
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.instituteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const RegistrationFlow = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-text italic tracking-tighter uppercase">Empanelment Control</h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage partner verification cycles</p>
        </div>
        <div className="flex gap-4 items-end">
          <StatMini label="Total Partners" value={stats.total} icon={<Users size={16} />} />
          <StatMini label="Pending" value={stats.pending} icon={<Clock size={16} />} color="text-amber-500" />
          <StatMini label="Verified" value={stats.active} icon={<ShieldCheck size={16} />} color="text-emerald-500" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, institute, email..."
              className="input-field pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'PENDING', 'AUDIT_ROUND_1', 'PHYSICAL_VERIFICATION', 'ACTIVE'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-xl text-[10px] whitespace-nowrap font-black uppercase tracking-widest transition-all ${
                  selectedStatus === status 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-slate-500 border border-border hover:border-primary'
                }`}
              >
                {status.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                <th className="px-8 py-5">Partner Details</th>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Verification Status</th>
                <th className="px-8 py-5">Applied Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary font-bold">
                        {partner.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text mb-0.5">{partner.name}</p>
                        <p className="text-xs text-slate-500 italic">{partner.instituteName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium text-slate-600">{partner.email}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getStatusColor(partner.status)}`}>
                      {partner.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                    {new Date(partner.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                          onClick={() => setViewPartner(partner)}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-border group-hover:border-primary/20"
                          title="View Details"
                       >
                         <Eye size={18} />
                       </button>

                       {partner.status !== 'ACTIVE' && (
                         <button 
                            onClick={() => updateStatus(partner.id, 'ACTIVE')}
                            className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center border border-emerald-100"
                            title="Approve"
                         >
                           <CheckCircle2 size={18} />
                         </button>
                       )}
                       {partner.status === 'PENDING' && (
                         <button 
                            onClick={() => updateStatus(partner.id, 'AUDIT_ROUND_1')}
                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center border border-blue-100"
                            title="Move to Audit"
                         >
                           <FileText size={18} />
                         </button>
                       )}
                       <button 
                          onClick={() => updateStatus(partner.id, 'REJECTED')}
                          className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center border border-rose-100"
                          title="Reject"
                       >
                         <XCircle size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPartners.length === 0 && !loading && (
            <div className="py-20 text-center text-slate-400 italic">
              No partners found matching the criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Placeholder = ({ title }) => (
    <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] text-slate-300">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter opacity-20">{title}</h2>
      <p className="text-xs font-bold uppercase tracking-widest mt-4">Module Implementation in Progress</p>
    </div>
  );

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<RegistrationFlow />} />
        <Route path="/partners" element={<RegistrationFlow />} />
        <Route path="/audit" element={<Placeholder title="Audit Management Desk" />} />
        <Route path="/requisitions" element={<Placeholder title="All Partner Requisitions" />} />
        <Route path="/skill-parks" element={<Placeholder title="Skill Parks Inventory" />} />
        <Route path="/settings" element={<Placeholder title="System Global Settings" />} />
      </Routes>

      <AnimatePresence>
        {viewPartner && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewPartner(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-black text-text uppercase tracking-tight italic">Partner Details</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Institutional Verification Audit</p>
                </div>
                <button 
                  onClick={() => setViewPartner(null)}
                  className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] border-2 border-primary/20 flex items-center justify-center text-primary text-4xl font-black italic">
                    {viewPartner.name[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text italic leading-tight">{viewPartner.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-widest text-[10px] bg-primary/5 px-4 py-1 rounded-full mt-2 inline-block">
                      {viewPartner.category || 'Empanelled Training Partner'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Basic Info - Always Visible */}
                  <DetailItem icon={<Building2 size={20} />} label="Legal Institute" value={viewPartner.instituteName} />
                  <DetailItem icon={<Mail size={20} />} label="Official Email" value={viewPartner.email} />
                  <DetailItem icon={<Phone size={20} />} label="Contact Number" value={viewPartner.phone} />
                  
                  {/* Compliance Info - Visible for Audit and beyond */}
                  {(viewPartner.status !== 'PENDING') && (
                    <>
                      <div className="pt-4 border-t border-border/50">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Compliance Identity</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <DetailItem icon={<ShieldCheck size={18} />} label="GST Number" value={viewPartner.gstNumber} />
                          <DetailItem icon={<FileText size={18} />} label="PAN Number" value={viewPartner.panNumber} />
                        </div>
                      </div>
                    </>
                  )}

                  {/* SPOC & Location - Visible for Verification and beyond */}
                  {(['PHYSICAL_VERIFICATION', 'ACTIVE'].includes(viewPartner.status)) && (
                    <>
                      <div className="pt-4 border-t border-border/50">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Administrative SPOC</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <DetailItem icon={<Users size={18} />} label="Coordinator" value={viewPartner.coordinatorName} />
                          <DetailItem icon={<Mail size={18} />} label="SPOC Email" value={viewPartner.spocEmail} />
                          <DetailItem icon={<MapPin size={18} />} label="Address" value={viewPartner.address} />
                        </div>
                      </div>
                    </>
                  )}

                  <DetailItem icon={<Calendar size={20} />} label="Registered On" value={new Date(viewPartner.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })} />
                </div>

                <div className="pt-6 border-t border-border">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Verification Control</h4>
                   <div className="flex gap-4">
                      {viewPartner.status !== 'ACTIVE' && (
                        <ActionButton 
                          onClick={() => updateStatus(viewPartner.id, 'ACTIVE')}
                          icon={<CheckCircle2 size={18} />}
                          label="Approve"
                          color="bg-emerald-600"
                        />
                      )}
                      {viewPartner.status === 'PENDING' && (
                        <ActionButton 
                          onClick={() => updateStatus(viewPartner.id, 'AUDIT_ROUND_1')}
                          icon={<FileText size={18} />}
                          label="Send to Audit"
                          color="bg-blue-600"
                        />
                      )}
                      <ActionButton 
                        onClick={() => updateStatus(viewPartner.id, 'REJECTED')}
                        icon={<XCircle size={18} />}
                        label="Reject"
                        color="bg-rose-600"
                      />
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatMini = ({ label, value, icon, color = 'text-primary' }) => (
  <div className="bg-white border border-border px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
    <div className={`w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="text-sm font-bold text-text">{value}</p>
    </div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
    <div className="text-primary mt-1">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-text italic">{value || 'Not provided'}</p>
    </div>
  </div>
);

const ActionButton = ({ onClick, icon, label, color }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl ${color} text-white hover:opacity-90 active:scale-95 transition-all shadow-lg`}
  >
    {icon}
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default AdminZone;
