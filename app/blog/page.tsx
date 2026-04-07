"use client";
import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

export default function BlogPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);

  const categories = t.blog.categories;
  const posts = t.blog.posts.filter((p) => {
    if (filter === 0) return true;
    const cats = ["All", "React Native", "Architecture", "Backend", "Design"];
    return p.category === cats[filter];
  });

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
                <button
                  key={cat}
                  className={`filter-tab${filter === i ? " filter-tab--active" : ""}`}
                  onClick={() => setFilter(i)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          <div className="blog-grid">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={(i % 2) * 0.08}>
                <article className="blog-card">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-date-read">
                      <Clock size={12} />
                      {post.read} {t.blog.minRead} · {post.date}
                    </span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-link">
                    {t.blog.readMore} <ArrowRight size={13} />
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
