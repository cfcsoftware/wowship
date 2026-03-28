"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ArrowRightLeft,
  ArrowRight,
  Truck,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Filter,
  Download,
  MapPin,
  ChevronRight,
  Hash,
  Boxes
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type TransferStatus = "Draft" | "In Transit" | "Delivered" | "Delayed" | "Cancelled";

interface TransferItem {
  sku: string;
  name: string;
  quantity: number;
}

interface StockTransfer {
  id: string;
  origin: string;
  destination: string;
  itemsCount: number;
  totalQuantity: number;
  status: TransferStatus;
  requestedDate: string;
  estimatedArrival: string;
  carrier: string;
  trackingNumber: string;
  priority: "Low" | "Medium" | "High";
  items: TransferItem[];
}

/* ---------------- MOCK DATA ---------------- */
const TRANSFER_DATA: StockTransfer[] = [
  {
    id: "TRF-98210",
    origin: "Central Distribution Hub",
    destination: "Perth Logistics Center",
    itemsCount: 12,
    totalQuantity: 450,
    status: "In Transit",
    requestedDate: "2024-03-14",
    estimatedArrival: "2024-03-18",
    carrier: "StarTrack Express",
    trackingNumber: "ST-882-991",
    priority: "High",
    items: [{ sku: "CPU-I9-12K", name: "Intel i9 Processor", quantity: 50 }]
  },
  {
    id: "TRF-98211",
    origin: "Brisbane Satellite",
    destination: "Melbourne Cold Link",
    itemsCount: 5,
    totalQuantity: 120,
    status: "Delivered",
    requestedDate: "2024-03-10",
    estimatedArrival: "2024-03-12",
    carrier: "DHL Supply Chain",
    trackingNumber: "DHL-002-114",
    priority: "Medium",
    items: []
  },
  {
    id: "TRF-98212",
    origin: "Perth Logistics Center",
    destination: "Central Distribution Hub",
    itemsCount: 22,
    totalQuantity: 1100,
    status: "Delayed",
    requestedDate: "2024-03-12",
    estimatedArrival: "2024-03-15",
    carrier: "FedEx Ground",
    trackingNumber: "FDX-998-122",
    priority: "High",
    items: []
  },
  {
    id: "TRF-98213",
    origin: "Hazmat Handling Facility",
    destination: "Brisbane Satellite",
    itemsCount: 2,
    totalQuantity: 40,
    status: "Draft",
    requestedDate: "2024-03-16",
    estimatedArrival: "2024-03-22",
    carrier: "Toll Global",
    trackingNumber: "Pending",
    priority: "Low",
    items: []
  },
  {
    id: "TRF-98214",
    origin: "Melbourne Cold Link",
    destination: "Perth Logistics Center",
    itemsCount: 8,
    totalQuantity: 320,
    status: "In Transit",
    requestedDate: "2024-03-15",
    estimatedArrival: "2024-03-19",
    carrier: "Linfox",
    trackingNumber: "LX-441-202",
    priority: "Medium",
    items: []
  }
];

/* ---------------- UI HELPERS ---------------- */
const getStatusBadge = (status: TransferStatus) => {
  const configs: Record<TransferStatus, { color: string; icon: React.ReactNode }> = {
    "In Transit": { color: "bg-blue-50 text-blue-700 ring-blue-600/20", icon: <Truck size={12} /> },
    "Delivered": { color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", icon: <CheckCircle2 size={12} /> },
    "Delayed": { color: "bg-rose-50 text-rose-700 ring-rose-600/20", icon: <AlertCircle size={12} /> },
    "Draft": { color: "bg-slate-50 text-slate-700 ring-slate-600/20", icon: <Clock size={12} /> },
    "Cancelled": { color: "bg-gray-50 text-gray-500 ring-gray-600/20", icon: <Clock size={12} /> },
  };
  const config = configs[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "text-rose-600";
    case "Medium": return "text-amber-600";
    default: return "text-slate-400";
  }
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function StockTransferPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Transfers");

  const filteredTransfers = useMemo(() => {
    return TRANSFER_DATA.filter(t => {
      const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All Transfers" || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="text-indigo-600" size={24} />
              Stock Transfers
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium italic">Track inter-warehouse logistics and inventory transit.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export Manifest
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
              <Plus size={16} />
              New Transfer Request
            </button>
          </div>
        </header>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pending Requests", value: "08", sub: "Awaiting approval", color: "text-slate-900" },
            { label: "Active Shipments", value: "14", sub: "On the road", color: "text-blue-600" },
            { label: "Delivery Performance", value: "98.2%", sub: "On-time arrival", color: "text-emerald-600" },
            { label: "Delayed Alerts", value: "02", sub: "Action required", color: "text-rose-600" },
          ].map((m, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${m.color}`}>{m.value}</span>
                <span className="text-[10px] font-bold text-slate-400 italic lowercase">{m.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Transfer ID, Location, or Tracking #..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Transfers</option>
                <option>Draft</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Delayed</option>
              </select>
              <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* LIST TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route & Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Inventory</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipment Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Logistics</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Route & ID */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <ArrowRightLeft size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-black text-slate-900">{transfer.id}</span>
                          <span className={`text-[10px] font-black ${getPriorityColor(transfer.priority)} uppercase tracking-tighter`}>
                            • {transfer.priority} Priority
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <span className="flex items-center gap-1"><MapPin size={10}/> {transfer.origin}</span>
                          <ArrowRight size={10} className="text-slate-300" />
                          <span className="text-slate-700">{transfer.destination}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Inventory Summary */}
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                        <Boxes size={14} className="text-slate-400" />
                        {transfer.totalQuantity} Units
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Across {transfer.itemsCount} SKUs
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="space-y-1.5">
                      {getStatusBadge(transfer.status)}
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Calendar size={10} />
                        Est. {transfer.estimatedArrival}
                      </div>
                    </div>
                  </td>

                  {/* Logistics Detail */}
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="space-y-1">
                      <div className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                        <Truck size={14} className="text-slate-400" />
                        {transfer.carrier}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tighter">
                        <Hash size={10} />
                        {transfer.trackingNumber}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                        <ChevronRight size={18} />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTransfers.length === 0 && (
            <div className="py-20 text-center">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-lg font-black text-slate-900">No transfers found</h3>
              <p className="text-sm font-medium text-slate-400">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* TABLE FOOTER */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Showing <span className="text-slate-900">{filteredTransfers.length}</span> of {TRANSFER_DATA.length} active routes
            </p>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-xs font-black border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">PREV</button>
              <button className="px-3 py-1 text-xs font-black border border-indigo-200 rounded bg-indigo-50 text-indigo-600">1</button>
              <button className="px-3 py-1 text-xs font-black border border-slate-200 rounded bg-white text-slate-700 hover:bg-slate-50">2</button>
              <button className="px-3 py-1 text-xs font-black border border-slate-200 rounded bg-white text-slate-700 hover:bg-slate-50">NEXT</button>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-lg">Route Optimization</h3>
              <p className="text-indigo-100 text-xs font-medium mt-1">AI-suggested routes for Perth-Melbourne lane.</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors">
              View Analytics
            </button>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Transfer Discrepancy</h3>
                <p className="text-slate-400 text-xs font-bold mt-0.5 uppercase tracking-tighter">TRF-98212 missing 2 units of bulk cable.</p>
              </div>
            </div>
            <button className="text-rose-600 text-xs font-black uppercase tracking-widest hover:underline">
              Resolve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}