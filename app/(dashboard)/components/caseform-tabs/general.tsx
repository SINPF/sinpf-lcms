import Instructions from "./components/instructions";

const instructions = {
    title: 'Filing Instructions',
    instructions: [
        'Identify and select the appropriate **Court Jurisdiction** for this claim.',
        'Choose the **Category of Claim**. Please consult the <span class="text-[#002B5C] font-medium underline underline-offset-2 cursor-pointer hover:text-blue-700">Civil Procedure Rules</span> to ensure the correct classification is applied.',
        'Once these details are verified, proceed to the <span class="font-semibold text-slate-800">Case Information</span> section to provide the narrative of your claim.'
    ]
}

function General() {

  const jurisdictions = ["Federal Court", "State Court", "Appellate Court"];
  const caseTypes = ["Civil", "Criminal", "Family", "Commercial"];
  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX"];

  const selectClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#002B5C] transition-all appearance-none cursor-pointer";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 ml-1";

  return (
    <div className="grid-cols-1">
     <Instructions {...instructions}/>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">

      {/* Jurisdiction Select */}
      <div className="flex flex-col">
        <label className={labelClasses}>Jurisdiction</label>
        <div className="relative">
          <select className={selectClasses}>
            <option value="">Select Jurisdiction</option>
            {jurisdictions.map((j) => (
              <option key={j} value={j.toLowerCase()}>{j}</option>
            ))}
          </select>
          <ChevronDownIcon />
        </div>
      </div>

      {/* Case Type Select */}
      <div className="flex flex-col">
        <label className={labelClasses}>Case Type</label>
        <div className="relative">
          <select className={selectClasses}>
            <option value="">Select Case Type</option>
            {caseTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
          <ChevronDownIcon />
        </div>
      </div>

      {/* Court Location Select */}
      <div className="flex flex-col">
        <label className={labelClasses}>Court Location</label>
        <div className="relative">
          <select className={selectClasses}>
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc.toLowerCase()}>{loc}</option>
            ))}
          </select>
          <ChevronDownIcon />
        </div>
      </div>
    </div>
    </div>
  );
}

// Small helper component for the custom dropdown arrow
function ChevronDownIcon() {
  return (
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default General;