import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.repl.co"],
  async headers() {
    return [
      {
        // Static assets are content-hashed by Next — safe to cache forever.
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // NOTE: page routes are intentionally NOT cache-controlled here.
      // This site's content comes from Novus Pulse and changes in real time —
      // a blanket Cache-Control on "/(.*)" previously froze every page at the
      // CDN edge for up to a year (s-maxage=31536000), which is why edits
      // wouldn't show up on Vercel without a manual purge.
    ];
  },
};

export default nextConfig;
