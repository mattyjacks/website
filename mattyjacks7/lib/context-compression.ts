// Context Compression - Sliding window system for long conversations
// Compresses old conversation history with GPT-5.4 nano to preserve context while reducing tokens

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  images?: any[];
}

export interface CompressionConfig {
  maxTokensPerMessage: number;
  compressionThreshold: number; // Number of messages before compression kicks in
  keepRecentMessages: number; // Always keep this many recent messages uncompressed
  maxCompressedSummaryTokens: number;
}

const DEFAULT_CONFIG: CompressionConfig = {
  maxTokensPerMessage: 500, // Rough estimate: 1 token ≈ 4 chars
  compressionThreshold: 20, // Compress when >20 messages
  keepRecentMessages: 8, // Always keep last 8 messages
  maxCompressedSummaryTokens: 1000
};

// Rough token estimation (1 token ≈ 4 characters)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export async function compressConversationHistory(
  messages: ChatMessage[],
  config: CompressionConfig = DEFAULT_CONFIG
): Promise<ChatMessage[]> {
  // Don't compress if below threshold
  if (messages.length < config.compressionThreshold) {
    return messages;
  }

  // Keep recent messages uncompressed
  const recentMessages = messages.slice(-config.keepRecentMessages);
  const oldMessages = messages.slice(0, -config.keepRecentMessages);

  if (oldMessages.length === 0) {
    return messages;
  }

  // Check if old messages need compression
  const oldTokens = oldMessages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
  if (oldTokens < config.maxCompressedSummaryTokens) {
    return messages; // Not worth compressing
  }

  try {
    // Compress old conversation history
    const compressedSummary = await compressMessages(oldMessages);
    
    if (!compressedSummary) {
      return messages; // If compression fails, return original
    }

    // Create a synthetic "summary" message
    const summaryMessage: ChatMessage = {
      id: `compressed_${Date.now()}`,
      role: "assistant",
      content: compressedSummary,
      timestamp: oldMessages[0].timestamp,
    };

    // Return compressed history + recent messages
    return [summaryMessage, ...recentMessages];
  } catch (error) {
    console.error('Context compression error:', error);
    return messages; // Return original on error
  }
}

async function compressMessages(messages: ChatMessage[]): Promise<string | null> {
  try {
    const conversationText = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content.slice(0, 500)}`)
      .join('\n\n');

    const response = await fetch('/api/compress-context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation: conversationText,
        maxTokens: DEFAULT_CONFIG.maxCompressedSummaryTokens
      })
    });

    if (!response.ok) {
      console.error('Compression API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.compressed || null;
  } catch (error) {
    console.error('Error calling compression API:', error);
    return null;
  }
}

export function shouldCompress(messages: ChatMessage[], config: CompressionConfig = DEFAULT_CONFIG): boolean {
  if (messages.length < config.compressionThreshold) {
    return false;
  }

  const totalTokens = messages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
  return totalTokens > config.maxCompressedSummaryTokens * 2; // Compress when 2x the max
}
