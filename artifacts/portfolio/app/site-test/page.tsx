'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Mail, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import spindareFeedImg from "@/public/spindare-feed.webp";
import torreGroup1Img from "@/public/torre-group-1.webp";
import luxhotel1Img from "@/public/luxhotel-1.webp";
import spindareWheelImg from "@/public/spindare-wheel.webp";
import craftpanelIconImg from "@/public/craftpanel-icon.webp";

const SCATTER_BASE = [
  { src: torreGroup1Img, caption: "Torre Group", w: 190 },
  { src: spindareFeedImg, caption: "Spindare", w: 150 },
  { src: luxhotel1Img, caption: "LuxHotelSystem", w: 210 },
  { src: spindareWheelImg, caption: "Spindare", w: 140 },
];

const ROTATIONS = [
  [-6, 3, 2, -3],
  [4, -5, -2, 6],
  [2, 4, -6, -2],
];

const CASE_STUDIES = [
  { key: "CraftPanel", img: craftpanelIconImg, fit: "contain" as const, bg: "bg-[#0a0908]", headline: "A desktop app that turns a terminal chore into one click" },
  { key: "Spindare", img: spindareFeedImg, fit: "cover" as const, bg: "bg-[#151515]", headline: "Co-building a social app's feed, auth, and rewards system from zero" },
  { key: "Torre Group", img: torreGroup1Img, fit: "cover" as const, bg: "bg-white", headline: "One redesign, four companies, a single unified presence" },
  { key: "LuxHotelSystem", img: luxhotel1Img, fit: "cover" as const, bg: "bg-[#0f172a]", headline: "A hotel platform interface built for a real external API" },
];

const TICKER_FACTS = [
  "SWIFT", "TAURI", "RUST", "REACT NATIVE", "NEXT.JS", "SUPABASE", "TYPESCRIPT", "LUA", "C++", "FIVEM",
];

