"use client";

import React, { useState, useMemo } from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  Trash2, 
  Archive, 
  Search, 
  Menu, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Paperclip, 
  MoreVertical,
  Flag,
  Mail,
  Reply,
  Forward,
  Filter,
  Circle,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download // Added missing import
} from 'lucide-react';

const MOCK_EMAILS = [
  {
    id: 1,
    sender: "Alex Rivera",
    email: "arivera@acme-corp.com",
    subject: "Q1 Project Timeline - Updated Assets",
    snippet: "Hey team, I've attached the final renders for the Q1 launch. Please review the color profile...",
    date: "10:42 AM",
    read: false,
    starred: true,
    category: "Work",
    priority: "High",
    hasAttachment: true
  },
  {
    id: 2,
    sender: "Sarah Chen",
    email: "schen@global-logistics.io",
    subject: "Vendor Logistics Agreement: Final Review Needed",
    snippet: "The contract terms for the shipping partnership are ready for your signature. We need this by...",
    date: "9:15 AM",
    read: true,
    starred: false,
    category: "Finance",
    priority: "Medium",
    hasAttachment: false
  },
  {
    id: 3,
    sender: "Stripe",
    email: "support@stripe.com",
    subject: "Payout successful: $12,450.00 is on its way",
    snippet: "Good news! Your payout has been processed and should arrive in your bank account within 2 days.",
    date: "Yesterday",
    read: true,
    starred: false,
    category: "Payments",
    priority: "Low",
    hasAttachment: false
  },
  {
    id: 4,
    sender: "Dr. Aris Vane",
    email: "vane@research.edu",
    subject: "Bio-Genomics Research Data Set #402",
    snippet: "We found some anomalies in the third sequence. I recommend we re-run the simulation before...",
    date: "Yesterday",
    read: false,
    starred: false,
    category: "Research",
    priority: "High",
    hasAttachment: true
  },
  {
    id: 5,
    sender: "GitHub",
    email: "notifications@github.com",
    subject: "[PR Merge] Update styling-system.css",
    snippet: "The following PR has been merged into main. Please pull the latest changes to avoid conflicts.",
    date: "Mar 12",
    read: true,
    starred: true,
    category: "Dev",
    priority: "Medium",
    hasAttachment: false
  }
];

// Fixed component structure
const PlusIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const NavItem = ({ icon, label, active = false, count, collapsed }) => (
  <button className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    <div className="flex items-center gap-3">
      <div className={`${active ? 'text-indigo-600' : 'text-slate-400'}`}>{icon}</div>
      {!collapsed && <span className="text-sm font-bold">{label}</span>}
    </div>
    {!collapsed && count && (
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    )}
  </button>
);

