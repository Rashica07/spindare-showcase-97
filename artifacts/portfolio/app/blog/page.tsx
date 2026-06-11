'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientOrbs } from "@/components/AmbientOrbs";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  "React Native": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "Architecture": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Backend": "text-green-400 border-green-400/30 bg-green-400/10",
  "Design": "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

export default function BlogPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState(t.blog.categories[0]);

  const filtered = active === t.blog.categories[0]
    ? t.blog.posts
    : t.blog.posts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientOrbs variant="blog" />
      <Navbar />

      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="blog-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.blog.label}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.blog.title}</h1>
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">{t.blog.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" data-testid="blog-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-12" data-testid="blog-filters">
            {t.blog.categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} data-testid={`blog-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${active === cat ? "bg-primary text-primary-foreground border-primary glow-orange-sm" : "text-muted-foreground border-border/60 hover:text-foreground hover:border-muted-foreground/60 bg-card/40"}`}>
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, i) => {
              const catColor = CATEGORY_COLORS[post.category] ?? "text-muted-foreground border-muted-foreground/30";
              return (
                <FadeUp key={post.slug} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} data-testid={`blog-post-link-${i}`}>
                    <motion.article whileHover={{ y: -6, borderColor: "hsl(var(--primary) / 0.35)", boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.1)" }} transition={{ duration: 0.2 }} className="group border border-card-border bg-card/70 backdrop-blur-sm rounded-xl p-8 flex flex-col gap-5 transition-all cursor-pointer" data-testid={`blog-post-${i}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${catColor}`}>{post.category}</span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock size={11} />{post.read} {t.blog.minRead}</div>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="font-mono text-xs text-muted-foreground/60">{post.date}</span>
                        <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          {t.blog.readMore} <ArrowRight size={11} />
                        </motion.span>
                      </div>
                    </motion.article>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground text-sm" data-testid="blog-empty">No posts in this category yet.</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
