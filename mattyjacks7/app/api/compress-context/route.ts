import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
};

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    // Validate content length
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { error: "Request too large" },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    const body = await request.json();
    const { conversation, maxTokens = 1000 } = body;

    if (!conversation || typeof conversation !== "string") {
      return NextResponse.json(
        { error: "Conversation text is required" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (conversation.length > 10000) {
      return NextResponse.json(
        { error: "Conversation text too long" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const openai = getOpenAI();

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini-2025-08-07", // GPT-5.4 nano equivalent
      messages: [
        {
          role: "system",
          content: `You are an expert at creating concise, structured summaries of conversations. 
Your task is to compress a conversation while preserving all critical information, context, and decisions.
Create a summary that captures:
1. Main topics discussed
2. Key decisions or conclusions
3. Important context or background
4. Any action items or follow-ups
5. Tone and conversation style

Be thorough but concise. Format as a clear narrative that another AI can use to understand the conversation context.`
        },
        {
          role: "user",
          content: `Compress this conversation into a concise summary (max ${maxTokens} tokens):\n\n${conversation}`
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.3 // Lower temperature for more consistent summaries
    });

    const compressed = response.choices[0]?.message?.content || null;

    if (!compressed) {
      return NextResponse.json(
        { error: "Failed to compress conversation" },
        { status: 500, headers: SECURITY_HEADERS }
      );
    }

    return NextResponse.json(
      { compressed },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
