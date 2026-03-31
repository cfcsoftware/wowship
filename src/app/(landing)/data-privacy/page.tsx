"use client";

import React from 'react';
import { 
  Shield, 
  Lock, 
  Server, 
  EyeOff, 
  FileKey, 
  Database, 
  Globe, 
  CheckCircle,
} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';


const DataPrivacyHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <Shield size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Trust Center</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Data Privacy & Security
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        We protect your practice with bank-grade security, strict data isolation, and a privacy-first AI architecture.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Last Audited: December 2025</p>
    </div>
  </section>
);

const DataPrivacyBody = () => {
  const sections = [
    {
      id: "architecture",
      title: "1. Zero-Trust Architecture",
      icon: Server,
      content: (
        <>
          <p className="mb-4">
            Logicore-ERP employs a <strong>Zero-Trust security model</strong>. Every access request is fully authenticated, authorized, and encrypted before granting access.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Tenant Isolation:</strong> Every law firm&apos;s data is logically isolated in our multi-tenant database architecture. Cross-tenant data access is mathematically impossible at the database query level.</li>
            <li><strong>Least Privilege Access:</strong> Internal access to production data is restricted to key engineering personnel on a strict need-to-know basis, logged, and audited.</li>
          </ul>
        </>
      )
    },
    {
      id: "encryption",
      title: "2. Encryption Standards",
      icon: Lock,
      content: (
        <>
          <p className="mb-4">
            We use industry-leading encryption protocols to protect your data throughout its lifecycle.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Data at Rest:</strong> All files in the &quot;Lawyer&apos;s Drawer&quot; and database records are encrypted using <strong>AES-256</strong> (Advanced Encryption Standard).</li>
            <li><strong>Data in Transit:</strong> All data transmitted between your device and our servers is protected via <strong>TLS 1.3</strong> (Transport Layer Security).</li>
            <li><strong>Key Management:</strong> Encryption keys are managed via a secure Key Management Service (KMS) with automatic rotation.</li>
          </ul>
        </>
      )
    },
    {
      id: "ai-privacy",
      title: "3. AI Privacy Guarantee",
      icon: EyeOff,
      content: (
        <>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-2xl mb-6">
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              <strong>YOUR DATA IS YOURS:</strong> Logicore-ERP does NOT use your confidential client data to train our public foundation models. Your data remains isolated within your instance context.
            </p>
          </div>
          <p className="mb-4">
            Our AI architecture is designed for legal confidentiality:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Stateless Processing:</strong> Data sent to our AI for analysis (e.g., contract review) is processed in memory and not retained by the model providers.</li>
            <li><strong>Local Context:</strong> Case-specific knowledge is retrieved via RAG (Retrieval-Augmented Generation) from your secure vault, never baked into the model weights.</li>
            <li><strong>Opt-Out:</strong> Enterprise clients can opt for local model deployment or private cloud instances for absolute data sovereignty.</li>
          </ul>
        </>
      )
    },
    {
      id: "access-control",
      title: "4. Authentication & Access Control",
      icon: FileKey,
      content: (
        <>
          <p className="mb-4">
            Securing access to your account is the first line of defense.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Multi-Factor Authentication (MFA):</strong> Enforced for all administrator accounts and optional for standard users.</li>
            <li><strong>Single Sign-On (SSO):</strong> Enterprise plans support SAML 2.0 / OIDC integration with providers like Okta, Azure AD, and Google Workspace.</li>
            <li><strong>Session Management:</strong> Automatic session timeouts and suspicious login detection protect against unauthorized account access.</li>
          </ul>
        </>
      )
    },
    {
      id: "compliance",
      title: "5. Compliance & Certifications",
      icon: Globe,
      content: (
        <>
          <p className="mb-4">
            We adhere to global and local data protection standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
             <div className="p-4 bg-[#F2F2F7] rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm font-bold text-[#1C1C1E]">SOC 2 Type II Ready</span>
             </div>
             <div className="p-4 bg-[#F2F2F7] rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm font-bold text-[#1C1C1E]">DPDP Act 2023 (India)</span>
             </div>
             <div className="p-4 bg-[#F2F2F7] rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm font-bold text-[#1C1C1E]">GDPR Compliant</span>
             </div>
             <div className="p-4 bg-[#F2F2F7] rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm font-bold text-[#1C1C1E]">ISO 27001 Standards</span>
             </div>
          </div>
          <p>
            Regular third-party penetration testing and security audits ensure our defenses remain robust against emerging threats.
          </p>
        </>
      )
    },
    {
      id: "backup",
      title: "6. Data Redundancy & Recovery",
      icon: Database,
      content: (
        <>
          <p className="mb-4">
            Your data is replicated across multiple availability zones to ensure high availability and durability.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Daily Backups:</strong> Automated encrypted backups are performed daily and retained for 30 days.</li>
            <li><strong>Point-in-Time Recovery:</strong> We can restore your database to any second in the last 7 days in case of accidental data deletion or corruption.</li>
            <li><strong>Disaster Recovery:</strong> Our comprehensive DR plan targets a Recovery Time Objective (RTO) of less than 4 hours.</li>
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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Need a detailed security report?</h3>
          <p className="text-[#8E8E93] mb-6">Enterprise clients can request our SOC 2 Type II report and architecture whitepaper.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function DataPrivacyPage() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <DataPrivacyHeader />
        <DataPrivacyBody />
      </div>
    </HomeLayout>
  );
}