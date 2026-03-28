"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Monitor, 
  Coffee, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  ArrowUpRight,
  UserCheck,
  Timer,
  Info
} from "lucide-react";

/* ---------------- MOCK ATTENDANCE DATA ---------------- */
const ATTENDANCE_LOGS = [
  {
    id: "ATT-9901",
    name: "Sarah Jenkins",
    avatar: "SJ",
    department: "Design",
    date: "Oct 24, 2023",
    checkIn: "08:52 AM",
    checkOut: "05:45 PM",
    totalHours: "8h 53m",
    status: "On Time",
    location: "Remote (London)",
    device: "MacBook Pro",
    regularization: false
  },
  {
    id: "ATT-9902",
    name: "Marcus Chen",
    avatar: "MC",
    department: "Engineering",
    date: "Oct 24, 2023",
    checkIn: "09:45 AM",
    checkOut: "06:30 PM",
    totalHours: "8h 45m",
    status: "Late",
    location: "SF HQ - Floor 4",
    device: "Office Desktop",
    regularization: true
  },
  {
    id: "ATT-9903",
    name: "Elena Rodriguez",
    avatar: "ER",
    department: "Marketing",
    date: "Oct 24, 2023",
    checkIn: "09:05 AM",
    checkOut: "--:--",
    totalHours: "Active",
    status: "On Time",
    location: "Remote (Madrid)",
    device: "iPhone 15",
    regularization: false
  },
  {
    id: "ATT-9904",
    name: "David Kim",
    avatar: "DK",
    department: "Operations",
    date: "Oct 24, 2023",
    checkIn: "08:30 AM",
    checkOut: "04:30 PM",
    totalHours: "8h 00m",
    status: "On Time",
    location: "Seoul Office",
    device: "Office Desktop",
    regularization: false
  },
  {
    id: "ATT-9905",
    name: "Amara Okafor",
    avatar: "AO",
    department: "Engineering",
    date: "Oct 24, 2023",
    checkIn: "10:15 AM",
    checkOut: "07:15 PM",
    totalHours: "9h 00m",
    status: "Overtime",
    location: "Remote (Lagos)",
    device: "PC Tower",
    regularization: false
  }
];

const STATUS_THEMES = {
  "On Time": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Late": "bg-rose-50 text-rose-700 border-rose-100",
  "Overtime": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Absent": "bg-slate-50 text-slate-700 border-slate-100",
};

export default function AttendanceModule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredLogs = ATTENDANCE_LOGS.filter(log => 
    log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
                <Timer className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Time Tracking</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Attendance Logs</h1>
            <p className="text-sm font-medium text-slate-500">Monitoring punctuality, shift coverage, and workforce availability.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm">
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 px-4">
              <Calendar size={16} className="text-orange-500" />
              <span className="text-sm font-black text-slate-700">Today, 24 Oct 2023</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ATTENDANCE SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Present Today", val: "142", sub: "92% Attendance", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Late Arrivals", val: "12", sub: "Needs Review", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "On Break", val: "08", sub: "Avg 45m", icon: Coffee, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Remote Logs", val: "64", sub: "Global Work", icon: Monitor, color: "text-blue-600", bg: "bg-blue-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-all">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
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

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
           <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search employee or status..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 outline-none text-sm font-medium focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
              />
           </div>
           
           <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl overflow-hidden w-full lg:w-auto">
              {["all", "present", "late", "absent"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={16} />
                Filters
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Download size={16} />
                Generate Report
              </button>
           </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Hours</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location/Device</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="group hover:bg-orange-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black text-xs">
                          {log.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1">{log.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{log.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-black">{log.checkIn}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400">
                        {log.checkOut !== "--:--" && <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                        <span className="text-xs font-bold">{log.checkOut}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${log.totalHours === "Active" ? "text-orange-500 animate-pulse" : "text-slate-800"}`}>
                          {log.totalHours}
                        </span>
                        {log.regularization && (
                          <div title="Manual Regularization Applied">
                            <Info size={14} className="text-blue-400 cursor-help" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                           <MapPin size={12} className="text-slate-400" />
                           <span className="text-[11px] font-bold text-slate-600">{log.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Monitor size={12} className="text-slate-400" />
                           <span className="text-[10px] font-medium text-slate-400">{log.device}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${STATUS_THEMES[log.status]}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM PAGINATION & INFO */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <p className="text-xs font-bold text-slate-400">
            Showing <span className="text-slate-900">5</span> of <span className="text-slate-900">142</span> records
          </p>
          <div className="flex items-center gap-2">
             <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-all">Prev</button>
             <div className="flex gap-1">
                {[1, 2, 3].map(n => (
                  <button key={n} className={`w-8 h-8 rounded-xl text-[10px] font-black flex items-center justify-center ${n === 1 ? "bg-orange-500 text-white shadow-lg shadow-orange-100" : "bg-white border border-slate-100 text-slate-400"}`}>
                    {n}
                  </button>
                ))}
             </div>
             <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-all">Next</button>
          </div>
        </div>

      </div>

      {/* FLOATING ACTION BUTTON (MOBILE) */}
      <button className="fixed bottom-8 right-8 lg:hidden w-14 h-14 bg-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center">
         <ArrowUpRight size={24} />
      </button>
    </div>
  );
}