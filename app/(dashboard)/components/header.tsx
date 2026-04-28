import SignOutButton from "@/components/signout-button";
import { ThemeToggle } from "@/components/theme-toggle";

function Header() {
    return ( 
        /* FIX: Using inline style or solid color-mix ensures the background switches 
           immediately when the .dark class is toggled on the html element.
        */
        <header className="bg-background border-b border-border p-4 pr-8 pl-8 flex items-center justify-end gap-6 shadow-sm sticky top-0 z-40 transition-colors duration-300 dark:bg-[#0f172a]/80 backdrop-blur-md">
            <div className="flex items-center gap-6">
                
                {/* Theme Toggle Integration */}
                <div className="border-r border-border pr-6">
                    <ThemeToggle />
                </div>

                {/* User Profile Area */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <h1 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest font-sans opacity-70">
                            Welcome Back
                        </h1>
                        <p className="text-foreground font-bold text-sm font-heading">
                            Brandon
                        </p>
                    </div>

                    {/* Initials Circle */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner group cursor-pointer hover:border-primary transition-all">
                        <span className="text-primary text-xs font-bold tracking-tighter">
                            BT
                        </span>
                    </div>
                </div>

                {/* Action Area */}
                <div className="pl-2">
                    <SignOutButton />
                </div>
            </div>
        </header>
    );
}

export default Header;