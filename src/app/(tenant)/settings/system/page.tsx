"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Zap, 
  Cloud, 
  Moon, 
  Palette, 
  Save, 
  RefreshCw,
  Mail,
  Smartphone,
  Database,
  Lock,
  Eye,
  Trash2,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <Zap size={18} /> },
    { id: 'billing', label: 'Plans & Billing', icon: <Cloud size={18} /> },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-200">
                <Settings size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">System Configuration</h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">Global environment variables and platform-wide preferences.</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              saving ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {saving ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saving ? 'Saved' : 'Save Changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-4">Preference Panels</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}

            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
              <RefreshCw className="mb-4 opacity-50" size={24} />
              <h4 className="text-xs font-black uppercase tracking-wider mb-1">System Health</h4>
              <p className="text-[11px] text-indigo-100 leading-relaxed mb-4">All services are currently operational across 4 regions.</p>
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[98%]" />
              </div>
            </div>
          </div>

          {/* Settings Panel Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              
              {/* Profile/Branding Section */}
              <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Workspace Branding</h3>
                  <div className="h-px flex-1 bg-slate-50 ml-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 ml-1">Workspace Name</label>
                    <input 
                      type="text" 
                      defaultValue="Nexus Analytics Pro"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 ml-1">Support Email</label>
                    <input 
                      type="email" 
                      defaultValue="ops@nexus-pro.io"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
                       <Palette className="text-indigo-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-slate-800">Platform Logo</h4>
                      <p className="text-[11px] text-slate-400 font-medium">SVG or PNG, max 2MB. Recommended 512x512px.</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Upload New</button>
                  </div>
                </div>
              </section>

              {/* Maintenance & Environment Section */}
              <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                 <div className="flex items-center gap-2 mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Environment & Traffic</h3>
                  <div className="h-px flex-1 bg-slate-50 ml-2" />
                </div>

                <div className="space-y-4">
                   {/* Toggle Row */}
                   <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Lock size={20}/></div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Maintenance Mode</p>
                        <p className="text-[10px] text-slate-400 font-medium">Redirect all traffic to a static "Coming Back Soon" page.</p>
                      </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Toggle Row */}
                  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Database size={20}/></div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Query Caching</p>
                        <p className="text-[10px] text-slate-400 font-medium">Use Redis to cache frequent database reads for performance.</p>
                      </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Input Select Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-900 rounded-3xl mt-4">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="p-3 bg-white/10 text-white rounded-xl"><Globe size={20}/></div>
                      <div>
                        <p className="text-sm font-black text-white">Primary Data Region</p>
                        <p className="text-[10px] text-slate-400 font-medium">Physical location of your main clusters.</p>
                      </div>
                    </div>
                    <select className="bg-white/10 text-white text-xs font-bold border border-white/20 p-3 rounded-xl focus:outline-none">
                      <option className="text-slate-900">us-east-1 (N. Virginia)</option>
                      <option className="text-slate-900">eu-central-1 (Frankfurt)</option>
                      <option className="text-slate-900">ap-southeast-1 (Singapore)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Advanced Destruction Area */}
              <section className="bg-rose-50/30 border border-rose-100 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-rose-800">Danger Zone</h3>
                  <div className="h-px flex-1 bg-rose-100 ml-2" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-sm font-black text-rose-900">Purge System Logs</h4>
                    <p className="text-[11px] text-rose-700/60 font-medium leading-relaxed">Permanently delete all activity logs older than 90 days. This action cannot be undone.</p>
                  </div>
                  <button className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
                    <Trash2 size={14} /> Clear History
                  </button>
                </div>
              </section>

            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Build v4.2.0-stable • Last Sync: Today 14:02</p>
        </div>

      </div>
    </div>
  );
};

export default App;