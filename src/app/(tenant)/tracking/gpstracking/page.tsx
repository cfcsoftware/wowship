"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Edit, 
  ChevronDown, 
  Camera, 
  Phone, 
  Video, 
  Info, 
  Smile, 
  Mic, 
  Image as ImageIcon, 
  Heart, 
  Search,
  ArrowLeft,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';

const App = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      user: 'kristen_codes',
      fullName: 'Kristen Wright',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      online: true,
      lastActive: 'Active now',
      messages: [
        { id: 1, text: "Did you see the new React update?", time: "9:41 AM", sent: false },
        { id: 2, text: "Yeah! The compiler looks insane. 🚀", time: "9:42 AM", sent: true },
        { id: 3, text: "I'm trying it out on my side project tonight.", time: "9:43 AM", sent: false },
      ]
    },
    {
      id: 2,
      user: 'marcus_dev',
      fullName: 'Marcus Aurelius',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      online: false,
      lastActive: 'Active 2h ago',
      messages: [
        { id: 1, text: "Lunch tomorrow?", time: "Yesterday", sent: false },
      ]
    },
    {
      id: 3,
      user: 'design_daily',
      fullName: 'Design Daily',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      online: true,
      lastActive: 'Active now',
      messages: [
        { id: 1, text: "Check out these new gradients!", time: "Thursday", sent: false },
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      time: 'Just now',
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
    <div className="flex h-screen w-full bg-white text-black font-sans overflow-hidden border border-gray-200 shadow-xl max-w-6xl mx-auto my-4 rounded-xl">
      
      {/* Sidebar */}
      <aside className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <header className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-xl font-bold tracking-tight">your_username</h1>
            <ChevronDown size={18} />
          </div>
          <Edit size={22} className="cursor-pointer" />
        </header>

        {/* Notes / Stories Horizontal Bar */}
        <div className="flex gap-4 px-5 py-2 overflow-x-auto no-scrollbar mb-2">
          <div className="flex flex-col items-center gap-1 min-w-[64px]">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-16 h-16 rounded-full border border-gray-200 p-0.5" />
              <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                <div className="bg-gray-100 text-[10px] px-2 py-1 rounded-full text-gray-500">Note...</div>
              </div>
            </div>
            <span className="text-xs text-gray-500">Your note</span>
          </div>
          {chats.map(chat => (
            <div key={chat.id} className="flex flex-col items-center gap-1 min-w-[64px]">
              <div className="relative">
                <img src={chat.avatar} className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5" />
                {chat.online && <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <span className="text-xs text-gray-500 truncate w-16 text-center">{chat.user}</span>
            </div>
          ))}
        </div>

        {/* Messages List Header */}
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="font-bold">Messages</span>
          <span className="text-sm font-semibold text-blue-500 cursor-pointer">Requests (2)</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-400">
            <Search size={16} />
            <input type="text" placeholder="Search" className="bg-transparent border-none text-sm w-full focus:ring-0 text-black" />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ${activeChatId === chat.id ? 'bg-gray-50' : ''}`}
            >
              <img src={chat.avatar} className="w-14 h-14 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium">{chat.user}</p>
                <p className={`text-sm truncate ${activeChatId === chat.id ? 'text-gray-400' : 'text-gray-900 font-semibold'}`}>
                  {chat.messages[chat.messages.length - 1].text} • {chat.messages[chat.messages.length - 1].time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <header className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <img src={activeChat.avatar} className="w-8 h-8 rounded-full" />
              {activeChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">{activeChat.fullName}</span>
              <span className="text-xs text-gray-500 leading-none mt-1">{activeChat.user} • {activeChat.lastActive}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-black">
            <Phone size={24} className="cursor-pointer" />
            <Video size={24} className="cursor-pointer" />
            <Info size={24} className="cursor-pointer" />
          </div>
        </header>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {/* Profile in Chat */}
          <div className="flex flex-col items-center py-8">
            <img src={activeChat.avatar} className="w-24 h-24 rounded-full mb-3" />
            <h2 className="text-xl font-bold">{activeChat.fullName}</h2>
            <p className="text-sm text-gray-500">{activeChat.user} • Instagram</p>
            <button className="mt-4 bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
              View profile
            </button>
          </div>

          {activeChat.messages.map((msg, i) => (
            <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-end gap-2 max-w-[70%]">
                {!msg.sent && (
                  <img src={activeChat.avatar} className="w-7 h-7 rounded-full mb-1" alt="avatar" />
                )}
                <div 
                  className={`px-4 py-2 rounded-2xl text-[15px] ${
                    msg.sent 
                      ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 text-white rounded-br-sm' 
                      : 'bg-gray-100 text-black rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <footer className="p-4">
          <div className="border border-gray-300 rounded-full flex items-center px-4 py-2.5 gap-3">
            <div className="bg-blue-500 text-white rounded-full p-1 cursor-pointer">
              <Camera size={20} fill="currentColor" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
              placeholder="Message..." 
              className="flex-1 border-none bg-transparent focus:ring-0 text-sm"
            />
            {inputText.trim() ? (
              <button 
                onClick={handleSendMessage}
                className="text-blue-500 font-bold text-sm"
              >
                Send
              </button>
            ) : (
              <div className="flex items-center gap-3 text-black">
                <Mic size={22} className="cursor-pointer" />
                <ImageIcon size={22} className="cursor-pointer" />
                <Heart size={22} className="cursor-pointer hover:text-red-500 transition-colors" />
              </div>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;