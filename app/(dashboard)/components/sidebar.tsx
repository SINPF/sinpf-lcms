import BrandArea from "./brand-area";
import NavMenu from "./navmenu";
import SignOutButton from "@/components/signout-button";

function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col lg:flex h-screen sticky top-0">
      <div className="p-8">
        <BrandArea />
        <NavMenu />
      </div>

      <div className="mt-auto border-t flex justify-center p-6">
        <SignOutButton />
      </div>
    </aside>
  );
}

export default Sidebar;
