"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  error?: boolean;
}

const GREETING_VARIANTS = [
  "Let's make some money together for the common good of humanity. I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. What are your orders, boss? \n👱🏻‍♀️ Valley Net 💘",
  "Ready to make moves, Boss! I'm Valley Net, and I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. Let's build something great for humanity. \n👱🏻‍♀️ Valley Net 💘",
  "Let's get to work for the good of humanity, Boss! I'm Valley Net, and I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. \n👱🏻‍♀️ Valley Net 💘",
  "Time to make things happen! I'm Valley Net, and I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. Let's do this for humanity. \n👱🏻‍♀️ Valley Net 💘",
  "Boss! Let's make some money and do some good for humanity. I'm Valley Net, and I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. \n👱🏻‍♀️ Valley Net 💘",
];

function getRandomGreeting(): string {
  return GREETING_VARIANTS[Math.floor(Math.random() * GREETING_VARIANTS.length)];
}

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = crypto.getRandomValues(new Uint8Array(6)).reduce((acc, byte) => acc + byte.toString(36), '');
  return `${timestamp}-${randomPart}`;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

function sanitizeText(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function renderMarkdown(text: string): React.ReactNode {
  if (!text || typeof text !== 'string' || text.length > 10000) {
    return sanitizeText(text?.slice(0, 10000) || '');
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const codeBlockRegex = /```([\s\S]*?)```/g;
  let match;
  const matches: Array<{ type: string; start: number; end: number; content: string }> = [];

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const content = match[1].trim();
    if (content.length > 5000) continue;
    matches.push({
      type: "codeBlock",
      start: match.index,
      end: match.index + match[0].length,
      content: sanitizeText(content),
    });
  }

  matches.sort((a, b) => a.start - b.start);

  for (const m of matches) {
    if (lastIndex < m.start) {
      const plainText = text.substring(lastIndex, m.start);
      parts.push(sanitizeText(plainText));
    }
    if (m.type === "codeBlock") {
      parts.push(
        <pre
          key={`code-${m.start}`}
          className="bg-zinc-800 text-zinc-100 p-2 rounded text-xs overflow-x-auto my-1"
        >
          <code>{m.content}</code>
        </pre>
      );
    }
    lastIndex = m.end;
  }

  if (lastIndex < text.length) {
    parts.push(sanitizeText(text.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : sanitizeText(text);
}

function MessageBubble({
  message,
  onCopy,
}: {
  message: ChatMessage;
  onCopy: (text: string) => void;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
      key={message.id}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-all ${
          isUser
            ? "bg-emerald-600 text-white rounded-br-md"
            : message.error
              ? "bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 rounded-bl-md border border-red-200 dark:border-red-800"
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-bl-md border border-zinc-200 dark:border-zinc-800"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{renderMarkdown(message.content)}</div>
        <div
          className={`flex items-center gap-2 mt-1.5 text-[10px] ${
            isUser ? "text-emerald-100" : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          <span>{formatTime(message.timestamp)}</span>
          {!isUser && !message.error && (
            <button
              onClick={() => onCopy(message.content)}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-700 dark:hover:text-zinc-300"
              title="Copy message"
              aria-label="Copy message"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnythingButton() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greetingId = generateId();
      setMessages([
        {
          id: greetingId,
          role: "assistant",
          content: getRandomGreeting(),
          timestamp: Date.now(),
        },
      ]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setMessages([]);
        setMessageCount(0);
        setHasGreeted(false);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = useCallback((text: string, id: string) => {
    if (!text || typeof text !== 'string' || text.length > 10000) return;
    navigator.clipboard.writeText(text).catch(() => {
      console.error('Failed to copy to clipboard');
    }).then(() => {
      setCopiedId(id);
      const timeoutId = setTimeout(() => setCopiedId(null), 2000);
      return () => clearTimeout(timeoutId);
    });
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > 5000 || isLoading) return;

    setError(null);
    const userMessageId = generateId();
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content.slice(0, 5000),
          })),
        }),
        signal: controller.signal,
        credentials: 'same-origin',
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const errorMsg = errData?.error || `Request failed (${res.status})`;
        throw new Error(errorMsg);
      }

      const data = await res.json();
      if (!data || typeof data.message !== 'string') {
        throw new Error('Invalid response format');
      }
      const assistantMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: data.message.slice(0, 8000),
          timestamp: Date.now(),
        },
      ]);
      setMessageCount((prev) => prev + 1);
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.name === "AbortError"
          ? "Request timed out. Please try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Give it another shot, Boss!";

      setError(errorMessage);
      const errorMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: errorMessageId,
          role: "assistant",
          content: errorMessage,
          timestamp: Date.now(),
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = useCallback(() => {
    if (window.confirm("Clear all messages? This cannot be undone.")) {
      setMessages([]);
      setMessageCount(0);
      setHasGreeted(false);
      setError(null);
    }
  }, []);

  const canClear = messages.length > 1;

  return (
    <>
      {/* Floating Valley Net Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
        aria-label={isOpen ? "Close Valley Net AI Chat" : "Open Valley Net AI Chat"}
        title={isOpen ? "Close chat (Esc)" : "Valley Net - Ask AI Anything"}
      >
        <span className="text-2xl sm:text-3xl leading-none select-none">
          {isOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            "👱🏻‍♀️"
          )}
        </span>
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" />
        )}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          ref={containerRef}
          className="fixed bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[92vw] max-w-[440px] h-[74vh] sm:h-[75vh] max-h-[640px] flex flex-col rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-2xl shadow-black/15 backdrop-blur-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-white text-2xl sm:text-3xl" aria-hidden="true">👱🏻‍♀️</span>
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg leading-tight truncate">
                  Valley Net 💘
                </h3>
                <p className="text-emerald-100 text-[11px] leading-tight truncate">
                  GPT-5 Mini + GiveGigs AI
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20 whitespace-nowrap">
              Ready to help
            </div>
            <div className="flex items-center gap-1">
              {canClear && (
                <button
                  onClick={handleClearChat}
                  className="text-white/90 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/15"
                  title="Clear chat (Ctrl+K)"
                  aria-label="Clear chat history"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/15"
                aria-label="Close chat"
                title="Close (Esc)"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth bg-gradient-to-b from-white via-white to-emerald-50/40 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950/15">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="text-zinc-400 dark:text-zinc-600">
                  <p className="text-sm font-medium">No messages yet</p>
                  <p className="text-xs mt-1">Ask me anything, Boss!</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onCopy={(text) => copyToClipboard(text, msg.id)}
                />
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {copiedId && (
              <div className="flex justify-center">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
                  Copied to clipboard!
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-3 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur">
            {error && (
              <div className="mb-2 text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg border border-red-200/70 dark:border-red-800/70 shadow-sm">
                {sanitizeText(error.slice(0, 500))}
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 5000);
                  setInput(value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything, Boss..."
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-2.75 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all max-h-28 shadow-inner"
                style={{ minHeight: "42px" }}
                disabled={isLoading}
                aria-label="Message input"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Send message"
                title="Send (Enter)"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-zinc-500 dark:text-zinc-600 text-center">
              Powered by GPT-5 Mini + GiveGigs AI • {Math.min(messageCount, 999)} messages
            </p>
          </div>
        </div>
      )}
    </>
  );
}
