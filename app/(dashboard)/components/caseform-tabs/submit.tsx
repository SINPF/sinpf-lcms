import React, { useState } from 'react';
import { ArrowRight, FileCheck } from "lucide-react";

function Submit() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Icon and Message */}
      <div className="text-center space-y-3 max-w-md">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FileCheck className="w-8 h-8 text-[#002B5C]" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900">Final Confirmation</h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          By submitting this form, you are officially filing a <strong>Statement of Claim</strong>. 
          Please review all sections to ensure the details provided are truthful and accurate.
        </p>
      </div>

      {/* Verification Box */}
      <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-5 h-5 rounded border-slate-300 text-[#002B5C] focus:ring-[#002B5C]/20 transition-all cursor-pointer"
            />
          </div>
          <span className="text-xs text-slate-600 leading-normal select-none group-hover:text-slate-900 transition-colors">
            I certify that the information provided in this claim is true to the best of my knowledge and that I have the authority to file this document.
          </span>
        </label>

       
      </div>

      {/* Final Action Button */}
      <button
        disabled={!agreed}
        className={`group flex items-center gap-3 px-10 py-4 rounded-xl font-bold transition-all shadow-xl
          ${agreed 
            ? "bg-[#002B5C] text-white hover:bg-[#001f42] shadow-blue-900/20 active:scale-95" 
            : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
      >
        Confirm & File Case
        <ArrowRight className={`w-5 h-5 transition-transform ${agreed ? "group-hover:translate-x-1" : ""}`} />
      </button>

    </div>
  );
}

export default Submit;