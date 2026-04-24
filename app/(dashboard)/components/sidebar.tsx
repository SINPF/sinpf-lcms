import BrandArea from "./brand-area";
import NavMenu from "./navmenu";

function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col lg:flex h-screen sticky top-0">
      <div className="p-8">
        <BrandArea />
        <NavMenu />
      </div>

      
    </aside>
  );
}

export default Sidebar;
