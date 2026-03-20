"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";

interface ViewStats {
  humans: number;
  bots: number;
  unknown: number;
  total: number;
}

interface PageStats {
  [path: string]: ViewStats;
}

interface ApiCostStats {
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  totalCost: number;
  openservPrompts: number;
  openservCost: number;
}

interface CategoryCostBreakdown {
  category: string;
  cost: number;
  percentage: number;
  requests: number;
}

export default function CloutCalculations() {
  const [pageStats, setPageStats] = useState<PageStats>({});
  const [siteStats, setSiteStats] = useState<ViewStats>({
    humans: 0,
    bots: 0,
    unknown: 0,
    total: 0,
  });
  const [apiCostStats, setApiCostStats] = useState<ApiCostStats>({
    totalRequests: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalTokens: 0,
    totalCost: 0,
    openservPrompts: 0,
    openservCost: 0,
  });
  const [categoryCosts, setCategoryCosts] = useState<CategoryCostBreakdown[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [userPageViews, setUserPageViews] = useState<number>(1);
  const [userSiteViews, setUserSiteViews] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Static GA4 number - update manually as needed
  const GA4_TOTAL_HUMANS = 2353;

  useEffect(() => {
    const path = window.location.pathname || "/";
    setCurrentPath(path);
    
    let isComponentMounted = true;
    let pendingRequests = 0;
    const MAX_PENDING_REQUESTS = 1;
    
    // Fetch view stats with timeout
    const fetchStats = async () => {
      // Prevent request pileup
      if (pendingRequests >= MAX_PENDING_REQUESTS) {
        return;
      }

      pendingRequests++;

      // Read local user stats
      try {
        const pageKey = `mj_views_${path}`;
        const siteKey = `mj_views_total`;
        const localPage = parseInt(localStorage.getItem(pageKey) || "0", 10);
        const localSite = parseInt(localStorage.getItem(siteKey) || "0", 10);
        // Display at least 1 if the program is working (meaning they are currently on the page)
        setUserPageViews(Math.max(1, localPage));
        setUserSiteViews(Math.max(1, localSite));
      } catch {
        // Fallback if localStorage is disabled
        setUserPageViews(1);
        setUserSiteViews(1);
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const [viewRes, costRes] = await Promise.all([
          fetch("/api/views", { signal: controller.signal }),
          fetch("/api/category-costs", { signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        if (!viewRes.ok || !costRes.ok) {
          throw new Error("API response not ok");
        }

        const [viewData, costData] = await Promise.all([
          viewRes.json(),
          costRes.json()
        ]);

        if (isComponentMounted) {
          if (viewData.allStats) {
            setPageStats((prev) => viewData.allStats || prev);
          }
          if (viewData.siteStats) {
            setSiteStats((prev) => viewData.siteStats || prev);
          }
          if (costData.categoryBreakdown && costData.categoryBreakdown.length > 0) {
            setCategoryCosts((prev) => costData.categoryBreakdown || prev);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        if (isComponentMounted) {
          setLoading(false);
        }
      } finally {
        pendingRequests--;
      }
    };

    fetchStats();

    // Refresh stats every 4.20 seconds to show live updates
    const interval = setInterval(fetchStats, 4200);
    
    return () => {
      isComponentMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getDisplayPath = (path: string): string => {
    if (path === "/" || path === "") return "/ (home)";
    return path;
  };

  const currentPageStats = pageStats[currentPath] || {
    humans: 0,
    bots: 0,
    unknown: 0,
    total: 0,
  };

  const cloutPercentage = siteStats.total > 0
    ? ((currentPageStats.total / siteStats.total) * 100).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <div className="mt-10 px-6 py-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm animate-pulse">
        <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mb-6"></div>
        <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
        <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 sm:px-6 py-8 bg-white dark:bg-zinc-950/40 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-xl shadow-black/5 overflow-hidden relative z-0 pointer-events-auto">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          Clout Calculations
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">
            Live
          </span>
        </h3>
        
        <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-sm font-medium text-emerald-800 dark:text-emerald-300 shadow-sm">
          This page holds <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{cloutPercentage}%</span> of total clout
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Website Visits Since 3/19/2026 AD:</span> 
          <span className="font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">{siteStats.total}</span>
          <span className="text-xs text-zinc-500">(Self-Reported)</span>
          
          <div className="relative group inline-flex items-center ml-1">
            <Info className="w-4 h-4 text-zinc-400 hover:text-emerald-500 cursor-help transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-medium px-3 py-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none text-center">
              The holy day of March 19th in the year of our lord (Anno Domini) 2026
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Total Humans Visited:</span> 
          <span className="font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">{GA4_TOTAL_HUMANS}</span>
          <span className="text-xs text-zinc-500">(Google Analytics)</span>

          <div className="relative group inline-flex items-center ml-1">
            <Info className="w-4 h-4 text-zinc-400 hover:text-blue-500 cursor-help transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-medium px-3 py-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none text-center">
              July 18th, 2025 - March 19th, 2026
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3">
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-2">API Cost Tracking</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded px-2 py-1.5">
              <div className="text-sky-600 dark:text-sky-400 font-bold">{apiCostStats.totalRequests}</div>
              <div className="text-zinc-600 dark:text-zinc-400 text-[10px]">Requests</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded px-2 py-1.5">
              <div className="text-purple-600 dark:text-purple-400 font-bold">${apiCostStats.totalCost.toFixed(2)}</div>
              <div className="text-zinc-600 dark:text-zinc-400 text-[10px]">Total Cost</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded px-2 py-1.5">
              <div className="text-orange-600 dark:text-orange-400 font-bold">{apiCostStats.openservPrompts}</div>
              <div className="text-zinc-600 dark:text-zinc-400 text-[10px]">OpenServ</div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded px-2 py-1.5">
              <div className="text-rose-600 dark:text-rose-400 font-bold">${apiCostStats.openservCost.toFixed(2)}</div>
              <div className="text-zinc-600 dark:text-zinc-400 text-[10px]">OpenServ Cost</div>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-2">
            Tokens: {apiCostStats.totalTokens.toLocaleString()} ({apiCostStats.totalInputTokens.toLocaleString()} in, {apiCostStats.totalOutputTokens.toLocaleString()} out)
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3">
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">Cost by Category</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {categoryCosts.length > 0 ? (
              categoryCosts.map((cat) => (
                <div key={cat.category} className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-2 hover:shadow-md transition-shadow">
                  <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">{cat.category}</div>
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">${cat.cost.toFixed(2)}</div>
                  <div className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-1">
                    <div>{cat.percentage.toFixed(1)}% of total</div>
                    <div>{cat.requests.toFixed(1)} req</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-xs text-zinc-500 dark:text-zinc-400 py-4">
                No category data yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table border radius wrapper */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">
                  Page
                </th>
                <th className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-right uppercase tracking-wider text-xs bg-emerald-50/50 dark:bg-emerald-900/10">
                  You
                </th>
                <th className="py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400 text-right uppercase tracking-wider text-xs">
                  Humans
                </th>
                <th className="py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400 text-right uppercase tracking-wider text-xs">
                  Bots
                </th>
                <th className="py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400 text-right uppercase tracking-wider text-xs">
                  Unknown
                </th>
                <th className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100 text-right uppercase tracking-wider text-xs">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {/* Current page row */}
              <tr className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100 font-medium">
                  {getDisplayPath(currentPath)}
                </td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold text-right bg-emerald-50/30 dark:bg-emerald-900/10">
                  {userPageViews}
                </td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 text-right font-mono">
                  {currentPageStats.humans}
                </td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 text-right font-mono">
                  {currentPageStats.bots}
                </td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 text-right font-mono">
                  {currentPageStats.unknown}
                </td>
                <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100 text-right font-mono text-[15px]">
                  {currentPageStats.total}
                </td>
              </tr>

              {/* Entire site row */}
              <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-t-2 border-zinc-200 dark:border-zinc-800">
                <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100 font-bold">
                  Entire Site
                </td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold text-right bg-emerald-50/50 dark:bg-emerald-900/20">
                  {userSiteViews}
                </td>
                <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200 text-right font-mono">
                  {siteStats.humans}
                </td>
                <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200 text-right font-mono">
                  {siteStats.bots}
                </td>
                <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200 text-right font-mono">
                  {siteStats.unknown}
                </td>
                <td className="py-3 px-4 font-extrabold text-zinc-900 dark:text-zinc-100 text-right font-mono text-[15px]">
                  {siteStats.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
