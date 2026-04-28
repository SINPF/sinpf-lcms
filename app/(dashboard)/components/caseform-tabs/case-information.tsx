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
  // Use semantic tokens for containers
  const sectionClasses = "p-6 border border-border rounded-2xl bg-background shadow-sm transition-all hover:border-primary/30 group";
  
  // Use Brand Primary (Trust Blue) for buttons
  const addBtnClasses = "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95 font-heading";
  
  const headerClasses = "flex justify-between items-center mb-6";
  
  // Reusable Empty State Styling
  const emptyStateClasses = "py-10 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground text-sm font-medium bg-muted/20 transition-colors group-hover:bg-muted/30";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Instructions {...instructions}/>

      {/* Claimants Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-secondary/10 rounded-lg text-secondary-foreground border border-secondary/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading leading-tight">Claimants</h3>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold opacity-70">The parties bringing the claim</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4 stroke-[3px]" /> Add Claimant
          </button>
        </div>
        
        <div className={emptyStateClasses}>
           <Users className="w-8 h-8 mb-2 opacity-20" />
           No claimants added yet.
        </div>
      </section>

      {/* Defendants Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-secondary/10 rounded-lg text-secondary-foreground border border-secondary/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading leading-tight">Defendants</h3>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold opacity-70">The parties being sued</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4 stroke-[3px]" /> Add Defendant
          </button>
        </div>
        <div className={emptyStateClasses}>
           <ShieldAlert className="w-8 h-8 mb-2 opacity-20" />
           No defendants added yet.
        </div>
      </section>

      {/* Orders Section */}
      <section className={sectionClasses}>
        <div className={headerClasses}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-secondary/10 rounded-lg text-secondary-foreground border border-secondary/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading leading-tight">Requested Orders</h3>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold opacity-70">What do you want the court to grant?</p>
            </div>
          </div>
          <button className={addBtnClasses}>
            <Plus className="w-4 h-4 stroke-[3px]" /> Add Order
          </button>
        </div>
        <div className={emptyStateClasses}>
           <FileText className="w-8 h-8 mb-2 opacity-20" />
           No orders specified.
        </div>
      </section>

    </div>
  );
}

export default CaseInformation;