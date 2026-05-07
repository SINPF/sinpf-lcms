import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user.email ?? "";
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <header className="bg-background/90 border-b border-border px-8 py-3.5 flex items-center justify-end gap-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Welcome Back
          </p>
          <p className="text-sm font-bold text-foreground leading-tight">{email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
          <span className="text-brand-blue text-xs font-bold tracking-tight">{initials}</span>
        </div>
      </div>
    </header>
  );
}
