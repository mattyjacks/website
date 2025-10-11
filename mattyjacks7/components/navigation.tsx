"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MobileSidebar from "./mobile-sidebar";
import HamburgerMenu from "./hamburger-menu";
import ThemeToggle from "./theme-toggle";

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
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center">
          {/* Left: Logo */}
          <div className="flex-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
            </motion.div>
          </div>

          {/* Center: Theme Toggle */}
          <div className="hidden lg:flex flex-1 justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Right: Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-end gap-6 text-sm">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/resumes" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Resume Sites
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/leads" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Free Leads
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/manual" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Manual
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-red-500 transition-colors"
              >
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-red-500 text-sm transition-colors"
              >
                Contact
              </Link>
            </motion.div>
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