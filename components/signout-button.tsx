import { LogOut } from "lucide-react";
import Link from "next/link";

function SignOutButton() {
    return ( 
        <Link 
          href={'/login'}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-500  text-sm transition-all duration-200  group border border-transparent "
        >
          <LogOut className="w-4 h-4 " />
          <span>Logout</span>
        </Link>
    );
}

export default SignOutButton;