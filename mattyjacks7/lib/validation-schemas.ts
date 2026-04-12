// Zod validation schemas for API inputs

import { z } from "zod";

// Chat message validation
export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.union([
    z.string().max(5000),
    z.array(z.object({
      type: z.string(),
      text: z.string().optional(),
      image_url: z.object({ url: z.string() }).optional(),
    })),
  ]),
  images: z.array(z.object({
    id: z.string(),
    base64: z.string(),
    mimeType: z.string(),
    fileName: z.string(),
    size: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
});

// Chat request validation
export const ChatRequestSchema = z.object({
  model: z.string().optional(),
  nickname: z.string().max(50).optional(),
  mode: z.enum(['good', 'wicked', 'okay']).optional().default('good'),
  wickedModel: z.string().optional().default('random'),
  messages: z.array(ChatMessageSchema),
});

// View tracking validation
export const ViewTrackingSchema = z.object({
  path: z.string().max(500),
});

// Page view stats response
export const PageViewStatsSchema = z.object({
  humans: z.number().min(0),
  bots: z.number().min(0),
  unknown: z.number().min(0),
  total: z.number().min(0),
});

// Category cost validation
export const CategoryCostSchema = z.object({
  category: z.string(),
  cost: z.number().min(0),
  percentage: z.number().min(0).max(100),
  requests: z.number().min(0),
});

// Safe parse with error handling
export function safeValidate<T>(schema: z.ZodSchema, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join("; ");
      return { success: false, error: messages };
    }
    return { success: false, error: "Validation failed" };
  }
}
