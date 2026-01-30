import { Plus, Users, ShieldAlert, FileText } from 'lucide-react';
import Instructions from './components/instructions';

const instructions = {
  title: 'Upload Documents',
  instructions: [
    'You can upload your <strong>supporting evidence</strong> and <strong>exhibits</strong> here.',
    'Accepted formats: <strong>PDF, DOCX, and JPEG</strong>. Max size: 10MB per file.',
    'You can select multiple files at once using the browse button.'
  ]
};

function CaseInformation() {
  const sectionClasses = "p-6 border border-slate-200 rounded-2xl bg-white shadow-sm transition-all hover:border-slate-300";
  const addBtnClasses = "flex items-center gap-2 px-4 py-2 rounded-lg bg-[#002B5C] text-white text-sm font-medium hover:bg-[#001f42] transition-colors shadow-md shadow-blue-900/10";
  const headerClasses = "flex justify-between items-center mb-6";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Instructions {...instructions}/>
      {/* Claimants Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-[#002B5C]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Claimants</h3>
              <p className="text-xs text-slate-500">The parties bringing the claim</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4" /> Add Claimant
          </button>
        </div>
        
        {/* Placeholder for listed Claimants */}
        <div className="py-8 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 text-sm">
           No claimants added yet.
        </div>
      </section>

      {/* Defendants Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-[#002B5C] ">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Defendants</h3>
              <p className="text-xs text-slate-500">The parties being sued</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4" /> Add Defendant
          </button>
        </div>
        <div className="py-8 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 text-sm">
           No defendants added yet.
        </div>
      </section>

      {/* Orders Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Requested Orders</h3>
              <p className="text-xs text-slate-500">What do you want the court to grant?</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4" /> Add Order
          </button>
        </div>
        <div className="py-8 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 text-sm">
           No orders specified.
        </div>
      </section>

    </div>
  );
}

export default CaseInformation;