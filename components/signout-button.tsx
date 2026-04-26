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
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-500 text-sm transition-all duration-200 group border border-transparent cursor-pointer w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
    );
}

export default SignOutButton;