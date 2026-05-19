import { NextResponse } from 'next/server';

interface RateLimitResult {
  success: boolean;
  message?: string;
  remaining?: number;
  resetTime?: number;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 100;

export async function rateLimitMiddleware(req: Request): Promise<RateLimitResult> {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const key = `rate-limit:${ip}`;

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, resetTime: now + WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, message: 'Rate limit exceeded', remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { success: true, remaining: MAX_REQUESTS - record.count, resetTime: record.resetTime };
}

export function getRateLimitHeaders(remaining: number, reset: number) {
  return {
    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  };
}