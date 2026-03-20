import { NextRequest, NextResponse } from "next/server";
import { getCategoryBreakdown } from "@/lib/category-cost-tracker";

const SECURITY_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
};

export async function GET(req: NextRequest) {
  try {
    const categoryBreakdown = getCategoryBreakdown();
    
    return NextResponse.json(
      { categoryBreakdown },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    console.error("Category costs error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to fetch category costs" },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
