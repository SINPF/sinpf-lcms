import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({
  children,
  header,
  footer,
  className = "",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`bg-background border border-border rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
      {header && (
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          {header}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-border bg-muted/20">
          {footer}
        </div>
      )}
    </div>
  );
}
