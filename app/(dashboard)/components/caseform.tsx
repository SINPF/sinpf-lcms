import { FormEvent, useState } from "react";
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
    <div className={`relative bg-white w-5/6 h-5/6 rounded-2xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col ${isMaximized ? "w-full h-full rounded-none" : "w-5/6 h-5/6"}`}>
      <Header onClose={onClose} onToggleExpand={() => setIsMaximized(!isMaximized)} isMaximized={isMaximized} />

      <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1">
        <div className="min-h-100 animate-in fade-in slide-in-from-bottom-2 duration-300 border-3 border-dashed p-6 rounded-3xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Employee Information</h3>
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

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Financial Details</h3>
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
          <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-700">
            Wages Record is selected. Please upload at least one spreadsheet file (PDF, Excel, or CSV) before saving.
          </div>
        )}

        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-slate-500">Status: {status || 'Draft'}</span>
          <button
            type="submit"
            disabled={!canSave}
            className={`px-8 py-4 rounded-xl font-bold transition-all shadow-xl ${canSave ? "bg-[#002B5C] text-white hover:bg-[#001f42] shadow-blue-900/20" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CaseForm;
