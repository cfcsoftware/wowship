"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  ShieldCheck, 
  ShieldAlert, 
  Globe, 
  Mail, 
  Phone, 
  MoreVertical, 
  ExternalLink,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  History,
  TrendingUp,
  X,
  ChevronRight,
  BadgeCheck
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const VENDORS = [
  {
    id: "VEN-001",
    name: "TechSolutions Pro",
    category: "IT Hardware",
    rating: 4.8,
    status: "preferred",
    compliance: "verified",
    contact: "Sarah Jenkins",
    email: "s.jenkins@techsolutions.com",
    location: "Austin, TX",
    spendYTD: 142000,
    activeContracts: 3,
    risk: "low",
    tags: ["ISO 9001", "Volume Discount"]
  },
  {
    id: "VEN-002",
    name: "Modern Office Co.",
    category: "Furniture",
    rating: 4.2,
    status: "active",
    compliance: "pending",
    contact: "Michael Chen",
    email: "m.chen@modernoffice.com",
    location: "Chicago, IL",
    spendYTD: 35500,
    activeContracts: 1,
    risk: "medium",
    tags: ["Sustainable"]
  },
  {
    id: "VEN-003",
    name: "Adobe Systems Inc",
    category: "Software/SaaS",
    rating: 4.9,
    status: "preferred",
    compliance: "verified",
    contact: "Enterprise Support",
    email: "enterprise@adobe.com",
    location: "San Jose, CA",
    spendYTD: 88400,
    activeContracts: 5,
    risk: "low",
    tags: ["SLA Guaranteed"]
  },
  {
    id: "VEN-004",
    name: "Global Logistics Ltd",
    category: "Shipping",
    rating: 3.5,
    status: "on_probation",
    compliance: "expired",
    contact: "David Miller",
    email: "d.miller@globallogistics.com",
    location: "Newark, NJ",
    spendYTD: 12100,
    activeContracts: 1,
    risk: "high",
    tags: ["Critical Path"]
  }
];

const COMPLIANCE_THEMES = {
  verified: { bg: "bg-emerald-50", text: "text-emerald-700", icon: ShieldCheck, label: "Compliant" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", icon: ShieldAlert, label: "Pending Review" },
  expired: { bg: "bg-rose-50", text: "text-rose-700", icon: ShieldAlert, label: "Non-Compliant" },
};

const STATUS_CHIPS = {
  preferred: "bg-indigo-600 text-white",
  active: "bg-slate-100 text-slate-600",
  on_probation: "bg-rose-100 text-rose-600",
};

export default function VendorManagement() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = VENDORS.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 p-6 md:p-8 transition-all duration-300 ${selectedVendor ? 'mr-[500px]' : ''}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-slate-900 rounded-lg shadow-lg">
                  <Building2 className="text-white" size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Supply Chain</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Vendor Directory</h1>
              <p className="text-slate-500 font-medium">Monitor performance, risk, and compliance across your supply base.</p>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Plus size={18} />
              Onboard Vendor
            </button>
          </div>

          {/* VENDOR METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Vendors", val: "124", color: "text-slate-900", icon: Building2 },
              { label: "Compliance Rate", val: "94%", color: "text-emerald-600", icon: ShieldCheck },
              { label: "Active Spend", val: "$2.4M", color: "text-indigo-600", icon: TrendingUp },
              { label: "Expiring Docs", val: "12", color: "text-rose-600", icon: FileText },
            ].map((m, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <m.icon size={18} className="text-slate-300" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
                </div>
                <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
              </div>
            ))}
          </div>

          {/* SEARCH & FILTER */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by vendor name, category or tag..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-xl border-none outline-none text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                <Filter size={16} /> Filter By Category
              </button>
              <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                Compliance Status
              </button>
            </div>
          </div>

          {/* VENDOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVendors.map((vendor) => (
              <div 
                key={vendor.id}
                onClick={() => setSelectedVendor(vendor)}
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${STATUS_CHIPS[vendor.status]}`}>
                  {vendor.status.replace('_', ' ')}
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Building2 size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-slate-900">{vendor.name}</h3>
                      {vendor.compliance === 'verified' && <BadgeCheck size={18} className="text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      <span>{vendor.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" /> {vendor.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 py-4 border-y border-slate-50">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Spend (YTD)</p>
                    <p className="text-sm font-black text-slate-900">${(vendor.spendYTD / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Level</p>
                    <p className={`text-sm font-black uppercase tracking-tighter ${
                      vendor.risk === 'low' ? 'text-emerald-600' : vendor.risk === 'medium' ? 'text-amber-600' : 'text-rose-600'
                    }`}>{vendor.risk}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Contracts</p>
                    <p className="text-sm font-black text-slate-900">{vendor.activeContracts} Active</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {vendor.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-md border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-slate-300 group-hover:text-indigo-500 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VENDOR DETAIL DRAWER */}
      {selectedVendor && (
        <div className="fixed right-0 top-0 h-full w-[500px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Vendor Profile</h2>
            <button 
              onClick={() => setSelectedVendor(null)}
              className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Contact Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100">
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedVendor.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <MapPin size={12} /> {selectedVendor.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-indigo-600">
                    <Mail size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 truncate">{selectedVendor.email}</p>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-indigo-600">
                    <Phone size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Phone</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">+1 (555) 012-3456</p>
                </div>
              </div>
            </div>

            {/* Compliance Section */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance & Certification</h4>
              <div className={`p-5 rounded-2xl border ${COMPLIANCE_THEMES[selectedVendor.compliance].bg} border-current opacity-80 flex items-center gap-4`}>
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${COMPLIANCE_THEMES[selectedVendor.compliance].text}`}>
                  {React.createElement(COMPLIANCE_THEMES[selectedVendor.compliance].icon, { size: 20 })}
                </div>
                <div>
                  <p className={`text-sm font-black ${COMPLIANCE_THEMES[selectedVendor.compliance].text}`}>
                    {COMPLIANCE_THEMES[selectedVendor.compliance].label}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500">Last verified: Oct 12, 2023</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <History size={14} /> Recent Transactions
              </h4>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase">PO-2024-880{i}</p>
                      <p className="text-xs font-bold text-slate-700">Hardware Acquisition</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-900">$1,200.00</p>
                      <p className="text-[10px] text-slate-400 font-medium">Oct {20 + i}, 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contracts */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText size={14} /> Active Contracts
              </h4>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 tracking-tight">Master Services Agreement</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Expires in 142 days</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-slate-100 flex gap-3">
            <button className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
              Create Order
            </button>
            <button className="px-5 py-3.5 border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-50 transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}