"use client";

import React from 'react';
import HomeLayout from '@/components/layout/homelayout';
import { 
  Briefcase, 
  FileText, 
  CreditCard, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  MoreHorizontal,
  Brain,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Calendar as CalendarIcon,
  AlertCircle,
  Folder,
  DollarSign,
  Scale,
  Lock,
  BarChart3,
  UploadCloud,
  EyeOff,
  ChevronLeft,
  FileLock,
  MessageCircle,
  TrendingUp,
  Server
} from 'lucide-react';

// --- Components ---


// 2. Hero
const FeatureHero = () => (
  <section className="pt-30 pb-20 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Gradients */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <Sparkles size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">The Complete Toolkit</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Powerful Features for <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-600">Every Stage of Practice.</span>
      </h1>
      
      <p className="text-xl text-[#8E8E93] leading-relaxed font-light max-w-2xl mx-auto">
        From advanced AI analysis to seamless billing, discover how Nexion-ERP transforms your firm&apos;s efficiency.
      </p>
    </div>
  </section>
);

// --- VISUAL MOCKUP COMPONENTS ---

// Visual 1: AI Chat / Analysis
const AI_Analysis_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
    <div className="flex items-center gap-4 mb-6 border-b border-[#E5E5EA] pb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-600 flex items-center justify-center text-white shadow-md">
        <Brain size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#1C1C1E]">Nexion-ERP AI Assistant</p>
        <p className="text-xs text-[#8E8E93]">Analysis Mode</p>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex gap-4 justify-end">
        <div className="bg-orange-600 text-white px-5 py-3 rounded-2xl rounded-tr-none text-sm max-w-[90%] shadow-md">
          Summarize the risks in Section 4.2 regarding liability.
        </div>
      </div>
      <div className="flex gap-4">
         <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600">
            <Sparkles size={14} />
         </div>
         <div className="bg-[#F2F2F7] text-[#1C1C1E] px-5 py-3 rounded-2xl rounded-tl-none text-sm max-w-[90%] space-y-2">
            <p className="font-bold text-orange-700 text-xs uppercase tracking-wide mb-1">High Risk Detected</p>
            <p>The clause imposes uncapped liability for indirect damages, which is non-standard.</p>
            <div className="flex gap-2 mt-2">
               <span className="text-xs bg-white border border-[#E5E5EA] px-2 py-1 rounded text-orange-700">Suggestion: Cap at 2x fees</span>
            </div>
         </div>
      </div>
    </div>
  </div>
);

// Visual 2: Judge Analytics
const Judge_Analytics_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#F2F2F7] rounded-full flex items-center justify-center text-[#1C1C1E]">
           <Scale size={24} />
        </div>
        <div>
           <h4 className="font-bold text-[#1C1C1E]">Hon. Sarah Miller</h4>
           <p className="text-xs text-[#8E8E93]">Superior Court, CA</p>
        </div>
     </div>
     <div className="space-y-4">
        <div>
           <div className="flex justify-between text-sm mb-1">
              <span className="text-[#8E8E93]">Motion to Dismiss Grant Rate</span>
              <span className="font-bold text-[#1C1C1E]">68%</span>
           </div>
           <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
              <div className="h-full w-[68%] bg-emerald-500 rounded-full"></div>
           </div>
        </div>
        <div>
           <div className="flex justify-between text-sm mb-1">
              <span className="text-[#8E8E93]">Avg. Time to Ruling</span>
              <span className="font-bold text-[#1C1C1E]">14 Days</span>
           </div>
           <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-orange-500 rounded-full"></div>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
           <div className="bg-[#F2F2F7] p-3 rounded-xl text-center">
              <p className="text-xs text-[#8E8E93]">Plaintiff Favor</p>
              <p className="font-bold text-orange-700">42%</p>
           </div>
           <div className="bg-[#F2F2F7] p-3 rounded-xl text-center">
              <p className="text-xs text-[#8E8E93]">Defendant Favor</p>
              <p className="font-bold text-orange-700">58%</p>
           </div>
        </div>
     </div>
  </div>
);

