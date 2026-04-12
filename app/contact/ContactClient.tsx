"use client";
import { useState } from "react";
import { Mail, MessageSquare, Github, Twitter, MapPin, Clock, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

export default function ContactClient() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const info = t.contact.info;
  const st = t.contact.status;
  const faq = t.contact.faq;
  const err = t.contact.errors;

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
    if (!name || !email || !form.message.trim()) { setError(err.fillAll); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(err.invalidEmail); return; }
    if (form.message.length > 2000) { setError(err.tooLong); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("sent"); }
      else { setError(data.error || err.serverError); setStatus("idle"); }
    } catch { setError(err.networkError); setStatus("idle"); }
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
              <p className="avail-status-label">{st.title}</p>
              <div className="avail-status-rows">
                <div className="avail-row">
                  <span className="avail-row-key">{st.statusLabel}</span>
                  <span className="avail-row-val"><span className="avail-dot avail-dot--busy" />{st.statusValue}</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">{st.freelanceLabel}</span>
                  <span className="avail-row-val avail-row-val--accent">{st.freelanceValue}</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">{st.bookingLabel}</span>
                  <span className="avail-row-val">{st.bookingValue}</span>
                </div>
                <div className="avail-row">
                  <span className="avail-row-key">{st.responseLabel}</span>
                  <span className="avail-row-val">{st.responseValue}</span>
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
                <div><span className="contact-info-label">Location</span><span className="contact-info-value">{info.location}</span></div>
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
            <p className="section-label">{faq.label}</p>
            <h2 className="section-title">{faq.title}</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="faq-list">
              {faq.items.map((item, i) => (
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
    </>
  );
}
