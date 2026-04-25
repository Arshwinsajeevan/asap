import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ClipboardCheck, 
  MapPin, 
  CheckCircle2, 
  CreditCard, 
  Timer,
  ArrowRight,
  AlertCircle,
  FileText,
  UploadCloud,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const Onboarding = ({ partnerStatus, children }) => {
  if (partnerStatus === 'active') {
    return children;
  }

  // Common Header for all stages to maintain consistency
  const getStageConfig = () => {
    switch(partnerStatus) {
      case 'enrolling': return { title: 'Partner Enrollment', icon: Building2, color: 'primary', desc: 'Stage 1: Institutional Registration' };
      case 'audit_round_1': return { title: '1st Round Audit', icon: ClipboardCheck, color: 'primary', desc: 'Stage 2: Compliance & Documentation' };
      case 'physical_verification': return { title: 'Physical Verification', icon: MapPin, color: 'primary', desc: 'Stage 3: Site Visit & Final Intake' };
      case 'expired': return { title: 'Membership Renewal', icon: Timer, color: 'rose', desc: 'Renewal: Account Reactivation' };
      default: return { title: 'Onboarding', icon: Building2, color: 'primary', desc: 'Training Partner Portal' };
    }
  };

  const config = getStageConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-full bg-background p-8 space-y-8 page-transition">
      {/* Universal Progress Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border border-border p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-sm">
            <Icon className="text-primary" size={32} strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-3xl font-black text-text tracking-tight uppercase">{config.title}</h1>
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-black tracking-widest uppercase">
                Active Process
              </span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{config.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-border">
          <PhaseIndicator active={partnerStatus === 'enrolling'} done={partnerStatus !== 'enrolling'} num="1" />
          <div className="w-8 h-[2px] bg-border" />
          <PhaseIndicator active={partnerStatus === 'audit_round_1'} done={partnerStatus === 'physical_verification'} num="2" />
          <div className="w-8 h-[2px] bg-border" />
          <PhaseIndicator active={partnerStatus === 'physical_verification'} done={false} num="3" />
        </div>
      </div>

      <div className="w-full">
        {partnerStatus === 'enrolling' && <StageEnrollment />}
        {partnerStatus === 'audit_round_1' && <StageAudit />}
        {partnerStatus === 'physical_verification' && <StageVerification />}
        {partnerStatus === 'expired' && <StageRenewal />}
      </div>
    </div>
  );
};

const PhaseIndicator = ({ active, done, num }) => (
  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
    active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 
    done ? 'bg-primary/20 text-primary border border-primary/20' : 
    'bg-white text-slate-400 border border-border'
  }`}>
    {done ? <CheckCircle2 size={18} strokeWidth={2} /> : num}
  </div>
);

const StageEnrollment = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
    <div className="xl:col-span-2 space-y-8">
      <div className="card-premium p-10 space-y-10">
        <h3 className="text-xl font-bold text-text flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          Institutional Information
        </h3>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField label="Legal Institution Name" placeholder="As per registration" />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Institution Category</label>
              <select className="input-field py-4 font-bold text-text">
                <option>Accreditation</option>
                <option>Training Partner</option>
                <option>Empanelled Training Partner</option>
              </select>
            </div>
            <InputField label="Contact Email" type="email" placeholder="admin@domain.com" />
            <InputField label="Mobile Number" placeholder="+91 XXXXX XXXXX" />
            <InputField label="District" placeholder="Select District" />
            <InputField label="Coordinator Name" placeholder="SPOC full name" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Postal Address</label>
            <textarea className="input-field py-4 min-h-[120px] font-medium" rows="4" placeholder="Detailed address with PIN code" />
          </div>
          <button className="btn-accent w-full py-5 rounded-2xl text-lg font-black tracking-widest flex items-center justify-center gap-3">
            SUBMIT ENROLLMENT DATA <ArrowRight size={22} strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
    <div className="space-y-8">
      <div className="bg-white border border-border p-8 rounded-3xl space-y-6 shadow-sm">
        <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Prerequisites</h3>
        <ul className="space-y-5">
          <CheckItem text="Valid Government Registration" />
          <CheckItem text="Minimum 2000sqft Space" />
          <CheckItem text="Dedicated Training SPOC" />
          <CheckItem text="Lab Infrastructure Details" />
        </ul>
      </div>
      <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl">
        <AlertCircle className="text-primary mb-4" strokeWidth={2} />
        <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">Please ensure all details match your official documents. This data will be used for the audit and empanelment agreement.</p>
      </div>
    </div>
  </motion.div>
);

const StageAudit = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
      <div className="xl:col-span-2 space-y-8">
        <div className="card-premium p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-text flex items-center gap-3">
              <div className="w-2 h-6 bg-primary rounded-full" />
              Standard Compliance
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-lg border border-border">Required docs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DocItem name="Accreditation Certificate" status="pending" />
            <DocItem name="Infrastructure Photos" status="required" />
            <DocItem name="Affiliation Letter" status="pending" />
            <DocItem name="Trainer Profiles" status="required" />
          </div>
        </div>

        <div className="card-premium p-8 space-y-8">
          <h3 className="text-xl font-bold text-text flex items-center gap-3">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Business & Ownership Details
          </h3>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-border pb-3">Institution Identity</h4>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <InputField label="GST Number" placeholder="29XXXXX0000X0Z0" />
                    <UploadField label="Upload GST Certificate" />
                  </div>
                  <div className="space-y-4">
                    <InputField label="PAN Number" placeholder="ABCDE1234F" />
                    <UploadField label="Upload PAN Card" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-border pb-3">Ownership Details</h4>
                <div className="grid grid-cols-1 gap-6">
                  <InputField label="Owner Name" placeholder="Full Name" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Age" placeholder="Years" type="number" />
                    <InputField label="Exp (Years)" placeholder="Yrs" type="number" />
                  </div>
                  <InputField label="Educational Qualification" placeholder="E.g. MBA, PhD" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <button type="button" className="btn-accent w-full py-5 rounded-xl flex items-center justify-center gap-3 font-black tracking-widest text-xs">
                SAVE & UPDATE AUDIT REQUISITION <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="bg-primary p-10 rounded-3xl shadow-2xl shadow-primary/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <ShieldCheck size={120} strokeWidth={1} />
          </div>
          <h3 className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em] mb-8">Empanelment Fee</h3>
          <p className="text-xs text-white/60 mb-2 font-bold uppercase">1st Installment</p>
          <p className="text-5xl font-black text-white mb-10 tracking-tighter shadow-sm">₹25,000</p>
          <button className="w-full py-5 bg-white text-primary rounded-xl font-black tracking-widest uppercase text-xs hover:shadow-xl transition-all active:scale-95">
            PAY & SUBMIT AUDIT
          </button>
        </div>

        <div className="bg-white border border-border p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-primary">
            <Timer size={20} strokeWidth={2} />
            <p className="font-black text-[10px] uppercase tracking-widest text-text">Audit Window</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">Desk audit commences once both documentation and fee payment are completed by the academy.</p>
        </div>
      </div>
    </motion.div>
  );
};

const StageVerification = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
    <div className="xl:col-span-2 space-y-8">
      <div className="bg-primary/5 border-primary/20 border-2 p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10">
          <CheckCircle2 className="text-primary opacity-10" size={120} strokeWidth={1} />
        </div>
        <h3 className="text-3xl font-black text-primary mb-4 uppercase tracking-tighter italic">Audit Approved!</h3>
        <p className="text-slate-600 font-bold max-w-lg leading-relaxed uppercase tracking-widest text-[11px]">Your documentation meets the institutional standards. We are now moving to the site verification phase.</p>
      </div>

      <div className="card-premium p-10 space-y-12">
        <h3 className="text-xl font-bold text-text flex items-center gap-3 tracking-tight uppercase">
          <div className="w-2 h-8 bg-primary rounded-full" />
          Scheduled Site Inspection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoStat label="Date" val="Oct 24, 2026" />
          <InfoStat label="Expected Time" val="10:30 AM" />
          <InfoStat label="Assigned Officer" val="Rahul Kumar" />
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl border border-border flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
            <ShieldCheck size={28} className="text-primary" strokeWidth={2} />
          </div>
          <div>
            <p className="text-text font-black uppercase tracking-widest text-xs mb-2">Infrastructure Readiness</p>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Please ensure all labs are powered up and trainers are available for initial orientation during the site visit.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-8">
      <div className="bg-white border border-border p-10 rounded-[2.5rem] shadow-sm relative">
        <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-12">Final Approval Fee</p>
        <p className="text-xs text-slate-400 font-black mb-3 uppercase tracking-widest">Balance Payable</p>
        <p className="text-5xl font-black text-text mb-12 tracking-tighter">₹75,000</p>
        <button className="w-full py-6 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl shadow-accent/20 transition-all active:scale-95">
          SETTLE FINAL DUES
        </button>
      </div>
    </div>
  </motion.div>
);

const StageRenewal = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full card-premium p-16 text-center space-y-12 bg-rose-50/30 border-rose-100">
      <div className="w-24 h-24 bg-rose-100 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl mx-auto transform rotate-12">
        <Timer className="text-rose-500" size={48} strokeWidth={2} />
      </div>
      <div className="space-y-5">
        <h2 className="text-4xl font-black text-text uppercase tracking-tight italic">Access Suspended</h2>
        <p className="text-slate-500 font-bold text-[13px] uppercase tracking-[0.15em] leading-relaxed">Your partnership cycle has concluded. Please initiate renewal to resume academy operations.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 pt-8">
        <button className="flex-1 py-5 rounded-2xl border-2 border-border text-slate-500 font-black tracking-widest uppercase text-xs hover:bg-slate-50 transition-all">
          VIEW HISTORY
        </button>
        <button className="flex-1 py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black tracking-widest uppercase text-xs shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-3">
          PROCESS RENEWAL <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  </div>
);

const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{label}</label>
    <input type={type} className="input-field py-3.5" placeholder={placeholder} />
  </div>
);

const UploadField = ({ label }) => {
  const [file, setFile] = useState(null);
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{label}</label>
      <label className="flex items-center justify-between px-5 py-4 bg-slate-50 border border-border rounded-xl cursor-pointer group hover:bg-primary/5 hover:border-primary transition-all">
        <span className="text-xs text-slate-400 font-bold truncate max-w-[150px]">{file ? file.name : 'Choose File'}</span>
        <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        <UploadCloud size={16} className="text-slate-400 group-hover:text-primary" strokeWidth={2} />
      </label>
    </div>
  );
};

const CheckItem = ({ text }) => (
  <li className="flex items-center gap-4 text-slate-600">
    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
      <div className="w-2 h-2 bg-primary rounded-full" />
    </div>
    <span className="text-sm font-bold uppercase tracking-wide text-[11px]">{text}</span>
  </li>
);

const DocItem = ({ name, status }) => {
  const [fileName, setFileName] = useState(null);
  
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-border rounded-2xl hover:border-primary transition-all group shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${fileName ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
          <FileText size={20} strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-bold text-text mb-1 uppercase tracking-tight">{name}</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest truncate max-w-[120px]">{fileName || status}</p>
        </div>
      </div>
      <label className="cursor-pointer p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
        <input 
          type="file" 
          className="hidden" 
          onChange={(e) => setFileName(e.target.files[0]?.name)}
        />
        <UploadCloud size={20} strokeWidth={2} />
      </label>
    </div>
  );
};

const InfoStat = ({ label, val }) => (
  <div className="bg-slate-50 border border-border p-6 rounded-2xl shadow-sm">
    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2">{label}</p>
    <p className="text-xl font-black text-text tracking-tight uppercase">{val}</p>
  </div>
);

export default Onboarding;
