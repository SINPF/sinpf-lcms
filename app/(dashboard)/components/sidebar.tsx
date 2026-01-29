import { 
  FileText, 
  LayoutDashboard,
  Scale,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

 const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Scale, label: "Litigation", active: false },
    { icon: FileText, label: "Compliance", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

function Sidebar() {
    return ( 
        
      <aside className="w-64 bg-[#002B5C] text-white flex-col hidden lg:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xs">SINPF</div>
            <span className="font-bold tracking-tight uppercase text-sm">Judiciary</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  item.active ? 'bg-white/10 text-white' : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <Link 
            href={'/login'}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-300 hover:bg-rose-500/10 transition-all text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>
     );
}

export default Sidebar;