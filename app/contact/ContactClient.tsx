"use client";
import { useState } from "react";
import { Mail, MessageSquare, Github, Twitter, MapPin, Clock, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

const FAQ = [
  {
    q: "How old are you?",
    a: "I'm 14. Age doesn't define skill — my code does. Spindare has 150k+ lines and 300+ components. Judge the work, not the birth year.",
  },
  {
    q: "Can you work with clients outside Italy?",
    a: "Yes. I work fully remote and have no geographic restrictions. Timezone differences are manageable — I'm flexible.",
  },
  {
    q: "What's your availability right now?",
    a: "Currently focused on Spindare's iOS launch (September 2026). Open for new freelance work from June 2026. I can discuss your project now and plan accordingly.",
  },
  {
    q: "Do you work alone or with a team?",
    a: "Usually solo — I handle everything end-to-end. For larger projects, I collaborate with Daniel F. (Lead Developer, Spindare co-founder) when needed.",
  },
  {
    q: "What's your rate?",
    a: "Depends on scope, timeline, and complexity. I work on fixed-price projects — no hourly surprises. See the Services page for starting ranges, or email me with your project details.",
  },
  {
    q: "Can you start immediately?",
    a: "Not until June 2026. Spindare's launch is the current priority. That said, I'm happy to plan ahead — booking slots fill up, so reach out now.",
  },
];

export default function ContactClient() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const info = t.contact.info;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sanitize = (v: string) =>
    v.replace(/[<>'"&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "'": "&#x27;", '"': "&quot;", "&": "&amp;" }[c] ?? c));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const name = sanitize(form.name.trim());
    const email = sanitize(form.email.trim());
    const message = sanitize(`[${form.subject.trim()}] ${form.message.trim()}`);
    if (!name || !email || !form.message.trim()) { setError("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    if (form.message.length > 2000) { setError("Message must be under 2000 characters."); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("sent"); }
      else { setError(data.error || "Something went wrong."); setStatus("idle"); }
    } catch { setError("Network error. Check your connection."); setStatus("idle"); }
  };

  return (
    <>
      <section className="page-hero" data-label="CONTACT">
        <div className="section-inner">
          <p className="section-label">{t.contact.hero.label}</p>
          <h1 className="page-hero-title">{t.contact.hero.title}</h1>
          <p className="page-hero-sub">{t.contact.hero.sub}</p>
        </div>
      </section>

      <section className="contact-notice-section">
        <div className="section-inner">
          <FadeUp>
            <div className="avail-status-block">
              <p className="avail-status-label">Current Status</p>
              <div className="avail-status-rows">
                <div className="avail-row">
                  <span className="avail-row-key">Status</span>
                  <span className="avail-row-val"><span className="avail-dot avail-dot--busy" />Focused on Spindare launch</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">Available for freelance</span>
                  <span className="avail-row-val avail-row-val--accent">June 2026</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">Booking for</span>
                  <span className="avail-row-val">July–August 2026 projects</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">Response time</span>
                  <span className="avail-row-val">Within 24 hours</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-padded">
        <div className="section-inner contact-page-layout">
          <FadeUp className="contact-form-col">
            {status === "sent" ? (
              <div className="contact-success-state">
                <p className="contact-success-title">{f.sent}</p>
                <p className="contact-success-sub">{f.sentSub}</p>
                <button className="contact-reset-btn" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}>{f.another}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form-new">
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">{f.name}</label>
                    <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder={f.namePh} maxLength={100} className="cf-input" required />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">{f.email}</label>
                    <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={f.emailPh} maxLength={200} className="cf-input" required />
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label">{f.subject}</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} placeholder={f.subjectPh} maxLength={200} className="cf-input" />
                </div>
                <div className="cf-field">
                  <label className="cf-label">{f.message}</label>
                  <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder={f.messagePh} rows={6} maxLength={2000} className="cf-input cf-textarea" required />
                  <span className="cf-char">{form.message.length}/2000</span>
                </div>
                {error && <p className="cf-error">{error}</p>}
                <button type="submit" disabled={status === "sending"} className="btn-primary cf-submit">{status === "sending" ? f.sending : f.send}</button>
              </form>
            )}
          </FadeUp>

          <FadeUp delay={0.1} className="contact-info-col">
            <h2 className="contact-info-title">{info.title}</h2>
            <div className="contact-info-items">
              <a href={`mailto:${info.email}`} className="contact-info-item">
                <span className="contact-info-icon"><Mail size={15} /></span>
                <div><span className="contact-info-label">Email</span><span className="contact-info-value">{info.email}</span></div>
              </a>
              <a href="https://discord.com/users/kodibkfg" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <span className="contact-info-icon"><MessageSquare size={15} /></span>
                <div><span className="contact-info-label">Discord</span><span className="contact-info-value">{info.discord}</span></div>
              </a>
              <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <span className="contact-info-icon"><Github size={15} /></span>
                <div><span className="contact-info-label">GitHub</span><span className="contact-info-value">{info.github}</span></div>
              </a>
              <a href="https://twitter.com/kristiangjergj4" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <span className="contact-info-icon"><Twitter size={15} /></span>
                <div><span className="contact-info-label">Twitter</span><span className="contact-info-value">{info.twitter}</span></div>
              </a>
              <div className="contact-info-item no-hover">
                <span className="contact-info-icon"><MapPin size={15} /></span>
                <div><span className="contact-info-label">Location</span><span className="contact-info-value">Lecco, Italy</span></div>
              </div>
              <div className="contact-info-item no-hover">
                <span className="contact-info-icon"><Clock size={15} /></span>
                <div><span className="contact-info-label">{info.hours}</span><span className="contact-info-value">{info.hoursValue}</span></div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="faq-list">
              {FAQ.map((item, i) => (
                <div key={i} className={`faq-item${openFaq === i ? " faq-item--open" : ""}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.q}
                    <ChevronDown size={16} className="faq-chevron" />
                  </button>
                  {openFaq === i && (
                    <p className="faq-answer">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Location — Lecco, Italy</p>
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22434.206756!2d9.3719!3d45.8557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786869bae4ce3d5%3A0xb9c3fba47f2a51d7!2sLecco%2C+Province+of+Lecco%2C+Italy!5e0!3m2!1sen!2sit!4v1700000000000!5m2!1sen!2sit" width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="KIQA DEV location — Lecco, Italy" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
