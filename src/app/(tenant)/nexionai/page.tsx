"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  User, 
  Plus, 
  Clock,
  Database,
  ShieldCheck,
  Command,
  X,
  Menu,
  Bell
} from 'lucide-react';

const MOCK_TOPICS = [
  {
    id: '1',
    title: 'Q3 Revenue Variance Analysis',
    category: 'Finance',
    date: 'Today',
    messages: [
      { id: 'm1', role: 'user', content: 'Analyze why the operating margin dipped by 2% in the North Region last month.', timestamp: '10:30 AM' },
      { id: 'm2', role: 'assistant', content: 'The dip was primarily caused by a 14% increase in specialized freight costs and a one-time adjustment in the regional distribution center overhead. I suggest reviewing the carrier contracts for the upcoming quarter.', timestamp: '10:31 AM' }
    ]
  },
  {
    id: '2',
    title: 'Inventory Turnover Report',
    category: 'Supply Chain',
    date: 'Yesterday',
    messages: [
      { id: 'm3', role: 'user', content: 'What is our current stock-out risk for Category A items?', timestamp: '2:15 PM' },
      { id: 'm4', role: 'assistant', content: 'Risk is currently low (4%). However, Lead times from the Shanghai hub have increased by 3 days. I recommend a 5% buffer increase on top-moving SKUs.', timestamp: '2:16 PM' }
    ]
  }
];

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(MOCK_TOPICS[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [topics, setTopics] = useState(MOCK_TOPICS);
  const messagesEndRef = useRef(null);

  const activeConversation = topics.find(t => t.id === activeTopicId) || topics[0];

  // Auto-scroll logic that handles dynamic heights
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }, [activeConversation.messages, activeTopicId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTopics(prev => prev.map(t => t.id === activeTopicId ? { ...t, messages: [...t.messages, newMessage] } : t));
    setInputMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I've fetched the real-time ledger data. The variance is linked to the increased fuel surcharges in the logistics module.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTopics(prev => prev.map(t => t.id === activeTopicId ? { ...t, messages: [...t.messages, aiResponse] } : t));
    }, 800);
  };

  const createNewQuery = () => {
    const id = Date.now().toString();
    setTopics([{ id, title: 'New ERP Query ' + (topics.length + 1), category: 'System', date: 'Now', messages: [] }, ...topics]);
    setActiveTopicId(id);
  };

  return (
    /* ROOT CONTAINER: 
       - Uses w-full/h-full to fill the parent container provided by your ERP.
       - 'overflow-hidden' prevents the whole page from jumping or scrolling.
    */
    <div className="flex w-full h-full bg-white text-slate-900 overflow-hidden relative">
      
      {/* CHAT INTERFACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFBFC]">
        
        {/* HEADER */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-100 bg-white shrink-0">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-800 truncate">{activeConversation.title}</h1>
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold border border-emerald-100">SECURE_ERP</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Node: Finance-Core-01</span>
          </div>

          <div className="flex items-center gap-2">
            {!isSidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Menu size={18} />
              </button>
            )}
            <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg"><Bell size={18} /></button>
          </div>
        </div>

        {/* MESSAGE AREA: scrollable container */}
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {activeConversation.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-20">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Database size={24} />
                </div>
                <h3 className="font-bold text-slate-800">Direct ERP Query Active</h3>
                <p className="text-slate-500 text-xs mt-1">Ask about ledger balances, inventory, or payroll variances.</p>
              </div>
            ) : (
              activeConversation.messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Command size={16} />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'bg-white border border-slate-100 text-slate-800 shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>

        {/* INPUT BOX: Stays at bottom without absolute positioning */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 p-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Query global inventory..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-slate-800"
              />
              <button 
                type="submit" 
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-center text-[9px] text-slate-400 mt-2 font-medium">Logicore reads encrypted live data. Results are audit-trailed.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: ERP HISTORY */}
      {isSidebarOpen && (
        <div className="w-72 border-l border-slate-100 bg-white flex flex-col shrink-0">
          <div className="h-14 px-4 flex items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-2 text-slate-800">
              <Clock size={16} className="text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Analysis Logs</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-50 rounded">
              <X size={16} className="text-slate-400" />
            </button>
          </div>
          
          <div className="p-3 flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar">
            <button 
              onClick={createNewQuery}
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm mb-2"
            >
              <Plus size={14} /> New Query
            </button>
            
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`text-left p-3 rounded-xl transition-all border ${
                  activeTopicId === topic.id 
                    ? 'bg-indigo-50 border-indigo-100' 
                    : 'bg-transparent border-transparent hover:bg-slate-50'
                }`}
              >
                <h4 className={`text-xs font-bold truncate ${activeTopicId === topic.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {topic.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{topic.category}</span>
                  <span className="text-[9px] font-medium text-slate-300">{topic.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        input:focus { outline: none; }
      `}} />
    </div>
  );
}