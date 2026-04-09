import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Code & Product Writing",
  description: "Development writing by Kristian Gjergji. React Native performance, architecture decisions, backend patterns, and product insights from building real apps.",
  alternates: { canonical: "https://kiqa-dev.it/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
