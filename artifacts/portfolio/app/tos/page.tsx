'use client';

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { PolicyAccordion } from "@/components/PolicyAccordion";

export default function TosPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-10 font-mono text-sm uppercase tracking-widest">
            Last updated: August 2026
          </p>

          {/* TL;DR Summary Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <h2 className="font-semibold text-primary mb-2 text-lg">TL;DR Summary</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These terms govern your use of the KIQA DEV website. They do not override any formal Master Service Agreements (MSAs) or contracts signed for actual development work. In short: do not scrape or misuse our site, our designs belong to us, and any formal project work will be governed by a separate, signed contract.
            </p>
          </div>

          <div className="space-y-4">
            <PolicyAccordion title="1. Introduction & Acceptance of Terms" defaultOpen>
              <p>
                These Terms of Service ("Terms") act as a legally binding contract between you and KIQA DEV regarding your use of our website (kiqa-dev.it). By accessing or using this site, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, you are prohibited from using or accessing this site. These Terms apply exclusively to your interaction with our public website and marketing materials.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="2. User Accounts & Client Portals">
              <p>
                Currently, KIQA DEV does not require you to create an account to browse our portfolio or request a quote. If we introduce client portals in the future, you will be responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that violate our security guidelines or engage in unauthorized access attempts.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="3. Acceptable Use Policy">
              <p>
                You agree to use this website only for lawful purposes. You are strictly prohibited from engaging in data scraping, automated data extraction, or attempting to breach our security infrastructure.
              </p>
              <p>
                Uploading malicious code, transmitting spam, or using our contact forms to harass or defraud KIQA DEV will result in an immediate ban and potential legal action.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="4. Intellectual Property">
              <p>
                All original content on this website—including but not limited to text, graphics, logos, 3D visual assets, code snippets, and UI designs—is the exclusive property of KIQA DEV and is protected by international copyright laws.
              </p>
              <p>
                You may not reproduce, distribute, or create derivative works from our content without our explicit written permission. Client project showcases remain the property of their respective owners.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="5. Payment and Subscriptions">
              <p>
                This website does not directly process payments or host subscription checkouts. All payments for development services are handled via customized invoices.
              </p>
              <p>
                Our billing cycles, cancellation rules, and refund policies for freelance development services will be explicitly detailed in the Master Service Agreement (MSA) signed before your project begins.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="6. Termination Clause">
              <p>
                We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever. This includes, without limitation, a breach of these Terms.
              </p>
              <p>
                Upon termination, your right to use the website will cease immediately. Provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions and limitations of liability.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="7. Limitation of Liability">
              <p>
                In no event shall KIQA DEV, nor its directors, employees, or partners, be liable for any indirect, incidental, special, or consequential damages resulting from your use of this website.
              </p>
              <p>
                We do not guarantee that our website will be secure, error-free, or continuously available. We are not responsible for the content or privacy practices of any third-party links provided on our site.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="8. Governing Law">
              <p>
                These Terms shall be governed and construed in accordance with the laws of Kosovo and Italy, without regard to its conflict of law provisions.
              </p>
              <p>
                Any legal disputes arising from the use of this website will be handled exclusively in the recognized jurisdictions of Kosovo or Italy.
              </p>
            </PolicyAccordion>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
