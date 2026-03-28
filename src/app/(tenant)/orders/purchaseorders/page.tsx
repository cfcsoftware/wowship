"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileMinus,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Briefcase,
  Calendar,
  Undo2,
  ArrowDownRight,
  Scale,
  Percent,
  Receipt
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type CreditStatus = "Open" | "Applied" | "Void" | "Pending Approval";

interface CreditNote {
  id: string;
  invoiceId: string;
  company: string;
  amount: number;
  reason: string;
  status: CreditStatus;
  issueDate: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const CREDIT_NOTES: CreditNote[] = Array.from({ length: 15 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp", "Nexus Industries"];
  const reasons = ["Return of Goods", "Pricing Adjustment", "Goodwill Credit", "Overpayment", "Service Outage Refund"];
  const statuses: CreditStatus[] = ["Open", "Applied", "Applied", "Pending Approval", "Void"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  const amount = Math.floor(Math.random() * 5000) + 200;
  const baseDay = 22;
  const issueDay = baseDay - (i % 12);

  return {
    id: `CN-${40000 + i}`,
    invoiceId: `INV-${30000 + i}`,
    company: companies[i % companies.length],
    amount: amount,
    reason: reasons[i % reasons.length],
    status: statuses[i % statuses.length],
    issueDate: `2024-05-${issueDay.toString().padStart(2, '0')}`,
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: CreditStatus) => {
  const styles: Record<CreditStatus, string> = {
    "Applied": "bg-emerald-100 text-emerald-900 ring-emerald-600/30",
    "Open": "bg-blue-100 text-blue-900 ring-blue-600/30",
    "Pending Approval": "bg-amber-100 text-amber-900 ring-amber-600/30",
    "Void": "bg-slate-200 text-slate-700 ring-slate-400/30",
  };
  
  const icons: Record<CreditStatus, React.ReactNode> = {
    "Applied": <CheckCircle2 size={10} />,
    "Open": <ArrowDownRight size={10} />,
    "Pending Approval": <Clock size={10} />,
    "Void": <AlertCircle size={10} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function CreditNotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredCredits = useMemo(() => {
    return CREDIT_NOTES.filter((cn) => {
      const matchesSearch = 
        cn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Statuses" || cn.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Aggregates
  const totalCredited = CREDIT_NOTES.filter(c => c.status !== "Void").reduce((acc, curr) => acc + curr.amount, 0);
  const openBalance = CREDIT_NOTES.filter(c => c.status === "Open").reduce((acc, curr) => acc + curr.amount, 0);
  const creditUsageRate = 72; // Mock stat

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <FileMinus className="text-rose-600" size={24} />
              Credit Notes
            </h1>
            <p className="text-slate-600 text-sm mt-0.5 font-medium">Manage customer credits, returns, and balance adjustments.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="inline-flex items-center gap-2 bg-rose-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-rose-700 transition shadow-md">
              <Undo2 size={16} />
              Issue Credit
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Issued (MTD)</p>
              <FileMinus size={16} className="text-rose-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">${(totalCredited / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">Gross adjustments processed</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm ring-2 ring-blue-500/10 border-blue-200">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Open Balance</p>
              <ArrowDownRight size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">${(openBalance / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-blue-700 text-[10px] font-black underline decoration-blue-200">Unapplied customer credit</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Utilization Rate</p>
              <Percent size={16} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{creditUsageRate}%</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">Credits applied to invoices</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Audit Health</p>
              <Scale size={16} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="mt-2 text-slate-600 text-[10px] font-bold">All notes linked to invoices</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search Credit Note #, Invoice #, or Company..."
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
              <option>Open</option>
              <option>Applied</option>
              <option>Pending Approval</option>
              <option>Void</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={14} />
          </div>
        </div>

        {/* CREDIT NOTES TABLE */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[11px] font-black text-slate-800 uppercase tracking-widest">
                  <th className="px-6 py-4">Credit Note</th>
                  <th className="px-6 py-4">Customer & Origin</th>
                  <th className="px-6 py-4">Credit Value (USD)</th>
                  <th className="px-6 py-4">Status & Reason</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCredits.map((cn) => (
                  <tr key={cn.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-black text-slate-900 text-sm">{cn.id}</div>
                        <div className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                          Against: <span className="text-indigo-700">{cn.invoiceId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                          <Briefcase size={14} className="text-slate-500" />
                          {cn.company}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 text-white rounded font-black uppercase tracking-tight">{cn.region}</span>
                           <span className="text-[10px] text-slate-600 font-bold">Issued: {cn.issueDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-black text-rose-700">
                        -${cn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(cn.status)}
                        <div className="text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                          <AlertCircle size={12} className="text-slate-400" />
                          {cn.reason}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-slate-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 rounded-lg transition-all border border-slate-200 shadow-sm" title="View Linked Invoice">
                          <Receipt size={18} />
                        </button>
                        <button className="p-2 text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50 rounded-lg transition-all border border-slate-200 shadow-sm" title="Download Document">
                          <Download size={18} />
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
              Showing <span className="text-slate-950 font-black">{filteredCredits.length}</span> of {CREDIT_NOTES.length} notes
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