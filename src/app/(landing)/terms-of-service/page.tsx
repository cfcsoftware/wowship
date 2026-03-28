"use client";

import React from 'react';
import { 
  Server, 
  Activity, 
  Code, 
  ShieldCheck, 
  LifeBuoy, 
  Ban, 
  RefreshCcw,

} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';

const ToSHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <Server size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Service Agreement</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Terms of Service
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Guidelines for using the Nexion-ERP platform, APIs, and AI services.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Effective Date: January 1, 2026</p>
    </div>
  </section>
);

const ToSBody = () => {
  const sections = [
    {
      id: "provision",
      title: "1. Service Provision & Availability",
      icon: Activity,
      content: (
        <>
          <p className="mb-4">
            <strong>1.1 Service Level Objective:</strong> Nexion-ERP aims to provide 99.9% uptime for the Service during business hours. While we strive for continuous availability, we do not guarantee that the Service will be uninterrupted or error-free.
          </p>
          <p className="mb-4">
            <strong>1.2 Maintenance Windows:</strong> We reserve the right to suspend the Service temporarily for scheduled maintenance. We will make reasonable efforts to notify you at least 24 hours in advance of any scheduled downtime that is expected to last more than 30 minutes.
          </p>
          <p>
            <strong>1.3 Beta Features:</strong> Features designated as &quot;Beta&quot; or &quot;Early Access&quot; are provided &quot;AS-IS&quot; with no warranties. These features may be modified or discontinued at any time without notice.
          </p>
        </>
      )
    },
    {
      id: "api-usage",
      title: "2. API Usage & Restrictions",
      icon: Code,
      content: (
        <>
          <p className="mb-4">
            <strong>2.1 Access Grant:</strong> If your subscription plan includes API access, Nexion-ERP grants you a limited, non-exclusive, non-transferable license to access our APIs solely for your internal business purposes.
          </p>
          <p className="mb-4">
            <strong>2.2 Rate Limits:</strong> API usage is subject to rate limits to ensure the stability of the platform. Exceeding these limits may result in temporary throttling or suspension of API access. Standard limits are 100 requests per minute unless otherwise negotiated in an Enterprise agreement.
          </p>
          <p>
            <strong>2.3 Prohibited Actions:</strong> You may not use the API to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>Scrape data for the purpose of training third-party AI models.</li>
            <li>Replicate the core functionality of Nexion-ERP to build a competing service.</li>
            <li>Attempt to bypass authentication or security mechanisms.</li>
          </ul>
        </>
      )
    },
    {
      id: "data-security",
      title: "3. Data Security & Ownership",
      icon: ShieldCheck,
      content: (
        <>
          <p className="mb-4">
            <strong>3.1 Your Data:</strong> You retain full ownership of all case files, client information, and documents (&quot;User Data&quot;) you upload to the Service. Nexion-ERP claims no intellectual property rights over your User Data.
          </p>
          <p className="mb-4">
            <strong>3.2 Data Protection:</strong> We implement industry-standard security measures, including AES-256 encryption at rest and TLS 1.3 in transit. However, you are responsible for maintaining the security of your own endpoints and account credentials.
          </p>
          <p>
            <strong>3.3 Data Portability:</strong> Upon termination of your account, you may export your User Data in standard formats (e.g., CSV, JSON, PDF) within 30 days. After this period, we may permanently delete your data from our systems.
          </p>
        </>
      )
    },
    {
      id: "support",
      title: "4. Support Services",
      icon: LifeBuoy,
      content: (
        <>
          <p className="mb-4">
            <strong>4.1 Support Tiers:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Solo Plan:</strong> Standard Email Support (Response within 24-48 hours).</li>
            <li><strong>Professional Plan:</strong> Priority Email & Chat Support (Response within 4-8 hours).</li>
            <li><strong>Enterprise Plan:</strong> 24/7 Dedicated Phone Support & Account Manager.</li>
          </ul>
          <p>
            <strong>4.2 Scope of Support:</strong> Support is limited to technical issues related to the Service. We do not provide legal advice or assistance with substantive legal work.
          </p>
        </>
      )
    },
    {
      id: "suspension",
      title: "5. Termination & Suspension",
      icon: Ban,
      content: (
        <>
          <p className="mb-4">
            We may suspend or terminate your access to the Service immediately if:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>You breach these Terms of Service.</li>
            <li>We are required to do so by law.</li>
            <li>Your use of the Service poses a security risk to the Service or other users.</li>
            <li>You fail to pay subscription fees after a 7-day grace period.</li>
          </ul>
        </>
      )
    },
    {
      id: "modifications",
      title: "6. Modifications to Service",
      icon: RefreshCcw,
      content: (
        <>
          <p>
            Nexion-ERP is constantly innovating. We may add, change, or remove features or functionality at any time. We will provide reasonable notice for any changes that materially reduce the functionality of the Service. We reserve the right to discontinue the Service entirely with 90 days&apos; notice.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white -mt-8 pb-5">
      {/* Removed max-w constraint to ensure full width usage */}
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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Need clarification on service terms?</h3>
          <p className="text-[#8E8E93] mb-6">Our compliance team is happy to help enterprise customers with custom SLAs.</p>
          <a href="mailto:Nexion-ERP@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function TermsOfService() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <ToSHeader />
        <ToSBody />
      </div>
    </HomeLayout>
  );
}