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
  Download,
  FileText,
  User,
  Check,
  CheckCheck
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
    hasAttachment: true,
    folder: "inbox"
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
    hasAttachment: false,
    folder: "inbox"
  },
  {
    id: 101,
    recipient: "Mark Thompson",
    email: "m.thompson@design-studio.com",
    subject: "Proposal for the Rebranding Project",
    snippet: "Attached is the full proposal and budget breakdown for the upcoming rebrand. Let me know if...",
    date: "Yesterday",
    status: "read",
    starred: false,
    category: "Business",
    hasAttachment: true,
    folder: "sent"
  },
  {
    id: 102,
    recipient: "Hiring Team",
    email: "careers@techflow.dev",
    subject: "Application for Senior UI Designer",
    snippet: "I am writing to express my interest in the Senior UI Designer position. My portfolio reflects...",
    date: "Mar 10",
    status: "sent",
    starred: true,
    category: "Personal",
    hasAttachment: true,
    folder: "sent"
  },
  {
    id: 103,
    recipient: "Jane Doe",
    email: "jane.doe@example.com",
    subject: "Quick question about the meeting",
    snippet: "Do we have the final agenda for tomorrow's sync? I want to make sure I prepare the right data.",
    date: "Mar 08",
    status: "delivered",
    starred: false,
    category: "Work",
    hasAttachment: false,
    folder: "sent"
  }
];

const PlusIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const NavItem = ({ icon, label, active = false, count, collapsed, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
  >
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
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Filter emails based on current folder and search
  const filteredEmails = useMemo(() => {
    return emails.filter(e => {
      const matchesFolder = e.folder === currentFolder;
      const searchTarget = e.sender || e.recipient || "";
      const matchesSearch = searchTarget.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           e.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [emails, currentFolder, searchQuery]);

  const selectedEmail = useMemo(() => 
    emails.find(e => e.id === selectedId) || filteredEmails[0] || {}, 
  [selectedId, emails, filteredEmails]);

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setEmails(prev => prev.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  const changeFolder = (folder) => {
    setCurrentFolder(folder);
    const firstInFolder = emails.find(e => e.folder === folder);
    if (firstInFolder) setSelectedId(firstInFolder.id);
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden text-slate-800 font-sans">
      
      {/* Sidebar */}
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
          <NavItem 
            icon={<Inbox size={18} />} 
            label="Inbox" 
            active={currentFolder === 'inbox'} 
            count="12" 
            collapsed={sidebarCollapsed} 
            onClick={() => changeFolder('inbox')}
          />
          <NavItem icon={<Star size={18} />} label="Starred" collapsed={sidebarCollapsed} />
          <NavItem 
            icon={<Send size={18} />} 
            label="Sent" 
            active={currentFolder === 'sent'} 
            collapsed={sidebarCollapsed} 
            onClick={() => changeFolder('sent')}
          />
          <NavItem icon={<Archive size={18} />} label="Archive" collapsed={sidebarCollapsed} />
          <NavItem icon={<Trash2 size={18} />} label="Trash" collapsed={sidebarCollapsed} />
        </nav>

        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 text-slate-400 hover:text-slate-600 border-t border-slate-100 flex items-center justify-center"
        >
          <Menu size={18} />
        </button>
      </aside>

      {/* Main Mail Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-black text-slate-900 capitalize mr-4">{currentFolder}</h1>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={`Search in ${currentFolder}...`} 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><RotateCw size={18} /></button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-100"><ChevronLeft size={16} /></button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-100"><ChevronRight size={16} /></button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          {/* List Pane */}
          <div className="w-full md:w-[400px] border-r border-slate-100 flex flex-col bg-slate-50/30 overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredEmails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                  <Mail size={48} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold">No messages found</p>
                  <p className="text-xs">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                filteredEmails.map((email) => (
                  <div 
                    key={email.id}
                    onClick={() => setSelectedId(email.id)}
                    className={`relative p-4 cursor-pointer transition-all border-b border-slate-100/50 group ${selectedId === email.id ? 'bg-white shadow-sm ring-1 ring-inset ring-slate-200 z-10' : 'hover:bg-white/60'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {currentFolder === 'inbox' && !email.read && <div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0" />}
                        {currentFolder === 'sent' && (
                          <div className="shrink-0 text-slate-400">
                            {email.status === 'read' ? <CheckCheck size={14} className="text-indigo-500" /> : <Check size={14} />}
                          </div>
                        )}
                        <span className={`text-sm truncate ${(!email.read && currentFolder === 'inbox') ? 'font-black text-slate-900' : 'font-medium text-slate-600'}`}>
                          {currentFolder === 'inbox' ? email.sender : `To: ${email.recipient}`}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 shrink-0">{email.date}</span>
                    </div>
                    <h4 className={`text-xs mb-1 truncate ${(!email.read && currentFolder === 'inbox') ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                      {email.subject}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {email.snippet}
                    </p>

                    <div className="absolute right-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur p-1 rounded-lg border border-slate-100 shadow-sm">
                      <button onClick={(e) => toggleStar(email.id, e)} className={`p-1.5 rounded hover:bg-slate-100 ${email.starred ? 'text-amber-400' : 'text-slate-400'}`}>
                        <Star size={14} fill={email.starred ? "currentColor" : "none"} />
                      </button>
                      <button className="p-1.5 rounded hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Preview Pane */}
          <div className="hidden md:flex flex-1 flex-col bg-white overflow-hidden">
            {selectedEmail.id ? (
              <>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-lg border border-indigo-100">
                      {currentFolder === 'inbox' ? selectedEmail.sender?.[0] : selectedEmail.recipient?.[0]}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-700">
                          {currentFolder === 'inbox' ? `From: ${selectedEmail.sender}` : `To: ${selectedEmail.recipient}`}
                        </span>
                        <span className="text-xs text-slate-400">&lt;{selectedEmail.email}&gt;</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentFolder === 'inbox' ? (
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Reply size={14} /> Reply
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Forward size={14} /> Forward
                      </button>
                    )}
                    <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded tracking-widest">
                          {selectedEmail.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold italic">
                          <Clock size={12} />
                          {currentFolder === 'inbox' ? 'Received' : 'Sent'} {selectedEmail.date}
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                      <p className="font-medium">{currentFolder === 'inbox' ? 'Hi there,' : `Hi ${selectedEmail.recipient?.split(' ')[0]},`}</p>
                      <p>{selectedEmail.snippet} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedenim ultrices, gravida nisl a, porta nisl. Cras et varius tellus, vitae interdum magna.</p>
                      <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Donec rutrum congue leo eget malesuada.</p>
                      <p>Best regards,<br /><span className="font-bold text-slate-900">{currentFolder === 'inbox' ? selectedEmail.sender : 'Me'}</span></p>
                    </div>

                    {selectedEmail.hasAttachment && (
                      <div className="mt-12 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                          <Paperclip size={14} className="text-slate-400" />
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Attachments</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <AttachmentCard filename="document_final_v1.pdf" size="1.2 MB" type="PDF" />
                          {currentFolder === 'sent' && <AttachmentCard filename="invoice_042.pdf" size="450 KB" type="PDF" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                 <Mail size={64} className="mb-4 opacity-10" />
                 <p className="font-bold">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
};

export default App;