"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

const OTP_LENGTH = 6;

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // Ref mirrors otp state so handleSubmit always reads the latest value
  // even when called synchronously after a setState (e.g. paste + Enter).
  const otpRef = useRef<string[]>(Array(OTP_LENGTH).fill(""));

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const updateOtp = (next: string[]) => {
    otpRef.current = next;
    setOtp(next);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    updateOtp(next);
    if (value && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => { next[i] = char; });
    updateOtp(next);
    // Focus the last filled box (or last box if fully filled)
    focusInput(Math.min(pasted.length - 1, OTP_LENGTH - 1));
    // Auto-submit if a complete code was pasted
    if (pasted.length === OTP_LENGTH) {
      submitCode(next);
    }
  };

  // Core verification logic — accepts the digits array directly so it can be
  // called right after a state update without waiting for re-render.
  const submitCode = async (digits: string[]) => {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp: code,
      });

      if (error) {
        setError(error.message ?? "Verification failed. Please try again.");
        const blank = Array(OTP_LENGTH).fill("");
        updateOtp(blank);
        focusInput(0);
      } else {
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Always read from the ref — guaranteed to be current even if
    // React hasn't flushed the latest setState yet.
    await submitCode(otpRef.current);
  };

  const handleResend = async () => {
    setError("");
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    if (error) {
      setError(error.message ?? "Could not resend code.");
    } else {
      setOtp(Array(OTP_LENGTH).fill(""));
      focusInput(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
      {/* Logo */}
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

      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-slate-900 text-lg font-semibold mb-1">Check your email</h2>
        <p className="text-slate-500 text-sm">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-slate-700">{email || "your email"}</span>.
          <br />
          Enter it below to sign in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP inputs */}
        <div className="flex justify-center gap-2.5">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              autoFocus={i === 0}
              className={`w-11 h-13 text-center text-xl font-semibold border rounded-lg transition-all duration-200
                text-slate-900 focus:outline-none focus:ring-2
                ${error
                  ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                  : "border-blue-200 focus:ring-blue-500/20 focus:border-blue-500"
                }
                ${digit ? "bg-blue-50" : "bg-white"}
              `}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-sm text-red-600 font-medium">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify & Sign In"
          )}
        </button>
      </form>

      {/* Resend */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 underline-offset-2 hover:underline"
        >
          Resend
        </button>
      </p>

      {/* Back to login */}
      <p className="mt-3 text-center text-sm text-slate-500">
        <a
          href="/login"
          className="text-slate-400 hover:text-slate-600 transition-colors duration-200 underline-offset-2 hover:underline"
        >
          ← Use a different email
        </a>
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl p-10 border border-slate-200 flex justify-center items-center min-h-[320px]">
          <span className="inline-block w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyForm />
    </Suspense>
  );
}
