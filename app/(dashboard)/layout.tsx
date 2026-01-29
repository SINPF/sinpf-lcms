import Sidebar from './components/sidebar';
import Header from './components/header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto">
        {/* Visible Mesh Glow Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#f8fafc]">
          {/* Primary Navy Glow - Top Right */}
          <div className="absolute -top-[5%] -right-[5%] w-[45%] h-[45%] bg-[#002B5C]/15 rounded-full blur-[100px]" />
          
          {/* Accent Blue Glow - Middle Left */}
          <div className="absolute top-[20%] -left-[10%] w-[35%] h-[35%] bg-blue-400/20 rounded-full blur-[110px]" />
          
          {/* Warm Slate Glow - Bottom Right */}
          <div className="absolute bottom-0 right-[10%] w-[40%] h-[40%] bg-slate-300/30 rounded-full blur-[90px]" />
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