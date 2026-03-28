"use client";

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Smartphone, 
  Key, 
  Database, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Zap, 
  ShieldCheck,
  RefreshCw,
  Settings,
  SendHorizontal,
  Hash,
  Eye,
  EyeOff
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('gateway');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const handleTestSms = () => {
    setIsTesting(true);
    setTestSuccess(false);
    setTimeout(() => {
      setIsTesting(false);
      setTestSuccess(true);
    }, 1800);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
        activeTab === id 
        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-indigo-600 rounded-full"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600">Communication Hub</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">SMS Gateway</h1>
              <p className="text-slate-500 font-medium">Configure Twilio, Vonage, or Custom HTTP SMS providers.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-sm">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Credits Remaining</p>
                  <p className="text-lg font-black text-indigo-600">42,850</p>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
                Update Settings
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border border-slate-200 rounded-t-[2rem] flex overflow-hidden shadow-sm">
          <TabButton id="gateway" label="Gateway" icon={Database} />
          <TabButton id="sender" label="Sender ID" icon={Hash} />
          <TabButton id="templates" label="Templates" icon={MessageSquare} />
        </div>

        {/* Main Content Area */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-[2rem] p-8 md:p-12 shadow-sm mb-10">
          
          {activeTab === 'gateway' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="flex justify-between items-start">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-bold mb-2">Primary Gateway API</h3>
                  <p className="text-slate-500 text-sm">Select your SMS provider and input the required API credentials.</p>
                </div>
                <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Zap size={12} fill="currentColor" />
                  Premium API
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Provider</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer">
                    <option>Twilio</option>
                    <option>Vonage (Nexmo)</option>
                    <option>MessageBird</option>
                    <option>Custom HTTP API</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Account SID / API Key</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type={showApiKey ? "text" : "password"} 
                      defaultValue="AC7d55e884523b08e2392" 
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all" 
                    />
                    <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Webhook URL (Status Callbacks)</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="https://api.company.com/v1/webhooks/sms-status" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Test Delivery</h4>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" placeholder="+1 (555) 000-0000" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all" />
                  </div>
                  <button 
                    onClick={handleTestSms}
                    disabled={isTesting}
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 min-w-[200px]"
                  >
                    {isTesting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <SendHorizontal size={16} />}
                    {isTesting ? 'Sending...' : 'Send Test SMS'}
                  </button>
                </div>
                {testSuccess && (
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-bold animate-in slide-in-from-top-2">
                    <CheckCircle2 size={16} />
                    Message sent successfully! Check your device.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'sender' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold mb-2">Sender Information</h3>
                <p className="text-slate-500 text-sm">Define the Alphanumeric Sender ID or Virtual Number used for outgoing texts.</p>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Sender ID</label>
                    <input type="text" defaultValue="CORP_NOTIFY" maxLength={11} className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:border-indigo-600 outline-none transition-all font-mono" />
                    <p className="text-[10px] text-slate-400 italic">Max 11 characters. Some countries require registration.</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fallback Virtual Number</label>
                    <input type="text" defaultValue="+12025550192" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:border-indigo-600 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm text-amber-800 font-medium">Regulation Alert: US/Canada traffic requires 10DLC or Toll-Free verification to avoid filtering.</p>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">System SMS Templates</h3>
                    <p className="text-slate-500 text-sm">Pre-defined messages for automated triggers.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                    + New Template
                  </button>
               </div>

               <div className="space-y-4">
                 {[
                   { name: 'OTP Verification', body: 'Your code is {code}. Valid for 5 minutes.', vars: '{code}' },
                   { name: 'Welcome Message', body: 'Hi {name}, welcome to the platform! Let us know if you need help.', vars: '{name}' },
                   { name: 'Payment Reminder', body: 'Friendly reminder: Your invoice {id} for {amount} is due tomorrow.', vars: '{id}, {amount}' }
                 ].map((tmpl, i) => (
                   <div key={i} className="group p-6 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all flex justify-between items-center">
                     <div className="space-y-1">
                       <h4 className="font-bold text-slate-900">{tmpl.name}</h4>
                       <p className="text-sm text-slate-500 font-mono text-xs italic">{tmpl.body}</p>
                       <div className="flex gap-2 pt-2">
                         {tmpl.vars.split(', ').map(v => (
                           <span key={v} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase">{v}</span>
                         ))}
                       </div>
                     </div>
                     <button className="p-3 text-slate-300 hover:text-indigo-600 transition-colors">
                       <Settings size={18} />
                     </button>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white relative overflow-hidden group">
            <CreditCard className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-700" size={160} />
            <div className="relative z-10">
              <h4 className="text-lg font-black mb-2">Auto-Recharge</h4>
              <p className="text-indigo-200 text-sm mb-6 leading-relaxed max-w-[240px]">Automatically top up your balance when it falls below 5,000 credits.</p>
              <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">Enable Wallet</button>
            </div>
          </div>
          <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900">Compliance Check</h4>
                <p className="text-xs text-slate-500 font-medium">GDPR & TCPA compliant settings active.</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span>Monthly Delivery Rate</span>
                <span className="text-emerald-500">99.2%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.2%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;