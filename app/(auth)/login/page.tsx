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
    <div className="bg-background/80 dark:bg-slate-900/60 rounded-2xl p-10 shadow-xl border border-border backdrop-blur-md">
      <div className="flex justify-center mb-6">
        <div className="relative h-16 w-48">
          <Image
            src="/sinpf-logo.png"
            alt="SINPF Logo"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain dark:brightness-110"
            priority
          />
        </div>
      </div>

      <div className="mb-10 text-center">
        <p className="text-muted-foreground text-sm font-sans">
          Welcome back. Please sign in to access case files.
        </p>
      </div>

      <form onSubmit={signInHandler} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2 font-sans">
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
            className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 text-foreground transition-colors duration-200 font-sans
              ${error
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-border focus:ring-primary/20 focus:border-primary"
              }`}
          />

          {error && (
            <p className="mt-2 text-sm text-red-500 font-semibold">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground py-2.5 px-6 rounded-lg font-bold transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 font-heading"
        >
          {isLoading ? (
            <>
              {/* Using brand gold for the loading spinner for high-visibility brand touch */}
              <span className="inline-block w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
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