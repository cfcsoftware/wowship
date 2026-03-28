"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  ShieldCheck, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Plus, 
  ChevronRight,
  Info,
  CheckCircle2,
  CreditCard,
  Wallet,
  Globe,
  Zap,
  Shield,
  LayoutGrid
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('grid');
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Updated gateways with Icon components instead of URL strings
  const gateways = [
    { 
      id: 'stripe', 
      name: 'Stripe', 
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />, 
      status: 'Active', 
      setup: 'Completed', 
      color: 'bg-indigo-50', 
      border: 'border-indigo-100',
      text: 'Global infrastructure for internet economy payments and recurring billing.' 
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: <Wallet className="w-6 h-6 text-blue-600" />, 
      status: 'Inactive', 
      setup: 'Pending', 
      color: 'bg-blue-50', 
      border: 'border-blue-100',
      text: 'The faster, safer way to send money and make online payments globally.' 
    },
    { 
      id: 'razorpay', 
      name: 'Razorpay', 
      icon: <Zap className="w-6 h-6 text-sky-500" />, 
      status: 'Active', 
      setup: 'Completed', 
      color: 'bg-sky-50', 
      border: 'border-sky-100',
      text: 'Cleanest API for businesses to accept, process and disburse payments.' 
    },
    { 
      id: 'payu', 
      name: 'PayU', 
      icon: <Shield className="w-6 h-6 text-lime-600" />, 
      status: 'Inactive', 
      setup: 'Not Started', 
      color: 'bg-lime-50', 
      border: 'border-lime-100',
      text: 'Leading financial services provider in global growth markets.' 
    },
    { 
      id: 'ccavenue', 
      name: 'CCAvenue', 
      icon: <Globe className="w-6 h-6 text-red-600" />, 
      status: 'Inactive', 
      setup: 'Not Started', 
      color: 'bg-red-50', 
      border: 'border-red-100',
      text: 'Authorized by major banks to provide secure online payment services.' 
    },
    { 
      id: 'instamojo', 
      name: 'Instamojo', 
      icon: <LayoutGrid className="w-6 h-6 text-purple-600" />, 
      status: 'Active', 
      setup: 'Completed', 
      color: 'bg-purple-50', 
      border: 'border-purple-100',
      text: 'The easiest way to collect payments and sell products online instantly.' 
    },
  ];

  const handleConfigure = (gateway) => {
    setSelectedGateway(gateway);
    setView('configure');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGateways = gateways.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {view === 'grid' ? (
          <div className="animate-in fade-in duration-700">
            {/* Context Header */}
            <div className="flex items-center gap-3 mb-8">
               <div className="h-[2px] w-10 bg-blue-600 rounded-full"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">Integrations Engine</span>
            </div>

            {/* Main Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                  Payment Gateways
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  Centralize your financial stack. Connect, test, and deploy global payment providers in a few clicks.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative group flex-1 md:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search providers..." 
                    className="w-full md:w-72 pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 whitespace-nowrap">
                  <Plus size={18} strokeWidth={3} />
                  Request Integration
                </button>
              </div>
            </div>

            {/* Gateway Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGateways.map((gw) => (
                <div 
                  key={gw.id} 
                  className="group bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-blue-500 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.12)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className={`w-16 h-16 rounded-[1.25rem] ${gw.color} ${gw.border} border flex items-center justify-center shadow-sm`}>
                      {gw.icon}
                    </div>
                    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${
                      gw.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${gw.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{gw.status}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{gw.name}</h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-10 flex-grow font-medium relative z-10">
                    {gw.text}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-auto relative z-10">
                    <div className="flex items-center gap-2.5">
                       <CheckCircle2 size={16} className={gw.setup === 'Completed' ? 'text-emerald-500' : 'text-slate-200'} />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{gw.setup}</span>
                    </div>
                    <button 
                      onClick={() => handleConfigure(gw)}
                      className="px-5 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-xs font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 group/btn"
                    >
                      Config
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Subtle Background Pattern */}
                  <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                     {React.cloneElement(gw.icon, { size: 140, className: "" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-4xl mx-auto">
            {/* Detail Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setView('grid')}
                  className="w-14 h-14 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50/50 transition-all shadow-sm"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${selectedGateway.color} ${selectedGateway.border} border flex items-center justify-center`}>
                    {selectedGateway.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">Configure {selectedGateway.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                       <Lock size={12} className="text-slate-400" />
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">End-to-End Encrypted Tunnel</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setView('grid')} className="px-6 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors">
                  Discard
                </button>
                <button className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:translate-y-0">
                  Save Gateway
                </button>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-10">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm relative overflow-hidden">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-14 pb-8 border-b border-slate-50">
                    <div className="max-w-md">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">API Authentication</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Provide your integration credentials. We recommend using restricted API keys for better security.</p>
                    </div>
                    <div className="inline-flex p-1.5 bg-slate-100 rounded-[1.25rem] self-start md:self-center">
                      <button className="px-8 py-2.5 bg-white rounded-xl text-[11px] font-black text-slate-900 shadow-sm uppercase tracking-wider transition-all">Test Mode</button>
                      <button className="px-8 py-2.5 rounded-xl text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-all">Production</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Merchant ID</label>
                      <input 
                        type="text" 
                        defaultValue="ACC_8820_JK_4" 
                        className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-mono text-[13px]" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Public Key</label>
                      <input 
                        type="text" 
                        defaultValue="pk_test_v1_00293_xyz_8829" 
                        className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-mono text-[13px]" 
                      />
                    </div>
                 </div>

                 <div className="space-y-4 mb-14">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Secret Access Key</label>
                    <div className="relative group">
                      <input 
                        type={showKey ? "text" : "password"}
                        defaultValue="sk_test_51MzS2GkX92asdf88asdf99213_HIDDEN_VAL"
                        className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-mono text-[13px] pr-16"
                      />
                      <button 
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-xl shadow-sm border border-slate-50"
                      >
                        {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                 </div>

                 <div className="flex items-start gap-5 p-8 bg-blue-50/40 rounded-[2rem] border border-blue-100/50">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50 shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1.5">Zero-Knowledge Storage</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Your credentials are never stored in our logs or telemetry. They are encrypted at the edge and passed directly to {selectedGateway.name} during the authentication handshake.
                      </p>
                    </div>
                 </div>
              </div>

              {/* Advanced Hooks */}
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400 border border-slate-100">
                    <Settings size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Platform Webhooks</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 gap-6 hover:bg-white hover:border-blue-200 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900 leading-none mb-1.5">Real-time Transaction Sync</p>
                        <p className="text-sm text-slate-400 font-medium">Capture webhooks for success, failure, and refund events.</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;