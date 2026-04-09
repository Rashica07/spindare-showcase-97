"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

export default function BlogClient() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);
  const categories = t.blog.categories;
  const catKeys = ["All", "React Native", "Architecture", "Backend", "Design"];
  const catDisplay: Record<string, string> = Object.fromEntries(catKeys.map((k, i) => [k, t.blog.categories[i]]));
  const posts = t.blog.posts.filter((p) => { if (filter === 0) return true; return p.category === catKeys[filter]; });

  return (
    <>
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.blog.hero.label}</p>
          <h1 className="page-hero-title">{t.blog.hero.title}</h1>
          <p className="page-hero-sub">{t.blog.hero.sub}</p>
        </div>
      </section>
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <div className="filter-tabs">
              {categories.map((cat, i) => (
                <button key={cat} className={`filter-tab${filter === i ? " filter-tab--active" : ""}`} onClick={() => setFilter(i)}>{cat}</button>
              ))}
            </div>
          </FadeUp>
          <div className="blog-grid">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={(i % 2) * 0.08}>
                <Link href={`/blog/${post.slug}`} className="blog-card-link-wrap">
                  <article className="blog-card">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{catDisplay[post.category] ?? post.category}</span>
                      <span className="blog-card-date-read"><Clock size={12} />{post.read} {t.blog.minRead} · {post.date}</span>
                    </div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-read">{t.blog.readMore} <ArrowRight size={13} /></div>
                  </article>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
