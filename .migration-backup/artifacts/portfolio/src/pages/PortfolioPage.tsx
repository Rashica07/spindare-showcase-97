import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiReact, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiExpo } from "react-icons/si";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  "React Native": SiReact,
  "TypeScript": SiTypescript,
  "Supabase": SiSupabase,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Expo": SiExpo,
};

const SPINDARE_SCREENS = [
  { id: "feed", name: "Feed", src: "/spindare-feed.jpg" },
  { id: "profile", name: "Profile Screen", src: "/spindare-profile.jpg" },
  { id: "notification", name: "Notification Screen", src: "/spindare-dark-feed.jpg" },
  { id: "challenge", name: "Challenge", src: "/spindare-challenge.jpg" },
  { id: "settings", name: "Settings", src: "/spindare-settings.jpg" },
  { id: "wheel", name: "Wheel", src: "/spindare-wheel.jpg" },
];

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState("All");
  const [spindareActiveIdx, setSpindareActiveIdx] = useState(0);

  const allFilters = ["All", "Mobile", "Web"];

  const filtered = active === "All"
    ? t.work.projects
    : t.work.projects.filter((p) => p.type === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="portfolio-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Portfolio</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.work.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16" data-testid="portfolio-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mb-12"
            data-testid="portfolio-filters"
          >
            {allFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-testid={`filter-${f.toLowerCase()}`}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${
                  active === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const StatusColor =
                project.status === "Live"
                  ? "text-green-400 border-green-400/30 bg-green-400/10"
                  : project.status === "In Development"
                  ? "text-primary border-primary/30 bg-primary/10"
                  : "text-muted-foreground border-muted-foreground/30";

              return (
                <FadeUp key={project.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group glass-card rounded-xl overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-300"
                    data-testid={`portfolio-project-${i}`}
                  >
                    {project.name === "Spindare" ? (
                      <div className="relative h-[380px] bg-card flex flex-col items-center justify-center border-b border-card-border overflow-hidden p-4">
                        <div className="absolute inset-0 grid-bg opacity-15" />
                        
                        {/* 6 Story-like indicator bars at the top */}
                        <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10">
                          {SPINDARE_SCREENS.map((s, idx) => (
                            <button
                              key={s.id}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSpindareActiveIdx(idx);
                              }}
                              className={`story-bar ${spindareActiveIdx === idx ? "story-bar--active" : ""}`}
                              title={s.name}
                              aria-label={`Show ${s.name}`}
                              aria-pressed={spindareActiveIdx === idx}
                            >
                              <span className="sr-only">{s.name}</span>
                            </button>
                          ))}
                        </div>

                        {/* Active screen label */}
                        <div className="absolute top-7 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                          <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase">
                            Spindare iOS
                          </span>
                          <span className="font-mono text-[9px] text-primary tracking-widest uppercase font-semibold">
                            {SPINDARE_SCREENS[spindareActiveIdx].name}
                          </span>
                        </div>

                        {/* Interactive mobile device mockup frame */}
                        <div className="relative mt-8 w-[170px] h-[310px] rounded-[24px] border-4 border-card-border bg-background shadow-2xl overflow-hidden flex items-center justify-center">
                          <div className="absolute top-0 w-16 h-3 bg-card-border rounded-b-lg z-20" />
                          <motion.img 
                            key={spindareActiveIdx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            src={SPINDARE_SCREENS[spindareActiveIdx].src} 
                            alt={SPINDARE_SCREENS[spindareActiveIdx].name}
                            className="w-full h-full object-cover z-10"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-card to-muted/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <span className="font-mono text-5xl font-black text-muted-foreground/10 group-hover:text-primary/20 transition-colors">
                            {project.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${StatusColor}`}>
                            {project.status}
                          </span>
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
                              {Icon && <Icon size={10} />}
                              {s}
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
            <div className="py-20 text-center text-muted-foreground text-sm" data-testid="portfolio-empty">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/40 bg-card/20" data-testid="portfolio-cta">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-foreground">Want to see your project here?</h2>
            <p className="mt-3 text-muted-foreground">Let's build something production-grade together.</p>
            <div className="mt-8 flex justify-center">
              <a
                href="/contact"
                data-testid="portfolio-cta-link"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Start a project <ExternalLink size={14} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
