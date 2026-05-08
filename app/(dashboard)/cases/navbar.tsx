import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { caseReferrals } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function NavBar() {
  const [{ total }] = await db.select({ total: count() }).from(caseReferrals);

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">Case Records</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold">
            {total}
          </span>
        </div>

        <div className="flex items-center gap-3">
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
