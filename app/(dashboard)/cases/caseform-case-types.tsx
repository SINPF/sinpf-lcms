import { Check } from "lucide-react";
import { Controller, type Control } from "react-hook-form";
import { CaseFormValues } from "@/db/validator";

const CASE_TYPES = [
  {
    value: "Unpaid contributions",
    description: "Employer has failed to remit mandatory SINPF contributions.",
  },
  {
    value: "Unpaid surcharges",
    description: "Outstanding penalties or surcharges on overdue contributions.",
  },
  {
    value: "Wages record",
    description: "Discrepancies or missing entries in the employer's wages record.",
  },
] as const;

export default function CaseTypes({ control }: { control: Control<CaseFormValues> }) {
  return (
    <Controller
      name="selectedTypes"
      control={control}
      render={({ field }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CASE_TYPES.map(({ value, description }) => {
            const isActive = field.value.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  field.onChange(
                    isActive
                      ? field.value.filter((t) => t !== value)
                      : [...field.value, value],
                  )
                }
                className={`group relative flex flex-col gap-3 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  isActive
                    ? "border-brand-blue bg-brand-blue/8 shadow-sm shadow-brand-blue/10"
                    : "border-border bg-background hover:border-brand-blue/40 hover:bg-muted/30"
                }`}
              >
                {/* Checkbox */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-bold transition-colors ${
                      isActive ? "text-brand-blue" : "text-foreground"
                    }`}
                  >
                    {value}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-brand-blue border-brand-blue"
                        : "border-border group-hover:border-brand-blue/50"
                    }`}
                  >
                    {isActive && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed transition-colors ${
                    isActive ? "text-brand-blue/70" : "text-muted-foreground"
                  }`}
                >
                  {description}
                </p>

                {/* Active bottom accent */}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-b-xl bg-gradient-to-r from-brand-blue to-brand-sky" />
                )}
              </button>
            );
          })}
        </div>
      )}
    />
  );
}