// Visual 3: Smart Redaction
const Redaction_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex justify-between items-center mb-4 border-b border-[#E5E5EA] pb-3">
        <div className="flex items-center gap-2">
           <FileText size={18} className="text-[#8E8E93]" />
           <span className="text-sm font-bold text-[#1C1C1E]">Deposition_Transcript.pdf</span>
        </div>
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">Auto-Redacting...</span>
     </div>
     <div className="space-y-3 font-mono text-xs text-[#48484A]">
        <p>Q: Please state your full name for the record.</p>
        <p>A: My name is <span className="bg-black text-black rounded px-1">Johnathan Doe</span>.</p>
        <p>Q: And your current address?</p>
        <p>A: I live at <span className="bg-black text-black rounded px-1">123 Maple Street, Springfield</span>.</p>
        <p>Q: Do you recall the events of <span className="bg-yellow-100 text-yellow-800 px-1 rounded border border-yellow-200">July 4th, 2023</span>?</p>
        <div className="flex gap-2 mt-4 pt-2">
           <button className="flex-1 bg-[#1C1C1E] text-white py-2 rounded-lg text-xs font-bold">Apply Redactions</button>
           <button className="flex-1 border border-[#E5E5EA] text-[#1C1C1E] py-2 rounded-lg text-xs font-bold">Review (2)</button>
        </div>
     </div>
  </div>
);

// Visual 4: Smart Calendar
const Calendar_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-6 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5 flex gap-4">
      <div className="flex-1 bg-white border border-[#E5E5EA] rounded-2xl p-4 shadow-sm">
         <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-[#1C1C1E] text-sm">Oct 2024</span>
            <div className="flex gap-1 text-[#8E8E93]">
               <ChevronLeft size={14} />
               <ChevronRight size={14} />
            </div>
         </div>
         <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 text-[#8E8E93] font-bold">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
         </div>
         <div className="grid grid-cols-7 gap-1 text-xs text-[#1C1C1E]">
            <span className="text-[#E5E5EA] p-1">29</span><span className="text-[#E5E5EA] p-1">30</span>
            <span className="p-1">1</span><span className="p-1">2</span><span className="p-1">3</span><span className="p-1">4</span><span className="p-1">5</span>
            <span className="p-1">6</span><span className="p-1">7</span><span className="p-1 bg-orange-600 text-white rounded-md shadow-sm">8</span><span className="p-1">9</span><span className="p-1">10</span><span className="p-1">11</span><span className="p-1">12</span>
         </div>
      </div>
      <div className="absolute right-0 top-10 bg-white/95 backdrop-blur-md border border-orange-100 rounded-xl p-4 w-48 shadow-xl shadow-orange-500/10 -mr-4 ring-1 ring-black/5">
         <div className="flex items-start gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
               <AlertCircle size={14} />
            </div>
            <div>
               <p className="text-xs font-bold text-[#1C1C1E]">Court Deadline</p>
               <p className="text-[10px] text-[#8E8E93]">Smith v. Jones</p>
            </div>
         </div>
         <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold bg-red-50 px-2 py-1 rounded-md inline-flex">
            <Clock size={10} /> Tomorrow, 5 PM
         </div>
      </div>
   </div>
);

// Visual 5: Invoice
const Invoice_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <div className="bg-white border border-[#E5E5EA] rounded-xl p-5 shadow-sm space-y-4">
         <div className="flex justify-between items-center border-b border-[#E5E5EA] pb-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  <DollarSign size={16} />
               </div>
               <div>
                  <p className="text-xs font-bold text-[#1C1C1E]">Invoice #2024-001</p>
                  <p className="text-[10px] text-[#8E8E93]">Sent to: Acme Corp</p>
               </div>
            </div>
            <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-bold">Unpaid</span>
         </div>
         <div className="space-y-2">
            <div className="flex justify-between text-xs">
               <span className="text-[#8E8E93]">Legal Consultation (2.5h)</span>
               <span className="font-medium text-[#1C1C1E]">$875.00</span>
            </div>
            <div className="flex justify-between text-xs">
               <span className="text-[#8E8E93]">Document Review (1.0h)</span>
               <span className="font-medium text-[#1C1C1E]">$350.00</span>
            </div>
         </div>
         <div className="pt-2 flex justify-between items-center font-bold text-[#1C1C1E] text-sm border-t border-[#E5E5EA]">
            <span>Total Due</span>
            <span>$1,225.00</span>
         </div>
         <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-xs font-bold">Send Reminder</button>
      </div>
  </div>
);

