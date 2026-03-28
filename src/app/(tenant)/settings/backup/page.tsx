"use client";

import React, { useState } from 'react';
import { 
  Database, 
  Cloud, 
  HardDrive, 
  History, 
  RefreshCcw, 
  ShieldCheck, 
  Download, 
  UploadCloud, 
  Trash2, 
  Settings2,
  AlertTriangle,
  ChevronRight,
  Clock,
  ArrowRight,
  CheckCircle2,
  Activity
} from 'lucide-react';

const App = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const stats = [
    { label: 'Storage Used', value: '42.8 GB', sub: 'of 100GB Plan', color: 'bg-emerald-500' },
    { label: 'Last Backup', value: '2h ago', sub: 'Success', color: 'bg-indigo-500' },
    { label: 'Retention Policy', value: '30 Days', sub: 'Rolling Snapshots', color: 'bg-amber-500' },
  ];

  const backups = [
    { id: 'BK-9021', date: 'Oct 24, 2023 14:00', size: '1.2 GB', type: 'Automated', status: 'Healthy' },
    { id: 'BK-8842', date: 'Oct 23, 2023 14:00', size: '1.1 GB', type: 'Manual', status: 'Healthy' },
    { id: 'BK-8711', date: 'Oct 22, 2023 14:00', size: '1.2 GB', type: 'Automated', status: 'Healthy' },
    { id: 'BK-8604', date: 'Oct 21, 2023 14:00', size: '1.1 GB', type: 'Automated', status: 'Corrupt' },
  ];

  const runBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Backup & Restore</h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">Secure your data with automated snapshots and multi-region redundancy.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Settings2 size={16} /> Config
            </button>
            <button 
              onClick={runBackup}
              disabled={isBackingUp}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold shadow-lg transition-all ${
                isBackingUp ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800'
              }`}
            >
              {isBackingUp ? <RefreshCcw size={16} className="animate-spin" /> : <UploadCloud size={16} />}
              {isBackingUp ? 'Uploading...' : 'Backup Now'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group hover:border-emerald-100 transition-colors">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.sub}</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: '65%' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Backups Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="text-slate-400" size={18} />
                  <h2 className="text-lg font-black">Snapshot History</h2>
                </div>
                <button className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-700">View All Logs</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-8 py-4">Snapshot ID</th>
                      <th className="px-8 py-4">Created At</th>
                      <th className="px-8 py-4">Size</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {backups.map((bk, i) => (
                      <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <Database size={14} className="text-slate-300" />
                            <span className="text-xs font-bold text-slate-700">{bk.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-xs font-medium text-slate-500">{bk.date}</td>
                        <td className="px-8 py-5 text-xs font-bold text-slate-600">{bk.size}</td>
                        <td className="px-8 py-5">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                            bk.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {bk.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                              <Download size={14} />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-rose-600 transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Restore Logic */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <Activity size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Disaster Recovery</span>
                </div>
                <h3 className="text-xl font-black mb-2">Instant Point-in-Time Restore</h3>
                <p className="text-slate-400 text-sm font-medium mb-6 max-w-sm">
                  Roll back your entire infrastructure to a specific second without downtime. Perfect for recovery from accidental deletions.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-400 transition-all flex items-center gap-2">
                    Enter Recovery Mode <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-80 h-full flex items-center justify-end pr-8 opacity-20 group-hover:opacity-30 transition-opacity">
                <RefreshCcw size={160} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Sidebar - Storage Locations */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Storage Destinations</h3>
              <div className="space-y-6">
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-500">
                    <Cloud size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black">AWS S3 (Primary)</p>
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">Region: us-east-1</p>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400">
                    <HardDrive size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black">Local Vault</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">San Francisco Data Center</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">Auto-Backup</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">Backup Frequency</span>
                  <span className="text-[11px] font-bold text-slate-800">Every 12 hours</span>
                </div>
              </div>
            </div>

            {/* Health Warning */}
            <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 text-amber-600 mb-4">
                <AlertTriangle size={20} />
                <h4 className="font-black text-sm">Storage Limit Near</h4>
              </div>
              <p className="text-amber-900/60 text-[13px] font-medium leading-relaxed">
                You are currently at <strong className="text-amber-700">85% of your allocated storage</strong>. To prevent backup failures, consider upgrading your plan or purging older snapshots.
              </p>
              <button className="mt-6 flex items-center gap-2 text-xs font-black text-amber-700 uppercase tracking-widest hover:gap-3 transition-all">
                Upgrade Storage <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;