import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Sidebar from './components/sidebar';
import Header from './components/header';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-background transition-colors duration-500">
      {/* Sidebar remains consistent with the system's border tokens */}
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto">
        {/* Brand Mesh Glow Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Light Mode: Soft Brand Blue tint 
            Dark Mode: Deep SINPF Navy depth 
          */}
          <div className="absolute inset-0 bg-linear-to-br from-background via-blue-50/50 to-primary/5 dark:from-background dark:via-accent/10 dark:to-background" />
          
          {/* Decorative Brand Accent Blur */}
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[120px]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <div className="p-8 font-sans">
            {/* The children inherit the semantic foreground (slate-900/slate-100) */}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}