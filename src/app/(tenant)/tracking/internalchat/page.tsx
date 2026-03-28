"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Hash, 
  Search, 
  Send, 
  Plus, 
  Settings, 
  Users, 
  Phone, 
  Video, 
  Info, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Circle,
  ChevronDown,
  AtSign,
  Star,
  Clock,
  MessageSquare,
  Zap,
  LayoutGrid
} from 'lucide-react';

const App = () => {
  const [activeChannel, setActiveChannel] = useState('design-system');
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);

  const channels = [
    { id: 'announcements', name: 'announcements', type: 'public', unread: 0 },
    { id: 'design-system', name: 'design-system', type: 'public', unread: 3 },
    { id: 'engineering', name: 'engineering', type: 'public', unread: 0 },
    { id: 'marketing-q3', name: 'marketing-q3', type: 'private', unread: 12 },
  ];

  const directMessages = [
    { id: 'u1', name: 'Sarah Chen', status: 'online', role: 'Product Design' },
    { id: 'u2', name: 'Alex Rivera', status: 'away', role: 'Fullstack Dev' },
    { id: 'u3', name: 'Jordan Smyth', status: 'online', role: 'Project Lead' },
    { id: 'u4', name: 'Emma Wilson', status: 'offline', role: 'UX Research' },
  ];

  const [chatHistory, setChatHistory] = useState([
    { id: 1, user: 'Sarah Chen', time: '10:24 AM', text: "Hey team! I've updated the Figma components for the new dashboard.", type: 'received' },
    { id: 2, user: 'Alex Rivera', time: '10:26 AM', text: "Looks great, Sarah. Are the Tailwind tokens synced yet?", type: 'received' },
    { id: 3, user: 'You', time: '10:30 AM', text: "Just checked them out. The spacing scales feel much more consistent now. Great job!", type: 'sent' },
    { id: 4, user: 'Sarah Chen', time: '10:31 AM', text: "Thanks! @Alex I'll sync the tokens by EOD.", type: 'received' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      user: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: message,
      type: 'sent'
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar - Channels & DMs */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs">V</div>
              <span className="font-black text-sm tracking-tight">Vortex Inc.</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
              <Settings size={18} />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search workspace..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8">
          {/* Channels Section */}
          <div>
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Channels</span>
              <Plus size={14} className="text-slate-400 cursor-pointer hover:text-indigo-600" />
            </div>
            <div className="space-y-1">
              {channels.map(channel => (
                <button 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all group ${activeChannel === channel.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <Hash size={16} className={activeChannel === channel.id ? 'text-indigo-600' : 'text-slate-300'} />
                    {channel.name}
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-rose-100">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Messages</span>
              <Plus size={14} className="text-slate-400 cursor-pointer hover:text-indigo-600" />
            </div>
            <div className="space-y-1">
              {directMessages.map(user => (
                <button 
                  key={user.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold border border-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${user.status === 'online' ? 'bg-emerald-500' : user.status === 'away' ? 'bg-amber-400' : 'bg-slate-300'}`} />
                  </div>
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="truncate group-hover:text-slate-900 transition-colors">{user.name}</span>
                    <span className="text-[10px] font-medium text-slate-400 truncate">{user.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">JD</div>
            <div className="flex flex-col">
              <span className="text-xs font-black">Jane Doe</span>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <Circle size={6} fill="currentColor" /> Active
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <header className="h-20 border-b border-slate-100 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Hash size={20} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight">{activeChannel}</h2>
              <p className="text-[10px] font-bold text-slate-400">12 members online • Shared channel for design assets</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Video size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Phone size={20} /></button>
            <div className="w-px h-6 bg-slate-100 mx-2" />
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Info size={20} /></button>
          </div>
        </header>

        {/* Messages List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
        >
          {chatHistory.map((msg, index) => (
            <div key={msg.id} className={`flex gap-4 ${msg.type === 'sent' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-sm ${msg.type === 'sent' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {msg.user.charAt(0)}
              </div>
              <div className={`flex flex-col ${msg.type === 'sent' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  <span className="text-xs font-black text-slate-900">{msg.user}</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-tighter">{msg.time}</span>
                </div>
                <div className={`px-4 py-3 rounded-[1.25rem] text-sm leading-relaxed shadow-sm ${
                  msg.type === 'sent' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-8 pt-0">
          <form 
            onSubmit={handleSendMessage}
            className="bg-white border-2 border-slate-100 rounded-[2rem] p-2 focus-within:border-indigo-100 transition-all shadow-xl shadow-slate-100/50"
          >
            <div className="flex items-center gap-1 border-b border-slate-50 px-3 py-2 mb-2">
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Plus size={16} /></button>
              <div className="w-px h-4 bg-slate-100 mx-1" />
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Smile size={16} /></button>
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><AtSign size={16} /></button>
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Zap size={16} /></button>
            </div>
            <div className="flex items-center gap-2 px-3 pb-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${activeChannel}`} 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 placeholder:text-slate-300"
              />
              <button 
                type="submit"
                className={`p-3 rounded-2xl transition-all flex items-center justify-center ${message.trim() ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-100' : 'bg-slate-100 text-slate-300 scale-95 opacity-50 cursor-not-allowed'}`}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <div className="mt-3 flex items-center justify-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Shift + Enter to add a new line</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Thread/Info (Contextual) */}
      <aside className="w-80 bg-slate-50/50 border-l border-slate-100 hidden xl:flex flex-col p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Quick Actions</h3>
          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={16} /></button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black">Daily Standup</h4>
                <p className="text-[10px] font-bold text-slate-400">In 45 minutes</p>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-indigo-100">SET REMINDER</button>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <LayoutGrid size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black">Design Resources</h4>
                <p className="text-[10px] font-bold text-slate-400">14 Pinnded Files</p>
              </div>
            </div>
            <button className="w-full py-2 bg-emerald-600 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-emerald-100">VIEW ALL</button>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center gap-2 mb-2">
               <Zap size={14} fill="white" />
               <span className="text-[10px] font-black tracking-widest uppercase">Pro Workspace</span>
            </div>
            <p className="text-xs font-bold leading-relaxed mb-4">Unlimited message history and screen sharing enabled for your team.</p>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 transition-all rounded-2xl text-[10px] font-black tracking-widest uppercase backdrop-blur-sm">LEARN MORE</button>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default App;