// Visual 6: Case List
const Case_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <div className="bg-white border border-[#E5E5EA] rounded-xl overflow-hidden shadow-sm">
         <div className="bg-[#F9F9F9] border-b border-[#E5E5EA] px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8E93] uppercase">Active Matters</span>
            <MoreHorizontal size={14} className="text-[#8E8E93]" />
         </div>
         <div className="divide-y divide-[#E5E5EA]">
            {[
               { name: "TechCorp Merger", status: "Active", color: "bg-green-100 text-green-700" },
               { name: "Estate of H. Granger", status: "Review", color: "bg-orange-100 text-orange-700" },
               { name: "Doe Family Trust", status: "Drafting", color: "bg-orange-100 text-orange-700" },
            ].map((c, i) => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F2F2F7] cursor-pointer">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                     <span className="text-sm font-medium text-[#1C1C1E]">{c.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.color}`}>{c.status}</span>
               </div>
            ))}
         </div>
      </div>
  </div>
);

// Visual 7: Lawyer's Drawer (Secure Storage)
const Drawer_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
           <Folder size={20} />
        </div>
        <div>
           <h4 className="font-bold text-[#1C1C1E] text-sm">Lawyer&apos;s Drawer</h4>
           <p className="text-xs text-[#8E8E93]">Encrypted Vault</p>
        </div>
     </div>
     <div className="space-y-3">
        <div className="bg-[#F2F2F7] p-3 rounded-xl border-2 border-dashed border-[#E5E5EA] flex flex-col items-center justify-center text-center">
           <UploadCloud size={24} className="text-[#8E8E93] mb-2" />
           <p className="text-xs font-bold text-[#1C1C1E]">Drag confidential files here</p>
           <p className="text-[10px] text-[#8E8E93]">AES-256 Encrypted</p>
        </div>
        <div className="space-y-2 mt-2">
           <div className="flex items-center justify-between p-2 hover:bg-[#F2F2F7] rounded-lg">
              <div className="flex items-center gap-2">
                 <FileLock size={16} className="text-orange-600" />
                 <span className="text-xs font-medium text-[#1C1C1E]">Witness_List.pdf</span>
              </div>
              <Lock size={12} className="text-[#8E8E93]" />
           </div>
           <div className="flex items-center justify-between p-2 hover:bg-[#F2F2F7] rounded-lg">
              <div className="flex items-center gap-2">
                 <FileLock size={16} className="text-orange-600" />
                 <span className="text-xs font-medium text-[#1C1C1E]">Settlement_Offer_v3.docx</span>
              </div>
              <Lock size={12} className="text-[#8E8E93]" />
           </div>
        </div>
     </div>
  </div>
);

// Visual 8: Interaction Visual (Chat with Case)
const Interaction_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex items-center justify-between mb-4 border-b border-[#E5E5EA] pb-3">
        <div className="flex items-center gap-2">
           <MessageCircle size={18} className="text-orange-600" />
           <span className="text-sm font-bold text-[#1C1C1E]">Case Chat</span>
        </div>
        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Online</span>
     </div>
     <div className="space-y-3">
        <div className="flex justify-end">
           <div className="bg-orange-600 text-white p-3 rounded-2xl rounded-tr-none text-xs max-w-[85%]">
              What is the statute of limitations for this tort?
           </div>
        </div>
        <div className="flex justify-start">
           <div className="bg-[#F2F2F7] text-[#1C1C1E] p-3 rounded-2xl rounded-tl-none text-xs max-w-[85%]">
              <p>Based on the jurisdiction (California), the statute of limitations for personal injury is <strong>2 years</strong> from the date of the incident.</p>
              <div className="mt-2 flex gap-1">
                 <span className="bg-white border border-[#E5E5EA] px-2 py-1 rounded text-[9px] text-[#8E8E93]">Source: CA Code Civ. Proc. § 335.1</span>
              </div>
           </div>
        </div>
     </div>
  </div>
);

