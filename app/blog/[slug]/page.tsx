import type { Metadata } from "next";
import { blogPosts, getPost } from "@/lib/blog-posts";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: post?.title ?? "KIQA DEV Blog" }];
  return {
    title: post ? post.title : "Blog Post",
    description: post ? post.excerpt : undefined,
    alternates: { canonical: `https://kiqa-dev.it/blog/${slug}` },
    openGraph: {
      type: "article",
      images: OG,
      authors: ["Kristian Gjergji"],
    },
    twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
