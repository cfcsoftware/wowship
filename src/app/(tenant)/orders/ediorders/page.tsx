"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Briefcase,
  Calendar,
  Send,
  Printer,
  TrendingUp,
  Receipt
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type InvoiceStatus = "Paid" | "Unpaid" | "Overdue" | "Draft" | "Void";

interface Invoice {
  id: string;
  orderId: string;
  company: string;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const INVOICES: Invoice[] = Array.from({ length: 18 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp", "Nexus Industries"];
  const statuses: InvoiceStatus[] = ["Paid", "Paid", "Unpaid", "Overdue", "Unpaid", "Draft"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  const amount = Math.floor(Math.random() * 50000) + 1200;
  const tax = amount * 0.1; // 10% Flat tax for mock
  
  const baseDay = 20;
  const issueDay = baseDay - (i % 15);
  const dueDay = issueDay + 14;

  return {
    id: `INV-${30000 + i}`,
    orderId: `ORD-${20000 + i}`,
    company: companies[i % companies.length],
    amount: amount,
    tax: tax,
    total: amount + tax,
    status: statuses[i % statuses.length],
    issueDate: `2024-05-${issueDay.toString().padStart(2, '0')}`,
    dueDate: `2024-06-${(dueDay > 30 ? dueDay - 30 : dueDay).toString().padStart(2, '0')}`,
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: InvoiceStatus) => {
  const styles: Record<InvoiceStatus, string> = {
    "Paid": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Unpaid": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Overdue": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Draft": "bg-slate-50 text-slate-700 ring-slate-600/20",
    "Void": "bg-slate-100 text-slate-400 ring-slate-300/20",
  };
  
  const icons: Record<InvoiceStatus, React.ReactNode> = {
    "Paid": <CheckCircle2 size={10} />,
    "Unpaid": <Clock size={10} />,
    "Overdue": <AlertCircle size={10} />,
    "Draft": <FileText size={10} />,
    "Void": <XCircle size={10} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

// Placeholder for missing XCircle in imports if needed, but AlertCircle works well for Overdue.
const XCircle = ({ size }: { size: number }) => <AlertCircle size={size} className="rotate-45" />;

/* ---------------- MAIN COMPONENT ---------------- */
export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredInvoices = useMemo(() => {
    return INVOICES.filter((inv) => {
      const matchesSearch = 
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Statuses" || inv.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Financial Stats
  const totalOutstanding = INVOICES.filter(i => i.status === "Unpaid" || i.status === "Overdue").reduce((acc, curr) => acc + curr.total, 0);
  const totalOverdue = INVOICES.filter(i => i.status === "Overdue").reduce((acc, curr) => acc + curr.total, 0);
  const collectionRate = 84.2; // Mock percentage

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Receipt className="text-indigo-600" size={24} />
              Invoices & Billing
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage client billing, track payments, and follow up on overdue accounts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Printer size={16} />
              Batch Print
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <DollarSign size={16} />
              Record Payment
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Outstanding</p>
              <Clock size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(totalOutstanding / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Unpaid + Overdue</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm ring-2 ring-rose-500/10 border-rose-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Overdue Amount</p>
              <AlertCircle size={16} className="text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(totalOverdue / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-rose-500 text-[10px] font-bold">Needs immediate attention</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collection Rate</p>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{collectionRate}%</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">+2.4% from last month</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoiced (MTD)</p>
              <CreditCard size={16} className="text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">$142.8k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Month-to-date total</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Invoice #, Order #, or Company..."
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
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Overdue</option>
              <option>Draft</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* INVOICES TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Invoice Info</th>
                  <th className="px-6 py-4">Client & Region</th>
                  <th className="px-6 py-4">Amount (USD)</th>
                  <th className="px-6 py-4">Status & Due Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-800 text-sm">{inv.id}</div>
                        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          Ref: {inv.orderId}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                          <Briefcase size={14} className="text-slate-400" />
                          {inv.company}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-tight">{inv.region}</span>
                           <span className="text-[10px] text-slate-400">Issued: {inv.issueDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-800">
                          ${inv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Inc. ${(inv.tax).toLocaleString('en-US')} Tax
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(inv.status)}
                        <div className={`text-[10px] font-medium flex items-center gap-1.5 ${inv.status === 'Overdue' ? 'text-rose-600' : 'text-slate-500'}`}>
                          <Calendar size={12} />
                          Due: {inv.dueDate}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Email Reminder">
                          <Send size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Download PDF">
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
              Showing <span className="text-slate-800 font-bold">{filteredInvoices.length}</span> of {INVOICES.length} invoices
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