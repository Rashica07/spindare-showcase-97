'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getBlogPost } from "@/lib/blog-posts";
import type { Section } from "@/lib/blog-posts";
import { Footer } from "@/components/Footer";

const CATEGORY_COLORS: Record<string, string> = {
  "React Native": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "Architecture":  "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Backend":       "text-green-400 border-green-400/30 bg-green-400/10",
  "Design":        "text-pink-400 border-pink-400/30 bg-pink-400/10",
  "AI":            "text-amber-400 border-amber-400/30 bg-amber-400/10",
};

function Renderer({ sections }: { sections: Section[] }) {
  return (
    <div className="prose-custom">
      {sections.map((s, i) => {
        switch (s.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-foreground tracking-tight">
                {s.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-3 text-lg font-semibold text-foreground">
                {s.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mb-5 text-muted-foreground leading-[1.85] text-[15px]">
                {s.text}
              </p>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-6 border-l-2 border-primary pl-5">
                <p className="text-foreground italic leading-relaxed text-[15px]">&ldquo;{s.text}&rdquo;</p>
                {s.by && (
                  <cite className="mt-2 block font-mono text-xs text-muted-foreground/60 not-italic">
                    {s.by}
                  </cite>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className="my-7 flex gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <span className="mt-0.5 shrink-0 text-lg leading-none">{s.emoji}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{s.text}</p>
              </div>
            );
          case "ul":
            return (
              <ul key={i} className="mb-5 space-y-2 pl-1">
                {s.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-5 space-y-3 pl-1">
                {s.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                    <span className="shrink-0 font-mono text-xs text-primary mt-[3px] w-5">{j + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <div key={i} className="my-6 overflow-hidden rounded-xl border border-border/60 bg-[#0d0a07]">
                <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/40" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <span className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-muted-foreground/50">{s.lang}</span>
                </div>
                <pre className="overflow-x-auto p-5">
                  <code className="font-mono text-xs leading-[1.9] text-foreground/80">
                    {s.lines.join("\n")}
                  </code>
                </pre>
              </div>
            );
          case "divider":
            return <hr key={i} className="my-10 border-border/30" />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const { t } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const meta    = t.blog.posts.find((p) => p.slug === slug);
  const content = getBlogPost(slug);

  if (!meta) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <section className="pt-40 pb-20 text-center" data-testid="blog-post-not-found">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">404</p>
          <h1 className="text-4xl font-bold text-foreground">{t.blog.postNotFound}</h1>
          <p className="mt-3 text-muted-foreground">{t.blog.postNotFoundDesc}</p>
          <Link href="/blog" data-testid="back-to-blog-404">
            <motion.span whileHover={{ x: -4 }} className="inline-flex items-center gap-2 mt-8 text-sm text-primary cursor-pointer">
              <ArrowLeft size={14} /> {t.blog.backToWriting}
            </motion.span>
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[meta.category] ?? "text-muted-foreground border-muted-foreground/30";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="page-hero-glow pt-32 pb-12 border-b border-border/40" data-testid="blog-post-hero">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/blog" data-testid="back-to-blog">
              <motion.span
                whileHover={{ x: -4 }}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8 block"
              >
                <ArrowLeft size={12} /> {t.blog.backToWriting}
              </motion.span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${catColor}`}>
                {meta.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={11} />{meta.date}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={11} />{meta.read} {t.blog.minRead}
              </div>
              {content && (
                <span className="font-mono text-xs text-muted-foreground/50">
                  {t.blog.byAuthor} {content.author}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {meta.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {meta.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" data-testid="blog-post-body">
        <div className="max-w-3xl mx-auto px-6">
          {content ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Renderer sections={content.sections} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-primary/30 bg-primary/5 rounded-xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3 relative z-10">{t.blog.comingSoon}</p>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t.blog.comingSoonDesc}
              </p>
              <a
                href="https://github.com/rashica07"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="blog-post-github-link"
                className="inline-flex items-center gap-2 mt-6 text-xs font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors"
              >
                {t.blog.followGithub}
              </a>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-10 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-xs text-muted-foreground/60 font-mono">{t.blog.writtenBy}</p>
              <p className="mt-1 font-semibold text-foreground">Kristian Gjergji</p>
              <p className="text-sm text-muted-foreground">{t.blog.authorRole}</p>
            </div>
            <Link
              href="/contact"
              data-testid="blog-post-cta"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t.blog.workWithMe}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
