"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  MoreVertical,
  DollarSign,
  ArrowRight,
  Mail,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const INCOME_DATA = [
  { id: "INV-2024-501", customer: "Aether Dynamics", date: "2024-05-24", amount: 12500.00, status: "Paid", category: "Service Contract", method: "Bank Transfer" },
  { id: "INV-2024-502", customer: "Nova Retail Group", date: "2024-05-24", amount: 8420.50, status: "Paid", category: "Product Sale", method: "Credit Card" },
  { id: "INV-2024-503", customer: "Stellar Solutions", date: "2024-05-23", amount: 15000.00, status: "Pending", category: "Consulting", method: "ACH" },
  { id: "INV-2024-504", customer: "CloudNine Systems", date: "2024-05-22", amount: 2100.00, status: "Overdue", category: "Software Licensing", method: "Pending" },
  { id: "INV-2024-505", customer: "Zenith Holdings", date: "2024-05-21", amount: 45000.00, status: "Paid", category: "Annual Subscription", method: "Wire" },
  { id: "INV-2024-506", customer: "Blue Horizon Co", date: "2024-05-20", amount: 3200.00, status: "Partial", category: "Service Contract", method: "Mixed" },
  { id: "INV-2024-507", customer: "Apex Logistics", date: "2024-05-19", amount: 1240.00, status: "Paid", category: "Overage Fees", method: "Credit Card" },
];

const SUMMARY_STATS = [
  { label: "Total Revenue", value: "$87,460.50", change: "+12.5%", positive: true },
  { label: "Avg. Ticket Size", value: "$12,494.35", change: "+2.1%", positive: true },
  { label: "Pending Collection", value: "$17,100.00", change: "-4.3%", positive: false },
];

export default function IncomeListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredIncome = useMemo(() => {
    return INCOME_DATA.filter(item => {
      const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || item.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-10 font-sans text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-black">Revenue Stream</h1>
            <p className="text-slate-700 text-sm font-bold">Comprehensive tracking of organization income and receivables.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-300 rounded-2xl text-xs font-black text-black hover:bg-slate-50 transition shadow-sm uppercase tracking-wider">
              <FileSpreadsheet size={16} className="text-emerald-600" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-xl shadow-slate-300 uppercase tracking-widest">
              <Plus size={18} />
              New Invoice
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUMMARY_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border-2 border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-black transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</span>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${stat.positive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-black tracking-tighter">{stat.value}</div>
              <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${stat.positive ? 'bg-emerald-600 w-3/4' : 'bg-rose-600 w-1/4'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* LIST SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex p-1.5 bg-slate-200 rounded-2xl w-fit border border-slate-300">
              {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={16} />
                <input 
                  type="text"
                  placeholder="Search customer or ID..."
                  className="pl-12 pr-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-xs font-black text-black focus:ring-4 focus:ring-black/5 focus:border-black outline-none w-72 transition-all placeholder:text-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-3 bg-white border-2 border-slate-300 rounded-xl text-black hover:bg-black hover:text-white transition-all">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest">ID & Date</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest">Method</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest text-right">Amount</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-6 text-[11px] font-black text-black uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100">
                  {filteredIncome.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 ${
                            item.status === 'Paid' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 
                            item.status === 'Overdue' ? 'bg-rose-100 border-rose-200 text-rose-800' : 'bg-amber-100 border-amber-200 text-amber-800'
                          }`}>
                            <DollarSign size={20} strokeWidth={3} />
                          </div>
                          <div>
                            <span className="block text-sm font-black text-black leading-tight uppercase tracking-tight">{item.id}</span>
                            <span className="text-[10px] font-black text-slate-600">{item.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">
                            {item.customer.charAt(0)}
                          </div>
                          <span className="text-sm font-black text-black">{item.customer}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[11px] font-black text-black bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-black">
                          <CreditCard size={14} strokeWidth={3} />
                          <span className="text-xs font-black uppercase tracking-tighter">{item.method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-base font-black text-black tabular-nums">${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          <span className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border-2 ${
                            item.status === 'Paid' ? 'bg-emerald-600 text-white border-emerald-700' : 
                            item.status === 'Overdue' ? 'bg-rose-600 text-white border-rose-700' :
                            item.status === 'Partial' ? 'bg-indigo-600 text-white border-indigo-700' :
                            'bg-amber-500 text-white border-amber-600'
                          }`}>
                            {item.status === 'Paid' && <CheckCircle2 size={12} strokeWidth={3} />}
                            {item.status === 'Pending' && <Clock size={12} strokeWidth={3} />}
                            {item.status === 'Overdue' && <AlertTriangle size={12} strokeWidth={3} />}
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-2.5 bg-white border-2 border-slate-200 text-black hover:bg-black hover:border-black hover:text-white rounded-xl transition-all shadow-sm flex items-center gap-2 group/btn"
                            title="Email Invoice"
                          >
                            <Mail size={16} strokeWidth={2.5} />
                          </button>
                          <button 
                            className="p-2.5 bg-white border-2 border-slate-200 text-black hover:bg-slate-100 rounded-xl transition-all shadow-sm"
                          >
                            <MoreVertical size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-8 py-6 bg-slate-100 border-t-2 border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-black text-black uppercase tracking-widest">
                Showing {filteredIncome.length} Revenue Records
              </span>
              <div className="flex items-center gap-3">
                <button className="p-2 bg-white border border-slate-300 rounded-lg text-black hover:bg-black hover:text-white transition-colors">
                  <ChevronLeft size={20} strokeWidth={3} />
                </button>
                <button className="p-2 bg-white border border-slate-300 rounded-lg text-black hover:bg-black hover:text-white transition-colors">
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-4 border-black rounded-[2.5rem] p-8 text-black flex items-center justify-between group cursor-pointer hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5">
            <div className="space-y-1">
              <h3 className="text-2xl font-black italic tracking-tighter">Growth Analytics</h3>
              <p className="font-bold text-xs uppercase tracking-widest opacity-70">Deep dive into sales trends</p>
            </div>
            <div className="w-14 h-14 bg-black/5 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
              <TrendingUp size={28} strokeWidth={3} />
            </div>
          </div>
          <div className="bg-black rounded-[2.5rem] p-8 text-white flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-all shadow-xl">
            <div className="space-y-1">
              <h3 className="text-2xl font-black italic tracking-tighter text-emerald-400">Recurring Billing</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">12 automated subscriptions active</p>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowRight size={28} strokeWidth={3} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}