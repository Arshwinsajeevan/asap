import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  ArrowRight,
  Plus,
  X,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="card-premium p-6 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
        {React.cloneElement(icon, { strokeWidth: 2 })}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center gap-1`}>
          <TrendingUp size={12} strokeWidth={2} /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-text mt-1">{value}</h3>
    </div>
  </div>
);

const DashboardOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalEnrollments: '0',
    activeBatches: '0',
    completedCourses: '0'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/partners/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setLiveStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Enrolments', value: liveStats.totalEnrollments, icon: <Users size={20} /> },
    { title: 'Active Batches', value: liveStats.activeBatches, icon: <Clock size={20} /> },
    { title: 'Completed Courses', value: liveStats.completedCourses, icon: <CheckCircle2 size={20} /> },
    { title: 'Pending Inspections', value: '2', icon: <AlertCircle size={20} /> },
    { title: 'Accreditation Renewal', value: '142 Days', icon: <Clock size={20} /> },
  ];

  const quickActions = [
    { name: 'Apply for New Course', icon: <BookOpen size={20} />, path: '/partners-zone/requisitions' },
    { name: 'Create New Batch', icon: <Clock size={20} />, path: '/partners-zone/batches' },
    { name: 'Register Trainer', icon: <Users size={20} />, path: '/partners-zone/trainers' },
    { name: 'Submit Assessments', icon: <CheckCircle2 size={20} />, path: '/partners-zone/assessments' },
  ];

  const recentActivities = [
    { id: 1, type: 'Enrolment', message: '5 students enrolled in Python Fast-track', time: '2 hours ago' },
    { id: 2, type: 'Assessment', message: 'Batch B-42 internal assessment completed', time: '5 hours ago' },
    { id: 3, type: 'Payment', message: 'Certification fee for Batch B-38 settled', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 page-transition">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-text tracking-tight">Partner Dashboard</h2>
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
              Accredited Partner
            </span>
          </div>
          <p className="text-slate-500 mt-2">Welcome back. Here's what's happening today at your center.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-border hover:bg-slate-50 text-text rounded-lg transition-all text-sm font-semibold">
            Download Reports
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-accent flex items-center gap-2 text-sm font-semibold"
          >
            New Requisition <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.button
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => {
              const paths = {
                'Total Enrolments': '/partners-zone/students',
                'Active Batches': '/partners-zone/batches',
                'Completed Courses': '/partners-zone/batches',
                'Pending Inspections': '/partners-zone/inspections',
                'Accreditation Renewal': '/partners-zone/profile'
              };
              navigate(paths[stat.title] || '#');
            }}
            className="text-left w-full"
          >
            <StatCard {...stat} />
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-text">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className="card-premium flex items-center gap-4 hover:border-primary/50 text-left group"
              >
                <div className={`p-4 rounded-xl bg-slate-50 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-400`}>
                  {React.cloneElement(action.icon, { strokeWidth: 2 })}
                </div>
                <div>
                  <p className="font-bold text-text">{action.name}</p>
                  <p className="text-slate-500 text-sm mt-1">Direct shortcut to {action.name.toLowerCase()}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-text">Recent Activity</h3>
          <div className="card-premium space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-1.5 h-full bg-primary/20 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text">{activity.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              View All logs
            </button>
          </div>
        </div>
      </div>

      {/* New Requisition Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-border overflow-hidden relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={2} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <FileText className="text-primary" size={24} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">Course Requisition</h3>
                  <p className="text-slate-500 text-sm">Submit a new course requisition for approval.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</label>
                    <select className="input-field py-3 font-semibold text-text">
                      <option>Python Full Stack Development</option>
                      <option>AI & Machine Learning</option>
                      <option>Robotics & Automation</option>
                      <option>Cloud Computing (AWS/Azure)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Batch Size</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 30"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Start Date</label>
                    <input 
                      type="date" 
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Training Mode</label>
                    <select className="input-field py-3 font-semibold text-text">
                      <option>Offline (at Skill Park)</option>
                      <option>Online / Virtual</option>
                      <option>Blended Learning</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Special Requirements (Optional)</label>
                  <textarea 
                    rows="3"
                    placeholder="Specific lab infrastructure or trainer requirements..."
                    className="input-field py-3"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-text rounded-lg transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-accent px-8"
                  >
                    Submit Requisition
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardOverview;
