"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart, 
  Globe, 
  Shield, 
  Building2, 
  Download,
  Calendar,
  MoreHorizontal,
  Wallet,
  Briefcase,
  History,
  TrendingUp,
  Layers,
  ChevronRight
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const ASSET_CATEGORIES = [
  { id: "A1", category: "Cash & Equivalents", value: 1254000.00, change: "+12.4%", trend: "up", color: "bg-emerald-500" },
  { id: "A2", category: "Accounts Receivable", value: 840200.00, change: "-2.1%", trend: "down", color: "bg-blue-500" },
  { id: "A3", category: "Marketable Securities", value: 2100500.00, change: "+4.5%", trend: "up", color: "bg-indigo-500" },
  { id: "A4", category: "Inventory Assets", value: 450000.00, change: "0.0%", trend: "neutral", color: "bg-slate-400" },
];

const BALANCE_RECORDS = [
  { id: "BS-Q1-24", period: "Q1 FY2026", totalAssets: 4644700.00, totalLiabilities: 1820000.00, equity: 2824700.00, ratio: "2.55", status: "Audited" },
  { id: "BS-Q4-23", period: "Q4 FY2025", totalAssets: 4210000.00, totalLiabilities: 1950000.00, equity: 2260000.00, ratio: "2.16", status: "Audited" },
  { id: "BS-Q3-23", period: "Q3 FY2023", totalAssets: 3850000.00, totalLiabilities: 2100000.00, equity: 1750000.00, ratio: "1.83", status: "Archived" },
  { id: "BS-Q2-23", period: "Q2 FY2023", totalAssets: 3920000.00, totalLiabilities: 2400000.00, equity: 1520000.00, ratio: "1.63", status: "Archived" },
];

export default function BalanceSheetPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Q1 FY2024");

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              Balance Sheet <BarChart3 className="text-indigo-500" size={32} />
            </h1>
            <p className="text-slate-500 text-sm font-semibold tracking-wide italic">Financial position and shareholder equity for {selectedPeriod}.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm uppercase tracking-wider">
                <Calendar size={16} className="text-slate-400" />
                Select Period
              </button>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[11px] font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 uppercase tracking-widest">
              <Download size={18} />
              Finalize Sheet
            </button>
          </div>
        </div>

        {/* TOP LEVEL METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Layers size={14} /> Total Assets
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">$4,644,700</div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">+10.3% vs LY</div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Shield size={14} /> Liabilities
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">$1,820,000</div>
            <div className="text-[10px] font-bold text-rose-600 bg-rose-50 w-fit px-2 py-0.5 rounded-md">-6.7% vs LY</div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Briefcase size={14} /> Net Equity
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">$2,824,700</div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">+24.9% vs LY</div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <TrendingUp size={14} /> Liquidity Ratio
            </div>
            <div className="text-3xl font-black text-white tracking-tighter">2.55</div>
            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest underline decoration-indigo-500/50">Optimal Health</div>
          </div>
        </div>

        {/* MAIN ANALYSIS CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: ASSET ALLOCATION */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Asset Distribution</h3>
                <PieChart size={20} className="text-slate-300" />
              </div>

              <div className="space-y-5">
                {ASSET_CATEGORIES.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.category}</span>
                      <span className="text-sm font-black text-slate-800">${(item.value / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${(item.value / 4644700) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 mt-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                Full Valuation Report
              </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-indigo-100/50 transition-all">
              <div className="space-y-1">
                <h3 className="text-2xl font-black italic tracking-tighter text-indigo-600">Offshore Holdings</h3>
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Globe size={12} /> Managed Entities
                </p>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>

          {/* RIGHT: HISTORICAL RECORDS TABLE */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Historical Statements</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance-Verified Records</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <History size={20} />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Period</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assets</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Liabilities</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Equity</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {BALANCE_RECORDS.map((record) => (
                      <tr key={record.id} className="group hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-slate-800 uppercase">{record.period}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-700">${(record.totalAssets / 1000000).toFixed(2)}M</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-700 text-rose-500">${(record.totalLiabilities / 1000000).toFixed(2)}M</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-emerald-600">${(record.equity / 1000000).toFixed(2)}M</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            record.status === 'Audited' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-[2rem] flex items-center gap-4 shadow-sm group cursor-pointer hover:border-slate-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <Wallet size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Debt Structure</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">View amortized liabilities</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-[2rem] flex items-center gap-4 shadow-sm group cursor-pointer hover:border-slate-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Cap Table</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Shareholder distribution</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}