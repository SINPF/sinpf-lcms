import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">Case Records</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand-blue transition-colors" />
            <input
              type="text"
              placeholder="Search case records..."
              className="w-72 pl-9 pr-4 h-10 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
          </div>

          <Link
            href="/cases/create-new"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-blue text-white text-sm font-semibold shadow-sm hover:bg-brand-blue/90 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5px]" />
            New Case
          </Link>
        </div>
      </div>
    </div>
  );
}
