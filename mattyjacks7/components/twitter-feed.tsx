"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TWEET_IDS = [
  "2019984353409847619",
  "2034681421063725133",
  "2035074263233798468",
  "2036426709491134486",
  "2036511764611752349",
];

function initTweets() {
  if (typeof window !== "undefined" && (window as any).twttr?.widgets) {
    (window as any).twttr.widgets.load();
  }
}

export default function TwitterFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initTweets();
    const t1 = setTimeout(initTweets, 800);
    const t2 = setTimeout(initTweets, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        onLoad={initTweets}
      />
      <style>{`.tweet-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-9 h-9 rounded-full bg-zinc-800 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          className="tweet-scroll flex items-center overflow-x-auto gap-4 pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TWEET_IDS.map((id) => (
            <div
              key={id}
              className="flex-shrink-0 snap-start flex flex-col rounded-2xl overflow-hidden border border-zinc-700/50"
              style={{
                width: "320px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              {/* Real Twitter embed — renders full tweet with images */}
              <blockquote
                className="twitter-tweet"
                data-theme="dark"
                data-dnt="true"
                data-conversation="none"
                data-width="320"
              >
                <a href={`https://twitter.com/MattyJacksX/status/${id}?ref_src=twsrc%5Etfw`}>
                  Loading tweet…
                </a>
              </blockquote>

              {/* Follow strip */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-t border-zinc-800 flex-shrink-0">
                <a
                  href={`https://twitter.com/MattyJacksX/status/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-sky-400 transition-colors"
                >
                  View on X ↗
                </a>
                <a
                  href="https://twitter.com/intent/follow?screen_name=MattyJacksX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  Follow
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-9 h-9 rounded-full bg-zinc-800 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}
