"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "../lib/utils";

type MobileControlPlanePayload = {
  user: {
    canControlEcosystem: boolean;
    accessMode: string;
  };
  admin: {
    url: string;
  };
};

type MobileAppsPayload = {
  apps?: { id: string }[];
};

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [controlPlane, setControlPlane] = useState<MobileControlPlanePayload | null>(null);
  const [ecosystemAppCount, setEcosystemAppCount] = useState(0);

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

  useEffect(() => {
    let cancelled = false;

    const loadControlPlane = async () => {
      try {
        const response = await fetch("/api/givegigs/control-plane?app=mattyjacks", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;
        const payload = (await response.json()) as MobileControlPlanePayload;

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
          const appsPayload = (await appsResponse.json()) as MobileAppsPayload;
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

          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/services"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/merchants"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Merchant Services
                </Link>
              </li>
              <li>
                <Link
                  href="/resumes"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Resume Sites
                </Link>
              </li>
              <li>
                <Link
                  href="/internship"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Internships
                </Link>
              </li>
              <li>
                <a
                  href="https://givegigs.com"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  GiveGigs
                </a>
              </li>
              <li>
                <a
                  href="https://venturecapitalarts.com"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  VentureCapitalArts
                </a>
              </li>
              <li>
                <a
                  href="https://cryptartist.com"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  CryptArtist
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex-shrink-0 p-6 border-t border-zinc-200/70 dark:border-zinc-800/60">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">GiveGigs Control Plane</p>
                <p className="mt-1 text-xs">
                  Mode: {controlPlane?.user.accessMode ?? "syncing"}
                </p>
                <p className="text-xs">
                  Admin: {controlPlane?.user.canControlEcosystem ? "granted" : "not granted"}
                </p>
                <p className="text-xs">
                  Apps: {ecosystemAppCount > 0 ? ecosystemAppCount : "syncing"}
                </p>
                {controlPlane?.admin?.url ? (
                  <a
                    href={controlPlane.admin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-xs text-blue-600 dark:text-sky-400 hover:underline"
                  >
                    Open GiveGigs Admin
                  </a>
                ) : null}
              </div>
              <p className="font-medium">Contact Us</p>
              <a
                href="tel:+16039999420"
                className="block mt-1 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
              >
                (603) 999-9420
              </a>
              <a
                href="mailto:Matt@MattyJacks.com"
                className="block mt-1 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
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