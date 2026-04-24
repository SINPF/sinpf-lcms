import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative font-sans overflow-hidden">
      
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" style={{backgroundImage: "url('/bg.jpg')"}} />
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-slate-100" />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-100">
        {/* Header: Minimal & Balanced */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-center">
            <h1 className="text-slate-900 text-xl font-semibold tracking-tight">
              Legal Case Management
            </h1>
            <p className="text-slate-500 text-xs mt-1.5 font-medium tracking-wide uppercase">
              Secure Justice Portal
            </p>
          </div>
        </div>

        {/* Content Card: Sharp & Elevated */}
        <div className="bg-white border border-slate-200 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-1">
             {children}
          </div>
        </div>

        {/* Footer: Clean Institutional Identity */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Official Access
            </span>
            <div className="h-px w-8 bg-slate-200" />
          </div>
          
          <p className="text-[11px] text-slate-500 font-medium max-w-50 mx-auto leading-relaxed">
            Solomon Islands National <br /> Provident Fund
          </p>
        </div>
      </div>
    </div>
  );
}