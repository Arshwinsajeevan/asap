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

const Sidebar = ({ status = 'active', isAdmin = false }) => {
  const location = useLocation();

  if (status !== 'active' && !isAdmin) return null;

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
    }
  ];

  const navigation = isAdmin ? adminNav : partnerNav;

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
