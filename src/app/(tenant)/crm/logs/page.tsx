"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Video,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  ExternalLink,
  History,
  Smile,
  Meh,
  Frown,
  Quote
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type CommType = "Email" | "Call" | "Meeting" | "Note";
type Sentiment = "Positive" | "Neutral" | "Negative";

interface CommLog {
  id: string;
  subject: string;
  contactName: string;
  company: string;
  type: CommType;
  date: string;
  time: string;
  duration: string;
  sentiment: Sentiment;
  summary: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const LOGS: CommLog[] = Array.from({ length: 15 }, (_, i) => {
  const subjects = [
    "Project Kickoff Discussion", 
    "Pricing Objection Handling", 
    "Follow-up on Technical Specs", 
    "Quarterly Partnership Review",
    "Onboarding Technical Session",
    "Contract Renewal Talk"
  ];
  const contacts = ["Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong", "Lachlan Smith"];
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners"];
  const types: CommType[] = ["Email", "Call", "Meeting", "Note"];
  const sentiments: Sentiment[] = ["Positive", "Neutral", "Negative"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  return {
    id: `LOG-${8000 + i}`,
    subject: subjects[i % subjects.length],
    contactName: contacts[i % contacts.length],
    company: companies[i % companies.length],
    type: types[i % types.length],
    date: `2024-04-${(14 - (i % 7)).toString().padStart(2, '0')}`,
    time: `${10 + (i % 6)}:${(i * 10) % 60 === 0 ? '00' : '30'} AM`,
    duration: i % 2 === 0 ? "45 mins" : "15 mins",
    sentiment: sentiments[i % 3],
    summary: "Discussed the new integration requirements and confirmed the timeline for Phase 2 implementation...",
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getSentimentIcon = (sentiment: Sentiment) => {
  switch (sentiment) {
    case "Positive": return <Smile size={16} className="text-emerald-500" />;
    case "Neutral": return <Meh size={16} className="text-slate-400" />;
    case "Negative": return <Frown size={16} className="text-rose-500" />;
  }
};

const getTypeBadge = (type: CommType) => {
  const styles = {
    Email: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Call: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    Meeting: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Note: "bg-slate-50 text-slate-700 ring-slate-600/20",
  };
  
  const icons = {
    Email: <Mail size={12} />,
    Call: <Phone size={12} />,
    Meeting: <Video size={12} />,
    Note: <FileText size={12} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[type]}`}>
      {icons[type]}
      {type}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function CommunicationLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");

  const filteredLogs = useMemo(() => {
    return LOGS.filter((log) => {
      const matchesSearch = 
        log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All Types" || log.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <History className="text-indigo-600" size={24} />
              Communication Logs
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">A complete timeline of all customer touchpoints and interactions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <MessageSquare size={16} />
              Log Interaction
            </button>
          </div>
        </header>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by subject, contact, or company..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-44 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All Types</option>
                <option>Email</option>
                <option>Call</option>
                <option>Meeting</option>
                <option>Note</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* LOGS LIST */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Timestamp & Type</th>
                  <th className="px-6 py-4">Interaction Details</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Sentiment</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Calendar size={12} className="text-slate-400" />
                          {log.date}
                        </div>
                        {getTypeBadge(log.type)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="max-w-md space-y-1">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          {log.subject}
                          <span className="text-[9px] px-1 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-tighter">{log.region}</span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 flex items-center gap-1">
                          <Quote size={10} className="text-slate-300" />
                          {log.summary}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-700">{log.contactName}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock size={10} /> {log.duration}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(log.sentiment)}
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{log.sentiment}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Full Transcript">
                          <ExternalLink size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-800 font-bold">{filteredLogs.length}</span> of {LOGS.length} interactions
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-600 bg-white shadow-sm font-bold text-xs px-3">
                1
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}