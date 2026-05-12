import {
  IconReceiptTax,
  IconCoin,
  IconCash,
  IconUser,
  IconArrowRight,
  IconSum,
  IconCalendarPlus,
  IconCircleDot,
} from "@tabler/icons-react";
import Link from "next/link";
import { db } from "@/db";
import { caseReferrals, caseReferralTypes, caseActivities, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, count, ne, gte, lt, desc, and, sum } from "drizzle-orm";
import type { ReactNode } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSBD(value: number): string {
  return "SBD " + value.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTimestamp(date: Date): string {
  return (
    date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
    " · " +
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

const ACTIVITY_LABELS: Record<string, string> = {
  stage_changed:          "Stage changed",
  assessment_completed:   "Assessment completed",
  demand_letter_issued:   "Demand letter issued",
  negotiation_entered:    "Negotiation entered",
  negotiation_completed:  "Negotiation completed",
  prosecution_filed:      "Prosecution filed",
  hearing_scheduled:      "Hearing scheduled",
  consent_order_entered:  "Consent order entered",
  default_judgment_filed: "Default judgment filed",
  enforcement_filed:      "Enforcement filed",
  case_discontinued:      "Case discontinued",
  case_closed:            "Case closed",
  document_added:         "Document added",
  note_added:             "Note added",
};

const STAGE_CONFIG = [
  { status: "registered",    label: "Registered",    dot: "bg-blue-500"    },
  { status: "assessment",    label: "Assessment",    dot: "bg-sky-500"     },
  { status: "demand_issued", label: "Demand Issued", dot: "bg-amber-500"   },
  { status: "negotiation",   label: "Negotiation",   dot: "bg-orange-500"  },
  { status: "prosecution",   label: "Prosecution",   dot: "bg-red-500"     },
  { status: "in_progress",   label: "In Progress",   dot: "bg-emerald-500" },
  { status: "resolved",      label: "Resolved",      dot: "bg-teal-500"    },
];

// ─── Card components ──────────────────────────────────────────────────────────

function PrimaryCard({
  label,
  value,
  description,
  icon,
  href,
  linkLabel = "View cases",
}: {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  href: string;
  linkLabel?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      style={{ background: "linear-gradient(135deg, #0f2444 0%, #1a3a6b 50%, #0f2444 100%)" }}
    >
      <div className="relative p-7 flex items-center justify-between gap-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #089fff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, #ffdf18 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 min-w-0">
          <p className="text-[11px] font-black uppercase tracking-widest text-white/50 mb-2">{description}</p>
          <p className="text-4xl font-black text-white tracking-tight font-mono leading-none mb-3 truncate">{value}</p>
          <p className="text-lg font-bold text-white/90">{label}</p>
        </div>
        <div className="relative z-10 flex flex-col items-end gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-white/10 text-white/80">{icon}</div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">
            {linkLabel} <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
  badge,
}: {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  href: string;
  accent: string;
  badge?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group block bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-border/60 transition-all duration-200"
    >
      <div className={`h-1 ${accent}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-muted/60">
            <span className="text-muted-foreground">{icon}</span>
          </div>
          <div className="flex items-center gap-2">
            {badge}
            <IconArrowRight className="w-4 h-4 text-border group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground tracking-tight font-mono leading-none">{value}</p>
        <p className="text-sm font-semibold text-foreground mt-1.5">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">{description}</p>
      </div>
    </Link>
  );
}

function StagePipeline({ byStage }: { byStage: Record<string, number> }) {
  const total = STAGE_CONFIG.reduce((s, c) => s + (byStage[c.status] ?? 0), 0);
  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Cases by Stage</h3>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-7">
        {STAGE_CONFIG.map((s, i) => {
          const n   = byStage[s.status] ?? 0;
          const pct = total > 0 ? Math.round((n / total) * 100) : 0;
          return (
            <Link
              key={s.status}
              href={`/cases?status=${s.status}`}
              className={`group flex flex-col items-center gap-2 py-5 px-3 hover:bg-muted/50 transition-colors text-center ${
                i < STAGE_CONFIG.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <span className="text-3xl font-black font-mono text-foreground leading-none">{n}</span>
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide leading-tight">{s.label}</span>
              <span className="text-[10px] text-muted-foreground/50">{pct}%</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeed({
  activities,
}: {
  activities: { id: string; caseId: string; activityType: string; createdAt: Date; performerName: string | null }[];
}) {
  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Recent Activity</h3>
        <Link href="/cases" className="text-xs font-semibold text-brand-blue hover:underline">View all cases</Link>
      </div>
      {activities.length === 0 ? (
        <p className="px-5 py-10 text-sm text-center text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {activities.map((a) => (
            <Link
              key={a.id}
              href={`/cases/${a.caseId}`}
              className="flex items-start gap-3 px-5 py-4 hover:bg-muted/40 transition-colors group"
            >
              <IconCircleDot className="w-3.5 h-3.5 text-brand-blue/50 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {ACTIVITY_LABELS[a.activityType] ?? a.activityType}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Case {a.caseId.slice(0, 8).toUpperCase()}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconUser className="w-3 h-3 shrink-0" />
                    {a.performerName ?? <span className="italic">Unknown</span>}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60 tabular-nums">
                    {formatTimestamp(a.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default async function StatsGrid() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId  = session?.user.id;

  const now           = new Date();
  const monthStart    = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    typeCounts,
    assignedResult,
    stageCounts,
    claimResult,
    recentActivities,
    thisMonthResult,
    lastMonthResult,
  ] = await Promise.all([
    db.select({ caseType: caseReferralTypes.caseType, total: count() })
      .from(caseReferralTypes)
      .groupBy(caseReferralTypes.caseType),

    userId
      ? db.select({ total: count() }).from(caseReferrals).where(eq(caseReferrals.assignedTo, userId))
      : Promise.resolve([{ total: 0 }]),

    db.select({ status: caseReferrals.status, total: count() })
      .from(caseReferrals)
      .where(ne(caseReferrals.status, "closed"))
      .groupBy(caseReferrals.status),

    db.select({ total: sum(caseReferrals.grandTotalClaim) })
      .from(caseReferrals)
      .where(ne(caseReferrals.status, "closed")),

    db.select({
        id:            caseActivities.id,
        caseId:        caseActivities.caseReferralId,
        activityType:  caseActivities.activityType,
        createdAt:     caseActivities.createdAt,
        performerName: user.name,
      })
      .from(caseActivities)
      .leftJoin(user, eq(caseActivities.performedBy, user.id))
      .orderBy(desc(caseActivities.createdAt))
      .limit(8),

    db.select({ total: count() })
      .from(caseReferrals)
      .where(gte(caseReferrals.createdAt, monthStart)),

    db.select({ total: count() })
      .from(caseReferrals)
      .where(and(
        gte(caseReferrals.createdAt, lastMonthStart),
        lt(caseReferrals.createdAt, monthStart),
      )),
  ]);

  const byType        = Object.fromEntries(typeCounts.map((r) => [r.caseType, r.total]));
  const byStage       = Object.fromEntries(stageCounts.map((r) => [r.status, r.total]));
  const assignedCount = assignedResult[0]?.total ?? 0;
  const totalClaim    = parseFloat(claimResult[0]?.total ?? "0");
  const thisMonth     = thisMonthResult[0]?.total ?? 0;
  const lastMonth     = lastMonthResult[0]?.total ?? 0;
  const monthDiff     = thisMonth - lastMonth;

  const monthBadge = monthDiff !== 0 ? (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
      monthDiff > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
    }`}>
      {monthDiff > 0 ? "+" : ""}{monthDiff} vs last month
    </span>
  ) : null;

  return (
    <div className="space-y-5">
      {/* Primary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PrimaryCard
          label="Assigned to Me"
          value={String(assignedCount)}
          description="cases assigned to you"
          icon={<IconUser className="w-7 h-7" />}
          href="/cases?mine=1"
        />
        <PrimaryCard
          label="Total Outstanding Claim"
          value={formatSBD(totalClaim)}
          description="active cases · combined value"
          icon={<IconSum className="w-7 h-7" />}
          href="/cases"
          linkLabel="View cases"
        />
      </div>

      {/* Secondary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
        <SecondaryCard
          label="New This Month"
          value={String(thisMonth)}
          description="cases opened"
          icon={<IconCalendarPlus className="w-5 h-5" />}
          href="/cases"
          accent="bg-emerald-500"
          badge={monthBadge}
        />
      </div>

      {/* Stage pipeline */}
      <StagePipeline byStage={byStage} />

      {/* Activity feed */}
      <ActivityFeed activities={recentActivities} />
    </div>
  );
}