const LabelItem = ({ color, label }) => (
  <button className="flex items-center gap-3 w-full px-1 text-slate-500 hover:text-slate-900 group text-left">
    <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const AttachmentCard = ({ filename, size, type }) => (
  <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-black ${type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
      {type}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-slate-800 truncate">{filename}</p>
      <p className="text-[10px] font-medium text-slate-400">{size}</p>
    </div>
    <Download size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
  </div>
);

const App = () => {
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [selectedId, setSelectedId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("priority");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const selectedEmail = useMemo(() => 
    emails.find(e => e.id === selectedId) || emails[0], 
  [selectedId, emails]);

  const filteredEmails = emails.filter(e => 
    e.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setEmails(prev => prev.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden text-slate-800 font-sans">
      
      {/* Mini Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-100">
            <Mail size={18} />
          </div>
          {!sidebarCollapsed && <span className="font-bold text-lg tracking-tight text-slate-900">MailFlow</span>}
        </div>

        <div className="px-3 mt-4">
          <button className={`w-full bg-slate-900 hover:bg-black text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-all shadow-md ${sidebarCollapsed ? 'px-0' : 'px-4'}`}>
            <PlusIcon size={18} />
            {!sidebarCollapsed && <span className="text-sm font-bold">Compose</span>}
          </button>
        </div>

        <nav className="mt-6 px-3 flex-1 space-y-1">
          <NavItem icon={<Inbox size={18} />} label="Inbox" active={true} count="12" collapsed={sidebarCollapsed} />
          <NavItem icon={<Star size={18} />} label="Starred" collapsed={sidebarCollapsed} />
          <NavItem icon={<Send size={18} />} label="Sent" collapsed={sidebarCollapsed} />
          <NavItem icon={<Archive size={18} />} label="Archive" collapsed={sidebarCollapsed} />
          <NavItem icon={<Trash2 size={18} />} label="Trash" collapsed={sidebarCollapsed} />
        </nav>

        {!sidebarCollapsed && (
          <div className="p-6">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Labels</p>
            <div className="space-y-3">
              <LabelItem color="bg-rose-400" label="Project Red" />
              <LabelItem color="bg-amber-400" label="Finance" />
              <LabelItem color="bg-emerald-400" label="Personal" />
            </div>
          </div>
        )}

        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 text-slate-400 hover:text-slate-600 border-t border-slate-100 flex items-center justify-center"
        >
          <Menu size={18} />
        </button>
      </aside>

      {/* Main Mail List */}
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><RotateCw size={18} /></button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <span className="text-xs font-bold text-slate-500 mr-2">1-50 of 4,203</span>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-100"><ChevronLeft size={16} /></button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-100"><ChevronRight size={16} /></button>
          </div>
        </header>

        {/* Internal List Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* List Pane */}
          <div className="w-full md:w-[400px] border-r border-slate-100 flex flex-col bg-slate-50/30 overflow-hidden">
            <div className="flex border-b border-slate-100 px-4 shrink-0">
              <button 
                onClick={() => setActiveTab("priority")}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "priority" ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
              >
                Priority
              </button>
              <button 
                onClick={() => setActiveTab("other")}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "other" ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
              >
                Other
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredEmails.map((email) => (
                <div 
                  key={email.id}
                  onClick={() => setSelectedId(email.id)}
                  className={`relative p-4 cursor-pointer transition-all border-b border-slate-100/50 group ${selectedId === email.id ? 'bg-white shadow-sm ring-1 ring-inset ring-slate-200 z-10' : 'hover:bg-white/60'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {!email.read && <div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0" />}
                      <span className={`text-sm truncate ${!email.read ? 'font-black text-slate-900' : 'font-medium text-slate-600'}`}>
                        {email.sender}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{email.date}</span>
                  </div>
                  <h4 className={`text-xs mb-1 truncate ${!email.read ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                    {email.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {email.snippet}
                  </p>

                  {/* Hover Actions */}
                  <div className="absolute right-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur p-1 rounded-lg border border-slate-100 shadow-sm">
                    <button onClick={(e) => toggleStar(email.id, e)} className={`p-1.5 rounded hover:bg-slate-100 ${email.starred ? 'text-amber-400' : 'text-slate-400'}`}>
                      <Star size={14} fill={email.starred ? "currentColor" : "none"} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400"><Archive size={14} /></button>
                    <button className="p-1.5 rounded hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Pane */}
          <div className="hidden md:flex flex-1 flex-col bg-white overflow-hidden">
            {/* Thread Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 shadow-sm">
                  {selectedEmail.sender[0]}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">{selectedEmail.subject}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-700">{selectedEmail.sender}</span>
                    <span className="text-xs text-slate-400">&lt;{selectedEmail.email}&gt;</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Reply size={14} />
                  Reply
                </button>
                <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase bg-indigo-50 text-indigo-600 px-2 py-1 rounded tracking-widest">
                      {selectedEmail.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold italic">
                      <Clock size={12} />
                      Received {selectedEmail.date}
                    </div>
                  </div>
                  {selectedEmail.priority === "High" && (
                    <div className="flex items-center gap-1.5 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                      <AlertCircle size={14} />
                      Urgent Action Required
                    </div>
                  )}
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p className="font-medium">Hi Team,</p>
                  <p>{selectedEmail.snippet} This is a simulated message body representing the full content of an email within the platform. The UI allows for clean reading experiences with ample white space and clear typography.</p>
                  <p>In a real-world scenario, this area would render rich text or HTML content, allowing for embedded images, tables, and formatted links.</p>
                  <p>Best regards,<br /><span className="font-bold text-slate-900">{selectedEmail.sender}</span></p>
                </div>

                {selectedEmail.hasAttachment && (
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Paperclip size={14} className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">2 Attachments (4.2 MB)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <AttachmentCard filename="project_brief_v2.pdf" size="1.2 MB" type="PDF" />
                      <AttachmentCard filename="mockup_final.fig" size="3.0 MB" type="FIG" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Reply Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                 <input 
                  type="text" 
                  placeholder={`Reply to ${selectedEmail.sender}...`}
                  className="flex-1 bg-transparent border-none py-3 px-4 text-sm focus:ring-0"
                 />
                 <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                    <Send size={18} />
                 </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
};

export default App;