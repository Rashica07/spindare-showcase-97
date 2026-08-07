'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface PolicyAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function PolicyAccordion({ title, children, defaultOpen = false }: PolicyAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border/40 bg-card rounded-xl overflow-hidden mb-4 transition-colors hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-foreground pr-4">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed text-sm space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
