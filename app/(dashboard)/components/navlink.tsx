"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Scale, FileText, LucideIcon, Search } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  home: LayoutDashboard,
  cases: Scale,
  registry: Search,
};

interface NavLinkProps {
  href: string;
  label: string;
  iconName: string; 
}

export default function NavLink({ href, label, iconName }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  // Get the icon component from our lookup table
  const Icon = ICONS[iconName] || FileText; 

  return (
    <Link
      href={href}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
          : 'text-slate-500 hover:bg-blue-50 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-900'}`} />
        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </div>
      {isActive && <div className="w-1 h-1 rounded-full bg-blue-300" />}
    </Link>
  );
}