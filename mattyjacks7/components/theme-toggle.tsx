"use client";

import React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => setMounted(true), []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-900 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-300/30 dark:bg-zinc-100/10 dark:text-zinc-100 dark:hover:bg-zinc-100/20"
        disabled
      >
        {/* Placeholder content to maintain layout */}
        <div className="h-4 w-4 opacity-50" />
        <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-300/40" aria-hidden />
        <div className="h-4 w-4 opacity-60" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-900 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-300/30 dark:bg-zinc-100/10 dark:text-zinc-100 dark:hover:bg-zinc-100/20"
    >
      {/* Sun icon */}
      <svg
        className={`h-4 w-4 ${isDark ? "opacity-50" : "opacity-100"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
      </svg>
      {/* Toggle Separator */}
      <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-300/40" aria-hidden />
      {/* Moon icon */}
      <svg
        className={`h-4 w-4 ${isDark ? "opacity-100" : "opacity-60"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}
