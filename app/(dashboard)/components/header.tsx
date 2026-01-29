import { 
  Search, 
  Plus, 
  Bell
} from 'lucide-react';

function Header() {
    return ( 
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back, Legal Officer</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002B5C]/5 w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#002B5C] hover:bg-slate-50 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-[#002B5C] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#001f42] transition-all shadow-lg shadow-blue-900/10">
              <Plus className="w-4 h-4" />
              New Case
            </button>
          </div>
        </header>
     );
}

export default Header;