"use client";

import React, { useState } from "react";
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  MoreHorizontal, 
  Calendar, 
  Building2, 
  FileText,
  DollarSign,
  ChevronDown,
  History,
  Eye,
  ArrowLeft
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const BILLS = [
  {
    id: "BILL-2024-001",
    vendor: "TechSolutions Pro",
    date: "2024-03-15",
    dueDate: "2024-04-15",
    amount: 12450.00,
    status: "unpaid",
    match: "verified", // 3-way match: PO + Receipt + Bill
    category: "IT Hardware",
    reference: "PO-8801"
  },
  {
    id: "BILL-2024-002",
    vendor: "Modern Office Co.",
    date: "2024-03-10",
    dueDate: "2024-03-25",
    amount: 3200.50,
    status: "overdue",
    match: "warning", // Mismatch in quantity/price
    category: "Furniture",
    reference: "PO-8742"
  },
  {
    id: "BILL-2024-003",
    vendor: "Adobe Systems Inc",
    date: "2024-03-01",
    dueDate: "2024-03-31",
    amount: 899.00,
    status: "paid",
    match: "verified",
    category: "Software",
    reference: "SUB-442"
  },
  {
    id: "BILL-2024-004",
    vendor: "Global Logistics Ltd",
    date: "2024-03-18",
    dueDate: "2024-04-18",
    amount: 4500.00,
    status: "processing",
    match: "pending",
    category: "Shipping",
    reference: "PO-8910"
  },
  {
    id: "BILL-2024-005",
    vendor: "TechSolutions Pro",
    date: "2024-02-15",
    dueDate: "2024-03-15",
    amount: 5600.00,
    status: "paid",
    match: "verified",
    category: "IT Services",
    reference: "PO-8600"
  }
];

const STATUS_CONFIG = {
  paid: { bg: "bg-emerald-50 text-emerald-700", label: "Paid", dot: "bg-emerald-500" },
  unpaid: { bg: "bg-slate-100 text-slate-700", label: "Unpaid", dot: "bg-slate-400" },
  overdue: { bg: "bg-rose-50 text-rose-700", label: "Overdue", dot: "bg-rose-500" },
  processing: { bg: "bg-indigo-50 text-indigo-700", label: "Processing", dot: "bg-indigo-500" },
};

const MATCH_CONFIG = {
  verified: { icon: CheckCircle2, color: "text-emerald-500", label: "3-Way Match" },
  warning: { icon: AlertCircle, color: "text-amber-500", label: "Price Mismatch" },
  pending: { icon: Clock, color: "text-slate-300", label: "Pending GRN" },
};

export default function VendorBills() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBills = filterStatus === "all" 
    ? BILLS 
    : BILLS.filter(b => b.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* TOP NAVIGATION & ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                <Receipt className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Finance & AP</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              Vendor Bills
              <span className="text-sm font-medium bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                {BILLS.length} total
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <CreditCard size={16} />
              Batch Pay
            </button>
          </div>
        </div>

        {/* AGING SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Outstanding", val: "$20,150.50", sub: "12 Pending Bills", color: "text-slate-900" },
            { label: "Overdue (>30 Days)", val: "$3,200.50", sub: "Action Required", color: "text-rose-600" },
            { label: "Paid (This Month)", val: "$6,499.00", sub: "8 Transactions", color: "text-emerald-600" },
            { label: "Avg. Days to Pay", val: "14 Days", sub: "+2 from last month", color: "text-indigo-600" },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{card.label}</p>
              <p className={`text-2xl font-black ${card.color}`}>{card.val}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Controls */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search vendor, bill ID, or PO reference..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>
            <div className="flex items-center gap-2">
               {['all', 'unpaid', 'overdue', 'paid'].map((status) => (
                 <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                    filterStatus === status 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                 >
                   {status}
                 </button>
               ))}
            </div>
          </div>

          {/* Actual Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor & Ref</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Reconciliation</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{bill.vendor}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-indigo-500">{bill.id}</span>
                            <span className="text-[10px] font-medium text-slate-400">• {bill.reference}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-bold text-slate-600">{bill.date}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <p className={`text-xs font-bold ${bill.status === 'overdue' ? 'text-rose-600' : 'text-slate-600'}`}>
                          {bill.dueDate}
                        </p>
                        {bill.status === 'overdue' && (
                          <span className="text-[9px] font-black text-rose-400 uppercase tracking-tighter">15 Days Past</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-slate-900">${bill.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${STATUS_CONFIG[bill.status].bg}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[bill.status].dot}`} />
                        {STATUS_CONFIG[bill.status].label}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1">
                        {React.createElement(MATCH_CONFIG[bill.match].icon, { 
                          size: 16, 
                          className: MATCH_CONFIG[bill.match].color 
                        })}
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          {MATCH_CONFIG[bill.match].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedBill(bill)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BILL SIDEBAR DETAIL VIEW */}
      {selectedBill && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedBill(null)} />
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => setSelectedBill(null)}
                className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={16} /> Close
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><Download size={18} /></button>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><MoreHorizontal size={18} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Main Bill Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_CONFIG[selectedBill.status].bg}`}>
                    {STATUS_CONFIG[selectedBill.status].label}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedBill.id}</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Vendor: {selectedBill.vendor}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-right">Amount Due</p>
                  <p className="text-3xl font-black text-slate-900">${selectedBill.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Issue Date</p>
                  <p className="text-sm font-bold text-slate-800">{selectedBill.date}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Payment Terms</p>
                  <p className="text-sm font-bold text-slate-800 tracking-tight">Net 30 (Next Month)</p>
                </div>
              </div>

              {/* Three Way Match Visualizer */}
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <CheckCircle2 size={14} /> Verification Check
                </h4>
                <div className="flex items-center justify-between p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Receipt size={80} className="text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-100">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">PO</span>
                    </div>
                    <div className="h-px w-8 bg-indigo-200" />
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${selectedBill.match === 'warning' ? 'bg-amber-500 text-white shadow-amber-100' : 'bg-emerald-500 text-white shadow-emerald-100'}`}>
                        {selectedBill.match === 'warning' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">GRN</span>
                    </div>
                    <div className="h-px w-8 bg-indigo-200" />
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
                        <Receipt size={16} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">Bill</span>
                    </div>
                  </div>
                  <div className="text-right relative z-10">
                    <p className={`text-xs font-black uppercase tracking-tight ${selectedBill.match === 'warning' ? 'text-amber-600' : 'text-indigo-600'}`}>
                      {selectedBill.match === 'warning' ? 'Audit Flagged' : 'Auto-Matched'}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 tracking-tighter">System confidence: 98%</p>
                  </div>
                </div>
              </div>

              {/* Line Items Mock */}
              <div className="space-y-4 pt-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bill Breakdown</h4>
                 <div className="space-y-2">
                    {[1, 2].map(i => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50">
                        <div>
                          <p className="text-xs font-bold text-slate-800">SKU-990{i} • Premium Asset Package</p>
                          <p className="text-[10px] text-slate-400 font-medium">Qty: 2 @ $6,225.00 each</p>
                        </div>
                        <p className="text-sm font-black text-slate-900">$12,450.00</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Sidebar Footer Actions */}
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
               <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                Pay This Bill
              </button>
              <button className="px-6 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest">
                Dispute
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}