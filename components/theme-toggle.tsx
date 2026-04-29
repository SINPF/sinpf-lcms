// components/theme-toggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted] = useState(false)

  // Standard hydration check
  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-900" />
      )}
    </button>
  )
}