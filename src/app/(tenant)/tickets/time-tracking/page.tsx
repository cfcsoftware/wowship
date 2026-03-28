"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Calendar, 
  DollarSign, 
  Tag, 
  ChevronRight, 
  MoreHorizontal, 
  Download, 
  BarChart3,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const TIME_LOGS = [
  {
    id: "LOG-921",
    user: "Sarah Chen",
    task: "API Authentication Layer refactor",
    project: "Nexus Core",
    phase: "Development",
    startTime: "09:00 AM",
    endTime: "11:45 AM",
    duration: "2h 45m",
    billable: true,
    rate: 150,
    status: "Approved",
    date: "Today"
  },
  {
    id: "LOG-920",
    user: "Alex Rivera",
    task: "High-fidelity mockups for Dashboard v2",
    project: "Solaris Design System",
    phase: "Design",
    startTime: "10:15 AM",
    endTime: "01:30 PM",
    duration: "3h 15m",
    billable: true,
    rate: 120,
    status: "Pending",
    date: "Today"
  },
  {
    id: "LOG-918",
    user: "James Wilson",
    task: "Server migration - Staging to Prod",
    project: "Infrastructure",
    phase: "DevOps",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    duration: "2h 00m",
    billable: false,
    rate: 0,
    status: "Approved",
    date: "Yesterday"
  },
  {
    id: "LOG-915",
    user: "Elena Vance",
    task: "Stakeholder sync & Roadmap review",
    project: "Nexus Core",
    phase: "Management",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    duration: "1h 30m",
    billable: true,
    rate: 180,
    status: "Rejected",
    date: "Yesterday"
  }
];

export default function TimeTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [timer, setTimer] = useState(0);

  // Simple mock timer effect
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Development": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Design": return "text-purple-600 bg-purple-50 border-purple-100";
      case "DevOps": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Management": return "text-rose-600 bg-rose-50 border-rose-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Approved") return <CheckCircle2 size={14} className="text-emerald-500" />;
    if (status === "Rejected") return <AlertCircle size={14} className="text-rose-500" />;
    return <Clock size={14} className="text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 lg:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Active Tracker Bar */}
        <div className={`p-4 rounded-3xl border transition-all duration-500 ${isTracking ? 'bg-indigo-900 border-indigo-800 shadow-2xl shadow-indigo-200' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isTracking ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-100 text-slate-400'}`}>
              <Clock size={24} className={isTracking ? 'animate-pulse' : ''} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <input 
                type="text" 
                placeholder="What are you working on right now?" 
                className={`bg-transparent border-none outline-none text-lg font-bold w-full placeholder:font-medium ${isTracking ? 'text-white placeholder:text-indigo-300/50' : 'text-slate-800 placeholder:text-slate-400'}`}
              />
              <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
                <span className={`text-xs font-black uppercase tracking-widest ${isTracking ? 'text-indigo-300' : 'text-slate-400'}`}>Project: Unassigned</span>
                <span className={`w-1 h-1 rounded-full ${isTracking ? 'bg-indigo-700' : 'bg-slate-200'}`} />
                <span className={`text-xs font-black uppercase tracking-widest ${isTracking ? 'text-indigo-300' : 'text-slate-400'}`}>Phase: N/A</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className={`text-3xl font-mono tracking-tight font-black ${isTracking ? 'text-white' : 'text-slate-300'}`}>
                {formatTimer(timer)}
              </div>
              <button 
                onClick={() => setIsTracking(!isTracking)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-lg ${isTracking ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-900/40' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}
              >
                {isTracking ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Hours', val: '124.5', icon: Clock, color: 'text-indigo-600' },
            { label: 'Billable Amount', val: '$14,200', icon: DollarSign, color: 'text-emerald-600' },
            { label: 'Avg. Daily', val: '6.4h', icon: BarChart3, color: 'text-blue-600' },
            { label: 'Pending Approval', val: '12 logs', icon: Tag, color: 'text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-800 leading-none">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
           <div className="flex items-center gap-2">
             <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 shadow-sm flex items-center gap-2 hover:bg-slate-50">
               <Calendar size={14} />
               Last 7 Days
             </button>
             <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 shadow-sm hover:bg-slate-50">
               All Projects
             </button>
           </div>
           <div className="flex items-center gap-2">
             <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-100 outline-none w-48 md:w-64" />
             </div>
             <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 shadow-sm">
               <Download size={18} />
             </button>
             <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700">
               <Plus size={14} />
               Log Manually
             </button>
           </div>
        </div>

        {/* Time Tracking Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/30">
                  <th className="pl-10 pr-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Details</th>
                  <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project / Phase</th>
                  <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Window</th>
                  <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Duration</th>
                  <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pl-4 pr-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Accounting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TIME_LOGS.map((log) => (
                  <tr key={log.id} className="group hover:bg-slate-50/50 transition-all">
                    {/* Entry Details */}
                    <td className="pl-10 pr-4 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[10px]">
                          {log.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{log.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-400">{log.user}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-[10px] font-bold text-slate-400">{log.date}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Project & Phase */}
                    <td className="px-4 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-600 uppercase tracking-tight">
                          {log.project}
                        </div>
                        <div className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider w-fit ${getPhaseColor(log.phase)}`}>
                          {log.phase}
                        </div>
                      </div>
                    </td>

                    {/* Time Window */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                        <span>{log.startTime}</span>
                        <ChevronRight size={12} className="text-slate-300" />
                        <span>{log.endTime}</span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-6">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-slate-800">{log.duration}</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full w-2/3" />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className={`text-[11px] font-black uppercase tracking-widest ${
                          log.status === 'Approved' ? 'text-emerald-600' : 
                          log.status === 'Rejected' ? 'text-rose-600' : 'text-amber-600'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </td>

                    {/* Accounting */}
                    <td className="pl-4 pr-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-5">
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-800">
                            {log.billable ? `$${(parseFloat(log.duration) * log.rate).toFixed(2)}` : '—'}
                          </p>
                          <p className={`text-[9px] font-black uppercase tracking-tighter ${log.billable ? 'text-emerald-500' : 'text-slate-300'}`}>
                            {log.billable ? 'Billable Entry' : 'Non-Billable'}
                          </p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}