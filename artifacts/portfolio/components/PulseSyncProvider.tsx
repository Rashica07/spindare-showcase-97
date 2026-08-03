'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { NovusPulse } from '@/lib/novus-pulse';

// Public content pipeline — no credentials needed.
// The site reads published content via the public endpoint and stays in
// sync through the public realtime room for this tenant.
const PULSE_URL = process.env.NEXT_PUBLIC_PULSE_URL || 'http://localhost:3000';
const PULSE_TENANT = process.env.NEXT_PUBLIC_PULSE_TENANT || 'admin-workspace';
const HOME_SLUG = 'home';

interface PulseContextType {
  pages: Record<string, any>;
  isConnected: boolean;
}

const PulseContext = createContext<PulseContextType>({
  pages: {},
  isConnected: false,
});

export const usePulseSync = () => useContext(PulseContext);

export function usePageOverride(slug: string) {
  const { pages } = usePulseSync();
  return pages[slug] || null;
}

export type BlockOverrides = Record<string, unknown> | undefined;

export interface SiteBlock {
  id: string;
  type: string;
  props?: BlockOverrides;
  hidden?: boolean;
}

/**
 * CMS copy is authored outside this repo, so it can reintroduce the em dashes
 * the site copy deliberately avoids. Normalise them on the way in: " — " reads
 * as a comma, a bare "—" as a colon-free break.
 */
function stripEmDashes(value: string): string {
  if (!value.includes('—')) return value;
  return value
    // Spaced or unspaced, an em dash becomes a comma break rather than nothing,
    // so "a—b" does not collapse into "ab".
    .replace(/\s*—\s*/g, ', ')
    .replace(/^,\s*/, '')
    .replace(/,\s*,/g, ',')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
}

function normaliseContent<T>(value: T): T {
  if (typeof value === 'string') return stripEmDashes(value) as unknown as T;
  if (Array.isArray(value)) return value.map(normaliseContent) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = normaliseContent(v);
    }
    return out as unknown as T;
  }
  return value;
}

export function pick<T>(overrides: BlockOverrides, key: string, fallback: T): T {
  const v = overrides?.[key];
  return v === undefined || v === null || v === "" ? fallback : (v as T);
}

export function pickList<T>(overrides: BlockOverrides, key: string, fallback: T[]): T[] {
  const v = overrides?.[key];
  return Array.isArray(v) && v.length > 0 ? (v as T[]) : fallback;
}

/** "#ff8c00" → "32 98% 54%" (the "H S% L%" triplet the CSS vars expect). */
function hexToHslTriplet(hex: string): string | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Apply a CMS theme (hex colors) onto the site's HSL-triplet CSS variables.
 * Maps each theme color onto the variables that drive the visible palette,
 * so a Themes-page change restyles the live site immediately.
 */
function applyTheme(theme: any) {
  if (!theme || typeof document === 'undefined') return;
  const root = document.documentElement;
  const set = (cssVar: string, hex?: string) => {
    if (!hex) return;
    const triplet = hexToHslTriplet(hex);
    if (triplet) root.style.setProperty(cssVar, triplet);
  };
  const c = theme.colors ?? {};
  // Primary drives buttons, links, focus rings, gradient accents.
  set('--primary', c.primary);
  set('--ring', c.primary);
  set('--sidebar-ring', c.primary);
  set('--accent', c.accent);
  set('--background', c.background);
  // Surface maps onto the elevated panels/cards.
  set('--card', c.surface);
  set('--secondary', c.surface);
  set('--popover', c.surface);
  if (typeof theme.borderRadius === 'string') {
    root.style.setProperty('--radius', theme.borderRadius);
  }
}

export function PulseSyncProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<Record<string, any>>({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let tenantSlug = PULSE_TENANT;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryTenant = params.get('tenant') || params.get('tenantSlug');
      if (queryTenant) {
        tenantSlug = queryTenant;
      }
    }

    const pulse = new NovusPulse({ baseUrl: PULSE_URL });

    // 1. Initial published content (public REST endpoint)
    pulse
      .getPublicPages(tenantSlug)
      .then((pagesData) => {
        const pagesMap: Record<string, any> = {};
        for (const p of pagesData) {
          if (p.slug && p.content) {
            pagesMap[p.slug] = normaliseContent(p.content);
          }
        }
        setPages(pagesMap);
      })
      .catch(() => {
        // Non-fatal: every page has bundled copy to fall back to.
        console.warn('[Novus Pulse] Content unavailable, using bundled copy.');
      });

    // 1b. Initial theme (public REST endpoint) — apply the CMS palette on load.
    pulse
      .getPublicTheme(tenantSlug)
      .then((theme) => applyTheme(theme))
      .catch(() => {
        // Non-fatal: the default palette in globals.css stays in effect.
        console.warn('[Novus Pulse] Theme unavailable, using default palette.');
      });

    // 2. Live updates (public realtime room — published pages only)
    pulse.subscribePublic(tenantSlug);

    const onPage = (payload: any) => {
      if (payload?.slug && payload.content) {
        setPages(prev => ({ ...prev, [payload.slug]: normaliseContent(payload.content) }));
      }
    };
    const onTheme = (payload: any) => applyTheme(payload?.theme);
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    pulse.on('page.updated', onPage);
    pulse.on('page.created', onPage);
    pulse.on('theme.updated', onTheme);
    pulse.on('connect', onConnect);
    pulse.on('disconnect', onDisconnect);

    if (pulse.realtimeConnected) {
      setIsConnected(true);
    }

    return () => {
      pulse.off('page.updated', onPage);
      pulse.off('page.created', onPage);
      pulse.off('theme.updated', onTheme);
      pulse.off('connect', onConnect);
      pulse.off('disconnect', onDisconnect);
      pulse.unsubscribePublic(tenantSlug);
    };
  }, []);

  return (
    <PulseContext.Provider value={{ pages, isConnected }}>
      {children}
    </PulseContext.Provider>
  );
}
