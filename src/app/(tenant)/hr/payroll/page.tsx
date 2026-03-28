"use client";

import React, { useState } from "react";
import { 
  DollarSign, 
  Download, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreHorizontal,
  Wallet,
  Building2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

/* ---------------- MOCK PAYROLL DATA ---------------- */
const PAYROLL_HISTORY = [
  {
    id: "PAY-2024-10-01",
    employee: "Sarah Jenkins",
    role: "Senior Product Designer",
    avatar: "SJ",
    basic: 5200,
    allowances: 1200,
    deductions: 450,
    netPay: 5950,
    status: "Paid",
    method: "Bank Transfer",
    date: "Oct 31, 2024"
  },
  {
    id: "PAY-2024-10-02",
    employee: "Marcus Chen",
    role: "Full Stack Engineer",
    avatar: "MC",
    basic: 6100,
    allowances: 800,
    deductions: 600,
    netPay: 6300,
    status: "Processing",
    method: "Bank Transfer",
    date: "Oct 31, 2024"
  },
  {
    id: "PAY-2024-10-03",
    employee: "Elena Rodriguez",
    role: "HR Manager",
    avatar: "ER",
    basic: 4800,
    allowances: 950,
    deductions: 320,
    netPay: 5430,
    status: "Paid",
    method: "Direct Deposit",
    date: "Oct 31, 2024"
  },
  {
    id: "PAY-2024-10-04",
    employee: "David Kim",
    role: "QA Lead",
    avatar: "DK",
    basic: 4500,
    allowances: 700,
    deductions: 280,
    netPay: 4920,
    status: "On Hold",
    method: "Check",
    date: "Oct 31, 2024"
  }
];

const STATS = [
  { label: "Total Disbursement", value: "$248,500", trend: "+12.5%", isUp: true, icon: Wallet, color: "text-emerald-600" },
  { label: "Tax Liabilities", value: "$32,120", trend: "+2.1%", isUp: true, icon: Building2, color: "text-blue-600" },
  { label: "Net Payouts", value: "$216,380", trend: "-1.4%", isUp: false, icon: CreditCard, color: "text-indigo-600" },
];

export default function PayrollModule() {
  const [activeTab, setActiveTab] = useState("Current Month");

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Processing": return "bg-blue-50 text-blue-600 border-blue-100";
      case "On Hold": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <DollarSign className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financial Ops</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Payroll Processing</h1>
            <p className="text-sm font-medium text-slate-500">Manage monthly cycles, tax deductions, and bank transfers.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <FileText size={18} />
              Reports
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              Run Payroll Cycle
            </button>
          </div>
        </div>

        {/* FINANCIAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.isUp ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-rose-500" />}
                    <span className={`text-xs font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.trend}</span>
                    <span className="text-xs text-slate-400 font-medium ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAYROLL TABLE SECTION */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-xl w-fit">
                {["Current Month", "History", "Adjustments"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-tight transition-all ${
                      activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    className="pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 w-64"
                  />
                </div>
                <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
                  <Filter size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Basic Salary</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Additions</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Deductions</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 font-bold text-slate-900 bg-slate-100/30">Net Payout</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {PAYROLL_HISTORY.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs">
                          {row.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1">{row.employee}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm font-bold text-slate-600">${row.basic.toLocaleString()}</td>
                    <td className="px-6 py-6 text-sm font-bold text-emerald-500">+${row.allowances.toLocaleString()}</td>
                    <td className="px-6 py-6 text-sm font-bold text-rose-400">-${row.deductions.toLocaleString()}</td>
                    <td className="px-6 py-6 text-sm font-black text-slate-900 bg-slate-50/30">${row.netPay.toLocaleString()}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-tight ${getStatusStyle(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download Payslip">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
             <p className="text-xs text-slate-400 font-medium italic">Showing 1-4 of 128 employees</p>
             <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-400">Previous</button>
                <button className="px-4 py-2 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-900">Next</button>
             </div>
          </div>
        </div>

        {/* BOTTOM ALERTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] flex items-start gap-6">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
                 <ShieldCheck size={28} />
              </div>
              <div>
                 <h4 className="text-lg font-black text-indigo-900 mb-1">Compliance Check Passed</h4>
                 <p className="text-sm text-indigo-700/70 mb-4 font-medium">All tax regulations for the Q4 cycle have been updated. No manual adjustments required for social security filings.</p>
                 <div className="flex items-center gap-4">
                    <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                       View Audit Log <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] flex items-start gap-6">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-100">
                 <Clock size={28} />
              </div>
              <div>
                 <h4 className="text-lg font-black text-amber-900 mb-1">Upcoming Payout</h4>
                 <p className="text-sm text-amber-700/70 mb-4 font-medium">Final bank transfer batch is scheduled for 10:00 PM tonight. Please review "On Hold" cases before the cutoff time.</p>
                 <button className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all">
                    Resolve Conflicts
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}