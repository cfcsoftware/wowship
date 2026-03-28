"use client";

import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Key, 
  Copy, 
  RefreshCw, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Lock,
  Globe,
  Zap,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('credentials');
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState('javascript');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    javascript: `fetch('https://api.platform.com/v1/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+1234567890',
    body: 'Hello from the API!'
  })
});`,
    python: `import requests

url = "https://api.platform.com/v1/messages"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
data = {"to": "+1234567890", "body": "Hello from API!"}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    curl: `curl -X POST https://api.platform.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+1234567890", "body": "Hello!"}'`
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
        activeTab === id 
        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-indigo-600 rounded-full"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600">Developer Portal</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">API Integration</h1>
              <p className="text-slate-500 font-medium">Connect your applications via our robust RESTful API infrastructure.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                <BookOpen size={16} /> Documentation
              </button>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
                Create New Key
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border border-slate-200 rounded-t-[2rem] flex overflow-hidden shadow-sm">
          <TabButton id="credentials" label="API Keys" icon={Key} />
          <TabButton id="webhooks" label="Webhooks" icon={Zap} />
          <TabButton id="explorer" label="API Explorer" icon={Terminal} />
        </div>

        {/* Main Content Area */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-[2rem] p-8 md:p-12 shadow-sm mb-10">
          
          {activeTab === 'credentials' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Credentials Form */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Authentication Credentials</h3>
                    <p className="text-slate-500 text-sm">Use these keys to authenticate requests from your server. Never share these in client-side code.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">App ID</label>
                      <div className="flex gap-3">
                        <input readOnly value="app_live_82nKj92mZp" className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm text-slate-600 outline-none" />
                        <button onClick={() => copyToClipboard('app_live_82nKj92mZp')} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                          <Copy size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <input 
                            type={showSecret ? "text" : "password"} 
                            readOnly 
                            value="sk_live_51MvY2B9E2LpQxR7y8Wz0" 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm text-slate-600 outline-none" 
                          />
                          <button onClick={() => setShowSecret(!showSecret)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <button onClick={() => copyToClipboard('sk_live_51MvY2B9E2LpQxR7y8Wz0')} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                          {copied ? <Check className="text-emerald-500" size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-3xl text-white">
                      <ShieldCheck className="text-indigo-400 shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold mb-1">Security Best Practices</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Rotate your API keys every 90 days. If you suspect a key has been compromised, revoke it immediately and generate a new one.</p>
                        <button className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Rotate Secret Key Now</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Snippet */}
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Start</span>
                      <div className="flex gap-2">
                        {['javascript', 'python', 'curl'].map(lang => (
                          <button 
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${selectedLang === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-200'}`}
                          >
                            {lang === 'javascript' ? 'JS' : lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <pre className="text-[12px] leading-relaxed font-mono text-slate-600 overflow-x-auto whitespace-pre-wrap">
                      {codeExamples[selectedLang]}
                    </pre>
                  </div>
                  
                  <div className="p-6 border border-slate-100 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <Code2 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">API Reference</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black">Full SDK Guide</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-600 transition-all" size={20} />
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="text-xl font-bold mb-2">Webhook Endpoints</h3>
                  <p className="text-slate-500 text-sm">Receive real-time notifications about delivery status, inbound messages, and account events.</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                  + Add Endpoint
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-indigo-100 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <Globe size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-900">Production Live Hook</h4>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded">Active</span>
                      </div>
                      <p className="text-sm font-mono text-slate-400">https://api.yourdomain.com/webhooks/sms</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl transition-colors"><RefreshCw size={18} /></button>
                    <button className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl transition-colors"><Settings size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'explorer' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Try it Out</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg">POST</span>
                      <span className="font-mono text-sm text-slate-500">/v1/messages/send</span>
                    </div>
                    <div className="space-y-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient Number</label>
                        <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Body</label>
                        <textarea placeholder="Hello World..." className="w-full h-32 px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-all resize-none"></textarea>
                      </div>
                      <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Run Request</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Response</h3>
                  <div className="bg-slate-900 rounded-[2rem] p-8 font-mono text-sm min-h-[400px]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
                    </div>
                    <p className="text-emerald-400">HTTP/1.1 200 OK</p>
                    <p className="text-slate-500">Content-Type: application/json</p>
                    <pre className="mt-6 text-indigo-300 whitespace-pre-wrap">
{`{
  "status": "success",
  "message_id": "msg_01GK2X7M",
  "data": {
    "delivered": true,
    "timestamp": "2024-05-24T12:00:00Z",
    "cost": "0.015",
    "currency": "USD"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] group hover:border-indigo-600 transition-all cursor-pointer">
            <Server className="text-indigo-600 mb-4" size={24} />
            <h4 className="font-bold mb-1">Status Page</h4>
            <p className="text-xs text-slate-500 mb-4">Check current API availability and latency uptime.</p>
            <span className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-2">Visit Status <ExternalLink size={12}/></span>
          </div>
          
          <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] group hover:border-indigo-600 transition-all cursor-pointer">
            <Lock className="text-indigo-600 mb-4" size={24} />
            <h4 className="font-bold mb-1">IP Whitelist</h4>
            <p className="text-xs text-slate-500 mb-4">Restrict API access to specific server IP addresses.</p>
            <span className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-2">Manage IPs <ExternalLink size={12}/></span>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col justify-center">
            <h4 className="font-bold mb-2">Need a higher rate limit?</h4>
            <p className="text-indigo-100 text-xs mb-4">Our Enterprise tier offers up to 5,000 requests per second.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Contact Sales</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;