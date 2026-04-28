import { Search, Plus } from "lucide-react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* 1. Left Section: Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="pr-8 flex items-center h-10 border-r border-border/50">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 font-sans">
              Total Cases <span className="text-primary font-black px-2 py-0.5 bg-primary/10 rounded-full text-xs">(3)</span>
            </p>
          </div>
        </div>

        {/* 2. Right Section: Filters & Actions */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Global Search Bar */}
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search case records..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-foreground font-semibold text-sm 
                   placeholder:text-muted-foreground/60 placeholder:font-normal
                   focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-primary
                   transition-all duration-300 font-sans shadow-sm"
            />
          </div>

          {/* New Case Button - Using Brand Primary & Heading Font */}
          <Link 
            href={'/cases/create-new'} 
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 group font-heading"
          >
            <Plus className="w-4 h-4 stroke-[3px] group-hover:rotate-90 transition-transform duration-300" />
            <span>New Case</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;