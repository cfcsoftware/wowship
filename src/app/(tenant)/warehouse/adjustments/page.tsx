"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ArrowUpDown,
  ClipboardCheck,
  Package,
  History,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Filter,
  Download,
  MoreVertical,
  User,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  FileText
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type AdjustmentReason = "Damage" | "Cycle Count" | "Reclassification" | "Return to Vendor" | "Theft/Loss" | "Promotion";
type AdjustmentType = "In" | "Out";

interface StockAdjustment {
  id: string;
  date: string;
  productName: string;
  sku: string;
  warehouse: string;
  type: AdjustmentType;
  quantity: number;
  reason: AdjustmentReason;
  adjustedBy: string;
  status: "Completed" | "Pending Approval";
  valueImpact: number;
}

/* ---------------- MOCK DATA ---------------- */
const ADJUSTMENTS: StockAdjustment[] = [
  {
    id: "ADJ-2024-001",
    date: "2024-05-24 09:15 AM",
    productName: "Neural-Link VR Headset",
    sku: "NL-VR-01",
    warehouse: "Main DC - Austin",
    type: "Out",
    quantity: 4,
    reason: "Damage",
    adjustedBy: "Alex Rivera",
    status: "Completed",
    valueImpact: -1196.00
  },
  {
    id: "ADJ-2024-002",
    date: "2024-05-23 04:30 PM",
    productName: "Titanium Chassis Frame",
    sku: "TC-FR-99",
    warehouse: "North Logistics Hub",
    type: "In",
    quantity: 12,
    reason: "Cycle Count",
    adjustedBy: "Sarah Jenkins",
    status: "Completed",
    valueImpact: 4200.00
  },
  {
    id: "ADJ-2024-003",
    date: "2024-05-23 11:20 AM",
    productName: "Lithium-Ion Battery Pack",
    sku: "LI-BT-500",
    warehouse: "Main DC - Austin",
    type: "Out",
    quantity: 2,
    reason: "Theft/Loss",
    adjustedBy: "Security Lead",
    status: "Pending Approval",
    valueImpact: -450.00
  },
  {
    id: "ADJ-2024-004",
    date: "2024-05-22 02:45 PM",
    productName: "Copper Wiring (100m)",
    sku: "CW-100M",
    warehouse: "West Coast Annex",
    type: "Out",
    quantity: 25,
    reason: "Return to Vendor",
    adjustedBy: "Marcus Chen",
    status: "Completed",
    valueImpact: -625.00
  },
  {
    id: "ADJ-2024-005",
    date: "2024-05-21 08:00 AM",
    productName: "Smart Sensor Hub",
    sku: "SSH-V2",
    warehouse: "Main DC - Austin",
    type: "In",
    quantity: 50,
    reason: "Promotion",
    adjustedBy: "Marketing Dept",
    status: "Completed",
    valueImpact: 1250.00
  }
];

/* ---------------- UI HELPERS ---------------- */
const getReasonColor = (reason: AdjustmentReason) => {
  const map: Record<AdjustmentReason, string> = {
    "Damage": "text-rose-600 bg-rose-50",
    "Cycle Count": "text-indigo-600 bg-indigo-50",
    "Reclassification": "text-slate-600 bg-slate-50",
    "Return to Vendor": "text-amber-600 bg-amber-50",
    "Theft/Loss": "text-red-700 bg-red-100",
    "Promotion": "text-emerald-600 bg-emerald-50",
  };
  return map[reason] || "text-slate-600 bg-slate-50";
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function StockAdjustmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredAdjustments = useMemo(() => {
    return ADJUSTMENTS.filter(adj => {
      const matchesSearch = adj.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            adj.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All Types" || adj.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  const totalImpact = filteredAdjustments.reduce((acc, curr) => acc + curr.valueImpact, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-rose-600 rounded-lg text-white shadow-lg shadow-rose-100">
                <ArrowUpDown size={20} />
              </div>
              Stock Adjustments
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Audit log for manual inventory corrections and shrinkage tracking.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export Log
            </button>
            <button className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-black transition shadow-md">
              <Plus size={16} />
              New Adjustment
            </button>
          </div>
        </header>

        {/* FINANCIAL IMPACT WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Value Correction (Current Period)</p>
                <p className={`text-3xl font-black mt-1 ${totalImpact >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {totalImpact >= 0 ? '+' : ''}${totalImpact.toLocaleString()}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                  {totalImpact < 0 ? <AlertCircle size={12} className="text-rose-500" /> : <CheckCircle2 size={12} className="text-emerald-500" />}
                  Reflects {filteredAdjustments.length} manual interventions.
                </p>
              </div>
              <div className={`p-4 rounded-2xl ${totalImpact >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {totalImpact >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Damaged Items</p>
            <p className="text-2xl font-black text-slate-900">14 Units</p>
            <p className="text-[10px] font-bold text-rose-500 mt-1 uppercase">Action Required</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cycle Count Accuracy</p>
            <p className="text-2xl font-black text-slate-900">98.2%</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-1 uppercase">Target: 99%</p>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Filter by SKU, Product or Adjustment ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400 outline-none shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 outline-none hover:border-slate-300 cursor-pointer shadow-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>In</option>
              <option>Out</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:text-rose-600 transition-colors shadow-sm">
              <Filter size={16} />
              Advanced
            </button>
          </div>
        </div>

        {/* TABLE LOG */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & SKU</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty Change</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valuation</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900">{adj.id}</span>
                        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 mt-0.5">
                          <Calendar size={10} />
                          {adj.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                          <Package size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-700">{adj.productName}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{adj.sku} • {adj.warehouse}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${adj.type === 'In' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {adj.type === 'In' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {adj.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-black ${adj.type === 'In' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {adj.type === 'In' ? '+' : '-'}{adj.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${getReasonColor(adj.reason)}`}>
                        {adj.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-black ${adj.valueImpact >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        ${Math.abs(adj.valueImpact).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {adj.adjustedBy.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-slate-600">{adj.adjustedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {adj.status === "Pending Approval" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                            <CheckCircle2 size={18} />
                          </button>
                          <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </div>
                      ) : (
                        <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                          <FileText size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredAdjustments.length} records</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-500 hover:bg-slate-50 transition shadow-sm">PREV</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-500 hover:bg-slate-50 transition shadow-sm">NEXT</button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: INTERNAL MOVEMENTS & ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-4">
              <Layers size={18} className="text-indigo-600" />
              Reason Frequency
            </h3>
            <div className="space-y-4">
              {[
                { label: "Cycle Counts", count: 42, color: "bg-indigo-500", pct: 65 },
                { label: "Damages", count: 12, color: "bg-rose-500", pct: 18 },
                { label: "Theft/Loss", count: 3, color: "bg-red-600", pct: 5 },
                { label: "Others", count: 8, color: "bg-slate-400", pct: 12 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900">{item.count} events</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck size={20} className="text-indigo-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">Audit Integrity</h3>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Your last full warehouse audit was 14 days ago. To maintain a variance level below 1.5%, we recommend initiating a cycle count for the <span className="text-white font-bold">Hardware</span> category.
              </p>
            </div>
            <button className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-900/20 uppercase tracking-widest">
              Schedule Audit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}