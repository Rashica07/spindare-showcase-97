import type { Metadata } from "next";

// The URL every page advertises as its share image. It is a route, not a
// file: /og redirects to a random image from lib/og-images.ts.
export const OG_URL = "/og";

const OG_IMAGE = { url: OG_URL, width: 1200, height: 630, alt: "KIQA DEV" };

/**
 * Metadata for a page. Next.js replaces (does not merge) nested objects like
 * `openGraph` when a child sets them, so every page must restate the shared
 * parts (site name, type, image) or it silently loses them.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  // Link previews have no <title> template, so carry the brand in the title.
  const shareTitle = `${title} | KIQA DEV`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: shareTitle, description, url: path, siteName: "KIQA DEV", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [OG_URL] },
  };
}
