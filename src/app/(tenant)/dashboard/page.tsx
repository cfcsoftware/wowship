"use client";

import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Package,
  AlertTriangle,
  Clock,
  Plus,
  BarChart3,
  PieChart,
  UserPlus,
  Download,
  MoreVertical,
  ChevronRight,
  Wallet,
  Briefcase
} from 'lucide-react';

export default function ERPDashboard() {
  const [timeRange, setTimeRange] = useState('Monthly');

  // --- MOCK DATA ---
  const kpis = [
    { label: 'Total Revenue', value: '$542,850', grow: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: '1,240', grow: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Customers', value: '3,842', grow: '+5.4%', trend: 'up', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Invoices', value: '24', grow: '-2.1%', trend: 'down', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Expenses', value: '$120,400', grow: '+4.0%', trend: 'up', icon: Wallet, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Net Profit', value: '$422,450', grow: '+14.2%', trend: 'up', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const transactions = [
    { id: '#ORD-9921', customer: 'Emma Watson', amount: '$1,240.00', status: 'Completed', date: 'Mar 18, 2026' },
    { id: '#ORD-9920', customer: 'James Miller', amount: '$850.50', status: 'Pending', date: 'Mar 18, 2026' },
    { id: '#ORD-9919', customer: 'Sarah Chen', amount: '$2,100.00', status: 'Completed', date: 'Mar 17, 2026' },
    { id: '#ORD-9918', customer: 'Robert Fox', amount: '$430.00', status: 'Cancelled', date: 'Mar 17, 2026' },
    { id: '#ORD-9917', customer: 'Sam Gilbert', amount: '$1,120.00', status: 'Completed', date: 'Mar 17, 2026' },
    { id: '#ORD-9916', customer: 'Nohan camron', amount: '$550.50', status: 'Pending', date: 'Mar 16, 2026' },
    { id: '#ORD-9915', customer: 'Matthew B', amount: '$2,700.00', status: 'Completed', date: 'Mar 16, 2026' },
    { id: '#ORD-9914', customer: 'Brett Waugh', amount: '$620.00', status: 'Cancelled', date: 'Mar 15, 2026' },
    { id: '#ORD-9923', customer: 'Nicolas Pooran', amount: '$4000.00', status: 'Completed', date: 'Mar 15, 2026' },
    { id: '#ORD-9912', customer: 'Tommy Green', amount: '$350.50', status: 'Pending', date: 'Mar 15, 2026' },
    { id: '#ORD-9911', customer: 'Lily Ming', amount: '$270.00', status: 'Completed', date: 'Mar 15, 2026' },
    { id: '#ORD-9910', customer: 'Megan Cox', amount: '$1997.00', status: 'Cancelled', date: 'Mar 14, 2026' },
  
  ];

  const lowStock = [
    { item: 'Industrial Sensor X-1', stock: 5, min: 20, urgency: 'Critical' },
    { item: 'Thermal Paste 50g', stock: 12, min: 50, urgency: 'Warning' },
  ];

  const activityFeed = [
    { type: 'info', msg: 'New bulk order placed by Global Corp', time: '2 mins ago' },
    { type: 'warning', msg: 'Invoice #IV-442 is 5 days overdue', time: '1 hour ago' },
    { type: 'critical', msg: 'Database backup failed on Server A', time: '4 hours ago' },
    { type: 'success', msg: 'Payment received from Tech Solutions', time: '6 hours ago' },
  ];

  return (
    <div className="w-full font-sans text-gray-900 bg-[#F4F7FA] min-h-screen p-4 md:p-8">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Overview & Analytics</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <Clock size={14} /> Real-time sync: Active as of March 18, 11:00 AM
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Plus size={16} /> New Invoice
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <UserPlus size={16} /> Add Customer
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">
            <Download size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* 2. KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md ${kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.grow}
              </div>
            </div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{kpi.label}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* 3. ANALYTICS AREA (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-lg">Sales Overview</h3>
              <p className="text-xs text-slate-400">Net revenue performance against targets</p>
            </div>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          {/* Mock Chart Visualization */}
          <div className="h-64 w-full bg-slate-50 rounded-2xl relative flex items-end justify-between px-4 pb-4">
             {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
               <div key={i} className="w-[6%] bg-blue-500 rounded-t-md hover:bg-blue-600 transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   ${h*100}
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-1 text-slate-900">Revenue vs Expenses</h3>
          <p className="text-xs text-slate-400 mb-8">Comparative financial breakdown</p>
          <div className="flex flex-col justify-center h-52 relative">
             {/* Simple visual representation of comparison */}
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span>Revenue</span> <span>78%</span></div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[78%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span>Expenses</span> <span>22%</span></div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[22%]"></div>
                  </div>
                </div>
             </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Budget Met</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Forecasted</div>
          </div>
        </div>
      </div>

      {/* 4. BUSINESS SNAPSHOT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Recent Transactions Table */}
        <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-sm text-slate-900">{t.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{t.customer}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{t.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        t.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 text-right">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Components */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Activity Feed</h3>
            <div className="space-y-6">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    item.type === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                    item.type === 'warning' ? 'bg-amber-500' :
                    item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">
                      {item.msg}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-400" />
                  Stock Alerts
                </h3>
                <span className="bg-red-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">2 New</span>
              </div>
              <div className="space-y-4">
                {lowStock.map((item, i) => (
                  <div key={i} className="bg-white/10 p-3 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-200">{item.item}</span>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        item.urgency === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>{item.urgency}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.urgency === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${(item.stock/item.min)*100}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold">{item.stock} left</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Design detail */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* Team Overview */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
              Team Overview
              <Briefcase size={18} className="text-slate-300" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">Total Staff</div>
                <div className="text-2xl font-black text-slate-900">48</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-emerald-600 mb-1 uppercase">Active</div>
                <div className="text-2xl font-black text-emerald-700">42</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center -space-x-3">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                    {String.fromCharCode(64 + i)}
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                 +12
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}