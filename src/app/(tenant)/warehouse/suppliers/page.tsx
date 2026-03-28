"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  ShieldCheck,
  AlertTriangle,
  MoreVertical,
  Filter,
  Download,
  ExternalLink,
  Briefcase,
  History,
  TrendingUp,
  FileBadge
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type SupplierStatus = "Active" | "Under Review" | "Onboarding" | "Blacklisted" | "Inactive";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  status: SupplierStatus;
  rating: number;
  onTimeDelivery: number;
  qualityRate: number;
  activePOs: number;
  totalSpend: number;
}

/* ---------------- MOCK DATA ---------------- */
const SUPPLIERS: Supplier[] = [
  {
    id: "VND-TECH-01",
    name: "TechLogistics Solutions Ltd",
    category: "Hardware & Electronics",
    contactPerson: "Sarah Jenkins",
    email: "s.jenkins@techlog.com",
    phone: "+1 (555) 123-4567",
    location: "Austin, TX",
    status: "Active",
    rating: 4.8,
    onTimeDelivery: 98,
    qualityRate: 99.5,
    activePOs: 3,
    totalSpend: 145000.00
  },
  {
    id: "VND-GLO-99",
    name: "Global Parts Corp",
    category: "Mechanical Parts",
    contactPerson: "Marcus Chen",
    email: "m.chen@globalparts.io",
    phone: "+1 (555) 987-6543",
    location: "Chicago, IL",
    status: "Active",
    rating: 4.2,
    onTimeDelivery: 85,
    qualityRate: 94.0,
    activePOs: 1,
    totalSpend: 42000.50
  },
  {
    id: "VND-SIL-22",
    name: "Silicon Valley Imports",
    category: "Raw Materials",
    contactPerson: "Elena Rodriguez",
    email: "erod@svimports.net",
    phone: "+1 (555) 444-3333",
    location: "San Jose, CA",
    status: "Under Review",
    rating: 3.5,
    onTimeDelivery: 72,
    qualityRate: 88.0,
    activePOs: 0,
    totalSpend: 12800.00
  },
  {
    id: "VND-NSM-05",
    name: "North Star Manufacturing",
    category: "Packaging",
    contactPerson: "David Smith",
    email: "d.smith@northstar.com",
    phone: "+1 (555) 222-1111",
    location: "Seattle, WA",
    status: "Onboarding",
    rating: 0,
    onTimeDelivery: 0,
    qualityRate: 0,
    activePOs: 2,
    totalSpend: 0.00
  },
  {
    id: "VND-ECO-11",
    name: "EcoPack Supplies",
    category: "Sustainable Packaging",
    contactPerson: "Liam O'Neil",
    email: "liam@ecopack.org",
    phone: "+1 (555) 888-9999",
    location: "Portland, OR",
    status: "Active",
    rating: 4.9,
    onTimeDelivery: 100,
    qualityRate: 99.9,
    activePOs: 5,
    totalSpend: 89300.00
  }
];

/* ---------------- UI HELPERS ---------------- */
const getStatusBadge = (status: SupplierStatus) => {
  const configs: Record<SupplierStatus, { color: string; icon: React.ReactNode }> = {
    "Active": { color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", icon: <ShieldCheck size={12} /> },
    "Under Review": { color: "bg-amber-50 text-amber-700 ring-amber-600/20", icon: <AlertTriangle size={12} /> },
    "Onboarding": { color: "bg-blue-50 text-blue-700 ring-blue-600/20", icon: <History size={12} /> },
    "Blacklisted": { color: "bg-rose-50 text-rose-700 ring-rose-600/20", icon: <AlertTriangle size={12} /> },
    "Inactive": { color: "bg-slate-50 text-slate-500 ring-slate-600/20", icon: <Briefcase size={12} /> },
  };
  const config = configs[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredSuppliers = useMemo(() => {
    return SUPPLIERS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Building2 size={20} />
              </div>
              Supplier Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Manage vendor relationships, compliance, and delivery performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export Directory
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
              <Plus size={16} />
              Add Supplier
            </button>
          </div>
        </header>

        {/* PERFORMANCE OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Avg. Delivery Rate", value: "92.4%", trend: "+2.1%", icon: <TrendingUp size={16}/>, color: "text-emerald-600" },
            { label: "Active Vendors", value: "48", trend: "Stable", icon: <Building2 size={16}/>, color: "text-indigo-600" },
            { label: "High Risk Vendors", value: "03", trend: "-1", icon: <AlertTriangle size={16}/>, color: "text-rose-600" },
          ].map((m, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-slate-50 ${m.color}`}>
                  {m.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                  <p className="text-xl font-black text-slate-900">{m.value}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-100 ${m.trend.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'}`}>
                {m.trend}
              </span>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by vendor name, contact or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 outline-none hover:border-slate-300 cursor-pointer shadow-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Hardware & Electronics</option>
              <option>Mechanical Parts</option>
              <option>Raw Materials</option>
              <option>Packaging</option>
            </select>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* SUPPLIERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="p-5 border-b border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm">
                      {supplier.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {supplier.name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                        {supplier.id} • {supplier.category}
                      </p>
                    </div>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Mail size={14} className="text-slate-400" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <MapPin size={14} className="text-slate-400" />
                    {supplier.location}
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 space-y-4">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reliability (OTD)</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${supplier.onTimeDelivery > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${supplier.onTimeDelivery}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-700">{supplier.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Quality Rate</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${supplier.qualityRate > 95 ? 'bg-indigo-500' : 'bg-rose-500'}`} 
                          style={{ width: `${supplier.qualityRate}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-700">{supplier.qualityRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className={supplier.rating > 0 ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                    <span className="text-xs font-black text-slate-700">{supplier.rating || "N/A"}</span>
                  </div>
                  {getStatusBadge(supplier.status)}
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Active Orders</span>
                  <span className="text-xs font-black text-slate-700">{supplier.activePOs} POs</span>
                </div>
                <button className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider transition-colors">
                  View Profile
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMPLIANCE ALERT */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-3 bg-amber-100 rounded-xl text-amber-700">
            <FileBadge size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-black text-amber-900">Certificate Expiration Warning</h3>
            <p className="text-xs font-medium text-amber-700 mt-1 max-w-2xl">
              3 suppliers have ISO certifications or Insurance documents expiring within the next 30 days. Renewals are required to maintain "Active" status in the procurement system.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="text-xs font-black text-amber-900 underline underline-offset-4 decoration-2">Review Suppliers</button>
              <button className="text-xs font-black text-amber-900 underline underline-offset-4 decoration-2">Send Bulk Reminders</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}