"use client";

import React, { useState } from "react";
import { 
  FileCheck, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Building2,
  Calendar,
  DollarSign,
  Package,
  Mail,
  Download,
  CreditCard,
  MapPin,
  ChevronRight,
  X
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const PURCHASE_ORDERS = [
  { 
    id: "PO-2024-8801", 
    prSource: "PR-2024-001",
    vendor: "TechSolutions Pro", 
    vendorContact: "sales@techsolutions.com",
    date: "Oct 26, 2023", 
    deliveryDate: "Nov 05, 2023",
    total: 12500.00, 
    status: "issued", 
    fulfillment: "unshipped",
    paymentTerms: "Net 30",
    items: [
      { sku: "HW-992", name: "Dell XPS 17", qty: 3, unitPrice: 3500 },
      { sku: "MN-102", name: "LG UltraFine 5K", qty: 3, unitPrice: 666.67 }
    ]
  },
  { 
    id: "PO-2024-8802", 
    prSource: "PR-2024-002",
    vendor: "Modern Office Co.", 
    vendorContact: "orders@modernoffice.com",
    date: "Oct 25, 2023", 
    deliveryDate: "Nov 12, 2023",
    total: 4200.50, 
    status: "confirmed", 
    fulfillment: "partial",
    paymentTerms: "Net 15",
    items: [
      { sku: "FN-881", name: "Ergonomic Chairs", qty: 10, unitPrice: 350 },
      { sku: "FN-220", name: "Standing Desks", qty: 2, unitPrice: 350.25 }
    ]
  },
  { 
    id: "PO-2024-8803", 
    prSource: "PR-2024-015",
    vendor: "Adobe Systems Inc", 
    vendorContact: "billing@adobe.com",
    date: "Oct 24, 2023", 
    deliveryDate: "Immediate",
    total: 599.88, 
    status: "closed", 
    fulfillment: "fulfilled",
    paymentTerms: "Credit Card",
    items: [
      { sku: "SW-CC-01", name: "Annual Team License", qty: 1, unitPrice: 599.88 }
    ]
  },
  { 
    id: "PO-2024-8804", 
    prSource: "PR-2024-004",
    vendor: "Amazon Web Services", 
    vendorContact: "aws-billing@amazon.com",
    date: "Oct 24, 2023", 
    deliveryDate: "Recurring",
    total: 8900.00, 
    status: "issued", 
    fulfillment: "fulfilled",
    paymentTerms: "Monthly Billing",
    items: [
      { sku: "CLD-RI-01", name: "AWS Reserved Instances", qty: 1, unitPrice: 8900 }
    ]
  }
];

const STATUS_THEMES = {
  issued: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", icon: Clock },
  confirmed: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", icon: FileCheck },
  closed: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100", icon: CheckCircle },
  cancelled: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", icon: AlertCircle },
};

const FULFILLMENT_THEMES = {
  unshipped: "bg-slate-100 text-slate-500",
  partial: "bg-amber-100 text-amber-600",
  fulfilled: "bg-emerald-100 text-emerald-600",
};

export default function PurchaseOrdersPage() {
  const [selectedPO, setSelectedPO] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredPOs = PURCHASE_ORDERS.filter(po => 
    filter === "all" || po.status === filter
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* MAIN CONTENT */}
      <div className={`flex-1 p-6 md:p-8 transition-all duration-300 ${selectedPO ? 'mr-[500px]' : ''}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-indigo-600 rounded-lg shadow-indigo-100 shadow-lg">
                  <FileCheck className="text-white" size={20} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Procurement</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Purchase Orders</h1>
              <p className="text-slate-500 font-medium">Manage legally binding orders issued to your verified vendors.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Download size={18} />
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Plus size={18} />
                Create PO
              </button>
            </div>
          </div>

          {/* QUICK DASHBOARD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Open Value</p>
                <p className="text-2xl font-black text-slate-900">$84,200.00</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pending Deliveries</p>
                <p className="text-2xl font-black text-slate-900">08</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fulfilled this Month</p>
                <p className="text-2xl font-black text-slate-900">24</p>
              </div>
            </div>
          </div>

          {/* TABLE CONTROLS */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
             <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search vendor or PO#..." 
                className="w-full pl-12 pr-4 py-2 text-sm bg-transparent outline-none"
              />
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto">
              {['all', 'issued', 'confirmed', 'closed'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap ${
                    filter === t ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 flex items-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">
              <Filter size={16} /> Filters
            </button>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Information</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Vendor</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Order Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Fulfillment</th>
                  <th className="px-6 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPOs.map((po) => (
                  <tr 
                    key={po.id} 
                    onClick={() => setSelectedPO(po)}
                    className="group hover:bg-indigo-50/30 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{po.id}</span>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          Ref: <span className="text-indigo-500 uppercase">{po.prSource}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                          {po.vendor.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{po.vendor}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{po.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-black text-slate-900">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(po.total)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${STATUS_THEMES[po.status].bg} ${STATUS_THEMES[po.status].text} ${STATUS_THEMES[po.status].border}`}>
                          <div className={`w-1 h-1 rounded-full bg-current`} />
                          <span className="text-[10px] font-black uppercase tracking-wider">{po.status}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${FULFILLMENT_THEMES[po.fulfillment]}`}>
                          {po.fulfillment}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-300 group-hover:text-slate-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DRAWER FOR PO DETAILS */}
      {selectedPO && (
        <div className="fixed right-0 top-0 h-full w-[500px] bg-white border-l border-slate-200 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-900">{selectedPO.id}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">External Purchase Order</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all">
                <Download size={18} />
              </button>
              <button 
                onClick={() => setSelectedPO(null)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Vendor Profile */}
            <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Building2 size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 leading-none mb-1">{selectedPO.vendor}</h4>
                <p className="text-xs text-indigo-600 font-medium mb-3 flex items-center gap-1">
                  <Mail size={12} /> {selectedPO.vendorContact}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Terms</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <CreditCard size={12} className="text-slate-400" /> {selectedPO.paymentTerms}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Delivery Type</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Truck size={12} className="text-slate-400" /> Standard Freight
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Truck size={14} /> Logistics Timeline
                </h4>
                <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 cursor-pointer hover:underline">
                  Track Shipment <ExternalLink size={10} />
                </span>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Estimated Delivery</p>
                    <p className="text-sm font-black text-slate-900">{selectedPO.deliveryDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Shipping To</p>
                    <p className="text-sm font-black text-slate-900">Main Warehouse, Dock 4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Package size={14} /> Order Breakdown
              </h4>
              <div className="space-y-2">
                {selectedPO.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter mb-0.5">{item.sku}</p>
                      <h5 className="text-xs font-black text-slate-800">{item.name}</h5>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.qty} units × ${item.unitPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">${(item.qty * item.unitPrice).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-900 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Total</span>
                <span className="text-lg font-black text-white">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedPO.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 flex items-center gap-4">
             <button className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
               Mark Received
             </button>
             <button className="p-3.5 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all">
                <MoreHorizontal size={20} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}