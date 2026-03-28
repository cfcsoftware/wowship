"use client";

import React, { useState, useMemo } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  FileText, 
  Building2, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Calendar,
  Layers,
  Info
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const ACCOUNTS = [
  { id: "1000", name: "Operating Cash", category: "Assets", subcategory: "Current Assets", balance: 145200.50, change: 12.5, status: "Active" },
  { id: "1100", name: "Accounts Receivable", category: "Assets", subcategory: "Current Assets", balance: 84300.00, change: -2.1, status: "Active" },
  { id: "1500", name: "Warehouse Inventory", category: "Assets", subcategory: "Inventory", balance: 1240500.00, change: 4.8, status: "Active" },
  { id: "2000", name: "Accounts Payable", category: "Liabilities", subcategory: "Current Liabilities", balance: 62100.00, change: 8.4, status: "Active" },
  { id: "2100", name: "Short-term Loans", category: "Liabilities", subcategory: "Debts", balance: 250000.00, change: 0, status: "Active" },
  { id: "3000", name: "Retained Earnings", category: "Equity", subcategory: "Equity", balance: 950000.00, change: 1.2, status: "Active" },
  { id: "4000", name: "Product Sales Revenue", category: "Revenue", subcategory: "Operating Revenue", balance: 412000.00, change: 18.2, status: "Active" },
  { id: "5000", name: "Cost of Goods Sold", category: "Expenses", subcategory: "Operating Expenses", balance: 198500.00, change: 5.4, status: "Active" },
];

const RECENT_JOURNAL = [
  { id: "JE-9001", date: "2024-05-24", description: "Monthly Rent Allocation", account: "Rent Expense", debit: 4500, credit: 0, status: "Posted" },
  { id: "JE-9002", date: "2024-05-24", description: "Customer Payment - Inv #441", account: "Operating Cash", debit: 12500, credit: 0, status: "Posted" },
  { id: "JE-9003", date: "2024-05-23", description: "Inventory Purchase - TechCore", account: "Accounts Payable", debit: 0, credit: 32000, status: "Pending" },
  { id: "JE-9004", date: "2024-05-23", description: "Payroll Distribution", account: "Wages & Salaries", debit: 55000, credit: 0, status: "Posted" },
];

/* ---------------- COMPONENTS ---------------- */

export default function FinanceLedgerPage() {
  const [activeTab, setActiveTab] = useState("chart"); // 'chart' or 'journal'
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = useMemo(() => {
    return ACCOUNTS.filter(acc => 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      acc.id.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION & ACTIONS */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
              <ShieldCheck size={12} />
              Fiscal Period: Q2 2024
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Financial Ledger</h1>
            <p className="text-slate-500 text-sm font-medium">Core accounting, chart of accounts, and double-entry journal.</p>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <button 
              onClick={() => setActiveTab("chart")}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'chart' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
            >
              CHART OF ACCOUNTS
            </button>
            <button 
              onClick={() => setActiveTab("journal")}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'journal' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
            >
              JOURNAL ENTRIES
            </button>
          </div>
        </header>

        {/* FINANCIAL SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Liquidity</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2">$229,500.50</h2>
              <div className="flex items-center gap-2 mt-4 text-emerald-600 font-bold text-xs">
                <div className="p-1 bg-emerald-50 rounded-lg">
                  <TrendingUp size={14} />
                </div>
                <span>+4.2% from last month</span>
              </div>
            </div>
            <Wallet className="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:scale-110 transition-transform duration-500" size={120} />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Working Capital Ratio</p>
            <h2 className="text-3xl font-black text-slate-900 mt-2">2.4:1</h2>
            <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase">Healthy Liquidity Zone</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Close Date</p>
                <h2 className="text-3xl font-black mt-2 italic underline decoration-indigo-500 underline-offset-4">May 31</h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Calendar size={20} className="text-indigo-400" />
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
              Pre-Close Checklist
            </button>
          </div>
        </div>

        {activeTab === 'chart' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* SEARCH & FILTER BAR */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="Search by account name or code..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-slate-50 transition shadow-sm uppercase tracking-wider">
                  <Download size={14} />
                  Export
                </button>
                <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 uppercase tracking-wider">
                  <Plus size={14} />
                  New Account
                </button>
              </div>
            </div>

            {/* CHART TABLE */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Code</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Name</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">30D Trend</th>
                      <th className="px-8 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAccounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{acc.id}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">{acc.name}</span>
                            <span className="text-[10px] font-bold text-slate-400">{acc.subcategory}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              acc.category === 'Assets' ? 'bg-emerald-500' : 
                              acc.category === 'Liabilities' ? 'bg-rose-500' : 'bg-indigo-500'
                            }`} />
                            <span className="text-xs font-bold text-slate-600">{acc.category}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-black text-slate-900">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className={`flex items-center gap-1 text-[10px] font-black ${acc.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {acc.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                            {Math.abs(acc.change)}%
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* JOURNAL VIEW */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <Layers size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">General Journal</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Transaction Log • May 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider">
                    <Plus size={14} />
                    Add Journal Entry
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date / Ref</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Affected</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Debit</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Credit</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {RECENT_JOURNAL.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900">{entry.date}</span>
                            <span className="text-[10px] font-bold text-slate-400">{entry.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-slate-700">{entry.description}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                             <span className="text-xs font-black text-slate-600 italic underline decoration-indigo-200">{entry.account}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-xs font-black text-slate-900">{entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : '—'}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-xs font-black text-slate-900">{entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : '—'}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              entry.status === 'Posted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {entry.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50/50 border-t-2 border-slate-200">
                      <td colSpan={3} className="px-8 py-4 text-xs font-black text-slate-900 text-right uppercase tracking-widest">Totals:</td>
                      <td className="px-8 py-4 text-sm font-black text-slate-900 text-right">$72,000.00</td>
                      <td className="px-8 py-4 text-sm font-black text-slate-900 text-right">$32,000.00</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SECTION: ANALYTICS PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-6">
              <PieChart size={18} className="text-indigo-600" />
              Asset Allocation
            </h3>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-full border-[12px] border-indigo-600 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-[12px] border-emerald-400 rounded-full clip-path-half rotate-45" />
                 <span className="text-xs font-black text-slate-400">Fixed</span>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
                    <span className="text-xs font-bold text-slate-500">Cash & Equivalents</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
                    <span className="text-xs font-bold text-slate-500">Inventory Assets</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">38%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-200 rounded-sm" />
                    <span className="text-xs font-bold text-slate-500">Fixed Assets</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">17%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-700">
                <Info size={18} />
                <h3 className="text-sm font-black uppercase tracking-wider">Accountant's Corner</h3>
              </div>
              <p className="text-xs font-medium text-indigo-900/70 leading-relaxed">
                Your <span className="font-black text-indigo-900">Quick Ratio</span> is currently 1.8, which is well above the industry benchmark of 1.0. This indicates you can cover all short-term liabilities without selling inventory.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 bg-white text-indigo-700 border border-indigo-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors shadow-sm">
                Balance Sheet
              </button>
              <button className="flex-1 py-3 bg-white text-indigo-700 border border-indigo-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors shadow-sm">
                Profit & Loss
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}