"use client";

import React, { useState, useEffect, useRef } from "react";
import SaasNavbar from '@/components/layout/SaasNavbar';
import SaasFooter from '@/components/layout/SaasFooter';
import SaasSidebar from '@/components/layout/SaasSidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  DollarSign,
  TrendingUp,
  Layers,
  ClipboardList,
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Animated stats for SaaS: Users, Revenue, Subscriptions
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetValues = [1200, 45000, 320]; // Example: Users, Revenue, Subscriptions
  const animationStarted = useRef(false);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    let frame: number;
    const steps = 60;
    const stepDuration = 1500 / steps;
    let currentStep = 0;

    function animate() {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues(
        targetValues.map((target) => Math.floor(target * easeOutQuart))
      );

      if (currentStep < steps) {
        frame = window.setTimeout(animate, stepDuration);
      } else {
        setAnimatedValues(targetValues);
      }
    }

    animate();
    return () => clearTimeout(frame);
  }, [targetValues]);

  const stats = [
    { label: "Active Users", value: animatedValues[0], icon: Users, color: "orange", change: "+8%" },
    { label: "Monthly Revenue", value: `$${animatedValues[1].toLocaleString()}`, icon: DollarSign, color: "emerald", change: "+3%" },
    { label: "Subscriptions", value: animatedValues[2], icon: Layers, color: "amber", change: "+1%" },
  ];

  // Example monthly revenue data for bar chart
  const monthlyRevenue = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 35000 },
    { month: "Mar", revenue: 40000 },
    { month: "Apr", revenue: 42000 },
    { month: "May", revenue: 45000 },
    { month: "Jun", revenue: 47000 },
  ];

  // Example subscription plan distribution for pie chart
  const subscriptionPlans = [
    { name: "Basic", value: 600, color: "#3b82f6" },
    { name: "Pro", value: 400, color: "#06b6d4" },
    { name: "Enterprise", value: 150, color: "#8b5cf6" },
    { name: "Trial", value: 50, color: "#10b981" },
    { name: "Other", value: 20, color: "#f59e0b" },
  ];

  // Example recent signups/subscriptions table
  const recentSignups = [
    { id: 1, user: "alice@example.com", plan: "Pro", date: "2024-08-11", status: "Active" },
    { id: 2, user: "bob@example.com", plan: "Basic", date: "2024-08-11", status: "Trial" },
    { id: 3, user: "carol@example.com", plan: "Enterprise", date: "2024-08-10", status: "Active" },
    { id: 4, user: "dave@example.com", plan: "Pro", date: "2024-08-10", status: "Active" },
    { id: 5, user: "eve@example.com", plan: "Basic", date: "2024-08-09", status: "Cancelled" },
  ];

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-black";
      case "Trial": return "bg-orange-100 text-black";
      case "Cancelled": return "bg-red-100 text-black";
      default: return "bg-gray-100 text-black";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "orange": return "from-orange-500 to-orange-400";
      case "emerald": return "from-emerald-500 to-emerald-400";
      case "amber": return "from-amber-500 to-amber-400";
      default: return "from-orange-500 to-orange-400";
    }
  };

  const getStatChangeColor = (change: string) => {
    if (change.startsWith('+')) return "text-green-600";
    if (change.startsWith('-')) return "text-red-600";
    return "text-slate-600";
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SaasSidebar />
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <SaasNavbar />
        <main className="flex-1 p-6 md:p-10 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-black">SaaS Dashboard</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black">{stat.label}</p>
                      <p className="text-3xl font-medium text-black">{stat.value}</p>
                      <p className={`text-xs ${getStatChangeColor(stat.change)}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart: Monthly Revenue */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2 text-black">
                Monthly Revenue <TrendingUp className="w-5 h-5 text-black" />
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#000000" tick={{ fill: "#000" }} />
                  <YAxis stroke="#000000" tick={{ fill: "#000" }} />
                  <Tooltip
                    contentStyle={{ color: "#000", background: "#fff", border: "1px solid #e2e8f0" }}
                    labelStyle={{ color: "#000" }}
                    itemStyle={{ color: "#000" }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart: Subscription Plans */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2 text-black">
                Subscription Plan Distribution <ClipboardList className="w-5 h-5 text-black" />
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={subscriptionPlans} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {subscriptionPlans.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ color: "#000", background: "#fff", border: "1px solid #e2e8f0" }}
                    labelStyle={{ color: "#000" }}
                    itemStyle={{ color: "#000" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {subscriptionPlans.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-black">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Signups & Subscriptions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-medium text-black">Recent Signups & Subscriptions</h3>
              <button className="text-black text-sm font-semibold">View All</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-left text-black">User</th>
                  <th className="py-3 text-left text-black">Plan</th>
                  <th className="py-3 text-left text-black">Date</th>
                  <th className="py-3 text-left text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="py-3 text-black">{row.user}</td>
                    <td className="text-black">{row.plan}</td>
                    <td className="text-black">{row.date}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <SaasFooter />
      </div>
    </div>
  );
};

export default Dashboard;
