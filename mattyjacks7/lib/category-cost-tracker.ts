// Category-based Cost Tracker - Tracks API costs by category
// Categories: MattyJacks, GiveGigs, CryptArtist, Other, Unknown, OpenServ, Personal, Coding, Weird, Marketing, Mischief

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

interface CategoryTrackerData {
  categoryStats: Record<CostCategory, CategoryCostData>;
  lastUpdated: number;
}

// In-memory storage (in production, use database)
let trackerData: CategoryTrackerData = {
  categoryStats: {} as Record<CostCategory, CategoryCostData>,
  lastUpdated: Date.now()
};

// Initialize all categories
for (const category of COST_CATEGORIES) {
  trackerData.categoryStats[category] = {
    requests: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    totalCost: 0
  };
}

export function trackCategorizedCost(
  categorizedCost: CategorizedCost,
  inputTokens: number,
  outputTokens: number,
  totalCost: number
): void {
  const numCategories = categorizedCost.categories.length;
  const costPerCategory = totalCost / numCategories;
  const inputTokensPerCategory = inputTokens / numCategories;
  const outputTokensPerCategory = outputTokens / numCategories;

  for (const category of categorizedCost.categories) {
    if (!trackerData.categoryStats[category]) {
      trackerData.categoryStats[category] = {
        requests: 0,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        totalCost: 0
      };
    }

    const stats = trackerData.categoryStats[category];
    stats.requests += 1 / numCategories;
    stats.inputTokens += inputTokensPerCategory;
    stats.outputTokens += outputTokensPerCategory;
    stats.totalTokens += inputTokensPerCategory + outputTokensPerCategory;
    stats.totalCost += costPerCategory;
  }

  trackerData.lastUpdated = Date.now();
}

export function getCategoryStats(): Record<CostCategory, CategoryCostData> {
  return { ...trackerData.categoryStats };
}

export function getCategoryBreakdown(): Array<{
  category: CostCategory;
  cost: number;
  percentage: number;
  requests: number;
}> {
  const totalCost = Object.values(trackerData.categoryStats).reduce(
    (sum, stats) => sum + stats.totalCost,
    0
  );

  return COST_CATEGORIES.map(category => ({
    category,
    cost: trackerData.categoryStats[category].totalCost,
    percentage: totalCost > 0 ? (trackerData.categoryStats[category].totalCost / totalCost) * 100 : 0,
    requests: Math.round(trackerData.categoryStats[category].requests * 100) / 100
  })).filter(item => item.cost > 0);
}

export function resetCategoryStats(): void {
  for (const category of COST_CATEGORIES) {
    trackerData.categoryStats[category] = {
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      totalCost: 0
    };
  }
  trackerData.lastUpdated = Date.now();
}
