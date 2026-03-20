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

    try {
      // Local storage tracking for the "You" column in Clout Calculations
      const pageKey = `mj_views_${path}`;
      const siteKey = `mj_views_total`;
      
      const pageCount = parseInt(localStorage.getItem(pageKey) || "0", 10) + 1;
      localStorage.setItem(pageKey, pageCount.toString());
      
      const totalCount = parseInt(localStorage.getItem(siteKey) || "0", 10) + 1;
      localStorage.setItem(siteKey, totalCount.toString());
    } catch {
      // Ignore localStorage errors (e.g. privacy mode)
    }
  }, []);

  return null; // This component doesn't render anything
}
