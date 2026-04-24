import React from "react";

function General({
  employerName, setEmployerName,
  employerCode, setEmployerCode,
  referralDate, setReferralDate,
  selectedTypes, setSelectedTypes,
}: {
  employerName: string;
  setEmployerName: (value: string) => void;
  employerCode: string;
  setEmployerCode: (value: string) => void;
  referralDate: string;
  setReferralDate: (value: string) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const caseTypes = ["Unpaid contributions", "Unpaid surcharges", "Wages record"];

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 ml-1";

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="grid-cols-1">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">

        {/* Employer Name */}
        <div className="flex flex-col">
          <label className={labelClasses}>Employer Name</label>
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            className={inputClasses}
            placeholder="Enter employer name"
          />
        </div>

        {/* Employer Code */}
        <div className="flex flex-col">
          <label className={labelClasses}>Employer Code</label>
          <input
            type="text"
            value={employerCode}
            onChange={(e) => setEmployerCode(e.target.value)}
            className={inputClasses}
            placeholder="Enter alphanumeric code"
          />
        </div>

        {/* Referral Date */}
        <div className="flex flex-col">
          <label className={labelClasses}>Referral Date</label>
          <input
            type="date"
            value={referralDate}
            onChange={(e) => setReferralDate(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* Type of Case - Multi-select */}
        <div className="flex flex-col">
          <label className={labelClasses}>Type of Case</label>
          <div className="space-y-2">
            {caseTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;