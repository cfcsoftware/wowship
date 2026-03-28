"use client";
import React, { useEffect, useState } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

// 1. Navigation Bar (Marketing Site)
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 w-screen z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3"
          : "bg-transparent py-5"
      }`}
      style={{ width: "100vw" }}
    >
      <div className="w-full px-0">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Nexion-ERP
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#demo"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Book Demo
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-900 hover:text-orange-600 transition-colors">
              Log in
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg">
              Start Free Trial
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-screen bg-white border-b border-slate-200 shadow-lg py-4 px-4 flex flex-col gap-4">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-slate-600 font-medium"
          >
            Features
          </a>
          <a
            href="#solutions"
            onClick={() => setIsOpen(false)}
            className="text-slate-600 font-medium"
          >
            Solutions
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-slate-600 font-medium"
          >
            Pricing
          </a>
          <hr className="border-slate-100" />
          <button className="w-full text-left text-slate-900 font-medium">
            Log in
          </button>
          <button className="w-full bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium">
            Start Free Trial
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;