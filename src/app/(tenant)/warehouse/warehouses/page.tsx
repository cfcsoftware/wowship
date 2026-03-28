"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Navigation,
  MapPin,
  Box,
  Thermometer,
  Zap,
  Shield,
  ArrowRight,
  BarChart3,
  Layers,
  Container,
  Activity,
  ChevronDown,
  Warehouse,
  ExternalLink
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type WarehouseStatus = "Operational" | "At Capacity" | "Maintenance" | "Under Construction";

interface StorageZone {
  name: string;
  type: "Ambient" | "Cold" | "Hazardous" | "Secure";
  utilization: number;
}

interface WarehouseUnit {
  id: string;
  name: string;
  location: string;
  manager: string;
  totalCapacity: string; // e.g., "50,000 sq ft"
  currentUtilization: number;
  zones: StorageZone[];
  status: WarehouseStatus;
  lastAudit: string;
  activeShipments: number;
}

/* ---------------- MOCK DATA ---------------- */
const WAREHOUSES_DATA: WarehouseUnit[] = [
  {
    id: "WH-NORTH-01",
    name: "Central Distribution Hub",
    location: "Sydney, NSW",
    manager: "Marcus Aurelius",
    totalCapacity: "120,000 sq ft",
    currentUtilization: 82,
    zones: [
      { name: "Bulk A", type: "Ambient", utilization: 85 },
      { name: "Cold Storage 1", type: "Cold", utilization: 40 },
    ],
    status: "Operational",
    lastAudit: "2024-02-15",
    activeShipments: 24,
  },
  {
    id: "WH-WEST-02",
    name: "Perth Logistics Center",
    location: "Perth, WA",
    manager: "Sarah Jenkins",
    totalCapacity: "45,000 sq ft",
    currentUtilization: 96,
    zones: [
      { name: "Electronics", type: "Secure", utilization: 98 },
      { name: "Standard", type: "Ambient", utilization: 94 },
    ],
    status: "At Capacity",
    lastAudit: "2024-03-01",
    activeShipments: 8,
  },
  {
    id: "WH-EAST-03",
    name: "Brisbane Satellite",
    location: "Brisbane, QLD",
    manager: "David Chen",
    totalCapacity: "30,000 sq ft",
    currentUtilization: 45,
    zones: [
      { name: "Main", type: "Ambient", utilization: 45 },
    ],
    status: "Operational",
    lastAudit: "2024-03-10",
    activeShipments: 12,
  },
  {
    id: "WH-SOUTH-04",
    name: "Melbourne Cold Link",
    location: "Melbourne, VIC",
    manager: "Elena Rodriguez",
    totalCapacity: "60,000 sq ft",
    currentUtilization: 68,
    zones: [
      { name: "Deep Freeze", type: "Cold", utilization: 72 },
      { name: "Chilled", type: "Cold", utilization: 64 },
    ],
    status: "Maintenance",
    lastAudit: "2024-01-20",
    activeShipments: 0,
  },
  {
    id: "WH-TECH-05",
    name: "Hazmat Handling Facility",
    location: "Adelaide, SA",
    manager: "Robert Fox",
    totalCapacity: "15,000 sq ft",
    currentUtilization: 30,
    zones: [
      { name: "Zone Red", type: "Hazardous", utilization: 30 },
    ],
    status: "Operational",
    lastAudit: "2024-03-12",
    activeShipments: 3,
  }
];

/* ---------------- STYLES HELPERS ---------------- */
const getStatusStyles = (status: WarehouseStatus) => {
  const styles: Record<WarehouseStatus, string> = {
    "Operational": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "At Capacity": "bg-rose-50 text-rose-700 ring-rose-600/20",
    "Maintenance": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Under Construction": "bg-slate-50 text-slate-700 ring-slate-600/20",
  };
  return `inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${styles[status]}`;
};

