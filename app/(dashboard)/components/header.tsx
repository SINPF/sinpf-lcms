import { 
  Search, 
} from 'lucide-react';

function Header() {
 
    return ( 
        <header className="bg-white border-l-0  flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b  border-slate-200 p-8">
          <div>
            
            
            <h1 className="font-bold text-xl text-slate-900 -tracking-normal">
              Welcome back, <span className="text-[#002B5C] ">Brandon</span>
            </h1>
            
          </div>
          
          <div className="flex items-center gap-3">
            {/* Command Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#002B5C]/5 rounded-xl blur-sm group-focus-within:bg-[#002B5C]/10 transition-colors" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-[#002B5C] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search cases, files, or members..." 
                  className="pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#002B5C] w-full md:w-80 shadow-sm transition-all placeholder:text-slate-400"
                />
  
              </div>
            </div>

            
          </div>
        </header>
     );
}

export default Header;