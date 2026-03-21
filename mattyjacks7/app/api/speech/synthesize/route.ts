import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY missing" }, { status: 503, headers: SECURITY_HEADERS });
    }

    const { text, model = "tts-1", voice = "nova" } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400, headers: SECURITY_HEADERS });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Use standard OpenAI tts API
    const mp3 = await openai.audio.speech.create({
      model: model as string,
      voice: voice as any,
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        ...SECURITY_HEADERS,
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Synthesis error:", error);
    return NextResponse.json({ error: "TTS failed" }, { status: 500, headers: SECURITY_HEADERS });
  }
}
