"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  DollarSign,
  Briefcase,
  Calendar,
  Eye,
  Receipt,
  TrendingUp
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";

interface Order {
  id: string;
  customerName: string;
  company: string;
  amount: number;
  status: OrderStatus;
  orderDate: string;
  expectedDelivery: string;
  itemsCount: number;
  region: "AU" | "NZ" | "US";
}

/* ---------------- MOCK DATA ---------------- */
const ORDERS: Order[] = Array.from({ length: 20 }, (_, i) => {
  const companies = ["Apex Solutions AU", "Global Tech NZ", "CloudScale US", "Lumina Partners", "Horizon Corp", "Nexus Industries"];
  const contacts = ["Oliver Wright", "Sophie Bennett", "Jack Harrison", "Amelia Wong", "Lachlan Smith", "Emma Davis"];
  const statuses: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Delivered", "Cancelled", "Refunded"];
  const regions: ("AU" | "NZ" | "US")[] = ["AU", "NZ", "US"];

  const baseDay = 28;
  const orderDay = baseDay - (i % 14);
  const deliveryDay = orderDay + 7;

  return {
    id: `ORD-${20000 + i}`,
    customerName: contacts[i % contacts.length],
    company: companies[i % companies.length],
    amount: Math.floor(Math.random() * 80000) + 2500,
    status: statuses[i % statuses.length],
    orderDate: `2024-05-${orderDay.toString().padStart(2, '0')}`,
    expectedDelivery: `2024-05-${(deliveryDay > 31 ? deliveryDay - 31 : deliveryDay).toString().padStart(2, '0')}`,
    itemsCount: Math.floor(Math.random() * 10) + 1,
    region: regions[i % 3],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: OrderStatus) => {
  const styles: Record<OrderStatus, string> = {
    "Processing": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Shipped": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Delivered": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Cancelled": "bg-slate-50 text-slate-700 ring-slate-600/20",
    "Refunded": "bg-rose-50 text-rose-700 ring-rose-600/20",
  };
  
  const icons: Record<OrderStatus, React.ReactNode> = {
    "Processing": <Package size={10} />,
    "Shipped": <Truck size={10} />,
    "Delivered": <CheckCircle2 size={10} />,
    "Cancelled": <XCircle size={10} />,
    "Refunded": <RotateCcw size={10} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredOrders = useMemo(() => {
    return ORDERS.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Statuses" || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Aggregate Stats
  const totalRevenue = ORDERS.filter(o => o.status === "Delivered" || o.status === "Shipped").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingFulfillment = ORDERS.filter(o => o.status === "Processing").length;
  const avgOrderValue = totalRevenue / (ORDERS.filter(o => o.status === "Delivered" || o.status === "Shipped").length || 1);
  const refundTotal = ORDERS.filter(o => o.status === "Refunded").reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <ShoppingCart className="text-indigo-600" size={24} />
              Orders & Fulfillment
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Track customer orders, shipping statuses, and realized revenue.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md">
              <Plus size={16} />
              Create Order
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Realized Revenue</p>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(totalRevenue / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Shipped & Delivered orders</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Fulfillment</p>
              <Package size={16} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{pendingFulfillment}</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Orders currently processing</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Order Value</p>
              <DollarSign size={16} className="text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(avgOrderValue / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Across completed sales</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refunded Value</p>
              <RotateCcw size={16} className="text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(refundTotal / 1000).toFixed(1)}k</p>
            <p className="mt-2 text-slate-400 text-[10px] font-medium">Processed refunds to date</p>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Order ID, Company, or Customer..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 appearance-none outline-none hover:border-slate-300 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Refunded</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Order Info</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Total Amount (USD)</th>
                  <th className="px-6 py-4">Status & Logistics</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                          {order.id}
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase">{order.region}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar size={12} className="text-slate-400" />
                          {order.orderDate}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                          <Briefcase size={14} className="text-slate-400" />
                          {order.company}
                        </div>
                        <div className="text-[10px] text-slate-500 ml-5">{order.customerName}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className={`text-sm font-bold ${order.status === 'Refunded' ? 'text-rose-600 line-through' : 'text-slate-800'}`}>
                          ${order.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(order.status)}
                        {order.status !== 'Cancelled' && order.status !== 'Refunded' && (
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <span className="w-10 inline-block font-medium">ETA:</span> {order.expectedDelivery}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Order Details">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View Invoice">
                          <Receipt size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-800 font-bold">{filteredOrders.length}</span> of {ORDERS.length} orders
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-600 bg-white shadow-sm font-bold text-xs px-3">
                1
              </button>
              <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}