const FAQ = [
  { q: "Are you available to hire?", a: "Yes — taking on select freelance projects from August 2026. Fixed price, delivery date in writing before anything starts." },
  { q: "How does working with you look?", a: "A call, a written proposal with a price and date within 24 hours, then direct contact with me through delivery. No account managers, no relay." },
  { q: "How do you know when something is done?", a: "When it's live on your domain, handed over with the code and documentation, and you've had 30 days of support to confirm it holds up." },
  { q: "Do you have a style?", a: "Clean over clever. I'd rather ship something simple that works than something impressive that's fragile." },
];

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" className={className} preserveAspectRatio="none" fill="none">
      <path d="M2 8 Q 30 2, 55 8 T 105 8 T 155 8 T 198 6" stroke="#5b9bd5" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function ChatFaq({ q, a, align }: { q: string; a: string; align: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`max-w-[85%] sm:max-w-md text-left rounded-2xl px-5 py-3.5 transition-colors ${align === "right" ? "bg-[#ff8a65] text-[#2a0f14] rounded-br-sm" : "bg-[#f6ede4]/10 text-[#f6ede4] rounded-bl-sm hover:bg-[#f6ede4]/[0.14]"}`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-sm">{q}</span>
          <Plus size={14} className={`shrink-0 transition-transform ${open ? "rotate-45" : ""}`} />
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <p className={`pt-2.5 text-sm leading-relaxed ${align === "right" ? "text-[#2a0f14]/80" : "text-[#f6ede4]/70"}`}>{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default function SiteTestPage() {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const [rotIdx, setRotIdx] = useState(0);
  const [peek, setPeek] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [skillTab, setSkillTab] = useState(0);
  const rotations = ROTATIONS[rotIdx];
  const experience = t.about.experience;
  const skillCats = t.about.skills.slice(0, 4);

  const scatter = useMemo(() => SCATTER_BASE.map((item, i) => ({ ...item, rotate: rotations[i] })), [rotations]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#2a0f14] text-[#f6ede4] overflow-x-hidden relative" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @keyframes kiqa-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .kiqa-ticker-track { animation: kiqa-ticker 22s linear infinite; }
      `}</style>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Floating pill nav — elevates into a filled card on scroll */}
      <div className="sticky top-4 z-50 flex justify-center px-6">
        <motion.div
          animate={{ boxShadow: scrolled ? "0 12px 30px -8px rgba(0,0,0,0.5)" : "0 0px 0px rgba(0,0,0,0)" }}
          className="flex items-center gap-6 rounded-full bg-[#f6ede4] text-[#2a0f14] pl-5 pr-2 py-2"
        >
          <span className="font-medium text-sm">Kristian Gjergji</span>
          <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1 text-sm text-[#2a0f14]/70 hover:text-[#2a0f14] transition-colors">
            <Github size={14} /> GitHub
          </a>
          <Link href="/contact" className="rounded-full bg-[#2a0f14] text-[#f6ede4] text-xs font-semibold px-4 py-2 hover:bg-[#3a1a20] transition-colors">
            Contact
          </Link>
        </motion.div>
      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#f6ede4]/20 px-4 py-1.5 text-xs font-mono tracking-wide">
          <span>FREELANCE DEVELOPER</span>
          <span className="text-[#f6ede4]/40">at</span>
          <span className="font-semibold">KIQA DEV</span>
          <span className="text-[#f6ede4]/40">&middot;</span>
          <span className="text-[#f6ede4]/60">KOSOVO / ITALY</span>
        </motion.div>

        <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-6xl font-medium leading-[1.08]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Turning briefs into <span className="relative inline-block">shipped<Squiggle className="absolute -bottom-1 left-0 w-full h-3" /></span> software.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 text-[#f6ede4]/70 leading-relaxed max-w-md">
              Self-taught since 2022. I build mobile apps, web platforms, and the odd
              FiveM server, and I quote every one of them with a fixed price and a
              delivery date before you commit to anything.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="inline-flex items-center gap-2 bg-[#f6ede4] text-[#2a0f14] font-semibold rounded-full px-6 py-3 text-sm hover:bg-white transition-colors">
                See selected work &darr;
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[#f6ede4]/30 rounded-full px-6 py-3 text-sm font-semibold hover:border-[#f6ede4]/60 transition-colors">
                Get in touch
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-6 text-sm text-[#f6ede4]/50">
              Building across mobile, web &amp; game servers since 2022
            </motion.p>
          </div>

          <div className="space-y-4">
            {/* Interactive scatter cluster */}
            <div className="relative h-[260px] hidden lg:block">
              {scatter.map((item, i) => (
                <motion.div
                  key={item.caption + i}
                  animate={{ rotate: item.rotate }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                  className="absolute rounded-lg overflow-hidden shadow-2xl border border-white/10"
                  style={{
                    width: item.w,
                    top: `${(i % 2) * 40 + 5}%`,
                    left: `${(i * 27) % 70}%`,
                  }}
                >
                  <Image src={item.src} alt={item.caption} className="w-full h-auto object-cover" />
                  {peek && (
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] font-mono bg-black/70 text-white px-1.5 py-0.5 rounded truncate">
                      {item.caption}
                    </span>
                  )}
                </motion.div>
              ))}
              <div className="absolute bottom-0 right-0 flex items-center gap-2">
                <button onClick={() => setPeek((v) => !v)} className="text-xs font-mono bg-[#f6ede4]/10 hover:bg-[#f6ede4]/20 rounded-full px-3 py-1.5 transition-colors">
                  Peek
                </button>
                <button onClick={() => setRotIdx((v) => (v + 1) % ROTATIONS.length)} className="text-xs font-mono bg-[#f6ede4]/10 hover:bg-[#f6ede4]/20 rounded-full px-3 py-1.5 transition-colors">
                  Shuffle
                </button>
              </div>
            </div>

            {/* Now-building status card */}
            <div className="rounded-xl border border-[#f6ede4]/10 bg-[#f6ede4]/[0.04] p-4">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#f6ede4]/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a65] animate-pulse" /> Now building
              </div>
              <div className="mt-2 font-medium">CraftPanel v3.1.0</div>
              <div className="mt-1 text-xs text-[#f6ede4]/50">Public beta &middot; self-hosted Minecraft server manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer License card */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex justify-center">
        <div className="w-full max-w-[380px] [perspective:1200px]">
          <motion.div
            className="relative w-full h-[220px] cursor-pointer [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setFlipped((v) => !v)}
          >
            <div className="absolute inset-0 rounded-xl bg-[#f6ede4] text-[#2a0f14] p-5 shadow-2xl [backface-visibility:hidden]">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#2a0f14]/50">
                <span>Developer License</span>
                <span># 0026</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-[#ff8a65] flex items-center justify-center text-xl font-bold shrink-0">KG</div>
                <div>
                  <div className="text-lg font-bold leading-tight">Kristian Gjergji</div>
                  <div className="text-xs text-[#2a0f14]/60 mt-0.5">Kosovo / Italy &middot; Est. 2022</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
                <span className="text-[#2a0f14]/50">EXPERTISE</span>
                <span className="text-[#2a0f14]/50">STATUS</span>
                <span>Swift, Rust, TS</span>
                <span className="text-[#ff6b3d] font-semibold">Available Aug '26</span>
              </div>
              <span className="absolute bottom-4 right-5 text-[10px] font-mono text-[#2a0f14]/40">tap to flip &rarr;</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-[#ff8a65] text-[#2a0f14] p-6 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center">
              <p className="text-sm leading-relaxed">
                Self-taught since 2022. I build the whole thing, quote it up front, and put a delivery date in writing before you pay anything.
              </p>
              <Link href="/contact" onClick={(e) => e.stopPropagation()} className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
                Start a project &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK — real case studies, real screenshots */}
      <section id="work" className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs font-mono tracking-widest uppercase text-[#f6ede4]/50">Selected work</div>
        <div className="mt-10 divide-y divide-[#f6ede4]/10">
          {CASE_STUDIES.slice(0, 2).map((cs, i) => {
            const project = t.work.projects.find((p) => p.name === cs.key);
            if (!project) return null;
            return (
              <motion.div
                key={cs.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 py-12 items-center"
              >
                <div className={`relative rounded-xl overflow-hidden aspect-[4/3] ${cs.bg} ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image src={cs.img} alt={project.name} className={`w-full h-full object-${cs.fit} ${cs.fit === "contain" ? "p-16" : ""}`} />
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#f6ede4]/50">{project.type} &middot; {project.year}</span>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-medium leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    {cs.headline}
                  </h3>
                  <p className="mt-4 text-sm text-[#f6ede4]/70 leading-relaxed">{project.desc}</p>
                  <Link href="/portfolio" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f6ede4]/10 hover:bg-[#f6ede4]/20 px-5 py-2.5 text-sm font-medium transition-colors">
                    Read story <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Full-bleed colored break */}
      <section className="relative z-10 bg-[#ff8a65] text-[#2a0f14] py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Not just prototypes. Live products.
          </h2>
          <Link href="/portfolio" className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#2a0f14] text-[#f6ede4] px-6 py-3 text-sm font-semibold hover:bg-[#3a1a20] transition-colors">
            See the full portfolio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Second half of selected work */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="divide-y divide-[#f6ede4]/10">
          {CASE_STUDIES.slice(2).map((cs, i) => {
            const project = t.work.projects.find((p) => p.name === cs.key);
            if (!project) return null;
            return (
              <motion.div
                key={cs.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 py-12 items-center"
              >
                <div className={`relative rounded-xl overflow-hidden aspect-[4/3] ${cs.bg} ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image src={cs.img} alt={project.name} className={`w-full h-full object-${cs.fit} ${cs.fit === "contain" ? "p-16" : ""}`} />
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#f6ede4]/50">{project.type} &middot; {project.year}</span>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-medium leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    {cs.headline}
                  </h3>
                  <p className="mt-4 text-sm text-[#f6ede4]/70 leading-relaxed">{project.desc}</p>
                  <Link href="/portfolio" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f6ede4]/10 hover:bg-[#f6ede4]/20 px-5 py-2.5 text-sm font-medium transition-colors">
                    Read story <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ticker — real tech names, looping marquee */}
      <div className="relative z-10 border-y border-[#f6ede4]/10 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap kiqa-ticker-track" style={{ width: "max-content" }}>
          {[...TICKER_FACTS, ...TICKER_FACTS].map((f, i) => (
            <span key={i} className="mx-6 text-sm font-mono tracking-widest text-[#f6ede4]/40 inline-flex items-center gap-6">
              {f} <span className="text-[#ff8a65]">&#10022;</span>
            </span>
          ))}
        </div>
      </div>

      {/* THINGS I ACTUALLY SHIP — tabbed craft panel */}
      <section className="relative z-10 bg-[#1a0a0d] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-mono tracking-widest uppercase text-[#f6ede4]/50">Craft</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Things I actually ship
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {skillCats.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setSkillTab(i)}
                className={`rounded-full px-4 py-2 text-sm font-mono tracking-wide transition-colors ${skillTab === i ? "bg-[#ff8a65] text-[#2a0f14]" : "bg-[#f6ede4]/10 text-[#f6ede4]/70 hover:bg-[#f6ede4]/20"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={skillTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {skillCats[skillTab]?.items.map((s) => (
                <span key={s} className="text-sm bg-[#f6ede4]/10 rounded-lg px-3 py-2">{s}</span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TIMELINE — real experience, elegant dark list */}
      <section className="relative z-10 bg-[#1a0a0d] pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            The story so far
          </h2>
          <div className="mt-8 divide-y divide-[#f6ede4]/10">
            {experience.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="py-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <div>
                  <h3 className="font-medium">{e.role}</h3>
                  <p className="mt-1 text-sm text-[#f6ede4]/60 max-w-xl">{e.desc}</p>
                </div>
                <span className="font-mono text-xs text-[#f6ede4]/40 shrink-0">{e.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat-bubble FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-widest uppercase text-[#f6ede4]/50">FAQ</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Things I've been asked
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <ChatFaq key={f.q} q={f.q} a={f.a} align={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 px-6 pb-24 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-medium leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Designing things that <em className="not-italic text-[#ff8a65]">feel as good</em> as they work.
        </h2>
        <p className="mt-6 text-[#f6ede4]/70 leading-relaxed">
          Fixed price, fixed delivery date, one point of contact throughout.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <Link href="/portfolio" className="underline decoration-[#ff8a65] decoration-2 underline-offset-4 hover:text-[#ff8a65] transition-colors">
            See the real portfolio
          </Link>
          <Link href="/contact" className="bg-[#ff8a65] text-[#2a0f14] font-semibold rounded-full px-5 py-2.5 hover:bg-[#ffab8f] transition-colors">
            Let's talk
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-medium">Kristian Gjergji</span>
          <div className="flex items-center gap-5 text-sm text-[#f6ede4]/60">
            <a href="mailto:contact@kiqa-dev.it" className="hover:text-[#f6ede4] transition-colors inline-flex items-center gap-1.5"><Mail size={13} /> Email</a>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="hover:text-[#f6ede4] transition-colors inline-flex items-center gap-1.5"><Github size={13} /> GitHub</a>
            <Link href="/contact" className="hover:text-[#f6ede4] transition-colors">Contact</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-4 text-xs text-[#f6ede4]/40 text-center sm:text-left">
          &copy; 2026 Kristian Gjergji &middot; Kosovo / Italy &middot; A design preview at test.kiqa-dev.it &mdash; <Link href="/" className="underline hover:text-[#f6ede4]/70">the live site is here</Link>.
        </div>
      </footer>
    </div>
  );
}
