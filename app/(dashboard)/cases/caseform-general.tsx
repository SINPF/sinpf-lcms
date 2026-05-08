import { type UseFormRegister } from "react-hook-form";
import { CaseFormValues } from "@/db/validator";

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-muted-foreground/30";
const labelClasses =
  "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1";

export default function General({ register }: { register: UseFormRegister<CaseFormValues> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2 flex flex-col">
        <label className={labelClasses}>Employer Name</label>
        <input
          {...register("employerName")}
          type="text"
          className={inputClasses}
          placeholder="e.g. Solomon Islands National University"
        />
      </div>

      <div className="flex flex-col">
        <label className={labelClasses}>Employer Code</label>
        <input
          {...register("employerCode")}
          type="text"
          className={inputClasses}
          placeholder="SIN-XXXX-XX"
        />
      </div>

      <div className="flex flex-col">
        <label className={labelClasses}>Referral Date</label>
        <input
          {...register("referralDate")}
          type="date"
          className={`${inputClasses} cursor-pointer`}
        />
      </div>
    </div>
  );
}
