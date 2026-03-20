// Conversation Auto-Renamer - Uses gpt-5.4-nano to rename conversations
// Renames once per minute unless manually renamed by user since last open

import OpenAI from "openai";

export interface ConversationRenameData {
  lastRenamedAt: number;
  lastOpenedAt: number;
  wasManuallyRenamed: boolean;
}

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  return new OpenAI({ apiKey });
}

const RENAME_SYSTEM_PROMPT = `You are a conversation title generator. Your job is to create a concise, descriptive title for a conversation based on its messages.

Rules:
- Title should be 3-7 words maximum
- Be specific and descriptive
- Use present tense when possible
- No quotes or special characters
- Make it memorable and clear
- Avoid generic titles like "Chat" or "Conversation"

Respond with ONLY the title text, nothing else.`;

export async function renameConversation(
  messages: Array<{ role: string; content: string }>,
  currentTitle: string,
  renameData: ConversationRenameData | null
): Promise<{ newTitle: string; updated: boolean }> {
  // Check if we should rename
  if (renameData) {
    const now = Date.now();
    const timeSinceLastRename = now - renameData.lastRenamedAt;
    const oneMinute = 60 * 1000;

    // Don't rename if:
    // 1. Less than 1 minute has passed since last rename
    // 2. User manually renamed it since last open
    if (timeSinceLastRename < oneMinute && renameData.wasManuallyRenamed) {
      return { newTitle: currentTitle, updated: false };
    }
  }

  // Don't rename if no messages
  if (messages.length === 0) {
    return { newTitle: currentTitle, updated: false };
  }

  try {
    const openai = getOpenAI();

    // Create a summary of the conversation for the AI to title
    const conversationSummary = messages
      .slice(-10) // Use last 10 messages for context
      .map((m) => `${m.role}: ${m.content.slice(0, 100)}`)
      .join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-5.4-nano",
      messages: [
        { role: "system", content: RENAME_SYSTEM_PROMPT },
        { role: "user", content: `Conversation:\n${conversationSummary}` }
      ],
      max_tokens: 20,
      temperature: 0.7
    });

    const newTitle = (response.choices[0]?.message?.content || "").trim();

    // Validate the title
    if (newTitle && newTitle.length > 0 && newTitle.length < 100) {
      return { newTitle, updated: true };
    }

    return { newTitle: currentTitle, updated: false };
  } catch (error) {
    console.error("Conversation rename error:", error);
    return { newTitle: currentTitle, updated: false };
  }
}

export function createRenameData(): ConversationRenameData {
  const now = Date.now();
  return {
    lastRenamedAt: now,
    lastOpenedAt: now,
    wasManuallyRenamed: false
  };
}

export function updateRenameDataOnOpen(
  data: ConversationRenameData
): ConversationRenameData {
  return {
    ...data,
    lastOpenedAt: Date.now(),
    wasManuallyRenamed: false // Reset on open
  };
}

export function markAsManuallyRenamed(
  data: ConversationRenameData
): ConversationRenameData {
  return {
    ...data,
    wasManuallyRenamed: true,
    lastRenamedAt: Date.now()
  };
}

export function shouldAttemptRename(data: ConversationRenameData | null): boolean {
  if (!data) return true;

  const now = Date.now();
  const timeSinceLastRename = now - data.lastRenamedAt;
  const oneMinute = 60 * 1000;

  // Only rename if 1+ minute has passed since last rename
  return timeSinceLastRename >= oneMinute;
}
