import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_KEY || process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || "onboarding@resend.dev";
const defaultRecipient = process.env.RESEND_TO || process.env.CONTACT_EMAIL || "newkiqaa@gmail.com";
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_FROM;

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: unknown): value is string {
  return typeof value === "string" && /^\+?[0-9\s().-]{7,15}$/.test(value);
}

async function sendSms(phone: string, message: string) {
  if (!twilioAccountSid || !twilioAuthToken || !twilioFrom) {
    return false;
  }

  const body = new URLSearchParams({
    From: twilioFrom,
    To: phone,
    Body: message,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio SMS failed: ${response.status} ${errorText}`);
  }

  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contactMethod = body.contactMethod === "phone" ? "phone" : "email";
    const contactValue = typeof body.contactValue === "string" ? body.contactValue.trim() : "";
    const service = typeof body.service === "string" ? body.service : "";
    const timeline = typeof body.timeline === "string" ? body.timeline : "";
    const description = typeof body.description === "string" ? body.description : "";
    const rewrittenDescription = typeof body.rewrittenDescription === "string" && body.rewrittenDescription.trim()
      ? body.rewrittenDescription.trim()
      : description;

    const recipient = defaultRecipient;

    const subject = `New website contact from ${name || "a visitor"}`;
    const text = [
      `Name: ${name || "Not provided"}`,
      `Preferred contact: ${contactMethod}`,
      `Contact value: ${contactValue || "Not provided"}`,
      `Service: ${service || "Not provided"}`,
      `Timeline: ${timeline || "Not provided"}`,
      `Original request: ${description || "Not provided"}`,
      `Clarified request: ${rewrittenDescription}`,
    ].join("\n");

    const html = `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h3>New website contact</h3>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Preferred contact:</strong> ${contactMethod}</p>
        <p><strong>Contact value:</strong> ${contactValue || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not provided"}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not provided"}</p>
        <p><strong>Original request:</strong> ${description || "Not provided"}</p>
        <p><strong>Clarified request:</strong> ${rewrittenDescription}</p>
      </div>
    `;

    let emailSent = false;
    let smsSent = false;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const response = await resend.emails.send({
        from: resendFrom,
        to: [recipient],
        subject,
        text,
        html,
      });
      emailSent = Boolean(response.data?.id);
    } else {
      console.warn("RESEND_KEY is not configured; skipping email delivery.");
    }

    if (contactMethod === "phone" && isPhone(contactValue)) {
      smsSent = await sendSms(contactValue, `New website contact from ${name || "a visitor"}: ${service || "general inquiry"}`);
    }

    return NextResponse.json({ success: true, emailSent, smsSent });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "Unable to send contact message" }, { status: 500 });
  }
}
