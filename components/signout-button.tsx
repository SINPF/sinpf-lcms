"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    }

    return (
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-muted-foreground hover:text-secondary-foreground hover:bg-secondary border border-transparent hover:border-secondary/20 text-sm font-bold transition-all duration-300 group cursor-pointer w-full font-heading active:scale-95"
        >
          {/* Icon turns brand-navy on hover for contrast against the gold background */}
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
    );
}

export default SignOutButton;