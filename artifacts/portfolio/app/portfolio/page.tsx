'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { SiReact, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiExpo } from "react-icons/si";
import type { IconType } from "react-icons";
import { usePageOverride, pick, type BlockOverrides } from "@/components/PulseSyncProvider";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const ICON_MAP: Record<string, IconType> = {
  "React Native": SiReact, "TypeScript": SiTypescript, "Supabase": SiSupabase, "Next.js": SiNextdotjs, "Node.js": SiNodedotjs, "Expo": SiExpo,
};

const SPINDARE_SCREENS = [
  { id: "feed", name: "Feed", src: "/spindare-feed.webp" },
  { id: "profile", name: "Profile Screen", src: "/spindare-profile.webp" },
  { id: "notification", name: "Notification Screen", src: "/spindare-dark-feed.webp" },
  { id: "challenge", name: "Challenge", src: "/spindare-challenge.webp" },
  { id: "settings", name: "Settings", src: "/spindare-settings.webp" },
  { id: "wheel", name: "Wheel", src: "/spindare-wheel.webp" },
];

const TORRE_SCREENS = [
  { id: "torre", name: "Torre Group", src: "/torre-group-1.webp" },
  { id: "magfa", name: "Magfa Group", src: "/torre-group-2.webp" },
  { id: "swisstech", name: "Swisstech", src: "/torre-group-3.webp" },
  { id: "umbria", name: "Torre di Umbria", src: "/torre-group-4.webp" },
  { id: "home", name: "Torre Home", src: "/torre-group-5.webp" },
];

const LUXHOTEL_SCREENS = [
  { id: "home", name: "Landing Page", src: "/luxhotel-1.webp" },
  { id: "features", name: "Features", src: "/luxhotel-2.webp" },
  { id: "dashboard", name: "Dashboard", src: "/luxhotel-3.webp" },
  { id: "calendar", name: "Calendar", src: "/luxhotel-4.webp" },
];


