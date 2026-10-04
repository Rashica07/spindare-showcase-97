import { NextResponse } from "next/server";
import { OG_IMAGES } from "@/lib/og-images";

// Per request, never cached: each time a platform fetches the share image it
// may get a different one. Platforms cache what they get per link, so the
// variety shows up across platforms and shares, not on every page view.
export const dynamic = "force-dynamic";

export function GET() {
  const total = OG_IMAGES.reduce((sum, img) => sum + img.weight, 0);
  let roll = Math.random() * total;
  const pick = OG_IMAGES.find((img) => (roll -= img.weight) < 0) ?? OG_IMAGES[0];
  return new NextResponse(null, {
    status: 302,
    headers: { Location: pick.src, "Cache-Control": "no-store, max-age=0" },
  });
}
