"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Mail, 
  AlertCircle, 
  Zap, 
  MessageSquare, 
  ShoppingBag, 
  Circle,
  Settings,
  ArrowUpRight,
  Clock,
  Calendar,
  X
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Unread', 'Mentions', 'System'];

  const notifications = [
    {
      id: 1,
      type: 'mention',
      user: 'Sarah Jenkins',
      action: 'mentioned you in',
      target: 'Q3 Growth Strategy',
      time: '2m ago',
      unread: true,
      avatar: 'SJ',
      color: 'bg-indigo-100 text-indigo-600',
      icon: <MessageSquare size={14} />
    },
    {
      id: 2,
      type: 'system',
      user: 'System',
      action: 'completed the',
      target: 'Monthly Data Export',
      time: '14m ago',
      unread: true,
      avatar: 'SYS',
      color: 'bg-slate-100 text-slate-600',
      icon: <Zap size={14} />
    },
    {
      id: 3,
      type: 'alert',
      user: 'Security Bot',
      action: 'detected a',
      target: 'New login from San Francisco, CA',
      time: '1h ago',
      unread: false,
      avatar: 'SEC',
      color: 'bg-rose-100 text-rose-600',
      icon: <AlertCircle size={14} />
    },
    {
      id: 4,
      type: 'order',
      user: 'Shopify Sync',
      action: 'processed',
      target: 'Order #88291 (High Value)',
      time: '3h ago',
      unread: false,
      avatar: 'SH',
      color: 'bg-emerald-100 text-emerald-600',
      icon: <ShoppingBag size={14} />
    },
    {
      id: 5,
      type: 'mention',
      user: 'David Chen',
      action: 'commented on',
      target: 'New Dashboard UI Kit',
      time: '5h ago',
      unread: false,
      avatar: 'DC',
      color: 'bg-indigo-100 text-indigo-600',
      icon: <MessageSquare size={14} />
    },
    {
      id: 6,
      type: 'system',
      user: 'Billing',
      action: 'successfully renewed',
      target: 'Enterprise Subscription',
      time: 'Yesterday',
      unread: false,
      avatar: '$$',
      color: 'bg-amber-100 text-amber-600',
      icon: <Mail size={14} />
    }
  ];

  const filteredNotifications = notifications.filter(notif => {
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Unread' && notif.unread) || 
      (activeTab === 'Mentions' && notif.type === 'mention') ||
      (activeTab === 'System' && notif.type === 'system');
    
    const matchesSearch = notif.target.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         notif.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBFDFF] text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Main Inbox Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-2">Notifications</h1>
              <p className="text-slate-500 text-sm font-medium">Stay updated with your team's latest activities.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Settings size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                <CheckCheck size={16} /> Mark all as read
              </button>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="bg-white border border-slate-200 rounded-3xl p-2 mb-6 flex flex-col md:flex-row items-center gap-2">
            <div className="flex p-1 bg-slate-50 rounded-2xl w-full md:w-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search notifications..." 
                className="w-full pl-11 pr-4 py-3 bg-transparent text-sm font-medium outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`group flex items-start gap-4 p-5 rounded-[2rem] border transition-all cursor-pointer ${
                    notif.unread 
                      ? 'bg-white border-indigo-100 shadow-sm' 
                      : 'bg-transparent border-transparent hover:bg-slate-50/80'
                  }`}
                >
                  <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm ${notif.color}`}>
                    {notif.avatar}
                    {notif.unread && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{notif.user}</span>
                      <span className="text-slate-400 text-sm">{notif.action}</span>
                      <span className="font-bold text-sm text-slate-800 truncate">{notif.target}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock size={12} /> {notif.time}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 uppercase">{notif.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100">
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-slate-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
                <p className="text-slate-500 text-sm">No new notifications matching your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Trends & Activity */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Quick Stats */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Activity Volume</h4>
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black">2.4k</p>
                  <p className="text-xs text-slate-400 font-bold">Today's Events</p>
                </div>
                <div className="flex gap-1 h-12 items-end">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} className="w-1.5 bg-indigo-500 rounded-t-full" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-3">Top Sources</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold">API Sync</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold">Marketing</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold">Users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Tasks */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Upcoming Syncs</h4>
            <div className="space-y-4">
              {[
                { title: 'Shopify Inventory', time: '14:00 PM', icon: <ShoppingBag size={14} /> },
                { title: 'HubSpot Contacts', time: '16:30 PM', icon: <User size={14} /> },
                { title: 'Weekly Report', time: 'Tomorrow', icon: <Calendar size={14} /> }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                    {task.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{task.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest rounded-2xl transition-all">
              View Calendar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;