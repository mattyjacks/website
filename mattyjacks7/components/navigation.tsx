"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Network, ShieldCheck, ShieldX } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import HamburgerMenu from "./hamburger-menu";
import ThemeToggle from "./theme-toggle";

type ControlPlaneNavPayload = {
  user: {
    canControlEcosystem: boolean;
    accessMode: string;
  };
  admin: {
    url: string;
  };
};

type EcosystemAppsNavPayload = {
  apps?: { id: string }[];
};

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [controlPlane, setControlPlane] = useState<ControlPlaneNavPayload | null>(null);
  const [ecosystemAppCount, setEcosystemAppCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadControlPlane = async () => {
      try {
        const response = await fetch("/api/givegigs/control-plane?app=mattyjacks", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as ControlPlaneNavPayload;
        if (!cancelled) {
          setControlPlane(payload);
        }
      } catch {
        if (!cancelled) {
          setControlPlane(null);
        }
      } finally {
        try {
          const appsResponse = await fetch("/api/givegigs/apps", {
            method: "GET",
            cache: "no-store",
          });
          if (!appsResponse.ok) return;
          const appsPayload = (await appsResponse.json()) as EcosystemAppsNavPayload;
          if (!cancelled) {
            setEcosystemAppCount(Array.isArray(appsPayload.apps) ? appsPayload.apps.length : 0);
          }
        } catch {
          if (!cancelled) {
            setEcosystemAppCount(0);
          }
        }
      }
    };

    void loadControlPlane();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-zinc-200/70 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
          {/* LEFT: Logo & Theme Picker */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 logo-3d">
              <Link href="/" className="flex items-center logo-3d-inner" aria-label="Home">
                <Image
                  src="/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png"
                  alt="MattyJacks logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="hidden lg:block">
              <motion.div whileHover={{ scale: 1.1 }}>
                <ThemeToggle />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 text-sm">
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/services" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Services
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/internship" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Internship
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="shiny-hover-button rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-red-500 transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
            </motion.div>

            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 py-4"
                onMouseDown={(e) => e.preventDefault()}
              >
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              {isMoreDropdownOpen && (
                <div className="absolute top-[3rem] right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-2 z-[110]">
                  <Link href="/leads" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Free Leads
                  </Link>
                  <Link href="/resumes" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Resume Sites
                  </Link>
                  <Link href="/merchants" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Merchant Accounts
                  </Link>
                  
                  <div className="my-2 border-t border-zinc-200 dark:border-zinc-800"></div>
                  <div className="px-4 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Socials</div>
                  
                  <a href="/whatsapp" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-green-500 transition-colors">
                    WhatsApp
                  </a>
                  <a href="https://givegigs.com/discord" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-500 transition-colors">
                    Discord
                  </a>
                  <a href="https://x.com/MattyJacksX" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-sky-500 transition-colors">
                    Follow on X
                  </a>
                </div>
              )}
            </div>

            <div className="hidden xl:flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs">
              <Network className="w-3.5 h-3.5 text-red-500" />
              <span className="text-zinc-700 dark:text-zinc-300">
                {controlPlane?.user.accessMode ? `GiveGigs: ${controlPlane.user.accessMode}` : "GiveGigs: syncing"}
              </span>
              {ecosystemAppCount > 0 ? (
                <span className="text-zinc-500 dark:text-zinc-400">{ecosystemAppCount} apps</span>
              ) : null}
              {controlPlane?.user.canControlEcosystem ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <ShieldX className="w-3.5 h-3.5 text-amber-500" />
              )}
              {controlPlane?.admin?.url ? (
                <a href={controlPlane.admin.url} target="_blank" rel="noreferrer" className="ml-2 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium">
                  Admin
                </a>
              ) : null}
            </div>
          </nav>

          {/* MOBILE: Theme + Contact button + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden ml-auto">
            <motion.div whileHover={{ scale: 1.1 }}>
              <ThemeToggle />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="shiny-hover-button rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 transition-colors"
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