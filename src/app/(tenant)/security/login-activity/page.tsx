"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  Globe, 
  Monitor, 
  Smartphone, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download,
  AlertTriangle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  User,
  Activity,
  RefreshCw,
  ExternalLink,
  Settings,
  Bell,
  Fingerprint,
  Mail,
  Zap
} from 'lucide-react';

const LOGIN_ACTIVITY = [
  {
    id: "AUTH-9901",
    user: "Alex Rivera",
    email: "arivera@acme-corp.com",
    method: "SSO (Okta)",
    status: "success",
    device: "MacBook Pro • Chrome",
    location: "San Francisco, US",
    ip: "192.168.1.45",
    time: "Just now",
    risk: "Low",
    details: "Standard office IP"
  },
  {
    id: "AUTH-9900",
    user: "Unknown",
    email: "arivera@acme-corp.com",
    method: "Password",
    status: "failed",
    device: "Linux x86 • Firefox",
    location: "Moscow, RU",
    ip: "95.161.22.110",
    time: "12 mins ago",
    risk: "High",
    details: "Multiple failed attempts"
  },
  {
    id: "AUTH-9899",
    user: "Sarah Chen",
    email: "schen@global-logistics.io",
    method: "MFA (Biometric)",
    status: "success",
    device: "iPhone 15 • Safari",
    location: "Singapore, SG",
    ip: "111.65.34.22",
    time: "45 mins ago",
    risk: "Low",
    details: "Verified via FaceID"
  },
  {
    id: "AUTH-9898",
    user: "Mark Thompson",
    email: "m.thompson@design.studio.com",
    method: "MFA (Email)",
    status: "warning",
    device: "Windows 11 • Edge",
    location: "London, UK",
    ip: "82.44.120.9",
    time: "2 hours ago",
    risk: "Medium",
    details: "New device detected"
  },
  {
    id: "AUTH-9897",
    user: "System Admin",
    email: "admin@acme-corp.com",
    method: "Hardware Key",
    status: "success",
    device: "ThinkPad • Brave",
    location: "Berlin, DE",
    ip: "46.12.89.201",
    time: "5 hours ago",
    risk: "Low",
    details: "YubiKey 5C used"
  },
  {
    id: "AUTH-9896",
    user: "Jessica Wu",
    email: "j.wu@corporate.net",
    method: "Password",
    status: "failed",
    device: "Android 14 • Chrome",
    location: "Seattle, US",
    ip: "67.180.22.4",
    time: "Yesterday",
    risk: "Medium",
    details: "Incorrect credentials"
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    failed: "bg-rose-50 text-rose-600 border-rose-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    info: "bg-slate-50 text-slate-500 border-slate-100"
  };
  
  const icons = {
    success: <ShieldCheck size={12} />,
    failed: <ShieldAlert size={12} />,
    warning: <AlertTriangle size={12} />,
    info: <Activity size={12} />
  };

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const MethodIcon = ({ method }) => {
  if (method.includes("Biometric") || method.includes("Fingerprint")) return <Fingerprint size={14} className="text-indigo-500" />;
  if (method.includes("Email")) return <Mail size={14} className="text-amber-500" />;
  if (method.includes("Hardware") || method.includes("Key")) return <Key size={14} className="text-emerald-500" />;
  if (method.includes("SSO")) return <Zap size={14} className="text-blue-500" />;
  return <Lock size={14} className="text-slate-400" />;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-800 font-sans">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <Lock size={22} />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Sentinel<span className="text-indigo-600">Auth</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Login & Access Intelligence</p>
              </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search by user, IP, or location..." 
                className="bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm w-96 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all outline-none font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-lg shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
              <RefreshCw size={16} className="animate-spin-slow" /> Force Sync
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {/* Header Stats & Health Score */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Health Score Card */}
            <div className="lg:w-1/3 bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
               <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">Tenant Health Score</span>
                    <ShieldCheck size={24} className="text-white/40" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-6xl font-black">94</h2>
                    <span className="text-xl font-bold text-white/60">/100</span>
                  </div>
                  <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[94%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                  </div>
                  <p className="mt-6 text-sm font-medium text-white/80 leading-relaxed">
                    3 critical security updates pending. MFA enforcement is active for 98% of users.
                  </p>
               </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { label: 'Active Sessions', val: '4,209', icon: <Monitor />, color: 'blue', detail: 'Across 12 nodes' },
                 { label: 'Failed Logins', val: '28', icon: <ShieldAlert />, color: 'rose', detail: 'Last 60 minutes' },
                 { label: 'Avg Auth Time', val: '1.2s', icon: <Clock />, color: 'emerald', detail: 'SSO performance' },
                 { label: 'Geo-Fencing', val: 'Active', icon: <Globe />, color: 'amber', detail: '8 restricted zones' }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white border border-slate-200 p-6 rounded-[2rem] hover:border-indigo-100 transition-all group shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-${item.color}-50 text-${item.color}-500 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-tight mb-1">{item.label}</p>
                        <h4 className="text-2xl font-black text-slate-900">{item.val}</h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">{item.detail}</p>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-black text-slate-900 ml-2">Real-time Login Activity</h3>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  <Filter size={14} /> Refine View
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  <Download size={14} /> Export Logs
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">User & Identity</th>
                    <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">Method</th>
                    <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">Auth Status</th>
                    <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">Origin Info</th>
                    <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-widest">Risk Analysis</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LOGIN_ACTIVITY.map((log) => (
                    <tr key={log.id} className="hover:bg-indigo-50/20 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">
                              {log.user === "Unknown" ? "?" : log.user.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${log.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 mb-0.5">{log.user}</p>
                            <p className="text-[11px] text-slate-400 font-bold font-mono tracking-tighter">{log.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2.5 bg-slate-50 w-fit px-3 py-1.5 rounded-xl border border-slate-100">
                          <MethodIcon method={log.method} />
                          <span className="text-xs font-bold text-slate-700">{log.method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-slate-300" />
                            <span className="text-xs font-bold text-slate-700">{log.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor size={12} className="text-slate-300" />
                            <span className="text-[10px] font-medium text-slate-400">{log.device}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className={`text-[11px] font-black uppercase tracking-wider mb-1 ${log.risk === 'High' ? 'text-rose-500' : log.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {log.risk} Risk
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 leading-tight italic">{log.details}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <span className="text-[10px] font-bold text-slate-300 mr-2 uppercase tracking-tighter">{log.time}</span>
                           <button className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-slate-100">
                              <MoreHorizontal size={18} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-slate-50/50 flex justify-center">
               <button className="text-xs font-black text-indigo-600 hover:text-indigo-800 tracking-widest uppercase flex items-center gap-2">
                  View full audit trail <ChevronRight size={14} />
               </button>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default App;