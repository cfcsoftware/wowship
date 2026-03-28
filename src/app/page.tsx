"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Users, 
  Box, Zap, ArrowUp, Menu, X, 
  ShieldCheck, Wallet, 
  MessageSquare, Key, 
  Search, TrendingUp, Layers, ShieldAlert,
  Users2, Check, Globe, ArrowUpRight,
  Calculator, ClipboardList, BarChart3, Database,
  Mail, Phone, MapPin, ChevronRight, Server, Lock, Eye,
  LayoutDashboard, FileText, Settings, Shield,
  BadgeDollarSign, Truck, UserCheck, BarChart4
} from 'lucide-react';

const premiumStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
  
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; background: #fff; }
  .text-gradient { background: linear-gradient(135deg, #0f172a 0%, #2563eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-blur { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); }
  .page-transition { animation: fadeIn 0.4s ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.4); }
`;

// --- Navbar Component ---
type ViewType = 
  | 'home' 
  | 'crm' 
  | 'inventory' 
  | 'finance' 
  | 'hrms' 
  | 'pricing' 
  | 'contact';

type NavbarProps = {
  currentView: ViewType;
  setView: (view: ViewType) => void;
};

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks: { name: string; view: ViewType }[] = [
    { name: 'Home', view: 'home' },
    { name: 'CRM', view: 'crm' },
    { name: 'Inventory', view: 'inventory' },
    { name: 'Finance', view: 'finance' },
    { name: 'HRMS', view: 'hrms' },
    { name: 'Pricing', view: 'pricing' },
  ];

  const navigate = (view: ViewType) => {
    setView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'nav-blur border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-slate-950 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-slate-950/10">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-950 uppercase">
              Nexion <span className="text-blue-600 font-extrabold"> ERP </span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-1">
            {menuLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => navigate(link.view)}
                className={`px-4 py-2 text-[18px] font-bold transition-all tracking-tight rounded-full ${
                  currentView === link.view 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('contact')}
              className="hidden sm:flex bg-slate-950 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-950/10 items-center gap-2 group"
            >
              Contact Sales <ArrowRight size={14} />
            </button>

            <button 
              className="xl:hidden p-2 text-slate-950" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`xl:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-[600px] opacity-100 py-6' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col px-6 gap-4">
          {menuLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => navigate(link.view)} 
              className="text-left text-lg font-bold text-slate-900 py-3 border-b border-slate-50"
            >
              {link.name}
            </button>
          ))}

          <button 
            onClick={() => navigate('contact')} 
            className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold mt-4"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Module Page: CRM ---
const CRMPage = () => (
  <div className="pt-16 pb-24 page-transition">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6">Customer Relations</div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-tight">Master the <span className="text-blue-600">Customer Journey.</span></h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">Nexion CRM does not just store data; it powers relationships. From the first touch to post-purchase advocacy, manage every interaction with surgical precision.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {["Lead Pipeline Mgmt", "Omnichannel Inbox", "Automated Quotations", "Client Portals"].map(item => (
              <div key={item} className="flex items-center gap-3 font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Check size={12}/></div>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100 relative">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 mb-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Deals</span>
              <TrendingUp className="text-emerald-500" size={18}/>
            </div>
            <div className="space-y-4">
              {[
                { name: "Global Logistics Corp", val: "$240,000", status: "Closing" },
                { name: "TechNova Solutions", val: "$85,000", status: "Negotiation" },
                { name: "EcoGrid Systems", val: "$112,000", status: "Discovery" }
              ].map((deal, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <span className="font-bold text-slate-900">{deal.name}</span>
                  <div className="text-right">
                    <div className="text-sm font-black text-blue-600">{deal.val}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{deal.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-slate-950 text-white p-8 rounded-3xl shadow-2xl max-w-xs">
            <div className="text-3xl font-black mb-2">92%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Higher Retention Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Module Page: Inventory ---
const InventoryPage = () => (
  <div className="pt-32 pb-24 page-transition">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
        <div className="lg:w-1/2">
          <div className="bg-orange-50 text-orange-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6">Supply Chain</div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-tight">Supply Chain <span className="text-orange-600">Intelligence.</span></h2>
          <p className="text-xl text-slate-500 mb-12">Global multi-warehouse management, real-time stock tracking, and automated procurement logic that ensures you never miss a sale.</p>
          
          <div className="space-y-8">
            {[
              { title: "Multi-Warehouse Sync", desc: "Balance stock across continents with automated transfer requests.", icon: <Truck className="text-orange-600" /> },
              { title: "Smart Procurement", desc: "Auto-generate POs when stock hits threshold based on lead times.", icon: <ClipboardList className="text-orange-600" /> },
              { title: "Batch & Expiry Tracking", desc: "Precision tracking for perishables and serialized equipment.", icon: <ShieldAlert className="text-orange-600" /> }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex shrink-0 items-center justify-center">{feature.icon}</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h4>
                  <p className="text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
           <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white flex flex-col justify-between h-64">
              <Database size={32} className="text-orange-500" />
              <div>
                <div className="text-3xl font-black">42,000+</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active SKU Units</div>
              </div>
           </div>
           <div className="bg-orange-500 rounded-[2.5rem] p-8 text-white flex flex-col justify-between h-64">
              <ArrowUpRight size={32} />
              <div>
                <div className="text-3xl font-black">14.2%</div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Wastage Reduction</div>
              </div>
           </div>
           <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Distribution Map</span>
                <Globe size={18} className="text-slate-400" />
              </div>
              <div className="h-32 bg-slate-200/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <span className="text-[10px] font-black text-slate-400 uppercase">Live Map Visualization</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Module Page: Finance ---
const FinancePage = () => (
  <div className="pt-32 pb-24 page-transition bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6">Financial Ledger</div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">Financial <span className="text-emerald-600">Integrity.</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Full ledger control, real-time balance sheets, and tax compliance across 40+ countries. Built for CFOs who demand precision.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {[
           { title: "General Ledger", items: ["Double Entry Bookkeeping", "Journal Entries", "Recurring Billings"], icon: <FileText/> },
           { title: "Tax Compliance", items: ["GST/VAT Auto-calc", "Zakat Reporting", "Multi-currency FX"], icon: <ShieldCheck/> },
           { title: "Insights", items: ["Live Balance Sheets", "Cash Flow Forecasts", "Budgeting vs Actuals"], icon: <BarChart3/> }
         ].map((card, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">{card.icon}</div>
             <h4 className="text-2xl font-black text-slate-900 mb-6">{card.title}</h4>
             <ul className="space-y-4">
               {card.items.map(li => (
                 <li key={li} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   {li}
                 </li>
               ))}
             </ul>
           </div>
         ))}
      </div>
      
      <div className="mt-24 bg-slate-950 text-white rounded-[3rem] p-12 overflow-hidden relative">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-md">
             <h3 className="text-3xl font-black mb-4">Hyper-Growth Analytics</h3>
             <p className="text-slate-400 font-medium">Nexion finance core hooks directly into your sales and inventory data to provide predictive profit forecasting.</p>
           </div>
           <div className="flex gap-4 items-end h-32">
             {[30, 50, 40, 70, 60, 90, 85].map((h, i) => (
               <div key={i} className="w-8 bg-emerald-500 rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
             ))}
           </div>
         </div>
      </div>
    </div>
  </div>
);

// --- Module Page: HRMS ---
const HRMSPage = () => (
  <div className="pt-32 pb-24 page-transition">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-purple-50 rounded-[3rem] p-12 border border-purple-100">
             <div className="space-y-6">
                {[
                  { label: "Attendance Today", val: "94%", color: "bg-emerald-500" },
                  { label: "Payroll Readiness", val: "Ready", color: "bg-blue-500" },
                  { label: "Open Requisitions", val: "12 Roles", color: "bg-purple-500" }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-purple-200 flex justify-between items-center shadow-sm">
                    <span className="font-bold text-slate-900">{s.label}</span>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black text-white uppercase ${s.color}`}>{s.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
           <div className="bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6">People Operations</div>
           <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-tight">Elevate <span className="text-purple-600">Your Talent.</span></h2>
           <p className="text-xl text-slate-500 mb-10 leading-relaxed">A modern workforce deserves a modern platform. Automate attendance, global payroll, and performance reviews in a single source of truth.</p>
           <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-black text-slate-900 mb-2">Automated Payroll</h4>
                <p className="text-sm text-slate-500">Calculate taxes, deductions, and bonuses instantly for 500+ employees.</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 mb-2">Geo-Fenced Clocking</h4>
                <p className="text-sm text-slate-500">Ensure attendance integrity with location-based check-ins via mobile.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const PricingPage = () => (
  <section className="pt-32 pb-24 page-transition bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 tracking-tight">Flexible Scaling.</h2>
        <p className="text-slate-500 text-xl max-w-xl mx-auto font-medium">Modular pricing designed to grow with your enterprise volume.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { name: "SME Starter", price: "$499", features: ["Up to 25 Users", "Basic CRM & Inventory", "Finance Dashboard", "Standard Support"], popular: false },
          { name: "Enterprise Pro", price: "$1,499", features: ["Unlimited Users", "Full HRMS Suite", "Multi-Warehouse Sync", "Custom Integrations", "Dedicated Account Mgr"], popular: true },
          { name: "Global Entity", price: "Custom", features: ["On-Premise Option", "White-label Portal", "SLA Guarantee", "24/7 Security Operations", "Custom Feature Dev"], popular: false },
        ].map((plan, i) => (
          <div key={i} className={`p-10 md:p-14 rounded-[3rem] transition-all duration-500 flex flex-col h-full border ${
            plan.popular 
            ? 'bg-slate-950 text-white lg:scale-105 shadow-2xl border-slate-900 z-10' 
            : 'bg-slate-50 border-slate-100'
          }`}>
            <div className="mb-auto">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest">{plan.name}</h3>
              <div className="text-5xl font-black mb-10">{plan.price}<span className="text-xs font-normal opacity-50 italic">/mo</span></div>
              <ul className="space-y-5 mb-12">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm font-bold">
                    <Check size={16} className={`mt-0.5 shrink-0 ${plan.popular ? 'text-blue-400' : 'text-blue-600'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              plan.popular ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20' : 'bg-slate-950 text-white hover:bg-blue-600'
            }`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactPage = () => (
  <div className="pt-32 pb-24 page-transition">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
           <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">Deploy the <br/>Future.</h2>
           <p className="text-xl text-slate-500 mb-12 font-medium">Ready for a system that actually works for you? Our solution engineers are standing by for a live architecture session.</p>
           
           <div className="space-y-8">
              {[
                { label: "Email Support", val: "enterprise@nexionerp.com", icon: <Mail/>, color: "bg-blue-50 text-blue-600" },
                { label: "Global Phone", val: "+1 (888) NEXION-ERP", icon: <Phone/>, color: "bg-emerald-50 text-emerald-600" },
                { label: "Headquarters", val: "San Francisco, CA 94105", icon: <MapPin/>, color: "bg-purple-50 text-purple-600" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                   <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center`}>{item.icon}</div>
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-xl font-black text-slate-900">{item.val}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl">
           <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600/20 font-bold" placeholder="Alex" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600/20 font-bold" placeholder="alex@company.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization</label>
                 <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600/20 font-bold" placeholder="Global Dynamics" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                 <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600/20 font-bold min-h-[120px]" placeholder="Tell us about your operational challenges..."></textarea>
              </div>
              <button className="w-full bg-slate-950 text-white py-7 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                 Schedule Consultation
              </button>
           </form>
        </div>
      </div>
    </div>
  </div>
);

type FooterProps = {
  setView: (view: ViewType) => void;
};

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center"><Layers className="text-white w-5 h-5" /></div>
              <span className="text-xl font-black tracking-tighter uppercase">Nexion <span className="text-blue-600"> ERP </span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-10 font-medium">Unified enterprise intelligence for the next generation of global industry.</p>
            <div className="flex gap-4">
               {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all cursor-pointer"><Globe size={16}/></div>)}
            </div>
          </div>
          <div>
             <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-400">Solutions</h4>
             <ul className="space-y-4 text-sm font-bold text-slate-900">
                <li><button onClick={() => setView('crm')} className="hover:text-blue-600">CRM Sales</button></li>
                <li><button onClick={() => setView('inventory')} className="hover:text-blue-600">Inventory</button></li>
                <li><button onClick={() => setView('finance')} className="hover:text-blue-600">Finance</button></li>
                <li><button onClick={() => setView('hrms')} className="hover:text-blue-600">HR & Payroll</button></li>
             </ul>
          </div>
          <div>
             <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-400">Support</h4>
             <ul className="space-y-4 text-sm font-bold text-slate-900">
                <li><button onClick={() => setView('contact')} className="hover:text-blue-600">Contact Sales</button></li>
                <li><button onClick={() => setView('pricing')} className="hover:text-blue-600">Pricing</button></li>
                <li><button className="hover:text-blue-600">Security Audit</button></li>
             </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
          <div>© 2025 Nexion Enterprise Systems Inc.</div>
          <div className="flex gap-6">
            <span>SOC 2 Type II</span>
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderView = () => {
    switch(view) {
      case 'home':
        return (
          <>
            <Hero setView={setView} />
            <CRMPage />
            <PricingPage />
          </>
        );
      case 'crm': return <CRMPage />;
      case 'inventory': return <InventoryPage />;
      case 'finance': return <FinancePage />;
      case 'hrms': return <HRMSPage />;
      case 'pricing': return <PricingPage />;
      case 'contact': return <ContactPage />;
      default: return <Hero setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <style>{premiumStyles}</style>
      
      <Navbar currentView={view} setView={setView} />
      
      <main className="relative">
        {renderView()}
      </main>

      <Footer setView={setView} />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl transition-all z-[90] hover:bg-blue-600 hover:-translate-y-2 active:scale-90 ${
          showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

// Hero Component separated for structure

type HeroProps = {
  setView: (view: ViewType) => void;
};

const Hero: React.FC<HeroProps> = ({ setView }) => (
  <section className="relative pt-44 pb-32 overflow-hidden mesh-gradient">
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black mb-8 tracking-[0.2em] uppercase border border-blue-100">
          <Zap className="w-3 h-3 fill-current" />
          Best All-in-one ERP System for your Business
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-slate-950 mb-8 leading-[0.95] tracking-tight text-gradient">
          Enterprise power. <br/>Simplified.
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          A unified core for global operations. Real-time intelligence across CRM, Finance, HRMS, and Inventory.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button onClick={() => setView('contact')} className="w-full sm:w-auto px-12 py-6 bg-slate-950 text-white rounded-full font-bold text-xl hover:bg-blue-600 transition-all shadow-2xl hover:scale-105 text-center">
            Contact us
          </button>
          <a href="/dashboard" 
             onClick={() => setView('crm')} 
            className="w-full sm:w-auto px-12 py-6 bg-blue-600 border border-blue-700 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all"
              >View Demo</a>
        </div>
      </div>
    </div>
  </section>
);