export default function PortfolioPage() {
  const { t } = useLanguage();
  const overrides = usePageOverride('portfolio') as BlockOverrides;
  const [active, setActive] = useState("All");
  const [spindareActiveIdx, setSpindareActiveIdx] = useState(0);
  const [torreActiveIdx, setTorreActiveIdx] = useState(0);
  const [luxActiveIdx, setLuxActiveIdx] = useState(0);

  const allFilters = ["All", "Mobile", "Web"];
  const filtered = active === "All" ? t.work.projects : t.work.projects.filter((p) => p.type === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="portfolio-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{pick(overrides, 'label', t.work.label)}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{pick(overrides, 'title', t.work.title)}</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16" data-testid="portfolio-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2 mb-12" data-testid="portfolio-filters">
            {allFilters.map((f) => (
              <button key={f} onClick={() => setActive(f)} data-testid={`filter-${f.toLowerCase()}`}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${active === f ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"}`}>
                {f}
              </button>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const StatusColor = project.status === "Live" ? "text-green-400 border-green-400/30 bg-green-400/10" : project.status === "In Development" ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-muted-foreground/30";
              return (
                <FadeUp key={project.name} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="group glass-card rounded-xl overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-300" data-testid={`portfolio-project-${i}`}>
                    {project.name === "Spindare" ? (
                      <div className="relative h-[380px] bg-card flex flex-col items-center justify-center border-b border-card-border overflow-hidden p-4">
                        <div className="absolute inset-0 grid-bg opacity-15" />
                        <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10">
                          {SPINDARE_SCREENS.map((s, idx) => (
                            <button key={s.id} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSpindareActiveIdx(idx); }} className={`story-bar ${spindareActiveIdx === idx ? "story-bar--active" : ""}`} title={s.name} aria-label={`Show ${s.name}`} aria-pressed={spindareActiveIdx === idx}>
                              <span className="sr-only">{s.name}</span>
                            </button>
                          ))}
                        </div>
                        <div className="absolute top-7 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                          <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase">Spindare iOS</span>
                          <span className="font-mono text-[9px] text-primary tracking-widest uppercase font-semibold">{SPINDARE_SCREENS[spindareActiveIdx].name}</span>
                        </div>
                        
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between z-20 pointer-events-none">
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSpindareActiveIdx((prev) => (prev - 1 + SPINDARE_SCREENS.length) % SPINDARE_SCREENS.length); }} className="pointer-events-auto bg-background/90 text-muted-foreground hover:text-foreground rounded-full p-1 border border-border/50 hover:bg-background transition-colors"><ChevronLeft size={16} /></button>
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSpindareActiveIdx((prev) => (prev + 1) % SPINDARE_SCREENS.length); }} className="pointer-events-auto bg-background/90 text-muted-foreground hover:text-foreground rounded-full p-1 border border-border/50 hover:bg-background transition-colors"><ChevronRight size={16} /></button>
                        </div>

                        <div className="relative mt-8 w-[170px] h-[310px] rounded-[24px] border-4 border-card-border bg-background shadow-2xl overflow-hidden flex items-center justify-center">
                          <div className="absolute top-0 w-16 h-3 bg-card-border rounded-b-lg z-20" />
                          <Image key={spindareActiveIdx} src={SPINDARE_SCREENS[spindareActiveIdx].src} alt={SPINDARE_SCREENS[spindareActiveIdx].name} fill sizes="170px" className="object-cover z-10" />
                        </div>
                      </div>
                    ) : project.name === "Torre Group" ? (
                      <div className="relative h-[380px] bg-card flex flex-col items-center justify-center border-b border-card-border overflow-hidden p-4">
                        <div className="absolute inset-0 grid-bg opacity-15" />
                        <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10">
                          {TORRE_SCREENS.map((s, idx) => (
                            <button key={s.id} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTorreActiveIdx(idx); }} className={`story-bar ${torreActiveIdx === idx ? "story-bar--active" : ""}`} title={s.name} aria-label={`Show ${s.name}`} aria-pressed={torreActiveIdx === idx}>
                              <span className="sr-only">{s.name}</span>
                            </button>
                          ))}
                        </div>
                        <div className="absolute top-7 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                          <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase">torre-ks.com</span>
                          <span className="font-mono text-[9px] text-primary tracking-widest uppercase font-semibold">{TORRE_SCREENS[torreActiveIdx].name}</span>
                        </div>
                        
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between z-20 pointer-events-none">
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTorreActiveIdx((prev) => (prev - 1 + TORRE_SCREENS.length) % TORRE_SCREENS.length); }} className="pointer-events-auto bg-background/90 text-muted-foreground hover:text-foreground rounded-full p-1 border border-border/50 hover:bg-background transition-colors"><ChevronLeft size={16} /></button>
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTorreActiveIdx((prev) => (prev + 1) % TORRE_SCREENS.length); }} className="pointer-events-auto bg-background/90 text-muted-foreground hover:text-foreground rounded-full p-1 border border-border/50 hover:bg-background transition-colors"><ChevronRight size={16} /></button>
                        </div>

                        <div className="relative mt-8 w-[95%] max-w-[340px] h-[170px] rounded-t-lg border-x-4 border-t-4 border-card-border bg-background shadow-2xl overflow-hidden flex flex-col">
                          <div className="h-4 bg-card-border w-full flex items-center px-1.5 gap-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                          </div>
                          <Image key={torreActiveIdx} src={TORRE_SCREENS[torreActiveIdx].src} alt={TORRE_SCREENS[torreActiveIdx].name} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover object-top z-10" />
                        </div>
                      </div>
                    ) : project.name === "Onyx Freight Co." ? (
                      <div className="relative h-[380px] bg-gradient-to-br from-primary/20 to-card flex flex-col items-center justify-center border-b border-card-border overflow-hidden p-4">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="relative mt-4 w-[95%] max-w-[340px] h-[170px] rounded-lg border-2 border-primary/20 shadow-2xl overflow-hidden flex flex-col">
                          <Image src="/truckserv-1.webp" alt="Onyx Freight Co." fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover z-10" />
                        </div>
                      </div>
                    ) : project.name === "LuxHotelSystem" ? (
                      <div className="relative h-[380px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center border-b border-card-border overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        
                        <div className="absolute top-7 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                          <a href="https://luxhotelsystem.com" target="_blank" rel="noopener noreferrer" className="pointer-events-auto font-mono text-[9px] text-slate-400/80 hover:text-blue-400 tracking-widest uppercase transition-colors inline-flex items-center gap-1">
                            luxhotelsystem.com <ExternalLink size={8} />
                          </a>
                          <span className="font-mono text-[9px] text-blue-400 tracking-widest uppercase font-semibold">{LUXHOTEL_SCREENS[luxActiveIdx].name}</span>
                        </div>
                        
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between z-20 pointer-events-none">
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLuxActiveIdx((prev) => (prev - 1 + LUXHOTEL_SCREENS.length) % LUXHOTEL_SCREENS.length); }} className="pointer-events-auto bg-slate-900/90 text-slate-400 hover:text-slate-100 rounded-full p-1 border border-slate-700/50 hover:bg-slate-800 transition-colors"><ChevronLeft size={16} /></button>
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLuxActiveIdx((prev) => (prev + 1) % LUXHOTEL_SCREENS.length); }} className="pointer-events-auto bg-slate-900/90 text-slate-400 hover:text-slate-100 rounded-full p-1 border border-slate-700/50 hover:bg-slate-800 transition-colors"><ChevronRight size={16} /></button>
                        </div>

                        <div className="relative mt-8 w-full max-w-[280px] h-[170px] rounded-t-lg border-x-4 border-t-4 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col">
                          <div className="h-4 bg-slate-800 w-full flex items-center px-1.5 gap-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                          </div>
                          <Image key={luxActiveIdx} src={LUXHOTEL_SCREENS[luxActiveIdx].src} alt={LUXHOTEL_SCREENS[luxActiveIdx].name} fill sizes="(max-width: 768px) 100vw, 640px" className="object-contain object-top z-10" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-card to-muted/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <span className="font-mono text-5xl font-black text-muted-foreground/10 group-hover:text-primary/20 transition-colors">{project.name.slice(0, 2).toUpperCase()}</span>
                          <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${StatusColor}`}>{project.status}</span>
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground text-lg">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                          <span className="font-mono text-xs text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">{project.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((s, j) => {
                          const Icon = ICON_MAP[s];
                          return (
                            <span key={j} className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground border border-border/50 rounded px-2 py-1">
                              {Icon && <Icon size={10} />}{s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground text-sm" data-testid="portfolio-empty">{t.portfolio.noProjects}</div>
          )}
        </div>
      </section>
      <section className="py-20 border-t border-border/40 bg-card/20" data-testid="portfolio-cta">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-foreground">{t.portfolio.ctaTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.portfolio.ctaSub}</p>
            <div className="mt-8 flex justify-center">
              <a href="/contact" data-testid="portfolio-cta-link" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors">
                {t.portfolio.ctaButton} <ExternalLink size={14} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
      <Footer />
    </div>
  );
}
