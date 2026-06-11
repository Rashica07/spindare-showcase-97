import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Check, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(20, "Please provide more detail (at least 20 characters)"),
});
type ContactValues = z.infer<typeof contactSchema>;

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

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Server error");
      }
    } catch {
      toast({ title: "Error", description: "Failed to send. Please email contact@kiqa-dev.it directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  const contactMeta = [
    { icon: Mail, label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: SiGithub, label: "GitHub", value: t.contact.info.github, href: "https://github.com/rashica07" },
    { icon: MapPin, label: "Location", value: t.contact.info.location, href: undefined },
    { icon: Clock, label: "Response time", value: t.contact.info.response, href: undefined },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.contact.label}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.contact.title}</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">{t.contact.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20" data-testid="contact-body">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FadeUp>
              <h2 className="font-semibold text-foreground">Contact details</h2>
            </FadeUp>
             {contactMeta.map(({ icon: Icon, label, value, href }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div 
                  whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.35)", boxShadow: "0 8px 24px -10px hsl(var(--primary) / 0.12)" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 border border-card-border bg-card/60 backdrop-blur-sm rounded-xl p-5 transition-colors" 
                  data-testid={`contact-info-${i}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="mt-0.5 text-sm text-foreground hover:text-primary transition-colors font-mono" data-testid={`contact-link-${i}`}>
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-foreground font-mono">{value}</p>
                    )}
                  </div>
                </motion.div>
              </FadeUp>
            ))}

            <FadeUp delay={0.3} className="border border-primary/20 bg-primary/5 rounded-xl p-6">
              <h3 className="font-semibold text-foreground text-sm mb-2">Prefer to book directly?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                For immediate engagement, Discord is the fastest channel.
              </p>
              <a
                href="https://discord.com/users/kodibkfg"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-discord-link"
                className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors"
              >
                Discord: {t.contact.info.discord} <ArrowRight size={11} />
              </a>
            </FadeUp>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <FadeUp delay={0.1}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-primary/30 bg-primary/5 rounded-xl p-10 text-center"
                  data-testid="contact-success"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t.contact.form.sent}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{t.contact.form.sentSub}</p>
                  <button
                    onClick={() => { setSubmitted(false); form.reset(); }}
                    data-testid="button-send-another"
                    className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded-lg px-4 py-2"
                  >
                    {t.contact.form.another}
                  </button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-xl p-8 flex flex-col gap-6" data-testid="contact-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{t.contact.form.name}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.contact.form.namePh} {...field} data-testid="input-contact-name" className="bg-background border-border/60 font-mono text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{t.contact.form.email}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.contact.form.emailPh} type="email" {...field} data-testid="input-contact-email" className="bg-background border-border/60 font-mono text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{t.contact.form.subject}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.contact.form.subjectPh} {...field} data-testid="input-contact-subject" className="bg-background border-border/60 font-mono text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{t.contact.form.message}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.contact.form.messagePh}
                            {...field}
                            data-testid="textarea-contact-message"
                            rows={6}
                            className="bg-background border-border/60 font-mono text-sm resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      data-testid="button-submit-contact"
                      className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          {t.contact.form.sending}
                        </>
                      ) : (
                        <>
                          {t.contact.form.send}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </Form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
