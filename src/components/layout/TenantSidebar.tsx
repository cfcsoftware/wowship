'use client';

import { useState, useEffect } from "react";
import React from 'react';
import { 
  LayoutDashboard,
  Users,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Scale,
  Calendar,
  FileText,
  Settings,
  DollarSign,
  BarChart3,
  LogOut,
  Warehouse,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Fingerprint,
  Banknote,
  Box,
  ArrowLeftRight,
  ShoppingCart,
  CheckSquare,
  Clock,
  Flag,
  Globe,
  UserSearch,
  Target,
  LineChart,
  Bell,
  Cpu,
  Mail,
  Receipt,
  Undo2,
  Package,
  Truck,
  Layers,
  Wallet,
  Calculator,
  Briefcase,
  History,
  HardDrive,
  MessageSquare,
  Send,
  Smartphone,
  Instagram,
  Facebook,
  Zap,
  Key,
  Database,
  Lock,
  Plus,
  Map,
  Palette
} from 'lucide-react';

const SIDEBAR_WIDTH = 250; 
const SIDEBAR_COLLAPSED_WIDTH = 72;

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },

  {
    label: "Organization",
    icon: Users,
    dropdown: [
      { to: "/org/companies", label: "Companies / Tenants", icon: Briefcase },
      { to: "/org/branches", label: "Branches", icon: Layers },
      { to: "/org/departments", label: "Departments", icon: Layers },
      { to: "/org/users", label: "Users", icon: Users },
      { to: "/org/roles", label: "Roles & Permissions", icon: ShieldCheck },
    ],
  },

  {
    label: "Shipments",
    icon: Package,
    dropdown: [
      { to: "/shipments/all", label: "All Shipments", icon: Package },
      { to: "/shipments/create", label: "Create Shipment", icon: Plus },
      { to: "/shipments/drafts", label: "Drafts", icon: FileText },
      { to: "/shipments/bulk", label: "Bulk Upload", icon: Database },
      { to: "/shipments/templates", label: "Templates", icon: Layers },
    ],
  },

  {
    label: "Air Freight",
    icon: Globe,
    dropdown: [
      { to: "/air/awb", label: "AWB (Master / House)", icon: FileText },
      { to: "/air/airlines", label: "Airlines", icon: Globe },
      { to: "/air/schedules", label: "Flight Schedules", icon: Calendar },
      { to: "/air/rates", label: "Air Rates", icon: DollarSign },
    ],
  },

  {
    label: "Ocean Freight",
    icon: Globe,
    dropdown: [
      { to: "/sea/bl", label: "Bill of Lading", icon: FileText },
      { to: "/sea/vessels", label: "Vessels", icon: Truck },
      { to: "/sea/containers", label: "Containers", icon: Box },
      { to: "/sea/ports", label: "Port Operations", icon: Globe },
      { to: "/sea/rates", label: "Sea Rates", icon: DollarSign },
    ],
  },

  {
    label: "Road Transport",
    icon: Truck,
    dropdown: [
      { to: "/road/consignment", label: "Consignments (LR)", icon: FileText },
      { to: "/road/fleet", label: "Fleet Management", icon: Truck },
      { to: "/road/drivers", label: "Drivers", icon: UserCheck },
      { to: "/road/routes", label: "Route Planning", icon: Map },
      { to: "/road/fuel", label: "Fuel Logs", icon: Wallet },
    ],
  },

  {
    label: "Orders",
    icon: ShoppingCart,
    dropdown: [
      { to: "/orders/sales", label: "Sales Orders", icon: ShoppingCart },
      { to: "/orders/purchase", label: "Purchase Orders", icon: FileText },
      { to: "/orders/contracts", label: "Contract Orders", icon: FileText },
      { to: "/orders/edi", label: "EDI Orders", icon: Database },
    ],
  },

  {
    label: "Tracking",
    icon: Target,
    dropdown: [
      { to: "/tracking/live", label: "Live Tracking", icon: Target },
      { to: "/tracking/gps", label: "GPS Tracking", icon: Globe },
      { to: "/tracking/milestones", label: "Milestones", icon: Flag },
      { to: "/tracking/exceptions", label: "Exceptions", icon: ShieldAlert },
      { to: "/tracking/eta", label: "ETA Predictions", icon: Clock },
    ],
  },

  {
    label: "Warehouse",
    icon: Warehouse,
    dropdown: [
      { to: "/wms/warehouses", label: "Warehouses", icon: Warehouse },
      { to: "/wms/inventory", label: "Inventory", icon: Box },
      { to: "/wms/movements", label: "Stock Movement", icon: ArrowLeftRight },
      { to: "/wms/bin", label: "Bin / Rack", icon: Layers },
      { to: "/wms/picking", label: "Picking & Packing", icon: CheckSquare },
    ],
  },

  {
    label: "Documents",
    icon: FileText,
    dropdown: [
      { to: "/docs/generator", label: "Doc Generator", icon: FileText },
      { to: "/docs/invoices", label: "Invoices", icon: Receipt },
      { to: "/docs/awb-bl", label: "BL / AWB Docs", icon: FileText },
      { to: "/docs/customs", label: "Customs Docs", icon: ShieldCheck },
      { to: "/docs/files", label: "File Manager", icon: HardDrive },
    ],
  },

  {
    label: "Finance",
    icon: Calculator,
    dropdown: [
      { to: "/finance/ar", label: "Accounts Receivable", icon: Wallet },
      { to: "/finance/ap", label: "Accounts Payable", icon: Wallet },
      { to: "/finance/billing", label: "Freight Billing", icon: Receipt },
      { to: "/finance/expenses", label: "Expenses", icon: DollarSign },
      { to: "/finance/pl", label: "Profit & Loss", icon: LineChart },
      { to: "/finance/tax", label: "Tax / GST", icon: Receipt },
    ],
  },

  {
    label: "CRM",
    icon: Users,
    dropdown: [
      { to: "/crm/customers", label: "Customers", icon: Users },
      { to: "/crm/shippers", label: "Shippers", icon: UserPlus },
      { to: "/crm/consignees", label: "Consignees", icon: UserCheck },
      { to: "/crm/agents", label: "Agents", icon: Briefcase },
      { to: "/crm/contracts", label: "Contracts", icon: FileText },
      { to: "/crm/quotes", label: "Quotations", icon: FileText },
    ],
  },

  {
    label: "Reports",
    icon: BarChart3,
    dropdown: [
      { to: "/reports/shipments", label: "Shipment Reports", icon: LineChart },
      { to: "/reports/finance", label: "Financial Reports", icon: Calculator },
      { to: "/reports/customers", label: "Customer Reports", icon: Users },
      { to: "/reports/custom", label: "Custom Builder", icon: FileText },
    ],
  },

  {
    label: "AI & Automation",
    icon: Cpu,
    dropdown: [
      { to: "/ai/dashboard", label: "AI Dashboard", icon: Cpu },
      { to: "/ai/routing", label: "Smart Routing", icon: Target },
      { to: "/ai/predictions", label: "Predictive Analytics", icon: LineChart },
      { to: "/ai/pricing", label: "Dynamic Pricing", icon: DollarSign },
      { to: "/ai/workflows", label: "Automation Rules", icon: Zap },
    ],
  },

  {
    label: "Integrations",
    icon: ArrowLeftRight,
    dropdown: [
      { to: "/integrations/api", label: "API Keys", icon: Key },
      { to: "/integrations/webhooks", label: "Webhooks", icon: Send },
      { to: "/integrations/edi", label: "EDI", icon: Database },
      { to: "/integrations/carriers", label: "Carrier APIs", icon: Truck },
    ],
  },

  {
    label: "HR & Workforce",
    icon: Briefcase,
    dropdown: [
      { to: "/hr/employees", label: "Employees", icon: Users },
      { to: "/hr/attendance", label: "Attendance", icon: Fingerprint },
      { to: "/hr/shifts", label: "Shifts", icon: Calendar },
      { to: "/hr/performance", label: "Performance", icon: Target },
    ],
  },

  {
    label: "Security",
    icon: ShieldCheck,
    dropdown: [
      { to: "/security/permissions", label: "Permissions", icon: ShieldCheck },
      { to: "/security/audit", label: "Audit Logs", icon: History },
      { to: "/security/login", label: "Login History", icon: Fingerprint },
    ],
  },

  {
    label: "Settings",
    icon: Settings,
    dropdown: [
      { to: "/settings/master", label: "Master Data", icon: Database },
      { to: "/settings/workflows", label: "Workflow Builder", icon: Zap },
      { to: "/settings/branding", label: "Branding", icon: Palette },
      { to: "/settings/system", label: "System Config", icon: Settings },
    ],
  },

  {
    to: "/login",
    label: "Sign Out",
    icon: LogOut,
    onClick: () => {
      window.location.href = '/logout';
    },
  },
];

