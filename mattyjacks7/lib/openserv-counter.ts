// OpenServ Prompt Counter - Tracks OpenServ-related prompts globally
// Shared across all users (logged in and anonymous)

interface OpenservCounterData {
  totalPrompts: number;
  totalCost: number;
  lastUpdated: number;
}

// In-memory storage (in production, use database)
let counterData: OpenservCounterData = {
  totalPrompts: 0,
  totalCost: 0,
  lastUpdated: Date.now()
};

export function incrementOpenservCounter(cost: number): void {
  counterData.totalPrompts += 1;
  counterData.totalCost += cost;
  counterData.lastUpdated = Date.now();
}

export function getOpenservCounter(): OpenservCounterData {
  return { ...counterData };
}

export function getOpenservMessage(): string | null {
  // 10% chance to show the message
  if (Math.random() > 0.1) {
    return null;
  }

  const cost = counterData.totalCost.toFixed(2);
  const promptNum = counterData.totalPrompts;
  
  return `\n\n---\n✨ **This is the ${promptNum}th OpenServ prompt.** MattyJacks has spent $${cost} teaching OpenServ. 🚀\n---`;
}

export function resetCounter(): void {
  counterData = {
    totalPrompts: 0,
    totalCost: 0,
    lastUpdated: Date.now()
  };
}
