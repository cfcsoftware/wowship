'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import HomeLayout from '@/components/layout/homelayout';
import Cookies from 'js-cookie';
import { 
  Scale, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Loader2,
  Gavel,
  Briefcase,
  AlertCircle
} from 'lucide-react';

// --- Logic (Unchanged) ---

// Helper function to fetch domain using Hospital ID (Mapped to Firm ID in UI)
async function fetchDomainByHospitalId(hospitalId: string): Promise<{ domain: string; firm_name: string }> {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL || "https://logicore.in/server";
  if (!base_url) {
    throw new Error("Base URL is not defined in environment variables.");
  }
  
  const res = await fetch(`${base_url}/get-domain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firm_id: hospitalId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Could not retrieve domain for your Firm ID. Please check your ID or contact support.");
  }

  const data = await res.json();
  if (!data.domain) {
      throw new Error("Domain not found for the provided Firm ID.");
  }
  return data;
}

export default function TenantLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [domainLoading, setDomainLoading] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hospitalId = formData.get("firm_id") as string;
    
    setLoginLoading(true);
    setLoginError(null);
    setDomainError(null);
    setDomainLoading(true);

    try {
      const { domain, firm_name } = await fetchDomainByHospitalId(hospitalId);

      const BaseUrl = `${domain}/server`;
      localStorage.setItem("dynamicBaseUrl", BaseUrl);
      localStorage.setItem("companyName", firm_name);

      const loginResponse = await fetch(`${BaseUrl}/login?api=true`, {
        method: "POST",
        body: formData,
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || "Login failed. Please check your credentials.");
      }

      const loginData = await loginResponse.json();

      Cookies.set("authToken", loginData.access_token.access, { expires: 1 }); 
      Cookies.set("refreshToken", loginData.access_token.refresh, { expires: 7 });
      
      localStorage.setItem("authToken", loginData.access_token.access);
      localStorage.setItem("refreshToken", loginData.access_token.refresh);
      localStorage.setItem("userEmail", loginData.email);
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("tenantId", loginData.tenant_id);
      localStorage.setItem("role", loginData.role_name);
      localStorage.setItem("user_permissions", JSON.stringify(loginData.user_permissions));
      localStorage.setItem("is_first_login", loginData.is_first_login);

      const isFirstLogin = localStorage.getItem("is_first_login");
      if (isFirstLogin === "true") {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      if (message.toLowerCase().includes("domain") || message.toLowerCase().includes("hospital id") || message.toLowerCase().includes("firm id")) {
        setDomainError(message);
      } else {
        setLoginError(message);
      }
    } finally {
      setLoginLoading(false);
      setDomainLoading(false);
    }
  };

  return (
    <HomeLayout>
    <div className="min-h-screen flex bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Left Section: Immersive Brand Experience */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#F2F2F7]">
        {/* Animated Background Elements matching Homepage Hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-orange-50/50 z-0"></div>
        <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-orange-200/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-orange-200/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center p-12">
           
           {/* Animated Legal Symbol Composition */}
           <div className="relative mb-16 scale-90">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-orange-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
              
              <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.08)] ring-1 ring-white/50">
                  <div className="bg-gradient-to-br from-orange-600 to-orange-600 p-8 rounded-[2rem] shadow-2xl shadow-orange-500/30 flex items-center justify-center">
                    <Scale size={80} className="text-white drop-shadow-md" strokeWidth={1.5} />
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-white/50 animate-[bounce_3s_infinite] ring-1 ring-black/5">
                    <Gavel size={32} className="text-orange-600" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-white/50 animate-[bounce_4s_infinite] ring-1 ring-black/5">
                    <ShieldCheck size={32} className="text-orange-600" />
                  </div>
              </div>
           </div>

           <div className="text-center max-w-lg">
              <h1 className="text-4xl font-bold text-[#1C1C1E] mb-6 tracking-tight">
                Every Lawyer&apos;s <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-600">One-Stop Solution.</span>
              </h1>
              <p className="text-lg text-[#8E8E93] leading-relaxed">
                Streamline your entire practice. Case tracking, document automation, and billing combined into the ultimate operating system.
              </p>
           </div>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-[420px]">
          
          {/* Mobile Branding (Only visible on small screens) */}
          <div className="lg:hidden flex flex-col items-center mb-10">
             <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 mb-4">
                <Scale size={24} strokeWidth={3} />
             </div>
             <h2 className="text-2xl font-bold text-[#1C1C1E]">Logicore-ERP</h2>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1C1C1E] tracking-tight mb-3">Welcome Back</h2>
            <p className="text-[#8E8E93] text-base">Please enter your firm credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="firm_id" className="block text-sm font-semibold text-[#1C1C1E]">
                Firm ID
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E8E93] group-focus-within:text-orange-600 transition-colors">
                  <Briefcase size={18} />
                </div>
                <input
                  id="firm_id"
                  name="firm_id"
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-[#1C1C1E] placeholder-[#8E8E93] transition-all font-medium text-base"
                  placeholder="e.g. FIRM-1024"
                  autoComplete="organization"
                  required
                  style={{ textTransform: 'uppercase' }}
                  onInput={e => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.toUpperCase();
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-[#1C1C1E]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-[#1C1C1E] placeholder-[#8E8E93] transition-all font-medium text-base"
                placeholder="name@firm.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-semibold text-[#1C1C1E]">
                    Password
                  </label>
                  <a href="#" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">Forgot Password?</a>
              </div>
              
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-[#1C1C1E] placeholder-[#8E8E93] pr-12 transition-all font-medium text-base"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1C1C1E] focus:outline-none transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {(loginError || domainError) && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                 <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                 <p className="text-sm text-red-600 font-medium leading-snug">{loginError || domainError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-500 hover:to-orange-500 text-white rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-bold text-base flex items-center justify-center gap-2 transform active:scale-[0.98]"
              disabled={loginLoading || domainLoading}
            >
              {(loginLoading || domainLoading) ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* <div className="mt-8 pt-8 border-t border-[#E5E5EA] text-center text-sm text-[#8E8E93]">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-orange-600 hover:text-orange-700 font-bold hover:underline transition-all">
              Create a Firm Account
            </a>
          </div> */}

          <div className="mt-8 flex justify-center gap-6 text-xs text-[#8E8E93]">
             <a href="#" className="hover:text-[#1C1C1E] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#1C1C1E] transition-colors">Terms of Service</a>
             <a href="/contactus" className="hover:text-[#1C1C1E] transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
}