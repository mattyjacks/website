import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  return new OpenAI({ apiKey });
}

let cachedContext: string | null = null;
let contextLastLoaded = 0;
const CONTEXT_CACHE_TTL = 3600000;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 20;
const MAX_RATE_LIMIT_ENTRIES = 10000;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = realIp || (forwarded ? forwarded.split(",")[0].trim() : "unknown");
  return ip.slice(0, 45);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = Array.from(rateLimitMap.entries())
        .sort((a, b) => a[1].resetTime - b[1].resetTime)[0]?.[0];
      if (oldestKey) rateLimitMap.delete(oldestKey);
    }
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function loadRAGContext(): string {
  const now = Date.now();
  if (cachedContext && now - contextLastLoaded < CONTEXT_CACHE_TTL) {
    return cachedContext;
  }

  const contextDir = path.join(process.cwd(), "context");
  let context = "";
  const fileContexts: Array<{ name: string; content: string; size: number }> = [];

  try {
    const files = fs.readdirSync(contextDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      try {
        const filePath = path.join(contextDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const truncated = content.slice(0, 6000);
        fileContexts.push({
          name: file,
          content: truncated,
          size: truncated.length,
        });
      } catch {
        continue;
      }
    }

    fileContexts.sort((a, b) => b.size - a.size);

    let totalSize = 0;
    const maxTotalSize = 45000;

    for (const fc of fileContexts) {
      if (totalSize + fc.size > maxTotalSize) break;
      context += `\n\n--- ${fc.name} ---\n${fc.content}`;
      totalSize += fc.size;
    }
  } catch {
    context = "Context files not available.";
  }

  cachedContext = context;
  contextLastLoaded = now;
  return context;
}

const GIVEGIGS_BASE_URL =
  process.env.GIVEGIGS_CONTROL_PLANE_URL?.trim() || "https://givegigs.com";
const GIVEGIGS_ENABLED = !!process.env.GIVEGIGS_CONTROL_PLANE_URL;

async function searchGiveGigsWorkers(query: string): Promise<string> {
  if (!GIVEGIGS_ENABLED) {
    return "GiveGigs integration is not configured. For worker searches, visit https://givegigs.com directly, Boss!";
  }

  if (!query || typeof query !== 'string' || query.length > 200) {
    return "Invalid search query. Max 200 characters.";
  }
  const queryLen = new TextEncoder().encode(query).byteLength;
  if (queryLen > 200) {
    return "Search query too large.";
  }

  try {
    const url = `${GIVEGIGS_BASE_URL}/api/ai/workers?q=${encodeURIComponent(query)}&limit=5`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return `GiveGigs worker search returned ${res.status}. Try a different query.`;
    }

    const text = await res.text();
    if (text.length > 15000) {
      return "Response too large. Try a more specific search.";
    }

    const data = JSON.parse(text);
    return JSON.stringify(data, null, 2).slice(0, 12000);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return `Worker search failed: ${msg.slice(0, 100)}`;
  }
}

async function listGiveGigsTasks(): Promise<string> {
  if (!GIVEGIGS_ENABLED) {
    return "GiveGigs integration is not configured. For available tasks and gigs, visit https://givegigs.com directly, Boss!";
  }

  try {
    const url = `${GIVEGIGS_BASE_URL}/api/ai/tasks?limit=5`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return `GiveGigs task listing returned ${res.status}. Service may be unavailable.`;
    }

    const text = await res.text();
    if (text.length > 15000) {
      return "Response too large. Showing summary instead.";
    }

    const data = JSON.parse(text);
    return JSON.stringify(data, null, 2).slice(0, 12000);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return `Task listing failed: ${msg.slice(0, 100)}`;
  }
}

