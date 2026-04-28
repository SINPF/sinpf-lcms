import { useState } from "react";
import General from "./caseform-tabs/general";
import FinancialDetails from "./caseform-tabs/financial-details";
import Header from "./caseform-header";

function CaseForm({ onClose }: { onClose: () => void }) {
  const [isMaximized, setIsMaximized] = useState(false);

  // Form state
  const [employerName, setEmployerName] = useState("");
  const [employerCode, setEmployerCode] = useState("");
  const [referralDate, setReferralDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalSurcharges, setTotalSurcharges] = useState(0);
  const [wagesRecord, setWagesRecord] = useState(0);
  const grandTotal = totalContributions + totalSurcharges + wagesRecord;
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const isWagesRecordSelected = selectedTypes.includes("Wages record");
  const canSave = !isWagesRecordSelected || files.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    setStatus('Referred');
    console.log('Form saved with status: Referred');
  };

  return (
    /* Updated background and border to use semantic tokens. 
       Removed hardcoded blue-50 and blue-200. */
    <div className={`relative bg-background w-5/6 h-5/6 rounded-2xl shadow-2xl border border-border z-10 overflow-hidden flex flex-col transition-all duration-300 ${isMaximized ? "w-full h-full rounded-none" : "w-5/6 h-5/6"}`}>
      <Header onClose={onClose} onToggleExpand={() => setIsMaximized(!isMaximized)} isMaximized={isMaximized} />

      <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1">
          {/* Dashed container now uses the theme's border and muted background */}
          <div className="min-h-100 animate-in fade-in slide-in-from-bottom-2 duration-300 border-2 border-dashed border-border p-8 rounded-3xl bg-muted/30">
          <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">Employer Information</h3>
          <General
            employerName={employerName}
            setEmployerName={setEmployerName}
            employerCode={employerCode}
            setEmployerCode={setEmployerCode}
            referralDate={referralDate}
            setReferralDate={setReferralDate}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">Financial Details</h3>
            <FinancialDetails
              totalContributions={totalContributions}
              setTotalContributions={setTotalContributions}
              totalSurcharges={totalSurcharges}
              setTotalSurcharges={setTotalSurcharges}
              wagesRecord={wagesRecord}
              setWagesRecord={setWagesRecord}
              grandTotal={grandTotal}
              selectedTypes={selectedTypes}
              files={files}
              setFiles={setFiles}
            />
          </div>
        </div>

        {isWagesRecordSelected && files.length === 0 && (
          /* Warning block uses the secondary color (gold) for high visibility */
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-sm text-secondary-foreground font-medium">
            Wages Record is selected. Please upload at least one spreadsheet file (PDF, Excel, or CSV) before saving.
          </div>
        )}

        <div className="flex justify-between items-center gap-4 pt-4">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Status: <span className="text-primary">{status || 'Draft'}</span>
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

export default CaseForm;