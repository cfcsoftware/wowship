"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Heart, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Calendar,
  Award,
  Briefcase,
  ChevronDown,
  Star,
  Activity,
  Zap,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

const EMPLOYEE_DATA = [
  {
    id: "EMP-4402",
    name: "Elena Rodriguez",
    role: "Senior Product Designer",
    department: "Product",
    email: "e.rodriguez@company.io",
    tenure: "3.4 Years",
    performance: 4.8,
    wellness: 92,
    status: "High Potential",
    lastPromotion: "6 months ago",
    avatar: "ER"
  },
  {
    id: "EMP-4415",
    name: "Marcus Chen",
    role: "Lead Cloud Architect",
    department: "Engineering",
    email: "m.chen@company.io",
    tenure: "1.2 Years",
    performance: 4.9,
    wellness: 78,
    status: "Top Talent",
    lastPromotion: "1 year ago",
    avatar: "MC"
  },
  {
    id: "EMP-4388",
    name: "Sarah Jenkins",
    role: "Talent Acquisition",
    department: "People",
    email: "s.jenkins@company.io",
    tenure: "5.1 Years",
    performance: 4.2,
    wellness: 85,
    status: "Steady Performer",
    lastPromotion: "2 years ago",
    avatar: "SJ"
  },
  {
    id: "EMP-4501",
    name: "David Vane",
    role: "Junior Data Analyst",
    department: "Growth",
    email: "d.vane@company.io",
    tenure: "0.4 Years",
    performance: 3.9,
    wellness: 95,
    status: "Onboarding",
    lastPromotion: "N/A",
    avatar: "DV"
  },
  {
    id: "EMP-4210",
    name: "Amara Okafor",
    role: "Director of Sales",
    department: "Sales",
    email: "a.okafor@company.io",
    tenure: "4.8 Years",
    performance: 4.7,
    wellness: 64,
    status: "Burnout Risk",
    lastPromotion: "8 months ago",
    avatar: "AO"
  }
];

export default function HRReport() {
  const [activeTab, setActiveTab] = useState("Active Directory");

  const getStatusStyle = (status) => {
    switch (status) {
      case "High Potential": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Top Talent": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Burnout Risk": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Onboarding": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">
              <ShieldCheck size={14} />
              People Operations
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Talent Intelligence</h1>
            <p className="text-sm font-medium text-slate-500">Q1 Workforce distribution and performance sentiment analysis.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white text-slate-700 font-bold text-sm border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm">
              <Calendar size={18} />
              Leave Calendar
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-black shadow-xl shadow-slate-200 transition-all active:scale-95">
              <UserPlus size={18} strokeWidth={3} />
              New Hire
            </button>
          </div>
        </div>

        {/* HR Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <Users className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" size={160} />
            <div className="relative z-10">
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-1">Headcount</p>
              <h4 className="text-4xl font-black">1,248</h4>
              <div className="mt-6 flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                <TrendingUp size={14} />
                <span className="text-xs font-bold">+12% this quarter</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Retention Rate</p>
              <h4 className="text-4xl font-black text-slate-900">94.2%</h4>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                <span>Industry Avg</span>
                <span>88%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[94.2%]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Employee NPS</p>
              <h4 className="text-4xl font-black text-slate-900">72</h4>
            </div>
            <div className="flex items-center gap-3 mt-4 text-rose-500 bg-rose-50 px-3 py-2 rounded-xl w-fit">
              <Activity size={16} />
              <span className="text-xs font-black uppercase tracking-tighter">-4pts sentiment drop</span>
            </div>
          </div>
        </div>

        {/* Directory Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-1 border-b border-slate-100 pb-2 lg:pb-0 lg:border-none">
            {["Active Directory", "Performance Review", "Comp Analysis"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs font-black transition-all relative ${
                  activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-6 right-6 h-1 bg-indigo-600 rounded-full" />}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search talent..." 
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-4 focus:ring-indigo-50 outline-none w-64 lg:w-80"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pl-10 pr-4 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Team Member</th>
                  <th className="px-4 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
                  <th className="px-4 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance Score</th>
                  <th className="px-4 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Wellness</th>
                  <th className="px-4 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Talent Status</th>
                  <th className="pl-4 pr-10 py-8 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {EMPLOYEE_DATA.map((emp) => (
                  <tr key={emp.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                    <td className="pl-10 pr-4 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs ring-4 ring-white group-hover:ring-indigo-100 transition-all">
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{emp.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="text-xs font-bold text-slate-600">{emp.department}</span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-sm font-black text-slate-700">{emp.performance}</span>
                        <span className="text-[10px] font-bold text-slate-300">/ 5.0</span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              emp.wellness > 80 ? 'bg-emerald-500' : 
                              emp.wellness > 70 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${emp.wellness}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-500">{emp.wellness}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border uppercase tracking-tighter ${getStatusStyle(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="pl-4 pr-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
              <Award size={120} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                <Zap size={12} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400">Quarterly Milestone</span>
              </div>
              <h3 className="text-2xl font-black max-w-xs leading-tight">Diversity & Inclusion Benchmark Reached</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
                We've surpassed our 2024 target for leadership representation. Global team sentiment regarding "Belonging" is at an all-time high of <span className="text-white font-bold">88%</span>.
              </p>
              <button className="flex items-center gap-2 group/btn text-sm font-black text-white bg-indigo-600 px-8 py-4 rounded-2xl hover:bg-indigo-500 transition-all">
                Download Annual Report
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full" />
              Promotion Pipeline
            </h3>
            <div className="space-y-6">
              {[
                { name: "Elena Rodriguez", from: "Sr Designer", to: "Design Lead", progress: 92, avatar: "ER" },
                { name: "Marcus Chen", from: "Cloud Arch", to: "VP Engineering", progress: 45, avatar: "MC" },
                { name: "Amara Okafor", from: "Director Sales", to: "Sr Director", progress: 78, avatar: "AO" }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-[10px] text-slate-400 border border-slate-100">
                    {p.avatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-black text-slate-800">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{p.from} → {p.to}</p>
                      </div>
                      <span className="text-xs font-black text-indigo-600">{p.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}