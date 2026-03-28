"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  BrainCircuit, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Filter, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Cpu,
  UserPlus,
  MessageSquareText,
  Zap,
  LayoutGrid,
  List
} from 'lucide-react';

// --- Types ---
interface Candidate {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  experience: string;
  location: string;
  status: 'Screening' | 'Interview' | 'Offered' | 'Rejected';
  aiAnalysis: {
    topSkills: string[];
    riskFactors: string[];
    strengthSummary: string;
    cultureFit: number;
  };
  appliedDate: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Senior Fullstack Engineer',
    matchScore: 96,
    experience: '8 Years',
    location: 'Remote (Austin, TX)',
    status: 'Screening',
    aiAnalysis: {
      topSkills: ['React/Next.js', 'PostgreSQL', 'System Design', 'AWS'],
      riskFactors: ['High salary expectation likely'],
      strengthSummary: 'Exceptional architectural knowledge. Previously led a team of 12 at a high-growth Series B startup.',
      cultureFit: 92
    },
    appliedDate: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Product Designer (UX)',
    matchScore: 89,
    experience: '5 Years',
    location: 'New York, NY',
    status: 'Interview',
    aiAnalysis: {
      topSkills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
      riskFactors: ['Minimal experience with B2B SaaS'],
      strengthSummary: 'Portfolio demonstrates deep empathetic design. Strong background in consumer mobile apps.',
      cultureFit: 95
    },
    appliedDate: '5 hours ago'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'DevOps Architect',
    matchScore: 74,
    experience: '12 Years',
    location: 'London, UK',
    status: 'Screening',
    aiAnalysis: {
      topSkills: ['Kubernetes', 'Terraform', 'CI/CD', 'Security'],
      riskFactors: ['Potential overqualification', 'Niche toolset focus'],
      strengthSummary: 'Deep infrastructure expertise but may prefer individual contributor role over management.',
      cultureFit: 70
    },
    appliedDate: '1 day ago'
  }
];

export default function AIRecruitment() {
  const [selectedId, setSelectedId] = useState<string>(MOCK_CANDIDATES[0].id);
  const [activeJob, setActiveJob] = useState('Senior Fullstack Engineer');

  const selectedCandidate = MOCK_CANDIDATES.find(c => c.id === selectedId) || MOCK_CANDIDATES[0];

  return (
    <div className="flex flex-col w-full h-full bg-[#F9FAFB] overflow-hidden font-sans">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 z-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <UserPlus size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">AI Talent Engine</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-100">
                  <Cpu size={10} /> Neural Screening Active
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Auto-filtering 452 new applicants</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search candidates or skills..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/40 w-full lg:w-80 transition-all outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
              <Zap size={16} className="text-amber-400" />
              Auto-Match
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR: PIPELINE QUEUE */}
        <div className="w-full md:w-[420px] bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
               <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><List size={18} /></button>
               <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><LayoutGrid size={18} /></button>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
              Sort by: <span className="text-indigo-600 cursor-pointer">AI Match Score</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {MOCK_CANDIDATES.map(candidate => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedId(candidate.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedId === candidate.id 
                  ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10' 
                  : 'bg-transparent border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200/50">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{candidate.name}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{candidate.role}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-black ${candidate.matchScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {candidate.matchScore}%
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {candidate.aiAnalysis.topSkills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200/50">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                    <Clock size={12} /> {candidate.appliedDate}
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter ${
                    candidate.status === 'Screening' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT: CANDIDATE INTELLIGENCE */}
        <div className="flex-1 overflow-y-auto bg-white/50 custom-scrollbar">
          <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-8">
            
            {/* MATCH ANALYSIS CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="flex flex-col items-end">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Match Grade</div>
                    <div className="text-5xl font-black text-indigo-600 tracking-tighter">{selectedCandidate.matchScore}<span className="text-xl">%</span></div>
                  </div>
                </div>

                <div className="max-w-[70%]">
                  <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedCandidate.name}</h2>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-indigo-500"/> {selectedCandidate.experience} Exp</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-500"/> {selectedCandidate.location}</span>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-400" />
                      Neural Summary
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {selectedCandidate.aiAnalysis.strengthSummary} This candidate ranks in the <span className="text-indigo-600 font-bold">top 3%</span> of all applicants for the {selectedCandidate.role} position based on technical depth and leadership indicators.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <h5 className="text-[10px] font-bold text-emerald-700 uppercase mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Key Competencies
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCandidate.aiAnalysis.topSkills.map(skill => (
                        <span key={skill} className="text-[10px] font-bold px-2 py-0.5 bg-white text-emerald-600 rounded-md border border-emerald-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                    <h5 className="text-[10px] font-bold text-rose-700 uppercase mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} /> AI Risk Flags
                    </h5>
                    <div className="space-y-1">
                      {selectedCandidate.aiAnalysis.riskFactors.map(risk => (
                        <p key={risk} className="text-[10px] font-bold text-rose-600">• {risk}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CULTURE FIT & QUICK ACTIONS */}
              <div className="flex flex-col gap-6">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
                  <h4 className="text-sm font-bold mb-6 flex items-center gap-2">
                    <BrainCircuit size={18} className="text-indigo-400" />
                    Culture Alignment
                  </h4>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-black">{selectedCandidate.aiAnalysis.cultureFit}%</span>
                    <span className="text-[10px] font-bold text-indigo-300 uppercase">High Synergy</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${selectedCandidate.aiAnalysis.cultureFit}%` }} />
                  </div>
                  <p className="mt-4 text-[11px] text-slate-400 font-medium leading-relaxed">
                    Matched against company values: <span className="text-white">Radical Transparency, Speed, and Autonomy.</span>
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex-1">
                  <h4 className="text-xs font-bold text-slate-800 mb-4">Pipeline Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                      Move to Interview <ChevronRight size={14} />
                    </button>
                    <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                      <FileText size={14} /> View Original Resume
                    </button>
                    <button className="w-full py-3 bg-white border border-rose-100 text-rose-500 rounded-xl font-bold text-xs hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                      <XCircle size={14} /> Discard Application
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI GENERATED INTERVIEW ROADMAP */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquareText size={20} className="text-indigo-600" />
                    Interview Roadmap
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Personalized technical deep-dives generated by AI</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  <TrendingUp size={12} /> Target: Level L6
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    q: "Describe the most complex architectural challenge you faced at your previous role.",
                    intent: "Evaluates 'System Design' and 'Architecture' claims in resume.",
                    time: "15 mins"
                  },
                  { 
                    q: "How do you handle technical debt when scaling a Next.js application rapidly?",
                    intent: "Tests practical experience vs theoretical knowledge.",
                    time: "10 mins"
                  },
                  { 
                    q: "Walk us through a time you had to pivot infrastructure due to an AWS outage.",
                    intent: "Probes for 'AWS' mastery and problem-solving under pressure.",
                    time: "12 mins"
                  },
                  { 
                    q: "What is your philosophy on leading high-performing engineering teams?",
                    intent: "Cross-checks 'Leadership' potential for future management track.",
                    time: "10 mins"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-indigo-50/30 hover:border-indigo-100 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-black text-indigo-600 bg-white px-2 py-0.5 rounded shadow-sm">QUESTION {idx + 1}</span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-3 leading-snug">{item.q}</p>
                    <div className="pt-3 border-t border-slate-200/50">
                      <p className="text-[10px] font-medium text-slate-500 italic">
                        <span className="font-bold text-indigo-400 not-italic uppercase mr-1">AI Intent:</span> {item.intent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
}