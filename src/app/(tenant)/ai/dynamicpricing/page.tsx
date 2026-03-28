"use client";

import React, { useState, useMemo } from 'react';
import { 
  Package, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  BrainCircuit, 
  History, 
  BarChart3, 
  ArrowRightLeft, 
  Filter, 
  Search, 
  Plus, 
  MoreHorizontal,
  ChevronDown,
  LineChart,
  ShoppingCart,
  Boxes,
  RefreshCcw,
  ArrowUpRight
} from 'lucide-react';

// --- Types ---
interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  status: 'Healthy' | 'Low Stock' | 'Overstocked' | 'Critical';
  aiInsights: {
    forecastDemand: number; // Predicted units needed for next 30 days
    stockoutRisk: number; // 0-100 percentage
    recommendedReorder: number;
    velocity: 'High' | 'Medium' | 'Low';
    daysUntilEmpty: number;
  };
  lastRestocked: string;
}

const MOCK_INVENTORY: StockItem[] = [
  {
    id: '1',
    sku: 'NX-402-B',
    name: 'Lithium-Ion Battery Pack 5000mAh',
    category: 'Electronics',
    currentStock: 142,
    minStock: 250,
    maxStock: 1000,
    unit: 'pcs',
    status: 'Low Stock',
    aiInsights: {
      forecastDemand: 450,
      stockoutRisk: 92,
      recommendedReorder: 600,
      velocity: 'High',
      daysUntilEmpty: 8
    },
    lastRestocked: '2024-03-10'
  },
  {
    id: '2',
    sku: 'NX-991-A',
    name: 'Aluminium Alloy Frame Case',
    category: 'Hardware',
    currentStock: 890,
    minStock: 200,
    maxStock: 500,
    unit: 'units',
    status: 'Overstocked',
    aiInsights: {
      forecastDemand: 110,
      stockoutRisk: 0,
      recommendedReorder: 0,
      velocity: 'Low',
      daysUntilEmpty: 240
    },
    lastRestocked: '2024-01-15'
  },
  {
    id: '3',
    sku: 'NX-105-C',
    name: 'High-Precision Sensor Module',
    category: 'Sensors',
    currentStock: 45,
    minStock: 40,
    maxStock: 200,
    unit: 'pcs',
    status: 'Healthy',
    aiInsights: {
      forecastDemand: 60,
      stockoutRisk: 45,
      recommendedReorder: 100,
      velocity: 'Medium',
      daysUntilEmpty: 22
    },
    lastRestocked: '2024-03-18'
  }
];

export default function AIInventoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalValue: '$1,240,500',
    stockAccuracy: '99.4%',
    aiEfficiencyGain: '+18.2%',
    criticalAlerts: 4
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <Boxes size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Inventory Intelligence</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-indigo-100">
                  <BrainCircuit size={10} /> Predictive Engine v4.2
                </span>
                <span className="text-[10px] text-slate-400 font-medium italic">Synced with real-time sales data</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white rounded-lg shadow-sm">Real-time</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Forecasting</button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
              <Plus size={16} />
              New SKU
            </button>
          </div>
        </div>
      </div>

      {/* TOP ANALYTICS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-6">
        {[
          { label: 'Total Inventory Value', value: stats.totalValue, trend: '+2.5%', icon: <BarChart3 className="text-indigo-500" /> },
          { label: 'Stock Accuracy', value: stats.stockAccuracy, trend: '+0.1%', icon: <History className="text-emerald-500" /> },
          { label: 'Critical Stockouts', value: stats.criticalAlerts, trend: '-20%', icon: <AlertTriangle className="text-rose-500" />, sub: 'High risk items' },
          { label: 'AI Optimization', value: stats.aiEfficiencyGain, trend: 'Monthly', icon: <Zap className="text-amber-500" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
              {stat.sub && <p className="text-[10px] text-rose-400 font-medium mt-1">{stat.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN VIEW */}
      <div className="flex-1 px-8 pb-8 flex gap-6 overflow-hidden">
        
        {/* LEFT: STOCK TABLE */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Master Stock Registry</h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter SKUs..."
                  className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500/10 outline-none w-48"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200"><Filter size={16} /></button>
              <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200"><RefreshCcw size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item / SKU</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Current Stock</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">AI Demand Forecast</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_INVENTORY.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{item.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 font-mono tracking-tight">{item.sku} • {item.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-black ${item.status === 'Low Stock' ? 'text-rose-600' : 'text-slate-700'}`}>
                          {item.currentStock} <span className="text-[10px] text-slate-400 font-medium">{item.unit}</span>
                        </span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                          <div 
                            className={`h-full ${item.status === 'Low Stock' ? 'bg-rose-500' : 'bg-indigo-500'}`}
                            style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-black text-slate-700">{item.aiInsights.forecastDemand}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Next 30D</span>
                        </div>
                        <div className={`p-1 rounded-md ${item.aiInsights.velocity === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                          {item.aiInsights.velocity === 'High' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                        item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 
                        item.status === 'Low Stock' ? 'bg-rose-50 text-rose-600' : 
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: AI ACTION CENTER */}
        <div className="w-80 lg:w-96 shrink-0 space-y-6 flex flex-col overflow-hidden">
          
          {/* AI DECISION CARD */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <BrainCircuit size={16} className="text-indigo-400" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Predictive Action</span>
              </div>
              
              <h4 className="text-lg font-black leading-snug mb-2">Automated Procurement Suggestion</h4>
              <p className="text-xs text-slate-400 font-medium mb-6">Based on high velocity and 92% stockout risk for <span className="text-white">NX-402-B</span>.</p>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended Buy</span>
                  <span className="text-[10px] font-black text-emerald-400">+600 Units</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Est. Arrival</span>
                  <span className="text-[10px] font-black text-white">48 Hours</span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                Approve PO Release
              </button>
            </div>
          </div>

          {/* STOCK HEALTH DISTRIBUTION */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex-1 flex flex-col overflow-hidden">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Inventory Health Score</h4>
            
            <div className="flex items-center justify-center py-4 relative">
              <div className="text-center">
                <div className="text-4xl font-black text-slate-800 tracking-tighter">84<span className="text-lg text-slate-400">/100</span></div>
                <div className="text-[10px] font-bold text-emerald-500 uppercase flex items-center justify-center gap-1 mt-1">
                  <ArrowUpRight size={12} /> Optimization Peak
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-4">
               <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5">
                    <span className="text-slate-500 uppercase">Capital Efficiency</span>
                    <span className="text-slate-800">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }} />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5">
                    <span className="text-slate-500 uppercase">Dead Stock Risk</span>
                    <span className="text-rose-500 font-black">Low (4%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: '4%' }} />
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
               <h5 className="text-[10px] font-black text-slate-800 uppercase mb-4">Top AI Recommendations</h5>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform"><ArrowRightLeft size={14} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-700">Rebalance Frame Cases</p>
                      <p className="text-[9px] text-slate-400">Excess stock in Warehouse A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform"><LineChart size={14} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-700">Increase Buffer for Q2</p>
                      <p className="text-[9px] text-slate-400">Seasonal demand spike detected</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
}