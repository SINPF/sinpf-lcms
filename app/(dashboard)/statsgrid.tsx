import { type ReactNode } from "react";
import {
  IconReceiptTax,
  IconCoin,
  IconCash,
  IconScale,
  IconHome,
  IconBuildingStore,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from "@tabler/icons-react";

type Color = "blue" | "sky" | "yellow" | "emerald" | "violet" | "orange";

const colorConfig: Record<Color, { bar: string; iconBg: string; iconText: string }> = {
  blue:    { bar: "bg-brand-blue",   iconBg: "bg-brand-blue/10",   iconText: "text-brand-blue"   },
  sky:     { bar: "bg-brand-sky",    iconBg: "bg-brand-sky/10",    iconText: "text-brand-sky"    },
  yellow:  { bar: "bg-brand-yellow", iconBg: "bg-amber-50",        iconText: "text-amber-600"    },
  emerald: { bar: "bg-emerald-500",  iconBg: "bg-emerald-50",      iconText: "text-emerald-600"  },
  violet:  { bar: "bg-violet-500",   iconBg: "bg-violet-50",       iconText: "text-violet-600"   },
  orange:  { bar: "bg-orange-500",   iconBg: "bg-orange-50",       iconText: "text-orange-600"   },
};

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  icon: ReactNode;
  delta?: number;
  color: Color;
}

function DashboardStatCard({ label, value, description, icon, delta, color }: StatCardProps) {
  const cfg = colorConfig[color];
  const isPositive = delta !== undefined && delta > 0;
  const isNegative = delta !== undefined && delta < 0;

  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-border/60 transition-all duration-200 group cursor-default">
      <div className={`h-1 ${cfg.bar}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-5">
          <div className={`p-2.5 ${cfg.iconBg} rounded-xl`}>
            <span className={cfg.iconText}>{icon}</span>
          </div>
          {delta !== undefined && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : isNegative
                  ? "bg-red-50 text-red-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {isPositive ? (
                <IconTrendingUp className="w-3 h-3" />
              ) : isNegative ? (
                <IconTrendingDown className="w-3 h-3" />
              ) : (
                <IconMinus className="w-3 h-3" />
              )}
              {isPositive && "+"}
              {delta}%
            </span>
          )}
        </div>
        <p className="text-3xl font-bold text-foreground tracking-tight font-mono leading-none">
          {value}
        </p>
        <p className="text-sm font-semibold text-foreground mt-2">{label}</p>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

const stats: StatCardProps[] = [
  { label: "Contributions",    value: "10", description: "active cases", icon: <IconReceiptTax className="w-5 h-5" />, delta: 5,   color: "blue"    },
  { label: "Surcharges",       value: "45", description: "active cases", icon: <IconCoin className="w-5 h-5" />,        delta: 12,  color: "sky"     },
  { label: "Wages Record",     value: "10", description: "active cases", icon: <IconCash className="w-5 h-5" />,        delta: -2,  color: "yellow"  },
  { label: "Trade Dispute",    value: "12", description: "active cases", icon: <IconScale className="w-5 h-5" />,       delta: 0,   color: "emerald" },
  { label: "Land & Titles",    value: "2",  description: "active cases", icon: <IconHome className="w-5 h-5" />,        delta: -1,  color: "violet"  },
  { label: "Rental Defaulters",value: "2",  description: "active cases", icon: <IconBuildingStore className="w-5 h-5" />, delta: 1, color: "orange"  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((stat) => (
        <DashboardStatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
