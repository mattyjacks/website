import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { selectRelevantContext, isOpenservQuery } from "@/lib/openserv-rag";
import { trackApiCall } from "@/lib/api-cost-tracker";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid query parameter" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Check if this is an OpenServ-related query
    if (!isOpenservQuery(query)) {
      return NextResponse.json(
        { context: "", isOpenserv: false },
        { headers: SECURITY_HEADERS }
      );
    }

    // Select relevant context from RAG documents
    const ragContext = selectRelevantContext(query);

    // If we have RAG context, use gpt-5.4-nano to summarize it
    if (ragContext) {
      const openai = getOpenAI();
      const systemPrompt = `You are a helpful assistant that provides concise, accurate information about OpenServ.
You have access to OpenServ documentation. Your job is to extract the most relevant information to answer the user's question.
Keep your response brief (2-3 sentences max) and focused on what the user asked.
Do NOT make up information - only use what's in the provided documentation.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.4-nano",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Documentation:\n${ragContext}\n\nQuestion: ${query}` }
        ],
        max_tokens: 200,
        temperature: 0.3
      });

      // Track API costs
      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      trackApiCall("gpt-5.4-nano", inputTokens, outputTokens, true);

      const summary = response.choices[0]?.message?.content || ragContext;

      return NextResponse.json(
        {
          context: summary,
          isOpenserv: true,
          source: "quick-context-rag"
        },
        { headers: SECURITY_HEADERS }
      );
    }

    // No RAG context found, return empty
    return NextResponse.json(
      { context: "", isOpenserv: true, source: "no-docs" },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    console.error("Quick context error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to process quick context request" },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
