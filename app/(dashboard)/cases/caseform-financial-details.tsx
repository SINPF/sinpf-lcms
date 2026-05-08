import { type UseFormRegister } from "react-hook-form";
import { CaseFormValues } from "@/db/validator";

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-muted-foreground/30";
const labelClasses =
  "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1";

export default function FinancialDetails({
  register,
  grandTotal,
}: {
  register: UseFormRegister<CaseFormValues>;
  grandTotal: number;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col">
          <label className={labelClasses}>Total Contributions</label>
          <input
            {...register("totalContributions", { valueAsNumber: true })}
            type="number"
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClasses}>Total Surcharges</label>
          <input
            {...register("totalSurcharges", { valueAsNumber: true })}
            type="number"
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClasses}>Wages Record</label>
          <input
            {...register("wagesRecord", { valueAsNumber: true })}
            type="number"
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Grand Total */}
      <div
        className="relative rounded-2xl overflow-hidden p-5"
        style={{ background: "linear-gradient(135deg, #1e3d5f 0%, #162d48 60%, #112236 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 w-36 h-36 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(8,159,255,0.25) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-4 bottom-0 w-28 h-28 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,223,24,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Grand Total Claim
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Auto-calculated · SBD</p>
          </div>
          <span className="text-3xl font-black text-white tracking-tight tabular-nums">
            {grandTotal.toLocaleString("en-SB", {
              style: "currency",
              currency: "SBD",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
