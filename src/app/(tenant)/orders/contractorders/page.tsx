"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileSignature,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Eye,
  Percent
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";

interface Quotation {
  id: string;
  title: string;
  company: string;
  contactName: string;
  amount: number;
  status: QuoteStatus;
  issueDate: string;
  expiryDate: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const QUOTES: Quotation[] = Array.from({ length: 18 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp"];
  const contacts = ["Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong", "Lachlan Smith"];
  const titles = ["Enterprise SaaS License 2024", "Q3 Infrastructure Upgrade", "Phase 1 Implementation", "Annual Support Retainer", "Custom Module Development"];
  const statuses: QuoteStatus[] = ["Draft", "Sent", "Accepted", "Rejected", "Expired"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  // Create dates relative to a baseline
  const baselineDay = 15;
  const issueDay = baselineDay - (i % 10);
  const expiryDay = issueDay + 30;

  return {
    id: `QT-${10000 + i}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    contactName: contacts[i % contacts.length],
    amount: Math.floor(Math.random() * 150000) + 5000,
    status: statuses[i % 5],
    issueDate: `2024-04-${issueDay.toString().padStart(2, '0')}`,
    expiryDate: `2024-05-${(expiryDay > 30 ? expiryDay - 30 : expiryDay).toString().padStart(2, '0')}`,
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: QuoteStatus) => {
  const styles: Record<QuoteStatus, string> = {
    "Draft": "bg-slate-50 text-slate-700 ring-slate-600/20",
    "Sent": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Accepted": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Rejected": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Expired": "bg-amber-50 text-amber-700 ring-amber-600/20",
  };
  
  const icons: Record<QuoteStatus, React.ReactNode> = {
    "Draft": <FileText size={10} />,
    "Sent": <Send size={10} />,
    "Accepted": <CheckCircle2 size={10} />,
    "Rejected": <XCircle size={10} />,
    "Expired": <Clock size={10} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredQuotes = useMemo(() => {
    return QUOTES.filter((quote) => {
      const matchesSearch = 
        quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Statuses" || quote.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Aggregate Stats
  const totalSent = QUOTES.filter(q => q.status === "Sent").reduce((acc, curr) => acc + curr.amount, 0);
  const totalAccepted = QUOTES.filter(q => q.status === "Accepted").reduce((acc, curr) => acc + curr.amount, 0);
  const acceptanceRate = Math.round((QUOTES.filter(q => q.status === "Accepted").length / QUOTES.filter(q => q.status !== "Draft").length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <FileSignature className="text-indigo-600" size={24} />
              Quotations & Proposals
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage pricing sent to prospects and track proposal statuses.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} />
              New Quote
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending (Sent)</p>
              <Send size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(totalSent / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Awaiting client decision</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Won This Month</p>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(totalAccepted / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Value of accepted quotes</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acceptance Rate</p>
              <Percent size={16} className="text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{acceptanceRate}%</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Historically across all regions</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Quote Value</p>
              <DollarSign size={16} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">$64.5k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Based on recent 90 days</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by quote ID, title, or company..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none hover:border-slate-300 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Draft</option>
              <option>Sent</option>
              <option>Accepted</option>
              <option>Rejected</option>
              <option>Expired</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* QUOTATIONS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Quote Details</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Value (USD)</th>
                  <th className="px-6 py-4">Status & Timeline</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-800 text-sm">{quote.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{quote.id}</span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase">{quote.region}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Briefcase size={12} className="text-slate-400" />
                          {quote.company}
                        </div>
                        <div className="text-[10px] text-slate-500 ml-4">{quote.contactName}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-800">
                        ${quote.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(quote.status)}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <span className="w-10 inline-block font-medium">Issued:</span> {quote.issueDate}
                          </div>
                          <div className={`flex items-center gap-1.5 text-[10px] ${quote.status === 'Expired' ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                            <span className="w-10 inline-block font-medium">Expires:</span> {quote.expiryDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View PDF">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Download">
                          <Download size={18} />
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
              Showing <span className="text-slate-800 font-bold">{filteredQuotes.length}</span> of {QUOTES.length} quotes
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