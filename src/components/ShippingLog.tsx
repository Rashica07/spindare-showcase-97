"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

const posts = [
  {
    date: "Mar 28, 2026",
    readTime: "4 min",
    tag: "React Native",
    title: "How I fixed a memory leak in FlatList that was crashing Spindare's social feed",
    excerpt:
      "After a week of users reporting random crashes on the feed screen, I finally tracked it down: anonymous arrow functions passed as renderItem were causing unnecessary re-renders and keeping old list items in memory. Here's the three-line fix that made everything stable.",
    slug: "#",
  },
  {
    date: "Mar 14, 2026",
    readTime: "6 min",
    tag: "Architecture",
    title: "Why I rebuilt Spindare's authentication flow in 48 hours — and why I don't regret it",
    excerpt:
      "We started with a custom JWT setup I'd rolled myself. At 5,000 lines in, the session refresh logic was a nightmare and OAuth wasn't working reliably. Switching to Clerk took two days and cut our auth-related bug reports by 90%. I'll walk through exactly what I moved and what I kept.",
    slug: "#",
  },
  {
    date: "Feb 22, 2026",
    readTime: "5 min",
    tag: "Backend",
    title: "Supabase Realtime vs Firebase for social feeds: what I found after stress-testing both",
    excerpt:
      "Everyone says Firebase is simpler, but when I tested both against a simulated 10K concurrent users sending challenge reactions, Supabase's Realtime channels consistently delivered messages with 30% lower latency. The reason comes down to how PostgreSQL's LISTEN/NOTIFY works under the hood.",
    slug: "#",
  },
];

export default function ShippingLog() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-3">📝 The Shipping Log</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Dev Diary</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Every hard bug, every architectural decision, every lesson learned — written down so others don't have to figure it out alone.
        </p>

        <div className="space-y-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 sm:p-7 border border-border group hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  <Tag className="w-3 h-3" />
                  {post.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} read
                </span>
              </div>

              <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            More posts coming as I ship.{" "}
            <a href="https://twitter.com/kristiangjergj4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Follow along on Twitter
            </a>{" "}
            to get notified.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
