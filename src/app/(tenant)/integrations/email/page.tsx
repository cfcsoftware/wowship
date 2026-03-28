"use client";

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Inbox, 
  Settings2, 
  ShieldCheck, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ChevronRight,
  Server,
  Lock,
  History,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Hash,
  Globe
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('outgoing'); // Default to outgoing as requested
  const [showPassword, setShowPassword] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
    }, 2000);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setTestResult(null);
      }}
      className={`flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
        activeTab === id 
        ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Email Configuration</h1>
              <p className="text-slate-500 font-medium">Manage how your platform communicates with users and servers.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                View Logs
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border border-slate-200 rounded-t-[2rem] flex overflow-hidden shadow-sm">
          <TabButton id="compose" label="Compose" icon={FileText} />
          <TabButton id="incoming" label="Incoming" icon={Inbox} />
          <TabButton id="outgoing" label="Outgoing" icon={Send} />
        </div>

        {/* Main Content Area */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-[2rem] p-8 md:p-12 shadow-sm mb-10">
          
          {activeTab === 'compose' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold mb-2">Composition Defaults</h3>
                <p className="text-slate-500 text-sm">Set default behavior for outgoing emails and system templates.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Default "From" Name</label>
                  <input type="text" defaultValue="Support Team" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Reply-To Address</label>
                  <input type="email" defaultValue="hello@company.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Signature (HTML Supported)</label>
                  <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all resize-none" defaultValue="Regards, <br/><b>The Engineering Team</b>"></textarea>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm text-amber-800 font-medium">Changing the default "From" name might affect how some email clients flag your messages as spam. Ensure it matches your verified domain.</p>
              </div>
            </div>
          )}

          {activeTab === 'incoming' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="flex justify-between items-start">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-bold mb-2">Incoming Server (IMAP/POP3)</h3>
                  <p className="text-slate-500 text-sm">Configure how the system fetches emails for ticket processing or sync.</p>
                </div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Active Connection
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">IMAP Server Host</label>
                  <div className="relative">
                    <Server className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="imap.gmail.com" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Port</label>
                  <input type="text" defaultValue="993" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Username / Email</label>
                  <input type="text" defaultValue="bot@company.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} defaultValue="secret_imap_token" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all pr-12" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Encryption</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer">
                    <option>SSL / TLS</option>
                    <option>STARTTLS</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outgoing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold mb-2">SMTP Configuration (Outgoing)</h3>
                <p className="text-slate-500 text-sm">Configure your SMTP relay to ensure high deliverability for all system alerts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-3 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">SMTP Host</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="smtp.sendgrid.net" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Port</label>
                  <input type="text" defaultValue="587" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">SMTP Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="apikey" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">SMTP Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type={showPassword ? "text" : "password"} defaultValue="SG.very_long_api_key_string" className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                      isTesting ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isTesting ? (
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <History size={16} />
                    )}
                    {isTesting ? 'Testing Connection...' : 'Test SMTP Connection'}
                  </button>
                  
                  {testResult === 'success' && (
                    <div className="flex items-center gap-2 text-emerald-600 animate-in fade-in slide-in-from-left-2">
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-bold">Connection Successful</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-slate-400">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-bold uppercase tracking-widest">TLS 1.3 Encryption Active</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Server Whitelisting', desc: 'Ensure our IP 192.168.1.1 is whitelisted on your firewall.', icon: ShieldCheck },
            { title: 'Daily Quota', desc: 'Your current SMTP provider limits you to 50k emails/day.', icon: Hash },
            { title: 'Advanced Config', desc: 'Need custom headers? Visit our developer documentation.', icon: Settings2 },
          ].map((tip, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl flex items-start gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <tip.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-1">{tip.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;