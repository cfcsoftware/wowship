"use client";

import React, { useState, useMemo } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpDown,
  Hash,
  User,
  ExternalLink,
  Printer,
  ChevronLeft,
  ChevronRight,
  FilterX
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const JOURNAL_ENTRIES = [
  { id: "JE-2024-001", date: "2024-05-24", reference: "INV-8829", description: "Office Lease Payment - June", creator: "Sarah Chen", status: "Posted", totalDebit: 12500, totalCredit: 12500, type: "Standard" },
  { id: "JE-2024-002", date: "2024-05-24", reference: "PAY-0012", description: "Bi-weekly Payroll Distribution", creator: "Mike Ross", status: "Pending", totalDebit: 48200, totalCredit: 48200, type: "Payroll" },
  { id: "JE-2024-003", date: "2024-05-23", reference: "DEP-991", description: "Customer Payment: TechFlow Corp", creator: "Sarah Chen", status: "Posted", totalDebit: 15000, totalCredit: 15000, type: "Receipt" },
  { id: "JE-2024-004", date: "2024-05-23", reference: "ADJ-004", description: "Depreciation Adjustment: HQ Equipment", creator: "Audit Bot", status: "Draft", totalDebit: 2100, totalCredit: 2100, type: "Adjustment" },
  { id: "JE-2024-005", date: "2024-05-22", reference: "PUR-441", description: "Inventory Purchase: Raw Silicon", creator: "David Miller", status: "Posted", totalDebit: 89000, totalCredit: 89000, type: "Purchase" },
  { id: "JE-2024-006", date: "2024-05-22", reference: "TAX-Q2", description: "Estimated Sales Tax Provision", creator: "Sarah Chen", status: "Pending", totalDebit: 12400, totalCredit: 12400, type: "Tax" },
  { id: "JE-2024-007", date: "2024-05-21", reference: "RFD-012", description: "Customer Refund: Order #8812", creator: "Mike Ross", status: "Posted", totalDebit: 450, totalCredit: 450, type: "Standard" },
];

export default function JournalEntriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredEntries = useMemo(() => {
    return JOURNAL_ENTRIES.filter(entry => {
      const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || entry.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <FileText size={20} />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Journal Entries</h1>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest ml-11">
              General Ledger Activity • Fiscal Year 2024
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition shadow-sm uppercase">
              <Download size={14} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 uppercase tracking-widest">
              <Plus size={16} />
              New Journal Entry
            </button>
          </div>
        </div>

        {/* CONTROLS & FILTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by ID, Ref, or Description..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="lg:col-span-6 flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {['All', 'Posted', 'Pending', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  statusFilter === status 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-slate-600">
                      ID / Date <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Creator</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Debit / Credit</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{entry.id}</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <Calendar size={10} />
                          {entry.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        <Hash size={12} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-600">{entry.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 leading-tight">{entry.description}</span>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">{entry.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <User size={12} className="text-slate-500" />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{entry.creator}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-slate-900">${entry.totalDebit.toLocaleString()}</span>
                        <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                          Balanced
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          entry.status === 'Posted' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : entry.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {entry.status === 'Posted' && <CheckCircle2 size={10} />}
                          {entry.status === 'Pending' && <Clock size={10} />}
                          {entry.status === 'Draft' && <AlertCircle size={10} />}
                          {entry.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                          <ExternalLink size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all shadow-sm">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="bg-slate-50/50 px-8 py-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Showing <span className="text-slate-900">{filteredEntries.length}</span> of <span className="text-slate-900">{JOURNAL_ENTRIES.length}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors shadow-sm disabled:opacity-50">
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-xl bg-slate-900 text-white text-[10px] font-black">1</button>
                <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 text-[10px] font-black hover:bg-slate-50 transition-colors">2</button>
                <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 text-[10px] font-black hover:bg-slate-50 transition-colors">3</button>
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-700/60 uppercase tracking-widest">Audit Status</p>
              <h4 className="text-sm font-black text-emerald-900 italic">Fully Reconciled</h4>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
              <Printer size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-700/60 uppercase tracking-widest">Batch Actions</p>
              <h4 className="text-sm font-black text-indigo-900 italic underline decoration-indigo-300">Print Day Log</h4>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Entries</p>
              <p className="text-xs font-bold text-slate-600">No items selected</p>
            </div>
            <button className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase cursor-not-allowed">
              Bulk Post
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}