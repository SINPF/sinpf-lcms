import UploadFiles from "./upload-files";

function FinancialDetails({
  totalContributions,
  setTotalContributions,
  totalSurcharges,
  setTotalSurcharges,
  wagesRecord,
  setWagesRecord,
  grandTotal,
  selectedTypes,
  files,
  setFiles,
}: {
  totalContributions: number;
  setTotalContributions: (value: number) => void;
  totalSurcharges: number;
  setTotalSurcharges: (value: number) => void;
  wagesRecord: number;
  setWagesRecord: (value: number) => void;
  grandTotal: number;
  selectedTypes: string[];
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  // THEME ALIGNED CLASSES
  const inputClasses = "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30";
  const labelClasses = "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1";
  const isWagesRecordSelected = selectedTypes.includes("Wages record");

  return (
    <div className="space-y-6">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
        <div className="flex flex-col">
          <label className={labelClasses}>Total Contributions</label>
          <input
            type="number"
            value={totalContributions}
            onChange={(e) => setTotalContributions(Number(e.target.value))}
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClasses}>Total Surcharges</label>
          <input
            type="number"
            value={totalSurcharges}
            onChange={(e) => setTotalSurcharges(Number(e.target.value))}
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClasses}>Wages Record</label>
          <input
            type="number"
            value={wagesRecord}
            onChange={(e) => setWagesRecord(Number(e.target.value))}
            className={inputClasses}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Grand Total Claim: Elevated Branded Card */}
      <div className="mt-8 p-6 bg-accent border border-border/50 rounded-2xl shadow-inner relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
        
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-accent-foreground/60 uppercase tracking-tighter">Grand Total Claim</span>
            <span className="text-sm font-medium text-accent-foreground/40 italic">Calculated amount in SBD</span>
          </div>
          <span className="text-3xl font-black text-secondary tracking-tighter font-sans">
            ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {isWagesRecordSelected && (
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-secondary rounded-full" />
            <h4 className="text-lg font-bold text-foreground font-heading">Upload Supporting Files</h4>
          </div>
          
          <UploadFiles files={files} setFiles={setFiles} />
          
          {files.length === 0 && (
            <div className="mt-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-sm text-secondary-foreground font-bold flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Wages Record selected. Please upload at least one spreadsheet file (PDF, Excel, or CSV).
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FinancialDetails;