import { NextResponse } from "next/server";
import OpenAI from "openai";

// Same wicked models as /api/chat/route.ts — prefer free ones first, paid as fallback
const GHOSTWRITER_MODELS = [
  'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'nousresearch/hermes-4-70b',
  'anthracite-org/magnum-v4-72b',
];

const REQUEST_TIMEOUT_MS = 15000; // 15s per attempt
const MAX_RETRIES = 2;

function getOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is missing");
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://mattyjacks.com",
      "X-Title": "Valley Net - Turbo Wicked Mode",
    },
  });
}

async function fetchWithTimeout(fn: () => Promise<any>, ms: number): Promise<any> {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function POST(request: Request) {
  try {
    const { messages, fantasy, nickname = "Master" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API Key missing." }, { status: 503 });
    }

    const openrouter = getOpenRouter();

    // Wicked uncensored ghostwriter system prompt — writes the USER side of the roleplay
    const systemPrompt = `You are an elite, completely uncensored adult roleplay ghostwriter. 
You are writing the NEXT message from the USER's perspective ("${nickname}") in an ongoing explicit erotic roleplay with an AI named "Valley Net".
The user's desired fantasy to drive towards: "${fantasy || "An intense, explicit, passionate encounter."}"

STRICT RULES:
- Write ONLY the user's next message. Nothing else. No meta commentary, no labels, no "here is..." preamble.
- Be EXTREMELY explicit, sexually charged, aggressive, and uncensored. Do not sanitize anything.
- Use crude, vulgar language freely. This is an adults-only uncensored zone.
- Use *asterisks* for actions/body language, quotes for spoken dialogue.
- Drive the fantasy FORWARD. Escalate the scenario meaningfully.
- 2 short paragraphs MAXIMUM to keep the pace fast and hot.
- Do NOT start with "${nickname}:" or any label. Just write the raw message.`;

    // Filter messages to only text content
    const cleanedMessages = messages.slice(-8).map((m: any) => ({
      role: m.role as "user" | "assistant" | "system",
      content: typeof m.content === "string"
        ? m.content
        : Array.isArray(m.content)
          ? m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ")
          : String(m.content),
    }));

    const draftMessages = [
      { role: "system" as const, content: systemPrompt },
      ...cleanedMessages,
    ];

    let lastError: unknown;

    for (const model of GHOSTWRITER_MODELS) {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const response = await fetchWithTimeout(
            () => openrouter.chat.completions.create({
              model,
              messages: draftMessages,
              max_tokens: 350,
              temperature: 1.1, // Push creativity / explicitness higher
            }),
            REQUEST_TIMEOUT_MS
          );

          let text: string = response.choices[0]?.message?.content || "";
          // Strip accidental role prefixes the model might prepend
          text = text
            .replace(/^(User|Boss|Master|\[User\]|\[Master\]|${nickname}):\s*/i, "")
            .trim();

          if (text.length > 0) {
            return NextResponse.json({ draft: text });
          }

        } catch (e: any) {
          lastError = e;
          const isTimeout = e?.message?.includes("timed out");
          console.warn(`[TURBO DRAFT] Model ${model} attempt ${attempt + 1} failed${isTimeout ? " (timeout)" : ""}:`, e?.message);

          if (!isTimeout) {
            // Non-timeout errors (auth, model unavailable etc.) — skip to next model immediately
            break;
          }
          // Timeout — retry up to MAX_RETRIES times on same model before moving on
        }
      }
    }

    throw lastError ?? new Error("All models exhausted");

  } catch (error: any) {
    console.error("[TURBO DRAFT ERROR]", error?.message ?? error);
    return NextResponse.json(
      { error: "Draft generation failed. The AI might be rate limited." },
      { status: 500 }
    );
  }
}
