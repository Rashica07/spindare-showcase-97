"use client";
import { useState } from "react";
import { Mail, MessageSquare, Github, Twitter, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

export default function ContactClient() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const info = t.contact.info;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

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
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.contact.hero.label}</p>
          <h1 className="page-hero-title">{t.contact.hero.title}</h1>
          <p className="page-hero-sub">{t.contact.hero.sub}</p>
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
