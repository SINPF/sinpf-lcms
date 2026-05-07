import { IconFlag3Filled } from "@tabler/icons-react";

export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

const config: Record<
  Priority,
  { bg: string; text: string; icon: string }
> = {
  CRITICAL: { bg: "bg-red-50",    text: "text-red-700",    icon: "text-red-500" },
  HIGH:     { bg: "bg-orange-50", text: "text-orange-700", icon: "text-orange-500" },
  MEDIUM:   { bg: "bg-amber-50",  text: "text-amber-700",  icon: "text-amber-500" },
  LOW:      { bg: "bg-slate-100", text: "text-slate-500",  icon: "text-slate-400" },
};

interface PriorityTagProps {
  priority: Priority;
  className?: string;
}

export function PriorityTag({ priority, className = "" }: PriorityTagProps) {
  const { bg, text, icon } = config[priority];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest border border-black/5 ${bg} ${text} ${className}`}
    >
      <IconFlag3Filled className={`w-2.5 h-2.5 ${icon}`} />
      {priority}
    </span>
  );
}
