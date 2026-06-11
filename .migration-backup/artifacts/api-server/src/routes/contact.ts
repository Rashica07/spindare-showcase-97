import { Router } from "express";
import { z } from "zod";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().max(200).optional(),
  service: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  description: z.string().min(1).max(5000).optional(),
  subject: z.string().max(300).optional(),
  message: z.string().max(5000).optional(),
});

const RATE_LIMIT_MAP = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (RATE_LIMIT_MAP.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  RATE_LIMIT_MAP.set(ip, timestamps);
  return false;
}

router.post("/contact", (req, res) => {
  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ??
    req.socket.remoteAddress ??
    "unknown";

  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests. Please wait before trying again." });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  const data = parsed.data;
  const hasMessage = !!(data.description ?? data.message);
  if (!hasMessage) {
    res.status(400).json({ error: "A message or project description is required." });
    return;
  }

  req.log.info(
    {
      name: data.name,
      email: data.email,
      service: data.service,
      budget: data.budget,
    },
    "Contact form submission received",
  );

  res.status(200).json({ ok: true });
});

export default router;
