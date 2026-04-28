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
  
  const Icon = ICONS[iconName] || FileText; 

  return (
    <Link
      href={href}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group border border-transparent ${
        isActive 
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
          : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon 
          className={`w-4 h-4 transition-colors duration-300 ${
            isActive 
              ? 'text-primary-foreground' 
              : 'text-muted-foreground group-hover:text-primary'
          }`} 
        />
        <span className={`text-sm font-bold tracking-tight font-heading ${
          isActive ? 'text-primary-foreground' : ''
        }`}>
          {label}
        </span>
      </div>

      {/* Decorative Brand indicator: Uses Financial Gold (secondary) for a badass contrast touch */}
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,222,17,0.6)] animate-pulse" />
      )}
    </Link>
  );
}