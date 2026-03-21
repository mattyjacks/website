// View tracking store with Supabase persistence
import { createClient } from "@/lib/supabase/server";

export type ViewerType = "human" | "bot" | "unknown";

export interface PageView {
  path: string;
  viewerType: ViewerType;
  timestamp: number;
  userAgent: string;
}

export interface ViewStats {
  humans: number;
  bots: number;
  unknown: number;
  total: number;
}

export interface PageStats {
  [path: string]: ViewStats;
}

// In-memory cache (synced with Supabase)
let pageStats: PageStats = {};
let cacheInitialized = false;

// Load stats from Supabase on startup
export async function initializeCache(): Promise<void> {
  if (cacheInitialized) return;
  
  try {
    const supabase = await createClient();
    const { data: stats } = await supabase
      .from("page_view_stats")
      .select("*");
    
    if (stats) {
      for (const stat of stats) {
        pageStats[stat.path] = {
          humans: stat.humans || 0,
          bots: stat.bots || 0,
          unknown: stat.unknown || 0,
          total: stat.total || 0,
        };
      }
    }
    cacheInitialized = true;
  } catch (error) {
    console.error("Failed to initialize view stats cache:", error);
    cacheInitialized = true; // Mark as initialized even on error to avoid retry loops
  }
}

// Bot detection patterns
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /gptbot/i,
  /claudebot/i,
  /anthropic/i,
  /perplexitybot/i,
  /applebot/i,
  /meta-externalagent/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /slackbot/i,
  /discordbot/i,
  /bytespider/i,
  /ccbot/i,
  /amazonbot/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java(?!script)/i,
  /ruby/i,
  /php/i,
  /node/i,
  /go-http-client/i,
  /axios/i,
  /postman/i,
];

export function detectViewerType(userAgent: string): ViewerType {
  if (!userAgent) return "unknown";

  // Check for known bots
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return "bot";
    }
  }

  // Check for common browser signatures
  const browserPatterns = [
    /mozilla/i,
    /chrome/i,
    /safari/i,
    /firefox/i,
    /edge/i,
    /opera/i,
    /windows nt/i,
    /macintosh/i,
    /linux/i,
    /iphone/i,
    /ipad/i,
    /android/i,
  ];

  const hasBrowserSignature = browserPatterns.some((p) =>
    p.test(userAgent)
  );

  return hasBrowserSignature ? "human" : "unknown";
}

export async function recordView(path: string, userAgent: string): Promise<void> {
  const viewerType = detectViewerType(userAgent);

  try {
    const supabase = await createClient();
    
    // Insert into page_views table
    await supabase.from("page_views").insert({
      path,
      viewer_type: viewerType,
      user_agent: userAgent,
      ip_address: "unknown",
    });

    // Update page_view_stats
    const { data: existing } = await supabase
      .from("page_view_stats")
      .select("*")
      .eq("path", path)
      .single();

    if (existing) {
      const updateData: Record<string, any> = {
        total: existing.total + 1,
      };
      if (viewerType === "human") {
        updateData.humans = existing.humans + 1;
      } else if (viewerType === "bot") {
        updateData.bots = existing.bots + 1;
      } else {
        updateData.unknown = existing.unknown + 1;
      }
      
      await supabase
        .from("page_view_stats")
        .update(updateData)
        .eq("path", path);
    } else {
      const newStats = {
        path,
        total: 1,
        humans: viewerType === "human" ? 1 : 0,
        bots: viewerType === "bot" ? 1 : 0,
        unknown: viewerType === "unknown" ? 1 : 0,
      };
      
      await supabase.from("page_view_stats").insert(newStats);
    }

    // Update in-memory cache
    if (!pageStats[path]) {
      pageStats[path] = { humans: 0, bots: 0, unknown: 0, total: 0 };
    }
    const stats = pageStats[path];
    if (viewerType === "human") {
      stats.humans++;
    } else if (viewerType === "bot") {
      stats.bots++;
    } else {
      stats.unknown++;
    }
    stats.total++;
  } catch (error) {
    console.error("Failed to record view in Supabase:", error);
    // Fallback to in-memory only
    if (!pageStats[path]) {
      pageStats[path] = { humans: 0, bots: 0, unknown: 0, total: 0 };
    }
    const stats = pageStats[path];
    if (viewerType === "human") {
      stats.humans++;
    } else if (viewerType === "bot") {
      stats.bots++;
    } else {
      stats.unknown++;
    }
    stats.total++;
  }
}

export function getPageStats(path: string): ViewStats {
  return (
    pageStats[path] || { humans: 0, bots: 0, unknown: 0, total: 0 }
  );
}

export function getSiteStats(): ViewStats {
  const stats: ViewStats = { humans: 0, bots: 0, unknown: 0, total: 0 };

  Object.values(pageStats).forEach((pageView) => {
    stats.humans += pageView.humans;
    stats.bots += pageView.bots;
    stats.unknown += pageView.unknown;
    stats.total += pageView.total;
  });

  return stats;
}

export function getAllPageStats(): PageStats {
  return { ...pageStats };
}

export function getViewCount(): number {
  const stats = getSiteStats();
  return stats.total;
}
