"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  LayoutGrid, 
  List, 
  BarChart3,
  Users,
  Flag,
  ArrowUpRight,
  ChevronRight,
  Timer
} from "lucide-react";

/* ---------------- MOCK PROJECT DATA ---------------- */
const PROJECTS = [
  {
    id: "PRJ-001",
    title: "Next-Gen Mobile App",
    category: "Development",
    client: "Global Retail Corp",
    priority: "High",
    status: "In Progress",
    progress: 68,
    dueDate: "Dec 15, 2024",
    lead: "Alex Rivera",
    leadAvatar: "AR",
    teamSize: 12,
    health: "Healthy",
    budget: "$240k"
  },
  {
    id: "PRJ-002",
    title: "AI Recommendation Engine",
    category: "Data Science",
    client: "Internal Research",
    priority: "Medium",
    status: "On Hold",
    progress: 32,
    dueDate: "Jan 20, 2025",
    lead: "Sarah Chen",
    leadAvatar: "SC",
    teamSize: 5,
    health: "At Risk",
    budget: "$120k"
  },
  {
    id: "PRJ-003",
    title: "Cloud Infrastructure Migration",
    category: "DevOps",
    client: "Fintech Solutions",
    priority: "Urgent",
    status: "In Progress",
    progress: 89,
    dueDate: "Oct 30, 2024",
    lead: "Mike Johnson",
    leadAvatar: "MJ",
    teamSize: 8,
    health: "Healthy",
    budget: "$450k"
  },
  {
    id: "PRJ-004",
    title: "Brand Identity Redesign",
    category: "Design",
    client: "EcoStyle Systems",
    priority: "Low",
    status: "Completed",
    progress: 100,
    dueDate: "Sep 12, 2024",
    lead: "Elena Vance",
    leadAvatar: "EV",
    teamSize: 4,
    health: "Completed",
    budget: "$45k"
  },
  {
    id: "PRJ-005",
    title: "Cybersecurity Audit",
    category: "Security",
    client: "HealthSync",
    priority: "High",
    status: "Planning",
    progress: 15,
    dueDate: "Feb 10, 2025",
    lead: "David Volek",
    leadAvatar: "DV",
    teamSize: 3,
    health: "Healthy",
    budget: "$95k"
  }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent": return "bg-rose-100 text-rose-600";
      case "High": return "bg-orange-100 text-orange-600";
      case "Medium": return "bg-blue-100 text-blue-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case "Healthy": return "bg-emerald-500";
      case "At Risk": return "bg-amber-500";
      case "Critical": return "bg-rose-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
                <Briefcase className="text-white" size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Operations</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Project Portfolio</h1>
            <p className="text-sm font-medium text-slate-500">Track delivery milestones, team velocity, and project health.</p>
          </div>

          <div className="flex items-center gap-3">
             <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <List size={18} />
                </button>
             </div>
             <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              <Plus size={18} />
              New Project
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Projects", val: "24", sub: "4 starting this week", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "On Track", val: "88%", sub: "+2% from last month", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "At Risk", val: "3", sub: "Immediate action required", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Total Revenue", val: "$1.4M", sub: "Current portfolio value", icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" }
          ].map((metric, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color}`}>
                <metric.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</p>
                <p className="text-2xl font-black text-slate-900">{metric.val}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1">{metric.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search projects, clients, or leads..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50">
              <Calendar size={18} />
              Timeline
            </button>
          </div>
        </div>

        {/* PROJECT GRID */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                {/* Status Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${getHealthColor(project.health)}`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.id}</span>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{project.title}</h3>
                    <p className="text-xs font-bold text-slate-400">{project.client}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                   <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">{project.category}</span>
                   <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                   </span>
                </div>

                {/* Progress */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Timer size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Progress</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${project.progress === 100 ? 'bg-indigo-600' : 'bg-slate-900'}`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead</p>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                          {project.leadAvatar}
                        </div>
                        <span className="text-xs font-bold text-slate-700 truncate">{project.lead}</span>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Calendar size={14} className="text-slate-300" />
                        <span className="text-xs font-bold">{project.dueDate}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">U{i}</div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">+{project.teamSize - 3}</div>
                   </div>
                   <button className="w-10 h-10 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-xl flex items-center justify-center transition-all text-slate-400">
                      <ArrowUpRight size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Project</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Team</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Progress</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Budget</th>
                    <th className="px-8 py-5"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {PROJECTS.map(project => (
                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className={`w-3 h-3 rounded-full ${getHealthColor(project.health)}`}></div>
                             <div>
                                <p className="text-sm font-black text-slate-900">{project.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{project.id} • {project.client}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${getPriorityColor(project.priority)}`}>
                             {project.status}
                          </span>
                       </td>
                       <td className="px-6 py-6">
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">U{i}</div>
                             ))}
                          </div>
                       </td>
                       <td className="px-6 py-6 w-48">
                          <div className="space-y-1.5">
                             <div className="flex justify-between text-[10px] font-black text-slate-400">
                                <span>{project.progress}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900" style={{ width: `${project.progress}%` }}></div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 font-bold text-sm text-slate-600">{project.budget}</td>
                       <td className="px-8 py-6 text-right">
                          <button className="p-2 text-slate-300 hover:text-slate-900">
                             <ChevronRight size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}