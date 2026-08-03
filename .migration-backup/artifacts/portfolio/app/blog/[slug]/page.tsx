'use client';

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const CATEGORY_COLORS: Record<string, string> = {
  "React Native": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "Architecture": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Backend": "text-green-400 border-green-400/30 bg-green-400/10",
  "Design": "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

export default function BlogPostPage() {
  const { t } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const post = t.blog.posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="pt-40 pb-20 text-center" data-testid="blog-post-not-found">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">404</p>
          <h1 className="text-4xl font-bold text-foreground">Post not found</h1>
          <p className="mt-3 text-muted-foreground">This article doesn&apos;t exist or hasn&apos;t been published yet.</p>
          <Link href="/blog" data-testid="back-to-blog-404">
            <motion.span whileHover={{ x: -4 }} className="inline-flex items-center gap-2 mt-8 text-sm text-primary cursor-pointer">
              <ArrowLeft size={14} /> Back to writing
            </motion.span>
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[post.category] ?? "text-muted-foreground border-muted-foreground/30";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="page-hero-glow pt-32 pb-12 border-b border-border/40" data-testid="blog-post-hero">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Link href="/blog" data-testid="back-to-blog">
              <motion.span whileHover={{ x: -4 }} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8">
                <ArrowLeft size={12} /> Back to writing
              </motion.span>
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${catColor}`}>{post.category}</span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar size={11} />{post.date}</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock size={11} />{post.read} {t.blog.minRead}</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" data-testid="blog-post-body">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="border border-primary/30 bg-primary/5 rounded-xl p-10 text-center relative overflow-hidden shadow-lg glow-orange-sm">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3 relative z-10">Coming soon</p>
            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">Full article content is being written. Check back soon — or follow on GitHub to be notified when it goes live.</p>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" data-testid="blog-post-github-link" className="inline-flex items-center gap-2 mt-6 text-xs font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors">Follow on GitHub</a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
