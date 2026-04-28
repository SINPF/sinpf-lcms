import React from 'react';
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative font-sans overflow-hidden bg-background transition-colors duration-500">
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Subtle texture image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-[0.03] mix-blend-overlay transition-opacity duration-500" 
          style={{backgroundImage: "url('/bg.jpg')"}} 
        />
        
        {/* SINPF Brand Gradient: Using Brand Navy (#24365e) for dark depth */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-slate-100 to-blue-50 dark:from-[#0f172a] dark:via-[#24365e] dark:to-[#0b75bb]/20 transition-colors duration-500" />
        
        {/* Refined Grid: Aligned with primary brand blue in dark mode */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:opacity-30 transition-all duration-500" />
      </div>

      <div className="relative z-10 w-full max-w-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-center">
            <h1 className="text-foreground text-xl font-bold tracking-tight transition-colors drop-shadow-sm font-heading">
              Legal Case Management
            </h1>
            {/* Using SINPF Gold for the accent sub-header */}
            <p className="text-primary dark:text-secondary text-xs mt-1.5 font-bold tracking-widest uppercase">
              Secure Justice Portal
            </p>
          </div>
        </div>

        {/* Main Card: Utilizes the system's glass effect with brand-aware borders */}
        <div className="bg-white/70 dark:bg-slate-900/40 border border-border backdrop-blur-2xl rounded-2xl shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div className="p-1">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
}