import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog-posts";

const BASE = "https://kiqa-dev.it";

// No lastModified: stamping every URL with the build time tells crawlers
// everything changed on every deploy, which makes the field meaningless.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const posts: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
