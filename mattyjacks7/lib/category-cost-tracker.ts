// Category-based Cost Tracker - Tracks API costs by category with Supabase persistence
import { createClient } from "@/lib/supabase/server";

export const COST_CATEGORIES = [
  'MattyJacks',
  'GiveGigs',
  'CryptArtist',
  'Other',
  'Unknown',
  'OpenServ',
  'Personal',
  'Coding',
  'Weird',
  'Marketing',
  'Mischief'
] as const;

export type CostCategory = typeof COST_CATEGORIES[number];

interface CategoryCostData {
  requests: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  totalCost: number;
}

interface CategorizedCost {
  categories: CostCategory[];
  reasoning: string;
}

// In-memory cache (synced with Supabase)
let categoryStats: Record<CostCategory, CategoryCostData> = {} as Record<CostCategory, CategoryCostData>;

// Initialize all categories in memory
for (const category of COST_CATEGORIES) {
  categoryStats[category] = {
    requests: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    totalCost: 0
  };
}

export async function trackCategorizedCost(
  categorizedCost: CategorizedCost,
  inputTokens: number,
  outputTokens: number,
  totalCost: number
): Promise<void> {
  const numCategories = categorizedCost.categories.length;
  const costPerCategory = totalCost / numCategories;
  const inputTokensPerCategory = inputTokens / numCategories;
  const outputTokensPerCategory = outputTokens / numCategories;

  try {
    const supabase = await createClient();

    for (const category of categorizedCost.categories) {
      // Update in-memory cache
      if (!categoryStats[category]) {
        categoryStats[category] = {
          requests: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          totalCost: 0
        };
      }

      const stats = categoryStats[category];
      stats.requests += 1 / numCategories;
      stats.inputTokens += inputTokensPerCategory;
      stats.outputTokens += outputTokensPerCategory;
      stats.totalTokens += inputTokensPerCategory + outputTokensPerCategory;
      stats.totalCost += costPerCategory;

      // Persist to Supabase
      const { data: existing } = await supabase
        .from("api_costs")
        .select("*")
        .eq("category", category)
        .single();

      if (existing) {
        await supabase
          .from("api_costs")
          .update({
            requests: existing.requests + 1 / numCategories,
            input_tokens: existing.input_tokens + inputTokensPerCategory,
            output_tokens: existing.output_tokens + outputTokensPerCategory,
            total_tokens: existing.total_tokens + inputTokensPerCategory + outputTokensPerCategory,
            total_cost: existing.total_cost + costPerCategory,
          })
          .eq("category", category);
      } else {
        await supabase.from("api_costs").insert({
          category,
          requests: 1 / numCategories,
          input_tokens: inputTokensPerCategory,
          output_tokens: outputTokensPerCategory,
          total_tokens: inputTokensPerCategory + outputTokensPerCategory,
          total_cost: costPerCategory,
        });
      }
    }
  } catch (error) {
    console.error("Failed to track categorized cost in Supabase:", error);
    // Fallback to in-memory only
    for (const category of categorizedCost.categories) {
      if (!categoryStats[category]) {
        categoryStats[category] = {
          requests: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          totalCost: 0
        };
      }

      const stats = categoryStats[category];
      stats.requests += 1 / numCategories;
      stats.inputTokens += inputTokensPerCategory;
      stats.outputTokens += outputTokensPerCategory;
      stats.totalTokens += inputTokensPerCategory + outputTokensPerCategory;
      stats.totalCost += costPerCategory;
    }
  }
}

export function getCategoryStats(): Record<CostCategory, CategoryCostData> {
  return { ...categoryStats };
}

export function getCategoryBreakdown(): Array<{
  category: CostCategory;
  cost: number;
  percentage: number;
  requests: number;
}> {
  const totalCost = Object.values(categoryStats).reduce(
    (sum, stats) => sum + stats.totalCost,
    0
  );

  return COST_CATEGORIES.map(category => ({
    category,
    cost: categoryStats[category].totalCost,
    percentage: totalCost > 0 ? (categoryStats[category].totalCost / totalCost) * 100 : 0,
    requests: Math.round(categoryStats[category].requests * 100) / 100
  })).filter(item => item.cost > 0);
}

export function resetCategoryStats(): void {
  for (const category of COST_CATEGORIES) {
    categoryStats[category] = {
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      totalCost: 0
    };
  }
}
