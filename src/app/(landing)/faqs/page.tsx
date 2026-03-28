"use client";

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MessageCircle, 
  Mail, 
} from 'lucide-react';

import HomeLayout from '@/components/layout/homelayout';

// --- Page Components ---

const FAQHeader = () => (
  <section className="pt-32 pb-16 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <HelpCircle size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Help Center</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Everything you need to know about Nexion-ERP features, billing, and security.
      </p>
    </div>
  </section>
);

const FAQBody = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "General",
      questions: [
        { q: "What is Nexion-ERP?", a: "Nexion-ERP is an all-in-one legal practice management platform designed for modern law firms. It combines case management, billing, client intake, and advanced AI tools like document drafting and judge analytics into a single operating system." },
        { q: "Who is Nexion-ERP for?", a: "We serve solo practitioners, boutique firms, and mid-to-large sized organizations. Our platform scales with your needs, offering tailored features for every stage of growth." },
        { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial on all plans. No credit card is required to sign up, and you get full access to the features of your chosen tier." },
      ]
    },
    {
      category: "Features & AI",
      questions: [
        { q: "How accurate is the AI legal assistant?", a: "Our AI is trained on vast legal datasets but is designed as an assistant, not a replacement. It provides starting points for drafts, research summaries, and risk analysis. We always recommend professional review of all AI-generated output." },
        { q: "Does the AI learn from my client data?", a: "No. Your client data is strictly isolated and is NEVER used to train our public models. We use a RAG (Retrieval-Augmented Generation) architecture that references your documents only within your secure session context." },
        { q: "Can I customize document templates?", a: "Absolutely. You can upload your firm's existing precedents and templates. Our AI will learn your style and format new documents to match your standards." },
      ]
    },
    {
      category: "Billing & Subscription",
      questions: [
        { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard. Upgrades are effective immediately (prorated), while downgrades take effect at the end of the current billing cycle." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), UPI, and net banking for Indian customers. Enterprise clients can also pay via invoice/bank transfer." },
        { q: "Is there a refund policy?", a: "We generally do not offer refunds for partial months. However, if you experience significant technical issues or are dissatisfied within the first 48 hours of payment, please contact support for a review." },
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        { q: "Is my data secure?", a: "Security is our top priority. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on SOC 2 Type II compliant servers with regular third-party audits." },
        { q: "Where is my data stored?", a: "For Indian customers, data is stored in AWS Mumbai (ap-south-1) to comply with data localization norms. Global customers are hosted in their respective regions." },
        { q: "Who owns the data I upload?", a: "You retain 100% ownership of all data, documents, and client information you upload to Nexion-ERP. We claim no intellectual property rights over your material." },
      ]
    }
  ];

  // Flatten FAQs for search if needed, or just filter visuals
  const filteredFAQs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  // Determine global index for open state tracking across categories
  let globalIndexCounter = 0;

  return (
    <section className="py-12 px-4 md:px-8 bg-white -mt-8 pb-5">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-[#8E8E93]" />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#E5E5EA] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-[#1C1C1E] placeholder-[#8E8E93] transition-all text-base font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-12">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-xl font-bold text-[#1C1C1E] mb-6 pl-2 border-l-4 border-orange-500">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIdx) => {
                    const currentIndex = globalIndexCounter++;
                    const isOpen = openIndex === currentIndex;

                    return (
                      <div 
                        key={qIdx} 
                        className={`border rounded-2xl transition-all duration-300 ${
                          isOpen 
                            ? 'bg-[#F2F2F7] border-orange-200' 
                            : 'bg-white border-[#E5E5EA] hover:border-orange-100'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                          className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                          <span className={`font-bold text-lg ${isOpen ? 'text-orange-900' : 'text-[#1C1C1E]'}`}>
                            {item.q}
                          </span>
                          {isOpen ? <ChevronUp className="text-orange-600 shrink-0" /> : <ChevronDown className="text-[#8E8E93] shrink-0" />}
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                            isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                          }`}
                        >
                          <p className="text-[#48484A] leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#8E8E93] text-lg">No matching questions found.</p>
            </div>
          )}
        </div>

        {/* Contact Block */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-[#F2F2F7] rounded-[32px] border border-[#E5E5EA] hover:shadow-md transition-all text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-orange-600 mb-4 shadow-sm">
               <MessageCircle size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Still have questions?</h3>
            <p className="text-[#8E8E93] mb-6 text-sm">Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</p>
            <a href="/contactus" className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-700 transition-colors text-sm">
              Contact Us
            </a>
          </div>

          <div className="p-8 bg-[#F2F2F7] rounded-[32px] border border-[#E5E5EA] hover:shadow-md transition-all text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-orange-600 mb-4 shadow-sm">
               <Mail size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Email Support</h3>
            <p className="text-[#8E8E93] mb-6 text-sm">Prefer email? Send us a message and we&apos;ll get back to you within 24 hours.</p>
            <a href="mailto:ogdine@cfcsoftware.com" className="inline-block bg-white text-orange-600 border border-[#E5E5EA] px-6 py-2.5 rounded-full font-bold hover:bg-orange-50 transition-colors text-sm">
              ogdine@cfcsoftware.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default function FAQPage() {
  return (
    <HomeLayout>
      <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
        <FAQHeader />
        <FAQBody />
      </div>
    </HomeLayout>
  );
}