import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 100;
const RATE_WINDOW_MS = 60_000;

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, remaining } = getRateLimit(ip);

  if (!allowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "60",
        "Content-Type": "text/plain",
      },
    });
  }

  const response = NextResponse.next();

  response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT));
  response.headers.set("X-RateLimit-Remaining", String(remaining));

  const userAgent = request.headers.get("user-agent") ?? "";
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /burpsuite/i,
    /havij/i,
    /w3af/i,
  ];

  if (suspiciousPatterns.some((p) => p.test(userAgent))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
