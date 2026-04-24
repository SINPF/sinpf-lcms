import React, { useState } from 'react';
import { ArrowRight, FileCheck } from "lucide-react";

function Submit({ selectedTypes, files, onSubmit }: { selectedTypes: string[]; files: File[]; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(false);

  const isWagesRecordSelected = selectedTypes.includes("Wages record");
  const hasFiles = files.length > 0;
  const canSubmit = agreed && (!isWagesRecordSelected || hasFiles);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Icon and Message */}
      <div className="text-center space-y-3 max-w-md">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FileCheck className="w-8 h-8 text-[#002B5C]" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900">Final Confirmation</h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          Review the employer and financial details before saving. 
          This action will preserve the case record with a referred status.
        </p>
      </div>

      {/* Validation Messages */}
      {isWagesRecordSelected && !hasFiles && (
        <div className="w-full max-w-lg bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm text-red-700">
            <strong>Warning:</strong> &quot;Wages Record&quot; is selected as the Type of Case. At least one file must be uploaded.
          </p>
        </div>
      )}


      {/* Final Action Button */}
      <button
        disabled={!canSubmit}
        onClick={onSubmit}
        className={`group flex items-center gap-3 px-10 py-4 rounded-xl font-bold transition-all shadow-xl
          ${canSubmit 
            ? "bg-[#002B5C] text-white hover:bg-[#001f42] shadow-blue-900/20 active:scale-95" 
            : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
      >
        Save
        <ArrowRight className={`w-5 h-5 transition-transform ${canSubmit ? "group-hover:translate-x-1" : ""}`} />
      </button>

    </div>
  );
}

export default Submit;