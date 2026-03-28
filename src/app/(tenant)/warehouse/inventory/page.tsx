"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  Package,
  Tag,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Edit3,
  Trash2,
  Eye,
  BarChart3,
  Box,
  Truck
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Discontinued";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: StockStatus;
  warehouse: string;
  lastUpdated: string;
  imageColor: string;
}

/* ---------------- MOCK DATA ---------------- */
const CATEGORIES = ["Electronics", "Office Supplies", "Furniture", "Hardware", "Logistics", "Safety Gear"];
const WAREHOUSES = ["Sydney East", "Auckland Central", "California North", "Melbourne West"];
const COLORS = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-amber-100 text-amber-600", "bg-emerald-100 text-emerald-600", "bg-rose-100 text-rose-600"];

const PRODUCTS: Product[] = Array.from({ length: 25 }, (_, i) => {
  const names = [
    "Ultra-Quiet Mechanical Keyboard", "Ergonomic Mesh Chair", "4K Ultra-Wide Monitor", "USB-C Multi-Port Hub", "Noise Cancelling Headphones",
    "Standing Desk Frame", "LED Workspace Lamp", "Portable SSD 2TB", "High-Speed Router", "Wireless Vertical Mouse"
  ];
  
  const stock = Math.floor(Math.random() * 500);
  let status: StockStatus = "In Stock";
  if (stock === 0) status = "Out of Stock";
  else if (stock < 50) status = "Low Stock";
  else if (i === 15) status = "Discontinued";

  const price = Math.floor(Math.random() * 1200) + 49;

  return {
    id: `PRD-${10500 + i}`,
    name: names[i % names.length],
    sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: price,
    cost: price * 0.6,
    stock: stock,
    status: status,
    warehouse: WAREHOUSES[i % WAREHOUSES.length],
    lastUpdated: `2024-03-${(28 - (i % 10)).toString().padStart(2, '0')}`,
    imageColor: COLORS[i % COLORS.length],
  };
});

/* ---------------- STYLES HELPERS ---------------- */
const getStatusBadge = (status: StockStatus) => {
  const styles: Record<StockStatus, string> = {
    "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Low Stock": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Discontinued": "bg-slate-100 text-slate-600 ring-slate-600/10",
  };
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      {status === "Low Stock" && <AlertTriangle size={10} />}
      {status}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      const matchesSearch = 
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All Categories" || prod.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || prod.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <Package className="text-blue-600" size={24} />
              Product Inventory
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">Manage stock levels, pricing, and global SKU distribution.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-200">
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </header>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Inventory Value</p>
              <div className="p-1 bg-blue-50 text-blue-600 rounded">
                <BarChart3 size={14} />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">$248.5k</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-600 text-[10px] font-bold">
              <ArrowUpRight size={12} /> +12.5% vs last month
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Low Stock Items</p>
            <p className="text-2xl font-black text-slate-900 mt-2">14</p>
            <div className="flex items-center gap-1 mt-1 text-rose-500 text-[10px] font-bold underline decoration-rose-200">
              Needs immediate reorder
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</p>
            <p className="text-2xl font-black text-slate-900 mt-2">12</p>
            <p className="mt-1 text-slate-500 text-[10px] font-bold">Across 4 warehouses</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Profit Margin</p>
            <p className="text-2xl font-black text-slate-900 mt-2">38.2%</p>
            <div className="flex items-center gap-1 mt-1 text-slate-500 text-[10px] font-bold">
              <Tag size={12} /> Target: 40%
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search product name, SKU, or ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative">
              <select 
                className="w-full md:w-44 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <div className="relative">
              <select 
                className="w-full md:w-40 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock Levels</th>
                  <th className="px-6 py-4">Pricing (USD)</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg ${prod.imageColor} flex items-center justify-center font-bold text-lg shadow-sm shrink-0 ring-1 ring-inset ring-black/5`}>
                            <Box size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-slate-900 text-sm truncate">{prod.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{prod.id}</span>
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 rounded tracking-tighter">{prod.sku}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Layers size={14} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">{prod.category}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {getStatusBadge(prod.status)}
                          <div className="flex items-center gap-2 w-32">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${prod.stock < 50 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                                style={{ width: `${Math.min((prod.stock / 500) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-black text-slate-700">{prod.stock}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="text-sm font-black text-slate-900">${prod.price.toFixed(2)}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Cost: ${prod.cost.toFixed(2)}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-tighter">
                            <Truck size={12} className="text-slate-400" /> {prod.warehouse}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium italic">Updated {prod.lastUpdated}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-1.5">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-blue-100" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-emerald-100" title="Edit SKU">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-rose-100">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="p-4 bg-slate-50 rounded-full mb-4">
                          <Package size={32} />
                        </div>
                        <p className="text-lg font-medium text-slate-600">No products found</p>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              Page <span className="text-slate-900">1 of 3</span>
              <span className="mx-2 h-3 w-[1px] bg-slate-300" />
              Total Items: <span className="text-slate-900">{PRODUCTS.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-300 text-slate-400 bg-slate-100/50 cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              <button className="min-w-[32px] h-8 rounded border border-blue-600 bg-blue-600 text-white font-black text-xs">
                1
              </button>
              <button className="min-w-[32px] h-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs">
                2
              </button>
              <button className="min-w-[32px] h-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs">
                3
              </button>
              <button className="p-1.5 rounded border border-slate-300 text-slate-700 hover:bg-white transition shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}