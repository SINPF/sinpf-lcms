import CaseForm from "./caseform";

export default function CaseFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 1. BACKDROP: This is now a separate div that handles the click */}
      <div 
        className="absolute inset-0 bg-slate-900/60 " 
        onClick={onClose} 
      />

      <CaseForm onClose={onClose}/>
    </div>
  );
}