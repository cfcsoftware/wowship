"use client";

import React, { useState } from "react";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  User,
  Package,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  X,
  Calendar,
  Layers,
  Tag
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const PURCHASE_REQUESTS = [
  { 
    id: "PR-2024-001", 
    title: "High-Performance Workstations", 
    requester: "Alex Rivera", 
    department: "Engineering",
    date: "Oct 24, 2023", 
    total: 12500.00, 
    status: "pending", 
    priority: "high",
    items: [
      { name: "Dell XPS 17", qty: 3, price: 3500 },
      { name: "LG UltraFine 5K", qty: 3, price: 666.67 }
    ],
    approvers: [
      { name: "Sarah Chen", role: "Dept Head", status: "approved" },
      { name: "Finance Team", role: "Treasury", status: "pending" }
    ]
  },
  { 
    id: "PR-2024-002", 
    title: "Office Furniture Refresh", 
    requester: "Jordan Smith", 
    department: "Operations",
    date: "Oct 23, 2023", 
    total: 4200.50, 
    status: "approved", 
    priority: "medium",
    items: [
      { name: "Ergonomic Chairs", qty: 10, price: 350 },
      { name: "Standing Desks", qty: 2, price: 350.25 }
    ],
    approvers: [
      { name: "Sarah Chen", role: "Dept Head", status: "approved" },
      { name: "Finance Team", role: "Treasury", status: "approved" }
    ]
  },
  { 
    id: "PR-2024-003", 
    title: "SaaS Subscription: Adobe Creative Cloud", 
    requester: "Elena Gilbert", 
    department: "Marketing",
    date: "Oct 22, 2023", 
    total: 599.88, 
    status: "rejected", 
    priority: "low",
    items: [
      { name: "Annual Team License", qty: 1, price: 599.88 }
    ],
    approvers: [
      { name: "Sarah Chen", role: "Dept Head", status: "rejected" }
    ]
  },
  { 
    id: "PR-2024-004", 
    title: "Cloud Infrastructure Expansion", 
    requester: "Marcus Vane", 
    department: "DevOps",
    date: "Oct 21, 2023", 
    total: 8900.00, 
    status: "pending", 
    priority: "critical",
    items: [
      { name: "AWS Reserved Instances", qty: 1, price: 8900 }
    ],
    approvers: [
      { name: "Sarah Chen", role: "Dept Head", status: "pending" }
    ]
  }
];

const STATUS_MAP = {
  pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
  approved: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected: { color: "bg-rose-100 text-rose-700", icon: AlertCircle },
};

const PRIORITY_MAP = {
  critical: "bg-purple-600",
  high: "bg-rose-500",
  medium: "bg-blue-500",
  low: "bg-slate-400"
};

export default function PurchaseRequestsPage() {
  const [selectedPR, setSelectedPR] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredPRs = PURCHASE_REQUESTS.filter(pr => 
    activeTab === "all" || pr.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      {/* MAIN LISTING AREA */}
      <div className={`flex-1 p-6 md:p-8 transition-all duration-300 ${selectedPR ? 'mr-[450px]' : ''}`}>
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* TOP HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                  <ClipboardList className="text-blue-600" size={24} />
                </div>
                Purchase Requests
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Review and manage internal procurement requisitions.</p>
            </div>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Plus size={18} />
              New Request
            </button>
          </div>

          {/* STATS SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Requests', val: '42', icon: Layers, color: 'text-slate-600' },
              { label: 'Pending Approval', val: '12', icon: Clock, color: 'text-amber-600' },
              { label: 'Monthly Spend', val: '$24.8k', icon: Tag, color: 'text-blue-600' },
              { label: 'Completed', val: '28', icon: CheckCircle2, color: 'text-emerald-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon size={16} className={stat.color} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                </div>
                <p className="text-xl font-black text-slate-900">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-full md:w-auto">
              {['all', 'pending', 'approved', 'rejected'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeTab === t ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by PR number, title, or requester..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
              <Filter size={20} />
            </button>
          </div>

          {/* REQUESTS LIST */}
          <div className="space-y-3">
            {filteredPRs.map((pr) => (
              <div 
                key={pr.id}
                onClick={() => setSelectedPR(pr)}
                className={`group relative bg-white border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md hover:border-blue-200 ${
                  selectedPR?.id === pr.id ? 'border-blue-500 ring-1 ring-blue-500 shadow-lg translate-x-1' : 'border-slate-200'
                }`}
              >
                {/* Priority Indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full ${PRIORITY_MAP[pr.priority]}`} />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {pr.id}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={10} /> {pr.date}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{pr.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-slate-400" />
                        {pr.requester} • <span className="text-slate-400 italic">{pr.department}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Package size={14} className="text-slate-400" />
                        {pr.items.length} Items
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Amount</p>
                      <p className="text-lg font-black text-slate-900">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pr.total)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {(() => {
                        const Status = STATUS_MAP[pr.status];
                        return (
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${Status.color}`}>
                            <Status.icon size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{pr.status}</span>
                          </div>
                        )
                      })()}
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL SIDE PANEL */}
      {selectedPR && (
        <div className="fixed right-0 top-0 h-full w-[450px] bg-white border-l border-slate-200 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-lg font-black tracking-tight">{selectedPR.id}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requisition Details</p>
            </div>
            <button 
              onClick={() => setSelectedPR(null)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* SUBJECT HEADER */}
            <div>
              <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] font-black uppercase text-white mb-2 ${PRIORITY_MAP[selectedPR.priority]}`}>
                {selectedPR.priority} Priority
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedPR.title}</h3>
            </div>

            {/* ITEM BREAKDOWN */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Package size={14} /> Line Items
              </h4>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-black text-slate-500 uppercase">Item</th>
                      <th className="px-4 py-2 font-black text-slate-500 uppercase text-center">Qty</th>
                      <th className="px-4 py-2 font-black text-slate-500 uppercase text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedPR.items.map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-bold text-slate-700">{item.name}</td>
                        <td className="px-4 py-3 text-center text-slate-500 font-medium">{item.qty}</td>
                        <td className="px-4 py-3 text-right font-black text-slate-900">
                          ${(item.price * item.qty).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-white font-black text-slate-900">
                    <tr>
                      <td colSpan="2" className="px-4 py-3 text-right text-slate-500 uppercase text-[10px]">Grand Total</td>
                      <td className="px-4 py-3 text-right text-base">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedPR.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* APPROVAL WORKFLOW */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText size={14} /> Approval Chain
              </h4>
              <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {selectedPR.approvers.map((app, i) => (
                  <div key={i} className="relative pl-8 flex items-center justify-between">
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 ${
                      app.status === 'approved' ? 'bg-emerald-500 text-white' : 
                      app.status === 'rejected' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {app.status === 'approved' ? <CheckCircle2 size={12} /> : 
                       app.status === 'rejected' ? <X size={12} /> : <Clock size={12} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{app.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 italic">{app.role}</p>
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      app.status === 'approved' ? 'text-emerald-600 bg-emerald-50' : 
                      app.status === 'rejected' ? 'text-rose-600 bg-rose-50' : 'text-slate-400 bg-slate-50'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMENTS AREA */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <MessageSquare size={14} /> Internal Discussion
              </h4>
              <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300 flex items-center justify-center py-6">
                <p className="text-xs font-medium text-slate-400">No comments yet</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (Only if pending) */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm">
            {selectedPR.status === 'pending' ? (
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                  <ThumbsUp size={16} /> Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                  <ThumbsDown size={16} /> Reject
                </button>
              </div>
            ) : (
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-center gap-2">
                View Full Audit Log <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}