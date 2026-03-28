"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  ArrowUpRight,
  Filter,
  Download,
  Search,
  MoreVertical,
  Layers,
  Globe,
  ShoppingCart,
  Zap,
  ChevronDown
} from "lucide-react";

const SALES_DATA = [
  {
    id: "INV-8801",
    client: "Acme Dynamics",
    contact: "Robert Fox",
    amount: 12450.00,
    status: "Completed",
    channel: "Enterprise",
    probability: 100,
    date: "Oct 24, 2023",
    trend: "up",
    items: 14
  },
  {
    id: "INV-8795",
    client: "Global Connect",
    contact: "Jane Cooper",
    amount: 8900.00,
    status: "Processing",
    channel: "Wholesale",
    probability: 85,
    date: "Oct 23, 2023",
    trend: "up",
    items: 42
  },
  {
    id: "INV-8792",
    client: "TechFlow Systems",
    contact: "Cody Fisher",
    amount: 3200.50,
    status: "Cancelled",
    channel: "Retail",
    probability: 0,
    date: "Oct 22, 2023",
    trend: "down",
    items: 3
  },
  {
    id: "INV-8788",
    client: "Lumina Studio",
    contact: "Esther Howard",
    amount: 15700.00,
    status: "Pending",
    channel: "Enterprise",
    probability: 60,
    date: "Oct 21, 2023",
    trend: "up",
    items: 8
  },
  {
    id: "INV-8782",
    client: "Urban Outfitters",
    contact: "Guy Hawkins",
    amount: 1200.00,
    status: "Completed",
    channel: "Retail",
    probability: 100,
    date: "Oct 20, 2023",
    trend: "neutral",
    items: 12
  }
];

export default function SalesReport() {
  const [filter, setFilter] = useState("All Channels");

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Processing": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Pending": return "bg-amber-50 text-amber-700 border-amber-100";
      case "Cancelled": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "Enterprise": return <Globe size={14} className="text-indigo-500" />;
      case "Wholesale": return <Layers size={14} className="text-purple-500" />;
      case "Retail": return <ShoppingCart size={14} className="text-amber-500" />;
      default: return <Zap size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Commercial Ledger</h1>
            <p className="text-slate-500 font-medium">Q4 Performance Overview • Oct 2023</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
              <Download size={18} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
              <Plus size={18} />
              Create Invoice
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Revenue", value: "$428,190", sub: "+12.5% from last month", icon: DollarSign, color: "bg-indigo-600", trend: "up" },
            { label: "Active Clients", value: "1,240", sub: "84 new this week", icon: Users, color: "bg-emerald-600", trend: "up" },
            { label: "Sales Velocity", value: "14.2/day", sub: "-2.1% from target", icon: TrendingUp, color: "bg-amber-500", trend: "down" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex items-start justify-between relative z-10">
                <div className={`p-4 rounded-2xl ${kpi.color} text-white shadow-lg`}>
                  <kpi.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-black ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {kpi.trend === 'up' ? 'Strong' : 'At Risk'}
                </div>
              </div>
              <div className="mt-6 relative z-10">
                <p className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">{kpi.label}</p>
                <p className="text-xs text-slate-500 mt-4 flex items-center gap-1 font-medium">
                  {kpi.sub}
                </p>
              </div>
              {/* Decorative Background Element */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <kpi.icon size={120} />
              </div>
            </div>
          ))}
        </div>

        {/* Table Management Bar */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, clients..." 
                className="pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none w-full lg:w-80"
              />
            </div>
            <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100">
              <Filter size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {["All Channels", "Enterprise", "Wholesale", "Retail"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  filter === tab 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Sales Table */}
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="pl-10 pr-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Identity</th>
                  <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue & Trend</th>
                  <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Channel</th>
                  <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence</th>
                  <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pl-4 pr-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SALES_DATA.map((sale) => (
                  <tr key={sale.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                    {/* Client Identity */}
                    <td className="pl-10 pr-4 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm">
                          {sale.client.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                            {sale.client}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-400">{sale.id}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-bold text-slate-400">{sale.contact}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Revenue & Trend */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">${sale.amount.toLocaleString()}</span>
                        {sale.trend === 'up' && <div className="p-1 rounded-full bg-emerald-50 text-emerald-500"><ArrowUpRight size={12} strokeWidth={3} /></div>}
                        {sale.trend === 'down' && <div className="p-1 rounded-full bg-rose-50 text-rose-500 rotate-90"><ArrowUpRight size={12} strokeWidth={3} /></div>}
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">{sale.items} line items</p>
                    </td>

                    {/* Channel */}
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl w-fit">
                        {getChannelIcon(sale.channel)}
                        <span className="text-[10px] font-black uppercase tracking-tight text-slate-600">{sale.channel}</span>
                      </div>
                    </td>

                    {/* Confidence / Probability */}
                    <td className="px-4 py-6">
                      <div className="w-24">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black text-slate-500">{sale.probability}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              sale.probability > 70 ? 'bg-indigo-500' : 'bg-amber-400'
                            }`}
                            style={{ width: `${sale.probability}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-6">
                      <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="pl-4 pr-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-[10px] font-black text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          VIEW
                        </button>
                        <button className="p-2 text-slate-300 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer Pagination Mock */}
          <div className="px-10 py-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500">Showing 5 of 128 transactions</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:border-indigo-600">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ size, ...props }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}