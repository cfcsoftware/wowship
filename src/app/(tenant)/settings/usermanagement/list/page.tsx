"use client";

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  ChevronDown,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Settings
} from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Alex Rivera', email: 'alex.r@enterprise.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'AR' },
    { id: 2, name: 'Sarah Chen', email: 's.chen@enterprise.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago', avatar: 'SC' },
    { id: 3, name: 'Marcus Wright', email: 'm.wright@enterprise.com', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', avatar: 'MW' },
    { id: 4, name: 'Jordan Smith', email: 'j.smith@enterprise.com', role: 'Editor', status: 'Pending', lastActive: 'Never', avatar: 'JS' },
    { id: 5, name: 'Elena Rodriguez', email: 'e.rod@enterprise.com', role: 'Admin', status: 'Active', lastActive: '15 mins ago', avatar: 'ER' },
    { id: 6, name: 'David Kim', email: 'd.kim@enterprise.com', role: 'Viewer', status: 'Active', lastActive: '5 hours ago', avatar: 'DK' },
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return <ShieldCheck size={14} className="text-indigo-500" />;
      case 'Editor': return <Shield size={14} className="text-emerald-500" />;
      default: return <Shield size={14} className="text-slate-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Inactive': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Users size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">User Management</h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">Manage team permissions, invite new members, and monitor access logs.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
              <UserPlus size={16} /> Add New User
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Users', value: '1,284', grow: '+12%', color: 'text-indigo-600' },
            { label: 'Active Now', value: '432', grow: '+5%', color: 'text-emerald-600' },
            { label: 'Pending Invites', value: '18', grow: '-2%', color: 'text-amber-600' },
            { label: 'License Limit', value: '85%', grow: 'Critical', color: 'text-rose-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <div className="flex justify-between items-end">
                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 rounded-full text-slate-500">{stat.grow}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          
          {/* Table Controls */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, email or role..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all">
                <Filter size={16} /> Filter
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all">
                Status <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">User Details</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Last Active</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-black shadow-md shadow-indigo-100">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                            {user.name}
                            {user.role === 'Admin' && <ArrowUpRight size={12} className="text-indigo-400" />}
                          </p>
                          <p className="text-xs font-medium text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl w-fit border border-slate-100">
                        {getRoleIcon(user.role)}
                        <span className="text-xs font-bold text-slate-600">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight border ${getStatusStyle(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-slate-300" />
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="p-2.5 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                          <Settings size={16} />
                        </button>
                        <button className="p-2.5 hover:bg-white rounded-xl text-slate-400 hover:text-rose-600 hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-400">Showing 6 of 1,284 users</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-800 hover:bg-slate-50 shadow-sm transition-all">Next Page</button>
            </div>
          </div>
        </div>

        {/* Security Summary Footer */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white flex items-center gap-6 overflow-hidden relative group">
            <div className="relative z-10 flex-1">
              <h3 className="text-xl font-black mb-2">Two-Factor Authentication</h3>
              <p className="text-indigo-200 text-sm font-medium mb-4">84% of your users have enabled 2FA. We recommend making it mandatory.</p>
              <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">Update Policy</button>
            </div>
            <div className="relative z-10 w-24 h-24 bg-indigo-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck size={48} className="text-indigo-300" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-800/30 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 flex items-center gap-6">
            <div className="p-4 bg-white rounded-3xl shadow-sm text-rose-500">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 className="text-rose-900 font-black mb-1">Unusual Login Activity</h3>
              <p className="text-rose-900/60 text-sm font-medium mb-0 leading-snug">
                3 users flagged for multiple failed login attempts in the last 24 hours.
              </p>
              <button className="mt-3 text-[10px] font-black uppercase text-rose-600 tracking-widest hover:underline">Review Security Logs</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;