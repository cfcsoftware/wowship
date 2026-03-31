"use client";

import React from 'react';
import { 
  Cookie, 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  ToggleLeft, 
  Globe, 
  Info,
} from 'lucide-react';


import HomeLayout from '@/components/layout/homelayout';


const CookiesHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <Cookie size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Cookie Usage</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Cookie Policy
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Transparency about how we use cookies to improve your Logicore-ERP experience.
      </p>
      <p className="text-sm font-medium text-orange-600 mt-4">Effective Date: January 1, 2026</p>
    </div>
  </section>
);

const CookiesBody = () => {
  const sections = [
    {
      id: "intro",
      title: "1. What Are Cookies?",
      icon: Info,
      content: (
        <>
          <p className="mb-4">
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
          </p>
          <p>
            Logicore-ERP uses cookies to distinguish you from other users of our platform. This helps us to provide you with a seamless experience when you browse our website and also allows us to improve our platform.
          </p>
        </>
      )
    },
    {
      id: "essential",
      title: "2. Strictly Necessary Cookies",
      icon: ShieldCheck,
      content: (
        <>
          <p className="mb-4">
            These cookies are fundamental to the operation of the Logicore-ERP platform. Without these cookies, services you have asked for cannot be provided.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Authentication:</strong> We use cookies to verify your account and determine when you&apos;re logged in, so we can make it easier for you to access the Logicore-ERP services and show you the appropriate experience and features.</li>
            <li><strong>Security:</strong> We use cookies to help keep your account, data, and the Logicore-ERP services safe and secure.</li>
            <li><strong>Session Management:</strong> To maintain your active session so you don&apos;t have to log in every time you navigate to a new page.</li>
          </ul>
        </>
      )
    },
    {
      id: "functionality",
      title: "3. Functionality & Preference Cookies",
      icon: Settings,
      content: (
        <>
          <p className="mb-4">
            These cookies allow us to remember choices you make when you use our website, such as remembering your login details or language preference. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you use the Service.
          </p>
          <p>
            For example, we may use cookies to remember your last viewed case file or your preferred dashboard layout settings.
          </p>
        </>
      )
    },
    {
      id: "analytics",
      title: "4. Analytics & Performance Cookies",
      icon: BarChart3,
      content: (
        <>
          <p className="mb-4">
            We use these cookies to collect information about how you interact with our services and to help us improve them.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[#48484A]">
            <li><strong>Performance:</strong> We use cookies to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.</li>
            <li><strong>Analytics:</strong> We use cookies to help us understand how people use our services. For example, we may use these cookies to determine which features are most popular or where users encounter errors.</li>
          </ul>
        </>
      )
    },
    {
      id: "managing",
      title: "5. Managing Cookies",
      icon: ToggleLeft,
      content: (
        <>
          <p className="mb-4">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
          </p>
          <p className="mb-4">
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
          <p>
            As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu for more information.
          </p>
        </>
      )
    },
    {
      id: "third-party",
      title: "6. Third-Party Cookies",
      icon: Globe,
      content: (
        <>
          <p>
            In some special cases, we also use cookies provided by trusted third vendors. The following section details which third party cookies you might encounter through this site:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-[#48484A]">
            <li><strong>Payment Processing:</strong> Our payment processors (e.g., Stripe) may set cookies to facilitate secure transactions.</li>
            <li><strong>Support Chat:</strong> Our customer support chat widget may use cookies to maintain your conversation history across pages.</li>
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
          <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Questions about our Cookie Policy?</h3>
          <p className="text-[#8E8E93] mb-6">If you have any questions about our use of cookies or other technologies, please email us.</p>
          <a href="mailto:ogdine@cfcsoftware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 border border-[#E5E5EA] rounded-full font-bold hover:bg-orange-50 transition-colors">
            ogdine@cfcsoftware.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default function CookiesPolicyPage() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <CookiesHeader />
        <CookiesBody />
      </div>
    </HomeLayout>
  );
}