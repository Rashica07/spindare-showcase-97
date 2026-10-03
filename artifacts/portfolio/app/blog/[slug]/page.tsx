'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getBlogPost } from "@/lib/blog-posts";
import type { Section } from "@/lib/blog-posts";
import { Footer } from "@/components/Footer";

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
              <blockquote key={i} className="my-6 border-l-2 border-foreground/30 pl-5">
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
              <div key={i} className="my-7 flex gap-4 rounded-xl border border-border bg-card px-5 py-4">
                <div className="mt-0.5 shrink-0 text-muted-foreground">
                  <Lightbulb size={20} className="opacity-80" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{s.text}</p>
              </div>
            );
          case "ul":
            return (
              <ul key={i} className="mb-5 space-y-2 pl-1">
                {s.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/70" />
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
                    <span className="shrink-0 tabular-nums text-sm text-muted-foreground mt-[2px] w-5">{j + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <div key={i} className="my-6 overflow-hidden rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                    <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                    <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
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
          <p className="font-mono text-sm text-muted-foreground mb-4">404</p>
          <h1 className="text-4xl font-bold text-foreground">{t.blog.postNotFound}</h1>
          <p className="mt-3 text-muted-foreground">{t.blog.postNotFoundDesc}</p>
          <Link href="/blog" data-testid="back-to-blog-404" className="inline-flex items-center gap-2 mt-8 text-sm text-primary hover:underline underline-offset-4">
            <ArrowLeft size={14} aria-hidden="true" /> {t.blog.backToWriting}
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="page-hero-glow pt-32 pb-12 border-b border-border/40" data-testid="blog-post-hero">
        <div className="max-w-3xl mx-auto px-6">
          <div className="hero-in">
            <Link href="/blog" data-testid="back-to-blog" className="mb-8 inline-flex items-center gap-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={12} aria-hidden="true" /> {t.blog.backToWriting}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full border text-muted-foreground border-border">
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
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="blog-post-body">
        <div className="max-w-3xl mx-auto px-6">
          {content ? (
            <Renderer sections={content.sections} />
          ) : (
            <div className="border border-border bg-card rounded-xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
              <p className="font-semibold text-foreground mb-3 relative z-10">{t.blog.comingSoon}</p>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t.blog.comingSoonDesc}
              </p>
              <a
                href="https://github.com/rashica07"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="blog-post-github-link"
                className="inline-flex items-center gap-2 mt-6 text-xs font-medium text-foreground border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors"
              >
                {t.blog.followGithub}
              </a>
            </div>
          )}

          <div
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
