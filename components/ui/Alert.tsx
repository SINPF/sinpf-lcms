import { type ReactNode } from "react";
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";

type AlertVariant = "info" | "warning" | "success" | "danger";

const config: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: typeof IconInfoCircle }
> = {
  info:    { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-800",   icon: IconInfoCircle },
  warning: { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-800",  icon: IconAlertTriangle },
  success: { bg: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-800",icon: IconCircleCheck },
  danger:  { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    icon: IconCircleX },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = "info", title, children, className = "" }: AlertProps) {
  const { bg, border, text, icon: Icon } = config[variant];
  return (
    <div
      role="alert"
      className={`flex gap-3 p-4 rounded-xl border ${bg} ${border} ${text} ${className}`}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm mb-0.5">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
