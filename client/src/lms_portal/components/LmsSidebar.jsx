import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Award, 
  BarChart3, 
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LmsSidebar = ({ role, onLogout }) => {
  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/lms-dashboard' },
    { name: 'Programs', icon: BookOpen, path: '/lms-dashboard/programs' },
    { name: 'Trainers', icon: Users, path: '/lms-dashboard/trainers' },
    { name: 'Sessions', icon: Calendar, path: '/lms-dashboard/sessions' },
    { name: 'Reports', icon: BarChart3, path: '/lms-dashboard/reports' },
  ];

  const trainerLinks = [
    { name: 'My Schedule', icon: LayoutDashboard, path: '/lms-dashboard' },
    { name: 'My Batches', icon: BookOpen, path: '/lms-dashboard/batches' },
    { name: 'Attendance', icon: Users, path: '/lms-dashboard/attendance' },
    { name: 'Assessments', icon: Award, path: '/lms-dashboard/assessments' },
  ];

  const studentLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/lms-dashboard' },
    { name: 'My Courses', icon: BookOpen, path: '/lms-dashboard/courses' },
    { name: 'Schedule', icon: Calendar, path: '/lms-dashboard/schedule' },
    { name: 'Certificates', icon: Award, path: '/lms-dashboard/certificates' },
  ];

  const corporateLinks = [
    { name: 'Job Board', icon: LayoutDashboard, path: '/lms-dashboard' },
    { name: 'Applicants', icon: Users, path: '/lms-dashboard/applicants' },
    { name: 'Interviews', icon: Calendar, path: '/lms-dashboard/interviews' },
    { name: 'Company Profile', icon: Settings, path: '/lms-dashboard/profile' },
  ];

  const links = role === 'ADMIN' ? adminLinks : 
                role === 'TRAINER' ? trainerLinks : 
                role === 'CORPORATE' ? corporateLinks : 
                studentLinks;

  return (
    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">ASAP <span className="text-blue-500">LMS</span></span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Core Navigation
        </div>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group
              ${isActive 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}
            `}
          >
            {({ isActive }) => (
              <>
                <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-bold text-sm tracking-wide">{link.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-800/50 rounded-3xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-slate-700 to-slate-600 rounded-full border-2 border-slate-500 shadow-xl" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate uppercase tracking-tighter">{role} PORTAL</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">v1.0 (PRO)</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <LogOut size={14} />
            Termination
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LmsSidebar;
