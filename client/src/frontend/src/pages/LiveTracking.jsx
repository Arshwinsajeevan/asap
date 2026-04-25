import { Video, Radio, Signal, Users, Clock, ExternalLink } from 'lucide-react';

const LiveTracking = () => {
  const activeClasses = [
    { id: 'C1', batch: 'DA-2026-B1', course: 'Data Analytics', students: 22, max: 30, startTime: '09:00 AM', streamStatus: 'Live' },
    { id: 'C2', batch: 'CS-2026-B1', course: 'Cyber Security', students: 18, max: 20, startTime: '10:30 AM', streamStatus: 'Live' },
    { id: 'C3', batch: 'ML-2026-B2', course: 'AI & ML', students: 0, max: 25, startTime: '02:00 PM', streamStatus: 'Offline' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live Tracking</h2>
          <p className="text-slate-400 mt-2">Monitor live attendance, classroom streams, and CCTV feeds.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Radio size={18} />
            Stream Settings
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Video size={18} />
            Setup CCTV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="bg-slate-800/80 p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-white">Live Stream: Classroom Hall A</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} />
                  01:24:45
                </span>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative group">
              <div className="p-8 bg-blue-600/30 rounded-full cursor-pointer hover:scale-110 transition-transform hidden group-hover:flex">
                <Radio className="text-white" size={48} />
              </div>
              <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md border border-white/10">
                1080p HD
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">Live</span>
                <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-md">
                  <Users size={10} />
                  24
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Signal size={20} className="text-blue-500" />
                Live Attendance Capturing
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Biometric and facial recognition sync is active for today's morning sessions. 
              </p>
              <div className="space-y-3 pt-4">
                {[
                  { label: 'Morning Slot', value: '112/120', status: 'Success' },
                  { label: 'Afternoon Slot', value: '45/120', status: 'In-progress' },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Video size={20} className="text-blue-500" />
                CCTV Network
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                4/4 cameras are operational. Cloud storage sync is active.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="aspect-video bg-slate-800 rounded-lg border border-slate-700 relative overflow-hidden group hover:border-blue-500 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-1 left-2 text-[8px] font-bold text-white uppercase opacity-70">Cam 0{idx}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Today's Schedule</h3>
            <div className="space-y-4">
              {activeClasses.map((cls) => (
                <div key={cls.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-3 group hover:border-blue-500/50 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{cls.batch}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cls.streamStatus === 'Live' ? 'bg-red-500/10 text-red-500' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {cls.streamStatus}
                    </span>
                  </div>
                  <h5 className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase leading-tight">{cls.course}</h5>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {cls.startTime}</span>
                    <span className="flex items-center gap-1 font-bold text-slate-300">{cls.students} / {cls.max} Present</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30">
            <h4 className="font-bold text-white">System Status</h4>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Stream Latency</span>
                <span className="text-sm font-bold text-emerald-500">120ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Storage Used</span>
                <span className="text-sm font-bold text-white">42.5 GB / 500 GB</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[8.5%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
