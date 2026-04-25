import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MoreVertical, 
  Download, 
  UploadCloud, 
  X, 
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

const Students = ({ category }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const [manualFormData, setManualFormData] = useState({
    name: '',
    phone: '',
    aadhaar: ''
  });
  const fileInputRef = useRef(null);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/partners/students?category=${category || 'ALL'}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      const mapped = data.map(en => ({
        id: en.student.id.substring(0, 8).toUpperCase(),
        name: en.student.name,
        course: en.batch.course.title,
        batch: en.batch.name,
        mobile: en.student.phone || '91XXXXXXXX',
        status: en.status === 'SUCCESS' ? 'Enrolled' : 'Mobilized'
      }));
      setStudents(mapped);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [category]);

  const downloadTemplate = () => {
    const data = [
      ['Student Name', 'Mobile Number', 'Aadhaar Number', 'Target Course'],
      ['Rahul R', '919876543210', '123443215678', 'Python Full Stack'],
      ['Anjali S', '919876543211', '567887654321', 'AI & Machine Learning']
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "ASAP_Student_Template.xlsx");
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/partners/bulk-students', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          students: [
            {
              'Student Name': manualFormData.name,
              'Mobile Number': manualFormData.phone
            }
          ]
        })
      });

      const result = await res.json();
      if (res.ok) {
        setToast("Student successfully enrolled!");
        setIsAddModalOpen(false);
        setManualFormData({ name: '', phone: '', aadhaar: '' });
        fetchStudents();
      } else {
        setToast(`Error: ${result.message}`);
      }
      setTimeout(() => setToast(null), 5000);
    } catch (err) {
      setToast("Connection error");
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        try {
          const token = localStorage.getItem('token');
          const res = await fetch('http://localhost:5000/api/partners/bulk-students', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ students: data })
          });
          
          const result = await res.json();

          if (res.ok) {
            setToast(`${result.count} student records successfully synced with ASAP database!`);
            fetchStudents();
          } else {
            setToast(`Error: ${result.message || 'Upload failed'}`);
          }
          
          setTimeout(() => setToast(null), 5000);
        } catch (err) {
          console.error('Upload failed:', err);
          setToast('Network error: Could not reach ASAP servers');
          setTimeout(() => setToast(null), 5000);
        }
      };
      reader.readAsBinaryString(file);
      setIsImportModalOpen(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const stats = [
    { label: 'Total Mobilized', value: students.length, icon: <Users className="text-blue-500" /> },
    { label: 'Active Students', value: students.filter(s => s.status === 'Enrolled').length, icon: <Users className="text-emerald-500" /> },
    { label: 'New Enrolments', value: '12', icon: <UserPlus className="text-blue-500" /> },
    { label: 'Inquiries', value: '31', icon: <Users className="text-amber-500" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter uppercase italic">Student Management</h2>
          <p className="text-slate-500 mt-2 font-medium">Manage mobilizations, inquiries and student enrollments.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="btn-secondary flex items-center gap-2 border-border"
          >
            <Download size={18} />
            Bulk Import
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card-premium p-6 flex items-center gap-4 bg-white">
            <div className="p-3 bg-slate-50 rounded-xl border border-border">{stat.icon}</div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-text italic mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-4 items-center">
            <h3 className="text-xl font-black text-text uppercase italic tracking-tight">Student List</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
              {students.length} Items
            </span>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-field pl-10 pr-4 py-2 w-full md:w-64"
              />
            </div>
            <button className="p-2 border border-border rounded-xl text-slate-400 hover:text-primary transition-all bg-white hover:border-primary">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Syncing with ASAP Database...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-8 py-5">Student Name</th>
                  <th className="px-8 py-5">Course / Batch</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center font-black text-primary">
                        {stu.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-text group-hover:text-primary transition-colors">{stu.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stu.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-text text-sm font-bold">{stu.course}</p>
                      <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">{stu.batch}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 bg-slate-50 rounded-lg text-slate-400 hover:text-primary transition-colors border border-border flex items-center justify-center">
                        <Phone size={14} />
                      </button>
                      <button className="w-8 h-8 bg-slate-50 rounded-lg text-slate-400 hover:text-primary transition-colors border border-border flex items-center justify-center">
                        <Mail size={14} />
                      </button>
                      <span className="text-slate-600 text-sm font-bold tracking-tight">{stu.mobile}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      stu.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      stu.status === 'Mobilized' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {stu.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === stu.id ? null : stu.id)}
                      className={`p-2 rounded-lg transition-colors ${activeMenu === stu.id ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:text-primary hover:bg-slate-50'}`}
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {activeMenu === stu.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-8 top-16 w-48 bg-white rounded-2xl border border-border shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                          <button className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-primary flex items-center gap-3 transition-colors">
                            View Profile
                          </button>
                          <button className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-primary flex items-center gap-3 transition-colors">
                            Edit Record
                          </button>
                          <button className="w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors">
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-5 bg-slate-50 border-t border-border flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredStudents.length)} of {filteredStudents.length} Students
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    currentPage === i + 1 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border border-border hover:border-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 border border-border shadow-2xl relative"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <UserPlus className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text uppercase italic tracking-tight">Direct Enrolment</h3>
                  <p className="text-slate-500 text-sm font-medium">Register a new student manually into the system.</p>
                </div>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={manualFormData.name}
                      onChange={(e) => setManualFormData({...manualFormData, name: e.target.value})}
                      className="input-field py-3 font-bold" 
                      placeholder="E.g. Adarsh" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</label>
                    <input 
                      type="text" 
                      required
                      value={manualFormData.phone}
                      onChange={(e) => setManualFormData({...manualFormData, phone: e.target.value})}
                      className="input-field py-3 font-bold" 
                      placeholder="91XXXXXXXX" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aadhaar / National ID</label>
                   <input 
                     type="text" 
                     value={manualFormData.aadhaar}
                     onChange={(e) => setManualFormData({...manualFormData, aadhaar: e.target.value})}
                     className="input-field py-3 font-bold" 
                     placeholder="XXXX XXXX XXXX" 
                   />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Course</label>
                  <select className="input-field py-3 font-black uppercase text-xs tracking-widest">
                    <option>Python Fast-track</option>
                    <option>Data Analytics</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button onClick={() => setIsAddModalOpen(false)} type="button" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-border">Cancel</button>
                  <button type="submit" className="btn-accent px-10 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/20">Confirm Enrolment <ArrowRight size={16} /></button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Import Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg p-12 border border-border shadow-2xl relative text-center"
            >
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-text hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20 mx-auto mb-8">
                <FileSpreadsheet className="text-primary" size={48} />
              </div>
              
              <h3 className="text-2xl font-black text-text tracking-tighter uppercase italic mb-2">Bulk Enrolment</h3>
              <p className="text-slate-500 text-sm font-medium mb-10 max-w-xs mx-auto">Upload multiple student records at once using our approved template.</p>

              <div className="space-y-6">
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handleFileUpload}
                   accept=".xlsx, .xls, .csv"
                   className="hidden"
                 />
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   className="w-full p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-primary/50 hover:bg-primary/5 transition-all group flex flex-col items-center gap-4"
                 >
                    <UploadCloud className="text-slate-300 group-hover:text-primary transition-colors" size={40} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Drop Spreadsheet Here</span>
                 </button>

                 <div className="pt-8 border-t border-border">
                    <button 
                      onClick={downloadTemplate}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-emerald-500/20 font-black text-[10px] uppercase tracking-widest">
                       <FileSpreadsheet size={20} />
                       Download Template (.xlsx)
                    </button>
                    <p className="text-[9px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-black">Max 500 records per upload</p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 20 }}
            className="fixed bottom-10 right-10 z-[100] bg-emerald-600 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 italic">Success</p>
              <p className="font-bold text-sm">{toast}</p>
            </div>
            <button onClick={() => setToast(null)} className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Students;
