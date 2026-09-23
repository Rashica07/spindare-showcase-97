import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/blog-posts";
import { translations } from "@/lib/translations";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Unknown slugs are real 404s, not an empty article page with status 200.
export const dynamicParams = false;

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
