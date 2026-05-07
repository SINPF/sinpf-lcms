export type BadgeStatus =
  | "filed" | "active" | "pending" | "hearing" | "closed" | "appeal"
  | "referred" | "in_progress" | "resolved";

const config: Record<
  BadgeStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  filed:       { label: "Filed",       bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500" },
  active:      { label: "Active",      bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending:     { label: "Pending",     bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500" },
  hearing:     { label: "Hearing",     bg: "bg-orange-50",  text: "text-orange-700",  dot: "bg-orange-500" },
  closed:      { label: "Closed",      bg: "bg-slate-100",  text: "text-slate-500",   dot: "bg-slate-400" },
  appeal:      { label: "Appeal",      bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-500" },
  referred:    { label: "Referred",    bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500" },
  in_progress: { label: "In Progress", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  resolved:    { label: "Resolved",    bg: "bg-teal-50",    text: "text-teal-700",    dot: "bg-teal-500" },
};

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

export function Badge({ status, className = "" }: BadgeProps) {
  const { label, bg, text, dot } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-black/5 ${bg} ${text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
