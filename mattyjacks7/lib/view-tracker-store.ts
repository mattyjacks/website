// In-memory view tracking store
// This will be reset on server restart, but that's acceptable for this use case

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

// Global store
const views: PageView[] = [];
const pageStats: PageStats = {};

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

export function recordView(path: string, userAgent: string): void {
  const viewerType = detectViewerType(userAgent);

  views.push({
    path,
    viewerType,
    timestamp: Date.now(),
    userAgent,
  });

  // Update page stats
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
  return views.length;
}
