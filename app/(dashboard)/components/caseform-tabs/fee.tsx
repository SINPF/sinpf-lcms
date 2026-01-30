import { useState } from 'react';
import { Plus, Trash2, AlertCircle } from "lucide-react";
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
        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
          Fee Items
        </label>
        
        {selectedFees.map((fee, index) => (
          <div key={index} className="flex gap-4 items-center animate-in slide-in-from-left-2 duration-300">
            <div className="relative flex-1">
              <select 
                className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#002B5C] transition-all appearance-none cursor-pointer"
                value={fee.label}
                onChange={(e) => updateFee(index, e.target.value)}
              >
                <option value="">-- Select Fee Type --</option>
                <option value="Filing Fee">Filing Fee ($150.00)</option>
                <option value="Service Fee">Service Fee ($50.00)</option>
                <option value="Search Fee">Search Fee ($20.00)</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="w-32 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold text-center">
              ${fee.amount.toFixed(2)}
            </div>

            {selectedFees.length > 1 && (
              <button 
                onClick={() => removeFee(index)} 
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Fee"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <button 
          onClick={addFee}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold hover:border-[#002B5C] hover:text-[#002B5C] hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Another Fee
        </button>
      </div>

      {/* Total and Waiver Card */}
      <div className="p-8  rounded-2xl   flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="waiver"
            className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
            checked={isWaived} 
            onChange={() => setIsWaived(!isWaived)} 
          />
          <label htmlFor="waiver" className="text-sm font-semibold cursor-pointer select-none ">
            Request Fee Waiver
          </label>
        </div>

        <div className="text-center md:text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">
            Total Payable Amount
          </div>
          <div className={`text-3xl font-bold transition-all ${isWaived ? 'line-through text-slate-500' : 'text-slate-800'}`}>
            ${total.toFixed(2)}
          </div>
          {isWaived && (
            <div className="text-blue-400 text-xs font-bold mt-2 flex items-center justify-center md:justify-end gap-1 animate-pulse">
              <AlertCircle size={14} /> Waiver Status: Requested
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fee;