import SignOutButton from "@/components/signout-button";

function Header() {
    return ( 
        <header className="bg-linear-to-r from-white to-blue-50 border-b border-blue-200 p-6 pr-8 pl-8 flex items-center justify-end gap-4 shadow-sm">
            <div className="flex items-center gap-3">
                {/* Welcome Text */}
                <h1 className="text-slate-500 text-sm font-light tracking-tight">
                    Welcome Back, <span className="text-blue-600 font-semibold">Brandon</span>
                </h1>

                {/* Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 text-xs font-bold tracking-tighter">
                        BT
                    </span>
                </div>
                <SignOutButton />
            </div>
        </header>
    );
}

export default Header;