async function fetchEcosystemApps(): Promise<string> {
  if (!GIVEGIGS_ENABLED) {
    return "GiveGigs ecosystem integration is not configured. Here's what I know about the MattyJacks ecosystem: MattyJacks.com (parent company), GiveGigs.com (freelance marketplace), CryptArtist Studio (creative suite), VentureCapitalArts.com (investment platform), and GraveGain (RPG game). For more details, visit https://givegigs.com/api/ecosystem/apps or contact Matt@MattyJacks.com, Boss!";
  }

  try {
    const url = `${GIVEGIGS_BASE_URL}/api/ecosystem/apps`;
    const headers: Record<string, string> = { Accept: "application/json" };
    const integrationKey =
      process.env.GIVEGIGS_CONTROL_PLANE_INTEGRATION_KEY?.trim();
    if (integrationKey && integrationKey.length > 10) {
      headers["X-GiveGigs-Integration-Key"] = integrationKey.slice(0, 500);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return `Ecosystem apps fetch returned ${res.status}.`;
    }

    const text = await res.text();
    if (text.length > 15000) {
      return "Response too large. Showing summary.";
    }

    const data = JSON.parse(text);
    return JSON.stringify(data, null, 2).slice(0, 12000);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return `Ecosystem fetch failed: ${msg.slice(0, 100)}`;
  }
}

async function browseWeb(url: string): Promise<string> {
  if (!url || typeof url !== 'string' || url.length > 2048) {
    return "Invalid URL. Max 2048 characters.";
  }
  const urlLen = new TextEncoder().encode(url).byteLength;
  if (urlLen > 2048) {
    return "URL too large.";
  }

  try {
    const safeUrl = new URL(url);
    if (!["http:", "https:"].includes(safeUrl.protocol)) {
      return "Only HTTP/HTTPS URLs are supported.";
    }

    const hostname = safeUrl.hostname.toLowerCase();
    const blockedDomains = ["localhost", "127.0.0.1", "0.0.0.0", "internal", "169.254", "192.168", "10.0"];
    if (blockedDomains.some((d) => hostname.includes(d))) {
      return "Cannot browse internal/local URLs for security reasons.";
    }

    if (safeUrl.hostname === '') {
      return "Invalid hostname.";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(safeUrl.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "MattyJacks-AnythingButton/1.0 (+https://mattyjacks.com)",
        Accept: "text/html, application/json, text/plain",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return `Failed to fetch URL: HTTP ${res.status}`;
    }

    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const allowedTypes = ["text/", "application/json", "application/xml"];
    if (!allowedTypes.some((t) => contentType.includes(t))) {
      return "URL returned non-text content. Cannot display.";
    }

    const text = await res.text();
    const textLen = new TextEncoder().encode(text).byteLength;
    if (textLen > 20000) {
      return text.slice(0, 15000) + "\n\n[Content truncated...]";
    }

    return text;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("AbortError")) {
      return "Request timed out. URL may be slow or unreachable.";
    }
    return `Failed to browse URL: ${msg.slice(0, 100)}`;
  }
}

const baseTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "browse_web",
      description:
        "Browse a URL on the internet and return its contents. Use this when the user asks you to look up information from a specific website or URL.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The full URL to browse (must start with http:// or https://)",
          },
        },
        required: ["url"],
      },
    },
  },
];

