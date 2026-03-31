"use client";

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Rocket, 
  Calendar, 
  Cpu, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Globe, 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  Bot,
  Scale,
  Users,
  CreditCard,
  Network,
  ShieldAlert,
  Search,
  ZapOff,
  BarChart3,
  Workflow
} from 'lucide-react';

// Interfaces for strict typing
interface RoadmapItem {
  id: number;
  title: string;
  category: 'AI Agent' | 'Gen-AI' | 'AI Analytics' | 'Core ERP' | 'Infrastructure';
  desc: string;
  status: 'Discovery' | 'In Development' | 'Testing' | 'Beta';
  deployment: string;
  impact: 'Standard' | 'High' | 'Critical' | 'Disruptive';
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const roadmapItems: RoadmapItem[] = [
    // --- 10 NEW AI AGENTS & FEATURES ---
    {
      id: 101,
      title: "Autonomous Procurement Agent",
      category: "AI Agent",
      desc: "An agent that monitors stock levels, negotiates with pre-approved vendor APIs for best pricing, and prepares POs autonomously.",
      status: "In Development",
      deployment: "Q1 2026",
      impact: "Disruptive",
      icon: <Workflow size={20} />
    },
    {
      id: 102,
      title: "AI Payroll Compliance Auditor",
      category: "AI Agent",
      desc: "Continuously scans global labor laws and internal payroll runs to flag potential compliance risks before payments are released.",
      status: "Discovery",
      deployment: "Q2 2026",
      impact: "Critical",
      icon: <ShieldAlert size={20} />
    },
    {
      id: 103,
      title: "Logicore Vision: Receipt OCR 2.0",
      category: "AI Analytics",
      desc: "Next-gen multi-modal engine that understands handwritten notes on receipts and automatically categorizes tax-deductible expenses.",
      status: "Testing",
      deployment: "Q4 2025",
      impact: "High",
      icon: <Search size={20} />
    },
    {
      id: 104,
      title: "AI Support Sentinel",
      category: "AI Agent",
      desc: "External-facing agent that resolves 70% of customer billing inquiries by accessing real-time ledger data securely.",
      status: "Beta",
      deployment: "Q1 2026",
      impact: "High",
      icon: <MessageSquare size={20} />
    },
    {
      id: 105,
      title: "Semantic Financial Search",
      category: "Gen-AI",
      desc: "Vector-based search across all enterprise documents, allowing queries like 'Why did logistics costs spike in June?'",
      status: "Discovery",
      deployment: "Q3 2026",
      impact: "High",
      icon: <BrainCircuit size={20} />
    },
    {
      id: 106,
      title: "AI Debt Collection Orchestrator",
      category: "AI Agent",
      desc: "Analyzes debtor behavior to determine the best time/channel (Email vs SMS) to send reminders, maximizing recovery rates.",
      status: "In Development",
      deployment: "Q2 2026",
      impact: "Critical",
      icon: <TrendingUp size={20} />
    },
    {
      id: 107,
      title: "Predictive Churn Guard",
      category: "AI Analytics",
      desc: "Identifies B2B customers showing signs of account cooling based on ordering patterns and support ticket sentiment.",
      status: "In Development",
      deployment: "Q4 2026",
      impact: "High",
      icon: <BarChart3 size={20} />
    },
    {
      id: 108,
      title: "Autonomous Ledger Reconciler",
      category: "AI Agent",
      desc: "Real-time AI matching of bank feeds to invoices with 99.9% accuracy, handling complex split-payments without human input.",
      status: "Testing",
      deployment: "Q3 2026",
      impact: "Disruptive",
      icon: <Zap size={20} />
    },
    {
      id: 109,
      title: "AI Talent Pipeline Optimizer",
      category: "AI Agent",
      desc: "Automatically sources and screens candidates from external job boards based on internal successful hire profiles.",
      status: "Discovery",
      deployment: "Q1 2027",
      impact: "High",
      icon: <Users size={20} />
    },
    {
      id: 110,
      title: "Graph-Based Risk Analysis",
      category: "AI Analytics",
      desc: "Uses graph neural networks to visualize relationships between suppliers and identify hidden supply chain vulnerabilities.",
      status: "In Development",
      deployment: "Q2 2027",
      impact: "Critical",
      icon: <Network size={20} />
    },

    // --- 5 NEW CORE FEATURES ---
    {
      id: 201,
      title: "Multi-Entity Consolidation",
      category: "Core ERP",
      desc: "Instant one-click reporting across parent companies and global subsidiaries with automatic inter-company eliminations.",
      status: "In Development",
      deployment: "Q4 2025",
      impact: "Critical",
      icon: <Layers size={20} />
    },
    {
      id: 202,
      title: "Advanced VAT/GST Engine",
      category: "Core ERP",
      desc: "Native support for complex tax jurisdictions in over 45 countries with automatic filing preparation.",
      status: "Testing",
      deployment: "Q1 2026",
      impact: "High",
      icon: <Scale size={20} />
    },
    {
      id: 203,
      title: "Dynamic Fixed Asset Tracker",
      category: "Core ERP",
      desc: "Complete lifecycle management from acquisition to disposal with automated depreciation and maintenance scheduling.",
      status: "Discovery",
      deployment: "Q2 2026",
      impact: "Standard",
      icon: <BarChart3 size={20} />
    },
    {
      id: 204,
      title: "Wholesale B2B Portal",
      category: "Core ERP",
      desc: "Self-service dashboard for distributors to place bulk orders, check live inventory, and manage credit limits.",
      status: "Beta",
      deployment: "Q4 2025",
      impact: "High",
      icon: <Globe size={20} />
    },
    {
      id: 205,
      title: "Real-Time Payment Rails",
      category: "Core ERP",
      desc: "Direct integration with FedNow and SEPA Instant for immediate cross-border payment settlement within the ERP.",
      status: "In Development",
      deployment: "Q3 2026",
      impact: "Critical",
      icon: <CreditCard size={20} />
    },

    // --- ORIGINAL FEATURES ---
    {
      id: 1,
      title: "Predictive Cash Flow",
      category: "AI Analytics",
      desc: "AI-driven engine that analyzes historical bank data to predict future liquidity and flag potential cash crunches.",
      status: "In Development",
      deployment: "Q3 2026",
      impact: "Critical",
      icon: <TrendingUp size={20} />
    },
    {
      id: 3,
      title: "Logicore AI Chat Co-Pilot",
      category: "Gen-AI",
      desc: "A natural language interface allowing users to type 'Show me sales' and get instant visual charts.",
      status: "Discovery",
      deployment: "Q4 2026",
      impact: "Disruptive",
      icon: <Bot size={20} />
    }
  ];

