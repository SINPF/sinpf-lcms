"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (error) {
        setError(error.message ?? "Something went wrong. Please try again.");
      } else {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
      {/* Yellow top bar */}
      <div className="h-1.5 bg-brand-yellow" />

      <div className="p-8">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="relative h-14 w-44">
            <Image
              src="/sinpf-logo.png"
              alt="SINPF Logo"
              fill
              sizes="176px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mb-8">
          Welcome back. Sign in to access case files.
        </p>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[11px] font-black text-slate-500 uppercase tracking-widest"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@sinpf.org.sb"
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium text-slate-800 bg-slate-50
                placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all
                ${error
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-slate-200 focus:ring-brand-blue/20 focus:border-brand-blue"
                }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white text-sm font-semibold
              shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 active:scale-[0.99] disabled:opacity-60
              disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Sending code…
              </>
            ) : (
              "Send One-Time Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
