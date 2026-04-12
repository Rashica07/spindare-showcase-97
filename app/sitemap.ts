import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

const BASE = "https://kiqa-dev.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/dev-hub`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/cv`,          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
