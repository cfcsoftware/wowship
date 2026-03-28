"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Mail, 
  Phone, 
  MoreVertical, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Star, 
  Zap, 
  ShieldCheck, 
  Building,
  ChevronRight,
  Download,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  CircleDot
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const EMPLOYEES = [
  {
    id: "EMP-1021",
    name: "Sarah Jenkins",
    role: "Senior Product Designer",
    department: "Design",
    type: "Full-time",
    email: "sarah.j@company.com",
    status: "active",
    joined: "Oct 12, 2021",
    location: "London, UK (Remote)",
    performance: 4.8,
    avatar: "SJ"
  },
  {
    id: "EMP-1045",
    name: "Marcus Chen",
    role: "Lead DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    email: "m.chen@company.com",
    status: "active",
    joined: "Jan 05, 2022",
    location: "San Francisco, US",
    performance: 4.9,
    avatar: "MC"
  },
  {
    id: "EMP-1089",
    name: "Elena Rodriguez",
    role: "Marketing Strategist",
    department: "Marketing",
    type: "Contract",
    email: "elena.r@company.com",
    status: "onboarding",
    joined: "Mar 01, 2024",
    location: "Madrid, ES (Hybrid)",
    performance: null,
    avatar: "ER"
  },
  {
    id: "EMP-1092",
    name: "David Kim",
    role: "Customer Success Manager",
    department: "Operations",
    type: "Full-time",
    email: "d.kim@company.com",
    status: "active",
    joined: "Jun 15, 2022",
    location: "Seoul, KR",
    performance: 4.5,
    avatar: "DK"
  },
  {
    id: "EMP-1105",
    name: "Amara Okafor",
    role: "Junior Developer",
    department: "Engineering",
    type: "Probation",
    email: "amara.o@company.com",
    status: "active",
    joined: "Feb 10, 2024",
    location: "Lagos, NG (Remote)",
    performance: 4.2,
    avatar: "AO"
  }
];

const DEPT_COLORS = {
  Engineering: "bg-blue-50 text-blue-700 border-blue-100",
  Design: "bg-purple-50 text-purple-700 border-purple-100",
  Marketing: "bg-rose-50 text-rose-700 border-rose-100",
  Operations: "bg-amber-50 text-amber-700 border-amber-100",
  HR: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const STATUS_CONFIG = {
  active: { icon: CheckCircle2, text: "Active", color: "text-emerald-500", bg: "bg-emerald-50" },
  onboarding: { icon: Clock, text: "Onboarding", color: "text-blue-500", bg: "bg-blue-50" },
  leave: { icon: CircleDot, text: "On Leave", color: "text-amber-500", bg: "bg-amber-50" },
};

export default function EmployeeList() {
  const [viewMode, setViewMode] = useState("list");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* TOP NAVIGATION & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Users className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Human Capital</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Employee Directory</h1>
            <p className="text-sm font-medium text-slate-500">Manage your global workforce and organizational health.</p>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                >
                  <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                >
                  <LayoutGrid size={18} />
                </button>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
               <UserPlus size={18} />
               Add Employee
             </button>
          </div>
        </div>

        {/* HR STATS BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Headcount", val: "154", sub: "+12% vs LY", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Open Positions", val: "18", sub: "8 Priority", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Pulse Score", val: "4.2/5", sub: "Engagement", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Retention Rate", val: "94%", sub: "Annual", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">{stat.val}</span>
                  <span className="text-[10px] font-bold text-slate-500">{stat.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
           <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Find by name, role or department..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 outline-none text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
              />
           </div>
           <div className="flex items-center gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={18} />
                Filters
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Download size={18} />
                Export
              </button>
           </div>
        </div>

        {/* MAIN CONTENT AREA */}
        {viewMode === "list" ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-indigo-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-slate-200">
                            {emp.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{emp.name}</p>
                            <p className="text-[11px] font-bold text-slate-400">{emp.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${DEPT_COLORS[emp.department] || "bg-slate-50 text-slate-500"}`}>
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{emp.type}</span>
                          <span className="text-[10px] font-medium text-slate-400">Joined {emp.joined}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${STATUS_CONFIG[emp.status].color.replace('text', 'bg')}`} />
                          <span className="text-xs font-black text-slate-800">{STATUS_CONFIG[emp.status].text}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedEmp(emp)}
                          className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                   <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={20} />
                   </button>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center font-black text-xl shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform">
                    {emp.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{emp.name}</h3>
                    <p className="text-xs font-bold text-indigo-600">{emp.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                    <MapPin size={12} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500">{emp.location}</span>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div className="text-left">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                       <p className="text-xs font-bold text-slate-800">{emp.department}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
                       <div className="flex items-center justify-end gap-1">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <p className="text-xs font-bold text-slate-800">{emp.performance || "N/A"}</p>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedEmp(emp)}
                    className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO RESULTS STATE */}
        {filteredEmployees.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
                <Users size={40} />
             </div>
             <div className="space-y-1">
                <p className="text-lg font-black text-slate-900">No employees found</p>
                <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
             </div>
          </div>
        )}

      </div>

      {/* QUICK VIEW SIDEBAR */}
      {selectedEmp && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={() => setSelectedEmp(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
               <div className="flex items-center justify-between">
                  <button onClick={() => setSelectedEmp(null)} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                    <ArrowRight size={20} className="text-slate-400" />
                  </button>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Insights</span>
                  <div className="w-10" />
               </div>

               <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center text-2xl font-black shadow-2xl shadow-indigo-100">
                   {selectedEmp.avatar}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedEmp.name}</h2>
                    <p className="text-sm font-bold text-slate-400">{selectedEmp.role}</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-3xl hover:bg-indigo-50 hover:text-indigo-600 transition-all gap-2 group">
                    <Mail size={18} className="text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Message</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-3xl hover:bg-indigo-50 hover:text-indigo-600 transition-all gap-2 group">
                    <Phone size={18} className="text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Call</span>
                 </button>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl">
                     <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Building size={20} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reports To</p>
                        <p className="text-sm font-bold text-slate-800">Jonathan Harker (VP Eng)</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Timeline & Stats</h4>
                    <div className="space-y-3">
                       {[
                         { icon: Calendar, label: "Hired Date", val: selectedEmp.joined },
                         { icon: MapPin, label: "Current Timezone", val: "UTC +1" },
                         { icon: Star, label: "Last Review", val: "4.8 (Exceeds)" },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl">
                           <div className="flex items-center gap-3">
                             <item.icon size={14} className="text-slate-400" />
                             <span className="text-xs font-bold text-slate-600">{item.label}</span>
                           </div>
                           <span className="text-xs font-black text-slate-900">{item.val}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex gap-3">
               <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Full Profile
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}