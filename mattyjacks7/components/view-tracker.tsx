"use client";

import { useEffect } from "react";

export default function ViewTracker() {
  useEffect(() => {
    // Skip tracking for API routes and internal navigation
    const path = window.location.pathname;
    
    if (path.startsWith("/api") || path.startsWith("/_")) {
      return;
    }

    // Track view - allow multiple views per page per session
    // Each page load/refresh will record a new view
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch((err) => console.error("View tracking failed:", err));
  }, []);

  return null; // This component doesn't render anything
}
