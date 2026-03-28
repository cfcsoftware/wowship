"use client";

import React from 'react';
import { 
  CreditCard, 
  Ban, 
  Calendar, 
  AlertCircle, 
} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';

const CancelRefundHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <CreditCard size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Billing Policy</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Cancellation & Refund Policy
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Transparent terms regarding your subscription, cancellations, and billing cycles.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Effective Date: January 1, 2025</p>
    </div>
  </section>
);

const CancelRefundBody = () => {
  const sections = [
    {
      id: "cancellation",
      title: "1. Subscription Cancellation",
      icon: Ban,
      content: (
        <>
          <p className="mb-4">
            You may cancel your Nexion-ERP subscription at any time directly from your account dashboard or by contacting our support team.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Effect of Cancellation:</strong> If you cancel your subscription, your account will remain active until the end of your current billing period. After that period ends, your account will be downgraded to a read-only state or suspended, depending on your data retention choices.</li>
            <li><strong>No Penalties:</strong> There are no cancellation fees. You are free to leave at any time without penalty.</li>
            <li><strong>Data Retention:</strong> Upon cancellation, we retain your data for 30 days to allow for reactivation. After this period, your data may be permanently deleted unless you request an immediate export and deletion.</li>
          </ul>
        </>
      )
    },
    {
      id: "refunds",
      title: "2. Refund Policy",
      icon: CreditCard,
      content: (
        <>
          <p className="mb-4">
            Nexion-ERP operates on a prepaid subscription basis.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-2xl mb-6">
            <p className="text-sm text-orange-900 leading-relaxed font-medium">
              <strong>GENERAL RULE:</strong> Payments are non-refundable. There are no refunds or credits for partially used billing periods (either monthly or yearly).
            </p>
          </div>
          <p className="mb-4">
            <strong>Exceptions:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Double Billing:</strong> If you were billed twice for the same period due to a technical error, we will refund the duplicate charge immediately.</li>
            <li><strong>Service Downtime:</strong> In the unlikely event of significant service unavailability (exceeding our SLA), you may be eligible for a pro-rated credit for the downtime period, subject to our review.</li>
          </ul>
        </>
      )
    },
    {
      id: "trial",
      title: "3. Free Trial Policy",
      icon: Calendar,
      content: (
        <>
          <p className="mb-4">
            We offer a 14-day free trial for new users.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>No Charge:</strong> You will not be charged during the free trial period.</li>
            <li><strong>Conversion:</strong> If you choose to upgrade to a paid plan before the trial ends, you will be billed immediately for the chosen plan duration.</li>
            <li><strong>Expiration:</strong> If you do not upgrade by the end of the trial, your account will automatically be suspended. You will not be charged unless you actively subscribe.</li>
          </ul>
        </>
      )
    },
    {
      id: "downgrades",
      title: "4. Downgrades & Plan Changes",
      icon: AlertCircle,
      content: (
        <>
          <p className="mb-4">
            You can upgrade or downgrade your plan at any time.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Upgrades:</strong> Plan upgrades are effective immediately. You will be charged a prorated amount for the remainder of the billing cycle.</li>
            <li><strong>Downgrades:</strong> Downgrades take effect at the end of the current billing cycle. You will retain access to your higher-tier features until that date. No refunds are issued for the price difference of a downgrade during an active billing cycle.</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white -mt-8 pb-5">
      {/* Full Width Container */}
      <div className="w-full">
        <div className="space-y-8">
          {sections.map((section) => (
            <div 
              key={section.id} 
              id={section.id} 
              className="bg-white rounded-[32px] p-8 md:p-12 border border-[#E5E5EA] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start md:items-center gap-5 mb-8 pb-6 border-b border-[#E5E5EA]">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                  <section.icon size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C1E]">{section.title}</h2>
              </div>
              
              <div className="prose prose-slate max-w-none text-[#48484A] leading-relaxed text-base md:text-lg">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Block */}
        <div className="mt-5 p-2 bg-[#F2F2F7] rounded-[32px] text-center border border-[#E5E5EA]">
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Have billing questions?</h3>
          <p className="text-[#8E8E93] mb-6">Our billing support team is here to help clarify any charges.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function CancelRefundPage() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <CancelRefundHeader />
        <CancelRefundBody />
      </div>
    </HomeLayout>
  );
}