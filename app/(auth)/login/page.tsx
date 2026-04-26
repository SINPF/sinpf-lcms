"use client"; 

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"; 

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = async (e: React.FormEvent) => {
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
    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
      <div className="flex justify-center mb-6">
        <div className="relative h-16 w-48">
          <Image
            src="/sinpf-logo.png"
            alt="SINPF Logo"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="mb-10 text-center">
        <p className="text-slate-600 text-sm">
          Welcome back. Please sign in to access case files.
        </p>
      </div>

      <form onSubmit={signInHandler} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-black transition-colors duration-200
              ${error
                ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                : "border-blue-200 focus:ring-blue-500/20 focus:border-blue-500"
              }`}
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending code…
            </>
          ) : (
            "Send One-Time Code"
          )}
        </button>
      </form>
    </div>
  );
}