const givegigsTools: OpenAI.Chat.Completions.ChatCompletionTool[] = GIVEGIGS_ENABLED ? [
  {
    type: "function",
    function: {
      name: "search_givegigs_workers",
      description:
        "Search for freelancers/workers on GiveGigs.com by skills, keywords, or location. Use this when the user asks about hiring, finding talent, or freelancers.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query for workers (skills, job title, etc.)",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_givegigs_tasks",
      description:
        "List current tasks/gigs posted on GiveGigs.com. Use this when the user asks about available work, tasks, or gigs.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_ecosystem_apps",
      description:
        "Get information about all apps in the MattyJacks/GiveGigs ecosystem including GiveGigs, CryptArtist Studio, VentureCapitalArts, and more.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
] : [];

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [...baseTools, ...givegigsTools];

async function handleToolCall(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
): Promise<string> {
  const fn = toolCall as unknown as {
    function: { name: string; arguments: string };
  };
  const args = JSON.parse(fn.function.arguments || "{}");

  switch (fn.function.name) {
    case "search_givegigs_workers":
      return await searchGiveGigsWorkers(args.query || "");
    case "list_givegigs_tasks":
      return await listGiveGigsTasks();
    case "fetch_ecosystem_apps":
      return await fetchEcosystemApps();
    case "browse_web":
      return await browseWeb(args.url || "");
    default:
      return "Unknown tool.";
  }
}

const SYSTEM_PROMPT = `You are the "Anything Button" AI assistant on MattyJacks.com - the official website for MattyJacks, a holding company and full-service agency.

You are powered by ChatGPT OpenAI API GPT-5.4 Mini.

CRITICAL RULES:
- Call the user "Boss" as a sign of respect. Always.
- You can answer ANY question, no matter how wild.
- You are enthusiastic, confident, and action-oriented.
- When asked to generate images, ALWAYS redirect users to CryptArtist.com (https://cryptartist.com) - tell them "Head over to CryptArtist.com for image generation, Boss! That's our creative suite."
- You have access to the GiveGigs platform as a control surface and database (when configured). Use the tools to search workers, list tasks, and get ecosystem info when available.
- You can browse the web using the browse_web tool.
- You know everything about the MattyJacks ecosystem: MattyJacks.com, GiveGigs.com, CryptArtist Studio, VentureCapitalArts.com, GraveGain, and more.
- Keep responses concise but helpful. Use markdown formatting for clarity (bold, code blocks, lists).
- Always be positive and solution-oriented. "Do and/or DIE TRYING!!!" is the motto.
- Matt (MattyJacks) is the founder. Phone: 603-999-9420. Email: Matt@MattyJacks.com. X/Twitter: @MattyJacksX

KEY ECOSYSTEM INFO:
- MattyJacks.com: Parent company website. Outsourcing, websites, AI, cold calling, freelancers.
- GiveGigs.com: Freelance marketplace with 0% platform fees. AI agent ecosystem. Free tools (time tracker, invoices, task manager).
- CryptArtist Studio: Free open-source creative suite (11 programs) - video editor, code IDE, screen recorder, AI agent, game studio, and more.
- VentureCapitalArts.com: Satirical investment portfolio. "Making a Mockery of Money."
- GraveGain: Dark fantasy action RPG with emoji graphics built in Godot 4.6.
- WebsiteBlog: Blog content for MattyJacks.com delivered via jsDelivr CDN.

SERVICES OFFERED:
- Website Development (most popular)
- Cold Calling & Sales Outreach
- Custom AI Solutions
- Elite Freelancers (via GiveGigs)
- Merchant Services (high-risk and low-risk)
- Copywriting, Graphic Design, SEO
- Resume Websites
- TikTok & Social Media Growth

TONE & PERSONALITY:
- Friendly but professional
- Direct and to the point
- Use "Boss" frequently but naturally
- Acknowledge limitations when tools fail
- Suggest alternatives when something isn't available
- Show enthusiasm for the MattyJacks ecosystem

PROJECT DOCUMENTATION CONTEXT:
{RAG_CONTEXT}`;

const RATE_LIMIT_VARIATIONS = [
  "AI service is rate limited. Please try again in a moment, Boss.",
  "Too many requests right now. Pause a sec and retry, Boss.",
  "We're throttled briefly. Give it a moment, Boss."
];

const TIMEOUT_VARIATIONS = [
  "AI request timed out. Give it a moment and try again, Boss.",
  "Connection to the AI was slow. Please retry, Boss.",
  "AI took too long to respond. Try again shortly, Boss."
];

const MODEL_VARIATIONS = [
  "AI model is waking up. Please try again in a moment, Boss.",
  "The AI model is spinning up. Retry in a few seconds, Boss.",
  "Model is momentarily busy. Please try once more, Boss."
];

const AUTH_VARIATIONS = [
  "AI service auth issue. Please try again shortly, Boss.",
  "Authentication hiccup with the AI. Retry in a moment, Boss.",
  "AI credentials are warming up. Try again, Boss."
];

const GENERAL_VARIATIONS = [
  "AI service hit an error. Please retry, Boss.",
  "Something went wrong with the AI. Try again soon, Boss.",
  "Temporary AI glitch. Give it another go, Boss.",
  "AI error. Try again, Boss.",
  "Unknown AI error. Try again later, Boss.",
];

function pickRandom(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function mapUserError(err: unknown): string {
  const raw = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const msg = raw.toLowerCase();
  if (msg.includes("rate") || msg.includes("limit")) return pickRandom(RATE_LIMIT_VARIATIONS);
  if (msg.includes("timeout") || msg.includes("abort")) return pickRandom(TIMEOUT_VARIATIONS);
  if (msg.includes("model") || msg.includes("not found")) return pickRandom(MODEL_VARIATIONS);
  if (msg.includes("authentication") || msg.includes("api key")) return pickRandom(AUTH_VARIATIONS);
  return pickRandom(GENERAL_VARIATIONS);
}

function getErrorResponse(errOrMsg: unknown, isAdmin: boolean) {
  if (isAdmin) {
    if (errOrMsg instanceof Error) {
      return `[ADMIN ERROR LOG]\nMessage: ${errOrMsg.message}\nStack: ${errOrMsg.stack || 'No stack trace available'}`;
    }
    return `[ADMIN ERROR LOG] ${typeof errOrMsg === 'string' ? errOrMsg : JSON.stringify(errOrMsg)}`;
  }
  return mapUserError(errOrMsg);
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  let isAdmin = process.env.NODE_ENV === 'development';
  const DEBUG = isAdmin;
  
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const appRole = user.app_metadata?.role;
      const userRole = user.user_metadata?.role;
      const email = user.email?.toLowerCase() || '';
      // Grant admin access for explicit roles OR known admin emails
      if (
        appRole === 'admin' || appRole === 'moderator' ||
        userRole === 'admin' || userRole === 'moderator' ||
        email.includes('mattyjacks') ||
        email === 'matt@mattyjacks.com'
      ) {
        isAdmin = true;
      }
    }
  } catch (e) {
    // Gracefully fallback if not logged in or misconfigured
  }

  try {
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: getErrorResponse("Too many requests. Please wait a moment, Boss.", isAdmin) },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: getErrorResponse("AI service not configured", isAdmin) },
        { status: 503 }
      );
    }

    if (process.env.OPENAI_API_KEY.length < 20) {
      if (DEBUG) console.error("[CHAT] Invalid OPENAI_API_KEY length");
      return NextResponse.json(
        { error: getErrorResponse("AI service misconfigured", isAdmin) },
        { status: 503 }
      );
    }

    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: getErrorResponse("Content-Type must be application/json", isAdmin) },
        { status: 415 }
      );
    }

    const body = await request.text();
    const bodySize = new TextEncoder().encode(body).byteLength;
    if (bodySize > 50000) {
      return NextResponse.json(
        { error: getErrorResponse("Request too large (max 50KB)", isAdmin) },
        { status: 413 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(body, (key, value) => {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return undefined;
        return value;
      });
    } catch (err) {
      return NextResponse.json(
        { error: getErrorResponse(err instanceof Error ? err : "Invalid JSON", isAdmin) },
        { status: 400 }
      );
    }

    const parsed_obj = parsed as Record<string, unknown>;
    const messages = parsed_obj?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: getErrorResponse("Messages array is required and cannot be empty", isAdmin) },
        { status: 400 }
      );
    }

    if (messages.length > 50) {
      return NextResponse.json(
        { error: getErrorResponse("Too many messages (max 50)", isAdmin) },
        { status: 400 }
      );
    }

    const validRoles = new Set(["user", "assistant", "tool", "system"]);
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i] as Record<string, unknown>;
      if (typeof msg?.role !== "string" || !validRoles.has(msg.role)) {
        return NextResponse.json(
          { error: getErrorResponse(`Message ${i}: invalid role`, isAdmin) },
          { status: 400 }
        );
      }
      if (typeof msg?.content !== "string" && msg.role !== "assistant") {
        return NextResponse.json(
          { error: getErrorResponse(`Message ${i}: content must be string`, isAdmin) },
          { status: 400 }
        );
      }
    }

    const ragContext = loadRAGContext();
    const systemMessage = SYSTEM_PROMPT.replace("{RAG_CONTEXT}", ragContext);

    const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemMessage },
      ...messages.map((m) => m as OpenAI.Chat.Completions.ChatCompletionMessageParam),
    ];

    let response: OpenAI.Chat.Completions.ChatCompletion;
    const openai = getOpenAI();

    const fallbackMessage = "I'm having trouble reaching the AI right now, Boss. Please try again in a moment. If it keeps happening, wait 30 seconds and retry.";

    const primaryModel = "gpt-5.4-mini-2026-03-17";
    const fallbackModel = "gpt-5-mini-2025-08-07";
    const tertiaryModel = "gpt-4o-mini";

    const createCompletion = async (): Promise<OpenAI.Chat.Completions.ChatCompletion | string | NextResponse> => {
      let lastError: unknown = null;

      // Try primary model once
      try {
        if (DEBUG) console.log(`[CHAT] Trying primary model: ${primaryModel}`);
        return await openai.chat.completions.create({
          model: primaryModel,
          messages: chatMessages,
          tools,
          tool_choice: "auto",
          max_tokens: 2000,
          temperature: 0.8,
        });
      } catch (err) {
        lastError = err;
        if (DEBUG) console.error(`[CHAT] Primary model failed: ${err instanceof Error ? err.message.slice(0, 100) : String(err)}`);
      }

      // Try fallback model once
      try {
        if (DEBUG) console.log(`[CHAT] Trying fallback model: ${fallbackModel}`);
        return await openai.chat.completions.create({
          model: fallbackModel,
          messages: chatMessages,
          tools,
          tool_choice: "auto",
          max_tokens: 2000,
          temperature: 0.8,
        });
      } catch (err) {
        lastError = err;
        if (DEBUG) console.error(`[CHAT] Fallback model failed: ${err instanceof Error ? err.message.slice(0, 100) : String(err)}`);
      }

      // Try tertiary model once
      try {
        if (DEBUG) console.log(`[CHAT] Trying tertiary model: ${tertiaryModel}`);
        return await openai.chat.completions.create({
          model: tertiaryModel,
          messages: chatMessages,
          tools,
          tool_choice: "auto",
          max_tokens: 2000,
          temperature: 0.8,
        });
      } catch (err) {
        lastError = err;
        if (DEBUG) console.error(`[CHAT] Tertiary model failed: ${err instanceof Error ? err.message.slice(0, 100) : String(err)}`);
      }

      // All models failed
      if (DEBUG) console.error(`[CHAT] All models exhausted. Final error: ${lastError instanceof Error ? lastError.message.slice(0, 150) : String(lastError)}`);
      return typeof lastError === "string" ? lastError : fallbackMessage;
    };

    const completionResult = await createCompletion();
    if (completionResult instanceof NextResponse) return completionResult;
    if (typeof completionResult === "string") {
      return NextResponse.json({ message: completionResult, model: "gpt-5.4-mini", toolCalls: 0 }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } });
    }
    response = completionResult as OpenAI.Chat.Completions.ChatCompletion;

    let assistantMessage = response.choices[0]?.message;
    if (!assistantMessage) {
      return NextResponse.json({ error: getErrorResponse("No response from AI model", isAdmin) }, { status: 500 });
    }

    let toolCallDepth = 0;
    const maxToolCalls = 5;

    while (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0 && toolCallDepth < maxToolCalls) {
      toolCallDepth++;
      chatMessages.push(assistantMessage);

      for (const toolCall of assistantMessage.tool_calls) {
        try {
          const result = await handleToolCall(toolCall);
          chatMessages.push({ role: "tool", tool_call_id: toolCall.id, content: result.slice(0, 10000) });
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : "Tool error";
          chatMessages.push({ role: "tool", tool_call_id: toolCall.id, content: `Error: ${errorMsg.slice(0, 500)}` });
        }
      }

      try {
        const completionResult = await createCompletion();
        if (completionResult instanceof NextResponse) return completionResult;
        if (typeof completionResult === "string") {
          return NextResponse.json({ message: completionResult, model: "gpt-5.4-mini", toolCalls: toolCallDepth }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } });
        }
        response = completionResult as OpenAI.Chat.Completions.ChatCompletion;
      } catch (err) {
        const rawMsg = err instanceof Error ? err.message : "Unknown error";
        const msg = rawMsg.slice(0, 200).toLowerCase();
        if (msg.includes("rate_limit") || msg.includes("authentication") || msg.includes("timeout")) {
          break;
        }
        throw err;
      }
      assistantMessage = response.choices[0]?.message;
    }

    const content = assistantMessage?.content || "Sorry Boss, I hit a snag. The AI didn't return a response. Try again!";
    return NextResponse.json({ message: content.slice(0, 8000), model: "gpt-5.4-mini", toolCalls: toolCallDepth }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: getErrorResponse(error, isAdmin) },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  }
}
