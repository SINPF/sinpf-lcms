import { X, Briefcase, Calendar, AlertCircle, User, AlignLeft } from "lucide-react";

function CaseForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 z-10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Create New Case</h2>
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mt-1">
            Manual Entry Mode
          </p>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Section: Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Basic Information</span>
          </div>
          
          <input 
            type="text" 
            placeholder="Case Title / Subject" 
            className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-blue-600 transition-all text-lg font-medium placeholder:text-slate-300"
          />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium ml-1">Case Type</label>
              <select className="w-full bg-transparent border-b border-slate-200 py-2 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer">
                <option value="">Select Type...</option>
                <option value="legal">Legal</option>
                <option value="medical">Medical</option>
                <option value="insurance">Insurance</option>
                <option value="internal">Internal Investigation</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium ml-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Priority
              </label>
              <select className="w-full bg-transparent border-b border-slate-200 py-2 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer font-medium text-amber-600">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Assignments & Dates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <User className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Assignment</span>
            </div>
            <select className="w-full bg-transparent border-b border-slate-200 py-2 focus:outline-none focus:border-blue-600 appearance-none">
              <option value="">Assign to Lead...</option>
              <option value="1">John Doe</option>
              <option value="2">Sarah Smith</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Due Date</span>
            </div>
            <input 
              type="date" 
              className="w-full bg-transparent border-b border-slate-200 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Section: Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <AlignLeft className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Case Description</span>
          </div>
          <textarea 
            rows={3}
            placeholder="Detailed notes regarding the case background..." 
            className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-2 bg-[#002B5C] text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-900/20 hover:bg-[#001f42] transition-all"
          >
            Create Case
          </button>
        </div>
      </form>
    </div>
  );
}

export default CaseForm;