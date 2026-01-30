import Link from "next/link";

function Header() {
    return ( 
        <header className="bg-white border-b border-slate-200 p-6 pr-8 pl-8 flex items-center justify-end gap-4">
            <div className="flex items-center gap-3">
                {/* Welcome Text */}
                <h1 className="text-slate-500 text-sm font-light tracking-tight">
                    Welcome Back, <span className="text-[#002B5C] font-semibold">Brandon</span>
                </h1>

                {/* Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-[#002B5C] text-xs font-bold tracking-tighter">
                        BT
                    </span>
                </div>
                <Link href={'/login'} className="text-slate-400 "><span className="mr-4 ml-4">|</span> sign out</Link>
            </div>
        </header>
    );
}

export default Header;