"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  SlidersHorizontal, 
  Download, 
  Plus, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  CreditCard,
  Wallet,
  Building2,
  X
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const TRANSACTIONS = [
  { id: "TRX-48291", date: "Oct 24, 2023", entity: "Adobe Systems", category: "Software", amount: -249.00, status: "completed", method: "Visa ••42" },
  { id: "TRX-48290", date: "Oct 23, 2023", entity: "Marriott International", category: "Travel", amount: -1240.50, status: "pending", method: "Mastercard ••11" },
  { id: "TRX-48289", date: "Oct 23, 2023", entity: "Stripe Payout", category: "Revenue", amount: 14200.00, status: "completed", method: "Bank Transfer" },
  { id: "TRX-48288", date: "Oct 22, 2023", entity: "Amazon Web Services", category: "Hosting", amount: -840.12, status: "completed", method: "Visa ••42" },
  { id: "TRX-48287", date: "Oct 21, 2023", entity: "Uber Technologies", category: "Transport", amount: -42.20, status: "failed", method: "Visa ••42" },
  { id: "TRX-48286", date: "Oct 21, 2023", entity: "Client Deposit: ACME Corp", category: "Revenue", amount: 5000.00, status: "completed", method: "Wire" },
  { id: "TRX-48285", date: "Oct 20, 2023", entity: "Figma Subscription", category: "Software", amount: -15.00, status: "completed", method: "Visa ••42" },
  { id: "TRX-48284", date: "Oct 19, 2023", entity: "Starbucks Coffee", category: "Meals", amount: -12.45, status: "completed", method: "Apple Pay" },
];

const STATUS_CONFIG = {
  completed: { color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
  pending: { color: "text-amber-600 bg-amber-50", icon: Clock },
  failed: { color: "text-rose-600 bg-rose-50", icon: AlertCircle },
};

export default function TransactionsPage() {
  const [selectedTx, setSelectedTx] = useState(null);
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* MAIN CONTENT */}
      <div className={`flex-1 p-6 md:p-10 transition-all ${selectedTx ? 'mr-[400px]' : ''}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Transactions Ledger</h1>
              <p className="text-sm font-medium text-slate-500">Managing all incoming and outgoing business capital.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                <Download size={16} />
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Plus size={18} />
                New Transaction
              </button>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
            {['all', 'completed', 'pending', 'failed'].map((s) => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === s 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 px-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Find a transaction..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-200 w-48 md:w-64"
                />
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* TRANSACTIONS TABLE */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left w-12">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Entity / Account</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Method</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Status</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TRANSACTIONS.filter(tx => filter === 'all' || tx.status === filter).map((tx) => (
                  <tr 
                    key={tx.id} 
                    onClick={() => setSelectedTx(tx)}
                    className={`group cursor-pointer hover:bg-slate-50 transition-colors ${selectedTx?.id === tx.id ? 'bg-blue-50/50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{tx.entity}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{tx.date} • {tx.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-black uppercase text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md tracking-wider">{tx.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        {tx.method.includes('Visa') ? <CreditCard size={14} /> : <Building2 size={14} />}
                        {tx.method}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const Config = STATUS_CONFIG[tx.status];
                        return (
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${Config.color}`}>
                            <Config.icon size={12} strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-wider">{tx.status}</span>
                          </div>
                        )
                      })()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-slate-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Showing 8 of 1,242 entries</span>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex px-2 gap-1">
                  {[1, 2, 3].map(n => (
                    <button key={n} className={`w-8 h-8 rounded-lg text-xs font-black ${n === 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400'}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LOOK SIDE PANEL */}
      {selectedTx && (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-slate-200 shadow-2xl z-50 animate-in slide-in-from-right duration-300">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-lg font-black tracking-tight">Transaction Detail</h2>
              <button 
                onClick={() => setSelectedTx(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2">
              {/* LARGE AMOUNT HEADER */}
              <div className="text-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${selectedTx.amount > 0 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-900 text-white shadow-lg shadow-slate-200'}`}>
                  {selectedTx.amount > 0 ? <ArrowDownLeft size={28} /> : <ArrowUpRight size={28} />}
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-1">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedTx.amount)}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedTx.entity}</p>
              </div>

              {/* DATA POINTS */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-slate-700">{selectedTx.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-black text-slate-900 capitalize">{selectedTx.status}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Category</p>
                    <p className="text-sm font-bold text-slate-700">{selectedTx.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Method</p>
                    <p className="text-sm font-bold text-slate-700">{selectedTx.method}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Transaction ID</p>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <code className="text-xs font-bold text-slate-500">{selectedTx.id}</code>
                    <button className="text-[10px] font-black text-blue-600 uppercase">Copy</button>
                  </div>
                </div>

                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet size={16} className="text-blue-600" />
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">Financial Impact</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    This {selectedTx.amount > 0 ? 'deposit' : 'expense'} will be reflected in your {selectedTx.date.split(',')[1]} tax report under the {selectedTx.category} category.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-8 border-t border-slate-100 space-y-3">
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-100">
                Download Receipt
              </button>
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50">
                Flag Discrepancy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}