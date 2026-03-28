"use client";

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  Fingerprint,
  KeyRound,
  History,
  ArrowLeft,
  ShieldAlert
} from 'lucide-react';

const App = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [strength, setStrength] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Requirement checks
  const requirements = [
    { label: "At least 12 characters", met: newPassword.length >= 12 },
    { label: "One uppercase & one number", met: /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) },
    { label: "One special character (@$!%*?)", met: /[@$!%*?&]/.test(newPassword) },
    { label: "Passwords match", met: newPassword === confirmPassword && newPassword !== '' }
  ];

  useEffect(() => {
    let s = 0;
    if (newPassword.length > 8) s += 25;
    if (/[A-Z]/.test(newPassword)) s += 25;
    if (/[0-9]/.test(newPassword)) s += 25;
    if (/[@$!%*?&]/.test(newPassword)) s += 25;
    setStrength(s);
  }, [newPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setSuccess(true);
    }, 1500);
  };

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-rose-500';
    if (strength <= 50) return 'bg-amber-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  if (success) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FDFDFD] p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Security Updated</h2>
          <p className="text-slate-500 font-medium">Your password has been changed successfully. Your active sessions on other devices have been kept active.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-slate-800 font-sans overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
             <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                <ArrowLeft size={20} />
             </button>
             <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Access Control</h1>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Update Security Credentials</p>
             </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
             <ShieldCheck size={16} className="text-emerald-500" />
             <span className="text-xs font-black text-slate-600">2FA: Active</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Side */}
            <div className="lg:col-span-7 space-y-8">
               <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">Change Password</h2>
                  <p className="text-sm font-medium text-slate-500 italic">We recommend a unique password that you don't use elsewhere.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Current Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                        placeholder="••••••••••••"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <KeyRound size={18} />
                      </div>
                      <input 
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                        placeholder="Min. 12 characters"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {/* Strength Meter */}
                    <div className="pt-2 flex gap-1.5">
                       {[25, 50, 75, 100].map((step) => (
                         <div 
                           key={step} 
                           className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength >= step ? getStrengthColor() : 'bg-slate-100'}`} 
                         />
                       ))}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 text-right uppercase tracking-tighter">
                       Password Strength: <span className={strength === 100 ? 'text-emerald-500' : ''}>{strength}%</span>
                    </p>
                  </div>

                  {/* Confirm New */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Confirm New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <ShieldCheck size={18} />
                      </div>
                      <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                        placeholder="Repeat new password"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isUpdating || strength < 75 || newPassword !== confirmPassword}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-indigo-600 disabled:bg-slate-200 disabled:shadow-none transition-all flex items-center justify-center gap-3 group"
                  >
                    {isUpdating ? <RefreshCw size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                    {isUpdating ? 'Verifying...' : 'Update Password'}
                    {!isUpdating && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
               </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="lg:col-span-5 space-y-6">
               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                      <AlertCircle size={20} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900">Requirements</h3>
                  </div>
                  
                  <div className="space-y-4">
                     {requirements.map((req, idx) => (
                       <div key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${req.met ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-300'}`}>
                             {req.met ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                          </div>
                          <span className={`text-xs font-bold transition-colors ${req.met ? 'text-slate-900' : 'text-slate-400'}`}>
                            {req.label}
                          </span>
                       </div>
                     ))}
                  </div>

                  <div className="mt-8 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                     <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <Fingerprint size={16} />
                        <span className="text-[11px] font-black uppercase">Pro Tip</span>
                     </div>
                     <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                        Use a pass-phrase of 4 random words. It's harder for computers to crack but easier for you to remember.
                     </p>
                  </div>
               </div>

               <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8">
                  <div className="flex items-center gap-3 mb-4 text-rose-600">
                    <ShieldAlert size={20} />
                    <h3 className="text-sm font-black uppercase tracking-wider">Security Warning</h3>
                  </div>
                  <p className="text-xs font-bold text-rose-700/70 leading-relaxed mb-4">
                    Changing your password will not log you out of your current device, but you may be asked to re-authenticate on your mobile apps within 24 hours.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-rose-600 bg-white/50 w-fit px-3 py-1 rounded-full border border-rose-200/50">
                    <History size={12} /> LAST CHANGED: 4 MONTHS AGO
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
};

export default App;