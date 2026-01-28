import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#f4f7fa] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Architectural Element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-transparent to-white/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Shared Institutional Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-16 bg-[#002B5C] shadow-2xl shadow-[#002B5C]/20 flex items-center justify-center rounded-2xl mb-6">
            <span className="text-white font-black text-xl tracking-tighter">SINPF</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-[#002B5C] text-2xl font-bold tracking-tight">
              Legal Case Management Portal
            </h1>
          </div>
        </div>

        {/* Page Content (The Card) */}
        {children}

        {/* Shared Institutional Footer */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-[#002B5C]/60 uppercase tracking-[0.2em] font-bold">
            Solomon Islands National Provident Fund
          </p>
        </div>
      </div>
    </div>
  );
}