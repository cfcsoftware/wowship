"use client";

import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Search, 
  Plus, 
  Settings, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  ShoppingBag,
  Zap,
  Filter,
  MoreVertical,
  Activity,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'CRM', 'Marketing', 'E-commerce', 'Support', 'Developer'];

  const integrations = [
    { 
      id: 'hubspot', 
      name: 'HubSpot', 
      category: 'CRM', 
      status: 'Connected', 
      desc: 'Sync contacts and trigger automated workflows based on CRM activity.',
      icon: <Database className="text-orange-500" />
    },
    { 
      id: 'shopify', 
      name: 'Shopify', 
      category: 'E-commerce', 
      status: 'Connected', 
      desc: 'Send abandoned cart notifications and order updates directly to customers.',
      icon: <ShoppingBag className="text-emerald-500" />
    },
    { 
      id: 'slack', 
      name: 'Slack', 
      category: 'Support', 
      status: 'Available', 
      desc: 'Receive instant notifications for high-priority inbound messages.',
      icon: <MessageSquare className="text-purple-500" />
    },
    { 
      id: 'salesforce', 
      name: 'Salesforce', 
      category: 'CRM', 
      status: 'Available', 
      desc: 'Native integration for high-volume enterprise sales engagement.',
      icon: <Cloud className="text-sky-500" />
    },
    { 
      id: 'mailchimp', 
      name: 'Mailchimp', 
      category: 'Marketing', 
      status: 'Error', 
      desc: 'Automate list syncing and multi-channel campaign management.',
      icon: <Mail className="text-amber-500" />
    },
    { 
      id: 'zapier', 
      name: 'Zapier', 
      category: 'Developer', 
      status: 'Connected', 
      desc: 'Connect with 5,000+ apps through custom automated Zaps.',
      icon: <Zap className="text-orange-400" />
    }
  ];

  const filteredIntegrations = integrations.filter(item => 
    (filter === 'All' || item.category === filter) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-indigo-600 rounded-full"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600">Connectivity Hub</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">App Marketplace</h1>
            <p className="text-slate-500 font-medium">Extend your workspace capabilities with 50+ native integrations.</p>
          </div>
          
          <div className="flex bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  filter === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search apps, connectors, or services..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
            <Plus size={18} /> Request Integration
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredIntegrations.map((app) => (
            <div key={app.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-slate-50 rounded-[1.5rem] group-hover:bg-indigo-50 transition-colors">
                  {React.cloneElement(app.icon, { size: 32 })}
                </div>
                <div className="flex flex-col items-end">
                  {app.status === 'Connected' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                      <CheckCircle2 size={12} /> Live
                    </span>
                  )}
                  {app.status === 'Error' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase">
                      <AlertCircle size={12} /> Action Required
                    </span>
                  )}
                  {app.status === 'Available' && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase">
                      Available
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{app.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {app.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">JD</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">+2</div>
                </div>
                <button className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                  app.status === 'Connected' ? 'text-slate-400 hover:text-indigo-600' : 'text-indigo-600 hover:text-indigo-700'
                }`}>
                  {app.status === 'Connected' ? 'Manage' : 'Install Now'}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Monitoring Section */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <Activity className="text-indigo-400" size={24} />
                <h2 className="text-2xl font-bold tracking-tight">Data Sync Monitoring</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Monitor the health of your connected workflows. Last sync completed 4 minutes ago with 99.9% delivery success rate.
              </p>
              <div className="flex gap-4">
                <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Weekly Syncs</p>
                  <p className="text-lg font-bold">142,832</p>
                </div>
                <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Avg. Latency</p>
                  <p className="text-lg font-bold">124ms</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-white/5 rounded-[2rem] border border-white/10 p-6 space-y-4">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
                <span>Recent Activity</span>
                <button className="text-indigo-400 hover:text-indigo-300">View Logs</button>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Shopify Inventory Sync', time: '2m ago', color: 'bg-emerald-500' },
                  { label: 'HubSpot Lead Created', time: '14m ago', color: 'bg-emerald-500' },
                  { label: 'Mailchimp List Update', time: '1h ago', color: 'bg-amber-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-bold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <ShieldCheck className="text-indigo-600" size={16} />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Enterprise-Grade OAuth 2.0 Encryption</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Our integrations platform uses highly secure tunneling. We never store raw credentials and all data transitions are encrypted using AES-256 protocols.
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;