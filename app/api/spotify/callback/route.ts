import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return new Response(`Spotify auth error: ${error ?? "no code"}`, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET", { status: 500 });
  }

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/spotify/callback`;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenRes.json();

  if (!data.refresh_token) {
    return new Response(JSON.stringify(data, null, 2), { status: 400 });
  }

  const html = `<!DOCTYPE html><html><body style="font-family:monospace;padding:2rem;background:#0d1117;color:#e6edf3">
<h2 style="color:#58a6ff">✅ Spotify connected!</h2>
<p>Add this as the <code style="color:#7ee787">SPOTIFY_REFRESH_TOKEN</code> secret:</p>
<pre style="background:#161b22;padding:1rem;border-radius:8px;border:1px solid #30363d;word-break:break-all">${data.refresh_token}</pre>
<p style="color:#8b949e;font-size:0.875rem">Copy that value → Secrets panel → SPOTIFY_REFRESH_TOKEN → Save → restart the app.</p>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
