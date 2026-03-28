"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  ArrowUpRight, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Mail,
  UserCheck,
  Building2,
  PieChart,
  Target,
  Settings2,
  ChevronDown
} from "lucide-react";

/* ---------------- MOCK DEPARTMENT DATA ---------------- */
const DEPARTMENTS = [
  {
    id: "dept-1",
    name: "Engineering",
    head: "Sarah Jenkins",
    headAvatar: "SJ",
    count: 42,
    budgetUsage: 78,
    status: "On Track",
    color: "bg-blue-600",
    description: "Software development, DevOps, and infrastructure management."
  },
  {
    id: "dept-2",
    name: "Product & UX",
    head: "Marcus Thorne",
    headAvatar: "MT",
    count: 18,
    budgetUsage: 92,
    status: "Near Limit",
    color: "bg-indigo-600",
    description: "Product roadmap, UI/UX design, and user research."
  },
  {
    id: "dept-3",
    name: "Growth & Marketing",
    head: "Elena Rodriguez",
    headAvatar: "ER",
    count: 24,
    budgetUsage: 45,
    status: "Under Budget",
    color: "bg-rose-600",
    description: "Digital marketing, SEO, and brand partnerships."
  },
  {
    id: "dept-4",
    name: "People Ops",
    head: "David Chen",
    headAvatar: "DC",
    count: 8,
    budgetUsage: 60,
    status: "On Track",
    color: "bg-emerald-600",
    description: "Talent acquisition, culture, and compliance."
  },
  {
    id: "dept-5",
    name: "Customer Success",
    head: "Aisha Khan",
    headAvatar: "AK",
    count: 31,
    budgetUsage: 82,
    status: "On Track",
    color: "bg-amber-600",
    description: "Post-sale support and client relationship management."
  }
];

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Company Structure</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Departments</h1>
            <p className="text-sm font-medium text-slate-500">Manage organizational units, department heads, and operational budgets.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <PieChart size={18} />
              Budget Report
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              <Plus size={18} />
              Create Department
            </button>
          </div>
        </div>

        {/* TOP METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 flex items-center justify-between relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Total Departments</p>
                <h3 className="text-3xl font-black">12 Units</h3>
                <div className="mt-4 flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-[10px] font-bold">+8</div>
                </div>
             </div>
             <Layers className="absolute right-[-10px] bottom-[-10px] text-white/10 group-hover:scale-110 transition-transform" size={120} />
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                   <UserCheck size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Heads</p>
                   <h3 className="text-2xl font-black text-slate-900">12 / 12</h3>
                </div>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-500"></div>
             </div>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                   <Target size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Headcount</p>
                   <h3 className="text-2xl font-black text-slate-900">1,240</h3>
                </div>
             </div>
             <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                <TrendingUp size={14} /> +4% from last quarter
             </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Filter by department name, manager, or keyword..."
            className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-slate-100 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* DEPARTMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all group border-b-4" style={{ borderBottomColor: `var(--tw-color-${dept.color.split('-')[1]}-500)` }}>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${dept.color} flex items-center justify-center text-white shadow-lg`}>
                  <Building2 size={28} />
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                  <Settings2 size={20} />
                </button>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{dept.name}</h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6 line-clamp-2">
                {dept.description}
              </p>

              <div className="bg-slate-50 rounded-3xl p-5 space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department Head</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {dept.headAvatar}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{dept.head}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Members</span>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-slate-400" />
                    <span className="text-xs font-black text-slate-900">{dept.count}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400 italic">Budget Utilized</span>
                  <span className={dept.budgetUsage > 90 ? 'text-rose-500' : 'text-slate-900'}>{dept.budgetUsage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${dept.budgetUsage > 90 ? 'bg-rose-500' : 'bg-slate-900'}`} 
                    style={{ width: `${dept.budgetUsage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    dept.status === 'Near Limit' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {dept.status}
                  </span>
                  <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                    View Assets <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ADD NEW PLACEHOLDER */}
          <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-lg transition-all">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <p className="font-black text-slate-900">New Department</p>
              <p className="text-xs font-medium text-slate-400">Initialize a new business unit</p>
            </div>
          </button>
        </div>

        {/* BOTTOM SECTION - ORG INSIGHTS */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-black tracking-tight">Organization Health</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Your organizational structure is currently balanced. <strong>Engineering</strong> remains the largest unit, while <strong>Product</strong> is nearing its quarterly budget threshold.
              </p>
              <div className="flex gap-4 pt-2">
                 <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Download Org Chart</button>
                 <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">View Analytics</button>
              </div>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
               {[
                 { label: "Stability Index", val: "94%", color: "text-emerald-500" },
                 { label: "Turnover Rate", val: "2.1%", color: "text-blue-500" },
                 { label: "Open Roles", val: "28", color: "text-amber-500" },
                 { label: "Employee NPS", val: "48", color: "text-indigo-500" }
               ].map((metric, i) => (
                 <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
                    <p className={`text-xl font-black ${metric.color}`}>{metric.val}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
}