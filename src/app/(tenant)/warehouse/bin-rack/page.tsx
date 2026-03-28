"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Layers,
  Box,
  TrendingUp,
  ArrowRight,
  Edit3,
  Trash2,
  Tag,
  ChevronDown,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Component,
  Link2,
  LayoutGrid
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface SubCategory {
  id: string;
  name: string;
  parentCategory: string;
  productCount: number;
  avgPrice: number;
  stockLevel: number;
  trend: "up" | "down" | "stable";
  status: "Active" | "Archived";
  iconColor: string;
}

/* ---------------- MOCK DATA ---------------- */
const PARENT_CATEGORIES = ["Electronics", "Office Supplies", "Furniture", "Hardware", "Safety Gear"];

const SUB_CATEGORIES_DATA: SubCategory[] = [
  {
    id: "SCAT-101",
    name: "Mechanical Keyboards",
    parentCategory: "Electronics",
    productCount: 42,
    avgPrice: 129.50,
    stockLevel: 850,
    trend: "up",
    status: "Active",
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "SCAT-102",
    name: "Ergonomic Chairs",
    parentCategory: "Furniture",
    productCount: 12,
    avgPrice: 450.00,
    stockLevel: 120,
    trend: "stable",
    status: "Active",
    iconColor: "bg-amber-100 text-amber-600",
  },
  {
    id: "SCAT-103",
    name: "Wireless Mice",
    parentCategory: "Electronics",
    productCount: 28,
    avgPrice: 59.99,
    stockLevel: 430,
    trend: "up",
    status: "Active",
    iconColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "SCAT-104",
    name: "Writing Instruments",
    parentCategory: "Office Supplies",
    productCount: 156,
    avgPrice: 4.25,
    stockLevel: 4200,
    trend: "down",
    status: "Active",
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    id: "SCAT-105",
    name: "Power Tools",
    parentCategory: "Hardware",
    productCount: 34,
    avgPrice: 189.00,
    stockLevel: 210,
    trend: "up",
    status: "Active",
    iconColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "SCAT-106",
    name: "Head Protection",
    parentCategory: "Safety Gear",
    productCount: 15,
    avgPrice: 35.00,
    stockLevel: 560,
    trend: "stable",
    status: "Active",
    iconColor: "bg-rose-100 text-rose-600",
  },
  {
    id: "SCAT-107",
    name: "Standing Desks",
    parentCategory: "Furniture",
    productCount: 8,
    avgPrice: 899.00,
    stockLevel: 45,
    trend: "up",
    status: "Active",
    iconColor: "bg-orange-100 text-orange-600",
  }
];

/* ---------------- MAIN COMPONENT ---------------- */
export default function SubCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParent, setSelectedParent] = useState("All Parents");

  const filteredSubCategories = useMemo(() => {
    return SUB_CATEGORIES_DATA.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesParent = selectedParent === "All Parents" || sub.parentCategory === selectedParent;
      return matchesSearch && matchesParent;
    });
  }, [searchTerm, selectedParent]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <Component className="text-cyan-600" size={24} />
              Sub-Categories
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium italic">Granular classification of your product lines.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Link2 size={16} />
              Manage Mapping
            </button>
            <button className="inline-flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-cyan-700 transition shadow-md shadow-cyan-100">
              <Plus size={16} />
              Add Sub-Category
            </button>
          </div>
        </header>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Sub-Segments</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">48</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">+4 this month</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Products/Sub</p>
            <span className="text-2xl font-black text-slate-900">14.2</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fastest Growth</p>
            <span className="text-sm font-black text-indigo-600 truncate block mt-1">Mechanical Keyboards</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inventory Health</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]"></div>
              </div>
              <span className="text-xs font-black text-slate-700">92%</span>
            </div>
          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search sub-category name or ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Filter size={14} className="text-slate-400" />
              </div>
              <select 
                className="w-full md:w-48 pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
              >
                <option>All Parents</option>
                {PARENT_CATEGORIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Sub-Category</th>
                  <th className="px-6 py-4">Parent Category</th>
                  <th className="px-6 py-4 text-center">SKU Count</th>
                  <th className="px-6 py-4">Financials</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${sub.iconColor} flex items-center justify-center shadow-sm`}>
                            <LayoutGrid size={18} />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-sm leading-tight group-hover:text-cyan-600 transition-colors">{sub.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{sub.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-600 uppercase tracking-tight">
                          <Layers size={10} />
                          {sub.parentCategory}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="text-sm font-black text-slate-800">{sub.productCount}</div>
                        <div className="text-[10px] text-slate-400 font-medium">SKUs Active</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="text-sm font-black text-slate-900">${sub.avgPrice.toFixed(2)}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Avg. Unit Price</div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700">{sub.stockLevel.toLocaleString()}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              {sub.trend === 'up' && <ArrowUpRight size={10} className="text-emerald-500" />}
                              {sub.trend === 'down' && <ArrowDownRight size={10} className="text-rose-500" />}
                              <span className={`text-[9px] font-bold uppercase tracking-tighter ${
                                sub.trend === 'up' ? 'text-emerald-500' : sub.trend === 'down' ? 'text-rose-500' : 'text-slate-400'
                              }`}>
                                {sub.trend === 'up' ? 'Rising' : sub.trend === 'down' ? 'Falling' : 'Stable'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-1">
                          <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all" title="Edit">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-900" title="More">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        <Component size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-black text-slate-400 uppercase tracking-widest">No Sub-Categories Found</p>
                        <button 
                          onClick={() => {setSearchTerm(""); setSelectedParent("All Parents");}}
                          className="mt-4 text-cyan-600 text-xs font-bold hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Viewing {filteredSubCategories.length} Items
            </span>
            <div className="flex items-center gap-4">
              <button className="text-xs font-black text-cyan-600 hover:text-cyan-700 flex items-center gap-1 group">
                Bulk Update Prices <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}