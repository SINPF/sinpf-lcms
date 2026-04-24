"use client"; // Mandatory for onClick and Lucide icons

import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <img 
          src="/logo.png" 
          alt="SINPF Logo" 
          className="h-12 w-auto"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        
        {/* Security Icon */}
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-blue-600 text-xl font-bold tracking-tight">Access Restricted</h2>
        
        <div className="mt-4 space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            Your account is authenticated, but you are not currently authorized to view the Legal Case Management System.
          </p>
          
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-left">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-600/80 leading-relaxed">
              <strong className="block mb-1">Administrative Action Required:</strong> 
              If you require access to this portal, please consult the <span className="font-bold"> IT Department</span> to update your security group permissions.
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-blue-100 my-8" />

        {/* Action Section */}
        <div className="flex flex-col gap-4 w-full">
          <Link
            href="/login"
            className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline"
          >
            Return to Login
          </Link>
        </div>
      </div>
      
     
    </div>
  );
}