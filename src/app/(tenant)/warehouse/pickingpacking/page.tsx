"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  ChevronRight,
  Layers,
  Box,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Edit3,
  Trash2,
  FolderOpen,
  PieChart,
  Tag,
  Settings2,
  AlertCircle
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  totalValue: number;
  growth: number;
  status: "Active" | "Archived" | "Draft";
  lastUpdated: string;
  description: string;
  iconColor: string;
}

/* ---------------- MOCK DATA ---------------- */
const CATEGORIES_DATA: Category[] = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    productCount: 145,
    totalValue: 84200,
    growth: 12.5,
    status: "Active",
    lastUpdated: "2024-03-25",
    description: "High-end consumer electronics, peripherals, and internal hardware components.",
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "CAT-002",
    name: "Office Supplies",
    slug: "office-supplies",
    productCount: 89,
    totalValue: 12400,
    growth: -2.4,
    status: "Active",
    lastUpdated: "2024-03-22",
    description: "Daily operational supplies including stationery, paper products, and small desk accessories.",
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    id: "CAT-003",
    name: "Furniture",
    slug: "furniture",
    productCount: 34,
    totalValue: 156000,
    growth: 8.1,
    status: "Active",
    lastUpdated: "2024-03-20",
    description: "Ergonomic seating, standing desks, and modular storage solutions for modern workspaces.",
    iconColor: "bg-amber-100 text-amber-600",
  },
  {
    id: "CAT-004",
    name: "Hardware",
    slug: "hardware",
    productCount: 212,
    totalValue: 45000,
    growth: 4.2,
    status: "Active",
    lastUpdated: "2024-03-18",
    description: "Mechanical tools, fasteners, and structural components for facility maintenance.",
    iconColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "CAT-005",
    name: "Safety Gear",
    slug: "safety-gear",
    productCount: 56,
    totalValue: 28900,
    growth: 15.7,
    status: "Active",
    lastUpdated: "2024-03-26",
    description: "Personal protective equipment (PPE), signage, and emergency response kits.",
    iconColor: "bg-rose-100 text-rose-600",
  },
  {
    id: "CAT-006",
    name: "Logistics",
    slug: "logistics",
    productCount: 12,
    totalValue: 8500,
    growth: 0,
    status: "Draft",
    lastUpdated: "2024-03-28",
    description: "Packaging materials, shipping containers, and fleet management accessories.",
    iconColor: "bg-slate-100 text-slate-600",
  }
];

/* ---------------- MAIN COMPONENT ---------------- */
export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <Layers className="text-indigo-600" size={24} />
              Product Categories
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">Organize and analyze your global inventory taxonomy.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Settings2 size={16} />
              Reorder
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
              <Plus size={16} />
              New Category
            </button>
          </div>
        </header>

        {/* ANALYTICS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Most Profitable</p>
              <h3 className="text-lg font-black text-slate-900 mt-1">Electronics</h3>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +18% Margin
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Segments</p>
              <h3 className="text-lg font-black text-slate-900 mt-1">12 Main Classes</h3>
              <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-1">
                <FolderOpen size={12} /> 48 Sub-categories
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <PieChart size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Weight</p>
              <h3 className="text-lg font-black text-slate-900 mt-1">Furniture</h3>
              <p className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> 62% of Warehouse Space
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Box size={20} />
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Filter categories by name or ID..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl ${cat.iconColor} flex items-center justify-center shadow-inner`}>
                    <Tag size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 mb-3">
                  {cat.id} • /{cat.slug}
                </p>
                
                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed mb-6">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Products</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-800">{cat.productCount}</span>
                      <span className={`text-[10px] font-bold ${cat.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {cat.growth >= 0 ? '+' : ''}{cat.growth}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Value</p>
                    <p className="text-lg font-black text-slate-800">${(cat.totalValue / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Last Update: {cat.lastUpdated}
                </span>
                <div className="flex items-center gap-3">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Edit Category">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                  <button className="flex items-center gap-1 text-xs font-black text-indigo-600 hover:gap-2 transition-all">
                    View Products <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ADD NEW PLACEHOLDER */}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all group min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-white transition-colors shadow-sm">
              <Plus size={32} />
            </div>
            <p className="font-black uppercase tracking-widest text-xs">Add New Category</p>
            <p className="text-[11px] font-medium mt-1">Define new inventory segments</p>
          </button>
        </div>

      </div>
    </div>
  );
}