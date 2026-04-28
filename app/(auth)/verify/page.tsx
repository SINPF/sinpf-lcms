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
    focusInput(Math.min(pasted.length - 1, OTP_LENGTH - 1));
    if (pasted.length === OTP_LENGTH) {
      submitCode(next);
    }
  };

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
    <div className="bg-background/80 dark:bg-slate-900/60 rounded-2xl p-10 shadow-xl border border-border backdrop-blur-md">
      {/* Logo */}
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

      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-foreground text-xl font-bold font-heading mb-1">Check your email</h2>
        <p className="text-muted-foreground text-sm font-sans">
          We sent a 6-digit code to{" "}
          <span className="font-bold text-primary dark:text-primary-foreground">{email || "your email"}</span>.
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
              className={`w-11 h-13 text-center text-xl font-bold border rounded-lg transition-all duration-200
                text-foreground bg-background focus:outline-none focus:ring-2
                ${error
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-border focus:ring-primary/20 focus:border-primary"
                }
                ${digit ? "bg-primary/5 dark:bg-primary/10 border-primary" : ""}
              `}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-sm text-red-500 font-bold">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground py-2.5 px-6 rounded-lg font-bold transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 font-heading"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify & Sign In"
          )}
        </button>
      </form>

      {/* Resend */}
      <p className="mt-6 text-center text-sm text-muted-foreground font-sans">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          className="text-primary dark:text-secondary font-bold hover:opacity-80 transition-opacity underline-offset-4 hover:underline"
        >
          Resend
        </button>
      </p>

      {/* Back to login */}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <a
          href="/login"
          className="hover:text-foreground transition-colors underline-offset-4 hover:underline flex items-center justify-center gap-1"
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
        <div className="bg-background/80 rounded-2xl p-10 border border-border flex justify-center items-center min-h-[320px]">
          <span className="inline-block w-6 h-6 border-2 border-border border-t-secondary rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyForm />
    </Suspense>
  );
}