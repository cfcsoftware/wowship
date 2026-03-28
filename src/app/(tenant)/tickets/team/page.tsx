"use client";

import React, { useState } from "react";
import { 
  Users, 
  Mail, 
  MapPin, 
  Clock, 
  Zap, 
  ShieldCheck, 
  MoreVertical, 
  Search,
  Filter,
  UserPlus,
  MessageSquare,
  Activity,
  Award
} from "lucide-react";

const TEAM_MEMBERS = [
  {
    id: "USR-001",
    name: "Sarah Chen",
    role: "Lead Software Architect",
    email: "s.chen@enterprise.com",
    location: "San Francisco, CA",
    status: "Active",
    workload: 85,
    timezone: "PST",
    lastActive: "2 mins ago",
    skills: ["React", "Go", "Cloud Arch"],
    avatar: "https://i.pravatar.cc/150?u=sarah",
    access: "Admin"
  },
  {
    id: "USR-002",
    name: "Alex Rivera",
    role: "Senior UI/UX Designer",
    email: "a.rivera@enterprise.com",
    location: "Madrid, ES",
    status: "On Break",
    workload: 40,
    timezone: "CET",
    lastActive: "45 mins ago",
    skills: ["Figma", "Prototyping", "A11y"],
    avatar: "https://i.pravatar.cc/150?u=alex",
    access: "Editor"
  },
  {
    id: "USR-003",
    name: "James Wilson",
    role: "DevOps Engineer",
    email: "j.wilson@enterprise.com",
    location: "Austin, TX",
    status: "In Meeting",
    workload: 95,
    timezone: "CST",
    lastActive: "1 min ago",
    skills: ["Kubernetes", "AWS", "CI/CD"],
    avatar: "https://i.pravatar.cc/150?u=james",
    access: "Admin"
  },
  {
    id: "USR-004",
    name: "Elena Vance",
    role: "Product Manager",
    email: "e.vance@enterprise.com",
    location: "London, UK",
    status: "Active",
    workload: 60,
    timezone: "GMT",
    lastActive: "12 mins ago",
    skills: ["Strategy", "Backlog", "Agile"],
    avatar: "https://i.pravatar.cc/150?u=elena",
    access: "Owner"
  },
  {
    id: "USR-005",
    name: "Marcus Thorne",
    role: "QA Automation Lead",
    email: "m.thorne@enterprise.com",
    location: "Berlin, DE",
    status: "Offline",
    workload: 0,
    timezone: "CET",
    lastActive: "4 hours ago",
    skills: ["Selenium", "Jest", "Load Testing"],
    avatar: "https://i.pravatar.cc/150?u=marcus",
    access: "Viewer"
  }
];

export default function TeamDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-500";
      case "In Meeting": return "bg-amber-500";
      case "On Break": return "bg-blue-400";
      default: return "bg-slate-300";
    }
  };

  const getWorkloadStyle = (load) => {
    if (load > 90) return "bg-rose-500 text-rose-500";
    if (load > 70) return "bg-amber-500 text-amber-500";
    return "bg-emerald-500 text-emerald-500";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Global Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Team Intelligence</h1>
              <p className="text-slate-500 text-sm font-medium">Managing 24 active contributors across 4 timezones.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, skill, or role..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm w-full md:w-80 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
              <UserPlus size={18} />
              Add Member
            </button>
          </div>
        </div>

        {/* Team Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="pl-10 pr-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Member Identity</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Availability</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Skill Stack</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Workload</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Level</th>
                  <th className="pl-4 pr-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEAM_MEMBERS.map((member) => (
                  <tr key={member.id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                    {/* Identity Column */}
                    <td className="pl-10 pr-4 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${getStatusColor(member.status)}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-slate-800">{member.name}</span>
                            {member.workload > 90 && <Zap size={14} className="text-amber-500 fill-amber-500" title="High Output" />}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs font-bold text-slate-400">{member.role}</p>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <p className="text-[10px] font-black text-indigo-500 tracking-tighter uppercase">{member.id}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location & Timezone */}
                    <td className="px-4 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <MapPin size={12} className="text-slate-400" />
                          {member.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                          <Clock size={12} />
                          {member.timezone} Time
                        </div>
                      </div>
                    </td>

                    {/* Skill Tags */}
                    <td className="px-4 py-6">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {member.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Workload Gauge */}
                    <td className="px-4 py-6">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                            <circle 
                              cx="24" cy="24" r="18" fill="none" 
                              stroke="currentColor" 
                              strokeWidth="4" 
                              strokeDasharray={113}
                              strokeDashoffset={113 - (113 * member.workload) / 100}
                              className={`transition-all duration-1000 ${getWorkloadStyle(member.workload)}`}
                            />
                          </svg>
                          <span className="absolute text-[10px] font-black">{member.workload}%</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Capacity</span>
                      </div>
                    </td>

                    {/* Access Level */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                        <ShieldCheck size={14} className={member.access === 'Admin' ? 'text-indigo-600' : 'text-slate-400'} />
                        <span className="text-xs font-black text-slate-700">{member.access}</span>
                      </div>
                    </td>

                    {/* Activity & Actions */}
                    <td className="pl-4 pr-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-800">{member.lastActive}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">Last Pulse</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            <MessageSquare size={18} />
                          </button>
                          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer Stats */}
          <div className="px-10 py-6 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                 <Activity size={16} className="text-emerald-500" />
                 <span className="text-xs font-bold text-slate-500 underline decoration-slate-200 underline-offset-4">88% Network Health</span>
               </div>
               <div className="flex items-center gap-2">
                 <Award size={16} className="text-amber-500" />
                 <span className="text-xs font-bold text-slate-500">3 Members with Certifications Due</span>
               </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              Showing 5 of 24 collaborators
              <div className="flex items-center gap-1 ml-4">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Prev</button>
                <button className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded-lg">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}