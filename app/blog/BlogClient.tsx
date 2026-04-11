"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

export default function BlogClient() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "sending" | "done">("idle");
  const categories = t.blog.categories;
  const catKeys = ["All", "React Native", "Architecture", "Backend", "Design"];
  const catDisplay: Record<string, string> = Object.fromEntries(catKeys.map((k, i) => [k, t.blog.categories[i]]));
  const posts = t.blog.posts.filter((p) => { if (filter === 0) return true; return p.category === catKeys[filter]; });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter Signup", email, message: "[Newsletter] New subscriber: " + email }),
      });
    } catch { /* silent — not critical */ }
    setSubStatus("done");
  };

  return (
    <>
      <section className="page-hero" data-label="BLOG">
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
            {posts.map((post, i) => {
              const isFeatured = i === 0 && filter === 0;
              return (
                <FadeUp key={post.slug} delay={(i % 3) * 0.07}>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link-wrap">
                    <article className={`blog-card${isFeatured ? " blog-card--featured" : ""}`}>
                      <div className="blog-card-meta">
                        <span className="blog-card-category">{catDisplay[post.category] ?? post.category}</span>
                        <span className="blog-card-date-read">
                          <Clock size={12} />{post.read} {t.blog.minRead} · {post.date}
                        </span>
                      </div>
                      <h2 className={`blog-card-title${isFeatured ? " blog-card-title--featured" : ""}`}>{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <div className="blog-card-read">{t.blog.readMore} <ArrowRight size={13} /></div>
                    </article>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      <FadeUp>
        <section className="section-padded">
          <div className="section-inner">
            <div className="newsletter-block">
              <div className="newsletter-text">
                <p className="newsletter-title">Get updates when I ship something new</p>
                <p className="newsletter-sub">No spam. Occasional posts, projects, and things worth reading.</p>
              </div>
              {subStatus === "done" ? (
                <p className="newsletter-done">You&apos;re in. I&apos;ll be in touch.</p>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-primary newsletter-btn" disabled={subStatus === "sending"}>
                    {subStatus === "sending" ? "..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </FadeUp>
    </>
  );
}
