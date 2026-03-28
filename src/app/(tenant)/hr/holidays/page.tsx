"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Download,
  Palmtree,
  Moon,
  Sun,
  Flag,
  Coffee,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

/* ---------------- MOCK HOLIDAY DATA ---------------- */
const HOLIDAYS = [
  {
    id: "hol-1",
    name: "New Year's Day",
    date: "Jan 01, 2024",
    day: "Monday",
    type: "Public",
    category: "Fixed",
    status: "Observed",
    color: "bg-blue-500",
    description: "Standard start of the Gregorian calendar year."
  },
  {
    id: "hol-2",
    name: "Lunar New Year",
    date: "Feb 10, 2024",
    day: "Saturday",
    type: "Regional",
    category: "Floating",
    status: "Upcoming",
    color: "bg-rose-500",
    description: "Major festival celebrated in East Asian cultures."
  },
  {
    id: "hol-3",
    name: "Good Friday",
    date: "Mar 29, 2024",
    day: "Friday",
    type: "Public",
    category: "Fixed",
    status: "Upcoming",
    color: "bg-amber-500",
    description: "Christian holiday commemorating the crucifixion of Jesus."
  },
  {
    id: "hol-4",
    name: "Eid al-Fitr",
    date: "Apr 10, 2024",
    day: "Wednesday",
    type: "Religious",
    category: "Floating",
    status: "Upcoming",
    color: "bg-emerald-500",
    description: "The 'Festival of Breaking the Fast' marking the end of Ramadan."
  },
  {
    id: "hol-5",
    name: "Labour Day",
    date: "May 01, 2024",
    day: "Wednesday",
    type: "Public",
    category: "Fixed",
    status: "Upcoming",
    color: "bg-indigo-500",
    description: "International Workers' Day celebration."
  }
];

const QUARTER_STATS = [
  { id: "stat-1", label: "Total Holidays", value: "14 Days", icon: Flag, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "stat-2", label: "Long Weekends", value: "4 Occasions", icon: Palmtree, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "stat-3", label: "Remaining", value: "9 Days", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
];

const WEEK_DAYS = [
  { id: "day-0", label: "S" },
  { id: "day-1", label: "M" },
  { id: "day-2", label: "T" },
  { id: "day-3", label: "W" },
  { id: "day-4", label: "T" },
  { id: "day-5", label: "F" },
  { id: "day-6", label: "S" }
];

export default function HolidayModule() {
  const [viewMode, setViewMode] = useState("List"); // List or Calendar
  const [region, setRegion] = useState("Global (All)");

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
                <Calendar className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Culture & Policy</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Holiday Calendar 2024</h1>
            <p className="text-sm font-medium text-slate-500">Corporate holiday schedule and regional observance list.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              {["List", "Calendar"].map((mode) => (
                <button
                  key={`mode-${mode}`}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-tight rounded-lg transition-all ${
                    viewMode === mode ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} />
              Export PDF
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-rose-500 text-white rounded-2xl text-sm font-bold hover:bg-rose-600 transition-all shadow-xl shadow-rose-100">
              <Plus size={18} />
              Add Holiday
            </button>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUARTER_STATS.map((stat) => (
            <div key={stat.id} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: HOLIDAY LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-black text-slate-900">Upcoming Holidays</h2>
                  <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Next 90 Days
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                  <Globe size={14} className="text-slate-400" />
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-600 outline-none border-none cursor-pointer"
                  >
                    <option>Global (All)</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {HOLIDAYS.map((holiday) => (
                  <div key={holiday.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:border-rose-200 transition-colors">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          {holiday.date.split(' ')[0]}
                        </span>
                        <span className="text-2xl font-black text-slate-900">
                          {holiday.date.split(' ')[1].replace(',', '')}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                            {holiday.name}
                          </h3>
                          <span className={`w-2 h-2 rounded-full ${holiday.color}`}></span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 max-w-md line-clamp-1">{holiday.description}</p>
                        <div className="flex items-center gap-4 pt-1">
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                              <MapPin size={12} /> {holiday.type}
                           </div>
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                              <Coffee size={12} /> {holiday.category}
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right hidden md:block">
                        <p className="text-xs font-black text-slate-900">{holiday.day}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${holiday.status === 'Observed' ? 'text-slate-300' : 'text-emerald-500'}`}>
                          {holiday.status}
                        </p>
                      </div>
                      <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
                        <Info size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-slate-50/50 text-center">
                <button className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">
                  View Full 2024 Schedule
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <div className="lg:col-span-4 space-y-8">
            {/* MINI CALENDAR WIDGET */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest">March 2024</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft size={16} /></button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-4 text-center">
                {WEEK_DAYS.map(d => (
                  <span key={d.id} className="text-[10px] font-black text-slate-500">{d.label}</span>
                ))}
                {Array.from({length: 31}).map((_, i) => (
                  <div key={`cal-day-${i + 1}`} className="relative group">
                    <span className={`text-xs font-bold py-2 block rounded-lg cursor-pointer transition-all ${
                      i+1 === 29 ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-900/40' : 'hover:bg-white/5 text-slate-300'
                    }`}>
                      {i + 1}
                    </span>
                    {i+1 === 29 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white text-slate-900 p-2 rounded-lg text-[10px] font-bold shadow-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                         Good Friday (Off)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* POLICY REMINDERS */}
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[3rem]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                     <CheckCircle2 size={20} />
                  </div>
                  <h4 className="text-lg font-black text-emerald-900">Policy Update</h4>
               </div>
               <p className="text-sm text-emerald-700/80 font-medium mb-6 leading-relaxed">
                  Floating holidays must be requested at least 14 days in advance via the Leave module.
               </p>
               <button className="w-full py-4 bg-white border border-emerald-200 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                  View Handbook
               </button>
            </div>

            {/* UPCOMING OFFICE CLOSURE */}
            <div className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                     <AlertCircle size={20} />
                  </div>
                  <h4 className="text-lg font-black text-amber-900">Office Notice</h4>
               </div>
               <p className="text-sm text-amber-700/80 font-medium leading-relaxed">
                  Support teams: Ensure coverage is arranged for the upcoming Good Friday weekend.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}