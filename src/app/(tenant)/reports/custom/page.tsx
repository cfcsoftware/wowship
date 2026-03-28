"use client";

import React, { useState, useMemo } from "react";
import { 
  Settings2, 
  Download, 
  Table, 
  Columns, 
  Filter, 
  Plus, 
  Save, 
  Search, 
  ChevronDown, 
  ArrowUpDown, 
  MoreVertical,
  Calendar,
  Layers,
  FileSpreadsheet,
  FileText,
  Share2,
  Check,
  X,
  LayoutGrid
} from "lucide-react";

// Mock Data representing a cross-functional report
const INITIAL_DATA = [
  { id: 101, entity: "Acme Corp North", category: "Operations", owner: "Alex Rivera", budget: 125000, spend: 98400, health: "Stable", lastUpdate: "2024-03-10" },
  { id: 102, entity: "Global Logistics", category: "Supply Chain", owner: "Sarah Chen", budget: 450000, spend: 462000, health: "Over Budget", lastUpdate: "2024-03-12" },
  { id: 103, entity: "Digital Storefront", category: "Marketing", owner: "Jordan Smith", budget: 85000, spend: 42000, health: "Underutilized", lastUpdate: "2024-03-08" },
  { id: 104, entity: "Research Lab B", category: "R&D", owner: "Dr. Aris Vane", budget: 1200000, spend: 850000, health: "Stable", lastUpdate: "2024-03-14" },
  { id: 105, entity: "Customer Success", category: "Support", owner: "Maria Garcia", budget: 210000, spend: 205000, health: "Stable", lastUpdate: "2024-03-11" },
  { id: 106, entity: "Talent Branding", category: "Marketing", owner: "Tom Hynes", budget: 45000, spend: 48000, health: "Over Budget", lastUpdate: "2024-03-09" },
];

const COLUMNS = [
  { key: "entity", label: "Reporting Entity", visible: true },
  { key: "category", label: "Category", visible: true },
  { key: "owner", label: "Owner", visible: true },
  { key: "budget", label: "Budget", visible: true },
  { key: "spend", label: "Actual Spend", visible: true },
  { key: "health", label: "Status", visible: true },
  { key: "lastUpdate", label: "Last Sync", visible: true },
];

export default function CustomReport() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(COLUMNS.map(c => c.key));
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const toggleColumn = (key) => {
    setVisibleColumns(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

  const getHealthBadge = (health) => {
    const styles = {
      "Stable": "bg-emerald-50 text-emerald-700 border-emerald-100",
      "Over Budget": "bg-rose-50 text-rose-700 border-rose-100",
      "Underutilized": "bg-amber-50 text-amber-700 border-amber-100"
    };
    return styles[health] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Top Navigation / Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Table size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Financial Operations Summary</h1>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">Draft</span>
              </div>
              <p className="text-xs text-slate-500 font-medium italic">Auto-syncing with 4 data sources</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Save size={20} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Share2 size={20} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Plus size={18} strokeWidth={3} />
              Add Record
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white border border-slate-200 p-3 rounded-[1.5rem] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Find anything..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 text-sm font-bold border border-slate-100">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative">
              <button 
                onClick={() => setShowColumnPicker(!showColumnPicker)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all border ${showColumnPicker ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                <Columns size={16} />
                Columns
              </button>
              
              {showColumnPicker && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Display Columns</p>
                  <div className="space-y-1">
                    {COLUMNS.map(col => (
                      <label key={col.key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm font-medium text-slate-700">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          checked={visibleColumns.includes(col.key)}
                          onChange={() => toggleColumn(col.key)}
                        />
                        {col.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button className="px-4 py-2.5 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-black transition-all">
              <Download size={16} />
              Export
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="pl-8 pr-4 py-5 w-12">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                    onChange={(e) => setSelectedRows(e.target.checked ? data.map(d => d.id) : [])}
                    checked={selectedRows.length === data.length}
                  />
                </th>
                {COLUMNS.filter(c => visibleColumns.includes(c.key)).map(col => (
                  <th key={col.key} className="px-4 py-5 group cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{col.label}</span>
                      <ArrowUpDown size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </div>
                  </th>
                ))}
                <th className="pr-8 pl-4 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((row) => (
                <tr 
                  key={row.id} 
                  className={`group transition-colors ${selectedRows.includes(row.id) ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}
                >
                  <td className="pl-8 pr-4 py-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  {visibleColumns.includes("entity") && (
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{row.entity}</span>
                        <span className="text-[10px] font-medium text-slate-400">ID: {row.id}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.includes("category") && (
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{row.category}</span>
                    </td>
                  )}
                  {visibleColumns.includes("owner") && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {row.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{row.owner}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.includes("budget") && (
                    <td className="px-4 py-4 font-mono text-sm text-slate-600">
                      {formatCurrency(row.budget)}
                    </td>
                  )}
                  {visibleColumns.includes("spend") && (
                    <td className="px-4 py-4 font-mono text-sm font-bold text-slate-900">
                      {formatCurrency(row.spend)}
                    </td>
                  )}
                  {visibleColumns.includes("health") && (
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tight border ${getHealthBadge(row.health)}`}>
                        {row.health}
                      </span>
                    </td>
                  )}
                  {visibleColumns.includes("lastUpdate") && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <span className="text-xs font-medium">{row.lastUpdate}</span>
                      </div>
                    </td>
                  )}
                  <td className="pr-8 pl-4 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
              <Layers size={48} strokeWidth={1} />
              <div className="text-center">
                <p className="font-bold text-slate-600">No records found</p>
                <p className="text-xs">Try adjusting your filters or search term</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between px-2 gap-4">
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredData.length}</span> of <span className="text-slate-900 font-bold">{data.length}</span> records
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Selection Tray (Sticky at bottom when rows are selected) */}
        {selectedRows.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-8 z-[100] border border-white/10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-1 rounded-md">
                <Check size={14} strokeWidth={4} />
              </div>
              <p className="text-sm font-black tracking-tight">{selectedRows.length} Items Selected</p>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors">
                <Download size={14} />
                Bulk Export
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors">
                <LayoutGrid size={14} />
                Assign Group
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-colors">
                <X size={14} />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}