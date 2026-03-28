"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  ChevronRight, 
  Plus, 
  Info, 
  Save, 
  Trash2,
  Check,
  X,
  Fingerprint,
  Key,
  Database,
  Globe,
  Settings
} from 'lucide-react';

const App = () => {
  const [activeRole, setActiveRole] = useState(1);

  const roles = [
    { id: 1, name: 'Super Admin', description: 'Full access to all system resources and settings.', userCount: 3, level: 'Primary' },
    { id: 2, name: 'Editor', description: 'Can manage content but cannot change system configurations.', userCount: 12, level: 'Secondary' },
    { id: 3, name: 'Support', description: 'Access to customer data and tickets, no billing access.', userCount: 8, level: 'Secondary' },
    { id: 4, name: 'Viewer', description: 'Read-only access across the entire dashboard.', userCount: 45, level: 'Guest' },
  ];

  const permissionCategories = [
    {
      title: 'User Management',
      icon: <Users size={18} />,
      permissions: [
        { id: 'u1', label: 'Create New Users', desc: 'Allow creating internal and external accounts' },
        { id: 'u2', label: 'Edit User Roles', desc: 'Modify permissions for existing members' },
        { id: 'u3', label: 'Delete User Accounts', desc: 'Permanent removal of user data' },
      ]
    },
    {
      title: 'Database Access',
      icon: <Database size={18} />,
      permissions: [
        { id: 'd1', label: 'Export Sensitive Data', desc: 'Generate CSV/JSON exports of PII data' },
        { id: 'd2', label: 'Modify Schema', desc: 'Update table structures and relationships' },
        { id: 'd3', label: 'API Key Generation', desc: 'Create and revoke system API credentials' },
      ]
    },
    {
      title: 'System Settings',
      icon: <Settings size={18} />,
      permissions: [
        { id: 's1', label: 'Global Branding', desc: 'Change logo, colors, and site-wide styles' },
        { id: 's2', label: 'Billing & Invoices', desc: 'Access to subscription and payment methods' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                <Lock size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Access Control</h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">Define roles and manage granular permissions for your organization.</p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
            <Plus size={16} /> Create Custom Role
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Role List */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Available Roles</h3>
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`cursor-pointer group relative p-5 rounded-[2rem] border transition-all duration-300 ${
                  activeRole === role.id 
                    ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-50/50 translate-x-2' 
                    : 'bg-white/50 border-slate-100 hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-xl ${activeRole === role.id ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Users size={12} /> {role.userCount}
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${activeRole === role.id ? 'rotate-90 text-indigo-400' : 'text-slate-300'}`} />
                  </div>
                </div>
                <h4 className={`font-black text-sm mb-1 ${activeRole === role.id ? 'text-indigo-900' : 'text-slate-800'}`}>{role.name}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{role.description}</p>
                
                {activeRole === role.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                )}
              </div>
            ))}
            
            <div className="p-6 bg-slate-900 rounded-[2rem] text-white mt-8 overflow-hidden relative group">
                <div className="relative z-10">
                    <Fingerprint className="text-indigo-400 mb-4" size={32} />
                    <h5 className="font-bold text-sm mb-1">Security Audit</h5>
                    <p className="text-[11px] text-slate-400 mb-4">Review which roles have high-level database destructive permissions.</p>
                    <button className="w-full py-2.5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all">Run Report</button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
            </div>
          </div>

          {/* Right Column: Permission Matrix */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full">
              
              {/* Editor Header */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                    <Key size={24} className="text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800">Permissions Matrix</h2>
                    <p className="text-xs font-bold text-slate-400">Editing: <span className="text-indigo-600">{roles.find(r => r.id === activeRole)?.name}</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                    <Trash2 size={18} />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Permission List */}
              <div className="p-8 space-y-10 overflow-y-auto">
                {permissionCategories.map((cat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                        {cat.icon}
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">{cat.title}</h3>
                      <div className="h-px flex-1 bg-slate-50 ml-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.permissions.map((perm) => (
                        <div key={perm.id} className="group flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-slate-100 border border-transparent hover:border-slate-100 transition-all">
                          <div className="flex-1 pr-4">
                            <p className="text-sm font-black text-slate-700 mb-0.5">{perm.label}</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-tight">{perm.desc}</p>
                          </div>
                          
                          {/* Custom Toggle Switch */}
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={activeRole === 1} />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Banner */}
              <div className="m-8 mt-auto p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                <Info size={16} className="text-indigo-500 mt-0.5" />
                <p className="text-[10px] font-bold text-indigo-700 leading-relaxed">
                  Careful: Changes made to this role will affect {roles.find(r => r.id === activeRole)?.userCount} active users immediately. We recommend notifying them before revoking major access keys.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Global Access Summary */}
        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white border border-slate-100 rounded-[2.5rem] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
               <Globe size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Current Scope</p>
              <h4 className="text-sm font-black text-slate-800">Global (All Regions)</h4>
            </div>
          </div>
          <div className="flex-1 bg-white border border-slate-100 rounded-[2.5rem] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
               <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Last Audit</p>
              <h4 className="text-sm font-black text-slate-800">March 12, 2024 • 14:20</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;