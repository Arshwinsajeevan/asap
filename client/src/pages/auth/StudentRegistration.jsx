import React, { useState } from 'react';
import { Fingerprint, Smartphone, Building2, TicketCheck, ArrowRight, ShieldCheck } from 'lucide-react';

const StudentRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    aadhaar: '',
    mobile: '',
    institute: '',
    otp: ''
  });

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center p-6 fade-in-slide-up">
      <div className="w-full max-w-xl">
        {/* Branding Header */}
        <div className="flex items-center justify-between mb-12">
          <img src="/Government_of_Kerala_Logo.png" alt="Govt. of Kerala" className="h-16 object-contain" />
          <div className="text-right">
            <img src="/ASAP-logo-28-1.png" alt="ASAP Kerala" className="h-12 object-contain ml-auto" />
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Unified Digital Portal</p>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between mb-8 px-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                step >= s ? 'bg-[#00B4D8] text-white shadow-lg shadow-[#00B4D8]/30' : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="card-premium p-10">
          {step === 1 && (
            <div className="fade-in-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-lg">
                  <Fingerprint size={24} />
                </div>
                <h2 className="text-2xl font-bold">Identity Verification</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Full Name (As per Aadhaar)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="E.g. Deepak Kumar"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Aadhaar Number</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      className="input-field pl-10" 
                      placeholder="XXXX-XXXX-XXXX"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Your Aadhaar data is encrypted and used only for verification.
                  </p>
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="btn-primary w-full mt-10 justify-center h-12 text-lg"
              >
                Continue to OTP
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#FF6900]/10 text-[#FF6900] rounded-lg">
                  <Smartphone size={24} />
                </div>
                <h2 className="text-2xl font-bold">Mobile Authentication</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Mobile Number</label>
                  <div className="flex gap-2">
                    <input type="text" className="input-field flex-1" placeholder="+91 XXXX XXX XXX" />
                    <button className="text-[#00B4D8] text-sm font-bold px-4 border border-[#00B4D8]/30 rounded-lg hover:bg-[#00B4D8]/5">Send OTP</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Enter 6-Digit OTP</label>
                  <input type="text" className="input-field tracking-[1em] text-center font-bold text-xl" maxLength={6} placeholder="000000" />
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="btn-primary w-full mt-10 justify-center h-12 text-lg"
              >
                Verify & Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Building2 size={24} />
                </div>
                <h2 className="text-2xl font-bold">Academic Mapping</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Are you from a Partner Institute?</label>
                  <select className="input-field">
                    <option value="">No, I am a Direct Student</option>
                    <option value="tbb">Yes, joining via TBB Program</option>
                    <option value="csd">Yes, Kerala Institute of Technology (KIT)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Note: Direct students will not receive special institutional discounts.
                  </p>
                </div>
                
                <div className="p-6 bg-[#FF6900]/5 border border-[#FF6900]/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <TicketCheck className="text-[#FF6900]" size={20} />
                    <p className="font-bold text-[#FF6900] text-sm">Welcome Reward Waiting!</p>
                  </div>
                  <p className="text-xs text-slate-600">On completing this step, you will immediately earn your first **100 Skill Coins** and be assigned to the **Basic Membership** tier.</p>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/student/dashboard'}
                className="btn-primary bg-[#FF6900] hover:bg-[#D95A00] w-full mt-10 justify-center h-12 text-lg"
              >
                Complete Registration
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm italic">
            "ASAP Kerala - Empowering through quality skill training"
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
