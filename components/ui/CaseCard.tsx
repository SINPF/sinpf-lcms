import { type ReactNode } from "react";
import {
  IconBuilding,
  IconCalendar,
  IconUser,
  IconCurrencyDollar,
  IconHash,
} from "@tabler/icons-react";
import { Badge, type BadgeStatus } from "./Badge";
import { PriorityTag, type Priority } from "./PriorityTag";

interface MetaItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function MetaItem({ icon, label, value }: MetaItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <span className="opacity-60">{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground truncate">{value}</span>
    </div>
  );
}

interface CaseCardProps {
  caseId: string;
  title: string;
  employer: string;
  employerCode: string;
  status: BadgeStatus;
  priority: Priority;
  amount: string;
  referralDate: string;
  assignedTo?: string;
  caseTypes?: string[];
  onClick?: () => void;
  className?: string;
}

export function CaseCard({
  caseId,
  title,
  employer,
  employerCode,
  status,
  priority,
  amount,
  referralDate,
  assignedTo,
  caseTypes = [],
  onClick,
  className = "",
}: CaseCardProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={[
        "w-full text-left bg-background border border-border rounded-2xl overflow-hidden shadow-sm",
        "transition-all duration-150",
        onClick
          ? "cursor-pointer hover:shadow-md hover:border-brand-blue/30 active:scale-[0.99]"
          : "",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">
              #{caseId}
            </span>
            {caseTypes.length > 0 && (
              <span className="text-muted-foreground/40">·</span>
            )}
            {caseTypes.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-sm font-bold text-foreground leading-snug truncate">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PriorityTag priority={priority} />
          <Badge status={status} />
        </div>
      </div>

      {/* Metadata grid */}
      <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
        <MetaItem
          icon={<IconBuilding className="w-3 h-3" />}
          label="Employer"
          value={`${employer} (${employerCode})`}
        />
        <MetaItem
          icon={<IconCurrencyDollar className="w-3 h-3" />}
          label="Claim Amount"
          value={amount}
        />
        <MetaItem
          icon={<IconCalendar className="w-3 h-3" />}
          label="Referral Date"
          value={referralDate}
        />
        <MetaItem
          icon={<IconUser className="w-3 h-3" />}
          label="Assigned To"
          value={assignedTo ?? "Unassigned"}
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center gap-2">
        <IconHash className="w-3 h-3 text-muted-foreground/40" />
        <span className="text-[11px] font-mono text-muted-foreground/60">
          {caseId}
        </span>
        <span className="flex-1" />
        {onClick && (
          <span className="text-[11px] font-semibold text-brand-blue hover:underline">
            View details →
          </span>
        )}
      </div>
    </Tag>
  );
}
