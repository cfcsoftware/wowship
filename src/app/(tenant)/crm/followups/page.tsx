"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Phone,
  Mail,
  Users,
  AlertCircle,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  ListTodo,
  Bell,
  CheckSquare,
  Square
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type FollowupType = "Call" | "Email" | "Meeting" | "Task";
type Priority = "High" | "Medium" | "Low";

interface Followup {
  id: string;
  subject: string;
  contactName: string;
  company: string;
  type: FollowupType;
  priority: Priority;
  dueDate: string;
  dueTime: string;
  status: "Pending" | "Completed";
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const FOLLOWUPS: Followup[] = Array.from({ length: 15 }, (_, i) => {
  const subjects = [
    "Finalize Proposal Terms", "Quarterly Review Call", "Introduction to Tech Lead", 
    "Follow-up on ERP Demo", "Send Contract Draft", "Onboarding Session"
  ];
  const contacts = ["Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong", "Lachlan Smith"];
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners"];
  const types: FollowupType[] = ["Call", "Email", "Meeting", "Task"];
  const priorities: Priority[] = ["High", "Medium", "Low"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  return {
    id: `FLW-${9000 + i}`,
    subject: subjects[i % subjects.length],
    contactName: contacts[i % contacts.length],
    company: companies[i % companies.length],
    type: types[i % types.length],
    priority: priorities[i % priorities.length],
    dueDate: `2024-04-${(15 + (i % 5)).toString().padStart(2, '0')}`,
    dueTime: `${9 + (i % 8)}:00 AM`,
    status: i % 5 === 0 ? "Completed" : "Pending",
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getPriorityStyles = (priority: Priority) => {
  const styles = {
    High: "text-rose-600 bg-rose-50 ring-rose-600/20",
    Medium: "text-amber-600 bg-amber-50 ring-amber-600/20",
    Low: "text-blue-600 bg-blue-50 ring-blue-600/20",
  };
  return `inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ring-1 ring-inset ${styles[priority]}`;
};

const getTypeIcon = (type: FollowupType) => {
  switch (type) {
    case "Call": return <Phone size={14} className="text-blue-500" />;
    case "Email": return <Mail size={14} className="text-indigo-500" />;
    case "Meeting": return <Users size={14} className="text-emerald-500" />;
    case "Task": return <CheckSquare size={14} className="text-slate-500" />;
  }
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function FollowupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Completed">("Pending");

  const filteredFollowups = useMemo(() => {
    return FOLLOWUPS.filter((item) => {
      const matchesSearch = 
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || item.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Bell className="text-indigo-600" size={24} />
              Follow-ups & Tasks
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Stay on top of your global sales activities and commitments.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} />
              Add Follow-up
            </button>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overdue</p>
              <p className="text-xl font-bold text-slate-800">3 Tasks</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Today</p>
              <p className="text-xl font-bold text-slate-800">5 Activities</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
              <p className="text-xl font-bold text-slate-800">12 This Week</p>
            </div>
          </div>
        </div>

        {/* SEARCH & TABS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
            {(["Pending", "Completed", "All"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === tab 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by subject or contact..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FOLLOW-UPS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4 w-12 text-center">Done</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Contact & Region</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFollowups.length > 0 ? (
                  filteredFollowups.map((item) => (
                    <tr key={item.id} className={`group hover:bg-slate-50/50 transition-colors ${item.status === 'Completed' ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-300 hover:text-indigo-500 transition-colors">
                          {item.status === 'Completed' ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Square size={20} />}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors border border-slate-100">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <div className={`text-sm font-bold text-slate-800 ${item.status === 'Completed' ? 'line-through' : ''}`}>
                              {item.subject}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            {item.contactName}
                            <span className="text-[9px] px-1 bg-slate-100 text-slate-500 rounded uppercase">{item.region}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{item.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-slate-700">{item.dueDate}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock size={10} /> {item.dueTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getPriorityStyles(item.priority)}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                            <ArrowUpRight size={16} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-slate-400">
                      <ListTodo size={40} className="mx-auto mb-3 opacity-20" />
                      <p className="text-sm font-medium">No tasks found for this view.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}