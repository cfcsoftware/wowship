"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Package,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  Truck,
  Archive,
  Filter,
  ChevronDown,
  History,
  ShoppingCart,
  MapPin,
  CheckCircle2,
  Clock,
  BarChart2
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Overstocked";

interface StockItem {
  sku: string;
  name: string;
  category: string;
  subCategory: string;
  warehouseLocation: string;
  onHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  unit: string;
  status: StockStatus;
  lastCounted: string;
}

/* ---------------- MOCK DATA ---------------- */
const STOCK_DATA: StockItem[] = [
  {
    sku: "EL-KB-001",
    name: "Keychron K2 Mechanical Keyboard",
    category: "Electronics",
    subCategory: "Mechanical Keyboards",
    warehouseLocation: "A-12-04",
    onHand: 450,
    reserved: 120,
    available: 330,
    reorderPoint: 100,
    unit: "Units",
    status: "In Stock",
    lastCounted: "2024-03-25",
  },
  {
    sku: "FUR-CH-042",
    name: "Herman Miller Aeron - Size B",
    category: "Furniture",
    subCategory: "Ergonomic Chairs",
    warehouseLocation: "W-05-01",
    onHand: 12,
    reserved: 8,
    available: 4,
    reorderPoint: 10,
    unit: "Units",
    status: "Low Stock",
    lastCounted: "2024-03-28",
  },
  {
    sku: "OFF-PN-882",
    name: "Pilot G2 Premium Gel Pens (Black)",
    category: "Office Supplies",
    subCategory: "Writing Instruments",
    warehouseLocation: "B-02-11",
    onHand: 4200,
    reserved: 150,
    available: 4050,
    reorderPoint: 500,
    unit: "Boxes",
    status: "Overstocked",
    lastCounted: "2024-03-20",
  },
  {
    sku: "SAF-HL-009",
    name: "3M Industrial Hard Hat - White",
    category: "Safety Gear",
    subCategory: "Head Protection",
    warehouseLocation: "S-09-02",
    onHand: 0,
    reserved: 0,
    available: 0,
    reorderPoint: 50,
    unit: "Units",
    status: "Out of Stock",
    lastCounted: "2024-03-27",
  },
  {
    sku: "EL-MS-055",
    name: "Logitech MX Master 3S",
    category: "Electronics",
    subCategory: "Wireless Mice",
    warehouseLocation: "A-12-09",
    onHand: 85,
    reserved: 12,
    available: 73,
    reorderPoint: 25,
    unit: "Units",
    status: "In Stock",
    lastCounted: "2024-03-26",
  },
  {
    sku: "HRD-PT-221",
    name: "Dewalt 20V Max Cordless Drill",
    category: "Hardware",
    subCategory: "Power Tools",
    warehouseLocation: "H-04-15",
    onHand: 24,
    reserved: 5,
    available: 19,
    reorderPoint: 20,
    unit: "Units",
    status: "Low Stock",
    lastCounted: "2024-03-22",
  }
];

/* ---------------- STYLES HELPERS ---------------- */
const getStatusStyles = (status: StockStatus) => {
  const styles: Record<StockStatus, string> = {
    "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Low Stock": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Overstocked": "bg-blue-50 text-blue-700 ring-blue-600/20",
  };
  return `inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${styles[status]}`;
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function StockManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredStock = useMemo(() => {
    return STOCK_DATA.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <Package className="text-emerald-600" size={24} />
              Stock Inventory
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">Real-time tracking of levels, locations, and movements.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <History size={16} />
              Log
            </button>
            <button className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-100">
              <Plus size={16} />
              Stock Adjustment
            </button>
          </div>
        </header>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total SKUs</p>
              <BarChart2 size={16} className="text-slate-300" />
            </div>
            <p className="text-2xl font-black text-slate-900">1,482</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">Across 12 Categories</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Low/Out of Stock</p>
              <AlertTriangle size={16} className="text-rose-400" />
            </div>
            <p className="text-2xl font-black text-slate-900">24</p>
            <p className="text-[10px] text-rose-600 font-bold mt-1 uppercase tracking-tighter">Requires Urgent Reorder</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incoming Today</p>
              <Truck size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">850</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">Units in Transit</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reserved Items</p>
              <ShoppingCart size={16} className="text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">312</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">Pending Customer Orders</p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Product Name or SKU..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-44 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
                <option>Overstocked</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">SKU & Product</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-center">Quantities</th>
                  <th className="px-6 py-4">Reorder Point</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStock.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-black text-slate-900 text-sm leading-tight">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{item.sku}</span>
                          <span className="text-[10px] font-medium text-slate-400">• {item.subCategory}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={14} className="text-slate-300" />
                        <span className="text-xs font-black tracking-wider uppercase">{item.warehouseLocation}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase">On Hand</p>
                          <p className="text-sm font-black text-slate-900">{item.onHand}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase">Res.</p>
                          <p className="text-sm font-bold text-blue-600">{item.reserved}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase">Avail.</p>
                          <p className="text-sm font-black text-emerald-600">{item.available}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-slate-800">{item.reorderPoint}</div>
                        {item.available <= item.reorderPoint && item.available > 0 && (
                          <div className="animate-pulse bg-amber-500 w-2 h-2 rounded-full" />
                        )}
                        {item.available === 0 && (
                          <div className="bg-rose-500 w-2 h-2 rounded-full" />
                        )}
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.unit}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className={getStatusStyles(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Add Stock">
                          <ArrowUp size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Remove Stock">
                          <ArrowDown size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Normal
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500" /> Low
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500" /> Critical
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> Last Full Audit: 2024-03-01
              </span>
              <button className="text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest underline decoration-2 underline-offset-4">
                Full Inventory Report
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}