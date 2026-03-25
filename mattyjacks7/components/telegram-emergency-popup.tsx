"use client";

import { useEffect, useState } from "react";

type PopupMode = "initial" | "followup" | null;

export default function TelegramEmergencyPopup() {
  const [mode, setMode] = useState<PopupMode>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = getCookie("telegram_popup_dismissed");
    const dismissedAt = getCookie("telegram_popup_dismissed_at");

    if (!dismissed) {
      // First visit - show initial popup after short delay
      const timer = setTimeout(() => {
        setMode("initial");
        setVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Already dismissed - check if 7 days have passed
    if (dismissedAt) {
      const dismissTime = parseInt(dismissedAt, 10);
      const now = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (now - dismissTime >= sevenDays) {
        // 7 days passed - show follow-up
        deleteCookie("telegram_popup_dismissed");
        deleteCookie("telegram_popup_dismissed_at");
        const timer = setTimeout(() => {
          setMode("followup");
          setVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setCookie("telegram_popup_dismissed", "true", 30);
    setCookie("telegram_popup_dismissed_at", String(Date.now()), 30);
    setTimeout(() => setMode(null), 400);
  };

  if (!mode) return null;

  const isFollowup = mode === "followup";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes emergency-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes emergency-border-pulse {
          0%, 100% { border-color: rgba(239, 68, 68, 0.8); box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1); }
          50% { border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 40px rgba(239, 68, 68, 0.5), 0 0 80px rgba(239, 68, 68, 0.2); }
        }
        @keyframes emergency-siren {
          0% { transform: rotate(-8deg) scale(1); }
          25% { transform: rotate(8deg) scale(1.15); }
          50% { transform: rotate(-8deg) scale(1); }
          75% { transform: rotate(8deg) scale(1.15); }
          100% { transform: rotate(-8deg) scale(1); }
        }
        @keyframes emergency-bg-pulse {
          0%, 100% { background-color: rgba(127, 29, 29, 0.95); }
          50% { background-color: rgba(153, 27, 27, 0.98); }
        }
        @keyframes popup-enter {
          from { transform: translate(-50%, -50%) scale(0.85); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes popup-exit {
          from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          to { transform: translate(-50%, -50%) scale(0.85); opacity: 0; }
        }
        @keyframes backdrop-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .emergency-popup-enter {
          animation: popup-enter 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .emergency-popup-exit {
          animation: popup-exit 0.3s ease-in forwards;
        }
        .emergency-backdrop-enter {
          animation: backdrop-enter 0.3s ease-out forwards;
        }
      `}} />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] emergency-backdrop-enter ${!visible ? "opacity-0 pointer-events-none" : ""}`}
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.3s ease",
        }}
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div
        className={`fixed top-1/2 left-1/2 z-[201] w-[95vw] max-w-lg ${visible ? "emergency-popup-enter" : "emergency-popup-exit"}`}
        style={{ transform: "translate(-50%, -50%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Emergency notification"
      >
        <div
          className="relative rounded-2xl border-2 overflow-hidden"
          style={{
            animation: "emergency-border-pulse 1.5s ease-in-out infinite, emergency-bg-pulse 2s ease-in-out infinite",
            borderColor: "rgba(239, 68, 68, 0.8)",
          }}
        >
          {/* Top emergency bar */}
          <div className="flex items-center justify-center gap-2 py-2 px-4 bg-red-600" style={{ animation: "emergency-flash 1s ease-in-out infinite" }}>
            <span className="text-lg" style={{ animation: "emergency-siren 0.6s ease-in-out infinite" }}>🚨</span>
            <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Emergency Notice</span>
            <span className="text-lg" style={{ animation: "emergency-siren 0.6s ease-in-out infinite" }}>🚨</span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 text-center">
            {/* Flashing emergency emojis */}
            <div className="flex justify-center gap-3 mb-4 text-3xl" style={{ animation: "emergency-siren 0.8s ease-in-out infinite" }}>
              <span>🔴</span>
              <span>🆘</span>
              <span>🔴</span>
            </div>

            {isFollowup ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Did you join the Telegram yet?
                </h2>
                <p className="text-red-300 text-sm sm:text-base mb-2 font-medium">
                  WhatsApp is still down. All business operations are on Telegram now.
                </p>
                <p className="text-zinc-400 text-sm mb-6">
                  Don&apos;t miss out - join the Telegram to stay connected!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  <span style={{ animation: "emergency-flash 1.2s ease-in-out infinite" }}>WARNING:</span> WhatsApp Suspended
                </h2>
                <p className="text-red-300 text-sm sm:text-base mb-2 font-medium">
                  Our WhatsApp has been temporarily suspended.
                </p>
                <p className="text-zinc-300 text-sm sm:text-base mb-2">
                  All business operations have been moved to <strong className="text-sky-400">Telegram</strong> effective immediately.
                </p>
                <p className="text-zinc-400 text-sm mb-6">
                  Please join our Telegram to continue receiving updates and communicate with us.
                </p>
              </>
            )}

            {/* Big CTA button */}
            <a
              href="https://t.me/mattyjacks1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/50"
              style={{
                background: "linear-gradient(135deg, #0088cc, #00aaff, #0088cc)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                boxShadow: "0 4px 20px rgba(0, 136, 204, 0.4), 0 0 40px rgba(0, 136, 204, 0.15)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              {isFollowup ? "Join Telegram Now" : "Open Telegram"}
            </a>

            <p className="mt-3 text-zinc-500 text-xs">
              t.me/mattyjacks1
            </p>

            {/* Bottom emergency bar */}
            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-red-400 font-semibold" style={{ animation: "emergency-flash 2s ease-in-out infinite" }}>
              <span>🚨</span>
              <span>URGENT</span>
              <span>-</span>
              <span>MOVE TO TELEGRAM IMMEDIATELY</span>
              <span>🚨</span>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="mt-5 text-zinc-500 hover:text-zinc-300 text-sm underline underline-offset-4 transition-colors"
            >
              I understand, close this
            </button>
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

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}
