"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  FileCheck, 
  AlertCircle, 
  Download, 
  Search, 
  Calendar, 
  ChevronDown, 
  Filter, 
  ExternalLink, 
  Eye, 
  Clock,
  Printer,
  MoreVertical,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const TAX_SUMMARY = [
  { label: "Total GST Payable", value: "₹1,24,500", type: "liability", deadline: "20 Apr" },
  { label: "Input Tax Credit", value: "₹82,400", type: "credit", deadline: "Current Month" },
  { label: "Net Tax Due", value: "₹42,100", type: "due", deadline: "9 Days Left" },
  { label: "TDS Collected", value: "₹12,850", type: "tds", deadline: "Quarterly" },
];

const GST_RECORDS = [
  { id: "TX-9021", entity: "Reliance Digital", category: "Electronics", amount: "₹45,000", gst: "₹8,100", rate: "18%", status: "Paid", date: "Mar 12, 2026" },
  { id: "TX-9022", entity: "Amazon Web Services", category: "SaaS", amount: "₹12,400", gst: "₹2,232", rate: "18%", status: "Pending", date: "Mar 10, 2026" },
  { id: "TX-9023", entity: "Blue Dart Express", category: "Logistics", amount: "₹3,200", gst: "₹160", rate: "5%", status: "Paid", date: "Mar 08, 2026" },
  { id: "TX-9024", entity: "WeWork Coworking", category: "Rent", amount: "₹85,000", gst: "₹15,300", rate: "18%", status: "Processing", date: "Mar 05, 2026" },
  { id: "TX-9025", entity: "Local Vendor St.", category: "Supplies", amount: "₹1,500", gst: "₹180", rate: "12%", status: "Paid", date: "Mar 01, 2026" },
];

export default function TaxGSTPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-10 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              Tax & GST Compliance <ShieldCheck className="text-blue-600" size={28} />
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">GSTIN: 27AAAAA0000A1Z5 • Financial Year 2023-24</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 transition-colors shadow-sm">
              <Printer size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              <Download size={18} />
              Tax Report
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TAX_SUMMARY.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  {item.type === 'due' ? <AlertCircle size={16} className="text-rose-500" /> : <Clock size={16} className="text-slate-300" />}
                </div>
                <h2 className={`text-2xl font-black tracking-tighter mb-1 ${item.type === 'due' ? 'text-rose-600' : 'text-slate-900'}`}>
                  {item.value}
                </h2>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Deadline:</span>
                  <span className="text-[9px] font-black text-slate-600 uppercase">{item.deadline}</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:scale-110 transition-transform">
                <FileCheck size={80} />
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search vendor or invoice ID..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-600">
              <Calendar size={16} /> Mar 2026 <ChevronDown size={14} />
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-600">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        {/* GST LIST TABLE */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax (GST)</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {GST_RECORDS.map((record, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{record.entity}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{record.id} • {record.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{record.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-700">{record.amount}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-blue-600">{record.gst}</span>
                        <span className="text-[10px] font-bold text-blue-400">{record.rate} Rate</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          record.status === 'Paid' ? 'bg-emerald-500' : 
                          record.status === 'Pending' ? 'bg-amber-500' : 'bg-blue-400'
                        }`}></span>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider">{record.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* PERSISTENT VISIBLE ACTION BUTTONS */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-sm">
                          <Eye size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">View</span>
                        </button>
                        <button className="p-2 border border-slate-200 text-slate-400 rounded-xl hover:text-slate-900 hover:border-slate-400 transition-all">
                          <ExternalLink size={14} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* FOOTER OF TABLE */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 5 of 124 tax transactions</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Previous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 shadow-sm">1</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">2</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* BOTTOM ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black italic tracking-tight">Compliance Score</h3>
              <div className="px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase">98% Perfect</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Your tax filing consistency is higher than 92% of similar businesses. Keep maintaining digital logs to ensure easy audits.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <ArrowUpRight className="text-emerald-400 mb-2" size={20} />
                <p className="text-[10px] font-bold text-slate-500 uppercase">Quarterly Filing</p>
                <p className="text-lg font-black italic">Completed</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <ArrowDownRight className="text-blue-400 mb-2" size={20} />
                <p className="text-[10px] font-bold text-slate-500 uppercase">Audit Risk</p>
                <p className="text-lg font-black italic">Low</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Upcoming Tax Calendar</h3>
              <p className="text-slate-500 text-xs font-medium mb-6">Important dates for GST R1, R3B and TDS payments.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex flex-col items-center justify-center text-white shrink-0">
                    <span className="text-[10px] font-black">APR</span>
                    <span className="text-lg font-black leading-none">11</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">GSTR-1 Filing</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outward Supplies Return</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex flex-col items-center justify-center text-white shrink-0">
                    <span className="text-[10px] font-black">APR</span>
                    <span className="text-lg font-black leading-none">20</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">GSTR-3B Payment</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Summary Return</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}