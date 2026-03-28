"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  User,
  Plane,
  Stethoscope,
  Umbrella,
  MoreVertical,
  ArrowRight
} from "lucide-react";

/* ---------------- MOCK LEAVE DATA ---------------- */
const LEAVE_REQUESTS = [
  {
    id: "LR-4021",
    name: "Sarah Jenkins",
    avatar: "SJ",
    type: "Annual Leave",
    category: "Vacation",
    duration: "Oct 28 - Nov 02",
    days: 5,
    status: "Pending",
    reason: "Family trip to coastal regions.",
    appliedOn: "Oct 22, 2023",
    hasAttachment: false
  },
  {
    id: "LR-4022",
    name: "Marcus Chen",
    avatar: "MC",
    type: "Sick Leave",
    category: "Medical",
    duration: "Oct 24 - Oct 25",
    days: 2,
    status: "Approved",
    reason: "Severe seasonal flu and fever.",
    appliedOn: "Oct 23, 2023",
    hasAttachment: true
  },
  {
    id: "LR-4023",
    name: "Elena Rodriguez",
    avatar: "ER",
    type: "Casual Leave",
    category: "Personal",
    duration: "Oct 26 (Full Day)",
    days: 1,
    status: "Rejected",
    reason: "Urgent house maintenance work.",
    appliedOn: "Oct 24, 2023",
    hasAttachment: false
  },
  {
    id: "LR-4024",
    name: "David Kim",
    avatar: "Annual Leave",
    category: "Vacation",
    duration: "Nov 15 - Nov 20",
    days: 6,
    status: "Pending",
    reason: "Attending sister's wedding.",
    appliedOn: "Oct 21, 2023",
    hasAttachment: true
  }
];

const LEAVE_TYPES = [
  { id: 'annual', label: 'Annual Leave', total: 24, used: 12, color: 'bg-indigo-500', icon: Umbrella },
  { id: 'sick', label: 'Sick Leave', total: 12, used: 3, color: 'bg-rose-500', icon: Stethoscope },
  { id: 'casual', label: 'Casual Leave', total: 8, used: 6, color: 'bg-amber-500', icon: User },
];

const STATUS_MAP = {
  "Pending": "bg-blue-50 text-blue-600 border-blue-100 icon-alert",
  "Approved": "bg-emerald-50 text-emerald-600 border-emerald-100 icon-check",
  "Rejected": "bg-rose-50 text-rose-600 border-rose-100 icon-x",
};

export default function LeaveModule() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Umbrella className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Absence Control</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Leave Management</h1>
            <p className="text-sm font-medium text-slate-500">Review, track, and approve employee time-off requests.</p>
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            <Plus size={18} />
            Apply for Leave
          </button>
        </div>

        {/* ALLOWANCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEAVE_TYPES.map((type) => {
            const percentage = (type.used / type.total) * 100;
            return (
              <div key={type.id} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm group hover:border-indigo-200 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 ${type.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform`}>
                    <type.icon size={22} className={type.color.replace('bg-', 'text-')} />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">{type.total - type.used}</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Days Left</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-black text-slate-800">{type.label}</p>
                    <p className="text-xs font-bold text-slate-400">{type.used} / {type.total} Used</p>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${type.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN LIST AREA */}
        <div className="space-y-6">
          {/* SEARCH & FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search employee or leave type..." 
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 outline-none text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {["All", "Pending", "Approved", "Rejected"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    filter === cat 
                      ? "bg-slate-900 text-white shadow-lg" 
                      : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* LIST OF CARDS (Alternative to Table for Richer Data) */}
          <div className="grid grid-cols-1 gap-4">
            {LEAVE_REQUESTS.map((req) => (
              <div key={req.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Employee & Type */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black text-sm border border-slate-100">
                      {req.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-900">{req.name}</h3>
                        <span className="text-[10px] font-black text-slate-300">#{req.id}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1.5 text-indigo-600">
                            <Umbrella size={14} />
                            <span className="text-xs font-bold">{req.type}</span>
                         </div>
                         <span className="w-1 h-1 rounded-full bg-slate-300" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{req.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Duration & Reason */}
                  <div className="flex-1 lg:px-8 lg:border-l lg:border-r border-slate-50">
                    <div className="flex items-center gap-2 mb-2">
                       <Calendar size={14} className="text-slate-400" />
                       <span className="text-sm font-black text-slate-700">{req.duration}</span>
                       <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-500">{req.days} Days</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 italic">"{req.reason}"</p>
                  </div>

                  {/* Right: Status & Action */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 lg:w-72 justify-end">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${STATUS_MAP[req.status]}`}>
                       {req.status === "Approved" && <CheckCircle2 size={14} />}
                       {req.status === "Pending" && <Clock size={14} />}
                       {req.status === "Rejected" && <XCircle size={14} />}
                       <span className="text-[10px] font-black uppercase tracking-tight">{req.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                       {req.status === "Pending" ? (
                         <>
                           <button className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                             <CheckCircle2 size={18} />
                           </button>
                           <button className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                             <XCircle size={18} />
                           </button>
                         </>
                       ) : (
                         <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-1">
                           Details
                           <ArrowRight size={14} />
                         </button>
                       )}
                       <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-600">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                  </div>

                </div>

                {/* Footer Info (Mobile mainly) */}
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied: {req.appliedOn}</p>
                      {req.hasAttachment && (
                        <div className="flex items-center gap-1 text-indigo-500">
                          <FileText size={12} />
                          <span className="text-[10px] font-black uppercase tracking-tight">Attachment</span>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
           <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-2">Team Outing Alert</h4>
                <p className="text-slate-400 text-sm max-w-xs mb-6 font-medium">Next week, 4 members from Engineering are on leave. Expect higher latency in ticket resolution.</p>
                <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all">
                  View Team Calendar
                </button>
              </div>
              <Plane className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 rotate-12" />
           </div>

           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8">
              <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-500" />
                Quick Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Requests</p>
                    <p className="text-2xl font-black text-slate-900">42</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Approval Time</p>
                    <p className="text-2xl font-black text-slate-900">4h</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}