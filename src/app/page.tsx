"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, Globe, Warehouse, BarChart3, ShieldCheck, 
  Cpu, Menu, X, ChevronDown, Ship, Plane, Layers, 
  Users, Zap, CheckCircle2, Navigation, Activity, Box,
  Code2, FileText, ArrowRight, ExternalLink, Play,
  Server, Lock, LifeBuoy, Languages, Database, Search
} from "lucide-react";

export default function LogisticsSaaSPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <main className="bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white antialiased">
      
      {/* --- PROFESSIONAL NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-slate-950 p-2 rounded-xl text-white shadow-xl shadow-slate-200 group-hover:bg-indigo-600 transition-colors">
              <Navigation size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-slate-950">LOGI<span className="text-indigo-600">CORE</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {["Features", "Solutions", "Cases", "API", "Pricing", "FAQ"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-[12px] font-bold text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-[0.15em]"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-all">Sign In</button>
            <button onClick={() => scrollTo('cta')} className="bg-slate-950 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all">
              Book a Demo
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-950" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-52 pb-40 px-8 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-50 rounded-full blur-[140px] opacity-60" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50 rounded-full blur-[140px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 mb-10 text-[10px] font-black tracking-[0.4em] text-indigo-600 uppercase border border-indigo-100 bg-indigo-50/30 rounded-full">
              <Activity size={12} /> Enterprise Ecosystem v4.0
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12 text-slate-950">
              The Intelligence Layer <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 italic font-serif py-2">for Global Logistics.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              Automate Air, Sea, and Road operations with a unified SaaS platform. 
              Real-time tracking, AI-routing, and multi-tenant billing for modern trade.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-indigo-600 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                Get Started Free
              </button>
              <button className="bg-white border-2 border-slate-100 px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-950">
                <Play size={18} fill="currentColor" /> Watch Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. THE INFRASTRUCTURE BAR --- */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
            <span className="text-lg font-black italic tracking-tighter">MAERSK</span>
            <span className="text-lg font-black italic tracking-tighter">FEDEX</span>
            <span className="text-lg font-black italic tracking-tighter">SAP ORACLE</span>
            <span className="text-lg font-black italic tracking-tighter">DHL GLOBAL</span>
            <span className="text-lg font-black italic tracking-tighter">DB SCHENKER</span>
          </div>
        </div>
      </section>

      {/* --- 3. CORE FEATURES --- */}
      <section id="features" className="py-40 px-8 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <h2 className="text-5xl font-black mb-6 tracking-tight text-slate-950">Advanced Logistics Control.</h2>
              <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">Everything you need to run a billion-dollar logistics operation from a single, high-performance dashboard.</p>
            </div>
            <div className="flex gap-4 lg:justify-end">
               <div className="text-right">
                  <div className="text-3xl font-black text-indigo-600">140+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Countries Served</div>
               </div>
               <div className="w-px h-10 bg-slate-200" />
               <div className="text-right">
                  <div className="text-3xl font-black text-indigo-600">99.9%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Uptime</div>
               </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureBox icon={Truck} title="Transport Management" desc="Full fleet automation, route planning, and last-mile tracking with digital proof-of-delivery." />
            <FeatureBox icon={Globe} title="Global Freight" desc="International Sea and Air freight compliance with automated BOL generation and customs filing." />
            <FeatureBox icon={Cpu} title="AI Automation" desc="Our proprietary LogiIntel engine identifies delays before they happen and optimizes routes." />
            <FeatureBox icon={BarChart3} title="Real-time Analytics" desc="Dynamic BI dashboards for every shipment, node, and financial transaction across the globe." />
            <FeatureBox icon={ShieldCheck} title="Enterprise Security" desc="Bank-grade 256-bit encryption, SOC2 Type II compliance, and granular user permissioning." />
            <FeatureBox icon={Warehouse} title="Warehouse (WMS)" desc="Inventory management with AI-driven pick routes and multi-warehouse stock synchronization." />
          </div>
        </div>
      </section>

      {/* --- 4. CASE STUDIES (Results) --- */}
      <section id="cases" className="py-40 bg-slate-950 text-white px-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10"><Globe size={400}/></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black mb-10 tracking-tight leading-tight">Proven Results at <br/>Global Enterprise Scale.</h2>
              <div className="space-y-16">
                <CaseStudyItem title="GlobalExpress Logistics" result="32% Cost Reduction" desc="Successfully synchronized 400+ drivers across 12 major metropolitan hubs in real-time." />
                <CaseStudyItem title="SeaPort Alliance" result="0% Compliance Errors" desc="Transitioned to automated customs filing for 2,000+ monthly international containers." />
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-xl">
               <div className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-8">Executive Testimonial</div>
               <p className="text-2xl font-medium leading-relaxed mb-10 italic">"The transition to LogiCore didn't just digitize our workflows—it completely transformed our P&L within the first full quarter of operation."</p>
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center font-black">DC</div>
                  <div>
                    <div className="text-lg font-bold">David Chen</div>
                    <div className="text-slate-400 text-sm">Chief Technology Officer, GlobalExpress</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. SOLUTIONS & MODULES --- */}
      <section id="solutions" className="py-40 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="grid grid-cols-2 gap-6 relative">
             <div className="bg-slate-50 p-10 rounded-[3rem] aspect-square flex flex-col justify-between border border-slate-100">
                <Zap className="text-indigo-600" size={32} />
                <div className="font-black text-xl text-slate-900">Shipment <br/>Management</div>
             </div>
             <div className="bg-indigo-600 p-10 rounded-[3rem] aspect-square flex flex-col justify-between text-white shadow-2xl shadow-indigo-100 translate-y-12">
                <Users size={32} />
                <div className="font-black text-xl text-white">Finance & <br/>Billing (SaaS)</div>
             </div>
          </div>
          <div>
            <h2 className="text-5xl font-black mb-8 tracking-tight text-slate-950">Enterprise-Grade Modules.</h2>
            <div className="space-y-6 text-slate-500 font-medium text-lg leading-relaxed mb-10">
              <div className="flex gap-3"><CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={20}/> <span>Multi-tenant architecture for global branch management.</span></div>
              <div className="flex gap-3"><CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={20}/> <span>White-labeled portals for carrier and customer visibility.</span></div>
              <div className="flex gap-3"><CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={20}/> <span>Unified CRM for managing leads, shippers, and agents.</span></div>
            </div>
            <button className="bg-slate-950 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-600 transition-all">
              Explore All 12 Modules <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      {/* --- 6. DEVELOPER API SECTION --- */}
      <section id="api" className="py-40 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black mb-8 text-slate-950">Developer-First API.</h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">Integrate effortlessly with SAP, Oracle, NetSuite, or Shopify using our high-performance REST APIs and real-time Webhooks.</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 font-bold text-slate-600"><Code2 className="text-indigo-600" size={20}/> JSON REST Endpoints</div>
                 <div className="flex items-center gap-3 font-bold text-slate-600"><Zap className="text-indigo-600" size={20}/> 99.99% API Uptime</div>
                 <div className="flex items-center gap-3 font-bold text-slate-600"><Lock className="text-indigo-600" size={20}/> OAuth 2.0 Security</div>
              </div>
            </div>
            <div className="lg:col-span-3 bg-[#0f172a] p-10 rounded-[2.5rem] shadow-3xl border border-slate-800">
               <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
               </div>
               <pre className="font-mono text-sm leading-relaxed text-indigo-300 overflow-x-auto">
{`// Fetch Real-time Tracking Data
const tracking = await LogiCore.shipments.retrieve('SH-7729', {
  expand: ['current_location', 'milestones'],
  apiKey: process.env.LOGICORE_KEY
});

console.log(tracking.eta); // "2026-04-12T14:00:00Z"`}
               </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. PRICING --- */}
      <section id="pricing" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 text-slate-950">Transparent Scaling.</h2>
            <p className="text-slate-500 font-medium">No hidden fees. Scale your platform as your fleet grows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <PriceCard tier="Starter" price="₹4,999" desc="Ideal for local fleet management and startups." items={["Shipment Management", "Basic Tracking", "5 Admin Users", "Standard Reports"]} />
             <PriceCard tier="Growth" price="₹14,999" desc="Perfect for expanding regional logistics firms." items={["AI Route Optimization", "Client White-label Portal", "50 Admin Users", "Full API Access"]} highlight />
             <PriceCard tier="Enterprise" price="Custom" desc="Full-suite solutions for global carriers." items={["Dedicated Account Manager", "Custom Integrations", "Unlimited Users", "On-premise Options"]} />
          </div>
        </div>
      </section>

      {/* --- 8. FAQ --- */}
      <section id="faq" className="py-40 bg-slate-50/50 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 text-slate-950 font-serif italic">Common Questions</h2>
          <div className="space-y-4">
            <FaqItem q="How long does it take to implement?" a="Standard SaaS setups are live in 48 hours. Enterprise configurations with custom ERP integrations typically range from 2 to 4 weeks." />
            <FaqItem q="Can we white-label the customer tracking portal?" a="Yes. The Growth and Enterprise plans allow full white-labeling with your own domain, logos, and brand colors." />
            <FaqItem q="Is my data encrypted and secure?" a="Absolutely. We use 256-bit AES encryption at rest and TLS 1.3 for data in motion, hosted in Tier-4 secure data centers." />
          </div>
        </div>
      </section>

      {/* --- 9. CTA --- */}
      <section id="cta" className="py-32 px-8">
        <div className="max-w-7xl mx-auto bg-slate-950 rounded-[4rem] p-20 md:p-32 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 pointer-events-none"><Activity size={400} /></div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-none relative z-10">Ready to Modernize <br/> Your Operations?</h2>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
             <button className="bg-indigo-600 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-indigo-500 transition-all shadow-xl">Start Free Trial</button>
             <button className="bg-transparent border-2 border-slate-700 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-slate-950 transition-all">Book a Demo</button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 px-8 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-8">
                <div className="bg-slate-950 p-1.5 rounded-lg text-white"><Navigation size={18} fill="currentColor" /></div>
                <span className="text-xl font-black tracking-tighter uppercase">LOGI<span className="text-indigo-600">CORE</span></span>
             </div>
             <p className="text-slate-400 font-medium max-w-sm leading-relaxed">Driving the digital transformation of global trade. Empowering modern carriers with real-time intelligence.</p>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Navigation</h4>
            <ul className="space-y-4 font-bold text-slate-600 text-sm">
              <li onClick={() => scrollTo('features')} className="cursor-pointer hover:text-indigo-600">Features</li>
              <li onClick={() => scrollTo('api')} className="cursor-pointer hover:text-indigo-600">API Portal</li>
              <li onClick={() => scrollTo('pricing')} className="cursor-pointer hover:text-indigo-600">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h4>
            <ul className="space-y-4 font-bold text-slate-600 text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-50 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
          © 2026 LogiCore Technologies. All rights reserved.
        </div>
      </footer>

    </main>
  );
}

