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
      className={`flex flex-col h-full w-64 shrink-0 relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(160deg, #0f2444 0%, #0B1120 45%, #07101e 100%)",
      }}
    >
      {/* Ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#1279BD]/25 via-[#089FFF]/8 to-transparent" />

      {/* Brand yellow radial — mid-left */}
      <div
        className="pointer-events-none absolute -left-12 top-[38%] w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,223,24,0.18) 0%, rgba(255,223,24,0.06) 45%, transparent 70%)" }}
      />

      {/* Sky blue radial — bottom-right */}
      <div
        className="pointer-events-none absolute -right-10 -bottom-6 w-56 h-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(8,159,255,0.22) 0%, rgba(8,159,255,0.08) 45%, transparent 70%)" }}
      />

      {/* Bottom sky gradient sweep */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#089FFF]/[0.12] to-transparent" />

      {/* Logo slot */}
      {logo && (
        <div className="relative px-5 py-5 border-b border-white/[0.06]">
          {logo}
        </div>
      )}

      {/* Nav sections */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p className="px-3 mb-3 text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
                {section.title}
              </p>
            )}
            <ul className="space-y-1.5">
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
                        "relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "text-white font-semibold"
                          : "text-slate-400 hover:text-slate-100",
                      ].join(" ")}
                    >
                      {/* Active background pill */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue/30 via-brand-sky/15 to-transparent border border-brand-blue/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
                      )}
                      {/* Hover background */}
                      {!isActive && (
                        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-150" />
                      )}

                      {/* Left accent bar */}
                      <span
                        className={`relative w-0.5 h-4 rounded-full shrink-0 transition-all duration-200 ${
                          isActive
                            ? "bg-brand-yellow shadow-[0_0_8px_rgba(255,223,24,0.6)]"
                            : "bg-transparent group-hover:bg-white/20"
                        }`}
                      />

                      {/* Icon */}
                      <span
                        className={`relative shrink-0 transition-colors duration-200 ${
                          isActive ? "text-brand-sky" : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Label */}
                      <span className="relative flex-1 truncate">{item.label}</span>

                      {/* Badge */}
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="relative shrink-0 min-w-5 h-5 px-1.5 rounded-full bg-brand-yellow text-brand-ink text-[10px] font-black flex items-center justify-center shadow-[0_0_10px_rgba(255,223,24,0.3)]">
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
        <div className="relative px-3 py-4 border-t border-white/[0.06]">
          {footer}
        </div>
      )}
    </aside>
  );
}
