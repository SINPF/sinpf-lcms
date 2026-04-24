"use client"; // 1. Necessary for interactive elements

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react"; // 2. Import useState to hold the email

export default function Page() {
  const [email, setEmail] = useState(""); // 3. The "grabber" state

  const signInHandler = async (e: React.SubmitEvent) => {
    console.log(email)
    e.preventDefault(); // 4. Prevent the page from refreshing
    
    const { data, error} = await authClient.emailOtp.sendVerificationOtp({
      email: email, 
      type: "sign-in",
    });

    if (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    } else {
      alert("Check your email for the code!");
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

      {/* 6. Use onSubmit on the form instead of onClick on the button */}
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
            value={email} // 7. Bind the value to state
            onChange={(e) => setEmail(e.target.value)} // 8. Update state as user types
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}