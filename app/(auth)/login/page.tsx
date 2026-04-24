import Image from "next/image";
import logo from "@/public/logo.png";

export default function Page() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
  {/* The parent must have relative positioning and a set height/width for 'fill' to work */}
  <div className="relative h-16 w-48"> 
    <Image
      src={logo}
      alt="SINPF Logo" 
      fill
      sizes="(max-width: 768px) 100vw, 200px"
      className="object-contain"
      priority // Highly recommended for logos/LCP elements
    />
  </div>
</div>

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
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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