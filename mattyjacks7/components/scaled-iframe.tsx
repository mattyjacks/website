"use client";

import { useEffect, useRef, useState } from "react";

interface ScaledIframeProps {
  src: string;
  title?: string;
  targetWidth?: number;
  className?: string;
}

export default function ScaledIframe({ 
  src, 
  title = "Iframe", 
  targetWidth = 1280,
  className = "" 
}: ScaledIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      // Calculate scale needed to fit targetWidth into containerWidth
      const newScale = containerWidth / targetWidth;
      setScale(newScale);
    };

    // Initial calculation
    updateScale();

    // Observe resize
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, [targetWidth]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <div
        style={{
          width: `${targetWidth}px`,
          height: `${(1 / scale) * 100}%`, // Compensate height for scale
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="absolute top-0 left-0"
      >
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
