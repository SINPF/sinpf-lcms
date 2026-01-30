import { useState } from "react";
import { X } from "lucide-react";
import General from "./caseform-tabs/general";
import CaseInformation from "./caseform-tabs/case-information";
import UploadFiles from "./caseform-tabs/upload-files";
import Fee from "./caseform-tabs/fee";
import Preview from "./caseform-tabs/preview";
import Submit from "./caseform-tabs/submit";

const TABS = [
  "1. General Information",
  "2. Case Information",
  "3. Upload Files",
  "4. Fee",
  "5. Preview",
  "6. Submit",
];

function Header({ onClose }: { onClose: () => void }) {
  return (
    <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Create New Case
        </h2>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </header>
  );
}

function CaseForm({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="relative bg-white w-full max-w-5/6 h-5/6 rounded-2xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col">
      <Header onClose={onClose} />

      {/* Tab Navigation Bar */}
      <div className="flex border-b border-slate-100 bg-white overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab
                ? "border-[#002B5C] text-[#002B5C] bg-blue-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto flex-1">
        {/* Render content based on activeTab */}
        <div className="min-h-100 animate-in fade-in slide-in-from-bottom-2 duration-300 border-3 border-dashed p-4">
          {/* Tab Title - Optional since the tab bar already shows this */}
          <h3 className="text-xl font-bold text-slate-800 mb-6">{activeTab}</h3>

          <div className="w-full">
            {(() => {
              switch (activeTab) {
                case "1. General":
                  return <General />;
                case "2. Case Information":
                  return <CaseInformation />;
                case "3. Upload Files":
                  return <UploadFiles />;
                case "4. Fee":
                  return <Fee />;
                case "5. Preview":
                  return <Preview/>
                case "6. Submit":
                  return <Submit/>
                default:
                  return <General />;
              }
            })()}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CaseForm;
