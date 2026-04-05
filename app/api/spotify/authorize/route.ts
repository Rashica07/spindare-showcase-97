import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return new Response("SPOTIFY_CLIENT_ID env var not set", { status: 400 });
  }

  // Replit proxies requests — use X-Forwarded headers to get the real public origin
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = forwardedHost ?? req.nextUrl.host;
  const origin = `${forwardedProto}://${host}`;
  const redirectUri = `${origin}/api/spotify/callback`;

  const scope = "user-read-currently-playing user-read-playback-state";
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope,
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return Response.redirect(url, 302);
}
