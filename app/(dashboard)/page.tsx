import StatsGrid from "./components/statsgrid";

export default function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of active legal cases across all categories.
        </p>
      </div>
      <StatsGrid />
    </div>
  );
}
