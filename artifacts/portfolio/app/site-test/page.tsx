'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import spindareFeedImg from "@/public/spindare-feed.webp";
import torreGroup1Img from "@/public/torre-group-1.webp";
import luxhotel1Img from "@/public/luxhotel-1.webp";
import spindareWheelImg from "@/public/spindare-wheel.webp";

const SCATTER = [
  { src: torreGroup1Img, caption: "Torre Group", className: "top-[16%] left-[6%] w-[150px] sm:w-[190px] -rotate-6" },
  { src: spindareFeedImg, caption: "Spindare", className: "top-[10%] right-[8%] w-[120px] sm:w-[150px] rotate-3" },
  { src: luxhotel1Img, caption: "LuxHotelSystem", className: "bottom-[20%] left-[4%] w-[160px] sm:w-[210px] rotate-2" },
  { src: spindareWheelImg, caption: "Spindare", className: "bottom-[10%] right-[6%] w-[110px] sm:w-[140px] -rotate-3" },
];

const NOTES = [
  { text: "ships things\nthat actually\nwork", className: "top-[38%] left-[2%] sm:left-[10%] -rotate-6 bg-[#f2c14e]" },
  { text: "professionally\nparticular about\ndeadlines", className: "bottom-[6%] left-[38%] rotate-3 bg-[#ff8a65]" },
];

export default function SiteTestPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-[#2a0f14] text-[#f6ede4] overflow-x-hidden relative" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* faint film-grain texture, no external asset needed */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-8">
        <span className="text-lg font-medium tracking-tight">Kristian</span>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-[#f6ede4]/70">
          <a href="#work" className="hover:text-[#f6ede4] transition-colors">Work</a>
          <Link href="/about" className="hover:text-[#f6ede4] transition-colors">About</Link>
        </nav>
        <Link href="/contact" className="text-sm underline decoration-[#ff8a65] decoration-2 underline-offset-4 hover:text-[#ff8a65] transition-colors">
          Let's talk
        </Link>
      </header>

      {/* Scattered gallery — desktop only, collapses to a simple stack below */}
      <section className="relative z-10 hidden md:block h-[820px] max-w-[1400px] mx-auto">
        {SCATTER.map((item) => (
          <motion.div
            key={item.caption + item.className}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className={`absolute rounded-lg overflow-hidden shadow-2xl border border-white/10 ${item.className}`}
          >
            <Image src={item.src} alt={item.caption} className="w-full h-auto object-cover" />
          </motion.div>
        ))}

        {NOTES.map((note) => (
          <div key={note.text} className={`absolute w-[140px] p-4 text-[#2a0f14] text-sm font-medium leading-snug rotate-2 shadow-xl ${note.className}`} style={{ whiteSpace: "pre-line" }}>
            {note.text}
          </div>
        ))}

        {/* The ID-card centerpiece */}
        <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-[340px] [perspective:1200px]">
          <motion.div
            className="relative w-full h-[210px] cursor-pointer [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setFlipped((v) => !v)}
          >
            {/* Front */}
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
            {/* Back */}
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

      {/* Mobile-friendly stacked fallback */}
      <section className="relative z-10 md:hidden px-6 pb-10">
        <div className="w-full max-w-sm mx-auto [perspective:1200px]">
          <motion.div
            className="relative w-full h-[200px] cursor-pointer [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setFlipped((v) => !v)}
          >
            <div className="absolute inset-0 rounded-xl bg-[#f6ede4] text-[#2a0f14] p-5 shadow-2xl [backface-visibility:hidden]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-md bg-[#ff8a65] flex items-center justify-center text-lg font-bold shrink-0">KG</div>
                <div>
                  <div className="text-base font-bold leading-tight">Kristian Gjergji</div>
                  <div className="text-xs text-[#2a0f14]/60 mt-0.5">Kosovo / Italy</div>
                </div>
              </div>
              <span className="absolute bottom-3 right-4 text-[10px] font-mono text-[#2a0f14]/40">tap to flip &rarr;</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-[#ff8a65] text-[#2a0f14] p-5 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center">
              <p className="text-sm leading-relaxed">Fixed price, one contact, launch date in writing.</p>
              <Link href="/contact" onClick={(e) => e.stopPropagation()} className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
                Start a project &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {SCATTER.map((item) => (
            <div key={item.caption + item.className} className="rounded-lg overflow-hidden border border-white/10">
              <Image src={item.src} alt={item.caption} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="relative z-10 px-6 sm:px-10 pb-24 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-medium leading-tight">
          Designing things that <em className="not-italic text-[#ff8a65]">feel as good</em> as they work.
        </h1>
        <p className="mt-6 text-[#f6ede4]/70 leading-relaxed">
          Freelance developer building mobile apps, landing pages, and web platforms &mdash;
          fixed price, fixed delivery date, one point of contact throughout.
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

      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-xs text-[#f6ede4]/40">
        A design preview at test.kiqa-dev.it &mdash; <Link href="/" className="underline hover:text-[#f6ede4]/70">the live site is here</Link>.
      </footer>
    </div>
  );
}
