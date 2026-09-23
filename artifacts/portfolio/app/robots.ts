import type { MetadataRoute } from "next";

// Every crawler, AI ones included, may read the whole site; /llms.txt is a
// plain public file. The design previews and /contact/sent stay out of the
// index through their noindex meta tag, which crawlers can only see if
// robots.txt lets them fetch the page, so nothing is disallowed here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://kiqa-dev.it/sitemap.xml",
  };
}
