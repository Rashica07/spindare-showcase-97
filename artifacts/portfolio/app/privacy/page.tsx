'use client';

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { PolicyAccordion } from "@/components/PolicyAccordion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-10 font-mono text-sm uppercase tracking-widest">
            Last updated: August 2026
          </p>

          {/* TL;DR Summary Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <h2 className="font-semibold text-primary mb-2 text-lg">TL;DR Summary</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We respect your privacy. We only collect the information necessary to provide you with a quote or deliver our services (like your email and project details). We never sell your data to third parties. Our site uses basic, privacy-friendly analytics that do not track personally identifiable information.
            </p>
          </div>

          <div className="space-y-4">
            <PolicyAccordion title="1. Information Collection" defaultOpen>
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us and the website, but typically includes your name, email address, company name, and specific project requirements.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="2. Collection Methods">
              <p>
                Data is gathered directly from you via direct email inquiries or through third-party communication platforms you initiate contact on, such as WhatsApp or Discord.
              </p>
              <p>
                We do not currently use automated user registration forms or tracking cookies that collect personally identifiable information without your explicit consent.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="3. Purpose of Usage">
              <p>
                We process your personal information strictly for legitimate business purposes. This includes responding to your inquiries, providing custom project quotes, and delivering our contracted software development services.
              </p>
              <p>
                We may also use your information to send you administrative details, such as contract updates, invoice receipts, or changes to our terms and policies.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="4. Third-Party Sharing">
              <p>
                We do not sell, rent, or trade your personal information with third parties for their promotional purposes.
              </p>
              <p>
                We may share your data with trusted third-party vendors who perform services for us or on our behalf, such as web hosting (Vercel, Cloudflare) or communication platforms (WhatsApp, Gmail). These partners are legally bound to keep your data confidential.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="5. Cookies and Tracking">
              <p>
                Our website may use essential cookies and privacy-friendly analytics tools to measure website traffic and performance.
              </p>
              <p>
                These tools collect aggregated, anonymous data (such as page views or browser types) and do not track individual users across the web or collect personally identifiable information.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="6. Data Retention">
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
              </p>
              <p>
                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="7. User Rights">
              <p>
                Depending on your geographic location (such as under the GDPR or CCPA), you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.
              </p>
              <p>
                To request to review, update, or delete your personal information, please submit a written request directly to our contact email address.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="8. Security Measures">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
              </p>
              <p>
                However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="9. Children's Privacy">
              <p>
                We do not knowingly solicit data from or market to children under 18 years of age. By using this website, you represent that you are at least 18 years old.
              </p>
              <p>
                If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.
              </p>
            </PolicyAccordion>

            <PolicyAccordion title="10. Contact Information">
              <p>
                If you have questions or comments about this privacy policy, or if you would like to exercise your data rights, you may contact us via email.
              </p>
              <p>
                Please send all privacy-related inquiries to: <strong>contact@kiqa-dev.it</strong>.
              </p>
            </PolicyAccordion>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
