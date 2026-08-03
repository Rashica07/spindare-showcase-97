import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.repl.co"],
  async headers() {
    // In dev, Turbopack reuses chunk filenames across edits, so an immutable
    // Cache-Control freezes stale bundles in the browser for a year and code
    // changes silently never appear. Only send it for production builds.
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        // Production static assets are content-hashed, so caching forever is safe.
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
