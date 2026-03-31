"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Send, 
  Check, 
  CheckCircle2, 
  User, 
  Settings, 
  Bell, 
  MessageSquare, 
  Globe, 
  Info, 
  Phone, 
  Video, 
  FileText, 
  Image as ImageIcon 
} from 'lucide-react';

const App = () => {
  const [activeChannel, setActiveChannel] = useState('ch_123');
  const [message, setMessage] = useState('');
  
  const [channels] = useState([
    { id: 'ch_123', name: 'Customer Support #442', type: 'SMS', lastMsg: 'Your ticket has been resolved.', time: '2m', unread: 0 },
    { id: 'ch_124', name: 'Sales Inquiry - John Doe', type: 'WHATSAPP', lastMsg: 'Pricing details attached.', time: '15m', unread: 3 },
    { id: 'ch_125', name: 'Tech Support Queue', type: 'WEB CHAT', lastMsg: 'Connecting to agent...', time: '1h', unread: 0 },
    { id: 'ch_126', name: '+1 (555) 012-3456', type: 'SMS', lastMsg: 'Thanks for the help!', time: 'Yesterday', unread: 0 },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, author: 'System', body: 'CONVERSATION STARTED VIA SMS', time: '', type: 'system' },
    { id: 2, author: 'Customer', body: 'Hi, I’m having trouble with my recent order #9928.', time: '10:01 AM', type: 'inbound' },
    { id: 3, author: 'Agent', body: 'Hello! I can certainly help with that. Could you please confirm your email address?', time: '10:02 AM', type: 'outbound', status: 'read' },
    { id: 4, author: 'Customer', body: 'Sure, it is alex.smith@example.com', time: '10:05 AM', type: 'inbound' },
    { id: 5, author: 'Agent', body: 'Checking your order status now. One moment please.', time: '10:06 AM', type: 'outbound', status: 'delivered' },
  ]);

  const chatEndRef = useRef(null);
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      author: 'Agent',
      body: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'outbound',
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F4F7] text-[#121C2D] font-sans overflow-hidden border border-gray-200">
      {/* 1. App Rail (Slim Left) */}
      <div className="w-16 bg-[#121C2D] flex flex-col items-center py-6 gap-8 shrink-0">
        <div className="w-8 h-8 bg-[#F22F46] rounded flex items-center justify-center text-white font-black text-xl select-none">T</div>
        <nav className="flex flex-col gap-6 text-[#606B85]">
          <button className="text-white bg-[#1F2D3D] p-2 rounded-lg"><MessageSquare size={20} /></button>
          <button className="hover:text-white transition-colors"><Globe size={20} /></button>
          <button className="hover:text-white transition-colors"><Bell size={20} /></button>
          <button className="hover:text-white transition-colors"><User size={20} /></button>
        </nav>
        <div className="mt-auto pb-4">
          <button className="text-[#606B85] hover:text-white transition-colors"><Settings size={20} /></button>
        </div>
      </div>

      {/* 2. Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-[#E1E2E6] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#E1E2E6]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-xl tracking-tight">Conversations</h2>
            <button className="w-8 h-8 flex items-center justify-center text-[#F22F46] hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100">
              <Plus size={20} />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#606B85] group-focus-within:text-[#F22F46] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[#F4F4F7] border border-transparent rounded-md py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:border-[#F22F46] focus:ring-1 focus:ring-[#F22F46] outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {channels.map((ch) => (
            <div 
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`p-4 cursor-pointer border-b border-[#F4F4F7] transition-all relative ${
                activeChannel === ch.id ? 'bg-white shadow-[inset_4px_0_0_0_#F22F46]' : 'hover:bg-[#FAFAFB]'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm truncate font-bold ${activeChannel === ch.id ? 'text-[#121C2D]' : 'text-[#4B5563]'}`}>{ch.name}</span>
                <span className="text-[11px] text-[#606B85] font-medium shrink-0 ml-2">{ch.time}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-xs text-[#606B85] truncate leading-relaxed">{ch.lastMsg}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider ${
                  ch.type === 'SMS' ? 'bg-blue-50 text-blue-600' : 
                  ch.type === 'WHATSAPP' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {ch.type}
                </span>
              </div>
              {ch.unread > 0 && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 bg-[#F22F46] text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                  {ch.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Message Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="h-16 px-6 border-b border-[#E1E2E6] flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F4F4F7] rounded flex items-center justify-center text-[#121C2D] border border-[#E1E2E6]">
              <User size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">{channels.find(c => c.id === activeChannel)?.name}</h3>
              <p className="text-[11px] text-[#008D2D] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008D2D]"></span>
                ACTIVE SESSION
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#606B85]">
            <button className="p-2 hover:bg-[#F4F4F7] hover:text-[#121C2D] rounded-md transition-colors"><Phone size={18} /></button>
            <button className="p-2 hover:bg-[#F4F4F7] hover:text-[#121C2D] rounded-md transition-colors"><Video size={18} /></button>
            <button className="p-2 hover:bg-[#F4F4F7] hover:text-[#121C2D] rounded-md transition-colors"><Info size={18} /></button>
            <div className="h-4 w-px bg-[#E1E2E6] mx-1"></div>
            <button className="p-2 hover:bg-[#F4F4F7] hover:text-[#121C2D] rounded-md transition-colors"><MoreVertical size={18} /></button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#FAFAFB]">
          {messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="flex justify-center my-4">
                  <span className="text-[10px] font-black tracking-[0.1em] text-[#606B85] bg-white border border-[#E1E2E6] px-4 py-1.5 rounded-full shadow-sm uppercase">
                    {msg.body}
                  </span>
                </div>
              );
            }
            
            const isAgent = msg.type === 'outbound';
            return (
              <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="flex items-baseline gap-2 mb-1.5 px-1">
                  {!isAgent && <span className="text-[11px] font-bold text-[#121C2D] uppercase tracking-wide">Customer</span>}
                  {isAgent && <span className="text-[11px] font-bold text-[#121C2D] uppercase tracking-wide">Agent</span>}
                  <span className="text-[10px] text-[#606B85] font-medium">{msg.time}</span>
                </div>
                
                <div className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed shadow-sm border ${
                  isAgent 
                    ? 'bg-white text-[#121C2D] border-[#E1E2E6] rounded-tr-none' 
                    : 'bg-[#121C2D] text-white border-[#121C2D] rounded-tl-none'
                }`}>
                  {msg.body}
                </div>

                {isAgent && msg.status && (
                  <div className="flex items-center gap-1.5 mt-1.5 px-1">
                    <span className="text-[9px] font-black text-[#606B85] tracking-widest uppercase">{msg.status}</span>
                    {msg.status === 'read' ? (
                      <CheckCircle2 size={12} className="text-[#008D2D]" />
                    ) : (
                      <Check size={12} className="text-[#606B85]" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-[#E1E2E6]">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            <div className="border border-[#E1E2E6] rounded-xl overflow-hidden focus-within:border-[#F22F46] focus-within:ring-4 focus-within:ring-red-50 transition-all">
              <div className="flex items-center gap-1 px-3 py-2 bg-[#FAFAFB] border-b border-[#E1E2E6]">
                <button className="p-1.5 text-[#606B85] hover:text-[#121C2D] rounded"><Smile size={18} /></button>
                <button className="p-1.5 text-[#606B85] hover:text-[#121C2D] rounded"><Paperclip size={18} /></button>
                <button className="p-1.5 text-[#606B85] hover:text-[#121C2D] rounded"><ImageIcon size={18} /></button>
                <button className="p-1.5 text-[#606B85] hover:text-[#121C2D] rounded"><FileText size={18} /></button>
                <div className="h-4 w-px bg-[#E1E2E6] mx-2"></div>
                <span className="text-[10px] font-black text-[#606B85] tracking-widest uppercase py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">Internal Note</span>
              </div>
              <div className="flex items-end bg-white p-1">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                  placeholder="Type a message..."
                  className="w-full p-4 outline-none text-[15px] leading-relaxed resize-none min-h-[80px]"
                />
                <button 
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`m-2 p-3 rounded-lg transition-all ${
                    message.trim() ? 'bg-[#F22F46] text-white shadow-md hover:bg-[#D61F36]' : 'bg-[#E1E2E6] text-[#606B85] cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-[#606B85] px-1 uppercase tracking-wider">
              <span>Origin: <span className="text-[#121C2D]">+1 (415) 555-0123</span></span>
              <span>{160 - message.length} Characters left</span>
            </div>
          </div>
          <div className="mt-8 text-center text-[11px] text-[#606B85] font-medium">
            © 2020-2026 <span className="text-[#F22F46] font-bold">Logicore-ERP</span>. All rights reserved.
          </div>
        </div>
      </div>

      {/* 4. CRM Sidebar (Right) */}
      <div className="hidden xl:flex w-80 bg-white border-l border-[#E1E2E6] flex-col overflow-y-auto">
        <div className="p-8 flex flex-col items-center text-center border-b border-[#F4F4F7]">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#121C2D] mb-5 border-2 border-[#E1E2E6] shadow-sm">
            <User size={48} strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-lg text-[#121C2D]">Alex Smith</h4>
          <p className="text-xs text-[#606B85] mb-4">Customer since Jan 2024</p>
          <div className="flex gap-2 justify-center">
             <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter border border-blue-100 shadow-sm">VIP</span>
             <span className="bg-slate-50 text-slate-700 px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter border border-slate-100 shadow-sm">SUPPORT</span>
          </div>
        </div>
        
        <div className="p-8 space-y-10">
          <section>
            <h5 className="text-[11px] font-black uppercase text-[#121C2D] mb-5 tracking-[0.2em]">Contact Info</h5>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-[#F4F4F7] rounded-lg group-hover:bg-blue-50 transition-colors"><Phone size={16} className="text-[#606B85]" /></div>
                <span className="text-sm font-semibold">+1 555-012-3456</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-[#F4F4F7] rounded-lg group-hover:bg-red-50 transition-colors"><Globe size={16} className="text-[#606B85]" /></div>
                <span className="text-sm font-bold text-[#F22F46] hover:underline">View CRM Record</span>
              </div>
            </div>
          </section>

          <section>
            <h5 className="text-[11px] font-black uppercase text-[#121C2D] mb-5 tracking-[0.2em]">Recent Activity</h5>
            <div className="space-y-6">
              {[3022, 3023].map(ticket => (
                <div key={ticket} className="flex gap-4 relative">
                  <div className="w-0.5 h-full bg-[#E1E2E6] absolute left-1.5 top-4"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E1E2E6] mt-1 shrink-0 z-10"></div>
                  <div>
                    <p className="text-xs text-[#121C2D] font-bold">Ticket #{ticket} Closed</p>
                    <p className="text-[10px] text-[#606B85] font-medium">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;