const TenantSidebar = () => {
  const [pathname, setPathname] = useState("/dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const isDropdownActive = (dropdown: any[]) =>
    dropdown && dropdown.some(({ to }) => pathname.startsWith(to));

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <aside
      className="bg-white text-[#1C1C1E] flex flex-col transition-all duration-300 min-h-screen sticky top-0 z-50 border-r border-slate-100 shadow-sm overflow-hidden"
      style={{ width: sidebarWidth }}
    >
      <div className="flex items-center justify-between px-5 h-[64px] border-b border-slate-50">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Scale size={18} />
            </div>
            <span className="font-bold text-[16px] tracking-tight text-slate-800">Logicore</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3">
        <ul className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;

            if (item.dropdown) {
              const isOpen = openDropdown === item.label;
              const active = isDropdownActive(item.dropdown);

              return (
                <li key={item.label} className="mb-1">
                  <button
                    className={`flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      active 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    <Icon 
                      size={18} 
                      className={`${!collapsed ? 'mr-3' : 'mx-auto'} ${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                    />

                    {!collapsed && (
                      <>
                        <span className={`flex-1 text-left text-[14px] font-medium tracking-tight ${active ? 'font-semibold' : ''}`}>
                          {item.label}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`transition-transform duration-200 ${
                            isOpen ? 'rotate-90 text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {isOpen && !collapsed && (
                    <ul className="mt-1 space-y-1 border-l-2 border-slate-100 ml-5 pl-3">
                      {item.dropdown.map((sub) => {
                        const SubIcon = sub.icon;
                        const subActive = pathname === sub.to;
                        return (
                          <li key={sub.to}>
                            <a 
                              href={sub.to} 
                              className={`flex items-center py-2 px-3 rounded-lg text-[13px] transition-all duration-200 group ${
                                subActive 
                                  ? 'bg-indigo-600 text-white font-semibold' 
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                              }`}
                            >
                              <SubIcon 
                                size={14} 
                                className={`mr-2.5 ${subActive ? 'text-white' : 'text-slate-300 group-hover:text-indigo-500'}`} 
                              />
                              {sub.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            const active = pathname === item.to;
            return (
              <li key={item.to || item.label}>
                <a 
                  href={item.to} 
                  onClick={item.onClick}
                  className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    active 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} ${collapsed ? 'mx-auto' : 'mr-3'}`} 
                  />
                  {!collapsed && (
                    <span className={`text-[14px] font-medium tracking-tight ${active ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50/50">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[12px] flex-shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-slate-700 truncate">Admin Dashboard</p>
              <p className="text-[10px] text-slate-400 truncate tracking-wide uppercase">v1.2.4 PRO</p>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </aside>
  );
};

export default TenantSidebar;