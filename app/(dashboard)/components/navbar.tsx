import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Download,
  Plus,
  ChevronDown,
} from "lucide-react";

function NavBar() {
  return (
    <div className="  p-4 mb-8 ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* 1. Left Section: Stats & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Simplified Record Counter */}
<div className=" pr-8 flex items-center h-10">
    <p className="text-md font-semibold text-slate-500 uppercase tracking-tight flex items-center gap-2">
        Total Cases (3)
    </p>
</div>
        </div>

        {/* 2. Right Section: Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Global Search Bar */}
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#002B5C] transition-colors" />
            <input
              type="text"
              placeholder="Search ID, status, or name..."
              className="w-full pl-8 pr-4 py-2.5 bg-white border-b border-transparent text-slate-900 font-semibold text-sm 
                   placeholder:text-slate-400 placeholder:font-normal
                   focus:outline-none focus:border-b-[#569dee] focus:ring-0
                   transition-all duration-300 font-body"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2">
            <button
              className="p-1.5 rounded-md bg-white shadow-sm text-[#002B5C] transition-all"
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Dropdown */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>All Cases</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Export Action */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Primary Action: New Case */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#002B5C] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-[#001d3d] transition-all active:scale-95 group">
            <Plus className="w-4 h-4 stroke-[3px] group-hover:rotate-90 transition-transform duration-300" />
            <span>New Case</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
