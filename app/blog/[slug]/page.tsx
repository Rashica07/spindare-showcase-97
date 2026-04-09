import type { Metadata } from "next";
import { getPost } from "@/lib/blog-posts";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post ? post.title : "Blog Post",
    alternates: { canonical: `https://kiqa-dev.it/blog/${slug}` },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
