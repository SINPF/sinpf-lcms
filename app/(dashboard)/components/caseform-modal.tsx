import { X } from "lucide-react";

export default function CaseFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 1. BACKDROP: This is now a separate div that handles the click */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* 2. MODAL CONTENT: This sits on top and doesn't close when clicked */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 z-10">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
            Manual Entry Mode
          </p>
          <button onClick={onClose} className="text-slate-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8">
          <input 
            type="text" 
            placeholder="Case Title" 
            className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-black transition-all"
          />
          <button className="w-full mt-8 bg-[#002B5C] text-white py-3 rounded-xl text-sm">
            Create Case
          </button>
        </div>
      </div>
    </div>
  );
}