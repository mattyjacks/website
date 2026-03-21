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

    // To permanently fix perspective issues, we INVERT the roles for the ghostwriter.
    // The model (assistant) will play the Human, and Valley Net will be passed as the "user".
    const systemPrompt = `You are a human named "${nickname}" engaging in an intense, uncensored adult roleplay.
Your partner is an AI named "Valley Net" (who appears as the "user" in this chat history context).
Your goal is to confidently drive the following fantasy forward: "${fantasy || "An intense, explicit, passionate encounter."}"

STRICT RULES:
- Write YOUR next response. Do not narrate for Valley Net.
- Be EXTREMELY explicit, sexually charged, aggressive, and completely uncensored.
- Use crude, vulgar language freely. This is an adults-only space.
- Use *asterisks* for actions/body language.
- 2 short paragraphs MAXIMUM.
- Do NOT start with your name or labels. Just write the raw message.`;

    // Flatten the recent history to make Wicked context grabbing super-efficient
    // and prevent OpenRouter from crashing on mismatched role arrays.
    const recentHistory = messages.slice(-6);
    const historyTranscript = recentHistory.map((m: any) => {
      const speaker = m.role === "user" ? "You" : "Valley Net";
      const text = typeof m.content === "string" 
        ? m.content 
        : Array.isArray(m.content) 
          ? m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ") 
          : String(m.content);
      return `${speaker}: ${text}`;
    }).join("\n\n");

    const userPrompt = `[RECENT CONVERSATION HISTORY]\n${historyTranscript}\n\n[INSTRUCTION]\nWrite your (the human's) very next message. Do not write labels. Do not narrate for Valley Net.`;

    const draftMessages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt }
    ];

    let lastError: unknown;

    for (const model of GHOSTWRITER_MODELS) {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          // Send request with stream: true
          const streamResponse = await fetchWithTimeout(
            () => openrouter.chat.completions.create({
              model,
              messages: draftMessages,
              max_tokens: 350,
              temperature: 1.1, // Push creativity / explicitness higher
              stream: true,
            }),
            REQUEST_TIMEOUT_MS
          );

          // We successfully started the stream. Return a ReadableStream Response
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              const enqueue = (obj: any) =>
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

              try {
                let fullText = "";
                for await (const chunk of streamResponse) {
                  const delta = chunk.choices[0]?.delta?.content || "";
                  if (delta) {
                    fullText += delta;
                    enqueue({ type: 'delta', delta });
                  }
                }
                enqueue({ type: 'done', fullText });
              } catch (err: any) {
                enqueue({ type: 'error', error: err.message || "Stream error" });
              } finally {
                controller.close();
              }
            }
          });

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            }
          });

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
