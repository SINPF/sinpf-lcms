import { Check } from "lucide-react";
import { Controller, Control, UseFormRegister } from "react-hook-form";
import { CaseFormValues } from "@/db/validator";

const CASE_TYPES = ["Unpaid contributions", "Unpaid surcharges", "Wages record"] as const;

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30";
const labelClasses =
  "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1";

function General({
  register,
  control,
}: {
  register: UseFormRegister<CaseFormValues>;
  control: Control<CaseFormValues>;
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
        <div className="flex flex-col">
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

        <div className="flex flex-col">
          <label className={labelClasses}>Type of Case</label>
          <Controller
            name="selectedTypes"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {CASE_TYPES.map((type) => {
                  const isActive = field.value.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        field.onChange(
                          isActive
                            ? field.value.filter((t) => t !== type)
                            : [...field.value, type],
                        )
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-secondary text-secondary-foreground border-secondary shadow-lg shadow-secondary/20"
                          : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded flex items-center justify-center border transition-colors ${
                          isActive
                            ? "bg-secondary-foreground border-secondary-foreground"
                            : "bg-transparent border-muted-foreground/30"
                        }`}
                      >
                        {isActive && (
                          <Check className="w-2.5 h-2.5 text-secondary" strokeWidth={4} />
                        )}
                      </div>
                      {type}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default General;
