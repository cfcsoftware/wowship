"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  MoreHorizontal, 
  Calendar, 
  Building2, 
  Wallet,
  DollarSign,
  ChevronDown,
  History,
  Eye,
  ArrowLeft,
  Mail,
  ArrowDownLeft,
  Banknote,
  RefreshCcw
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const PAYMENTS = [
  {
    id: "PAY-9901-2024",
    vendor: "TechSolutions Pro",
    date: "2024-03-20",
    amount: 12450.00,
    method: "ACH Transfer",
    bank: "Chase Operating (...4402)",
    status: "cleared",
    reference: "REF-882190",
    billRef: "BILL-2024-001"
  },
  {
    id: "PAY-9902-2024",
    vendor: "Modern Office Co.",
    date: "2024-03-19",
    amount: 3200.50,
    method: "Wire Transfer",
    bank: "Chase Operating (...4402)",
    status: "processing",
    reference: "REF-882191",
    billRef: "BILL-2024-002"
  },
  {
    id: "PAY-9903-2024",
    vendor: "Adobe Systems Inc",
    date: "2024-03-15",
    amount: 899.00,
    method: "Corporate CC",
    bank: "AMEX Platinum (...1004)",
    status: "cleared",
    reference: "REF-882192",
    billRef: "BILL-2024-003"
  },
  {
    id: "PAY-9904-2024",
    vendor: "Global Logistics Ltd",
    date: "2024-03-12",
    amount: 4500.00,
    method: "Check #4402",
    bank: "Chase Operating (...4402)",
    status: "voided",
    reference: "REF-882193",
    billRef: "BILL-2024-004"
  },
  {
    id: "PAY-9905-2024",
    vendor: "Amazon Web Services",
    date: "2024-03-10",
    amount: 15420.00,
    method: "ACH Transfer",
    bank: "Chase Operating (...4402)",
    status: "cleared",
    reference: "REF-882194",
    billRef: "BILL-2024-005"
  }
];

const STATUS_CONFIG = {
  cleared: { bg: "bg-emerald-50 text-emerald-700", label: "Cleared", icon: CheckCircle2 },
  processing: { bg: "bg-amber-50 text-amber-700", label: "In Transit", icon: Clock },
  voided: { bg: "bg-slate-100 text-slate-500", label: "Voided", icon: ShieldCheck },
  failed: { bg: "bg-rose-50 text-rose-700", label: "Failed", icon: RefreshCcw },
};

const METHOD_ICONS = {
  "ACH Transfer": <Banknote size={14} className="text-indigo-500" />,
  "Wire Transfer": <ArrowUpRight size={14} className="text-blue-500" />,
  "Corporate CC": <CreditCard size={14} className="text-purple-500" />,
  "Check #4402": <Wallet size={14} className="text-amber-500" />,
};

export default function VendorPayments() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredPayments = activeTab === "all" 
    ? PAYMENTS 
    : PAYMENTS.filter(p => p.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-100">
                <Wallet className="text-white" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Treasury & Cash</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Vendor Payments
            </h1>
            <p className="text-sm font-medium text-slate-500">Track and reconcile outbound cash transactions.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} />
              Bank Statement
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <PlusIcon size={16} />
              New Payment
            </button>
          </div>
        </div>

        {/* TREASURY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ArrowUpRight size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Paid (MTD)</p>
              <p className="text-2xl font-black text-slate-900">$36,470.00</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Transit</p>
              <p className="text-2xl font-black text-slate-900">$3,200.50</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <RefreshCcw size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Scheduled Run</p>
              <p className="text-2xl font-black text-slate-900">Mar 25</p>
            </div>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Tabs & Search */}
          <div className="px-8 py-6 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
              {['all', 'cleared', 'processing', 'voided'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search payments, vendors, or refs..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Payment Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Vendor</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Method & Bank</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Reconciliation</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 tracking-tight">{pay.date}</span>
                        <span className="text-[10px] font-bold text-slate-400 mt-0.5">{pay.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-black text-xs">
                          {pay.vendor.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{pay.vendor}</p>
                          <p className="text-[10px] font-bold text-indigo-500">Bill: {pay.billRef}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {METHOD_ICONS[pay.method]}
                          <span className="text-xs font-bold text-slate-700">{pay.method}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{pay.bank}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900 tracking-tight">
                        ${pay.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${STATUS_CONFIG[pay.status].bg}`}>
                        {React.createElement(STATUS_CONFIG[pay.status].icon, { size: 12 })}
                        {STATUS_CONFIG[pay.status].label}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button 
                        onClick={() => setSelectedPayment(pay)}
                        className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                       >
                         <Eye size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAYMENT SLIP / DETAIL SIDEBAR */}
      {selectedPayment && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedPayment(null)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button onClick={() => setSelectedPayment(null)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to List
              </button>
              <h3 className="text-sm font-black text-slate-900 tracking-widest uppercase">Payment Receipt</h3>
              <div className="w-10" />
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              {/* Receipt Header */}
              <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-50">
                    <CheckCircle2 size={40} strokeWidth={2.5} />
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-4xl font-black text-slate-900">${selectedPayment.amount.toLocaleString()}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Transaction Cleared</p>
                 </div>
              </div>

              {/* Transaction Specs */}
              <div className="bg-slate-50 rounded-[2rem] p-8 space-y-6">
                 {[
                   { label: "Vendor", value: selectedPayment.vendor },
                   { label: "Payment Date", value: selectedPayment.date },
                   { label: "Reference ID", value: selectedPayment.id },
                   { label: "Bank Source", value: selectedPayment.bank },
                   { label: "Method", value: selectedPayment.method },
                   { label: "Internal Tracking", value: selectedPayment.reference },
                 ].map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center border-b border-slate-200/50 pb-4 last:border-0 last:pb-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-bold text-slate-800">{item.value}</span>
                   </div>
                 ))}
              </div>

              {/* Related Bill */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Document</p>
                <div className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl bg-white hover:border-indigo-200 cursor-pointer transition-all group shadow-sm">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{selectedPayment.billRef}</p>
                        <p className="text-[10px] font-bold text-slate-400">Inventory Purchase March</p>
                      </div>
                   </div>
                   <ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>

              {/* Security Seal */}
              <div className="flex items-center justify-center gap-3 py-6 opacity-30">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted</span>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="p-8 border-t border-slate-100 flex gap-4">
               <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Mail size={16} /> Remittance Advice
              </button>
               <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function PlusIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}