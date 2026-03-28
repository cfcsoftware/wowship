"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Video, 
  Phone, 
  Info, 
  PlusCircle, 
  Image as ImageIcon, 
  StickyNote, 
  FilePlus, 
  ThumbsUp,
  Smile,
  ChevronDown,
  Bell,
  User,
  Settings
} from 'lucide-react';

const App = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
      online: true,
      messages: [
        { id: 1, text: "Hey! Did you finish the design for the new landing page?", time: "10:30 AM", sent: false },
        { id: 2, text: "Almost there! Just tweaking the mobile responsiveness.", time: "10:32 AM", sent: true },
        { id: 3, text: "Sweet. Let me know when it's ready for review.", time: "10:35 AM", sent: false },
      ]
    },
    {
      id: 2,
      name: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      online: false,
      lastActive: '20m',
      messages: [
        { id: 1, text: "The meeting starts in 5 minutes!", time: "9:00 AM", sent: false },
      ]
    },
    {
      id: 3,
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      online: true,
      messages: [
        { id: 1, text: "Check out this link!", time: "Yesterday", sent: false },
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [...chat.messages, newMessage] };
      }
      return chat;
    }));
    setInputText('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat.messages]);

  return (
    <div className="flex h-screen w-full bg-white text-[#050505] font-sans overflow-hidden">
      
      {/* Sidebar - Chats List */}
      <aside className="w-80 md:w-96 border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Chats</h1>
            <div className="flex gap-2">
              <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"><Settings size={20} /></div>
              <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"><PlusCircle size={20} /></div>
            </div>
          </div>
          
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search Messenger" 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Stories/Active Friends Bar */}
        <div className="flex gap-4 px-4 py-2 overflow-x-auto no-scrollbar">
          {chats.map(chat => (
            <div key={chat.id} className="flex flex-col items-center gap-1 min-w-[56px] cursor-pointer">
              <div className="relative">
                <img src={chat.avatar} className="w-12 h-12 rounded-full border border-gray-100" />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="text-[11px] text-gray-500 truncate w-12 text-center">{chat.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto mt-2">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center gap-3 mx-2 px-3 py-3 rounded-lg cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-[#E7F3FF]' : 'hover:bg-gray-100'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={chat.avatar} className="w-14 h-14 rounded-full" />
                {chat.online && (
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#31A24C] border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-[15px] font-medium truncate">{chat.name}</p>
                  <span className="text-xs text-gray-500">10:35 AM</span>
                </div>
                <p className="text-[13px] text-gray-500 truncate">
                  {chat.messages[chat.messages.length - 1].sent ? 'You: ' : ''}
                  {chat.messages[chat.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 px-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <img src={activeChat.avatar} className="w-10 h-10 rounded-full" />
              {activeChat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col cursor-pointer">
              <span className="text-[15px] font-bold leading-tight">{activeChat.name}</span>
              <span className="text-[12px] text-gray-500 leading-tight">
                {activeChat.online ? 'Active now' : `Active ${activeChat.lastActive} ago`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full transition-colors"><Phone size={20} fill="currentColor" /></button>
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full transition-colors"><Video size={22} fill="currentColor" /></button>
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full transition-colors"><Info size={22} fill="currentColor" /></button>
          </div>
        </header>

        {/* Message Container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {/* Profile Header in Chat */}
          <div className="flex flex-col items-center py-10">
            <img src={activeChat.avatar} className="w-20 h-20 rounded-full mb-2" />
            <h2 className="text-xl font-bold">{activeChat.name}</h2>
            <p className="text-sm text-gray-500 mb-4">Facebook</p>
            <button className="bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
              View Profile
            </button>
          </div>

          {activeChat.messages.map((msg, i) => (
            <div key={msg.id} className={`flex group ${msg.sent ? 'justify-end' : 'justify-start'} mb-1`}>
              {!msg.sent && (
                <div className="w-8 flex-shrink-0 mr-2 self-end">
                  <img src={activeChat.avatar} className="w-7 h-7 rounded-full" />
                </div>
              )}
              <div className="flex flex-col max-w-[65%]">
                <div className="flex items-center gap-2">
                  <div 
                    title={msg.time}
                    className={`px-3 py-2 rounded-[18px] text-[15px] cursor-default transition-all ${
                      msg.sent 
                        ? 'bg-[#0084FF] text-white' 
                        : 'bg-[#F0F0F0] text-black'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {/* Reaction Button Placeholder */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer text-gray-400">
                    <Smile size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <footer className="p-4 flex items-center gap-2">
          <div className="flex gap-1">
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full"><PlusCircle size={20} /></button>
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full"><ImageIcon size={20} /></button>
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full"><StickyNote size={20} /></button>
            <button className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full"><FilePlus size={20} /></button>
          </div>
          
          <div className="flex-1 relative flex items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Aa" 
              className="w-full bg-[#F0F2F5] rounded-full py-2 px-4 text-[15px] focus:outline-none"
            />
            <div className="absolute right-3 text-[#0084FF] cursor-pointer">
              <Smile size={20} />
            </div>
          </div>

          <button 
            onClick={handleSendMessage}
            className="p-2 text-[#0084FF] hover:bg-gray-100 rounded-full"
          >
            {inputText.trim() ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.641 12.191L2.623 5.182a.5.5 0 00-.657.72l2.457 5.648a.5.5 0 010 .399L1.966 17.599a.5.5 0 00.658.719l14.018-7.009a.5.5 0 000-.898zM22.5 12c0-.276-.224-.5-.5-.5H18v1h4c.276 0 .5-.224.5-.5z"/></svg>
            ) : (
              <ThumbsUp size={20} fill="currentColor" />
            )}
          </button>
        </footer>
      </main>

      {/* Info Panel - Visible on Large Screens */}
      <aside className="hidden lg:flex w-80 border-l border-gray-200 flex-col items-center p-4">
        <div className="flex flex-col items-center mt-6">
          <img src={activeChat.avatar} className="w-20 h-20 rounded-full mb-3" />
          <h3 className="text-[17px] font-bold">{activeChat.name}</h3>
          <p className="text-[13px] text-gray-500 mb-6">{activeChat.online ? 'Active Now' : 'Away'}</p>
        </div>
        
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="text-[15px] font-semibold">Chat Info</span>
            <ChevronDown size={18} />
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="text-[15px] font-semibold">Customize Chat</span>
            <ChevronDown size={18} />
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="text-[15px] font-semibold">Media, Files and Links</span>
            <ChevronDown size={18} />
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="text-[15px] font-semibold">Privacy & Support</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default App;