import BrandArea from "./brand-area";
import NavMenu from "./navmenu";

function Sidebar() {
  return (
    <aside className="w-72 bg-linear-to-b from-white to-blue-50 border-r border-blue-200 flex flex-col lg:flex h-screen sticky top-0 shadow-lg">
      <div className="p-8">
        <BrandArea />
        <NavMenu />
      </div>

      
    </aside>
  );
}

export default Sidebar;
