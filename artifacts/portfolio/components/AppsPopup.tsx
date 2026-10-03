'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import craftpanelIcon from "@/public/craftpanel-icon.webp";

// Other pages (the footer) open the card by dispatching this event.
export const OPEN_APPS_EVENT = "kiqa:open-apps";

const STORAGE_KEY = "kiqa_apps_seen";
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const SHOW_AFTER_MS = 9000;
const SHOW_ANYWAY_MS = 30000;
const SCROLL_PAST_HERO = 0.75; // of the viewport height

// The KIQA.DEV family. To add an app, add a row; "soon" rows render without a link.
const APPS: { id: string; name: string; status: "live" | "soon"; href?: string; icon?: string; desc?: "craftpanelDesc" }[] = [
  { id: "craftpanel", name: "CraftPanel", status: "live", href: "https://rashica07.github.io/craftpanel-site/", icon: craftpanelIcon.src, desc: "craftpanelDesc" },
  { id: "novus-panel", name: "Novus Panel", status: "soon" },
];

/**
 * A small, non-blocking card (not a full-screen overlay: those hurt reading
 * and are penalised by search engines on mobile). On a first visit it waits
 * until the visitor has been here a few seconds AND scrolled past the hero, so
 * it never sits on top of the main call-to-action (or after 30s if they never
 * scroll). After it's closed it stays away for two weeks. Never on the contact
 * pages. The footer can reopen it any time.
 */
export function AppsPopup() {
  const { t } = useLanguage();
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const quiet = pathname.startsWith("/contact") || pathname.startsWith("/site-");

  const dismiss = useCallback(() => {
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
  }, []);

  // First-visit prompt. Storage can be unavailable (private mode); then it just shows.
  useEffect(() => {
    if (quiet) { setOpen(false); return; }
    let seen = 0;
    try { seen = Number(localStorage.getItem(STORAGE_KEY)) || 0; } catch {}
    if (seen && Date.now() - seen < SNOOZE_MS) return;
    let timeUp = false;
    let fired = false;
    const cleanup = () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", check);
    };
    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      setOpen(true);
    };
    const check = () => {
      if (timeUp && window.scrollY >= window.innerHeight * SCROLL_PAST_HERO) fire();
    };
    const t1 = window.setTimeout(() => { timeUp = true; check(); }, SHOW_AFTER_MS);
    const t2 = window.setTimeout(fire, SHOW_ANYWAY_MS);
    window.addEventListener("scroll", check, { passive: true });
    return cleanup;
  }, [quiet, pathname]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_APPS_EVENT, show);
    return () => window.removeEventListener(OPEN_APPS_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;
  const a = t.apps;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="apps-popup-title"
      data-testid="apps-popup"
      className="apps-pop fixed left-4 right-4 bottom-[5.5rem] z-50 rounded-2xl border border-border bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[22.5rem]"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 id="apps-popup-title" className="font-mono text-sm font-medium tracking-widest">
            {a.title.split(/(\.)/).map((part, i) => (part === "." ? <span key={i} className="text-primary">.</span> : part))}
          </h2>
          <button
            type="button"
            onClick={dismiss}
            aria-label={a.close}
            data-testid="apps-popup-close"
            className="-mr-2.5 -mt-2.5 flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:block">{a.sub}</p>

        <ul className="mt-3 flex flex-col gap-2.5 sm:mt-4">
          {APPS.map((app) => {
            const live = app.status === "live";
            const body = (
              <>
                {app.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={app.icon} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-base font-semibold text-primary" aria-hidden="true">
                    {app.name.charAt(0)}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">{app.name}</span>
                  {app.desc && <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{a[app.desc]}</span>}
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${live ? "bg-emerald-500" : "bg-amber-400/80"}`} />
                    {live ? a.live : a.soon}
                  </span>
                </span>
                {live && <ArrowUpRight size={16} className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />}
              </>
            );
            return (
              <li key={app.id}>
                {app.href ? (
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${app.name}: ${a.open}`}
                    className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-secondary"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-border/60 p-3">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-3 hidden text-xs text-muted-foreground sm:block">{a.more}</p>
      </div>
    </aside>
  );
}
