/**
 * Visual identity for portfolio projects, keyed by the project's name in
 * lib/translations.ts. Projects without an entry keep the default card.
 *
 * - tone: drives the status dot only. It never reuses the accent colour.
 * - accent: a brand colour taken from the project's own site or repository.
 *   Only confirmed colours go here. Unset means the neutral site treatment.
 * - url: the public project link. Only links checked against the live site.
 */
export type StatusTone = "live" | "finished" | "progress" | "early";

export interface ProjectIdentity {
  tone: StatusTone;
  accent?: string;
  url?: string;
}

export const STATUS_DOT: Record<StatusTone, string> = {
  live: "bg-emerald-500",
  finished: "bg-primary",
  progress: "bg-amber-400/80",
  early: "bg-muted-foreground",
};

export const PROJECT_IDENTITY: Record<string, ProjectIdentity> = {
  // Accent: #ffc857, the gold token in the EchoVerse site's own stylesheet.
  EchoVerse: { tone: "finished", accent: "#ffc857", url: "https://echoverse-web-omega.vercel.app/" },
  FIFTH: { tone: "progress" },
  "The Dragon of Albania": { tone: "progress" },
  NYRIS: { tone: "early" },
  // Accent: #317246, the brand green named in the Viktory README and used for its logo.
  Viktory: { tone: "live", accent: "#317246", url: "https://viktory-rashica07s-projects.vercel.app/" },
  // No confirmed brand colour: the logo uses currentColor.
  "Gjoni Decor": { tone: "live", url: "https://gjoni-decor.vercel.app/" },
};
