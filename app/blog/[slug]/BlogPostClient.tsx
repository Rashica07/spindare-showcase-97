"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getPost } from "@/lib/blog-posts";
import { useLanguage } from "@/lib/i18n";

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="blog-post-h2">{line.slice(3)}</h2>);
      i++;
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(<p key={key++} className="blog-post-bold">{line.slice(2, -2)}</p>);
      i++;
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { codeLines.push(lines[i]); i++; }
      elements.push(<pre key={key++} className="blog-post-code"><code>{codeLines.join("\n")}</code></pre>);
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const text = line.replace(/\*\*(.+?)\*\*/g, "BOLD_START$1BOLD_END").replace(/`(.+?)`/g, "CODE_START$1CODE_END");
      const parts = text.split(/(BOLD_START.*?BOLD_END|CODE_START.*?CODE_END)/g);
      elements.push(
        <p key={key++} className="blog-post-p">
          {parts.map((part, pi) => {
            if (part.startsWith("BOLD_START") && part.endsWith("BOLD_END")) return <strong key={pi}>{part.slice(10, -8)}</strong>;
            if (part.startsWith("CODE_START") && part.endsWith("CODE_END")) return <code key={pi} className="blog-post-inline-code">{part.slice(10, -8)}</code>;
            return part;
          })}
        </p>
      );
      i++;
    }
  }
  return elements;
}

export default function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPost(slug);
  const { t } = useLanguage();

  if (!post) notFound();

  const catKeys = ["All", "React Native", "Architecture", "Backend", "Design"];
  const catDisplay: Record<string, string> = Object.fromEntries(catKeys.map((k, i) => [k, t.blog.categories[i]]));
  const localPost = t.blog.posts.find((p) => p.slug === slug);
  const title = localPost?.title ?? post.title;
  const excerpt = localPost?.excerpt ?? post.excerpt;
  const date = localPost?.date ?? post.date;

  return (
    <>
      <section className="blog-post-hero">
        <div className="section-inner">
          <Link href="/blog" className="blog-post-back"><ArrowLeft size={14} /> {t.blog.hero.label}</Link>
          <div className="blog-post-meta-row">
            <span className="blog-card-category"><Tag size={11} /> {catDisplay[post.category] ?? post.category}</span>
            <span className="blog-card-date-read"><Clock size={12} />{post.read} {t.blog.minRead} · {date}</span>
          </div>
          <h1 className="blog-post-title">{title}</h1>
          <p className="blog-post-excerpt">{excerpt}</p>
        </div>
      </section>
      <article className="blog-post-body">
        <div className="section-inner blog-post-content">{renderContent(post.content)}</div>
      </article>
      <div className="divider" />
      <section className="section-padded">
        <div className="section-inner blog-post-footer">
          <Link href="/blog" className="btn-secondary"><ArrowLeft size={14} /> {t.blog.hero.label}</Link>
          <Link href="/contact" className="btn-primary">{t.common.getQuote}</Link>
        </div>
      </section>
    </>
  );
}
