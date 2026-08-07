'use client';

import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";

const WHATSAPP_NUMBER = "393920710309";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t.whatsapp.prefill);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      aria-label={t.whatsapp.aria}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-primary/40 shadow-md hover:border-primary/70 transition-colors group"
    >
      <SiWhatsapp size={20} className="text-primary group-hover:text-primary/90 transition-colors" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black text-primary text-xs font-mono px-3 py-1.5 border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
        {t.whatsapp.tooltip}
      </span>
    </motion.a>
  );
}
