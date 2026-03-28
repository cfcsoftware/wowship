"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ShoppingCart,
  Truck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Filter,
  Download,
  Building2,
  ChevronRight,
  DollarSign,
  CalendarDays,
  ArrowDownToLine,
  Eye
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type POStatus = "Draft" | "Pending Approval" | "Ordered" | "Partially Received" | "Received" | "Closed" | "Cancelled";

interface PurchaseOrder {
  id: string;
  vendorName: string;
  vendorCode: string;
  totalAmount: number;
  currency: string;
  status: POStatus;
  issueDate: string;
  expectedDate: string;
  itemsCount: number;
  paymentStatus: "Unpaid" | "Partial" | "Paid";
  priority: "Standard" | "Urgent";
}

/* ---------------- MOCK DATA ---------------- */
const PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    vendorName: "TechLogistics Solutions Ltd",
    vendorCode: "VND-TECH-01",
    totalAmount: 12450.00,
    currency: "USD",
    status: "Ordered",
    issueDate: "2024-03-10",
    expectedDate: "2024-03-25",
    itemsCount: 15,
    paymentStatus: "Unpaid",
    priority: "Urgent"
  },
  {
    id: "PO-2024-002",
    vendorName: "Global Parts Corp",
    vendorCode: "VND-GLO-99",
    totalAmount: 4200.50,
    currency: "USD",
    status: "Partially Received",
    issueDate: "2024-03-12",
    expectedDate: "2024-03-20",
    itemsCount: 8,
    paymentStatus: "Partial",
    priority: "Standard"
  },
  {
    id: "PO-2024-003",
    vendorName: "Silicon Valley Imports",
    vendorCode: "VND-SIL-22",
    totalAmount: 890.00,
    currency: "USD",
    status: "Received",
    issueDate: "2024-03-05",
    expectedDate: "2024-03-08",
    itemsCount: 3,
    paymentStatus: "Paid",
    priority: "Standard"
  },
  {
    id: "PO-2024-004",
    vendorName: "North Star Manufacturing",
    vendorCode: "VND-NSM-05",
    totalAmount: 28500.00,
    currency: "USD",
    status: "Pending Approval",
    issueDate: "2024-03-18",
    expectedDate: "2024-04-05",
    itemsCount: 42,
    paymentStatus: "Unpaid",
    priority: "Urgent"
  },
  {
    id: "PO-2024-005",
    vendorName: "EcoPack Supplies",
    vendorCode: "VND-ECO-11",
    totalAmount: 120.00,
    currency: "USD",
    status: "Draft",
    issueDate: "2024-03-19",
    expectedDate: "2024-03-22",
    itemsCount: 1,
    paymentStatus: "Unpaid",
    priority: "Standard"
  }
];

/* ---------------- UI HELPERS ---------------- */
const getStatusBadge = (status: POStatus) => {
  const configs: Record<POStatus, { color: string; icon: React.ReactNode }> = {
    "Ordered": { color: "bg-blue-50 text-blue-700 ring-blue-600/20", icon: <Truck size={12} /> },
    "Received": { color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", icon: <CheckCircle2 size={12} /> },
    "Partially Received": { color: "bg-orange-50 text-orange-700 ring-orange-600/20", icon: <ShoppingCart size={12} /> },
    "Pending Approval": { color: "bg-purple-50 text-purple-700 ring-purple-600/20", icon: <Clock size={12} /> },
    "Draft": { color: "bg-slate-50 text-slate-700 ring-slate-600/20", icon: <FileText size={12} /> },
    "Closed": { color: "bg-gray-50 text-gray-500 ring-gray-600/20", icon: <CheckCircle2 size={12} /> },
    "Cancelled": { color: "bg-rose-50 text-rose-700 ring-rose-600/20", icon: <AlertCircle size={12} /> },
  };
  const config = configs[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

const getPaymentBadge = (status: string) => {
  switch(status) {
    case "Paid": return "text-emerald-600";
    case "Partial": return "text-amber-600";
    default: return "text-slate-400";
  }
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredPOs = useMemo(() => {
    return PURCHASE_ORDERS.filter(po => {
      const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            po.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || po.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <ShoppingCart size={20} />
              </div>
              Purchase Orders
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Manage vendor procurement, supply chain intake, and billing.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Report
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
              <Plus size={16} />
              Create PO
            </button>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Committed", value: "$45,210", sub: "Open PO Value", icon: <DollarSign size={16}/>, color: "text-indigo-600" },
            { label: "Pending Approval", value: "04", sub: "Requires Signature", icon: <Clock size={16}/>, color: "text-purple-600" },
            { label: "Inbound Today", value: "12", sub: "Expected Shipments", icon: <Truck size={16}/>, color: "text-blue-600" },
            { label: "Overdue Supply", value: "01", sub: "Critical Delay", icon: <AlertCircle size={16}/>, color: "text-rose-600" },
          ].map((m, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 ${m.color}`}>
                {m.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-xl font-black text-slate-900`}>{m.value}</span>
                  <span className="text-[10px] font-bold text-slate-400 lowercase">{m.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Filter by PO#, Vendor name or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 outline-none hover:border-slate-300 cursor-pointer shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Draft</option>
              <option>Pending Approval</option>
              <option>Ordered</option>
              <option>Partially Received</option>
              <option>Received</option>
            </select>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* PO TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPOs.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* ID & Date */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {po.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1 uppercase">
                          <CalendarDays size={10} />
                          Issued: {po.issueDate}
                        </div>
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                          {po.vendorName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-700">{po.vendorName}</span>
                          <span className="text-[10px] font-medium text-slate-400">{po.vendorCode}</span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">
                          {po.totalAmount.toLocaleString('en-US', { style: 'currency', currency: po.currency })}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">
                          {po.itemsCount} SKUs Included
                        </span>
                      </div>
                    </td>

                    {/* Lifecycle/Status */}
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        {getStatusBadge(po.status)}
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <Truck size={10} />
                          ETA: {po.expectedDate}
                        </div>
                      </div>
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-current ${getPaymentBadge(po.paymentStatus)}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${getPaymentBadge(po.paymentStatus)}`}>
                          {po.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="Download PDF">
                          <ArrowDownToLine size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {filteredPOs.length === 0 && (
            <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full text-slate-200 mb-4">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900">No purchase orders</h3>
              <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto mt-1">
                We couldn't find any orders matching your criteria. Try widening your search.
              </p>
            </div>
          )}

          {/* PAGINATION */}
          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing Page 1 of 12
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-[10px] font-black bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-1.5 text-[10px] font-black bg-indigo-600 border border-indigo-600 rounded-lg text-white shadow-sm">Next Page</button>
            </div>
          </div>
        </div>

        {/* BOTTOM VENDOR COLLABORATION CARD */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-2 py-0.5 bg-emerald-500 rounded text-[10px] font-black uppercase">Active Lane</div>
              <h3 className="text-xl font-black">Supply Chain Health</h3>
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-md">
              Vendor lead times have increased by <span className="text-rose-400 font-black">12%</span> this month. Consider adjusting safety stock levels for high-priority items.
            </p>
          </div>
          <div className="flex gap-3 relative z-10 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
              Vendor Audit
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
              Optimize Orders
            </button>
          </div>
          {/* Decorative background element */}
          <ShoppingCart className="absolute -right-8 -bottom-8 text-white/5 w-48 h-48 rotate-12" />
        </div>

      </div>
    </div>
  );
}