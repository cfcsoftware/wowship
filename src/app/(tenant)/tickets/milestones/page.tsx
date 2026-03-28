"use client";

import React, { useState } from "react";
import { 
  Flag, 
  Target, 
  Calendar, 
  ChevronRight, 
  MoreHorizontal, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Layers,
  Users,
  DollarSign,
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";

const MILESTONES = [
  {
    id: "M-1",
    name: "Project Initiation & Discovery",
    owner: { name: "Sarah Chen", avatar: "SC", color: "bg-indigo-100 text-indigo-700" },
    status: "Completed",
    progress: 100,
    dueDate: "Sep 12, 2023",
    budget: "$12,500",
    tasks: 12,
    health: "Stable"
  },
  {
    id: "M-2",
    name: "System Architecture & API Design",
    owner: { name: "Alex Rivera", avatar: "AR", color: "bg-emerald-100 text-emerald-700" },
    status: "On Track",
    progress: 65,
    dueDate: "Oct 30, 2023",
    budget: "$45,000",
    tasks: 28,
    health: "Stable"
  },
  {
    id: "M-3",
    name: "Beta Version Development",
    owner: { name: "James Wilson", avatar: "JW", color: "bg-blue-100 text-blue-700" },
    status: "At Risk",
    progress: 32,
    dueDate: "Dec 15, 2023",
    budget: "$120,000",
    tasks: 154,
    health: "Delayed"
  },
  {
    id: "M-4",
    name: "Security Audit & Compliance",
    owner: { name: "Elena Vance", avatar: "EV", color: "bg-pink-100 text-pink-700" },
    status: "Pending",
    progress: 0,
    dueDate: "Jan 20, 2024",
    budget: "$25,000",
    tasks: 15,
    health: "Stable"
  }
];

export default function MilestoneList() {
  const [milestones] = useState(MILESTONES);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "On Track": return "text-blue-600 bg-blue-50 border-blue-100";
      case "At Risk": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Delayed": return "text-rose-600 bg-rose-50 border-rose-100";
      default: return "text-slate-500 bg-slate-50 border-slate-100";
    }
  };

  const getHealthDot = (health) => {
    return health === "Stable" ? "bg-emerald-500" : "bg-rose-500 animate-pulse";
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">
              <Flag size={14} className="fill-current" />
              Strategic Roadmap 2024
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Milestones</h1>
            <p className="text-slate-500 font-medium max-w-lg">Track critical path goals, phase transitions, and high-level project health across the enterprise.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
              <Target size={18} />
              Set Milestone
            </button>
          </div>
        </div>

        {/* Milestone Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Phases', value: '08', icon: Layers, color: 'text-indigo-600' },
            { label: 'Completion', value: '42%', icon: TrendingUp, color: 'text-emerald-600' },
            { label: 'Active Teams', value: '12', icon: Users, color: 'text-blue-600' },
            { label: 'Total Budget', value: '$202k', icon: DollarSign, color: 'text-slate-900' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="pl-10 pr-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Phase & Milestone</th>
                  <th className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Progress</th>
                  <th className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Lead Owner</th>
                  <th className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Budget</th>
                  <th className="pl-4 pr-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Target Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {milestones.map((ms) => (
                  <tr key={ms.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                    {/* Name & Health */}
                    <td className="pl-10 pr-4 py-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${getHealthDot(ms.health)} shadow-lg shadow-current/20`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                              {ms.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-400 rounded uppercase tracking-tighter">
                              {ms.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1.5">
                            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              {ms.tasks} sub-tasks
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                            <div className="text-xs text-indigo-500 font-bold hover:underline flex items-center gap-1">
                              View details <ChevronRight size={12} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Progress Engine */}
                    <td className="px-4 py-8">
                      <div className="flex flex-col items-center w-32 mx-auto">
                        <span className="text-xs font-black text-slate-900 mb-2">{ms.progress}%</span>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                          <div 
                            className={`h-full transition-all duration-1000 ${ms.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                            style={{ width: `${ms.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shadow-sm ${ms.owner.color}`}>
                          {ms.owner.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 leading-none">{ms.owner.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lead</p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-8">
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-wider shadow-sm ${getStatusStyle(ms.status)}`}>
                        {ms.status}
                      </div>
                    </td>

                    {/* Budget utilization */}
                    <td className="px-4 py-8 text-right">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-800 tracking-tight">{ms.budget}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilized</p>
                      </div>
                    </td>

                    {/* Date & Actions */}
                    <td className="pl-4 pr-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-5">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5 text-sm font-black text-slate-900">
                            <Calendar size={14} className="text-slate-300" />
                            {ms.dueDate}
                          </div>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${ms.status === 'At Risk' ? 'text-rose-500' : 'text-slate-400'}`}>
                            {ms.status === 'At Risk' ? 'High Urgency' : 'Scheduled'}
                          </p>
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Legend */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-emerald-500" />
             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Stable Health</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Intervention Required</span>
           </div>
           <div className="flex items-center gap-2">
             <Filter size={14} className="text-slate-400" />
             <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest cursor-pointer hover:underline">Advanced Filtering</span>
           </div>
        </div>
      </div>
    </div>
  );
}