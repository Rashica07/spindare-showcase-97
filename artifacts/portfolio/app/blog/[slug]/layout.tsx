import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/blog-posts";
import { translations } from "@/lib/translations";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

// Rendered on demand, not prerendered with generateStaticParams: the
// Cloudflare (OpenNext) deployment has no incremental cache configured, so
// prerendered dynamic-route pages can't be served there and 404 instead.
// Unknown slugs get a real 404 from notFound() below.

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug } = await params;
  const post = translations.en.blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/blog/${slug}` },
  };
}

export default async function BlogPostLayout({ children, params }: Props) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();
  return children;
}
