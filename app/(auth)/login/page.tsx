import React from 'react';

export default function LoginPage() {
  // SINPF Brand Palette: 
  // Primary: #002B5C (Navy)
  // Accent: #F9C80E (Gold/Yellow)

  return (
    <div className="min-h-screen w-full bg-[#f4f7fa] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Architectural Element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-transparent to-white/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#002B5C] shadow-2xl shadow-[#002B5C]/20 flex items-center justify-center rounded-2xl mb-6">
            <span className="text-white font-black text-xl tracking-tighter">NPF</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-[#002B5C] text-2xl font-bold tracking-tight">
              Judiciary Management
            </h1>
            <p className="text-slate-400 text-[11px] uppercase tracking-[0.3em] font-semibold mt-1">
              Legal Division Portal
            </p>
          </div>
        </div>

        {/* The Card */}
        <div className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,43,92,0.05)]">
          <div className="mb-10 text-center">
            
            <p className="text-slate-600 text-sm">Welcome back. Please sign in to access case files.</p>
          </div>

          <div className="space-y-6">
            {/* The Sole Action: Microsoft Login */}
            <button
              type="button"
              className="group relative w-full flex items-center justify-center gap-4 bg-[#002B5C] hover:bg-[#001f42] text-white py-4.5 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-[#002B5C]/10 hover:shadow-[#002B5C]/20 active:scale-[0.98]"
            >
              <div className="bg-white p-1 rounded-md">
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <path d="M0 0h10v10H0z" fill="#f25022"/>
                  <path d="M11 0h10v10H11z" fill="#7fbb00"/>
                  <path d="M0 11h10v10H0z" fill="#00a4ef"/>
                  <path d="M11 11h10v10H11z" fill="#ffb900"/>
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wide">
                Sign in with Microsoft
              </span>
            </button>
            
            
          </div>
        </div>

        {/* Institutional Footer */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-[#002B5C]/60 uppercase tracking-[0.2em] font-bold">
            Solomon Islands National Provident Fund
          </p>
        
        </div>
      </div>
    </div>
  );
}