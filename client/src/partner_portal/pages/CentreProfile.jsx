import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, Globe, ShieldCheck, Users, Clock, Loader2 } from 'lucide-react';

const CentreProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/partners/centre-profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Syncing Centre Records...</p>
    </div>
  );

  const isApproved = profile?.status === 'ACTIVE';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Renewal Tracking Bar */}
      <div className="bg-white border border-border p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
        <div className="flex items-center gap-5 shrink-0">
          <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center border border-primary/10">
            <Clock size={24} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Academic Cycle Status</span>
            <span className="text-lg font-black uppercase tracking-tight text-text italic">Yearly Accreditation Renewal</span>
          </div>
        </div>
        <div className="flex-1 w-full flex items-center gap-8">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div className="h-full bg-primary rounded-full w-[45%] shadow-[0_0_20px_rgba(0,180,216,0.2)]" />
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-primary tracking-tighter block leading-none italic">142 Days</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-1">Until Re-Audit</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Centre Profile</h2>
          <p className="text-slate-500 mt-2 font-medium">Manage your training centre information and compliance data.</p>
        </div>
        <button className="btn-accent px-10 py-3 shadow-lg shadow-primary/20 text-[10px] font-black uppercase tracking-[0.2em]">Update Centre Records</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card-premium p-10 bg-white border border-border shadow-sm">
            <h3 className="text-2xl font-black text-text mb-10 flex items-center gap-4 uppercase italic tracking-tight">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                <Building2 className="text-primary" size={24} />
              </div>
              Basic Information
            </h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Centre Name</label>
                <input 
                  type="text" 
                  defaultValue={profile?.instituteName || "ASAP Skill Park"}
                  disabled={isApproved}
                  className="input-field py-3 font-bold text-text disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Enrollment Category</label>
                <select 
                  defaultValue={profile?.category || "Accreditation"}
                  disabled={isApproved}
                  className="input-field py-3 font-black text-xs uppercase tracking-widest disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                   <option>Accreditation</option>
                   <option>Training Partner</option>
                   <option>Empanelled Training Partner</option>
                </select>
              </div>
              
              {/* Compliance Identity */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">GST Number</label>
                <input 
                  type="text" 
                  defaultValue={profile?.gstNumber || "29XXXXX"} 
                  disabled={isApproved}
                  className="input-field py-3 font-bold text-text disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PAN Number</label>
                <input 
                  type="text" 
                  defaultValue={profile?.panNumber || "ABCDE1234F"} 
                  disabled={isApproved}
                  className="input-field py-3 font-bold text-text disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Owner / Head Name</label>
                <input 
                  type="text" 
                  defaultValue={profile?.ownerName || "Head Person"} 
                  disabled={isApproved}
                  className="input-field py-3 font-bold text-text disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Number</label>
                <input 
                  type="text" 
                  defaultValue={profile?.phone || "+91 XXXXX XXXXX"} 
                  disabled={isApproved}
                  className="input-field py-3 font-bold text-text disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed" 
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Centre Location (Google Map)</label>
                <div className="w-full h-80 bg-slate-50 rounded-[2rem] overflow-hidden border border-border shadow-inner">
                  <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.5042846875!2d76.8770!3d8.5241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb0000000000%3A0x0000000000000000!2sASAP%20Kerala!5e0!3m2!1sen!2sin!4v1625678901234!5m2!1sen!2sin" 
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 contrast-[0.8] hover:contrast-100"
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </form>

            <div className="mt-16 pt-10 border-t border-slate-50 space-y-10">
              <h3 className="text-2xl font-black text-text flex items-center gap-4 uppercase italic tracking-tight">
                 <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                   <Users className="text-primary" size={24} />
                 </div>
                 Administrative SPOC
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Coordinator Name</label>
                  <input type="text" defaultValue="John Doe" className="input-field py-3 font-bold text-text" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Official Email</label>
                  <input type="email" defaultValue="trivandrum@asapkerala.gov.in" className="input-field py-3 font-bold text-text" />
                </div>
              </div>
              <div className="space-y-3 col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Postal Address</label>
                <textarea rows="3" defaultValue="7th Floor, Centre for Innovation in Technology, Kazhakkoottam, Thiruvananthapuram, Kerala 695582" className="input-field py-4 font-bold text-text leading-relaxed" />
              </div>
            </div>
          </div>

          <div className="card-premium p-10 bg-white border border-border shadow-sm">
            <h3 className="text-2xl font-black text-text mb-10 flex items-center gap-4 uppercase italic tracking-tight">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                <ShieldCheck className="text-emerald-500" size={24} />
              </div>
              Accreditation & Documents
            </h3>
            <div className="space-y-5">
              {[
                { name: 'Trade License', status: 'Verified', date: 'Exp: 12 Dec 2026' },
                { name: 'Safety Certificate', status: 'Verified', date: 'Exp: 05 Jan 2027' },
                { name: 'Infrastructure Audit', status: 'Pending', date: 'Submitted: 10 Apr 2026' },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-border group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-white border border-border rounded-xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                      <Globe size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-black text-text uppercase italic tracking-tight">{doc.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{doc.date}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                    doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
              <button className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                + Upload New Document
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="card-premium p-10 text-center bg-white border border-border shadow-sm">
            <div className="w-28 h-28 bg-primary/5 rounded-full mx-auto flex items-center justify-center mb-8 border-8 border-slate-50 shadow-inner">
              <Building2 size={48} className="text-primary" />
            </div>
            <h4 className="text-2xl font-black text-text uppercase italic tracking-tight">{profile?.instituteName || "ASAP Skill Park"}</h4>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-2">{profile?.category || "Training Partner"}</p>
            <div className="mt-10 pt-10 border-t border-slate-50 space-y-6 text-left">
              <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-border">
                   <MapPin size={18} className="text-primary" />
                </div>
                <span>Kerala, India</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-border">
                   <Mail size={18} className="text-primary" />
                </div>
                <span className="normal-case tracking-tight font-bold text-sm">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-border">
                   <Phone size={18} className="text-primary" />
                </div>
                <span>{profile?.phone}</span>
              </div>
            </div>
          </div>

          <div className="card-premium p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg shadow-primary/5">
            <h4 className="font-black text-text uppercase italic tracking-tight text-lg mb-4">Account Status</h4>
            <div className="flex items-center gap-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 border border-white">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px]">Active & Verified</p>
            </div>
            <p className="text-slate-500 text-sm mt-6 leading-relaxed font-medium">
              Your centre is currently authorized to conduct <span className="text-text font-black italic">12 skill modules</span> for the current academic year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentreProfile;
