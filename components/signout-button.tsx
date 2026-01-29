import { LogOut } from "lucide-react";
import Link from "next/link";

function SignOutButton() {
    return ( 
         <Link 
          href={'/login'}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-sm font-bold group"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Sign Out
        </Link>
     );
}

export default SignOutButton;