"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = getCookie("cookie_consent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie for 30 days
    setCookie("cookie_consent", "accepted", 30);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cookie-slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-cookie-slide-up {
          animation: cookie-slide-up 0.4s ease-out;
        }
      `}} />
      <div
        className="fixed bottom-0 left-0 right-0 z-[100] animate-cookie-slide-up"
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
              {/* Left side: Message and Privacy link */}
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1.5">
                  We gave you free cookies! 🍪🍪🍪 You agree to enjoy them!
                </p>
                <Link
                  href="/privacy"
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>

              {/* Right side: Accept button */}
              <button
                onClick={handleAccept}
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                aria-label="Accept cookies"
              >
                Delicious! 😄
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Cookie utility functions
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
