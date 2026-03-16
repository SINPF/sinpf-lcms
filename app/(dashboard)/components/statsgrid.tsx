import {
  Gavel, // Perfect for "Cases"
  Wallet, // Better for "Account Balance"
  Scale, // Excellent for "Hearings/Judiciary"
} from "lucide-react";
import StatCard from "./statcard";

const stats = [
  {
    label: "Contributions",
    description: "active cases",
    value: "10",
    icon: Gavel,
    bgColor: "bg-blue-900",
    borderColor: "border-blue-800",
    accentColor: "bg-blue-400",
  },
  {
    label: "Surcharges",
    description: "active cases",
    value: "45",
    icon: Wallet,
    bgColor: "bg-indigo-950", // Deep, almost black-purple
    borderColor: "border-indigo-900",
    accentColor: "bg-slate-200", // Bright neon violet pulse
  },
   {
    label: "Wages",
    description: "active cases",
    value: "10",
    icon: Gavel,
    bgColor: "bg-blue-900",
    borderColor: "border-blue-800",
    accentColor: "bg-blue-400",
  },
  {
    label: "Trade dispute panel",
    description: "active cases",
    value: "12",
    icon: Scale, // Swapped from FileText to Scale (Legal proceedings)
    bgColor: "bg-emerald-900",
    borderColor: "border-emerald-800",
    accentColor: "bg-emerald-400",
  },
   {
    label: "Land and Titles",
    description: "active cases",
    value: "2",
    icon: Scale, // Swapped from FileText to Scale (Legal proceedings)
    bgColor: "bg-emerald-900",
    borderColor: "border-emerald-800",
    accentColor: "bg-emerald-400",
  },
  {
    label: "Rental Defaulters",
    description: "active cases",
    value: "2",
    icon: Scale, // Swapped from FileText to Scale (Legal proceedings)
    bgColor: "bg-emerald-900",
    borderColor: "border-emerald-800",
    accentColor: "bg-emerald-400",
  },
];

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard stat={stat} key={idx} />
      ))}
    </div>
  );
}

export default StatsGrid;
