import { type ReactNode } from "react";
import { IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  className = "",
}: StatCardProps) {
  const hasDelta = delta !== undefined;
  const isPositive = hasDelta && delta > 0;
  const isNeutral = hasDelta && delta === 0;

  return (
    <div
      className={`bg-background border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        {icon && (
          <span className="p-2 bg-muted rounded-xl text-muted-foreground">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-bold text-foreground font-mono tracking-tight">
          {value}
        </span>

        {hasDelta && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
              isNeutral
                ? "bg-slate-100 text-slate-500"
                : isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {isNeutral ? (
              <IconMinus className="w-3 h-3" />
            ) : isPositive ? (
              <IconTrendingUp className="w-3 h-3" />
            ) : (
              <IconTrendingDown className="w-3 h-3" />
            )}
            {isPositive && "+"}
            {delta}%{deltaLabel && ` ${deltaLabel}`}
          </span>
        )}
      </div>
    </div>
  );
}
