import { MetadataRoute } from "next";

const BASE = "https://kiq.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
