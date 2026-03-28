"use client";

import React, { useState } from "react";
import { 
  Package, 
  AlertTriangle, 
  Truck, 
  RefreshCw, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Plus,
  Box,
  MapPin,
  ClipboardCheck,
  Zap,
  History
} from "lucide-react";

const INVENTORY_DATA = [
  {
    sku: "SKU-99201",
    product: "Industrial Servo Motor X-1",
    category: "Hardware",
    stock: 12,
    minLevel: 25,
    status: "Critically Low",
    warehouse: "Zone A-12",
    leadTime: "14 Days",
    unitCost: 850.00,
    totalVal: 10200.00
  },
  {
    sku: "SKU-99205",
    product: "Graphite Cooling Fins",
    category: "Components",
    stock: 442,
    minLevel: 100,
    status: "Healthy",
    warehouse: "Zone C-04",
    leadTime: "5 Days",
    unitCost: 12.50,
    totalVal: 5525.00
  },
  {
    sku: "SKU-99210",
    product: "Titanium Alloy Housing",
    category: "Raw Material",
    stock: 85,
    minLevel: 50,
    status: "Reorder Soon",
    warehouse: "Zone B-02",
    leadTime: "30 Days",
    unitCost: 240.00,
    totalVal: 20400.00
  },
  {
    sku: "SKU-99218",
    product: "Circuit Board Rev 4.0",
    category: "Electronics",
    stock: 0,
    minLevel: 200,
    status: "Out of Stock",
    warehouse: "External-01",
    leadTime: "21 Days",
    unitCost: 115.00,
    totalVal: 0.00
  },
  {
    sku: "SKU-99222",
    product: "Precision Bearing Set",
    category: "Hardware",
    stock: 1200,
    minLevel: 500,
    status: "Overstocked",
    warehouse: "Zone A-08",
    leadTime: "3 Days",
    unitCost: 4.25,
    totalVal: 5100.00
  }
];

export default function InventoryReport() {
  const [filter, setFilter] = useState("All Stock");

  const getStatusStyle = (status) => {
    switch (status) {
      case "Critically Low": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Out of Stock": return "bg-slate-100 text-slate-600 border-slate-200";
      case "Reorder Soon": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Healthy": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Overstocked": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Inventory Control</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global Warehouse Management • Real-time Sync</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white text-slate-700 font-bold text-sm border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-all">
              <Download size={18} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
              <Plus size={18} strokeWidth={3} />
              Add Stock
            </button>
          </div>
        </div>

        {/* Inventory Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Asset Value", value: "$412.5K", delta: "+4.2%", icon: Layers, color: "text-blue-600" },
            { label: "Low Stock Alerts", value: "24 Items", delta: "High Risk", icon: AlertTriangle, color: "text-rose-500" },
            { label: "In-Transit Ships", value: "18 Orders", delta: "7 Today", icon: Truck, color: "text-amber-500" },
            { label: "Turnover Ratio", value: "8.4x", delta: "+12%", icon: RefreshCw, color: "text-emerald-500" },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <div className={`p-2.5 rounded-xl bg-slate-50 w-fit ${card.color} mb-4`}>
                  <card.icon size={20} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 leading-tight">{card.value}</h4>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${card.delta.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {card.delta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Ledger */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
              {["All Stock", "Hardware", "Electronics", "Alerts"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                    filter === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search SKU or Product..." 
                  className="pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-4 focus:ring-indigo-50 outline-none w-72"
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="pl-10 pr-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Details</th>
                    <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Stock Level</th>
                    <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse</th>
                    <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lead Time</th>
                    <th className="px-4 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Valuation</th>
                    <th className="pl-4 pr-10 py-6 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {INVENTORY_DATA.map((item) => (
                    <tr key={item.sku} className="group hover:bg-indigo-50/20 transition-all cursor-pointer">
                      <td className="pl-10 pr-4 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                            <Box size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">{item.product}</p>
                            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">{item.sku} • {item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between w-32">
                            <span className="text-xs font-black text-slate-700">{item.stock} <span className="text-slate-400 font-bold">/ {item.minLevel}</span></span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-tighter ${getStatusStyle(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.stock < item.minLevel ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min((item.stock / (item.minLevel * 2)) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin size={14} className="text-slate-300" />
                          <span className="text-xs font-bold">{item.warehouse}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-xs font-bold text-slate-600">{item.leadTime}</span>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm font-black text-slate-800">${item.totalVal.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400">${item.unitCost} / unit</p>
                      </td>
                      <td className="pl-4 pr-10 py-5 text-right">
                        <button className="p-2 hover:bg-white rounded-xl text-slate-300 hover:text-slate-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Utility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
          <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="relative z-10 space-y-4 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                <Zap size={12} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">AI Optimization</span>
              </div>
              <h3 className="text-2xl font-black leading-tight">Predictive Stock Leveling</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Based on current burn rates, Hardware Zone A-12 will reach critical levels in 4.2 days. Suggested reorder: <span className="text-white font-bold">140 Units</span>.</p>
              <div className="flex gap-4 pt-2">
                <button className="px-6 py-3 bg-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40">GENERATE PURCHASE ORDER</button>
                <button className="px-6 py-3 bg-slate-800 rounded-xl font-black text-xs hover:bg-slate-700 transition-all">DISMISS</button>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex justify-center">
              <div className="w-32 h-32 rounded-full border-[10px] border-indigo-600/30 border-t-indigo-500 animate-spin-slow flex items-center justify-center">
                <span className="text-xl font-black">92%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2">
                <History size={20} className="text-indigo-600" />
                Recent Logs
              </h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="space-y-5">
              {[
                { event: "Inbound Shipment", detail: "400 Units from Global Fab", time: "2h ago", icon: Truck },
                { event: "Inventory Audit", detail: "Zone C discrepancy resolved", time: "5h ago", icon: ClipboardCheck },
                { event: "Stock Outfall", detail: "SKU-99218 reached 0 units", time: "Yesterday", icon: AlertTriangle }
              ].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="p-2 bg-slate-50 rounded-lg h-fit text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <log.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 leading-none">{log.event}</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-1">{log.detail}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase mt-1 tracking-tighter">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}