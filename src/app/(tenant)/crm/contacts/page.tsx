"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  MessageSquare,
  Globe,
  Briefcase,
  Clock,
  Shield
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type ContactStatus = "Active" | "Away" | "Offline";

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: ContactStatus;
  avatarColor: string;
  lastContacted: string;
  timezone: string;
}

/* ---------------- MOCK DATA ---------------- */
const COLORS = ["bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600"];

const CONTACTS: Contact[] = Array.from({ length: 25 }, (_, i) => {
  const names = [
    "Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong", "William Clarke",
    "Harper Jones", "Leo Thompson", "Grace Miller", "Thomas Davis", "Zoe Wilson"
  ];
  
  const roles = [
    "Procurement Manager", "Chief Operations Officer", "Technical Lead", 
    "Account Executive", "Senior Developer", "VP of Engineering"
  ];

  const companies = [
    "Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp"
  ];

  const locations = ["Sydney, AU", "Auckland, NZ", "New York, US", "Melbourne, AU", "Austin, US"];
  const timezones = ["AEST (UTC+10)", "NZDT (UTC+13)", "EST (UTC-5)", "AEST (UTC+10)", "CST (UTC-6)"];

  const phoneFormats = [
    `+61 4${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
    `+1 (555) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`,
    `+64 21 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 8999)}`
  ];

  return {
    id: `CON-${5000 + i}`,
    name: names[i % names.length],
    role: roles[i % roles.length],
    company: companies[i % companies.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@${companies[i % companies.length].toLowerCase().replace(/ /g, '')}.com`,
    phone: phoneFormats[i % phoneFormats.length],
    location: locations[i % locations.length],
    status: (["Active", "Away", "Offline"][i % 3]) as ContactStatus,
    avatarColor: COLORS[i % COLORS.length],
    lastContacted: `${Math.floor(Math.random() * 24)}h ago`,
    timezone: timezones[i % timezones.length]
  };
});

/* ---------------- MAIN COMPONENT ---------------- */
export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("All Companies");

  const filteredContacts = useMemo(() => {
    return CONTACTS.filter((con) => {
      const matchesSearch = 
        con.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        con.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        con.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCompany = filterCompany === "All Companies" || con.company === filterCompany;
      
      return matchesSearch && matchesCompany;
    });
  }, [searchTerm, filterCompany]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Globe className="text-indigo-600" size={24} />
              Global Contacts
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Directory of individual stakeholders and project members.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <UserPlus size={16} />
              New Contact
            </button>
          </div>
        </header>

        {/* QUICK FILTERS / SEARCH */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, role, or email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-48 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none hover:border-slate-300 cursor-pointer"
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                <option>All Companies</option>
                <option>Apex Solutions AU</option>
                <option>Global Tech NZ</option>
                <option>CloudScale US</option>
                <option>Lumina Partners</option>
                <option>Horizon Corp</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* CONTACTS GRID / TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Company & Role</th>
                  <th className="px-6 py-4">Communication</th>
                  <th className="px-6 py-4">Local Context</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((con, i) => (
                  <tr key={con.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`relative w-10 h-10 rounded-full ${con.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                          {con.name.split(' ').map(n => n[0]).join('')}
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${con.status === 'Active' ? 'bg-emerald-500' : con.status === 'Away' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                            {con.name}
                            {i % 5 === 0 && <Shield size={12} className="text-indigo-500" />}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{con.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                          <Briefcase size={14} className="text-slate-400" />
                          {con.company}
                        </div>
                        <div className="text-xs text-slate-500">{con.role}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors">
                          <Mail size={12} className="text-slate-400" /> {con.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Phone size={12} className="text-slate-400" /> {con.phone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin size={12} className="text-slate-400" /> {con.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          <Clock size={10} /> {con.timezone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <MessageSquare size={18} />
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> 12 Online
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> 5 Away
              </div>
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