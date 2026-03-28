"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Languages, 
  Clock, 
  Coins, 
  ChevronRight, 
  Search, 
  Plus, 
  Check, 
  AlertCircle,
  MoreVertical,
  ExternalLink,
  Save,
  RefreshCw,
  Zap
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('Languages');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Languages', value: '12', color: 'bg-indigo-600' },
    { label: 'Translation Health', value: '94%', color: 'bg-emerald-500' },
    { label: 'Untranslated Keys', value: '142', color: 'bg-amber-500' },
  ];

  const languages = [
    { code: 'en-US', name: 'English (US)', status: 'Primary', progress: 100, users: '14.2k' },
    { code: 'es-ES', name: 'Spanish (Spain)', status: 'Active', progress: 98, users: '3.1k' },
    { code: 'fr-FR', name: 'French (France)', status: 'Active', progress: 92, users: '2.4k' },
    { code: 'de-DE', name: 'German (Germany)', status: 'Beta', progress: 75, users: '890' },
    { code: 'ja-JP', name: 'Japanese', status: 'In Progress', progress: 42, users: '12' },
  ];

  const regionalSettings = [
    { label: 'Time Zone', value: '(GMT-08:00) Pacific Time', icon: <Clock size={18}/> },
    { label: 'Default Currency', value: 'USD ($)', icon: <Coins size={18}/> },
    { label: 'Date Format', value: 'DD/MM/YYYY', icon: <Globe size={18}/> },
    { label: 'First Day of Week', value: 'Monday', icon: <Languages size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Globe size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Localization</h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">Manage languages, regional formats, and translation workflows.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all">
              <RefreshCw size={16} /> Sync Keys
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              <Plus size={16} /> Add Language
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">{stat.value}</span>
                <div className={`h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden`}>
                  <div className={`h-full ${stat.color}`} style={{ width: stat.value.includes('%') ? stat.value : '100%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Language Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-lg font-black">Active Languages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search codes..." 
                    className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium outline-none focus:ring-2 ring-indigo-100 w-48"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {languages.map((lang, i) => (
                  <div key={i} className="group p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-[10px] text-slate-500">
                        {lang.code.split('-')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm">{lang.name}</p>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                            lang.status === 'Primary' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {lang.status}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">{lang.users} Active Users</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:block w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Translation</span>
                          <span className="text-[10px] font-black">{lang.progress}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${lang.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-400'}`} 
                            style={{ width: `${lang.progress}%` }}
                          />
                        </div>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-slate-50/50 border-t border-slate-50 text-center">
                <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">
                  View All Supported Locales
                </button>
              </div>
            </div>

            {/* Translation Workflow Tool */}
            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-indigo-300">
                  <Zap size={16} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Localization</span>
                </div>
                <h3 className="text-xl font-black mb-2">Automate missing translations</h3>
                <p className="text-indigo-200/70 text-sm font-medium mb-6 max-w-sm">
                  Use our machine learning engine to pre-fill untranslated keys across all 12 active locales.
                </p>
                <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all">
                  Start Auto-Translate
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-800/50 to-transparent flex items-center justify-center">
                <Languages size={120} className="text-indigo-800/30 -rotate-12" />
              </div>
            </div>
          </div>

          {/* Sidebar - Regional Defaults */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Regional Defaults</h3>
              <div className="space-y-8">
                {regionalSettings.map((setting, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        {setting.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{setting.label}</p>
                        <p className="text-sm font-bold">{setting.value}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                <Save size={16} /> Save Changes
              </button>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 text-rose-600 mb-4">
                <AlertCircle size={20} />
                <h4 className="font-black text-sm">Critical Warning</h4>
              </div>
              <p className="text-rose-900/60 text-[13px] font-medium leading-relaxed">
                Changing your <strong className="text-rose-700">Primary Language</strong> will invalidate cached translations for all end-users globally. This action cannot be undone.
              </p>
              <button className="mt-6 text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Learn more <ExternalLink size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;