const getZoneIcon = (type: StorageZone["type"]) => {
  switch (type) {
    case "Cold": return <Thermometer size={12} className="text-blue-500" />;
    case "Hazardous": return <Zap size={12} className="text-orange-500" />;
    case "Secure": return <Shield size={12} className="text-indigo-500" />;
    default: return <Box size={12} className="text-slate-400" />;
  }
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function WarehouseManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const filteredWarehouses = useMemo(() => {
    return WAREHOUSES_DATA.filter((wh) => {
      const matchesSearch = wh.name.toLowerCase().includes(searchTerm.toLowerCase()) || wh.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All Status" || wh.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <Warehouse className="text-indigo-600" size={24} />
              Warehouse Infrastructure
            </h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">Manage physical assets, capacity, and regional hubs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <Navigation size={16} />
              Route Map
            </button>
            <button className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
              <Plus size={16} />
              Register Warehouse
            </button>
          </div>
        </header>

        {/* TOP LEVEL METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Footprint</p>
            <p className="text-2xl font-black text-slate-900">270k <span className="text-sm font-bold text-slate-400">sq ft</span></p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Utilization</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black text-slate-900">74%</p>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[74%]"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Hubs</p>
            <p className="text-2xl font-black text-slate-900">05</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logistics Health</p>
            <div className="flex items-center gap-2 mt-1">
              <Activity size={16} className="text-emerald-500" />
              <span className="text-sm font-black text-emerald-600 uppercase">Optimal</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by facility name, ID or location..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-44 pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 appearance-none outline-none hover:border-slate-300 cursor-pointer uppercase tracking-tight"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Operational</option>
                <option>At Capacity</option>
                <option>Maintenance</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* WAREHOUSE LIST */}
        <div className="grid grid-cols-1 gap-4">
          {filteredWarehouses.map((wh) => (
            <div key={wh.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-200 transition-colors group">
              <div className="flex flex-col lg:flex-row">
                
                {/* Info Section */}
                <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <span className={getStatusStyles(wh.status)}>{wh.status}</span>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{wh.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-xs font-bold uppercase tracking-tight">{wh.location}</span>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase tracking-widest">Manager</span>
                      <span className="font-black text-slate-700">{wh.manager}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase tracking-widest">Total Size</span>
                      <span className="font-black text-slate-700">{wh.totalCapacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase tracking-widest">Last Audit</span>
                      <span className="font-black text-slate-700">{wh.lastAudit}</span>
                    </div>
                  </div>
                </div>

                {/* Utilization & Zones Section */}
                <div className="p-6 flex-1 bg-slate-50/30">
                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Overall Utilization</h4>
                      <span className={`text-lg font-black ${wh.currentUtilization > 90 ? 'text-rose-600' : 'text-slate-900'}`}>
                        {wh.currentUtilization}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          wh.currentUtilization > 90 ? 'bg-rose-500' : wh.currentUtilization > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${wh.currentUtilization}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wh.zones.map((zone, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getZoneIcon(zone.type)}
                            <span className="text-[10px] font-black text-slate-700 uppercase">{zone.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 italic">{zone.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-300" style={{ width: `${zone.utilization}%` }} />
                          </div>
                          <span className="text-[10px] font-black text-slate-600">{zone.utilization}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Section */}
                <div className="p-6 lg:w-48 bg-white flex flex-col justify-between items-center lg:items-end">
                  <div className="text-center lg:text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Shipments</p>
                    <div className="flex items-center justify-center lg:justify-end gap-2 text-indigo-600">
                      <Container size={18} />
                      <span className="text-2xl font-black">{wh.activeShipments}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 w-full mt-6 lg:mt-0">
                    <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                      View Units <ArrowRight size={14} />
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                      Inventory <BarChart3 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* LEGEND/SUMMARY FOOTER */}
        <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-800 rounded-lg">
              <Shield className="text-indigo-300" size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Compliance Status</p>
              <p className="text-sm font-black italic">All facilities passed latest safety & security fire audits.</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-white text-indigo-900 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-2">
            Download Network Report <ExternalLink size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}