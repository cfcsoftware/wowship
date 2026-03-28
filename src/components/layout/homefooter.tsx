"use client";
import React from 'react';
import { Globe, Smartphone, UtensilsCrossed } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 pt-16 pb-8 w-full">
    <div className="w-full px-4 sm:px-8 lg:px-16 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 w-full">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Nexion-ERP</span>
          </div>
          <p className="text-slate-500 mb-6 max-w-sm">
            The ultimate cloud-based Point of Sale, inventory, and enterprise resource management SaaS application built for the all industry.
          </p>
          <div className="flex gap-4">
            {/* Social placeholders */}
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 cursor-pointer transition-colors"><Globe className="w-5 h-5" /></div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 cursor-pointer transition-colors"><Smartphone className="w-5 h-5" /></div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Product</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">CRM</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Billing</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Inventory Control</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">HRMS</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Payroll</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Company</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">About Us</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Careers</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Blog</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Data Security</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Nexion-ERP Inc. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-slate-400">
          <span>Made with Passion</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;