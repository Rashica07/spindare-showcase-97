import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const { email, product } = await req.json();

    if (!email || !product) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "kiqa-dev Portfolio <onboarding@resend.dev>",
      to: "newkiqaa@gmail.com",
      replyTo: email,
      subject: `🚀 ${product} Waitlist — ${email}`,
      text: `New waitlist signup for ${product}:\n\nEmail: ${email}\n\nkiqa-dev.it`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff">
          <h2 style="color:#111;margin-bottom:4px">🚀 ${product} Waitlist Signup</h2>
          <p style="color:#666;margin-top:0;font-size:14px">Someone joined the ${product} waitlist from your portfolio.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="font-size:15px"><strong>Email:</strong> <a href="mailto:${email}" style="color:#6366f1">${email}</a></p>
          <p style="color:#aaa;font-size:12px;margin-top:32px">kiqa-dev.it · ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend waitlist error:", error);
      return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
