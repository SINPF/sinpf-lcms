import { 
  FileText, 
  LayoutDashboard,
  Scale,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: "Home", active: true },
  { icon: Scale, label: "Case Search", active: false },
  { icon: FileText, label: "Filing Search", active: false },
];

function Sidebar() {
  return ( 
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col lg:flex h-screen sticky top-0">
      
      {/* Institutional Branding Area */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#002B5C] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-[10px] tracking-tighter">SINPF</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-sm uppercase">LCMS</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-none">Legal Department</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active 
                  ? 'bg-[#002B5C] text-white shadow-md shadow-blue-900/10' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-900'}`} />
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              </div>
              {item.active && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Security Section & Sign Out */}
      <div className="mt-auto p-6">
      

        <Link 
          href={'/login'}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-sm font-bold group"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;