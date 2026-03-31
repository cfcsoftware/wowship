"use client";

import React from 'react';
import HomeLayout from '@/components/layout/homelayout';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send,
  Clock
} from 'lucide-react';


// --- Contact Page Components ---

const ContactHero = () => (
  <section className="pt-30 pb-10 px-4 md:px-8 w-full text-center relative overflow-hidden bg-[#F2F2F7]">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
        <MessageSquare size={16} className="text-orange-600" />
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">We are here to help</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-[#1C1C1E] tracking-tight mb-6">
        Get in Touch
      </h1>
      <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
        Have questions about Logicore-ERP? Our team is ready to help you streamline your legal practice.
      </p>
    </div>
  </section>
);

const ContactContent = () => (
  <section className="py-12 px-4 md:px-8 bg-[#F2F2F7] -mt-8 pb-10">
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Contact Form */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-[#E5E5EA]">
          <h2 className="text-2xl font-bold text-[#1C1C1E] mb-2">Send us a message</h2>
          <p className="text-[#8E8E93] mb-8">We usually respond within 2 hours during business hours.</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1C1C1E]">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1C1C1E]">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1C1C1E]">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                  placeholder="janedoe@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1C1C1E]">Subject</label>
                <select className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-[#1C1C1E]">
                  <option>Sales Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1C1C1E]">Message</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-500 hover:to-orange-500 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="space-y-8">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5EA] hover:border-orange-200 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1E] text-lg">Sales & Support</h3>
                  <p className="text-[#8E8E93] text-sm mt-1 mb-2">For demos, pricing, and general help.</p>
                  <a href="mailto:ogdine@cfcsoftware.com" className="text-orange-600 font-semibold hover:underline">ogdine@cfcsoftware.com</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E5EA] hover:border-orange-200 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1E] text-lg">Phone Support</h3>
                  <p className="text-[#8E8E93] text-sm mt-1 mb-2">Mon-Fri from 9am to 6pm IST.</p>
                  <a href="tel:+918286306019" className="text-orange-600 font-semibold hover:underline">+91 82863 06019</a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Location Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E5EA] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-50"></div>
             <div className="flex items-center gap-3 mb-6 relative z-10">
                <MapPin size={24} className="text-orange-600" />
                <h3 className="font-bold text-[#1C1C1E] text-xl">Our Office</h3>
             </div>
             
             <address className="not-italic text-[#48484A] leading-relaxed mb-6 relative z-10">
                <a 
                  href="https://www.ogdine.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold bg-[#1C1C1E] text-white px-2 py-1 rounded inline-block hover:bg-[#333] transition-colors"
                >
                  www.ogdine.in
                </a><br />
                1811, C-Wing, Kailash Business Park,<br />
                Hiranandani Link Road,<br />
                Mumbai, Maharastra<br />
                India - 400079
             </address>

             <div className="flex items-center gap-2 text-sm text-[#8E8E93] bg-[#F2F2F7] px-4 py-2 rounded-lg w-fit">
                <Clock size={16} />
                <span>Open 9:00 AM - 6:00 PM</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);


export default function ContactPage() {
  return (
  <HomeLayout>
    <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      <ContactHero />
      <ContactContent />
    </div>
  </HomeLayout>
  );
}