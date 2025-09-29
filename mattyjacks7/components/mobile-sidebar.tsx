"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "../lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the main content but allow sidebar content to scroll if needed
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        )}
        style={{
          background: "rgba(0, 0, 0, 0.1)",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
        }}
        onClick={handleBackdropClick}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-50 transition-transform duration-300 ease-in-out",
          "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md",
          "border-l border-zinc-200/70 dark:border-zinc-800/60",
          "shadow-xl",
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        )}
        style={{
          width: "min(20rem, 85vw)", // 320px or 85% of viewport width
          right: 0,
          top: 0,
        }}
      >
        <div className="flex flex-col h-full max-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200/70 dark:border-zinc-800/60">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 overflow-hidden">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/resumes"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Resume Sites
                </Link>
              </li>
              <li>
                <Link
                  href="/leads"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Leads
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 p-6 border-t border-zinc-200/70 dark:border-zinc-800/60">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <p className="font-medium">Contact Us</p>
              <a
                href="tel:+16039999420"
                className="block mt-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                (603) 999-9420
              </a>
              <a
                href="mailto:Matt@MattyJacks.com"
                className="block mt-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Matt@MattyJacks.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}