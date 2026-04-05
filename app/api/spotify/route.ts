const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;
  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      cache: "no-store",
    });
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({ isPlaying: false, notConfigured: true });
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return Response.json({ isPlaying: false });
  }

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const song = await res.json();
  if (!song?.is_playing || song.item?.type !== "track") {
    return Response.json({ isPlaying: false });
  }

  return Response.json({
    isPlaying: true,
    title: song.item.name,
    artist: song.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: song.item.album.name,
    albumArt: song.item.album.images[0]?.url ?? null,
    url: song.item.external_urls.spotify,
  });
}
