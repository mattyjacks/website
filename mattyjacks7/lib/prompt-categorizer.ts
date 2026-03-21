// Prompt Categorizer - Uses gpt-5.4-nano to categorize prompts
// Assigns 1-3 categories per prompt with reasoning

import OpenAI from "openai";
import { CostCategory, COST_CATEGORIES } from "./category-cost-tracker";

interface CategorizationResult {
  categories: CostCategory[];
  reasoning: string;
}

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  return new OpenAI({ apiKey });
}

const CATEGORIZATION_SYSTEM_PROMPT = `You are a cost categorization assistant. Your job is to analyze user prompts and assign 1-3 relevant categories from this list:
${COST_CATEGORIES.join(", ")}

Categories:
- MattyJacks: Questions about MattyJacks, the person, his projects, or his brand
- GiveGigs: Questions related to GiveGigs platform or features
- CryptArtist: Questions about CryptArtist Studio or related projects
- OpenServ: Questions about OpenServ, agents, or autonomous systems
- Personal: Personal questions, life advice, casual chat
- Coding: Programming, development, technical questions
- Weird: Unusual, strange, or absurd requests
- Marketing: Marketing strategy, branding, promotion
- Mischief: Playful, mischievous, or humorous requests
- Other: General topics not fitting above categories
- Unknown: When you cannot determine the category

Respond in JSON format:
{
  "categories": ["Category1", "Category2"],
  "reasoning": "Brief explanation of why these categories were chosen"
}

Choose 1-3 categories. If multiple categories apply equally, split the cost between them.`;

export async function categorizePrompt(userPrompt: string): Promise<CategorizationResult> {
  try {
    const openai = getOpenAI();
    
    const response = await openai.chat.completions.create({
      model: "gpt-5.4-nano",
      messages: [
        { role: "system", content: CATEGORIZATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 150,
      temperature: 0.3
    });

    const content = response.choices[0]?.message?.content || "";
    
    try {
      const parsed = JSON.parse(content);
      
      // Validate categories
      const validCategories = parsed.categories.filter((cat: string) =>
        COST_CATEGORIES.includes(cat as CostCategory)
      );

      if (validCategories.length === 0) {
        return {
          categories: ["Unknown"],
          reasoning: "Could not determine category"
        };
      }

      return {
        categories: validCategories as CostCategory[],
        reasoning: parsed.reasoning || "Categorized by AI"
      };
    } catch (parseError) {
      console.error("Failed to parse categorization response:", content);
      return {
        categories: ["Unknown"],
        reasoning: "Failed to parse categorization"
      };
    }
  } catch (error) {
    console.error("Categorization error:", error);
    return {
      categories: ["Unknown"],
      reasoning: "Categorization service unavailable"
    };
  }
}

export function getDefaultCategory(): CostCategory {
  return "Unknown";
}
