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
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto">
        {/* Visible Mesh Glow Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-linear-to-br from-blue-50 to-indigo-100">
    

        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <div className="p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}