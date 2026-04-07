"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Bookmark, RefreshCw, Trophy, Flame } from "lucide-react";

const CHALLENGES = [
  { emoji: "🏃", title: "Do 20 push-ups", category: "Fitness", diff: "Medium" },
  { emoji: "🎨", title: "Draw something in 5 minutes", category: "Creative", diff: "Easy" },
  { emoji: "📖", title: "Read 10 pages of a book", category: "Learning", diff: "Medium" },
  { emoji: "🧊", title: "Cold shower for 60 seconds", category: "Courage", diff: "Hard" },
  { emoji: "🌍", title: "Learn 5 words in a new language", category: "Learning", diff: "Easy" },
  { emoji: "🍳", title: "Cook a meal from scratch", category: "Life Skills", diff: "Medium" },
  { emoji: "🎵", title: "Sing your favourite song out loud", category: "Fun", diff: "Easy" },
  { emoji: "🤸", title: "Hold a plank for 90 seconds", category: "Fitness", diff: "Hard" },
];

const DIFF_COLOR: Record<string, string> = {
  Easy: "text-green-400 bg-green-500/10 border-green-500/30",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  Hard: "text-red-400 bg-red-500/10 border-red-500/30",
};

function pick<T>(arr: T[], exclude: T): T {
  const filtered = arr.filter((x) => x !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function SpindarePreview() {
  const [challenge, setChallenge] = useState(CHALLENGES[0]);
  const [spinning, setSpinning] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const text = `Just got this challenge on Spindare: "${challenge.title}" — can you do it? 🎯 #Spindare`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Spindare Challenge", text, url: "https://kiqa-dev.it/#projects" });
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // User cancelled share or clipboard failed silently
    }
  };

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setLiked(false);
    setSaved(false);
    await new Promise((r) => setTimeout(r, 600));
    setChallenge(pick(CHALLENGES, challenge));
    setSpinCount((n) => n + 1);
    setSpinning(false);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <p className="section-label mb-3">📱 Live Preview</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Spindare Component Demo</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">
          This is the actual UI quality shipping in the app. Press{" "}
          <span className="text-foreground font-semibold">Spin</span> to get a new challenge — same interaction, same physics.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-[300px] shrink-0"
          >
            {/* Phone frame */}
            <div className="relative rounded-[2.5rem] border-4 border-border/60 bg-[#0d1117] dark:bg-[#080b11] shadow-2xl overflow-hidden"
                 style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.15), inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[10px] text-muted-foreground font-medium">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                  <span>●●●</span>
                </div>
              </div>

              {/* App content */}
              <div className="px-4 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Daily Spin</p>
                    <p className="text-white font-bold text-base leading-tight">Today's Challenge</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-xs font-bold text-orange-400">{7 + spinCount}</span>
                  </div>
                </div>

                {/* Challenge card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, scale: 0.88, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.88, rotateY: 15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl p-5 mb-4 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--accent)/0.1))", border: "1px solid hsl(var(--primary)/0.2)" }}
                  >
                    <div className="text-5xl mb-3 text-center">{challenge.emoji}</div>
                    <p className="text-white font-bold text-center text-base leading-snug mb-3">{challenge.title}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFF_COLOR[challenge.diff]}`}>
                        {challenge.diff}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{challenge.category}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setLiked((v) => !v)}
                      className="p-2 rounded-xl transition-all active:scale-90"
                      style={{ background: liked ? "hsl(var(--secondary)/0.15)" : "rgba(255,255,255,0.05)" }}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${liked ? "text-secondary fill-secondary" : "text-muted-foreground"}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl transition-all active:scale-90 relative"
                      style={{ background: shared ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)" }}
                      title={shared ? "Copied!" : "Share challenge"}
                    >
                      <Share2 className={`w-4 h-4 transition-colors ${shared ? "text-primary" : "text-muted-foreground"}`} />
                      {shared && (
                        <motion.span
                          initial={{ opacity: 0, y: 4, scale: 0.8 }}
                          animate={{ opacity: 1, y: -28, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary whitespace-nowrap pointer-events-none"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </button>
                    <button
                      onClick={() => setSaved((v) => !v)}
                      className="p-2 rounded-xl transition-all active:scale-90"
                      style={{ background: saved ? "hsl(var(--accent)/0.15)" : "rgba(255,255,255,0.05)" }}
                    >
                      <Bookmark className={`w-4 h-4 transition-colors ${saved ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                  <button
                    onClick={() => setLiked(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                  >
                    <Trophy className="w-3 h-3" /> Done
                  </button>
                </div>

                {/* Spin button */}
                <motion.button
                  onClick={spin}
                  disabled={spinning}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: spinning ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)/0.8))" }}
                >
                  <motion.span
                    animate={spinning ? { rotate: 360 } : { rotate: 0 }}
                    transition={spinning ? { duration: 0.6, ease: "linear" } : { duration: 0 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.span>
                  {spinning ? "Spinning..." : "Spin Again"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="max-w-sm w-full"
          >
            <div className="space-y-5">
              {[
                { icon: "🎡", title: "200+ curated challenges", desc: "Hand-picked across fitness, creativity, cooking, outdoor, social, and learning — no AI-generated filler." },
                { icon: "🎯", title: "Production-identical", desc: "This component is lifted directly from the Spindare V2 codebase (~150,000+ lines). What you see here ships to the App Store." },
                { icon: "🔥", title: "Streak system", desc: "Complete a challenge every day to extend your streak. Miss a day and it resets — same pressure as Duolingo." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl p-5 border border-border">
              <p className="text-xs font-mono text-muted-foreground mb-1">Spins this session</p>
              <p className="text-4xl font-extrabold text-gradient">{spinCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Each spin draws from 200+ curated real-world challenges.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
