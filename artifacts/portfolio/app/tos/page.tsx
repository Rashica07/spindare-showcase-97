'use client';

import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function TosPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            {(t.footer as any).tos || "Terms of Service"}
          </h1>
          
          <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary">
            <p className="text-muted-foreground">Last updated: August 2026</p>
            
            <h2 className="text-2xl mt-8 mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2 className="text-2xl mt-8 mb-4 text-foreground">2. Client Agreements</h2>
            <p className="text-muted-foreground mb-4">
              These website terms of service are distinct from any formal client agreements or Master Service Agreements (MSAs) signed during the onboarding of a new project. All formal development work, timelines, and deliverables are governed exclusively by the specific contract signed prior to project commencement.
            </p>

            <h2 className="text-2xl mt-8 mb-4 text-foreground">3. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              Unless otherwise stated, KIQA DEV and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl mt-8 mb-4 text-foreground">4. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              Any claim relating to KIQA DEV's website shall be governed by the laws of Kosovo and Italy without regard to its conflict of law provisions.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
