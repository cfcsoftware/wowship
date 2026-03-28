"use client";

import React, { useState, useRef } from 'react';
import { 
  Send, 
  X, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  MoreHorizontal, 
  Type, 
  Bold, 
  Italic, 
  List, 
  Link2, 
  Trash2, 
  ChevronDown,
  Clock,
  Zap,
  ShieldCheck,
  Maximize2,
  Minimize2
} from 'lucide-react';

const App = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  
  // Form State
  const [mailData, setMailData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      // Logic for closing or clearing would go here
    }, 1500);
  };

  const TooltipButton = ({ icon: Icon, label, active = false }) => (
    <button className={`p-2 rounded-lg transition-all hover:bg-slate-100 group relative ${active ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
      <Icon size={18} />
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className={`bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl transition-all duration-500 ease-in-out flex flex-col overflow-hidden ${isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[700px]'}`}>
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Send size={18} />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight">New Message</h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Draft Saved 2m ago</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
            >
              {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="px-8 pt-6 space-y-1">
          <div className="flex items-center group py-2 border-b border-slate-50">
            <label className="text-xs font-black text-slate-400 w-12 uppercase tracking-tighter">To</label>
            <input 
              type="text" 
              placeholder="recipients@example.com"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800 placeholder:text-slate-300"
              value={mailData.to}
              onChange={(e) => setMailData({...mailData, to: e.target.value})}
            />
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="text-[10px] font-black text-blue-600 hover:underline">Cc</button>
               <button className="text-[10px] font-black text-blue-600 hover:underline">Bcc</button>
            </div>
          </div>
          <div className="flex items-center py-2 border-b border-slate-50">
            <label className="text-xs font-black text-slate-400 w-12 uppercase tracking-tighter">Sub</label>
            <input 
              type="text" 
              placeholder="Project update for Q3..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800 placeholder:text-slate-300"
              value={mailData.subject}
              onChange={(e) => setMailData({...mailData, subject: e.target.value})}
            />
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 px-8 py-6 relative flex flex-col">
          <textarea 
            placeholder="Write your message here..."
            className="flex-1 w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 leading-relaxed resize-none placeholder:text-slate-300"
            value={mailData.body}
            onChange={(e) => setMailData({...mailData, body: e.target.value})}
          />

          {/* AI Helper Floating Action */}
          <div className="absolute right-8 bottom-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-full text-[10px] font-black shadow-xl shadow-blue-100 hover:scale-105 transition-transform">
              <Zap size={12} fill="currentColor" />
              AI ASSISTANT
            </button>
          </div>
        </div>

        {/* Footer Toolbar */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
               <TooltipButton icon={Type} label="Text Style" active={showToolbar} />
               <div className="w-px h-4 bg-slate-100 mx-1" />
               <TooltipButton icon={Bold} label="Bold" />
               <TooltipButton icon={Italic} label="Italic" />
               <TooltipButton icon={List} label="Bullet List" />
               <TooltipButton icon={Link2} label="Insert Link" />
               <div className="w-px h-4 bg-slate-100 mx-1" />
               <TooltipButton icon={Paperclip} label="Attach Files" />
               <TooltipButton icon={ImageIcon} label="Add Image" />
               <TooltipButton icon={Smile} label="Emoji" />
            </div>

            <div className="flex items-center gap-3">
               <button className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                  <Trash2 size={18} />
               </button>
               
               <div className="flex items-center rounded-2xl overflow-hidden shadow-lg shadow-blue-100">
                  <button 
                    onClick={handleSend}
                    disabled={isSending}
                    className="px-8 py-3.5 bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all flex items-center gap-2 min-w-[140px] justify-center"
                  >
                    {isSending ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        Send Now
                      </>
                    )}
                  </button>
                  <button className="px-3 py-3.5 bg-blue-700 text-white border-l border-blue-500 hover:bg-blue-800 transition-all">
                    <Clock size={14} />
                  </button>
               </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Connection</span>
             </div>
             <div className="w-1 h-1 bg-slate-200 rounded-full" />
             <div className="flex items-center gap-1 text-slate-300">
                <span className="text-[10px] font-bold uppercase tracking-widest">Formatting: Rich Text</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;