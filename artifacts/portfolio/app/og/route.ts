import { NextResponse } from "next/server";
import { OG_IMAGES } from "@/lib/og-images";

// Per request, never cached: each time a platform fetches the share image it
// may get a different one. Platforms cache what they get per link, so the
// variety shows up across platforms and shares, not on every page view.
export const dynamic = "force-dynamic";

export function GET() {
  const pick = OG_IMAGES[Math.floor(Math.random() * OG_IMAGES.length)];
  return new NextResponse(null, {
    status: 302,
    headers: { Location: pick, "Cache-Control": "no-store, max-age=0" },
  });
}
