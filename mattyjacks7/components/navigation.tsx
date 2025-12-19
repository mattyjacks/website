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
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-zinc-200/70 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center relative">
          {/* LEFT: Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center" aria-label="Home">
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

          {/* TRUE CENTER: Theme Toggle (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div whileHover={{ scale: 1.1 }}>
              <ThemeToggle />
            </motion.div>
          </div>

          {/* RIGHT: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm ml-auto">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/services" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/merchants" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Merchant Services
              </Link>
            </motion.div>
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1"
              >
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              {isMoreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-2 z-50">
                  <Link
                    href="/leads"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Free Leads
                  </Link>
                  <Link
                    href="/resumes"
                    className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Resume Sites
                  </Link>
                </div>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-red-500 transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* MOBILE: Theme + Contact button + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden ml-auto">
            <motion.div whileHover={{ scale: 1.1 }}>
              <ThemeToggle />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 transition-colors"
              >
                Contact
              </Link>
            </motion.div>
            <HamburgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} />
          </div>
        </div>
      </header>

      <MobileSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}