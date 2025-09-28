"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileSidebar from "./mobile-sidebar";
import HamburgerMenu from "./hamburger-menu";

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="w-full sticky top-0 z-30 border-b border-zinc-200/70 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="MattyJacks Home">
            <Image
              src="/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png"
              alt="MattyJacks logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/resumes" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Resume Sites
            </Link>
            <Link href="/leads" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Leads
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-emerald-500"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-emerald-500 text-sm"
            >
              Contact
            </Link>
            <HamburgerMenu
              isOpen={isSidebarOpen}
              onClick={handleSidebarToggle}
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
    </>
  );
}