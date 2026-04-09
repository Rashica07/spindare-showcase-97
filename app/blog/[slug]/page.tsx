import type { Metadata } from "next";
import { blogPosts, getPost } from "@/lib/blog-posts";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post ? post.title : "Blog Post",
    description: post ? post.excerpt : undefined,
    alternates: { canonical: `https://kiqa-dev.it/blog/${slug}` },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
