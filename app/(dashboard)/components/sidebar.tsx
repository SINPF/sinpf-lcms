import BrandArea from "./brand-area";
import NavMenu from "./navmenu";

function Sidebar() {
  return (
    <aside className="w-72 bg-background  border-r border-border flex flex-col lg:flex h-screen sticky top-0 shadow-lg transition-colors duration-300">
      <div className="p-8 relative z-10">
        <BrandArea />
        
        {/* Subtle brand separator */}
        <div className="my-8 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        
        <NavMenu />
      </div>

      {/* Subtle brand glow at the bottom for dark mode depth */}
      <div className="hidden dark:block absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" />
    </aside>
  );
}

export default Sidebar;