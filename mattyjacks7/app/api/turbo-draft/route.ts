import { NextResponse } from "next/server";
import OpenAI from "openai";

const WICKED_MODELS = {
  liquid: { id: "liquid/lfm-40b:free", name: "Liquid LFM 40B" },
  toppy: { id: "undi95/toppy-m-7b:free", name: "Toppy M 7B" },
  mythomax: { id: "gryphe/mythomax-l2-13b:free", name: "MythoMax L2 13B" },
};

export async function POST(request: Request) {
  try {
    const { messages, fantasy, nickname = "Master" } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API Key missing. Tell Matt to add OPENROUTER_API_KEY to the environment." }, { status: 503 });
    }

    const openrouter = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

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

    const draftMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-8)
    ];

    let response;
    try {
      response = await openrouter.chat.completions.create({
        model: WICKED_MODELS.mythomax.id, 
        messages: draftMessages,
        max_tokens: 300,
      });
    } catch(e) {
      console.warn("MythoMax failed, falling back to Toppy", e);
      response = await openrouter.chat.completions.create({
        model: WICKED_MODELS.toppy.id, 
        messages: draftMessages,
        max_tokens: 300,
      });
    }

    let text = response.choices[0]?.message?.content || "";
    // Clean up if the AI accidentally adds prefixes
    text = text.replace(/^User:\s*/i, '').replace(/^Boss:\s*/i, '').replace(/^\[User\]\s*/i, '');

    return NextResponse.json({ draft: text.trim() });

  } catch (error) {
    console.error("[TURBO DRAFT ERROR]", error);
    return NextResponse.json({ error: "Draft generation failed. The AI might be rate limited." }, { status: 500 });
  }
}
