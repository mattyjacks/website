import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchControlPlane } from "@/lib/givegigs-control-plane";

export async function GET(request: NextRequest) {
  const appParam = request.nextUrl.searchParams.get("app")?.trim().toLowerCase();
  const app = appParam === "givegigs" ||
    appParam === "mattyjacks" ||
    appParam === "cryptartist-studio" ||
    appParam === "cryptartist-website" ||
    appParam === "venturecapitalarts"
    ? appParam
    : "mattyjacks";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = await fetchControlPlane({
      app,
      supabaseId: user?.id ?? null,
      email: user?.email ?? null,
    });

    if (!payload) {
      return NextResponse.json(
        {
          error: "Unable to load GiveGigs control plane status",
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
        error: "Failed to proxy control plane",
      },
      { status: 500 }
    );
  }
}
