"use client";

import React from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Filter, 
  DollarSign, 
  Zap, 
  PieChart, 
  ChevronRight,
  Target,
  FileText,
  Activity,
  Eye,
  MoreHorizontal
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const PERFORMANCE_METRICS = [
  { label: "Total Revenue", value: "$842,500", growth: "+14.2%", positive: true, icon: <DollarSign size={18}/> },
  { label: "Cost of Goods", value: "$210,400", growth: "-2.1%", positive: true, icon: <Zap size={18}/> },
  { label: "Gross Profit", value: "$632,100", growth: "+18.5%", positive: true, icon: <Target size={18}/> },
  { label: "Net Income", value: "$184,200", growth: "+9.8%", positive: true, icon: <Activity size={18}/> },
];

const EXPENSE_BREAKDOWN = [
  { category: "Personnel & Payroll", amount: 142000, percentage: 45, color: "bg-indigo-500" },
  { category: "Marketing & Growth", amount: 68000, percentage: 22, color: "bg-blue-400" },
  { category: "Infrastructure & SaaS", amount: 52000, percentage: 17, color: "bg-slate-800" },
  { category: "General & Admin", amount: 48500, percentage: 16, color: "bg-slate-300" },
];

const MONTHLY_PL_RECORDS = [
  { month: "March 2026", revenue: 284000, expenses: 192000, profit: 92000, margin: "32.4%", status: "Open" },
  { month: "February 2026", revenue: 265000, expenses: 184000, profit: 81000, margin: "30.5%", status: "Closed" },
  { month: "January 2026", revenue: 293500, expenses: 202000, profit: 91500, margin: "31.1%", status: "Closed" },
  { month: "December 2023", revenue: 310000, expenses: 215000, profit: 95000, margin: "30.6%", status: "Closed" },
];

export default function ProfitLossPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              Profit & Loss <TrendingUp className="text-emerald-500" size={32} />
            </h1>
            <p className="text-slate-500 text-sm font-semibold tracking-wide italic uppercase">Income Statement • Fiscal Year 2026</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm uppercase tracking-wider">
              <Filter size={16} />
              Monthly View
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-bold hover:bg-black transition shadow-lg uppercase tracking-widest">
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>

        {/* TOP LEVEL PERFORMANCE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCE_METRICS.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                     {m.icon}
                   </div>
                   <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${m.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                     {m.growth}
                   </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{m.label}</p>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{m.value}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN BODY: EXPENSES VS BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* EXPENSE FOCUS */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Operating Costs</h3>
              <PieChart size={20} className="text-slate-300" />
            </div>

            <div className="space-y-6">
              {EXPENSE_BREAKDOWN.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{exp.category}</span>
                    <span className="text-sm font-black text-slate-900">${(exp.amount / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full flex">
                    <div 
                      className={`h-full rounded-full ${exp.color} transition-all duration-1000`} 
                      style={{ width: `${exp.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
               <div className="flex items-center justify-between mb-4">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Efficiency Score</p>
                 <p className="text-sm font-black text-emerald-500 italic">Excellent (0.84)</p>
               </div>
               <button className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                 Review All Payables
               </button>
            </div>
          </div>

          {/* INCOME LOG */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Income Statement History</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                <span className="w-3 h-3 bg-slate-200 rounded-full"></span>
              </div>
            </div>
            
            <div className="flex-grow overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Month</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Revenue</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profit</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Margin</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MONTHLY_PL_RECORDS.map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/80 transition-all">
                      <td className="px-8 py-6">
                        <div className="text-sm font-black text-slate-900">{row.month}</div>
                        <div className={`text-[9px] font-bold uppercase tracking-wider ${row.status === 'Open' ? 'text-indigo-500' : 'text-slate-300'}`}>
                          {row.status}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-700">${row.revenue.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-emerald-600">+${row.profit.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{row.margin}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                            <Eye size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
                          </button>
                          <button className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-slate-900 hover:border-slate-400 transition-all">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                   <Activity className="text-indigo-400" />
                 </div>
                 <div>
                   <h4 className="font-black text-sm uppercase tracking-wider">Smart Forecasting</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Next month projection: +$94,200</p>
                 </div>
               </div>
               <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                 Generate Model
               </button>
            </div>
          </div>
        </div>

        {/* BOTTOM NAV / FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100">
            <div className="space-y-1">
              <h3 className="text-2xl font-black italic tracking-tighter">Tax Projection</h3>
              <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Estimated: $42,500</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <FileText size={24} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white border border-slate-200 p-8 rounded-[2.5rem] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">EBITDA</p>
                <p className="text-xl font-black text-slate-900">$245.8k</p>
              </div>
              <div className="h-10 w-px bg-slate-100"></div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Burn Rate</p>
                <p className="text-xl font-black text-rose-500">$64.2k/mo</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] group">
              Advanced Analytics
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}