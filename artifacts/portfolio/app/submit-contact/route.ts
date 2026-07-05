import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.name && body.contactMethod && body.contactValue) {
      console.log("Contact intake submission:", {
        name: body.name,
        contactMethod: body.contactMethod,
        contactValue: body.contactValue,
        service: body.service,
        timeline: body.timeline,
        description: body.description,
      });
    } else {
      console.log("Contact form submission:", body.name, body.email, body.subject);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
