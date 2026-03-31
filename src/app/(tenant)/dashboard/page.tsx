"use client";

import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  BarChart3, 
  Clock, 
  Filter, 
  Download, 
  Search,
  ChevronRight,
  Activity,
  Globe,
  TrendingUp,
  DollarSign,
  Warehouse,
  Anchor,
  Plane,
  ShieldAlert,
  Thermometer,
  FileText,
  Ship,
  ArrowRightLeft,
  Navigation2
} from 'lucide-react';

export default function App() {
  // --- SIMPLIFIED LOGISTICS DATA ---
  const shipments = [
    { id: 'SHIP-102', dest: 'Singapore Port', load: 94, status: 'Moving', priority: 'Urgent', eta: '3.5 Days', mode: 'Sea', start: 'Shanghai' },
    { id: 'FLIGHT-99', dest: 'New York JFK', load: 38, status: 'Departed', priority: 'High', eta: '4 Hours', mode: 'Air', start: 'London' },
    { id: 'TRUCK-703', dest: 'Lyon Center', load: 100, status: 'Late', priority: 'High', eta: 'Unknown', mode: 'Road', start: 'Berlin' },
    { id: 'SHIP-441', dest: 'Rotterdam Port', load: 82, status: 'Waiting', priority: 'Normal', eta: '12 Hours', mode: 'Sea', start: 'Mumbai' },
    { id: 'FLIGHT-11', dest: 'Tokyo Narita', load: 62, status: 'Customs', priority: 'High', eta: '2 Hours', mode: 'Air', start: 'Los Angeles' },
    { id: 'TRUCK-812', dest: 'Madrid Hub', load: 75, status: 'Moving', priority: 'Normal', eta: '6 Hours', mode: 'Road', start: 'Lisbon' },
  ];

  const hubDelays = [
    { name: 'Shanghai Port', level: 85, color: 'bg-rose-500' },
    { name: 'LA Airport', level: 72, color: 'bg-orange-500' },
    { name: 'Singapore Hub', level: 45, color: 'bg-emerald-500' },
    { name: 'London Heathrow', level: 60, color: 'bg-sky-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-sky-100">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-sky-600 p-2 rounded-lg text-white">
              <Ship size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Global Freight Control</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">World Logistics Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Find tracking number or city..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 md:p-10 max-w-[1800px] mx-auto">
        
        {/* --- GLOBAL STATUS TILES --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Ships', value: '412', icon: Anchor, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Flights in Air', value: '84', icon: Plane, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Trucks on Road', value: '2,109', icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Urgent Alerts', value: '14', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* MAIN TRACKING SECTION */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* DELIVERY LOG */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Live Shipment Tracking</h3>
                  <p className="text-sm text-slate-400">Current location and progress of all cargo</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-xs font-bold bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200">Filter By Mode</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-8 py-5">Transport Type</th>
                      <th className="px-8 py-5">Route (From - To)</th>
                      <th className="px-8 py-5">Current Status</th>
                      <th className="px-8 py-5">Cargo Load</th>
                      <th className="px-8 py-5">Time Left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                              {s.mode === 'Sea' ? <Ship size={18}/> : s.mode === 'Air' ? <Plane size={18}/> : <Truck size={18}/>}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{s.id}</p>
                              <p className="text-[10px] text-slate-400 font-semibold uppercase">{s.mode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">{s.start}</span>
                            <ArrowRightLeft size={12} className="text-sky-400" />
                            <span className="font-semibold text-slate-700">{s.dest}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                            s.status === 'Late' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                            s.status === 'Customs' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'Late' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                            {s.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${s.load > 90 ? 'bg-rose-500' : 'bg-sky-600'}`} style={{ width: `${s.load}%` }} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-400">{s.load}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-sky-600">{s.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TRANSPORT TYPE DISTRIBUTION (CHART REPLACEMENT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-slate-900">Workload by Transport</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Sea Cargo (Large Containers)', val: 65, color: 'bg-sky-600' },
                    { label: 'Road Freight (Local Delivery)', val: 24, color: 'bg-emerald-600' },
                    { label: 'Air Express (Quick Delivery)', val: 11, color: 'bg-indigo-600' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-slate-900">{item.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Navigation2 size={20} className="text-sky-400" />
                  Hub Delay Monitor
                </h3>
                <div className="flex items-end justify-between h-32 gap-3 mb-6">
                   {hubDelays.map((h, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-3">
                        <div className={`w-full ${h.color} rounded-t-lg transition-all duration-500`} style={{ height: `${h.level}%` }} />
                        <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60 text-center">{h.name.split(' ')[0]}</span>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-sky-300 font-bold uppercase tracking-widest text-center border-t border-white/10 pt-4">Real-time Station Updates</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR COMMANDS */}
          <div className="xl:col-span-4 space-y-8">
            
            {/* WAREHOUSE STATUS */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-slate-900 flex items-center gap-2">
                <Warehouse size={20} className="text-slate-400" />
                Storage Space
              </h3>
              <div className="space-y-5">
                {[
                  { place: 'New Jersey Depot', fill: 88, msg: 'Almost Full' },
                  { place: 'London Warehouse', fill: 42, msg: 'Good Space' },
                  { place: 'Singapore Center', fill: 12, msg: 'Empty' },
                ].map((w, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold text-slate-800">{w.place}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${w.fill > 80 ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-500'}`}>{w.msg}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                      <div className={`h-full ${w.fill > 80 ? 'bg-rose-500' : 'bg-sky-600'}`} style={{ width: `${w.fill}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROFIT MONITOR */}
            <div className="bg-sky-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Estimated Monthly Profit</p>
                  <h4 className="text-4xl font-black mb-6 tracking-tight">$1,420,000</h4>
                  <div className="flex items-end gap-1.5 h-16 mb-6">
                    {[30, 55, 45, 80, 100, 75, 90, 60, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/20 rounded-t-sm group-hover:bg-white/40 transition-colors" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <button className="w-full py-4 bg-white text-sky-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-sky-50 transition-all">
                    View Financials
                  </button>
               </div>
               <DollarSign size={120} className="absolute -bottom-6 -right-6 text-white/10 rotate-12" />
            </div>

            {/* PAPERWORK & COMPLIANCE */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-slate-400" />
                Paperwork Status
              </h3>
              <div className="space-y-3">
                {[
                  { task: 'Import Documents', count: '842', status: 'Waiting' },
                  { task: 'Border Permits', count: '12', status: 'In Progress' },
                  { task: 'Safety Checks', count: '04', status: 'Review' },
                ].map((doc, i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">{doc.task}</p>
                      <p className="text-sm font-bold text-slate-800">{doc.count} files</p>
                    </div>
                    <span className="text-[10px] font-bold text-sky-600 group-hover:underline cursor-pointer">{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- SYSTEM FOOTER --- */}
      <footer className="px-10 py-8 border-t border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <div className="flex gap-10">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Server Online</span>
            <span>Update Frequency: 1.2s</span>
            <span>Security: High (AES-256)</span>
          </div>
          <div className="flex items-center gap-4">
             <p>© 2026 Global Freight Control Systems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}