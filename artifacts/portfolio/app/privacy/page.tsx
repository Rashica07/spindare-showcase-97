'use client';

import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            {(t.footer as any).privacy || "Privacy Policy"}
          </h1>
          
          <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary">
            <p className="text-muted-foreground">Last updated: August 2026</p>
            
            <h2 className="text-2xl mt-8 mb-4 text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information that you provide directly to us when you fill out a contact form or request a project quote. This may include your name, email address, company details, and project requirements.
            </p>
            
            <h2 className="text-2xl mt-8 mb-4 text-foreground">2. How We Use Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to communicate with you about your project, provide quotes, and deliver our services. We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>

            <h2 className="text-2xl mt-8 mb-4 text-foreground">3. Client Confidentiality</h2>
            <p className="text-muted-foreground mb-4">
              All proprietary project details shared before or during development are kept strictly confidential. Any formal Non-Disclosure Agreements (NDAs) signed prior to project commencement supersede this general privacy policy.
            </p>

            <h2 className="text-2xl mt-8 mb-4 text-foreground">4. Analytics and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We may use privacy-friendly analytics tools (such as Vercel Analytics) to measure website traffic and performance. These tools do not collect personally identifiable information.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
