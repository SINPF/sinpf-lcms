import { 
  FileText, 
  LayoutDashboard,
  Scale,
} from 'lucide-react';


const menuItems = [
  { icon: LayoutDashboard, label: "Home", active: true },
  { icon: Scale, label: "Cases", active: false },
  { icon: FileText, label: "Filings", active: false },
  { icon: FileText, label: "Reports", active: false },
];

function NavMenu() {
    return ( 
        
        <nav className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`w-full cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active 
                  ? 'bg-[#002B5C] text-white shadow-md shadow-blue-900/10' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-900'}`} />
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              </div>
            </button>
          ))}
        </nav>
     );
}

export default NavMenu;