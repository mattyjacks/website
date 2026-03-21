// Conversation Auto-Renamer - Uses gpt-5.4-nano to rename conversations
// Renames once per minute unless manually renamed by user since last open

export interface ConversationRenameData {
  lastRenamedAt: number;
  lastOpenedAt: number;
  wasManuallyRenamed: boolean;
}

export async function renameConversation(
  messages: Array<{ role: string; content: string }>,
  currentTitle: string,
  renameData: ConversationRenameData | null
): Promise<{ newTitle: string; updated: boolean }> {
  // Automatic renaming disabled to prevent resource exhaustion
  // Return current title without attempting to rename
  return { newTitle: currentTitle, updated: false };
}

export async function manuallyRenameConversation(
  messages: Array<{ role: string; content: string }>,
  currentTitle: string
): Promise<{ newTitle: string; updated: boolean }> {
  // Manual rename - only called when user explicitly requests it
  if (messages.length === 0) {
    return { newTitle: currentTitle, updated: false };
  }

  try {
    const response = await fetch("/api/rename-conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, currentTitle })
    });

    if (!response.ok) {
      console.error("Failed to rename conversation:", response.statusText);
      return { newTitle: currentTitle, updated: false };
    }

    const data = await response.json();
    return data;
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
