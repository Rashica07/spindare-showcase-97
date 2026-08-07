'use client';

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { PolicyAccordion } from "@/components/PolicyAccordion";
import { useLanguage } from "@/lib/i18n";
import { legalTranslations } from "@/lib/legal-translations";

export default function TosPage() {
  const { lang } = useLanguage();
  const content = legalTranslations[lang]?.tos || legalTranslations.en.tos;

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {content.title}
          </h1>
          <p className="text-muted-foreground mb-10 font-mono text-sm uppercase tracking-widest">
            {content.lastUpdated}
          </p>

          {/* TL;DR Summary Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <h2 className="font-semibold text-primary mb-2 text-lg">{content.tldrTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.tldrDesc}
            </p>
          </div>

          <div className="space-y-4">
            {content.sections.map((section, idx) => (
              <PolicyAccordion key={idx} title={section.title} defaultOpen={idx === 0}>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </PolicyAccordion>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
