"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, ChevronDown, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";
import { Tilt3D } from "@/components/Tilt3D";

const statusClass: Record<string, string> = { live: "status-live", dev: "status-dev", soon: "status-soon" };

const SPINDARE_SCREENS = [
  { src: "/spindare-feed.jpg",       caption: "Social feed — challenges + reactions" },
  { src: "/spindare-profile.jpg",    caption: "Profile — spin wheel + streaks" },
  { src: "/spindare-dark-feed.jpg",  caption: "Dark mode feed" },
  { src: "/spindare-challenge.jpg",  caption: "Challenge unlocked modal" },
  { src: "/spindare-settings.jpg",   caption: "Settings screen" },
  { src: "/spindare-wheel.jpg",      caption: "Spin wheel" },
];

function Lightbox({ screens, start, onClose }: { screens: typeof SPINDARE_SCREENS; start: number; onClose: () => void }) {
  const [idx, setIdx] = useState(start);
  const prev = () => setIdx((i) => (i - 1 + screens.length) % screens.length);
  const next = () => setIdx((i) => (i + 1) % screens.length);
  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose}><X size={20} /></button>
      <button className="lb-nav lb-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft size={24} /></button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img-wrap">
          <Image src={screens[idx].src} alt={screens[idx].caption} fill sizes="400px" className="lb-img" style={{ objectFit: "contain" }} />
        </div>
        <p className="lb-caption">{screens[idx].caption}</p>
        <p className="lb-counter">{idx + 1} / {screens.length}</p>
      </div>
      <button className="lb-nav lb-nav--next" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight size={24} /></button>
    </div>
  );
}

export default function PortfolioClient() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filters = t.portfolio.filters;
  const projects = t.portfolio.projects.filter((p) => {
    if (filter === 0) return true;
    return p.type === (filter === 1 ? "Mobile" : "Web");
  });

  return (
    <>
      {lightbox !== null && (
        <Lightbox screens={SPINDARE_SCREENS} start={lightbox} onClose={() => setLightbox(null)} />
      )}

      <section className="page-hero" data-label="PORTFOLIO">
        <div className="section-inner">
          <p className="section-label">{t.portfolio.hero.label}</p>
          <h1 className="page-hero-title">{t.portfolio.hero.title}</h1>
          <p className="page-hero-sub">{t.portfolio.hero.sub}</p>
        </div>
      </section>

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <div className="filter-tabs">
              {filters.map((f, i) => (
                <button key={f} className={`filter-tab${filter === i ? " filter-tab--active" : ""}`} onClick={() => setFilter(i)}>{f}</button>
              ))}
            </div>
          </FadeUp>
          <div className="portfolio-grid">
            {projects.map((proj, i) => (
              <FadeUp key={proj.name} delay={(i % 3) * 0.07}>
                <Tilt3D><article className="portfolio-card" style={{ height: "100%" }}>
                  {proj.name === "Spindare" && (
                    <div className="pc-screens-strip">
                      {SPINDARE_SCREENS.slice(0, 3).map((s, si) => (
                        <button key={s.src} className="pc-screen-thumb" onClick={() => setLightbox(si)} title={s.caption}>
                          <Image src={s.src} alt={s.caption} fill sizes="200px" className="pc-screen-img" style={{ objectFit: "cover" }} />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="portfolio-card-top">
                    <div className="portfolio-card-header">
                      <span className="portfolio-card-type">{proj.type}</span>
                      <span className={`project-status ${statusClass[proj.status]}`}>
                        {t.portfolio.status[proj.status as keyof typeof t.portfolio.status]}
                      </span>
                    </div>
                    <h2 className="portfolio-card-name">{proj.name}</h2>
                    <p className="portfolio-card-year">{proj.year}</p>
                    <p className="portfolio-card-desc">{proj.desc}</p>
                    <p className="portfolio-card-detail">{proj.detail}</p>
                    <div className="portfolio-card-stack">
                      {proj.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
                    </div>
                  </div>
                  <div className="portfolio-card-actions">
                    {proj.name === "Spindare" && (
                      <button className="portfolio-card-link" onClick={() => setLightbox(0)}>
                        Screenshots <ExternalLink size={12} />
                      </button>
                    )}
                    {proj.link && proj.link !== "/" && proj.link !== "#" && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="portfolio-card-link">
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    <Link href="/contact" className="portfolio-card-link portfolio-card-link--primary">
                      {t.portfolio.hire} <ArrowRight size={13} />
                    </Link>
                  </div>
                </article></Tilt3D>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{t.portfolio.caseStudies.label}</p>
            <h2 className="section-title">{t.portfolio.caseStudies.title}</h2>
            <p className="section-sub">{t.portfolio.caseStudies.sub}</p>
          </FadeUp>
          <div className="case-studies-list">
            <FadeUp delay={0.05}>
              <details className="case-study-item">
                <summary className="case-study-summary">
                  <div className="case-study-summary-left">
                    <span className="case-study-name">Spindare</span>
                    <span className="case-study-meta">React Native · Supabase · 150k+ LOC</span>
                  </div>
                  <ChevronDown size={16} className="case-study-chevron" />
                </summary>
                <div className="case-study-body">
                  <p className="case-study-desc">A social gamification platform where users spin for daily challenges, complete them, and share with friends. Built for iOS and Android with React Native, TypeScript, and Supabase Realtime.</p>

                  <div className="case-study-screenshots">
                    {SPINDARE_SCREENS.map((s, i) => (
                      <button key={s.src} className="cs-screen-thumb" onClick={() => setLightbox(i)} title={s.caption}>
                        <Image src={s.src} alt={s.caption} fill sizes="180px" className="cs-screen-img" style={{ objectFit: "cover" }} />
                        <span className="cs-screen-caption">{s.caption}</span>
                      </button>
                    ))}
                  </div>

                  <div className="case-study-features">
                    <div className="case-study-feature">Real-time social feed with reactions</div>
                    <div className="case-study-feature">Daily challenge spin system — 200+ curated picks</div>
                    <div className="case-study-feature">Streak tracking and gamification</div>
                    <div className="case-study-feature">AI-powered challenge generation via Gemini</div>
                    <div className="case-study-feature">In-app messaging via Stream Chat</div>
                    <div className="case-study-feature">Auth via Clerk with custom Supabase ban system</div>
                  </div>
                  <div className="case-study-stats">
                    <div className="cs-stat"><span className="cs-stat-value">300+</span><span className="cs-stat-label">Components</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">150k+</span><span className="cs-stat-label">Lines of code</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">3</span><span className="cs-stat-label">Person team</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">Sep &apos;26</span><span className="cs-stat-label">iOS launch</span></div>
                  </div>
                </div>
              </details>
            </FadeUp>
            <FadeUp delay={0.1}>
              <details className="case-study-item">
                <summary className="case-study-summary">
                  <div className="case-study-summary-left">
                    <span className="case-study-name">TravelMe</span>
                    <span className="case-study-meta">React Native · OpenAI · Solo project</span>
                  </div>
                  <ChevronDown size={16} className="case-study-chevron" />
                </summary>
                <div className="case-study-body">
                  <p className="case-study-desc">Describe your trip in plain language — TravelMe generates a full itinerary: flights, hotels, local experiences, day-by-day plan. No more juggling 10 apps.</p>
                  <div className="case-study-features">
                    <div className="case-study-feature">Natural language trip planning via OpenAI</div>
                    <div className="case-study-feature">Full itinerary generation — flights, hotels, activities</div>
                    <div className="case-study-feature">Payments via Stripe</div>
                    <div className="case-study-feature">Offline itinerary access</div>
                  </div>
                </div>
              </details>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
