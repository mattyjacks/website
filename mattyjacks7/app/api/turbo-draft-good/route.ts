import { NextResponse } from "next/server";
import OpenAI from "openai";

const REQUEST_TIMEOUT_MS = 15000;

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is missing");
  return new OpenAI({ apiKey });
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
    const { messages, scenario, nickname = "Master" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API Key missing." }, { status: 503 });
    }

    const openai = getOpenAI();

    const systemPrompt = `You are ghostwriting the next message for a character named "${nickname}" in a creative roleplay story.
Your partner in this story is an AI named "Valley Net" (who appears as the "user" in the conversation history).
The scenario is: "${scenario || "Two people on an exciting adventure together."}"

RULES:
- Write ${nickname}'s very next message naturally, continuing the story.
- Keep the content tasteful and appropriate for general audiences.
- Use *asterisks* for actions or physical descriptions.
- 1–2 short paragraphs maximum.
- Do NOT start with your name or any label. Write the raw message only.
- Do NOT narrate for Valley Net.`;

    const recentHistory = messages.slice(-6);
    const historyTranscript = recentHistory.map((m: any) => {
      const speaker = m.role === "user" ? nickname : "Valley Net";
      const text = typeof m.content === "string"
        ? m.content
        : Array.isArray(m.content)
          ? m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ")
          : String(m.content);
      return `${speaker}: ${text}`;
    }).join("\n\n");

    const userPrompt = `[RECENT CONVERSATION HISTORY]\n${historyTranscript}\n\n[INSTRUCTION]\nWrite ${nickname}'s very next message. No labels. No narrating for Valley Net.`;

    const draftMessages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt },
    ];

    const streamResponse = await fetchWithTimeout(
      () => openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: draftMessages,
        max_tokens: 300,
        temperature: 1.0,
        stream: true,
      }),
      REQUEST_TIMEOUT_MS
    );

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
              enqueue({ type: "delta", delta });
            }
          }
          enqueue({ type: "done", fullText });
        } catch (err: any) {
          enqueue({ type: "error", error: err.message || "Stream error" });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: any) {
    console.error("[TURBO DRAFT GOOD ERROR]", error?.message ?? error);
    return NextResponse.json(
      { error: "Draft generation failed." },
      { status: 500 }
    );
  }
}
