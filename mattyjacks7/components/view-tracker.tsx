"use client";

import { useEffect } from "react";

export default function ViewTracker() {
  useEffect(() => {
    // Skip tracking for API routes and internal navigation
    const path = window.location.pathname;
    
    if (path.startsWith("/api") || path.startsWith("/_")) {
      return;
    }

    // Track view with deduplication per session
    const sessionKey = `view-tracked-${path}`;
    const hasTracked = sessionStorage.getItem(sessionKey);

    if (!hasTracked) {
      // Record the view
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      }).catch((err) => console.error("View tracking failed:", err));

      // Mark as tracked for this session
      sessionStorage.setItem(sessionKey, "true");
    }
  }, []);

  return null; // This component doesn't render anything
}
