import React from 'react';

export default function Page() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,43,92,0.05)] border border-slate-100">
      <div className="mb-10 text-center">
        <p className="text-slate-600 text-sm">
          Welcome back. Please sign in to access case files.
        </p>
      </div>

      <div className="space-y-6">
        <button
          type="button"
          className="cursor-pointer group relative w-full flex items-center justify-center gap-4 bg-[#002B5C] hover:bg-[#001f42] text-white py-4.5 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-[#002B5C]/10 hover:shadow-[#002B5C]/20 active:scale-[0.98]"
        >
          <div className="bg-white p-1 rounded-md">
            <svg className="w-4 h-4" viewBox="0 0 21 21">
              <path d="M0 0h10v10H0z" fill="#f25022" />
              <path d="M11 0h10v10H11z" fill="#7fbb00" />
              <path d="M0 11h10v10H0z" fill="#00a4ef" />
              <path d="M11 11h10v10H11z" fill="#ffb900" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wide">
            Sign in with Microsoft
          </span>
        </button>
      </div>
    </div>
  );
}