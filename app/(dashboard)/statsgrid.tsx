import {
  IconReceiptTax,
  IconCoin,
  IconCash,
  IconScale,
  IconHome,
  IconBuildingStore,
  IconUser,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { db } from "@/db";
import { caseReferrals, caseReferralTypes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, count } from "drizzle-orm";
import type { ReactNode } from "react";

function PrimaryCard({
  label,
  value,
  description,
  icon,
  href,
}: {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      style={{ background: "linear-gradient(135deg, #0f2444 0%, #1a3a6b 50%, #0f2444 100%)" }}
    >
      <div className="relative p-7 flex items-center justify-between gap-6">
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #089fff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, #ffdf18 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10">
          <p className="text-[11px] font-black uppercase tracking-widest text-white/50 mb-2">{description}</p>
          <p className="text-5xl font-black text-white tracking-tight font-mono leading-none mb-3">{value}</p>
          <p className="text-lg font-bold text-white/90">{label}</p>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-4">
          <div className="p-4 rounded-2xl bg-white/10 text-white/80">
            {icon}
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">
            View cases <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({
  label,
  value,
  description,
  icon,
  href,
  accent,
}: {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  href: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-border/60 transition-all duration-200"
    >
      <div className={`h-1 ${accent}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl bg-muted/60`}>
            <span className="text-muted-foreground">{icon}</span>
          </div>
          <IconArrowRight className="w-4 h-4 text-border group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
        </div>
        <p className="text-2xl font-bold text-foreground tracking-tight font-mono leading-none">{value}</p>
        <p className="text-sm font-semibold text-foreground mt-1.5">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">{description}</p>
      </div>
    </Link>
  );
}

export default async function StatsGrid() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  const [typeCounts, assignedResult] = await Promise.all([
    db
      .select({ caseType: caseReferralTypes.caseType, total: count() })
      .from(caseReferralTypes)
      .groupBy(caseReferralTypes.caseType),

    userId
      ? db
          .select({ total: count() })
          .from(caseReferrals)
          .where(eq(caseReferrals.assignedTo, userId))
      : Promise.resolve([{ total: 0 }]),
  ]);

  const byType = Object.fromEntries(typeCounts.map((r) => [r.caseType, r.total]));
  const assignedCount = assignedResult[0]?.total ?? 0;

  return (
    <div className="space-y-5">
      {/* Primary card */}
      <PrimaryCard
        label="Assigned to Me"
        value={String(assignedCount)}
        description="cases assigned to you"
        icon={<IconUser className="w-7 h-7" />}
        href="/cases?mine=1"
      />

      {/* Secondary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SecondaryCard
          label="Contributions"
          value={String(byType["unpaid_contributions"] ?? 0)}
          description="cases"
          icon={<IconReceiptTax className="w-5 h-5" />}
          href="/cases?type=unpaid_contributions"
          accent="bg-brand-blue"
        />
        <SecondaryCard
          label="Surcharges"
          value={String(byType["unpaid_surcharges"] ?? 0)}
          description="cases"
          icon={<IconCoin className="w-5 h-5" />}
          href="/cases?type=unpaid_surcharges"
          accent="bg-brand-sky"
        />
        <SecondaryCard
          label="Wages Record"
          value={String(byType["wages_record"] ?? 0)}
          description="cases"
          icon={<IconCash className="w-5 h-5" />}
          href="/cases?type=wages_record"
          accent="bg-brand-yellow"
        />
      </div>

      {/* Removed cards — kept for future use:
      { label: "Trade Dispute",     icon: <IconScale />,        href: "/cases?type=trade_dispute"     }
      { label: "Land & Titles",     icon: <IconHome />,         href: "/cases?type=land_titles"       }
      { label: "Rental Defaulters", icon: <IconBuildingStore />, href: "/cases?type=rental_defaulters" }
      */}
    </div>
  );
}