// Visual 9: Winning Probability
const Probability_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
           <TrendingUp size={20} />
        </div>
        <div>
           <h4 className="font-bold text-[#1C1C1E] text-sm">Win Probability</h4>
           <p className="text-xs text-[#8E8E93]">Based on 12,000+ similar cases</p>
        </div>
     </div>
     
     <div className="relative pt-4 pb-8 flex justify-center">
        {/* Simple Arc Visualization */}
        <div className="w-32 h-16 bg-[#E5E5EA] rounded-t-full overflow-hidden relative">
           <div className="absolute bottom-0 left-0 w-full h-full bg-emerald-500 origin-bottom transition-transform duration-1000 rotate-45" style={{ transform: 'rotate(130deg)', transformOrigin: '50% 100%' }}></div>
        </div>
        <div className="absolute bottom-4 text-center">
           <span className="text-3xl font-bold text-[#1C1C1E]">78%</span>
        </div>
     </div>
     
     <div className="space-y-2">
        <div className="text-xs font-bold text-[#1C1C1E] mb-1">Key Success Factors:</div>
        <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
           <CheckCircle2 size={12} className="text-emerald-500" /> Strong documentation
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
           <CheckCircle2 size={12} className="text-emerald-500" /> Favorable judge history
        </div>
     </div>
  </div>
);

// Visual 10: Privacy
const Privacy_Visual = () => (
  <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
     <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
           <ShieldCheck size={32} className="text-white" />
        </div>
     </div>
     <div className="text-center space-y-2 mb-6">
        <h4 className="font-bold text-[#1C1C1E]">Private AI Models</h4>
        <p className="text-xs text-[#8E8E93]">Your client data is never used to train public models.</p>
     </div>
     <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 p-2 rounded-lg text-center border border-green-100">
           <Lock size={16} className="mx-auto text-green-600 mb-1" />
           <p className="text-[10px] font-bold text-green-700">SOC2 Type II</p>
        </div>
        <div className="bg-orange-50 p-2 rounded-lg text-center border border-orange-100">
           <Server size={16} className="mx-auto text-orange-600 mb-1" />
           <p className="text-[10px] font-bold text-orange-700">Local Isolation</p>
        </div>
     </div>
  </div>
);

