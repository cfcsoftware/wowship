"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Activity, 
  ArrowUpRight,
  Filter,
  Download,
  Search,
  MoreHorizontal,
  Briefcase,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Calendar,
  ChevronRight,
  Printer
} from "lucide-react";

const FINANCIAL_DATA = [
  {
    id: "TRX-44921",
    entity: "Cloud Infrastructure",
    category: "Operational Expense",
    amount: -42500.00,
    status: "Cleared",
    margin: "12.4%",
    date: "Mar 18, 2024",
    allocation: "R&D",
    risk: "Low"
  },
  {
    id: "TRX-44922",
    entity: "SaaS Subscription Revenue",
    category: "Recurring Income",
    amount: 128400.00,
    status: "Reconciled",
    margin: "88.2%",
    date: "Mar 17, 2024",
    allocation: "Sales",
    risk: "Low"
  },
  {
    id: "TRX-44925",
    entity: "Global Logistics Hub",
    category: "Capital Expenditure",
    amount: -89200.50,
    status: "Pending",
    margin: "N/A",
    date: "Mar 16, 2024",
    allocation: "Ops",
    risk: "Medium"
  },
  {
    id: "TRX-44928",
    entity: "Strategic Consulting",
    category: "Professional Services",
    amount: -15000.00,
    status: "Flagged",
    margin: "5.2%",
    date: "Mar 15, 2024",
    allocation: "Admin",
    risk: "High"
  },
  {
    id: "TRX-44930",
    entity: "Enterprise License: Tier 1",
    category: "Direct Revenue",
    amount: 55000.00,
    status: "Cleared",
    margin: "92.1%",
    date: "Mar 14, 2024",
    allocation: "Sales",
    risk: "Low"
  }
];

export default function FinancialReport() {
  const [activeTab, setActiveTab] = useState("All Ledger");

  const formatCurrency = (val) => {
    const isNeg = val < 0;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(val));
    return isNeg ? `(${formatted})` : formatted;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "text-rose-600 bg-rose-50 border-rose-100";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-emerald-600 bg-emerald-50 border-emerald-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
              <Briefcase className="text-indigo-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Fiscal Oversight</h1>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                <span>FY2024 Q1</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>Audited Report</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
              <Printer size={18} />
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white text-slate-700 font-bold text-sm border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-all">
              <Download size={18} />
              Export PDF
            </button>
            <button className="px-6 py-3 bg-slate-900 text-white font-black text-sm rounded-xl hover:bg-slate-800 shadow-lg transition-all active:scale-95">
              Initiate Transfer
            </button>
          </div>
        </div>

        {/* Financial Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Net Cash Flow", value: "$1.42M", trend: "+8.4%", icon: DollarSign, color: "text-indigo-600" },
            { label: "Burn Rate", value: "$280K/mo", trend: "-12.1%", icon: Activity, color: "text-rose-500" },
            { label: "Gross Margin", value: "68.4%", trend: "+2.3%", icon: PieChart, color: "text-emerald-500" },
            { label: "Compliance Score", value: "99.8%", trend: "Stable", icon: ShieldCheck, color: "text-blue-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-tight">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Ledger Table Section */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/50 p-2 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-1 p-1 bg-slate-200/50 rounded-xl w-fit">
              {["All Ledger", "Inflows", "Outflows", "Audits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${
                    activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pr-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter by Entity..." 
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-100 outline-none w-64"
                />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 shadow-sm">
                <Calendar size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="pl-10 pr-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Transaction Entity</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Category</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Gross Amount</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Margin</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Risk Index</th>
                    <th className="pl-4 pr-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FINANCIAL_DATA.map((row) => (
                    <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="pl-10 pr-4 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800">{row.entity}</span>
                          <span className="text-[10px] font-bold text-slate-400 mt-0.5">{row.id} • {row.date}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${row.amount > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          <span className="text-xs font-bold text-slate-600">{row.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5 font-mono text-sm font-black tracking-tight">
                        <span className={row.amount > 0 ? "text-emerald-600" : "text-rose-600"}>
                          {formatCurrency(row.amount)}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-xs font-bold text-slate-700">{row.margin}</span>
                      </td>
                      <td className="px-4 py-5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${getRiskColor(row.risk)}`}>
                          {row.risk}
                        </span>
                      </td>
                      <td className="pl-4 pr-10 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            row.status === 'Flagged' ? 'text-rose-500' : 
                            row.status === 'Pending' ? 'text-amber-500' : 'text-slate-400'
                          }`}>
                            {row.status}
                          </span>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table Action Footer */}
            <div className="px-10 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-black">AD</div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400">Auditors currently reviewing this ledger</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"><ChevronRight size={18} className="rotate-180" /></button>
                <div className="flex gap-1 mx-2">
                  {[1,2,3].map(n => (
                    <button key={n} className={`w-8 h-8 rounded-lg text-xs font-black ${n === 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-black mb-2">Automated Tax Accrual</h3>
                <p className="text-indigo-100 text-sm font-medium max-w-xs">Your estimated tax liability for this quarter is calculated at 22.4% of net adjusted income.</p>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-1">Projected Liability</p>
                  <p className="text-4xl font-black">$312,040.00</p>
                </div>
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-50 transition-colors shadow-lg">
                  RESERVE FUNDS
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <ShieldCheck size={140} />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Compliance Alerts
            </h3>
            <div className="space-y-4">
              {[
                { title: "Missing Receipt: TRX-44928", detail: "Transaction exceeds $10k policy limit.", type: "urgent" },
                { title: "Audit Window Closing", detail: "Monthly reconciliation due in 48 hours.", type: "info" }
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 group hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className={`mt-1 w-2 h-2 rounded-full ${alert.type === 'urgent' ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`} />
                  <div>
                    <p className="text-sm font-black text-slate-800">{alert.title}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{alert.detail}</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-slate-900" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}