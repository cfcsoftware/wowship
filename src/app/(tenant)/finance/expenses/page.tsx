"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Plus, 
  Receipt, 
  CreditCard,
  ArrowRight,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Zap,
  Coffee,
  ShieldCheck,
  MoreVertical
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const EXPENSE_DATA = [
  { id: "EXP-8801", vendor: "Amazon Web Services", date: "2024-05-25", amount: 1450.00, status: "Cleared", category: "Infrastructure", method: "Auto-Pay" },
  { id: "EXP-8802", vendor: "WeWork Global", date: "2024-05-24", amount: 3200.00, status: "Cleared", category: "Rent", method: "Wire Transfer" },
  { id: "EXP-8803", vendor: "Adobe Creative Cloud", date: "2024-05-23", amount: 52.99, status: "Pending", category: "Software", method: "Credit Card" },
  { id: "EXP-8804", vendor: "Stripe Fees", date: "2024-05-22", amount: 210.45, status: "Cleared", category: "Financial", method: "Deducted" },
  { id: "EXP-8805", vendor: "Apple Inc.", date: "2024-05-21", amount: 2499.00, status: "Flagged", category: "Hardware", method: "Corporate Card" },
  { id: "EXP-8806", vendor: "Google Ads", date: "2024-05-20", amount: 1100.00, status: "Cleared", category: "Marketing", method: "Credit Card" },
  { id: "EXP-8807", vendor: "Local Coffee Co", date: "2024-05-19", amount: 45.20, status: "Cleared", category: "Meals", method: "Petty Cash" },
];

const EXPENSE_STATS = [
  { label: "Total Outflow", value: "$8,557.64", change: "+5.2%", positive: false, progress: 65 },
  { label: "Pending Approval", value: "$3,120.00", change: "-12%", positive: true, progress: 20 },
  { label: "Operational Burn", value: "$5,200.00", change: "+1.1%", positive: false, progress: 88 },
];

export default function ExpenseListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredExpenses = useMemo(() => {
    return EXPENSE_DATA.filter(item => {
      const matchesSearch = item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || item.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              Expenditure <TrendingDown className="text-rose-500" size={32} />
            </h1>
            <p className="text-slate-500 text-sm font-semibold tracking-wide">Monitor spending, manage vendors, and approve corporate outflows.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm uppercase tracking-wider">
              <FileText size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-2xl text-[11px] font-bold hover:bg-rose-600 transition shadow-lg shadow-rose-100 uppercase tracking-widest">
              <Plus size={18} />
              Log Expense
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPENSE_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-rose-400 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.positive ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</div>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                  <span>Budget Utilized</span>
                  <span>{stat.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${stat.progress > 80 ? 'bg-rose-500' : 'bg-slate-800'}`} 
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIST SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit border border-slate-200">
              {['All', 'Cleared', 'Pending', 'Flagged'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search vendor or ref..."
                  className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400 outline-none w-72 transition-all placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Expense Ref</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Vendor</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Payment</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-slate-100 bg-slate-50 text-slate-600 shadow-sm">
                            <Receipt size={18} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-800 leading-tight uppercase tracking-tight">{item.id}</span>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">{item.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-700">{item.vendor}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">
                            {item.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-500">
                          <CreditCard size={14} />
                          <span className="text-xs font-semibold uppercase tracking-tighter">{item.method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-base font-bold text-slate-900 tabular-nums">-${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex justify-center">
                          <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${
                            item.status === 'Cleared' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 
                            item.status === 'Flagged' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 rounded-xl transition-all shadow-sm">
                            <Eye size={16} />
                          </button>
                          <button className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 rounded-xl transition-all shadow-sm">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Showing {filteredExpenses.length} Outgoing Entries
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-colors shadow-sm">
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-colors shadow-sm">
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-slate-700 flex items-center justify-between group cursor-pointer hover:border-slate-400 transition-all shadow-sm">
            <div className="space-y-1">
              <h3 className="text-2xl font-black italic tracking-tighter text-slate-800">Budget Limits</h3>
              <p className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Set department-level caps</p>
            </div>
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 transition-all group-hover:bg-slate-800 group-hover:text-white shadow-inner">
              <ShieldCheck size={28} />
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-rose-100/50 transition-all">
            <div className="space-y-1">
              <h3 className="text-2xl font-black italic tracking-tighter text-rose-500">Audit Vault</h3>
              <p className="text-rose-400 text-[10px] font-bold uppercase tracking-widest">Fiscal archives</p>
            </div>
            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
              <ArrowRight size={28} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}