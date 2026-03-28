"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  Search, 
  Filter, 
  UserPlus,
  Plus,
  ChevronDown,
  LayoutGrid,
  List,
  Calendar,
  MessageSquare,
  Paperclip,
  ArrowUpRight,
  Zap,
  MoreHorizontal
} from "lucide-react";

const INITIAL_TASKS = [
  {
    id: "TSK-101",
    title: "Implement Auth Flow",
    description: "Connect frontend login to Supabase backend services.",
    project: "Internal Dashboard",
    assignees: [
      { name: "Sarah Chen", avatar: "SC", color: "bg-indigo-100 text-indigo-700" },
      { name: "Alex Rivera", avatar: "AR", color: "bg-emerald-100 text-emerald-700" }
    ],
    priority: "High",
    status: "In Progress",
    dueDate: "Oct 24",
    comments: 12,
    attachments: 3,
    effort: "8h"
  },
  {
    id: "TSK-102",
    title: "UI Kit Documentation",
    description: "Drafting the guidelines for the new Design System v2.",
    project: "Design Ops",
    assignees: [
      { name: "Elena Vance", avatar: "EV", color: "bg-pink-100 text-pink-700" }
    ],
    priority: "Medium",
    status: "Review",
    dueDate: "Oct 26",
    comments: 5,
    attachments: 1,
    effort: "4h"
  },
  {
    id: "TSK-103",
    title: "Fix Navigation Lag",
    description: "Identify performance bottlenecks in mobile sidebar.",
    project: "Mobile App",
    assignees: [
      { name: "James Wilson", avatar: "JW", color: "bg-blue-100 text-blue-700" },
      { name: "Sarah Chen", avatar: "SC", color: "bg-indigo-100 text-indigo-700" }
    ],
    priority: "Urgent",
    status: "Stuck",
    dueDate: "Today",
    comments: 24,
    attachments: 0,
    effort: "12h"
  },
  {
    id: "TSK-104",
    title: "Database Migration",
    description: "Migrating legacy SQL records to the new cluster.",
    project: "Infrastructure",
    assignees: [
      { name: "Mark Thompson", avatar: "MT", color: "bg-slate-100 text-slate-700" }
    ],
    priority: "Low",
    status: "Planned",
    dueDate: "Nov 02",
    comments: 2,
    attachments: 8,
    effort: "16h"
  }
];

export default function TaskManagement() {
  const [tasks] = useState(INITIAL_TASKS);
  const [view, setView] = useState('list');

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Urgent": return "text-rose-600 bg-rose-50 border-rose-100";
      case "High": return "text-orange-600 bg-orange-50 border-orange-100";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-slate-500 bg-slate-50 border-slate-100";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-500 text-white";
      case "Review": return "bg-indigo-500 text-white";
      case "Stuck": return "bg-rose-500 text-white";
      case "Completed": return "bg-emerald-500 text-white";
      default: return "bg-slate-200 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navigation & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Team Tasks</h1>
            <p className="text-slate-500 text-sm font-medium">Manage and track your team's workflow efficiency.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95">
              <Plus size={18} />
              New Task
            </button>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks, projects, or team members..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={16} />
            Date Range
          </button>
        </div>

        {/* Main Task Table */}
        <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="pl-8 pr-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Task Title</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Assignees</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Effort</th>
                  <th className="pl-4 pr-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="group hover:bg-slate-50/50 transition-colors">
                    {/* Title & Info */}
                    <td className="pl-8 pr-4 py-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className={`w-5 h-5 rounded-md border-2 border-slate-200 flex items-center justify-center hover:border-indigo-500 transition-colors cursor-pointer`}>
                            {task.status === "Completed" && <CheckCircle2 size={14} className="text-indigo-500 fill-indigo-50" />}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-none">
                            {task.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{task.description}</p>
                          <div className="flex items-center gap-3 pt-1">
                            <span className="text-[10px] font-bold text-indigo-500 px-2 py-0.5 bg-indigo-50 rounded uppercase tracking-wider">{task.project}</span>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                              <MessageSquare size={12} /> {task.comments}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                              <Paperclip size={12} /> {task.attachments}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Assignees */}
                    <td className="px-4 py-6">
                      <div className="flex -space-x-2">
                        {task.assignees.map((user, idx) => (
                          <div 
                            key={idx}
                            title={user.name}
                            className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black shadow-sm cursor-pointer hover:z-10 transition-transform hover:scale-110 ${user.color}`}
                          >
                            {user.avatar}
                          </div>
                        ))}
                        <button className="w-8 h-8 rounded-full border-2 border-dashed border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all">
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getPriorityStyle(task.priority)}`}>
                        <Zap size={10} className="fill-current" />
                        {task.priority}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${getStatusBadge(task.status)} shadow-sm`}>
                          {task.status}
                        </div>
                        <ChevronDown size={14} className="text-slate-300" />
                      </div>
                    </td>

                    {/* Effort Indicator */}
                    <td className="px-4 py-6">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-slate-700">{task.effort}</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-slate-400 rounded-full" 
                            style={{ width: task.effort === '16h' ? '100%' : '60%' }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Due Date & Menu */}
                    <td className="pl-4 pr-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="text-right">
                          <span className={`text-xs font-black ${task.dueDate === 'Today' ? 'text-rose-500' : 'text-slate-700'}`}>
                            {task.dueDate}
                          </span>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline</p>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-slate-50/50 px-8 py-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">4 Tasks Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">12 Completed Today</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button 
                  key={p} 
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${p === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-white hover:text-indigo-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Workload Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Velocity</p>
              <h4 className="text-2xl font-black text-slate-900">24 <span className="text-sm font-bold text-slate-400 tracking-normal">tasks/wk</span></h4>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
               <ArrowUpRight size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Capacity</p>
              <h4 className="text-2xl font-black text-slate-900">82%</h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
               <UserPlus size={20} className="text-indigo-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critical Risks</p>
              <h4 className="text-2xl font-black text-rose-500">03</h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
               <AlertCircle size={20} className="text-rose-600" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}