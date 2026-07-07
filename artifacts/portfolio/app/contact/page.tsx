'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactChat } from "@/components/ContactChat";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  const contactMeta = [
    { icon: Mail, label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: FaLinkedinIn, label: "LinkedIn", value: "Kristian Gjergji", href: "https://www.linkedin.com/in/kristian-gjergji" },
    { icon: SiGithub, label: "GitHub", value: t.contact.info.github, href: "https://github.com/rashica07" },
    { icon: MapPin, label: "Location", value: t.contact.info.location, href: undefined },
    { icon: Clock, label: "Response time", value: t.contact.info.response, href: undefined },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.contact.label}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.contact.title}</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">{t.contact.sub}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20" data-testid="contact-body">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FadeUp><h2 className="font-semibold text-foreground">{t.contact.detailsTitle}</h2></FadeUp>
            {contactMeta.map(({ icon: Icon, label, value, href }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.35)" }} transition={{ duration: 0.2 }} className="flex items-start gap-4 border border-card-border bg-card/60 backdrop-blur-sm rounded-xl p-5 transition-colors" data-testid={`contact-info-${i}`}>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-0.5 text-sm text-foreground hover:text-primary transition-colors font-mono" data-testid={`contact-link-${i}`}>{value}</a>
                    ) : (
                      <p className="mt-0.5 text-sm text-foreground font-mono">{value}</p>
                    )}
                  </div>
                </motion.div>
              </FadeUp>
            ))}
            <FadeUp delay={0.3} className="border border-primary/20 bg-primary/5 rounded-xl p-6">
              <h3 className="font-semibold text-foreground text-sm mb-2">{t.contact.bookTitle}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{t.contact.bookDesc}</p>
              <a href="https://discord.com/users/kodibkfg" target="_blank" rel="noopener noreferrer" data-testid="contact-discord-link" className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors">
                Discord: {t.contact.info.discord} <ArrowRight size={11} />
              </a>
            </FadeUp>
          </div>
          <div className="lg:col-span-3">
            <FadeUp delay={0.1}>
              <ContactChat />
            </FadeUp>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
