"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ArrowUpRight, 
  Briefcase, 
  Layers, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Edit2,
  Trash2,
  ArrowUpDown
} from "lucide-react";

/* ---------------- MOCK DESIGNATION DATA ---------------- */
const DESIGNATIONS = [
  {
    id: "des-1",
    title: "Senior Product Designer",
    department: "Product & UX",
    level: "L4",
    headcount: 12,
    openPositions: 2,
    avgSalary: "$115k",
    status: "Active",
    color: "bg-indigo-500"
  },
  {
    id: "des-2",
    title: "Full Stack Engineer",
    department: "Engineering",
    level: "L3",
    headcount: 45,
    openPositions: 8,
    avgSalary: "$130k",
    status: "Active",
    color: "bg-blue-500"
  },
  {
    id: "des-3",
    title: "Marketing Manager",
    department: "Growth",
    level: "L5",
    headcount: 8,
    openPositions: 0,
    avgSalary: "$95k",
    status: "Active",
    color: "bg-rose-500"
  },
  {
    id: "des-4",
    title: "HR Business Partner",
    department: "People Operations",
    level: "L4",
    headcount: 5,
    openPositions: 1,
    avgSalary: "$88k",
    status: "Active",
    color: "bg-emerald-500"
  },
  {
    id: "des-5",
    title: "Junior Data Analyst",
    department: "Analytics",
    level: "L1",
    headcount: 14,
    openPositions: 4,
    avgSalary: "$72k",
    status: "Review",
    color: "bg-amber-500"
  }
];

const DEPARTMENTS = ["All Departments", "Engineering", "Product & UX", "Growth", "People Operations", "Analytics", "Finance"];

export default function DesignationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Briefcase className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Org Architecture</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Designations</h1>
            <p className="text-sm font-medium text-slate-500">Define and manage job roles, hierarchies, and career levels.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Layers size={18} />
              View Hierarchy
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              <Plus size={18} />
              Add Designation
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Roles", val: "84", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Total Headcount", val: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Open Vacancies", val: "32", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Dept Count", val: "12", icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, idx) => (
            <div key={`stat-${idx}`} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by role or department..."
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
              <Filter size={18} className="text-slate-400" />
              <select 
                className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {DEPARTMENTS.map(dept => <option key={dept}>{dept}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* DESIGNATIONS TABLE */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation Title</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                  <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</th>
                  <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Headcount</th>
                  <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Openings</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DESIGNATIONS.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${role.color} flex items-center justify-center text-white font-black text-xs`}>
                          {role.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{role.title}</p>
                          <p className="text-xs font-medium text-slate-400">Avg. Salary: {role.avgSalary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-600">{role.department}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                        {role.level}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users size={14} className="text-slate-300" />
                        <span className="text-sm font-black text-slate-900">{role.headcount}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-xs font-bold ${role.openPositions > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                        {role.openPositions > 0 ? `${role.openPositions} Active` : 'Filled'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-indigo-600">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-rose-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-50">
            <p className="text-xs font-bold text-slate-400">Showing 5 of 84 designations</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold rounded-xl text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold rounded-xl text-slate-900 hover:border-indigo-600 transition-all shadow-sm">Next</button>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY & SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-black text-slate-900">Department Distribution</h4>
              <ArrowUpRight className="text-slate-300" size={20} />
            </div>
            <div className="space-y-6">
              {[
                { name: "Engineering", percent: 45, count: 45, color: "bg-blue-500" },
                { name: "Product & UX", percent: 25, count: 22, color: "bg-indigo-500" },
                { name: "Growth", percent: 15, count: 12, color: "bg-rose-500" },
                { name: "Analytics", percent: 10, count: 8, color: "bg-amber-500" },
              ].map((item, idx) => (
                <div key={`dist-${idx}`} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-tight">
                    <span className="text-slate-500">{item.name}</span>
                    <span className="text-slate-900">{item.count} Staff</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl shadow-slate-200">
            <div className="mb-6">
              <h4 className="text-lg font-black">Hiring Velocity</h4>
              <p className="text-xs font-medium text-slate-400">Recruitment stats for open designations</p>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time to Fill</p>
                <p className="text-2xl font-black">24 Days</p>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold mt-2">
                  <TrendingUp size={12} /> -2 days from avg
                </div>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Applications</p>
                <p className="text-2xl font-black">184</p>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold mt-2">
                  <TrendingUp size={12} /> +12% this week
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              Launch Recruitment Module <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}