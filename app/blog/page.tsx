import type { Metadata } from "next";
import BlogClient from "./BlogClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — Blog" }];

export const metadata: Metadata = {
  title: "Blog — Code & Product Writing",
  description: "Development writing by Kristian Gjergji. React Native performance, architecture decisions, backend patterns, and product insights from building real apps.",
  alternates: { canonical: "https://kiqa-dev.it/blog" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function BlogPage() {
  return <BlogClient />;
}
