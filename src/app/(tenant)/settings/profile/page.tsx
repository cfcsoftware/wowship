"use client";

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Lock, 
  Camera, 
  Edit2, 
  LogOut, 
  ChevronRight,
  Clock,
  Globe,
  Award,
  CreditCard,
  Calendar
} from 'lucide-react';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');

  // --- MOCK USER DATA ---
  const user = {
    name: "Grem Enterprise",
    role: "Administrator",
    email: "alex.sterling@bistroflow.com",
    phone: "+1 (555) 234-5678",
    location: "New York, USA",
    avatar: null, // Placeholder logic used below
    joinDate: "January 2024",
    completion: 85,
    recentActivity: [
      { id: 1, action: "Updated Menu Prices", time: "2 hours ago", icon: Edit2 },
      { id: 2, action: "Approved Vendor Payment", time: "5 hours ago", icon: CreditCard },
      { id: 3, action: "Logged in from new device", time: "Yesterday", icon: Shield }
    ]
  };

  const tabs = ['Overview', 'Security', 'Notifications', 'Billing'];

  return (
    <div className="w-full font-sans text-gray-900 bg-[#F8F9FB] min-h-screen p-4 md:p-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-[#FF2020] to-[#E61C1C]"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-[#FF2020] text-4xl font-bold border-4 border-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-md border border-gray-100 text-gray-600 hover:text-[#FF2020] transition-colors">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="flex-1 mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className="px-3 py-1 bg-red-50 text-[#FF2020] text-xs font-bold rounded-full border border-red-100 uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><MapPin size={16} /> {user.location}</div>
                <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined {user.joinDate}</div>
              </div>
            </div>

            <div className="flex gap-2 mb-2">
              <button className="bg-[#FF2020] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#E61C1C] transition-colors shadow-sm">
                Edit Profile
              </button>
              <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Navigation & Progress */}
        <div className="lg:col-span-4 space-y-6">
          {/* Navigation Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab === 'Overview' && <User size={18} />}
                  {tab === 'Security' && <Shield size={18} />}
                  {tab === 'Notifications' && <Bell size={18} />}
                  {tab === 'Billing' && <CreditCard size={18} />}
                  {tab}
                </div>
                <ChevronRight size={16} className={activeTab === tab ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Profile Completion</h3>
              <span className="text-[#FF2020] font-bold">{user.completion}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#FF2020] h-full transition-all duration-1000" 
                style={{ width: `${user.completion}%` }}
              ></div>
            </div>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Complete your profile by adding your emergency contact and secondary email.
            </p>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">{activeTab} Details</h2>
            
            {activeTab === 'Overview' && (
              <div className="space-y-8">
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Full Name</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                      <User size={16} className="text-gray-400" /> {user.name}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                      <Mail size={16} className="text-gray-400" /> {user.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                      <Phone size={16} className="text-gray-400" /> {user.phone}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Language</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                      <Globe size={16} className="text-gray-400" /> English (US)
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="pt-6 border-t border-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Clock size={18} className="text-[#FF2020]" />
                      Recent Activity
                    </h3>
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-900">View All</button>
                  </div>
                  <div className="space-y-4">
                    {user.recentActivity.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-[#FF2020]/20 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-[#FF2020] transition-colors">
                              <IconComponent size={14} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">{activity.action}</span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{activity.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Achievements/Badges */}
                <div className="pt-6 border-t border-gray-50">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award size={18} className="text-[#FF2020]" />
                    Performance Badges
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {['Top Performer', 'Efficiency Expert', 'Loyalty'].map((badge) => (
                      <div key={badge} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                        <Award size={14} className="text-amber-600" />
                        <span className="text-xs font-bold text-amber-700 whitespace-nowrap">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'Overview' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <Lock size={32} />
                </div>
                <h3 className="font-bold text-gray-900">{activeTab} Settings</h3>
                <p className="text-sm text-gray-500 max-w-xs mt-2">
                  This section allows you to customize your {activeTab.toLowerCase()} preferences.
                </p>
                <button className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold transition-colors">
                  Modify Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}