import NavLink from './navlink';

const menuItems = [
  { iconName: "home", label: "Home", url: "/" },
  { iconName: "cases", label: "Cases", url: "/cases" },
  { iconName: "filings", label: "Filings", url: "/filings" },
  { iconName: "reports", label: "Reports", url: "/reports" },
];

export default function NavMenu() {
  return ( 
    <nav className="space-y-1.5">
      <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
        Main Menu
      </p>
      {menuItems.map((item, i) => (
        <NavLink 
          key={i} 
          href={item.url} 
          label={item.label} 
          iconName={item.iconName} 
        />
      ))}
    </nav>
  );
}