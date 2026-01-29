"use client";

import React from 'react';
import { 
  Gavel, 
  FileText, 
  Clock, 
  AlertCircle, 
  Search, 
  Plus, 
  ChevronRight,
  LayoutDashboard,
  Scale,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const stats = [
    { label: "Active Cases", value: "124", icon: Gavel, color: "text-blue-600" },
    { label: "Pending Reviews", value: "12", icon: Clock, color: "text-amber-600" },
    { label: "New Member Claims", value: "45", icon: FileText, color: "text-emerald-600" },
    { label: "Urgent Deadlines", value: "3", icon: AlertCircle, color: "text-rose-600" },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Scale, label: "Litigation", active: false },
    { icon: FileText, label: "Compliance", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#002B5C] text-white flex-col hidden lg:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xs">SINPF</div>
            <span className="font-bold tracking-tight uppercase text-sm">Judiciary</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  item.active ? 'bg-white/10 text-white' : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <Link 
            href={'/login'}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-300 hover:bg-rose-500/10 transition-all text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back, Legal Officer</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002B5C]/5 w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#002B5C] hover:bg-slate-50 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-[#002B5C] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#001f42] transition-all shadow-lg shadow-blue-900/10">
              <Plus className="w-4 h-4" />
              New Case
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-slate-500 text-[13px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Container */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h2 className="font-bold text-slate-900">Recent Litigations</h2>
              <button className="text-xs font-bold text-[#002B5C] uppercase tracking-tighter hover:underline">Full Directory</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Case Identifier</th>
                    <th className="px-6 py-4">Primary Parties</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {[
                    { id: "LC-2026-001", name: "SINPF vs. Honiara Logistics", status: "Active" },
                    { id: "LC-2026-042", name: "Member Claim: J. Doe", status: "Review" },
                    { id: "LC-2025-899", name: "Compliance Audit: Area 4", status: "Closed" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-all cursor-pointer group">
                      <td className="px-6 py-5 font-mono text-[11px] text-slate-400">{row.id}</td>
                      <td className="px-6 py-5 font-semibold text-slate-700">{row.name}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                          row.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                          row.status === 'Review' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
        </div>
      </main>
    </div>
  );
}