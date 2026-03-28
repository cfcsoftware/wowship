"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Edit2,
  Trash2,
  TrendingUp,
  Filter,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Calendar,
  Users,
  Globe,
  ChevronDown,
  Phone,
  Mail
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type LeadStatus = "New Lead" | "In-Progress" | "Follow-Up" | "Visit Request" | "Hot Leads";

interface Lead {
  id: string;
  date: string;
  name: string;
  mobile: string;
  email: string;
  projectName: string;
  projectDetails: string;
  status: LeadStatus;
  avatarColor: string;
  source: string;
  assignedTo: string;
}

interface KPI {
  label: string;
  value: string;
  trend: string;
  color: string;
}

/* ---------------- MOCK DATA ---------------- */
const COLORS = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"];
const SOURCES = ["Google Ads", "Facebook", "Instagram", "Direct Call", "Referral", "Website", "LinkedIn", "Offline Event"];
const EMPLOYEES = ["Rahul Sharma", "Priya Verma", "Amit Patel", "Sneha Rao", "Vikram Singh", "Ananya Iyer", "Rohan Gupta"];
const DATE_RANGES = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "Custom Range"];

const BASE_LEADS: Lead[] = Array.from({ length: 45 }, (_, i) => ({
  id: `ILD10${959 - i}`,
  date: `2024-03-${(28 - (i % 28)).toString().padStart(2, '0')}`,
  name: [
    "Chandraboli Ganguli",
    "Astha Purwar",
    "Krittika Singh",
    "Dinesh Kalra",
    "Sujoy Mazumder",
  ][i % 5],
  mobile: `+91 91632 ${65000 + i}`,
  email: `user${i}@realestate.in`,
  projectName: [
    "Ashok Odyssey",
    "Wadhwa The Address",
    "Runwal The Orchard",
    "Kanakia Zenworld",
    "Godrej Platinum",
  ][i % 5],
  projectDetails: "₹50,000 • 2 BHK",
  status: ["In-Progress", "New Lead", "Follow-Up", "Visit Request", "Hot Leads"][i % 5] as LeadStatus,
  avatarColor: COLORS[i % COLORS.length],
  source: SOURCES[i % SOURCES.length],
  assignedTo: EMPLOYEES[i % EMPLOYEES.length]
}));

const KPIS: KPI[] = [
  { label: "New Leads", value: "682", trend: "+12%", color: "text-blue-600" },
  { label: "In Progress", value: "62", trend: "+5%", color: "text-cyan-600" },
  { label: "Visit Request", value: "27", trend: "+2%", color: "text-emerald-600" },
  { label: "Follow Ups", value: "18", trend: "-1%", color: "text-rose-600" },
  { label: "Hot Leads", value: "08", trend: "+8%", color: "text-amber-600" },
  { label: "Warm Leads", value: "09", trend: "+4%", color: "text-orange-600" },
];

/* ---------------- STYLES HELPERS ---------------- */
const getStatusStyles = (status: LeadStatus) => {
  const styles: Record<LeadStatus, string> = {
    "New Lead": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "In-Progress": "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    "Visit Request": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Follow-Up": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Hot Leads": "bg-amber-50 text-amber-700 ring-amber-600/20",
  };
  return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`;
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const filteredLeads = useMemo(() => {
    return BASE_LEADS.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "All Status" || lead.status === selectedStatus;
      const matchesSource = selectedSource === "All Sources" || lead.source === selectedSource;
      const matchesEmployee = selectedEmployee === "All Employees" || lead.assignedTo === selectedEmployee;
      
      return matchesSearch && matchesStatus && matchesSource && matchesEmployee;
    });
  }, [searchTerm, selectedStatus, selectedSource, selectedEmployee]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads Management</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Empowering your real estate sales pipeline.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={18} />
              Export
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} /> Lead
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {KPIS.map((kpi, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className={`p-1.5 rounded-lg bg-slate-50 ${kpi.color} group-hover:scale-110 transition-transform`}>
                  <TrendingUp size={14} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold text-slate-800">{kpi.value}</h2>
                <span className="text-[10px] font-bold text-emerald-500">{kpi.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* SEARCH AND CONTROLS */}
        <section className="space-y-4">
         
          {/* SINGLE ROW FILTERS AND REFRESH */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            
             {/* Search Leads */}
            <div className="relative flex-1 min-w-[140px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
              type="text"
              placeholder="Search leads by name, ID or project..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Filter size={14} className="text-slate-400" />
              </div>
              <select 
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:bg-white hover:border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>New Lead</option>
                <option>In-Progress</option>
                <option>Follow-Up</option>
                <option>Visit Request</option>
                <option>Hot Leads</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

        
             {/* Source Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Globe size={14} className="text-slate-400" />
              </div>
              <select 
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:bg-white hover:border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option>All Sources</option>
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

            {/* Employee Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Users size={14} className="text-slate-400" />
              </div>
              <select 
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:bg-white hover:border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option>All Employees</option>
                {EMPLOYEES.map(emp => <option key={emp} value={emp}>{emp}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>

            {/* Date Range Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar size={14} className="text-slate-400" />
              </div>
              <select 
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:bg-white hover:border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                {DATE_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
            {/* Refresh Button */}
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 rounded-xl font-bold text-xs transition-all active:scale-95 group">
              <RefreshCw size={14} className="group-active:rotate-180 transition-transform duration-500" />
              Refresh Data
            </button>

          </div>
        </section>

        {/* TABLE CONTAINER */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Lead Information</th>
                  <th className="px-6 py-4">Contact Details</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Property Details</th>
                  <th className="px-6 py-4 text-center">Source & Assigned</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${lead.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white`}>
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{lead.name}</div>
                            <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-tighter mt-0.5">{lead.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <Phone size={12} className="text-slate-400" />
                            {lead.mobile}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <Mail size={12} className="text-slate-400" />
                            {lead.email}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <span className={getStatusStyles(lead.status)}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <Briefcase size={14} className="text-slate-400 mt-1" />
                          <div>
                            <div className="text-sm font-semibold text-slate-700">{lead.projectName}</div>
                            <div className="text-xs text-slate-500">{lead.projectDetails}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md inline-block uppercase tracking-wider mb-1">
                          {lead.source}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                          <Users size={10} /> {lead.assignedTo}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition border border-transparent hover:border-indigo-100 shadow-none hover:shadow-sm" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-lg transition border border-transparent hover:border-emerald-100 shadow-none hover:shadow-sm" title="Edit Lead">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition border border-transparent hover:border-rose-100 shadow-none hover:shadow-sm" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="p-4 bg-slate-50 rounded-full mb-4">
                          <Search size={32} />
                        </div>
                        <p className="text-lg font-medium text-slate-600">No leads match those filters</p>
                        <p className="text-sm">Try resetting your status, source, or employee selection.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <footer className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{filteredLeads.length}</span> results found
            </span>

            <div className="flex items-center gap-1.5">
              <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition shadow-sm">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`min-w-[36px] h-9 rounded-lg text-sm font-bold transition ${
                    page === 1 
                      ? "bg-orange-500 text-white shadow-md shadow-orange-100" 
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}