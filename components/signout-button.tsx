"use client";

import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/login") },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border transition-all"
    >
      <IconLogout className="w-4 h-4 shrink-0" />
      <span>Sign Out</span>
    </button>
  );
}
