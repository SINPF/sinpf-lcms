import NavLink from './navlink';

const menuItems = [
  { iconName: "home", label: "Home", url: "/" },
  { iconName: "cases", label: "Cases", url: "/cases" },
];

export default function NavMenu() {
  return ( 
    <nav className="space-y-1.5">
      
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