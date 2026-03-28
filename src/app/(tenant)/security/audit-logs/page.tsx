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
  Bell
} from 'lucide-react';

const ACCESS_LOGS = [
  {
    id: "LOG-8291",
    user: "Alex Rivera",
    email: "arivera@acme-corp.com",
    action: "Successful Login",
    status: "success",
    device: "MacBook Pro - Chrome",
    location: "San Francisco, US",
    ip: "192.168.1.45",
    time: "2 mins ago",
    risk: "Low"
  },
  {
    id: "LOG-8290",
    user: "Unknown",
    email: "arivera@acme-corp.com",
    action: "Failed Login Attempt",
    status: "failed",
    device: "Linux x86 - Firefox",
    location: "Moscow, RU",
    ip: "95.161.22.110",
    time: "45 mins ago",
    risk: "High"
  },
  {
    id: "LOG-8289",
    user: "Sarah Chen",
    email: "schen@global-logistics.io",
    action: "MFA Verification",
    status: "success",
    device: "iPhone 15 - Safari",
    location: "Singapore, SG",
    ip: "111.65.34.22",
    time: "1 hour ago",
    risk: "Low"
  },
  {
    id: "LOG-8288",
    user: "Alex Rivera",
    email: "arivera@acme-corp.com",
    action: "Password Reset",
    status: "warning",
    device: "MacBook Pro - Chrome",
    location: "San Francisco, US",
    ip: "192.168.1.45",
    time: "3 hours ago",
    risk: "Medium"
  },
  {
    id: "LOG-8287",
    user: "System",
    email: "admin@acme-corp.com",
    action: "API Key Generated",
    status: "success",
    device: "Server Node - AWS",
    location: "Virginia, US",
    ip: "54.23.11.90",
    time: "5 hours ago",
    risk: "Low"
  },
  {
    id: "LOG-8286",
    user: "Mark Thompson",
    email: "m.thompson@design.studio.com",
    action: "Session Terminated",
    status: "info",
    device: "Windows 11 - Edge",
    location: "London, UK",
    ip: "82.44.120.9",
    time: "Yesterday",
    risk: "Low"
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

const RiskTag = ({ level }) => {
  const colors = {
    Low: "text-emerald-500",
    Medium: "text-amber-500",
    High: "text-rose-500 font-black"
  };
  return <span className={`text-[11px] font-bold ${colors[level]}`}>{level}</span>;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-800 font-sans">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Simplified Top Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Shield size={22} />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Security Audit Logs</h1>
                <p className="text-xs text-slate-400 font-medium">Monitoring 12,402 global authentication events</p>
              </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search logs, IPs, or users..." 
                className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <Bell size={20} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all">
              <RefreshCw size={16} /> Refresh Feed
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {/* Summary Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Events', value: '12.4k', sub: '+12% increase', icon: <Activity className="text-blue-500" /> },
              { label: 'Failed Attempts', value: '142', sub: 'Action required', icon: <AlertTriangle className="text-rose-500" /> },
              { label: 'Geo Locations', value: '48', sub: 'Countries active', icon: <Globe className="text-indigo-500" /> },
              { label: 'System Health', value: 'Optimal', sub: 'Latency: 24ms', icon: <ShieldCheck className="text-emerald-500" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">{stat.icon}</div>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">Live</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-500 mt-1">{stat.label}</p>
                <div className="mt-4 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-slate-400 font-medium">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Log Table Container */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-6">
                <button className="text-sm font-black text-indigo-600 relative after:content-[''] after:absolute after:-bottom-6 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600">All Activity</button>
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Security Alerts</button>
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Session Audits</button>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Filter size={14} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Download size={14} /> CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User Identity</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Activity & Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Origin / Device</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Level</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                    <th className="px-8 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {ACCESS_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100 shadow-sm">
                            {log.user === "Unknown" ? <Shield size={18} /> : <User size={18} />}
                            </div>
                            <div>
                            <p className="text-sm font-bold text-slate-900 leading-none mb-1.5">{log.user}</p>
                            <p className="text-[11px] text-slate-400 font-medium font-mono tracking-tight">{log.email}</p>
                            </div>
                        </div>
                        </td>
                        <td className="px-8 py-5">
                        <div className="flex flex-col gap-1.5 items-start">
                            <StatusBadge status={log.status} />
                            <span className="text-xs text-slate-600 font-semibold">{log.action}</span>
                        </div>
                        </td>
                        <td className="px-8 py-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-slate-300" />
                                <span className="text-xs font-bold text-slate-700">{log.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Monitor size={12} className="text-slate-300" />
                                <span className="text-[11px] font-medium text-slate-400">{log.ip}</span>
                            </div>
                        </div>
                        </td>
                        <td className="px-8 py-5">
                        <RiskTag level={log.risk} />
                        </td>
                        <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                            <Clock size={12} className="text-slate-300" />
                            {log.time}
                        </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                        <button className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-slate-100">
                            <ExternalLink size={16} />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/20">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-500">Rows per page:</p>
                <select className="bg-transparent text-xs font-black text-slate-900 focus:outline-none">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs font-bold text-slate-400 italic">1-6 of 1,242 events</p>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-colors" disabled><ChevronLeft size={20} /></button>
                    <button className="w-8 h-8 flex items-center justify-center text-xs font-black text-white bg-indigo-600 rounded-lg shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">3</button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
};

export default App;