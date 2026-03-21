import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY missing" }, { status: 503, headers: SECURITY_HEADERS });
    }

    const formData = await request.formData();
    const file = formData.get("file") as Blob;
    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400, headers: SECURITY_HEADERS });
    }

    // Reject tiny/silent blobs before hitting Whisper (saves API cost and prevents spam)
    if (file.size < 5000) {
      return NextResponse.json({ text: "" }, { headers: SECURITY_HEADERS });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a File-like object required by openai package
    const fileForOpenAI = await OpenAI.toFile(buffer, 'audio.webm', { type: file.type || 'audio/webm' });

    const transcription = await openai.audio.transcriptions.create({
      file: fileForOpenAI,
      model: "whisper-1",
    });

    return NextResponse.json({ text: transcription.text }, { headers: SECURITY_HEADERS });
  } catch (error: any) {
    const msg = error?.message ?? String(error);
    console.error("Transcription error:", msg);
    return NextResponse.json({ error: `Transcription failed: ${msg}` }, { status: 500, headers: SECURITY_HEADERS });
  }
}
