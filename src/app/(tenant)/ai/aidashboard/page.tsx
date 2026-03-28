"use client";

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  PieChart, 
  LineChart,
  RefreshCcw,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

// Mock Data for the Forecast
const FORECAST_DATA = {
  summary: {
    projectedRevenue: 4280500,
    confidenceScore: 94.2,
    variance: 4.8,
    lastUpdated: '12 mins ago'
  },
  monthlyProjections: [
    { month: 'Oct', actual: 320000, projected: 325000, upper: 330000, lower: 315000 },
    { month: 'Nov', actual: 345000, projected: 350000, upper: 360000, lower: 340000 },
    { month: 'Dec', actual: 310000, projected: 395000, upper: 410000, lower: 380000 },
    { month: 'Jan', actual: null, projected: 415000, upper: 440000, lower: 390000 },
    { month: 'Feb', actual: null, projected: 440000, upper: 470000, lower: 410000 },
    { month: 'Mar', actual: null, projected: 465000, upper: 505000, lower: 425000 },
  ],
  aiInsights: [
    { id: 1, type: 'opportunity', title: 'Q1 Seasonality Uplift', text: 'Historical data suggests a 12% increase in service-based revenue starting mid-January.', impact: '+ $45k' },
    { id: 2, type: 'risk', title: 'Supply Chain Lag', text: 'Predicted delay in logistics may impact Q4 deliveries, potentially shifting $120k in revenue to Q1.', impact: '- $120k' },
    { id: 3, type: 'optimization', title: 'Opex Reduction', text: 'AI identified $12k/mo in redundant cloud provisioning that can be optimized immediately.', impact: '+ $12k/mo' }
  ]
};

export default function App() {
  const [scenario, setScenario] = useState('Optimistic');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1500);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#F8FAFC] overflow-hidden">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Nexion AI Insights: Financial Forecast
              </h1>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                Live Ledger Sync Active • Model: Nexion-Predict-v4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {['Conservative', 'Base', 'Optimistic'].map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all ${
                    scenario === s 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button 
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCcw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
              {isAnalyzing ? 'Recalculating...' : 'Refresh Forecast'}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Target size={18} />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={10} /> 12% vs LY
              </span>
            </div>
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Projected Revenue (FY24)</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">$4,280,500</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Zap size={18} />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                High Confidence
              </span>
            </div>
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Model Confidence Score</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">94.2%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp size={18} />
              </div>
            </div>
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Operating Margin Predict</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">28.4%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <TrendingDown size={18} />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Risk Identified
              </span>
            </div>
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Monthly Burn Rate (Avg)</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">$142,800</p>
          </div>
        </div>

        {/* CHART SECTION (SIMULATED) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Revenue Forecast Trend</h3>
                <p className="text-[10px] text-slate-400 font-medium">Monthly actual vs projected values with AI confidence bands</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-tight">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div> Actual</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> Projected</div>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {FORECAST_DATA.monthlyProjections.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                  <div className="w-full flex items-end gap-1 h-48">
                    {/* Actual Bar */}
                    <div 
                      style={{ height: d.actual ? `${(d.actual / 500000) * 100}%` : '0%' }}
                      className="flex-1 bg-slate-100 rounded-t-sm transition-all group-hover:bg-slate-200"
                    />
                    {/* Projected Bar */}
                    <div 
                      style={{ height: `${(d.projected / 500000) * 100}%` }}
                      className={`flex-1 rounded-t-sm transition-all relative ${d.actual ? 'bg-indigo-300' : 'bg-indigo-600 shadow-lg shadow-indigo-100'}`}
                    >
                      {/* Confidence Range Line for non-actuals */}
                      {!d.actual && (
                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 bg-indigo-200 h-12 flex items-center justify-center">
                            <div className="w-3 h-0.5 bg-indigo-200 absolute top-0" />
                            <div className="w-3 h-0.5 bg-indigo-200 absolute bottom-0" />
                         </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{d.month}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white p-2 rounded text-[10px] pointer-events-none z-10 whitespace-nowrap">
                    Proj: ${(d.projected / 1000).toFixed(1)}k
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI INSIGHTS SIDE PANEL */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">AI Recommendation Engine</h3>
            {FORECAST_DATA.aiInsights.map((insight) => (
              <div key={insight.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    insight.type === 'opportunity' ? 'bg-emerald-50 text-emerald-600' :
                    insight.type === 'risk' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {insight.type === 'opportunity' ? <TrendingUp size={16} /> :
                     insight.type === 'risk' ? <ShieldCheck size={16} /> : <Layers size={16} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{insight.title}</h4>
                      <span className={`text-[10px] font-black ${
                        insight.impact.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                      {insight.text}
                    </p>
                    <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Action Plan <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="text-xs font-bold mb-1 opacity-90">What-if Analysis</h4>
                 <p className="text-[11px] opacity-75 mb-4 leading-snug">Simulate the impact of a 5% increase in regional labor costs.</p>
                 <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-[11px] font-bold transition-all border border-white/20">
                    Open Simulator
                 </button>
               </div>
               <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12">
                  <BarChart3 size={100} />
               </div>
            </div>
          </div>
        </div>

        {/* REVENUE BY REGION TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Predicted Revenue Breakdown by Entity</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded text-[10px] font-bold text-slate-500 border border-slate-100 cursor-pointer">
                <Calendar size={12} /> Q1 2024
              </div>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Entity Name</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Current Performance</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-center">AI Projected Growth</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-right">Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'North American Logistics', current: '$1.2M', growth: '+8.4%', prob: '96%', color: 'bg-emerald-500' },
                { name: 'European Distribution Hub', current: '$840k', growth: '+2.1%', prob: '82%', color: 'bg-amber-500' },
                { name: 'APAC Tech Services', current: '$450k', growth: '+14.7%', prob: '89%', color: 'bg-indigo-500' },
                { name: 'Global R&D Center', current: '$310k', growth: '-1.2%', prob: '94%', color: 'bg-rose-500' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.color}`} />
                      <span className="text-xs font-bold text-slate-700">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{row.current}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-1.5">
                      <div className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        row.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {row.growth}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-slate-800">{row.prob}</span>
                      <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: row.prob }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}} />
    </div>
  );
}