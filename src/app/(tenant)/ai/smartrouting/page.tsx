"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Filter, 
  ArrowUpRight, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  Sparkles,
  Target,
  Zap,
  ShieldCheck,
  ChevronRight,
  BrainCircuit,
  Building2,
  Globe,
  Timer
} from 'lucide-react';

// --- Types ---
interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  score: number;
  status: 'Hot' | 'Warm' | 'Cold';
  value: string;
  lastActive: string;
  intentSignal: 'High' | 'Medium' | 'Low';
  tags: string[];
}

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    company: 'CloudScale Systems',
    title: 'Chief Technology Officer',
    score: 98,
    status: 'Hot',
    value: '$45,000',
    lastActive: '2 mins ago',
    intentSignal: 'High',
    tags: ['SaaS', 'Series C', 'Decision Maker']
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Global Logistics Inc',
    title: 'Director of Operations',
    score: 84,
    status: 'Hot',
    value: '$120,000',
    lastActive: '1 hour ago',
    intentSignal: 'High',
    tags: ['Enterprise', 'Supply Chain', 'Heavy User']
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    company: 'FinTech Connect',
    title: 'Product Manager',
    score: 62,
    status: 'Warm',
    value: '$12,500',
    lastActive: '4 hours ago',
    intentSignal: 'Medium',
    tags: ['Evaluation Phase', 'Mid-Market']
  },
  {
    id: '4',
    name: 'David Wu',
    company: 'Horizon Retail',
    title: 'VP of Sales',
    score: 41,
    status: 'Cold',
    value: '$28,000',
    lastActive: '1 day ago',
    intentSignal: 'Low',
    tags: ['Automated Lead', 'Retail']
  }
];

export default function LeadScoring() {
  const [activeLeadId, setActiveLeadId] = useState<string>(MOCK_LEADS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeLead = MOCK_LEADS.find(l => l.id === activeLeadId) || MOCK_LEADS[0];

  const refreshScores = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#F8FAFC] overflow-hidden font-sans">
      {/* MODULE HEADER */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Logicore AI Lead Scoring
              </h1>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 uppercase tracking-wider">
                <ShieldCheck size={12} className="text-emerald-500" />
                Processing 2,450 Monthly Inbounds • Model: Predictive-Intent-v2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search leads..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={refreshScores}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
            >
              <Zap size={14} className={isRefreshing ? 'animate-pulse text-amber-400' : ''} />
              {isRefreshing ? 'Recalculating...' : 'Score Leads'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: LEAD QUEUE */}
        <div className="w-full md:w-[400px] flex flex-col border-r border-slate-200 bg-white shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Priority Queue</span>
            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 transition-colors">
              <Filter size={14} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {MOCK_LEADS.map(lead => (
              <button
                key={lead.id}
                onClick={() => setActiveLeadId(lead.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  activeLeadId === lead.id 
                    ? 'bg-indigo-50 border-indigo-100 shadow-sm' 
                    : 'bg-transparent border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0">
                    <h3 className={`text-sm font-bold truncate ${activeLeadId === lead.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {lead.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{lead.company}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-[14px] font-black ${
                    lead.score >= 80 ? 'text-emerald-600' : lead.score >= 50 ? 'text-amber-500' : 'text-slate-400'
                  }`}>
                    {lead.score}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                    lead.status === 'Hot' ? 'bg-rose-100 text-rose-600' : lead.status === 'Warm' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1 uppercase">
                    <Timer size={10} /> {lead.lastActive}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: LEAD INTELLIGENCE */}
        <div className="flex-1 overflow-y-auto bg-[#FDFDFD] custom-scrollbar">
          <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* LEAD PROFILE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                    {activeLead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck size={14} />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 leading-tight">{activeLead.name}</h2>
                  <p className="text-sm font-medium text-indigo-600">{activeLead.title}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {activeLead.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md border border-slate-200/50 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"><Mail size={18} /></button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"><Phone size={18} /></button>
                <button className="px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Assign to Sales
                </button>
              </div>
            </div>

            {/* AI SCORE BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Target size={16} className="text-indigo-600" />
                    Predictive Scoring Logic
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model: Intent-Analysis-v4</span>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Firmographic Fit', score: 95, icon: <Building2 size={14} />, desc: 'Company revenue and employee count match ICP.' },
                    { label: 'Engagement Velocity', score: 82, icon: <TrendingUp size={14} />, desc: '3 repeat visits and 1 whitepaper download in 48h.' },
                    { label: 'Role Authority', score: 90, icon: <Users size={14} />, desc: 'Decision maker level verified via LinkedIn sync.' },
                    { label: 'Intent Signal', score: 74, icon: <Globe size={14} />, desc: 'Active search for "Enterprise ERP Solutions" detected.' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{metric.icon}</span>
                          <span className="text-[11px] font-bold text-slate-700">{metric.label}</span>
                        </div>
                        <span className="text-[11px] font-black text-indigo-600">{metric.score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden mb-1">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${metric.score}%` }} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium italic">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIONABLE INSIGHTS */}
              <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Sparkles size={16} className="text-amber-400" />
                    </div>
                    <span className="text-xs font-bold tracking-tight">AI Sales Assistant</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Next Best Action</h4>
                  <p className="text-xs text-indigo-100/70 leading-relaxed mb-6">
                    Based on Sarah's recent activity, she's comparing Logicore with competitors. Send the "Enterprise Comparison Deck" within the next 2 hours for maximum impact.
                  </p>
                </div>
                <button className="w-full py-3 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                  Generate Personalized Email <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* TIMELINE & ACTIVITY */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                Recent Intelligence Feed
              </h3>
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                {[
                  { time: '2h ago', action: 'Downloaded "Supply Chain Optimization" PDF', type: 'Engagement', score: '+12' },
                  { time: '5h ago', action: 'LinkedIn Profile matched "CTO" role criteria', type: 'Verification', score: '+15' },
                  { time: 'Yesterday', action: 'Attended Webinar: "AI in Global Logistics"', type: 'Engagement', score: '+20' },
                  { time: '2 days ago', action: 'Inbound Inquiry: "Requesting API Docs"', type: 'Intent', score: '+35' },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-center gap-6 pl-10 group">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 group-hover:border-indigo-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
                    </div>
                    <div className="flex-1 flex items-center justify-between py-1">
                      <div>
                        <p className="text-xs font-bold text-slate-700">{item.action}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.type} • {item.time}</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
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