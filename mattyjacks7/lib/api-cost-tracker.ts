// API Cost Tracker - Tracks requests, tokens, and costs across all models
// Shared across all users (logged in and anonymous)

interface ModelPricing {
  inputCostPer1kTokens: number;
  outputCostPer1kTokens: number;
}

interface ModelStats {
  requests: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  totalCost: number;
}

interface CostTrackerData {
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  totalCost: number;
  modelStats: Record<string, ModelStats>;
  openservPrompts: number;
  openservCost: number;
  lastUpdated: number;
}

// Model pricing (as of March 2026)
const MODEL_PRICING: Record<string, ModelPricing> = {
  'gpt-5.4-mini-2026-03-17': {
    inputCostPer1kTokens: 0.075,
    outputCostPer1kTokens: 0.3
  },
  'gpt-5-mini-2025-08-07': {
    inputCostPer1kTokens: 0.05,
    outputCostPer1kTokens: 0.15
  },
  'gpt-4o-mini': {
    inputCostPer1kTokens: 0.075,
    outputCostPer1kTokens: 0.3
  },
  'gpt-5.4-nano': {
    inputCostPer1kTokens: 0.02,
    outputCostPer1kTokens: 0.08
  }
};

// In-memory storage (in production, use database)
let trackerData: CostTrackerData = {
  totalRequests: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalTokens: 0,
  totalCost: 0,
  modelStats: {},
  openservPrompts: 0,
  openservCost: 0,
  lastUpdated: Date.now()
};

export function trackApiCall(
  model: string,
  inputTokens: number,
  outputTokens: number,
  isOpenserv: boolean = false
): void {
  const pricing = MODEL_PRICING[model];
  if (!pricing) {
    console.warn(`Unknown model for cost tracking: ${model}`);
    return;
  }

  const inputCost = (inputTokens / 1000) * pricing.inputCostPer1kTokens;
  const outputCost = (outputTokens / 1000) * pricing.outputCostPer1kTokens;
  const totalCost = inputCost + outputCost;

  // Update global stats
  trackerData.totalRequests += 1;
  trackerData.totalInputTokens += inputTokens;
  trackerData.totalOutputTokens += outputTokens;
  trackerData.totalTokens += inputTokens + outputTokens;
  trackerData.totalCost += totalCost;
  trackerData.lastUpdated = Date.now();

  // Update model-specific stats
  if (!trackerData.modelStats[model]) {
    trackerData.modelStats[model] = {
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      totalCost: 0
    };
  }

  const stats = trackerData.modelStats[model];
  stats.requests += 1;
  stats.inputTokens += inputTokens;
  stats.outputTokens += outputTokens;
  stats.totalTokens += inputTokens + outputTokens;
  stats.totalCost += totalCost;

  // Track OpenServ separately
  if (isOpenserv) {
    trackerData.openservPrompts += 1;
    trackerData.openservCost += totalCost;
  }
}

export function getTrackerData(): CostTrackerData {
  return { ...trackerData };
}

export function getOpenservStats(): { prompts: number; cost: number } {
  return {
    prompts: trackerData.openservPrompts,
    cost: parseFloat(trackerData.openservCost.toFixed(2))
  };
}

export function getModelStats(model: string): ModelStats | null {
  return trackerData.modelStats[model] || null;
}

export function getAllModelStats(): Record<string, ModelStats> {
  return { ...trackerData.modelStats };
}

export function getSummary(): string {
  const totalCostFormatted = trackerData.totalCost.toFixed(2);
  const openservCostFormatted = trackerData.openservCost.toFixed(2);
  
  return `API Usage Summary:
- Total Requests: ${trackerData.totalRequests}
- Total Tokens: ${trackerData.totalTokens.toLocaleString()}
  - Input: ${trackerData.totalInputTokens.toLocaleString()}
  - Output: ${trackerData.totalOutputTokens.toLocaleString()}
- Total Cost: $${totalCostFormatted}
- OpenServ Prompts: ${trackerData.openservPrompts}
- OpenServ Cost: $${openservCostFormatted}`;
}

export function resetStats(): void {
  trackerData = {
    totalRequests: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalTokens: 0,
    totalCost: 0,
    modelStats: {},
    openservPrompts: 0,
    openservCost: 0,
    lastUpdated: Date.now()
  };
}
