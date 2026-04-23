"use client";

import { useEffect } from "react";

export default function EmbedPage() {
  useEffect(() => {
    // Hide all site chrome (nav, footer, wrapper) for clean embed
    const style = document.createElement("style");
    style.id = "embed-hide-chrome";
    style.textContent = `
      nav, footer, header { display: none !important; }
      .min-h-screen { min-height: 0 !important; padding: 0 !important; margin: 0 !important; }
      body { background: transparent !important; }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("embed-hide-chrome");
      if (el) el.remove();
    };
  }, []);

  return null; // The global AnythingButton from root layout handles everything
}