// 3. AI Features Showcase
const AIFeatureShowcase = () => (
  <section className="py-10 px-4 md:px-8 bg-white relative overflow-hidden">
    <div className="w-full">
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1C1C1E] mb-6 flex items-center justify-center gap-3">
          <Brain className="text-orange-600" size={40} />
          Nexion-ERP Intelligence
        </h2>
        <p className="text-xl text-[#8E8E93]">
          Our AI engine doesn&apos;t just process data—it understands the law.
        </p>
      </div>

      <div className="space-y-20">
        {/* Feature 1: Analysis & Drafting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="lg:pr-8">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                 <MessageSquare size={24} />
              </div>
              <h3 className="text-3xl font-bold text-[#1C1C1E] mb-4">Risk Analysis & Drafting</h3>
              <p className="text-lg text-[#8E8E93] mb-6 leading-relaxed">
                 Stop spending hours on contract review. Upload any document, and our AI will instantly flag non-standard clauses, suggest revisions based on your jurisdiction, and draft new sections in seconds.
              </p>
              <ul className="space-y-3 mb-8">
                 {["Instant risk detection", "Context-aware clause suggestions", "Jurisdiction-specific formatting"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1C1C1E] font-medium">
                       <CheckCircle2 size={18} className="text-green-500" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
           <AI_Analysis_Visual />
        </div>

        {/* Feature 2: Judge Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="lg:order-2 lg:pl-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                 <BarChart3 size={24} />
              </div>
              <h3 className="text-3xl font-bold text-[#1C1C1E] mb-4">Judge Analytics</h3>
              <p className="text-lg text-[#8E8E93] mb-6 leading-relaxed">
                 Know the outcome before you file. Access deep analytics on judicial tendencies, ruling histories, and motion grant rates to tailor your arguments for the specific judge assigned to your case.
              </p>
              <ul className="space-y-3 mb-8">
                 {["Motion grant/deny rates", "Ruling timeline predictions", "Strategic argument tailoring"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1C1C1E] font-medium">
                       <CheckCircle2 size={18} className="text-green-500" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
           <div className="lg:order-1">
              <Judge_Analytics_Visual />
           </div>
        </div>

        {/* Feature 3: Smart Redaction & eDiscovery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="lg:pr-8">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                 <EyeOff size={24} />
              </div>
              <h3 className="text-3xl font-bold text-[#1C1C1E] mb-4">Smart Redaction & eDiscovery</h3>
              <p className="text-lg text-[#8E8E93] mb-6 leading-relaxed">
                 Protect sensitive information automatically. Our system identifies PII (Personally Identifiable Information) across thousands of documents and redacts it instantly, saving your team days of manual review.
              </p>
              <ul className="space-y-3 mb-8">
                 {["Auto-detect names, dates, SSNs", "Bulk processing", "Secure, reversible layers"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1C1C1E] font-medium">
                       <CheckCircle2 size={18} className="text-green-500" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
           <Redaction_Visual />
        </div>
      </div>
    </div>
  </section>
);

// 4. Core Features Showcase
const CoreFeatureShowcase = () => (
  <section className="py-10 px-4 md:px-8 bg-[#F2F2F7] relative">
    <div className="w-full">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1C1C1E] mb-6">
          The Operational Backbone
        </h2>
        <p className="text-lg text-[#8E8E93]">
          Everything else you need to run a modern, profitable law firm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Card 1: Calendar */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
               <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                  <CalendarIcon size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Smart Calendar</h3>
               <p className="text-[#8E8E93] text-sm">Automated docket syncing and deadline calculation.</p>
            </div>
            <div className="mt-auto pt-4">
               <Calendar_Visual />
            </div>
         </div>

         {/* Card 2: Billing */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
               <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <CreditCard size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Billing & Invoicing</h3>
               <p className="text-[#8E8E93] text-sm">Capture time effortlessly and get paid faster.</p>
            </div>
            <div className="mt-auto pt-4">
               <Invoice_Visual />
            </div>
         </div>

         {/* Card 3: Case Mgmt */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
               <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <Briefcase size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Case Management</h3>
               <p className="text-[#8E8E93] text-sm">Your entire case file, organized and accessible anywhere.</p>
            </div>
            <div className="mt-auto pt-4">
               <Case_Visual />
            </div>
         </div>

         {/* Card 4: Lawyer's Drawer (Secure Storage) */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
               <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <Folder size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Lawyer&apos;s Vault</h3>
               <p className="text-[#8E8E93] text-sm">Securely upload and store sensitive data in your encrypted vault.</p>
            </div>
            <div className="mt-auto pt-4">
               <Drawer_Visual />
            </div>
         </div>

         {/* Card 5: Interactive Intelligence */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
               <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <MessageCircle size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Interactive Intelligence</h3>
               <p className="text-[#8E8E93] text-sm">Chat with your case files and get instant answers.</p>
            </div>
            <div className="mt-auto pt-4">
               <Interaction_Visual />
            </div>
         </div>

         {/* Card 6: Strategy & Security */}
         <div className="bg-white rounded-[32px] p-8 border border-[#E5E5EA] flex flex-col h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <div className="mb-6 relative z-10">
               <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <ShieldCheck size={20} />
               </div>
               <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Private & Predictive</h3>
               <p className="text-[#8E8E93] text-sm">Data privacy in AI models plus winning probability insights.</p>
            </div>
            
            {/* Split Visual: Probability Top, Privacy Bottom */}
            <div className="mt-auto pt-4 space-y-4 relative z-10 scale-90 origin-top-left">
               <Probability_Visual />
               <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 p-2 rounded-lg justify-center">
                     <Lock size={12} /> Enterprise-Grade Privacy
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  </section>
);



export default function FeaturesPage() {
  return (
   <HomeLayout>
    <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      <FeatureHero />
      <AIFeatureShowcase />
      <CoreFeatureShowcase />
    </div>
    </HomeLayout>
  );
}