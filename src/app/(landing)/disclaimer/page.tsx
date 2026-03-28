"use client";

import React from 'react';
import { 
  AlertTriangle, 
  Gavel, 
  Bot, 
  ShieldAlert, 
  FileWarning, 
  Link as LinkIcon,
} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';

const DisclaimerHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <AlertTriangle size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Important Notice</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Disclaimer
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Understanding the limitations of our platform and AI services.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Last Updated: January 1, 2026</p>
    </div>
  </section>
);

const DisclaimerBody = () => {
  const sections = [
    {
      id: "no-legal-advice",
      title: "1. Not Legal Advice",
      icon: Gavel,
      content: (
        <>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-2xl mb-6">
            <p className="text-sm text-amber-900 leading-relaxed font-medium">
              Nexion-ERP IS A SOFTWARE PROVIDER, NOT A LAW FIRM. WE DO NOT PROVIDE LEGAL ADVICE, LEGAL OPINIONS, OR LEGAL REPRESENTATION.
            </p>
          </div>
          <p className="mb-4">
            The information, content, and tools provided on the Nexion-ERP platform, including automated templates, case management features, and AI-generated insights, are for informational and productivity purposes only. They are not intended to be a substitute for professional legal advice from a qualified attorney licensed in your jurisdiction.
          </p>
          <p>
            Use of Nexion-ERP does not create an attorney-client relationship between you and ogdine Inc. or any of its employees.
          </p>
        </>
      )
    },
    {
      id: "ai-limitations",
      title: "2. AI & Automated Tools Limitations",
      icon: Bot,
      content: (
        <>
          <p className="mb-4">
            Our Artificial Intelligence (AI) features (including the AI Assistant, Risk Analysis, and Predictive Insights) use probabilistic models to generate text and analysis based on patterns in data. 
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Accuracy:</strong> AI may produce &quot;hallucinations&quot; or factually incorrect information, including citing non-existent case law or statutes. You must independently verify all AI outputs.</li>
            <li><strong>Currency:</strong> AI models may not reflect the most recent changes in law or court procedures immediately.</li>
            <li><strong>Context:</strong> AI lacks the human judgment, ethical reasoning, and nuanced understanding of specific client circumstances that a qualified attorney possesses.</li>
          </ul>
          <p>
            You agree that you will review, edit, and verify all AI-generated content before using it in any legal capacity or providing it to a client.
          </p>
        </>
      )
    },
    {
      id: "no-guarantee",
      title: "3. No Guarantee of Results",
      icon: ShieldAlert,
      content: (
        <>
          <p className="mb-4">
            Any &quot;Win Probability&quot; scores, case predictions, or outcome forecasts provided by the platform are estimates based on historical data trends. They are <strong>not guarantees</strong> of future results.
          </p>
          <p>
            Every legal matter is unique and subject to numerous variables including judge discretion, opposing counsel strategy, and evidence availability. Nexion-ERP expressly disclaims any liability for decisions made or actions taken in reliance on such predictions or analytics.
          </p>
        </>
      )
    },
    {
      id: "data-accuracy",
      title: "4. Accuracy of Information",
      icon: FileWarning,
      content: (
        <>
          <p className="mb-4">
            While we strive to keep the information and legal templates on our platform accurate and up-to-date, laws and regulations change frequently and vary by jurisdiction.
          </p>
          <p>
            Nexion-ERP makes no warranties, expressed or implied, regarding the accuracy, completeness, reliability, or suitability of the information contained on the platform. Any reliance you place on such information is strictly at your own risk.
          </p>
        </>
      )
    },
    {
      id: "third-party",
      title: "5. Third-Party Links & Services",
      icon: LinkIcon,
      content: (
        <>
          <p className="mb-4">
            The Service may contain links to third-party websites, services, or resources (e.g., court dockets, payment processors) that are not owned or controlled by Nexion-ERP.
          </p>
          <p>
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Nexion-ERP shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of such external sites or resources.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white -mt-8 pb-5">
      {/* Full width container used */}
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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Have questions about this disclaimer?</h3>
          <p className="text-[#8E8E93] mb-6">Contact our compliance team for further clarification.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function DisclaimerPage() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <DisclaimerHeader />
        <DisclaimerBody />
      </div>
    </HomeLayout>
  );
}