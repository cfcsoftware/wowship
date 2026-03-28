"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Clock,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Target
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type DealStage = "Discovery" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedClose: string;
  owner: string;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const DEALS: Deal[] = Array.from({ length: 20 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp"];
  const titles = ["Enterprise ERP License", "Cloud Migration Phase 2", "Annual Support Contract", "Hardware Refresh", "Custom Module Dev"];
  const owners = ["Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];
  const stages: DealStage[] = ["Discovery", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

  return {
    id: `DEAL-${7000 + i}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    value: Math.floor(Math.random() * 200000) + 15000,
    stage: stages[i % 4], // Mix of active stages
    probability: [20, 50, 75, 100, 0][i % 5],
    expectedClose: `2024-06-${(10 + (i % 20)).toString().padStart(2, '0')}`,
    owner: owners[i % owners.length],
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStageBadge = (stage: DealStage) => {
  const styles: Record<DealStage, string> = {
    "Discovery": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Proposal": "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    "Negotiation": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Closed Won": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Closed Lost": "bg-rose-50 text-rose-700 ring-rose-600/20",
  };
  return `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[stage]}`;
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("All Stages");

  const filteredDeals = useMemo(() => {
    return DEALS.filter((deal) => {
      const matchesSearch = 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = filterStage === "All Stages" || deal.stage === filterStage;
      return matchesSearch && matchesStage;
    });
  }, [searchTerm, filterStage]);

  // Aggregate stats
  const pipelineValue = DEALS.reduce((acc, curr) => acc + (curr.stage !== "Closed Lost" ? curr.value : 0), 0);
  const weightedValue = DEALS.reduce((acc, curr) => acc + (curr.value * (curr.probability / 100)), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={24} />
              Sales Pipeline
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Track opportunities and revenue forecasts across AU, NZ, and US.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Report
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} />
              New Deal
            </button>
          </div>
        </header>

        {/* PIPELINE STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Pipeline</p>
              <Target size={16} className="text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(pipelineValue / 1000000).toFixed(2)}M</p>
            <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <TrendingUp size={12} /> +12.5% vs last month
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weighted Value</p>
              <DollarSign size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(weightedValue / 1000).toFixed(1)}K</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium italic">Based on stage probability</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Deal Size</p>
              <Briefcase size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">$48.2K</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Across all active regions</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Win Rate</p>
              <ArrowUpRight size={16} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">64%</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Last 90 days performance</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search deals or companies..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none hover:border-slate-300 cursor-pointer"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option>All Stages</option>
              <option>Discovery</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* DEALS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Deal Info</th>
                  <th className="px-6 py-4">Stage & Progress</th>
                  <th className="px-6 py-4">Value (USD)</th>
                  <th className="px-6 py-4">Expectations</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                          {deal.title}
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase">{deal.region}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Briefcase size={12} className="text-slate-400" />
                          {deal.company}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2 max-w-[140px]">
                        <span className={getStageBadge(deal.stage)}>
                          {deal.stage}
                        </span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${deal.stage === 'Closed Won' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          {deal.probability}% Probability
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-800">${deal.value.toLocaleString('en-US')}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <TrendingUp size={10} /> Market Rate
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Calendar size={12} className="text-slate-400" /> Close: {deal.expectedClose}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> Owner: {deal.owner}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <AlertCircle size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500" /> 8 Deals Won</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-amber-500" /> 12 Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-600 bg-white shadow-sm font-bold text-xs px-3">
                1
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}