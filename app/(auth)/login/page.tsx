import React from 'react';

export default function Page() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,43,92,0.05)] border border-slate-100">
      <div className="mb-10 text-center">
        <p className="text-slate-600 text-sm">
          Welcome back. Please sign in to access case files.
        </p>
      </div>

      <form className="space-y-6">
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
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#002B5C] hover:bg-[#001f42] text-white py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#002B5C]/10 hover:shadow-[#002B5C]/20 active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}