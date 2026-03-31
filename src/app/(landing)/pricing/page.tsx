"use client";

import React, { useState } from 'react';
import HomeLayout from '@/components/layout/homelayout';
import { 
  Check, 
  Zap,
  Building2,
  Users
} from 'lucide-react';

// --- Pricing Logic & Components ---

const PricingHeader = ({ billingCycle, setBillingCycle }: { billingCycle: 'monthly' | 'yearly', setBillingCycle: React.Dispatch<React.SetStateAction<'monthly' | 'yearly'>> }) => (
  <section className="pt-30 pb-10 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Simple, Transparent Pricing
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto mb-10">
        Choose plan that fits your firm&apos;s stage. No hidden fees, cancel anytime.
      </p>

      {/* Toggle */}
      <div className="inline-flex bg-white p-1.5 rounded-full border border-[#E5E5EA] shadow-sm relative">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            billingCycle === 'monthly' 
              ? 'bg-[#1C1C1E] text-white shadow-md' 
              : 'text-[#8E8E93] hover:text-[#1C1C1E]'
          }`}
        >
          Monthly Billing
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            billingCycle === 'yearly' 
              ? 'bg-[#1C1C1E] text-white shadow-md' 
              : 'text-[#8E8E93] hover:text-[#1C1C1E]'
          }`}
        >
          Yearly Billing
        </button>
        
        {/* Discount Badge */}
        <div className="absolute -top-3 -right-6 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200 transform rotate-12">
          Save 20%
        </div>
      </div>
    </div>
  </section>
);

const PricingCards = ({ billingCycle }: { billingCycle: 'monthly' | 'yearly' }) => {
  const plans = [
    {
      name: "Solo",
      desc: "Perfect for individual practitioners.",
      price: billingCycle === 'monthly' ? 999 : 8999,
      features: [
        "Up to 3 Active Cases",
        "Basic Case Management",
        "Client Portal",
        "Standard Document Storage (5GB)",
        "Email Support"
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: Users
    },
    {
      name: "Professional",
      desc: "For growing firms needing efficiency.",
      price: billingCycle === 'monthly' ? 1299 : 13599,
      features: [
        "Unlimited Active Cases",
        "Logicore-ERP AI Suite (Analysis & Drafting)",
        "Smart Calendar & Deadlines",
        "Judge Analytics",
        "Advanced Billing & Invoicing",
        "Priority Support"
      ],
      cta: "Get Professional",
      popular: true,
      icon: Zap
    },
    {
      name: "Enterprise",
      desc: "Custom solutions for large organizations.",
      price: "Custom",
      features: [
        "Dedicated Account Manager",
        "Custom AI Model Training",
        "On-Premise Deployment Option",
        "API Access & Integrations",
        "Advanced Security & SSO",
        "24/7 Phone Support"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Building2
    }
  ];

  return (
    <section className="py-10 px-4 md:px-8 bg-[#F2F2F7] -mt-8 pb-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white rounded-[32px] p-8 border transition-all duration-300 flex flex-col h-full ${
                plan.popular 
                  ? 'border-orange-500 shadow-2xl shadow-orange-500/20 scale-105 z-10' 
                  : 'border-[#E5E5EA] shadow-xl hover:border-orange-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-orange-100 text-orange-600' : 'bg-[#F2F2F7] text-[#1C1C1E]'
                }`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1C1E]">{plan.name}</h3>
                <p className="text-[#8E8E93] text-sm mt-2">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-[#1C1C1E]">₹{plan.price}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-[#1C1C1E]">{plan.price}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && typeof plan.price === 'number' && (
                  <p className="text-xs text-green-600 font-medium mt-2">Billed ₹{plan.price} yearly</p>
                )}
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-[#48484A] font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-500 hover:to-orange-500 text-white shadow-lg shadow-orange-500/25' 
                  : 'bg-[#1C1C1E] hover:bg-black text-white'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Feature Comparison Table ---

const ComparisonTable = () => {
  const features = [
    { category: "Core Features", items: [
      { name: "Case Management", solo: true, pro: true, ent: true },
      { name: "Document Storage", solo: "5 GB", pro: "Unlimited", ent: "Unlimited" },
      { name: "Client Portal", solo: true, pro: true, ent: true },
      { name: "E-Signature", solo: false, pro: true, ent: true },
    ]},
    { category: "Intelligence (AI)", items: [
      { name: "Risk Analysis", solo: false, pro: true, ent: true },
      { name: "Automated Drafting", solo: false, pro: true, ent: true },
      { name: "Judge Analytics", solo: false, pro: true, ent: true },
      { name: "Custom AI Models", solo: false, pro: false, ent: true },
    ]},
    { category: "Support & Security", items: [
      { name: "Support Level", solo: "Email", pro: "Priority Email", ent: "24/7 Phone" },
      { name: "SSO / SAML", solo: false, pro: false, ent: true },
      { name: "On-Premise Option", solo: false, pro: false, ent: true },
    ]}
  ];

  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Compare Plans</h2>
          <p className="text-[#8E8E93] mt-2">Detailed breakdown of what&apos;s included.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 w-1/3"></th>
                <th className="p-4 text-center text-lg font-bold text-[#1C1C1E]">Solo</th>
                <th className="p-4 text-center text-lg font-bold text-orange-600">Professional</th>
                <th className="p-4 text-center text-lg font-bold text-[#1C1C1E]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((section, idx) => (
                <React.Fragment key={idx}>
                  <tr className="bg-[#F9F9F9]">
                    <td colSpan={4} className="p-4 font-bold text-sm text-[#8E8E93] uppercase tracking-wider">
                      {section.category}
                    </td>
                  </tr>
                  {section.items.map((item, i) => (
                    <tr key={i} className="border-b border-[#E5E5EA] hover:bg-[#F2F2F7] transition-colors">
                      <td className="p-4 font-medium text-[#1C1C1E]">{item.name}</td>
                      <td className="p-4 text-center text-sm text-[#48484A]">
                        {typeof item.solo === 'boolean' ? (
                          item.solo ? <Check className="inline text-green-500 w-5 h-5" /> : <span className="text-[#E5E5EA]">—</span>
                        ) : item.solo}
                      </td>
                      <td className="p-4 text-center text-sm text-[#48484A] font-medium bg-orange-50/30">
                        {typeof item.pro === 'boolean' ? (
                          item.pro ? <Check className="inline text-orange-600 w-5 h-5" /> : <span className="text-[#E5E5EA]">—</span>
                        ) : item.pro}
                      </td>
                      <td className="p-4 text-center text-sm text-[#48484A]">
                        {typeof item.ent === 'boolean' ? (
                          item.ent ? <Check className="inline text-orange-600 w-5 h-5" /> : <span className="text-[#E5E5EA]">—</span>
                        ) : item.ent}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};




export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <HomeLayout>
      <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <PricingHeader billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        <PricingCards billingCycle={billingCycle} />
        <ComparisonTable />
      </div>
    </HomeLayout>
  );
}