"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Zap, HelpCircle, Rocket } from 'lucide-react';

// --- Types & Menu Data ---

type MenuId = 'main' | 'getting_started' | 'features' | 'support';
type ActionId = 'Pricing' | 'Demo' | 'AI_Info' | 'Ops_Info' | 'Sec_Info' | 'Other' | 'Back';

interface MenuOption {
  label: string;
  id: MenuId | ActionId;
  icon?: React.ElementType;
}

const MENUS: Record<string, { title: string; options: MenuOption[] }> = {
  main: {
    title: "How can I help you today?",
    options: [
      { label: "Getting Started", id: 'getting_started', icon: Rocket },
      { label: "Explore Features", id: 'features', icon: Zap },
      { label: "Support", id: 'support', icon: HelpCircle },
    ]
  },
  getting_started: {
    title: "Here's how to get started:",
    options: [
      { label: "Pricing & Plans", id: 'Pricing' },
      { label: "Book a Demo", id: 'Demo' },
      { label: "« Back", id: 'Back' },
    ]
  },
  features: {
    title: "Which features interest you?",
    options: [
      { label: "AI Intelligence", id: 'AI_Info' },
      { label: "Operations", id: 'Ops_Info' },
      { label: "Security", id: 'Sec_Info' },
      { label: "« Back", id: 'Back' },
    ]
  },
  support: {
    title: "How can we assist?",
    options: [
      { label: "Contact Support", id: 'Other' },
      { label: "« Back", id: 'Back' },
    ]
  }
};

interface Message {
  type: 'bot' | 'user';
  text?: string;
  options?: MenuOption[]; // Options are now attached to bot messages
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial State: Greeting + Main Menu
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: "Hello! Welcome to Logicore.", 
      options: MENUS['main'].options 
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: MenuOption) => {
    // 1. Add User Selection to Chat
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    setIsTyping(true);

    // 2. Process Response
    setTimeout(() => {
      let botText = "";
      let nextOptions: MenuOption[] | undefined = undefined;
      let shouldRedirect = false;

      // Check if ID matches a Sub-Menu Category
      if (MENUS[option.id as string]) {
        const menu = MENUS[option.id as string];
        botText = menu.title;
        nextOptions = menu.options;
      } 
      // Handle "Back" Action
      else if (option.id === 'Back') {
        botText = "Main Menu:";
        nextOptions = MENUS['main'].options;
      }
      // Handle Specific Leaf Actions
      else {
        switch(option.id) {
          case "Pricing":
            botText = "We offer Solo (Rs999/mo), Professional (Rs8,999/mo), and Enterprise plans. Save 20% with yearly billing.";
            break;
          case "Demo":
            botText = "Opening our calendar...";
            setTimeout(() => window.open('https://calendly.com/jivarobotics/30min', '_blank'), 1000);
            break;
          case "AI_Info":
            botText = "Our AI Suite includes Risk Analysis, Context-Aware Drafting, and Judge Analytics.";
            break;
          case "Ops_Info":
            botText = "We cover Case Management, Smart Calendaring, Billing & Invoicing, and Secure Storage.";
            break;
          case "Sec_Info":
            botText = "We use private AI models, SOC2 compliance, and AES-256 encryption. Your data is never trained on.";
            break;
          case "Other":
            botText = "Redirecting you to our contact page for personalized support...";
            shouldRedirect = true;
            break;
          default:
            botText = "I can help with that.";
        }
        
        // After an answer, usually show Main Menu again or nothing?
        // Let's add a follow-up "Anything else?" with main menu options if not redirecting
        if (!shouldRedirect) {
           // We'll append two messages: The answer, then the menu prompt
           setMessages(prev => [
             ...prev, 
             { type: 'bot', text: botText },
             { type: 'bot', text: "Is there anything else?", options: MENUS['main'].options }
           ]);
           setIsTyping(false);
           return; 
        }
      }

      // Add Bot Message
      setMessages(prev => [...prev, { type: 'bot', text: botText, options: nextOptions }]);
      setIsTyping(false);

      if (shouldRedirect) {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
             window.location.href = '/contact';
          }
        }, 3000);
      }
    }, 600);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-8 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-[#E5E5EA] z-[60] overflow-hidden flex flex-col max-h-[600px] animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-600 p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot size={18} className="text-white" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm leading-tight">Nexion-ERP Assistant</h4>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        <p className="text-orange-100 text-[10px] font-medium">Online</p>
                    </div>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
                <X size={18} />
             </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#F9F9F9] space-y-4">
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
                   
                   {/* Message Bubble */}
                   {msg.text && (
                     <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm mb-2 ${
                        msg.type === 'user' 
                          ? 'bg-orange-600 text-white rounded-tr-none' 
                          : 'bg-white text-[#1C1C1E] border border-[#E5E5EA] rounded-tl-none'
                     }`}>
                        {msg.text}
                     </div>
                   )}

                   {/* Options Grid (Box Buttons) */}
                   {msg.options && (
                      <div className="grid grid-cols-2 gap-2 w-full max-w-[90%] mt-1">
                         {msg.options.map((option, optIdx) => (
                            <button
                               key={optIdx}
                               onClick={() => handleOptionClick(option)}
                               className={`
                                  relative p-3 rounded-xl text-xs font-medium text-center transition-all duration-200 border
                                  ${option.label === '« Back' 
                                    ? 'col-span-2 bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100' 
                                    : 'bg-white text-[#1C1C1E] border-[#E5E5EA] hover:border-orange-300 hover:shadow-md hover:text-orange-700'
                                  }
                               `}
                            >
                               {option.icon && (
                                  <option.icon size={16} className="mx-auto mb-1.5 text-orange-500 opacity-80" />
                               )}
                               {option.label}
                            </button>
                         ))}
                      </div>
                   )}
                </div>
             ))}
             
             {isTyping && (
                <div className="flex justify-start animate-in fade-in">
                   <div className="bg-white border border-[#E5E5EA] p-3.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-150"></span>
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-orange-600 p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-orange-100 flex items-center justify-center relative z-50"
        aria-label="Open Chat"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>
    </>
  );
};

export default ChatBot;