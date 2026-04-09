import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Code & Product Writing",
  alternates: { canonical: "https://kiqa-dev.it/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
