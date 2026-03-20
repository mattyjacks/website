import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SECURITY_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
};

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  return new OpenAI({ apiKey });
}

const RENAME_SYSTEM_PROMPT = `You are a conversation title generator. Your job is to create a concise, descriptive title for a conversation based on its messages.

Rules:
- Title should be 3-7 words maximum
- Be specific and descriptive
- Use present tense when possible
- No quotes or special characters
- Make it memorable and clear
- Avoid generic titles like "Chat" or "Conversation"

Respond with ONLY the title text, nothing else.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, currentTitle } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { newTitle: currentTitle, updated: false },
        { headers: SECURITY_HEADERS }
      );
    }

    const openai = getOpenAI();

    // Create a summary of the conversation for the AI to title
    const conversationSummary = messages
      .slice(-10) // Use last 10 messages for context
      .map((m: any) => `${m.role}: ${String(m.content).slice(0, 100)}`)
      .join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-5.4-nano",
      messages: [
        { role: "system", content: RENAME_SYSTEM_PROMPT },
        { role: "user", content: `Conversation:\n${conversationSummary}` }
      ],
      max_tokens: 20,
      temperature: 0.7
    });

    const newTitle = (response.choices[0]?.message?.content || "").trim();

    // Validate the title
    if (newTitle && newTitle.length > 0 && newTitle.length < 100) {
      return NextResponse.json(
        { newTitle, updated: true },
        { headers: SECURITY_HEADERS }
      );
    }

    return NextResponse.json(
      { newTitle: currentTitle, updated: false },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    console.error("Conversation rename error:", error);
    return NextResponse.json(
      { error: "Failed to rename conversation", newTitle: "", updated: false },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
