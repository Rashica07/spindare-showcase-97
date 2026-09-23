'use client';

import { useLanguage } from "@/lib/i18n";

const fieldClass =
  "w-full bg-background border border-border/60 rounded-lg px-3.5 py-3 text-base sm:text-sm outline-none focus:border-primary/50 transition-colors";
const labelClass = "block text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2";

/**
 * Plain HTML form for visitors whose browser doesn't run the intake chat
 * (JavaScript off or blocked, or too old for the app bundle). Posts straight
 * to /submit-contact, which redirects to /contact/sent.
 */
export function ContactForm() {
  const { t } = useLanguage();
  const f = t.funnel.fields;

  return (
    <form method="post" action="/submit-contact" className="glass-card rounded-xl p-6 flex flex-col gap-5" data-testid="contact-form-fallback">
      <div>
        <label htmlFor="cf-name" className={labelClass}>{f.name}</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" maxLength={120} placeholder={f.namePh} className={fieldClass} />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelClass}>{t.contact.form.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder={t.contact.form.emailPh} className={fieldClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-service" className={labelClass}>{f.service}</label>
          <select id="cf-service" name="service" className={fieldClass}>
            {f.serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-timeline" className={labelClass}>{f.timeline}</label>
          <select id="cf-timeline" name="timeline" className={fieldClass}>
            {f.timelineOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-description" className={labelClass}>{f.description}</label>
        <textarea id="cf-description" name="description" required rows={5} maxLength={5000} placeholder={f.descriptionPh} className={fieldClass} />
      </div>
      {/* Honeypot: hidden from people, filled in by naive bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
        {f.submit}
      </button>
    </form>
  );
}
