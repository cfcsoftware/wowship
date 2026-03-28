"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Search, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic, 
  Send, 
  Check, 
  CheckCheck, 
  ArrowLeft,
  Settings,
  User,
  Bell,
  Lock,
  Phone,
  Video,
  Searchas,
  Info,
  ChevronDown,
  Volume2
} from 'lucide-react';

const App = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const chatEndRef = useRef(null);

  const [users] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      lastMsg: "Did you see the latest update?",
      time: "14:20",
      unread: 2,
      online: true,
      verified: false
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      lastMsg: "Let's meet at 5 PM",
      time: "12:05",
      unread: 0,
      online: false,
      verified: true
    },
    {
      id: 3,
      name: "Design Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
      lastMsg: "Marcus: The prototype is ready!",
      time: "Yesterday",
      unread: 15,
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: "Telegram",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      lastMsg: "Login attempt from a new device...",
      time: "Nov 12",
      unread: 0,
      online: true,
      verified: true,
      isService: true
    }
  ]);

  const [chatHistory, setChatHistory] = useState([
    { id: 101, senderId: 1, text: "Hey! How's the project going?", time: "14:15", status: "read" },
    { id: 102, senderId: 0, text: "Almost finished with the UI components.", time: "14:16", status: "read" },
    { id: 103, senderId: 1, text: "Great! Can you share the Figma link?", time: "14:17", status: "read" },
    { id: 104, senderId: 1, text: "Did you see the latest update?", time: "14:20", status: "delivered" }
  ]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: 0, // 0 represents the current user
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: "sent"
    };

    setChatHistory([...chatHistory, newMsg]);
    setMessageText('');
  };

  const currentChatUser = users.find(u => u.id === activeChat);

  return (
    <div className="flex h-screen w-full bg-[#0E1621] text-white font-sans overflow-hidden select-none">
      
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-[400px] flex flex-col border-r border-[#17212B] bg-[#17212B]">
        {/* Sidebar Header */}
        <div className="p-3 flex items-center gap-4">
          <button className="p-2 hover:bg-[#242F3D] rounded-full transition-colors">
            <Menu size={22} className="text-[#6C7883]" />
          </button>
          <div className={`flex-1 flex items-center gap-2 bg-[#242F3D] rounded-full px-4 py-2 border-2 transition-all ${isSearchFocused ? 'border-[#5288C1]' : 'border-transparent'}`}>
            <Search size={18} className={isSearchFocused ? 'text-[#5288C1]' : 'text-[#6C7883]'} />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-[#6C7883]"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div 
              key={user.id}
              onClick={() => setActiveChat(user.id)}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors relative ${activeChat === user.id ? 'bg-[#2B5278]' : 'hover:bg-[#242F3D]'}`}
            >
              <div className="relative shrink-0">
                <img src={user.avatar} className="w-14 h-14 rounded-full object-cover" alt={user.name} />
                {user.online && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[#2BAC76] border-2 border-[#17212B] rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="font-semibold truncate">{user.name}</span>
                    {user.verified && (
                      <svg className="w-4 h-4 text-[#5288C1]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-[#6C7883]">{user.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate ${user.unread > 0 && activeChat !== user.id ? 'text-white font-medium' : 'text-[#6C7883]'}`}>
                    {user.lastMsg}
                  </p>
                  {user.unread > 0 && activeChat !== user.id && (
                    <span className="bg-[#5288C1] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col bg-[#0E1621] relative">
        {/* Pattern Overlay (Telegram uses a faint pattern) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        {/* Chat Header */}
        <header className="h-14 bg-[#17212B] border-l border-[#0E1621] px-4 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-[#242F3D] -ml-2 px-2 py-1 rounded transition-colors min-w-0">
            <div className="md:hidden">
              <ArrowLeft size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate">{currentChatUser?.name}</span>
              <span className="text-xs text-[#5288C1] truncate">
                {currentChatUser?.online ? 'online' : 'last seen recently'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#6C7883]">
            <button className="p-2 hover:bg-[#242F3D] rounded-full"><Search size={20} /></button>
            <button className="p-2 hover:bg-[#242F3D] rounded-full"><Phone size={20} /></button>
            <button className="p-2 hover:bg-[#242F3D] rounded-full"><MoreVertical size={20} /></button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 z-10 flex flex-col custom-scrollbar">
          {chatHistory.map((msg, index) => {
            const isMe = msg.senderId === 0;
            return (
              <div 
                key={msg.id} 
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[70%] px-3 py-1.5 rounded-xl relative shadow-sm ${
                  isMe ? 'bg-[#2B5278] text-white rounded-tr-none' : 'bg-[#182533] text-white rounded-tl-none'
                }`}>
                  <p className="text-[14.5px] whitespace-pre-wrap pb-1 pr-12">{msg.text}</p>
                  <div className="absolute bottom-1 right-2 flex items-center gap-1">
                    <span className="text-[10px] text-[#6C7883] opacity-80 leading-none">
                      {msg.time}
                    </span>
                    {isMe && (
                      <span className="text-[#5288C1]">
                        {msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <footer className="p-4 z-10 max-w-4xl w-full mx-auto">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-[#17212B] rounded-2xl flex items-center px-2 py-1.5 shadow-lg min-h-[46px]">
              <button className="p-2 text-[#6C7883] hover:text-[#5288C1] transition-colors">
                <Smile size={24} />
              </button>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message" 
                className="flex-1 bg-transparent border-none outline-none text-sm py-1.5 px-2 resize-none max-h-32 placeholder-[#6C7883]"
                rows="1"
              />
              <button className="p-2 text-[#6C7883] hover:text-[#5288C1] transition-colors">
                <Paperclip size={24} className="-rotate-45" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              className={`w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all shadow-lg ${
                messageText.trim() ? 'bg-[#5288C1] text-white hover:bg-[#649BD3]' : 'bg-[#17212B] text-[#6C7883]'
              }`}
            >
              {messageText.trim() ? <Send size={22} className="ml-1" /> : <Mic size={22} />}
            </button>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #242F3D;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2B5278;
        }
      `}} />
    </div>
  );
};

export default App;