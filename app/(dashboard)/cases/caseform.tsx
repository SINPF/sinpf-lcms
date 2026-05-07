"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { insertCaseSchema, CaseFormValues } from "@/db/validator";
import General from "./caseform-general";
import FinancialDetails from "./caseform-financial-details";

const iconClasses = "w-4 h-4 transition-transform duration-200 active:scale-90";
const btnClasses =
  "p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all flex items-center justify-center border border-transparent hover:border-border";

function CaseFormHeader({
  onClose,
  onToggleExpand,
  isMaximized,
}: {
  onClose: () => void;
  onToggleExpand: () => void;
  isMaximized: boolean;
}) {
  return (
    <header className="px-8 py-5 border-b border-border flex justify-between items-center bg-background transition-colors duration-300">
      <div>
        <h2 className="text-lg font-bold text-foreground tracking-tight font-heading">
          Create New Case
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-70">
            Legal Filing Portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleExpand}
          className={`${btnClasses} hover:bg-secondary/10 hover:text-secondary-foreground hover:border-secondary/20`}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <Minimize2 className={iconClasses} /> : <Maximize2 className={iconClasses} />}
        </button>
        <button
          onClick={onClose}
          className={`${btnClasses} hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20`}
          title="Close"
        >
          <X className={iconClasses} />
        </button>
      </div>
    </header>
  );
}

export default function CaseForm({ onClose }: { onClose: () => void }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(insertCaseSchema) as Resolver<CaseFormValues>,
    defaultValues: {
      employerName: "",
      employerCode: "",
      referralDate: new Date().toISOString().split("T")[0],
      selectedTypes: [],
      totalContributions: 0,
      totalSurcharges: 0,
      wagesRecord: 0,
      grandTotalClaim: 0,
    },
  });

  const selectedTypes = watch("selectedTypes") ?? [];
  const grandTotal =
    (watch("totalContributions") || 0) +
    (watch("totalSurcharges") || 0) +
    (watch("wagesRecord") || 0);
  const isWagesRecordSelected = selectedTypes.includes("Wages record");
  const canSave = !isWagesRecordSelected || files.length > 0;

  const onSubmit = (data: CaseFormValues) => {
    if (!canSave) return;
    const { selectedTypes: _, ...fields } = data;
    console.log("Submit:", { ...fields, grandTotalClaim: grandTotal });
  };

  return (
    <div
      className={`relative bg-background rounded-2xl shadow-2xl border border-border z-10 overflow-hidden flex flex-col transition-all duration-300 ${
        isMaximized ? "w-full h-full rounded-none" : "w-5/6 h-5/6"
      }`}
    >
      <CaseFormHeader
        onClose={onClose}
        onToggleExpand={() => setIsMaximized(!isMaximized)}
        isMaximized={isMaximized}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 overflow-y-auto flex-1">
        <div className="min-h-100 animate-in fade-in slide-in-from-bottom-2 duration-300 border-2 border-dashed border-border p-8 rounded-3xl bg-muted/30">
          <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">
            Employer Information
          </h3>
          <General register={register} control={control} />

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">
              Financial Details
            </h3>
            <FinancialDetails
              register={register}
              grandTotal={grandTotal}
              isWagesRecordSelected={isWagesRecordSelected}
              files={files}
              setFiles={setFiles}
            />
          </div>
        </div>

        {isWagesRecordSelected && files.length === 0 && (
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-sm text-secondary-foreground font-medium">
            Wages Record is selected. Please upload at least one spreadsheet file (PDF, Excel, or CSV)
            before saving.
          </div>
        )}

        <div className="flex justify-between items-center gap-4 pt-4">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Status:{" "}
            <span className="text-primary">{isSubmitSuccessful ? "Referred" : "Draft"}</span>
          </span>
          <button
            type="submit"
            disabled={!canSave}
            className={`px-10 py-4 rounded-xl font-bold transition-all shadow-lg font-heading active:scale-95 ${
              canSave
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}
