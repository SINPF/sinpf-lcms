"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  sections: NavSection[];
  logo?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({ sections, logo, footer, className = "" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col h-full w-64 bg-brand-ink text-sidebar-foreground shrink-0 ${className}`}
      style={{ color: "var(--color-sidebar-foreground, #e2e8f0)" }}
    >
      {/* Logo slot */}
      {logo && (
        <div className="px-5 py-5 border-b" style={{ borderColor: "#1e2d3d" }}>
          {logo}
        </div>
      )}

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p
                className="px-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40"
              >
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                        isActive
                          ? "bg-white/10 text-brand-yellow font-semibold"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
                      ].join(" ")}
                    >
                      {/* Active indicator */}
                      <span
                        className={`w-0.5 h-4 rounded-full transition-all ${
                          isActive ? "bg-brand-yellow" : "bg-transparent group-hover:bg-white/20"
                        }`}
                      />
                      <span className="shrink-0">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="shrink-0 min-w-5 h-5 px-1.5 rounded-full bg-brand-yellow text-brand-ink text-[10px] font-black flex items-center justify-center">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div className="px-3 py-4 border-t" style={{ borderColor: "#1e2d3d" }}>
          {footer}
        </div>
      )}
    </aside>
  );
}
