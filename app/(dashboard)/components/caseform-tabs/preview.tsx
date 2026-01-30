import React from 'react';
import { FileText, User, DollarSign, Paperclip, AlertCircle } from "lucide-react";

function Preview() {
  const sectionHeader = "flex items-center gap-2 pb-2 border-b border-slate-100 mb-4";
  const labelClass = "text-[10px] uppercase tracking-widest text-slate-400 font-bold";
  const valueClass = "text-sm text-slate-700 font-medium";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Document Header Preview - Monochromatic */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
           <FileText size={120} />
        </div>
        
        <div className={sectionHeader}>
          <FileText className="w-4 h-4 text-slate-500" />
          <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-800">Case Overview</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div>
            <p className={labelClass}>Jurisdiction</p>
            <p className={valueClass}>Federal Court of Justice</p>
          </div>
          <div>
            <p className={labelClass}>Claim Category</p>
            <p className={valueClass}>Commercial Dispute</p>
          </div>
        </div>
      </div>

      {/* Parties Summary - Minimal Gray */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-2xl p-6 bg-white">
          <div className={sectionHeader}>
            <User className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-800">Claimants</h4>
          </div>
          <ul className="space-y-2">
            <li className="text-sm font-semibold text-slate-700">1. Global Logistics Corp</li>
            <li className="text-sm font-semibold text-slate-700">2. Jane Doe (Co-appellant)</li>
          </ul>
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 bg-white">
          <div className={sectionHeader}>
            <User className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-800">Defendants</h4>
          </div>
          <ul className="space-y-2 text-sm font-semibold text-slate-700">
            <li>1. Apex Manufacturing Ltd</li>
          </ul>
        </div>
      </div>

      {/* Evidence & Fees Summary - Neutral Tone */}
      <div className="border border-slate-200 rounded-2xl p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className={sectionHeader}>
              <Paperclip className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-800">Attached Documents</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-50 text-[10px] rounded border border-slate-200 text-slate-500 font-bold uppercase tracking-tight">contract_v2.pdf</span>
              <span className="px-2 py-1 bg-slate-50 text-[10px] rounded border border-slate-200 text-slate-500 font-bold uppercase tracking-tight">invoice_049.jpg</span>
            </div>
          </div>

          <div>
            <div className={sectionHeader}>
              <DollarSign className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold uppercase tracking-tighter text-slate-800">Total Filing Costs</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900 leading-tight">$170.00</p>
            <p className="text-[10px] text-slate-400 font-medium">Payment pending final submission</p>
          </div>
        </div>
      </div>

      {/* Low-Key Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 items-start">
        <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-700 font-bold uppercase tracking-tighter mr-1">Review Statement:</strong> 
          Please verify all details. You can navigate back to any previous tab to rectify errors before final submission.
        </p>
      </div>
    </div>
  );
}

export default Preview;