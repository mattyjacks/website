import { NextRequest, NextResponse } from "next/server";
import {
  recordView,
  getPageStats,
  getSiteStats,
  getAllPageStats,
} from "@/lib/view-tracker-store";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "unknown";

    // Record the view with timeout (don't block response on Supabase)
    Promise.race([
      recordView(path, userAgent),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2000))
    ]).catch(err => {
      console.error("View tracking background error:", err);
    });

    // Return current stats immediately (from in-memory cache)
    const pageStats = getPageStats(path);
    const siteStats = getSiteStats();

    return NextResponse.json({
      success: true,
      pageStats,
      siteStats,
    });
  } catch (error) {
    console.error("View stats error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve stats" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get("path");

    if (path) {
      // Get stats for specific page
      const pageStats = getPageStats(path);
      const siteStats = getSiteStats();

      return NextResponse.json({
        pageStats,
        siteStats,
      });
    } else {
      // Get all stats
      const allStats = getAllPageStats();
      const siteStats = getSiteStats();

      return NextResponse.json({
        allStats,
        siteStats,
      });
    }
  } catch (error) {
    console.error("View stats error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve stats" },
      { status: 500 }
    );
  }
}
