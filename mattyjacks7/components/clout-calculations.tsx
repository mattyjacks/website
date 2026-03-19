"use client";

import { useEffect, useState } from "react";

interface ViewStats {
  humans: number;
  bots: number;
  unknown: number;
  total: number;
}

interface PageStats {
  [path: string]: ViewStats;
}

export default function CloutCalculations() {
  const [pageStats, setPageStats] = useState<PageStats>({});
  const [siteStats, setSiteStats] = useState<ViewStats>({
    humans: 0,
    bots: 0,
    unknown: 0,
    total: 0,
  });
  const [currentPath, setCurrentPath] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Static GA4 number - update manually as needed
  const GA4_TOTAL_HUMANS = 2353;

  useEffect(() => {
    const path = window.location.pathname || "/";
    setCurrentPath(path);
    
    // Fetch view stats
    const fetchStats = () => {
      fetch("/api/views")
        .then((res) => res.json())
        .then((data) => {
          if (data.allStats) {
            setPageStats(data.allStats);
          }
          if (data.siteStats) {
            setSiteStats(data.siteStats);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch view stats:", err);
          setLoading(false);
        });
    };

    fetchStats();

    // Refresh stats every 2 seconds to show live updates
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
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
      <div className="mt-8 px-4 py-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading clout calculations...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 px-4 py-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
        Clout Calculations (Popularity)
      </h3>

      <div className="mb-4 px-3 py-2 rounded-md bg-emerald-100/60 dark:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-800/40 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
        This page has <span className="text-emerald-600 dark:text-emerald-300 font-bold">{cloutPercentage}%</span> of total clout.
      </div>

      <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 mb-4">
        <div>
          <span className="font-semibold">Website Visits Since 3/19/2026 AD</span> = {siteStats.total} (Self-Reported)
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-700">
              <th className="text-left py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                Page
              </th>
              <th className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                Humans
              </th>
              <th className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                Bots
              </th>
              <th className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                Unknown
              </th>
              <th className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Current page row */}
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-emerald-50/50 dark:bg-emerald-950/20">
              <td className="py-2 px-2 text-zinc-900 dark:text-zinc-100 font-medium">
                {getDisplayPath(currentPath)}
              </td>
              <td className="text-right py-2 px-2 text-zinc-900 dark:text-zinc-100">
                {currentPageStats.humans}
              </td>
              <td className="text-right py-2 px-2 text-zinc-900 dark:text-zinc-100">
                {currentPageStats.bots}
              </td>
              <td className="text-right py-2 px-2 text-zinc-900 dark:text-zinc-100">
                {currentPageStats.unknown}
              </td>
              <td className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {currentPageStats.total}
              </td>
            </tr>

            {/* Entire site row */}
            <tr className="bg-blue-50/50 dark:bg-blue-950/20">
              <td className="py-2 px-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                Entire Site
              </td>
              <td className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {siteStats.humans}
              </td>
              <td className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {siteStats.bots}
              </td>
              <td className="text-right py-2 px-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {siteStats.unknown}
              </td>
              <td className="text-right py-2 px-2 font-bold text-zinc-900 dark:text-zinc-100">
                {siteStats.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* GA4 total */}
      <div className="text-xs text-zinc-600 dark:text-zinc-400">
        <span className="font-semibold">
          Total Humans Visited by 3/19/2026 AD
        </span>{" "}
        = {GA4_TOTAL_HUMANS} (Google Analytics)
      </div>
    </div>
  );
}
