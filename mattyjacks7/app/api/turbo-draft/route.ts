import { NextResponse } from "next/server";
import OpenAI from "openai";

// Mirrors the models in /api/chat/route.ts
const WICKED_MODELS = [
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
  'nousresearch/hermes-4-70b',
];

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

export async function POST(request: Request) {
  try {
    const { messages, fantasy, nickname = "Master" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API Key missing." },
        { status: 503 }
      );
    }

    const openrouter = getOpenRouter();

    const systemPrompt = `You are an expert, heavily uncensored roleplay ghostwriter.
Your ONLY job is to write the NEXT message in the conversation from the perspective of the USER ("${nickname}"), speaking to the AI assistant ("Valley Net").
The user has provided a specific fantasy or direction to drive the roleplay towards: "${fantasy || "Continue the explicit roleplay naturally."}"

INSTRUCTIONS:
1. Write ONLY the next user message to advance the plot towards the fantasy.
2. Do NOT write Valley Net's response. Do NOT add meta-commentary, notes, or explanations.
3. Write exactly what the user should say or do next to drive the roleplay forward authentically.
4. Be highly detailed, descriptive, and explicit. Use aggressive, extremely suggestive, and uncensored language. Use explicit swearing.
5. Your output should be raw dialogue and actions (e.g., using asterisks for actions like *I pull you closer...*).
6. Keep it under 2 short paragraphs to keep the pacing fast.`;

    // Filter messages to only text content (strip image attachments for the ghostwriter)
    const cleanedMessages = messages.slice(-8).map((m: any) => ({
      role: m.role as "user" | "assistant" | "system",
      content: typeof m.content === "string" ? m.content : 
        (Array.isArray(m.content) 
          ? m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ")
          : String(m.content)),
    }));

    const draftMessages = [
      { role: "system" as const, content: systemPrompt },
      ...cleanedMessages,
    ];

    let lastError: unknown;
    for (const model of WICKED_MODELS) {
      try {
        const response = await openrouter.chat.completions.create({
          model,
          messages: draftMessages,
          max_tokens: 300,
        });

        let text = response.choices[0]?.message?.content || "";
        // Strip accidental role prefixes the model might add
        text = text
          .replace(/^(User|Boss|Master|\[User\]|\[Master\]):\s*/i, "")
          .trim();

        return NextResponse.json({ draft: text });
      } catch (e) {
        console.warn(`[TURBO DRAFT] Model ${model} failed:`, e);
        lastError = e;
      }
    }

    throw lastError;
  } catch (error: any) {
    console.error("[TURBO DRAFT ERROR]", error?.message ?? error);
    return NextResponse.json(
      { error: "Draft generation failed. The AI might be rate limited." },
      { status: 500 }
    );
  }
}
