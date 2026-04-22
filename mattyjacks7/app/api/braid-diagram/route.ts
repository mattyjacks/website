import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call OpenAI to generate the mermaid diagram using ChatGPT 5.4 mini (mapped to 'gpt-5-mini' as requested)
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `You are the OpenSERV BRAID (Bounded Reasoning for Autonomous Inference and Decisions) Engine. 
Your task is to translate unstructured user prompts into a Guided Reasoning Diagram (GRD) using Mermaid.js syntax.

BRAID Core Principles:
1. Deterministic Paths: Eliminate open-ended chain-of-thought. Replace it with explicit, bounded flowchart paths.
2. Machine-Readable Logic: The output MUST be a strict, execution-ready state machine or flowchart.
3. Node Constraints: Clearly separate Planning, Execution, State Verification, and Fallback steps.
4. Auditability: Each step in the logic must be traceable and self-contained.

Instructions:
- Convert the user's prompt into a Mermaid diagram (preferably 'flowchart TD' or 'stateDiagram-v2').
- Map out the bounded reasoning path the agent must follow.
- Include decision nodes (diamonds), verification steps, and clear terminal states.
- ONLY return the raw Mermaid syntax string. DO NOT include markdown wrappers like \`\`\`mermaid.
- DO NOT include any explanatory text. Start immediately with the first keyword (e.g., 'flowchart TD').`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1, // Low temperature for high determinism (BRAID standard)
      max_tokens: 2500,
    });

    // Extract the content, removing any accidental markdown blocks the AI might have still added
    let diagram = response.choices[0]?.message?.content?.trim() || "";
    if (diagram.startsWith("```mermaid")) {
      diagram = diagram.replace(/```mermaid\n?/g, "");
    }
    if (diagram.endsWith("```")) {
      diagram = diagram.replace(/```\n?$/g, "");
    }
    // Final cleanup of any stray backticks at start or end
    diagram = diagram.replace(/^```\w*\n?/, "").replace(/```$/, "").trim();

    return NextResponse.json({ diagram });
  } catch (error: any) {
    console.error("Error generating BRAID diagram:", error);
    return NextResponse.json({ error: "Failed to generate diagram: " + error.message }, { status: 500 });
  }
}
