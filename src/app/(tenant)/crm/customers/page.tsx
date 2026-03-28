"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  Star,
  ChevronDown,
  UserCheck,
  History,
  ExternalLink,
  Users
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type CustomerTier = "Platinum" | "Gold" | "Silver" | "Standard";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpent: number;
  lastPurchase: string;
  tier: CustomerTier;
  avatarColor: string;
  joinedDate: string;
}

/* ---------------- MOCK DATA ---------------- */
const COLORS = ["bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-emerald-600", "bg-rose-600"];

const CUSTOMERS: Customer[] = Array.from({ length: 30 }, (_, i) => {
  const names = [
    "James Wilson", "Sarah Miller", "Lachlan Smith", "Kiara Williams", "Ethan Brown",
    "Chloe Davis", "Noah Taylor", "Isabella Moore", "Mason Anderson", "Mia Thomas"
  ];
  
  const locations = [
    "Sydney, NSW (AU)", 
    "Auckland, NZ", 
    "New York, NY (US)", 
    "Melbourne, VIC (AU)", 
    "San Francisco, CA (US)", 
    "Wellington, NZ"
  ];

  const phoneFormats = [
    `+61 4${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`, // AU
    `+1 (555) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`, // US
    `+64 21 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 8999)}` // NZ
  ];

  return {
    id: `CUST-${20400 + i}`,
    name: names[i % names.length],
    email: `contact@${names[i % names.length].toLowerCase().replace(' ', '')}.com`,
    phone: phoneFormats[i % phoneFormats.length],
    location: locations[i % locations.length],
    totalSpent: Math.floor(Math.random() * 15000) + 1200,
    lastPurchase: `2024-03-${(25 - (i % 20)).toString().padStart(2, '0')}`,
    tier: ["Platinum", "Gold", "Silver", "Standard"][i % 4] as CustomerTier,
    avatarColor: COLORS[i % COLORS.length],
    joinedDate: "2023-01-15",
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getTierStyles = (tier: CustomerTier) => {
  const styles: Record<CustomerTier, string> = {
    "Platinum": "bg-slate-900 text-white ring-slate-900/10",
    "Gold": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Silver": "bg-slate-100 text-slate-700 ring-slate-600/20",
    "Standard": "bg-blue-50 text-blue-700 ring-blue-600/20",
  };
  return `inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[tier]}`;
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("All Tiers");

  const filteredCustomers = useMemo(() => {
    return CUSTOMERS.filter((cust) => {
      const matchesSearch = 
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTier = selectedTier === "All Tiers" || cust.tier === selectedTier;
      
      return matchesSearch && matchesTier;
    });
  }, [searchTerm, selectedTier]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <UserCheck className="text-indigo-600" size={24} />
              Customer Directory
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage global accounts and client relationships.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} />
              Customer
            </button>
          </div>
        </header>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Active Customers</p>
              <p className="text-xl font-bold text-slate-800">1,284</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Avg. Lifetime Value</p>
              <p className="text-xl font-bold text-slate-800">$12,450</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <Star size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Platinum Clients</p>
              <p className="text-xl font-bold text-slate-800">42</p>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-40 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none hover:border-slate-300 cursor-pointer"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
              >
                <option>All Tiers</option>
                <option>Platinum</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Standard</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <button 
              className="px-3 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors"
              onClick={() => {
                setSearchTerm("");
                setSelectedTier("All Tiers");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* CUSTOMERS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Contact & Location</th>
                  <th className="px-6 py-4">Status & Tier</th>
                  <th className="px-6 py-4">Purchase History</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${cust.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                            {cust.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{cust.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{cust.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                            <Phone size={12} className="text-slate-400" /> {cust.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <MapPin size={12} /> {cust.location}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={getTierStyles(cust.tier)}>
                            {cust.tier === "Platinum" && <ShieldCheck size={10} />}
                            {cust.tier}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium italic">Member since {cust.joinedDate}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-slate-800">${cust.totalSpent.toLocaleString('en-US')}</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                            <History size={10} /> Last: {cust.lastPurchase}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-white text-indigo-600 border border-transparent hover:border-indigo-100 rounded-md text-xs font-bold transition-all shadow-none hover:shadow-sm">
                            View File <ExternalLink size={12} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="p-4 bg-slate-50 rounded-full mb-4">
                          <Search size={32} />
                        </div>
                        <p className="text-lg font-medium text-slate-600">No results found</p>
                        <p className="text-sm">Try broadening your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
              Showing {filteredCustomers.length} of 1,284 Clients
            </span>
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