  const filteredItems = useMemo(() => {
    if (filter === 'All') return roadmapItems;
    if (filter === 'AI Agents') return roadmapItems.filter(item => item.category === 'AI Agent');
    if (filter === 'AI Analytics') return roadmapItems.filter(item => item.category === 'AI Analytics' || item.category === 'Gen-AI');
    return roadmapItems.filter(item => item.category === 'Core ERP');
  }, [filter, roadmapItems]);

  const stats = [
    { label: 'AI Agents', value: roadmapItems.filter(i => i.category === 'AI Agent').length.toString() },
    { label: 'Total Initiatives', value: roadmapItems.length.toString() },
    { label: 'Release Velocity', value: '+42%' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200">
                <Rocket size={28} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Vision 2026/27</h1>
            </div>
            <p className="text-slate-500 text-lg font-medium">Logicore Enterprise Ecosystem: Engineering the era of Autonomous Business.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm">
            {['All', 'AI Agents', 'AI Analytics', 'Core ERP'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Zap size={24} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white border border-slate-200 rounded-[2.5rem] p-7 shadow-sm relative overflow-hidden group hover:border-indigo-400 transition-all duration-300 flex flex-col h-full ${
                item.impact === 'Disruptive' ? 'ring-2 ring-indigo-500/10' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  item.category.includes('AI') ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.category}
                </span>
                <div className={`flex items-center gap-1 ${item.impact === 'Disruptive' ? 'text-indigo-600' : 'text-amber-500'}`}>
                  <Sparkles size={14} />
                  <span className="text-[10px] font-black uppercase">{item.impact}</span>
                </div>
              </div>

              <div className="flex-grow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  item.category.includes('AI') ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-400">{item.deployment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'Testing' || item.status === 'Beta' ? 'bg-emerald-500 animate-pulse' : 
                    item.status === 'In Development' ? 'bg-amber-400' : 'bg-indigo-400'
                  }`} />
                  <span className="text-[10px] font-black uppercase text-slate-500">{item.status}</span>
                </div>
              </div>

              {/* Decorative Subtle Gradient for Agents */}
              {item.category === 'AI Agent' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              )}
            </div>
          ))}

          {/* Call to Action Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center group">
             <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Bot size={32} />
             </div>
             <h3 className="text-2xl font-black mb-3">Request a Custom Agent</h3>
             <p className="text-indigo-100 text-sm mb-8 opacity-80 font-medium">Have a specific workflow that needs automation? Our engineering team builds bespoke agents for Enterprise partners.</p>
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Inquire About Customization
             </button>
          </div>
        </div>
      </div>
      
      {/* Dynamic Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-subtle-bounce {
          animation: subtle-bounce 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default App;