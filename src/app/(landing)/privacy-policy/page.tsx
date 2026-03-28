"use client";

import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Globe, 
  Server, 
  UserCheck, 
  Cookie,

} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';


const PrivacyHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <Shield size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Data Protection</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Privacy Policy
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Your trust is our priority. Here&apos;s how we protect your firm&apos;s and your clients&apos; sensitive data.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Effective Date: January 1, 2026</p>
    </div>
  </section>
);

const PrivacyBody = () => {
  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: Database, // Using Database icon placeholder for collection
      content: (
        <>
          <p className="mb-4">
            We collect information to provide better services to all our users. The types of information we collect include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Account Information:</strong> Name, email address, phone number, and professional credentials provided during registration.</li>
            <li><strong>Client Data:</strong> Information about your clients and cases that you upload to the Service. This data remains your property and is treated with strict confidentiality.</li>
            <li><strong>Usage Data:</strong> Information about how you use our Service, such as access times, pages viewed, and IP addresses, for security and analytics purposes.</li>
          </ul>
        </>
      )
    },
    {
      id: "usage",
      title: "2. How We Use Information",
      icon: FileText,
      content: (
        <>
          <p className="mb-4">
            Nexion-ERP uses the collected data for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>To provide, maintain, and improve our Service.</li>
            <li>To process transactions and send related information, including confirmations and invoices.</li>
            <li>To send technical notices, updates, security alerts, and support and administrative messages.</li>
            <li>To respond to your comments, questions, and requests and provide customer service.</li>
            <li><strong>AI Training:</strong> Your confidential Client Data is <strong>NOT</strong> used to train our general public AI models. We use local isolation techniques to ensuring your data remains private.</li>
          </ul>
        </>
      )
    },
    {
      id: "sharing",
      title: "3. Information Sharing",
      icon: Globe,
      content: (
        <>
          <p className="mb-4">
            We do not share your personal information with companies, organizations, or individuals outside of Nexion-ERP except in the following cases:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>With Your Consent:</strong> We will share personal information with companies, organizations, or individuals outside of Nexion-ERP when we have your consent to do so.</li>
            <li><strong>For Legal Reasons:</strong> We will share personal information if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.</li>
            <li><strong>Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processing, cloud hosting).</li>
          </ul>
        </>
      )
    },
    {
      id: "security",
      title: "4. Data Security",
      icon: Lock,
      content: (
        <>
          <p className="mb-4">
            We work hard to protect Nexion-ERP and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>We encrypt our services using SSL/TLS.</li>
            <li>We review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to systems.</li>
            <li>We restrict access to personal information to Nexion-ERP employees, contractors, and agents who need to know that information in order to process it for us, and who are subject to strict contractual confidentiality obligations.</li>
          </ul>
        </>
      )
    },
    {
      id: "rights",
      title: "5. Your Rights",
      icon: UserCheck,
      content: (
        <>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>The right to access personal information we hold about you.</li>
            <li>The right to request that we correct any personal information we hold about you that is inaccurate or out of date.</li>
            <li>The right to request that we delete your personal information.</li>
            <li>The right to object to the processing of your personal information.</li>
          </ul>
          <p>
            To exercise these rights, please contact our Data Protection Officer at Nexion-ERP@cfcsoftware.com.
          </p>
        </>
      )
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking",
      icon: Cookie,
      content: (
        <>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
        </>
      )
    },
    {
      id: "servers",
      title: "7. Data Location",
      icon: Server,
      content: (
        <>
          <p>
            Our servers are primarily located in India. By using the Service, you consent to the transfer of your information to India and other countries where our service providers may be located. We ensure that appropriate safeguards are in place to protect your data during such transfers, in compliance with applicable data protection laws.
          </p>
        </>
      )
    }
  ];

  // Helper component for icon replacement since 'Database' wasn't imported in previous step logic, using 'Server' or similar.
  // Actually, I imported Database in the icon set above, but Lucide React might not have it in older versions. 
  // I'll stick to the imported list. Let's use 'Server' for 'Collection' or 'FileText'.
  // Adjusted icon mapping in the array directly.

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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Privacy Concerns?</h3>
          <p className="text-[#8E8E93] mb-6">Contact our Data Protection Officer for any privacy-related inquiries.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

// Lucide icon Database might not be available in all versions, using Server as fallback in imports if needed.
// But assuming standard Lucide package.
function Database(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    )
}

export default function PrivacyPolicy() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <PrivacyHeader />
        <PrivacyBody />
      </div>
    </HomeLayout>
  );
}