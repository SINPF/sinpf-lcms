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
  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#002B5C] transition-all";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 ml-1";
  const isWagesRecordSelected = selectedTypes.includes("Wages record");

  return (
    <div className="grid-cols-1">
    
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

      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-800">Grand Total Claim</span>
          <span className="text-xl font-bold text-[#002B5C]">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {isWagesRecordSelected && (
        <div className="mt-10">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Upload Supporting Files</h4>
          <UploadFiles files={files} setFiles={setFiles} />
          {files.length === 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-700">
              Wages Record has been selected. Please upload at least one spreadsheet file (PDF, Excel, or CSV) before saving.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FinancialDetails;
