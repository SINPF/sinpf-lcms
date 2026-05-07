"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutDashboard,
  IconBriefcase,
  IconLogout,
} from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/", icon: IconLayoutDashboard },
      { label: "Cases",     href: "/cases", icon: IconBriefcase },
    ],
  },
];

function NavItem({
  label,
  href,
  icon: Icon,
  badge,
}: {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
        isActive
          ? "bg-white/10 text-brand-yellow font-semibold"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`w-0.5 h-4 rounded-full shrink-0 transition-all ${
          isActive ? "bg-brand-yellow" : "bg-transparent group-hover:bg-white/20"
        }`}
      />
      <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="min-w-5 h-5 px-1.5 rounded-full bg-brand-yellow text-brand-ink text-[10px] font-black flex items-center justify-center">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/login") },
    });
  };

  return (
    <aside className="flex flex-col w-64 bg-brand-ink h-screen sticky top-0 shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Image src="/sinpf-logo.png" alt="SINPF" width={36} height={36} className="rounded-xl" />
          <div>
            <p className="text-white font-bold text-sm tracking-tight leading-tight">LCMS</p>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] leading-tight mt-0.5">
              Legal Department
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_SECTIONS.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="px-2 mb-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavItem {...item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all group"
        >
          <span className="w-0.5 h-4 rounded-full bg-transparent shrink-0" />
          <IconLogout className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
