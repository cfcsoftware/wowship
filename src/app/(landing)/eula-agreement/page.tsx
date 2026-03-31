"use client";

import React from 'react';
import { 
  FileCheck, 
  Shield, 
  Cpu, 
  Ban, 
  RefreshCw, 
  Power, 
  AlertOctagon,
} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';


const EulaHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <FileCheck size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">License Agreement</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        End-User License Agreement
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Important terms regarding your license to use the Logicore-ERP software platform.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Effective Date: January 1, 2026</p>
    </div>
  </section>
);

const EulaBody = () => {
  const sections = [
    {
      id: "grant",
      title: "1. Grant of License",
      icon: Shield,
      content: (
        <>
          <p className="mb-4">
            Subject to your compliance with these terms, Logicore-ERP Inc. grants you a revocable, non-exclusive, non-transferable, limited license to download, install (if applicable), and use the Logicore-ERP software strictly for your internal professional use related to legal practice management.
          </p>
          <p className="mb-4">
            <strong>1.1 Scope:</strong> This license applies to the web application, mobile applications, and any associated APIs provided by Logicore.
          </p>
          <p>
            <strong>1.2 Seats:</strong> The license is limited to the number of user seats (&quot;Attorneys&quot; or &quot;Staff&quot;) specified in your subscription plan. Sharing credentials to exceed seat limits is strictly prohibited.
          </p>
        </>
      )
    },
    {
      id: "restrictions",
      title: "2. Restrictions on Use",
      icon: Ban,
      content: (
        <>
          <p className="mb-4">
            You agree not to, and you will not permit others to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise commercially exploit the Application.</li>
            <li>Modify, make derivative works of, disassemble, decrypt, reverse compile, or reverse engineer any part of the Application.</li>
            <li>Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) of Logicore-ERP or its affiliates.</li>
            <li>Use the Application for any purpose that is illegal or prohibited by applicable law.</li>
          </ul>
        </>
      )
    },
    {
      id: "ip",
      title: "3. Intellectual Property",
      icon: Cpu,
      content: (
        <>
          <p className="mb-4">
            The Application, including without limitation all copyrights, patents, trademarks, trade secrets, and other intellectual property rights are, and shall remain, the sole and exclusive property of Logicore-ERP Inc.
          </p>
          <p>
            <strong>3.1 Feedback:</strong> If you provide any feedback, suggestions, or comments regarding the Application, you hereby assign to Logicore-ERP all rights in such Feedback and agree that Logicore-ERP shall have the right to use such Feedback and related information in any manner it deems appropriate.
          </p>
        </>
      )
    },
    {
      id: "updates",
      title: "4. Updates and Maintenance",
      icon: RefreshCw,
      content: (
        <>
          <p className="mb-4">
            Logicore-ERP may from time to time provide enhancements or improvements to the features/functionality of the Application, which may include patches, bug fixes, updates, upgrades, and other modifications (&quot;Updates&quot;).
          </p>
          <p>
            Updates may modify or delete certain features and/or functionalities of the Application. You agree that Logicore-ERP has no obligation to (i) provide any Updates, or (ii) continue to provide or enable any particular features and/or functionalities of the Application to you.
          </p>
        </>
      )
    },
    {
      id: "termination",
      title: "5. Term and Termination",
      icon: Power,
      content: (
        <>
          <p className="mb-4">
            This Agreement shall remain in effect until terminated by you or Logicore. Logicore-ERP may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.
          </p>
          <p className="mb-4">
            This Agreement will terminate immediately, without prior notice from Logicore-ERP, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your computer.
          </p>
          <p>
            Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your computer.
          </p>
        </>
      )
    },
    {
      id: "disclaimer",
      title: "6. Disclaimer of Warranties",
      icon: AlertOctagon,
      content: (
        <>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-6">
            <p className="text-sm text-red-900 leading-relaxed font-medium">
              THE APPLICATION IS PROVIDED TO YOU &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, Logicore-ERP EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </p>
          </div>
          <p>
            Without limitation to the foregoing, Logicore-ERP provides no warranty or undertaking, and makes no representation of any kind that the Application will meet your requirements, achieve any intended results, be compatible or work with any other software, applications, systems, or services, operate without interruption, meet any performance or reliability standards, or be error-free.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white -mt-8 pb-5">
      {/* Full width container */}
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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Questions about this license?</h3>
          <p className="text-[#8E8E93] mb-6">Contact our legal team for clarification on licensing terms.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function EulaAgreement() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <EulaHeader />
        <EulaBody />
      </div>
    </HomeLayout>
  );
}