// UI COMPONENTS
function FeatureBox({ icon: Icon, title, desc }) {
  return (
    <div className="p-12 bg-white border border-slate-100 rounded-[3rem] hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500 group">
      <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-950">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function CaseStudyItem({ title, result, desc }) {
  return (
    <div className="group">
      <div className="text-indigo-400 font-black text-2xl mb-2 tracking-tight group-hover:translate-x-2 transition-transform">{result}</div>
      <div className="font-bold text-xl mb-3 text-white">{title}</div>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function PriceCard({ tier, price, desc, items, highlight }) {
  return (
    <div className={`p-12 rounded-[3.5rem] border-2 transition-all duration-500 ${highlight ? "border-indigo-600 shadow-3xl scale-105 z-10 bg-white" : "border-slate-50 bg-slate-50/50"}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4">{tier}</div>
      <div className="text-5xl font-black mb-5 tracking-tighter text-slate-950">{price}<span className="text-sm font-medium text-slate-400">/mo</span></div>
      <p className="text-slate-500 font-medium text-sm mb-10">{desc}</p>
      <div className="space-y-5 mb-12">
        {items.map(item => (
          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <CheckCircle2 size={18} className="text-indigo-600 shrink-0" /> {item}
          </div>
        ))}
      </div>
      <button className={`w-full py-5 rounded-full font-black text-lg transition-all ${highlight ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "bg-slate-950 text-white hover:bg-indigo-600"}`}>
        Select {tier}
      </button>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:border-indigo-100 transition-colors">
      <h4 className="text-lg font-black mb-3 text-slate-950">{q}</h4>
      <p className="text-slate-500 font-medium leading-relaxed">{a}</p>
    </div>
  );
}