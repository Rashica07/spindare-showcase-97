import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_KEY || process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || "onboarding@resend.dev";
const recipient = process.env.RESEND_TO || process.env.CONTACT_EMAIL || "newkiqaa@gmail.com";

const LIMITS = { name: 120, email: 200, service: 80, timeline: 80, description: 5000 } as const;
type Field = keyof typeof LIMITS;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown, field: Field) {
  return typeof value === "string" ? value.trim().slice(0, LIMITS[field]) : "";
}

/**
 * Accepts JSON from the intake chat and a plain urlencoded/multipart POST
 * from <ContactForm>, the no-JavaScript fallback. Form posts get a redirect
 * to a result page instead of a JSON body.
 */
export async function POST(req: NextRequest) {
  const isJson = (req.headers.get("content-type") || "").includes("application/json");

  const respond = (ok: boolean, status = 200) => {
    if (isJson) {
      return ok
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Unable to send contact message" }, { status });
    }
    // Relative Location: req.url can carry the bind address (0.0.0.0) rather
    // than the public host, depending on how the server is started.
    return new NextResponse(null, { status: 303, headers: { Location: `/contact/sent${ok ? "" : "?error=1"}` } });
  };

  let body: Record<string, unknown>;
  try {
    body = isJson ? await req.json() : Object.fromEntries(await req.formData());
  } catch {
    return respond(false, 400);
  }

  // Honeypot: a field real visitors never see. Pretend it worked so bots
  // don't learn to skip it.
  if (typeof body.website === "string" && body.website.trim()) {
    return respond(true);
  }

  const data = {
    name: clean(body.name, "name"),
    // `contactValue` is what older versions of the chat sent.
    email: clean(body.email ?? body.contactValue, "email"),
    service: clean(body.service, "service"),
    timeline: clean(body.timeline, "timeline"),
    description: clean(body.description, "description"),
  };

  if (!isEmail(data.email) || !data.description) {
    return respond(false, 400);
  }

  if (!resendApiKey) {
    console.error("RESEND_KEY is not configured; contact message dropped.");
    return respond(false, 503);
  }

  const rows: [string, string][] = [
    ["Name", data.name || "Not provided"],
    ["Email", data.email],
    ["Service", data.service || "Not provided"],
    ["Timeline", data.timeline || "Not provided"],
    ["Request", data.description],
  ];

  try {
    const resend = new Resend(resendApiKey);
    const { data: sent, error } = await resend.emails.send({
      from: resendFrom,
      to: [recipient],
      replyTo: data.email,
      subject: `New website contact from ${data.name || "a visitor"}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<div style="font-family: sans-serif; line-height: 1.5;"><h3>New website contact</h3>${rows
        .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
        .join("")}</div>`,
    });
    if (error || !sent?.id) throw error ?? new Error("No message id returned");
    return respond(true);
  } catch (error) {
    console.error("Contact submission failed:", error);
    return respond(false, 500);
  }
}
