import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  ClipboardCheck, 
  CreditCard, 
  Users, 
  UserSquare2, 
  Video, 
  FileCheck, 
  BarChart3, 
  Award,
  Settings,
  FileText,
  Trophy,
  HandCoins,
  GraduationCap,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ status = 'active', isAdmin = false, user }) => {
  const location = useLocation();

  if (status !== 'active' && !isAdmin && !user) return null;

  const partnerNav = [
    {
      category: 'Overview',
      items: [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/partners-zone' },
        { title: 'Centre Profile', icon: <Building2 size={20} />, path: '/partners-zone/profile' },
      ]
    },
    {
      category: 'Training & Governance',
      items: [
        { title: 'Requisitions', icon: <BookOpen size={20} />, path: '/partners-zone/requisitions' },
        { title: 'Inspections', icon: <ClipboardCheck size={20} />, path: '/partners-zone/inspections' },
        { title: 'Batches', icon: <BarChart3 size={20} />, path: '/partners-zone/batches' },
        { title: 'Trainers', icon: <UserSquare2 size={20} />, path: '/partners-zone/trainers' },
      ]
    },
    {
      category: 'Life Cycle',
      items: [
        { title: 'Students', icon: <Users size={20} />, path: '/partners-zone/students' },
        { title: 'Assessments', icon: <FileCheck size={20} />, path: '/partners-zone/assessments' },
        { title: 'Certification', icon: <Award size={20} />, path: '/partners-zone/results' },
        { title: 'Scholarships', icon: <GraduationCap size={20} />, path: '/partners-zone/scholarships' },
      ]
    }
  ];

  const adminNav = [
    {
      category: 'Control Centre',
      items: [
        { title: 'Registration Flow', icon: <UserCheck size={20} />, path: '/admin' },
        { title: 'Partner Directory', icon: <Building2 size={20} />, path: '/admin/partners' },
        { title: 'Audit Desk', icon: <ShieldCheck size={20} />, path: '/admin/audit' },
      ]
    },
    {
      category: 'Governance',
      items: [
        { title: 'All Requisitions', icon: <BookOpen size={20} />, path: '/admin/requisitions' },
        { title: 'Skill Parks', icon: <Building2 size={20} />, path: '/admin/skill-parks' },
      ]
    },
    {
      category: 'Master Control',
      items: [
        { title: 'Global Overview', icon: <LayoutDashboard size={20} />, path: '/admin/overview' },
      ]
    }
  ];

  const lmsAdminNav = [
    {
      category: 'LMS Control',
      items: [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/lms-dashboard' },
        { title: 'Programs', icon: <BookOpen size={20} />, path: '/lms-dashboard/programs' },
        { title: 'Trainers', icon: <Users size={20} />, path: '/lms-dashboard/trainers' },
      ]
    },
    {
      category: 'Academic Ops',
      items: [
        { title: 'Sessions', icon: <Video size={20} />, path: '/lms-dashboard/sessions' },
        { title: 'Reports', icon: <BarChart3 size={20} />, path: '/lms-dashboard/reports' },
      ]
    }
  ];

  const studentNav = [
    {
      category: 'Learning',
      items: [
        { title: 'Overview', icon: <LayoutDashboard size={20} />, path: '/lms-dashboard' },
        { title: 'My Courses', icon: <BookOpen size={20} />, path: '/lms-dashboard/courses' },
        { title: 'Schedule', icon: <Video size={20} />, path: '/lms-dashboard/schedule' },
      ]
    },
    {
      category: 'Rewards',
      items: [
        { title: 'Skill Passport', icon: <FileText size={20} />, path: '/lms-dashboard/passport' },
        { title: 'Certificates', icon: <Award size={20} />, path: '/lms-dashboard/certificates' },
      ]
    }
  ];

  const trainerNav = [
    {
      category: 'Instruction',
      items: [
        { title: 'My Schedule', icon: <LayoutDashboard size={20} />, path: '/lms-dashboard' },
        { title: 'My Batches', icon: <BookOpen size={20} />, path: '/lms-dashboard/batches' },
      ]
    },
    {
      category: 'Admin',
      items: [
        { title: 'Attendance', icon: <UserCheck size={20} />, path: '/lms-dashboard/attendance' },
        { title: 'Assessments', icon: <FileCheck size={20} />, path: '/lms-dashboard/assessments' },
      ]
    }
  ];

  const corporateNav = [
    {
      category: 'Recruitment',
      items: [
        { title: 'Job Board', icon: <LayoutDashboard size={20} />, path: '/lms-dashboard' },
        { title: 'Applicants', icon: <Users size={20} />, path: '/lms-dashboard/applicants' },
      ]
    },
    {
      category: 'Interviews',
      items: [
        { title: 'Calendar', icon: <Video size={20} />, path: '/lms-dashboard/interviews' },
        { title: 'Company Profile', icon: <Building2 size={20} />, path: '/lms-dashboard/profile' },
      ]
    }
  ];

  const getNavigation = () => {
    if (isAdmin && user?.category === 'ALL') return adminNav;
    if (user?.role === 'ADMIN' && user?.category === 'LMS') return lmsAdminNav;
    if (user?.role === 'ADMIN') return adminNav; // Other category admins
    if (user?.role === 'TRAINER') return trainerNav;
    if (user?.role === 'STUDENT') return studentNav;
    if (user?.role === 'CORPORATE') return corporateNav;
    return partnerNav;
  };

  const navigation = getNavigation();

  return (
    <div className="w-64 bg-white border-r border-border flex flex-col shadow-sm">
      <div className="p-6 flex items-center gap-4">
        <img src="/Government_of_Kerala_Logo.png" alt="Government of Kerala" className="h-10 w-auto" />
        <img src="/ASAP-logo-28-1.png" alt="ASAP Kerala" className="h-8 w-auto" />
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto custom-scrollbar pb-12">
        {navigation.map((section) => (
          <div key={section.category} className="space-y-2">
            <h3 className="px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/10' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    <span className={`${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
                       {React.cloneElement(item.icon, { strokeWidth: 2, size: 18 })}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{item.title}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1 h-4 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border bg-slate-50/50">
        <Link to={isAdmin ? "/admin/settings" : "/partners-zone/profile"} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-primary transition-all group">
          <Settings size={18} strokeWidth={2} className="group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
