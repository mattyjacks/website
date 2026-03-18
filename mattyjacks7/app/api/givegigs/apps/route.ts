import { NextResponse } from "next/server";
import { fetchEcosystemApps } from "@/lib/givegigs-control-plane";

export async function GET() {
  try {
    const payload = await fetchEcosystemApps();

    if (!payload) {
      return NextResponse.json(
        {
          error: "Unable to load GiveGigs ecosystem apps",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to proxy GiveGigs apps",
      },
      { status: 500 }
    );
  }
}
