"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MoreVertical, 
  MessageSquare, 
  Filter, 
  Paperclip, 
  Smile, 
  Mic, 
  Check, 
  CheckCheck, 
  ChevronDown,
  Phone,
  Video,
  User,
  Image as ImageIcon,
  FileText,
  Camera,
  UserPlus
} from 'lucide-react';

const App = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Sarah Connor', 
      lastMsg: 'The project is ready for review!', 
      time: '10:45 AM', 
      unread: 2, 
      online: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      messages: [
        { id: 1, text: "Hey! Did you see the latest designs?", time: "10:30 AM", sent: false },
        { id: 2, text: "Not yet, sending them now?", time: "10:32 AM", sent: true, status: 'read' },
        { id: 3, text: "The project is ready for review!", time: "10:45 AM", sent: false },
      ]
    },
    { 
      id: 2, 
      name: 'Dev Team 🚀', 
      lastMsg: 'Alex: Fixed the bug in production', 
      time: '09:12 AM', 
      unread: 0, 
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      messages: [
        { id: 1, text: "Deployment starting...", time: "09:00 AM", sent: false, sender: 'John' },
        { id: 2, text: "Fixed the bug in production", time: "09:12 AM", sent: false, sender: 'Alex' },
      ]
    },
    { 
      id: 3, 
      name: 'Mom', 
      lastMsg: 'Call me when you are free ❤️', 
      time: 'Yesterday', 
      unread: 0, 
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      messages: [
        { id: 1, text: "Call me when you are free ❤️", time: "Yesterday", sent: false },
      ]
    }
  ]);

  const currentChat = chats.find(c => c.id === activeChat);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      status: 'sent'
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMsg: message,
          time: newMessage.time
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setMessage('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, activeChat]);

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden font-sans antialiased">
      {/* Background Top Strip */}
      <div className="absolute top-0 left-0 w-full h-[127px] bg-[#00a884] -z-10" />

      <div className="flex w-full max-w-[1600px] h-[95vh] m-auto bg-white shadow-2xl relative overflow-hidden flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-[400px] border-r border-[#e9edef] flex flex-col bg-white">
          {/* Header */}
          <header className="h-[60px] bg-[#f0f2f5] px-4 py-2 flex items-center justify-between">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" />
            </div>
            <div className="flex items-center gap-5 text-[#54656f]">
              <UserPlus size={22} className="cursor-pointer" title="Communities" />
              <div className="relative cursor-pointer" title="Status">
                <div className="w-2 h-2 bg-[#00a884] rounded-full absolute top-0 right-0 border-2 border-[#f0f2f5]"></div>
                <MessageSquare size={22} />
              </div>
              <MoreVertical size={22} className="cursor-pointer" />
            </div>
          </header>

          {/* Search */}
          <div className="p-2 border-b border-[#e9edef]">
            <div className="relative flex items-center bg-[#f0f2f5] rounded-lg px-3">
              <Search size={18} className="text-[#54656f] mr-4" />
              <input 
                type="text" 
                placeholder="Search or start new chat" 
                className="w-full bg-transparent border-none py-1.5 text-sm focus:ring-0 placeholder:text-[#54656f]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Filter size={18} className="text-[#54656f] ml-2 cursor-pointer" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center px-3 py-3 cursor-pointer hover:bg-[#f5f6f6] transition-colors border-b border-[#f0f2f5] ${activeChat === chat.id ? 'bg-[#f0f2f5]' : ''}`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
                  <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-base font-normal text-[#111b21] truncate">{chat.name}</h3>
                    <span className={`text-[12px] ${chat.unread > 0 ? 'text-[#1fa855] font-semibold' : 'text-[#667781]'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#667781] truncate pr-2">{chat.lastMsg}</p>
                    {chat.unread > 0 && (
                      <span className="bg-[#25d366] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Chat Area */}
        <main className="flex-1 flex flex-col bg-[#efeae2] relative">
          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />

          {/* Header */}
          <header className="h-[60px] bg-[#f0f2f5] px-4 py-2 flex items-center justify-between border-l border-[#d1d7db] relative z-10">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={currentChat.avatar} alt={currentChat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-medium text-[#111b21] leading-tight">{currentChat.name}</span>
                {currentChat.online && <span className="text-[12px] text-[#667781]">online</span>}
              </div>
            </div>
            <div className="flex items-center gap-6 text-[#54656f]">
              <Video size={20} className="cursor-pointer" />
              <Phone size={20} className="cursor-pointer" />
              <div className="w-px h-6 bg-[#d1d7db] mx-1" />
              <Search size={20} className="cursor-pointer" />
              <MoreVertical size={20} className="cursor-pointer" />
            </div>
          </header>

          {/* Messages Window */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-[5%] py-4 space-y-2 relative z-10"
          >
            <div className="flex justify-center mb-4">
              <span className="bg-[#ffffff] text-[#54656f] text-[12px] px-3 py-1.5 rounded-lg shadow-sm uppercase font-medium">Today</span>
            </div>

            {currentChat.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex w-full ${msg.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`relative max-w-[65%] px-2.5 py-1.5 rounded-lg shadow-sm text-[14.2px] ${
                  msg.sent ? 'bg-[#d9fdd3] text-[#111b21]' : 'bg-white text-[#111b21]'
                }`}>
                  {/* Bubble Tail Simulation */}
                  <div className={`absolute top-0 w-3 h-3 ${
                    msg.sent 
                    ? 'right-[-6px] bg-[#d9fdd3] clip-path-polygon-[0_0,100%_0,0_100%]' 
                    : 'left-[-6px] bg-white clip-path-polygon-[0_0,100%_0,100%_100%]'
                  }`} style={{ clipPath: msg.sent ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                  
                  {!msg.sent && msg.sender && (
                    <div className="text-[12.5px] font-semibold text-[#35cd96] mb-0.5">{msg.sender}</div>
                  )}
                  
                  <div className="pr-12 leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  
                  <div className="absolute bottom-1 right-1.5 flex items-center gap-1">
                    <span className="text-[10.5px] text-[#667781]">{msg.time}</span>
                    {msg.sent && (
                      <span className={msg.status === 'read' ? 'text-[#53bdeb]' : 'text-[#667781]'}>
                        {msg.status === 'read' ? <CheckCheck size={16} /> : <Check size={16} />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <footer className="bg-[#f0f2f5] px-4 py-2.5 flex items-center gap-3 relative z-10">
            <div className="flex items-center gap-4 text-[#54656f]">
              <Smile size={26} className="cursor-pointer hover:text-[#111b21]" />
              <Paperclip size={26} className="cursor-pointer hover:text-[#111b21]" />
            </div>
            
            <form onSubmit={handleSendMessage} className="flex-1">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message" 
                className="w-full bg-white border-none rounded-lg px-4 py-2.5 text-sm focus:ring-0 shadow-sm"
              />
            </form>

            <div className="text-[#54656f]">
              {message.trim() ? (
                <button onClick={handleSendMessage} className="p-2 text-[#00a884]"><Check size={28} /></button>
              ) : (
                <Mic size={26} className="cursor-pointer" />
              )}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;