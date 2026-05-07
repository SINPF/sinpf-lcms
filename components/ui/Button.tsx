import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white border-transparent hover:bg-brand-blue/90 shadow-sm shadow-brand-blue/20",
  secondary:
    "bg-brand-yellow text-brand-ink border-transparent hover:bg-brand-yellow/90 shadow-sm shadow-brand-yellow/20",
  outline:
    "bg-transparent text-foreground border-border hover:bg-muted hover:border-foreground/20",
  ghost:
    "bg-transparent text-foreground border-transparent hover:bg-muted",
  danger:
    "bg-red-600 text-white border-transparent hover:bg-red-700 shadow-sm shadow-red-500/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-semibold rounded-lg border",
        "transition-all duration-150 active:scale-95 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}
