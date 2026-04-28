import { useState } from 'react';
import { Plus, Trash2, AlertCircle, ChevronDown } from "lucide-react";
import Instructions from "./components/instructions";

const feeInstructions = {
  title: 'Fee Selection',
  instructions: [
    'Select the fees that are payable to file this document.',
    'Press <strong>Add Fee</strong> to include an item.',
    'Check the box if you wish to request a <strong>Fee Waiver</strong>.'
  ]
};

function Fee() {
  const [selectedFees, setSelectedFees] = useState([{ label: "", amount: 0 }]);
  const [isWaived, setIsWaived] = useState(false);

  // THEME TOKENS
  const inputClasses = "w-full p-3.5 bg-background border border-border rounded-xl text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer";
  const labelClasses = "text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1";

  const addFee = () => {
    setSelectedFees([...selectedFees, { label: "", amount: 0 }]);
  };

  const removeFee = (indexToRemove: number) => {
    setSelectedFees(selectedFees.filter((_, index) => index !== indexToRemove));
  };

  const updateFee = (index: number, label: string) => {
    let price = 0;
    if (label === "Filing Fee") price = 150;
    if (label === "Service Fee") price = 50;
    if (label === "Search Fee") price = 20;

    const newList = [...selectedFees];
    newList[index] = { label, amount: price };
    setSelectedFees(newList);
  };

  const total = selectedFees.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Instructions {...feeInstructions} />

      {/* The List of Fees */}
      <div className="space-y-4">
        <label className={labelClasses}>Fee Items</label>
        
        {selectedFees.map((fee, index) => (
          <div key={index} className="flex gap-4 items-center animate-in slide-in-from-left-2 duration-300">
            <div className="relative flex-1 group">
              <select 
                className={inputClasses}
                value={fee.label}
                onChange={(e) => updateFee(index, e.target.value)}
              >
                <option value="">-- Select Fee Type --</option>
                <option value="Filing Fee">Filing Fee ($150.00)</option>
                <option value="Service Fee">Service Fee ($50.00)</option>
                <option value="Search Fee">Search Fee ($20.00)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Price Chip */}
            <div className="w-32 p-3.5 bg-secondary/10 border border-secondary/20 rounded-xl text-secondary-foreground font-black text-center shadow-sm">
              ${fee.amount.toFixed(2)}
            </div>

            {selectedFees.length > 1 && (
              <button 
                onClick={() => removeFee(index)} 
                className="p-2.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <button 
          onClick={addFee}
          className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Another Fee
        </button>
      </div>

      {/* Total and Waiver Card: SINPF High-Contrast "Badass" Card */}
      <div className="p-8 bg-accent border border-white/10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-primary/10 relative overflow-hidden group">
        {/* Background Accent Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 rounded-full" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative flex items-center justify-center">
             <input 
              type="checkbox" 
              id="waiver"
              className="w-6 h-6 rounded-lg border-white/20 bg-white/5 text-secondary focus:ring-secondary/20 cursor-pointer transition-all checked:bg-secondary"
              checked={isWaived} 
              onChange={() => setIsWaived(!isWaived)} 
            />
          </div>
          <label htmlFor="waiver" className="flex flex-col cursor-pointer select-none">
            <span className="text-accent-foreground font-black text-sm uppercase tracking-wider">Request Fee Waiver</span>
            <span className="text-accent-foreground/50 text-[11px] font-medium italic">Apply for exemption based on criteria</span>
          </label>
        </div>

        <div className="text-center md:text-right relative z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-black mb-1 opacity-80">
            Total Payable Amount
          </div>
          <div className={`text-4xl font-black transition-all tracking-tighter font-heading ${isWaived ? 'line-through text-accent-foreground/20' : 'text-accent-foreground'}`}>
            ${total.toFixed(2)}
          </div>
          {isWaived && (
            <div className="text-secondary text-[11px] font-black mt-2 flex items-center justify-center md:justify-end gap-1.5 animate-pulse uppercase tracking-widest">
              <AlertCircle size={14} strokeWidth={3} /> Waiver Status: Requested
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fee;