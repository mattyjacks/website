// Shared API utilities for rate limiting, validation, and error handling

import { NextRequest, NextResponse } from "next/server";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_RATE_LIMIT_ENTRIES = 50000;

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = realIp || (forwarded ? forwarded.split(",").pop()?.trim() || "unknown" : "unknown");
  return ip.slice(0, 45);
}

export function checkRateLimit(ip: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      let evicted = 0;
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetTime) {
          rateLimitMap.delete(key);
          evicted++;
          if (evicted >= 100) break;
        }
      }
      if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
        const oldestKey = Array.from(rateLimitMap.entries())
          .sort((a, b) => a[1].resetTime - b[1].resetTime)[0]?.[0];
        if (oldestKey) rateLimitMap.delete(oldestKey);
      }
    }
    rateLimitMap.set(ip, { count: 1, resetTime: now + config.windowMs });
    return true;
  }

  if (record.count >= config.maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Security headers
export const SECURITY_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Robots-Tag": "noindex",
};

// Request ID generation
export function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// Structured logging
export class RequestLogger {
  private logs: string[] = [];
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  log(msg: string): void {
    const timestamp = new Date().toISOString();
    const elapsed = Date.now() - this.startTime;
    const logMsg = `[${timestamp}] (+${elapsed}ms) ${msg}`;
    this.logs.push(logMsg);
    console.log(logMsg);
  }

  getLogs(): string[] {
    return this.logs;
  }

  getElapsed(): number {
    return Date.now() - this.startTime;
  }
}

// Input validation
export function validateString(value: unknown, maxLength: number, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
  if (value.length > maxLength) {
    throw new Error(`${fieldName} exceeds maximum length of ${maxLength}`);
  }
  return value.trim();
}

export function validateNumber(value: unknown, fieldName: string): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  return num;
}

export function validateArray(value: unknown, fieldName: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  return value;
}

// Safe error responses
export function safeErrorResponse(
  error: unknown,
  statusCode: number = 500,
  isAdmin: boolean = false
): NextResponse {
  const message = error instanceof Error ? error.message : String(error);
  const errorResponse = isAdmin
    ? { error: message, stack: error instanceof Error ? error.stack : undefined }
    : { error: "An error occurred. Please try again." };

  return NextResponse.json(errorResponse, {
    status: statusCode,
    headers: SECURITY_HEADERS,
  });
}

// Request deduplication
const requestCache = new Map<string, { response: unknown; expiresAt: number }>();

export function getCachedRequest(key: string): unknown | null {
  const cached = requestCache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    requestCache.delete(key);
    return null;
  }
  return cached.response;
}

export function setCachedRequest(key: string, response: unknown, ttlMs: number = 5000): void {
  requestCache.set(key, { response, expiresAt: Date.now() + ttlMs });
  // Cleanup old entries
  if (requestCache.size > 10000) {
    const now = Date.now();
    for (const [k, v] of requestCache) {
      if (now > v.expiresAt) {
        requestCache.delete(k);
      }
    }
  }
}
