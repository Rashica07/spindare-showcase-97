'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";


export default function BlogPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState(t.blog.categories[0]);

  const filtered = active === t.blog.categories[0]
    ? t.blog.posts
    : t.blog.posts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="blog-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{t.blog.title}</h1>
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">{t.blog.sub}</p>
          </div>
        </div>
      </section>
      <section className="py-16" data-testid="blog-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="js-only flex flex-wrap gap-2 mb-12" data-testid="blog-filters">
            {t.blog.categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} data-testid={`blog-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${active === cat ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border/60 hover:text-foreground hover:border-muted-foreground/60 bg-card/40"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, i) => {
              return (
                <FadeUp key={post.slug} delay={i * 0.08} className="h-full">
                  <Link href={`/blog/${post.slug}`} data-testid={`blog-post-link-${i}`} className="block h-full">
                    <article className="group h-full border border-card-border bg-card rounded-xl p-8 flex flex-col gap-5 transition-colors hover:border-foreground/25" data-testid={`blog-post-${i}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs px-2.5 py-1 rounded-full border text-muted-foreground border-border">{post.category}</span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock size={11} />{post.read} {t.blog.minRead}</div>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="font-mono text-xs text-muted-foreground/60">{post.date}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          {t.blog.readMore} <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground text-sm" data-testid="blog-empty">{t.blog.noPosts}</div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
