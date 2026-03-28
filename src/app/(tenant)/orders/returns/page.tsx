"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCcw,
  PackageCheck,
  Truck,
  AlertCircle,
  DollarSign,
  Briefcase,
  Calendar,
  Filter,
  PackageOpen,
  History,
  ShieldCheck,
  BadgePercent,
  Clock
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type ReturnStatus = "Requested" | "In Transit" | "Inspected" | "Refunded" | "Rejected";

interface ReturnRequest {
  id: string;
  orderId: string;
  company: string;
  amount: number;
  itemCount: number;
  status: ReturnStatus;
  requestDate: string;
  reason: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const RETURNS: ReturnRequest[] = Array.from({ length: 18 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp", "Nexus Industries"];
  const reasons = ["Defective Item", "Wrong Size", "Changed Mind", "Not as Described", "Damaged in Shipping"];
  const statuses: ReturnStatus[] = ["Requested", "In Transit", "Inspected", "Refunded", "Rejected"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  const amount = Math.floor(Math.random() * 8000) + 150;
  const baseDay = 20;
  const reqDay = baseDay - (i % 15);

  return {
    id: `RET-${70000 + i}`,
    orderId: `ORD-${20000 + i}`,
    company: companies[i % companies.length],
    amount: amount,
    itemCount: Math.floor(Math.random() * 5) + 1,
    status: statuses[i % statuses.length],
    requestDate: `2024-05-${reqDay.toString().padStart(2, '0')}`,
    reason: reasons[i % reasons.length],
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: ReturnStatus) => {
  const styles: Record<ReturnStatus, string> = {
    "Refunded": "bg-emerald-100 text-emerald-900 ring-emerald-600/30",
    "Requested": "bg-blue-100 text-blue-900 ring-blue-600/30",
    "In Transit": "bg-indigo-100 text-indigo-900 ring-indigo-600/30",
    "Inspected": "bg-purple-100 text-purple-900 ring-purple-600/30",
    "Rejected": "bg-rose-100 text-rose-900 ring-rose-600/30",
  };
  
  const icons: Record<ReturnStatus, React.ReactNode> = {
    "Refunded": <ShieldCheck size={10} />,
    "Requested": <History size={10} />,
    "In Transit": <Truck size={10} />,
    "Inspected": <PackageCheck size={10} />,
    "Rejected": <AlertCircle size={10} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function ReturnsRefundsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredReturns = useMemo(() => {
    return RETURNS.filter((ret) => {
      const matchesSearch = 
        ret.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ret.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ret.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Statuses" || ret.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Aggregates
  const totalRefunded = RETURNS.filter(r => r.status === "Refunded").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRefunds = RETURNS.filter(r => r.status !== "Refunded" && r.status !== "Rejected").reduce((acc, curr) => acc + curr.amount, 0);
  const returnRate = 4.2; 

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <RefreshCcw className="text-indigo-600" size={24} />
              Returns & Refunds
            </h1>
            <p className="text-slate-600 text-sm mt-0.5 font-medium">Process reverse logistics and customer reimbursement requests.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md">
              <PackageOpen size={16} />
              New Return
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Refunded (MTD)</p>
              <DollarSign size={16} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">${(totalRefunded / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">Completed reimbursements</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm ring-2 ring-indigo-500/10 border-indigo-200">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Pending Value</p>
              <History size={16} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">${(pendingRefunds / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-indigo-700 text-[10px] font-black underline decoration-indigo-200">Awaiting inspection/approval</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Return Rate</p>
              <BadgePercent size={16} className="text-rose-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{returnRate}%</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">Of total sales volume</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Cycle Time</p>
              <Clock size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">3.2 Days</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">Request to resolution</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search Return ID, Order #, or Customer..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 appearance-none outline-none hover:border-slate-400 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Requested</option>
              <option>In Transit</option>
              <option>Inspected</option>
              <option>Refunded</option>
              <option>Rejected</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={14} />
          </div>
        </div>

        {/* RETURNS TABLE */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[11px] font-black text-slate-800 uppercase tracking-widest">
                  <th className="px-6 py-4">Return Reference</th>
                  <th className="px-6 py-4">Customer & Order</th>
                  <th className="px-6 py-4 text-center">Items</th>
                  <th className="px-6 py-4">Est. Refund (USD)</th>
                  <th className="px-6 py-4">Status & Logistics</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReturns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-black text-slate-900 text-sm">{ret.id}</div>
                        <div className="text-[10px] text-slate-600 font-bold flex items-center gap-1 uppercase tracking-tighter">
                          Created: {ret.requestDate}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                          <Briefcase size={14} className="text-slate-500" />
                          {ret.company}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 text-white rounded font-black uppercase tracking-tight">{ret.region}</span>
                           <span className="text-[10px] text-slate-600 font-bold">Order: <span className="text-indigo-700">#{ret.orderId}</span></span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 border border-slate-200 rounded-full text-xs font-black text-slate-800">
                        {ret.itemCount}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-black text-slate-900">
                        ${ret.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(ret.status)}
                        <div className="text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                          <Truck size={12} className="text-slate-400" />
                          {ret.reason}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-slate-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 rounded-lg transition-all border border-slate-200 shadow-sm" title="Review Request">
                          <PackageCheck size={18} />
                        </button>
                        <button className="p-2 text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50 rounded-lg transition-all border border-slate-200 shadow-sm" title="Process Refund">
                          <DollarSign size={18} />
                        </button>
                        <button className="p-2 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm">
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
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-100/50 flex items-center justify-between">
            <div className="text-xs text-slate-700 font-bold">
              Showing <span className="text-slate-950 font-black">{filteredReturns.length}</span> of {RETURNS.length} requests
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-300 text-slate-500 hover:bg-white transition disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded border border-slate-300 text-slate-950 bg-white shadow-sm font-black text-xs px-3">
                1
              </button>
              <button className="p-1.5 rounded border border-slate-300 text-slate-700 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}