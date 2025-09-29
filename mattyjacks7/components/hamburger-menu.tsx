"use client";

import { cn } from "../lib/utils";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export default function HamburgerMenu({ isOpen, onClick, className }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 w-10 h-10 rounded-lg",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
        "transition-colors duration-200",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6 mx-auto">
        {/* Top line */}
        <span
          className={cn(
            "absolute left-0 block w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 rounded-full",
            "transition-all duration-300 ease-in-out",
            isOpen
              ? "top-3 rotate-45 transform"
              : "top-1"
          )}
        />

        {/* Middle line */}
        <span
          className={cn(
            "absolute left-0 top-3 block w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 rounded-full",
            "transition-all duration-300 ease-in-out",
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        />

        {/* Bottom line */}
        <span
          className={cn(
            "absolute left-0 block w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 rounded-full",
            "transition-all duration-300 ease-in-out",
            isOpen
              ? "top-3 -rotate-45 transform"
              : "top-5"
          )}
        />
      </div>
    </button>
  );
}