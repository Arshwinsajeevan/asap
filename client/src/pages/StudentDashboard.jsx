import React from 'react';
import { Award, Coins, BookOpen, Clock, ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 fade-in-slide-up">
      {/* Welcome Section */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Hello, Student! 👋</h1>
          <p className="text-slate-500">Welcome to your ASAP Kerala Skill Passport.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-[#FF6900]/10 text-[#FF6900] rounded-lg">
              <Coins size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Skill Coins</p>
              <p className="text-lg font-black text-slate-900">600</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-lg">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Tier</p>
              <p className="text-lg font-black text-slate-900">Basic</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="col-span-2 card-premium">
          <h2 className="text-xl font-bold mb-6">Active Learning</h2>
          <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">You haven't enrolled in any courses yet.</p>
            <button className="btn-primary mt-6 mx-auto">Browse Courses & Batches</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <div className="card-premium h-full">
            <h2 className="text-xl font-bold mb-6">Skill Passport</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00B4D8]"></div>
                  <span className="text-sm font-semibold">KYC Verification</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase">
                  Verified
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <span className="text-sm font-semibold text-slate-400">Course Certificates</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
