/**
 * Visual identity for portfolio projects, keyed by the project's name in
 * lib/translations.ts. Projects without an entry keep the default card.
 *
 * - tone: drives the status dot only. It never reuses the accent colour.
 * - accent: a brand colour for the card header tint.
 * - accentLight: a second brand colour, used for the project link.
 * - url: the public project link. Only links checked against the live site.
 * - image: a screenshot or key art in public/projects, shown in the header.
 * - mark: a logo or icon in public/projects, shown beside the name.
 * - highlight: gives the card a stronger accent border.
 * - credit: a partner line shown under the stack list.
 */
export type StatusTone = "live" | "finished" | "progress" | "early";

export interface ProjectIdentity {
  tone: StatusTone;
  accent?: string;
  accentLight?: string;
  url?: string;
  image?: string;
  /** Several screenshots, switched with dot buttons. Replaces `image`. */
  gallery?: string[];
  mark?: string;
  highlight?: boolean;
  credit?: string;
}

export const STATUS_DOT: Record<StatusTone, string> = {
  live: "bg-emerald-500",
  finished: "bg-primary",
  progress: "bg-amber-400/80",
  early: "bg-muted-foreground",
};

export const PROJECT_IDENTITY: Record<string, ProjectIdentity> = {
  EchoVerse: {
    tone: "finished",
    url: "https://echoverse-web-omega.vercel.app/",
    gallery: [
      "/projects/echoverse.webp",
      "/projects/echoverse-app.webp",
      "/projects/echoverse-site.webp",
      "/projects/echoverse-chat.webp",
    ],
    credit: "In partnership with BlueSquare AI",
  },
  // Dark horror treatment. The red is the "50:00:00" tone from the key art.
  FIFTH: {
    tone: "progress",
    accent: "#8c1d1d",
    image: "/projects/fifth.webp",
  },
  "The Dragon of Albania": {
    tone: "progress",
    image: "/projects/dragon-arcade.webp",
  },
  NYRIS: { tone: "early" },
  // Brand green #317246, from the Viktory logo and README. Highlighted on purpose.
  Viktory: {
    tone: "live",
    accent: "#317246",
    url: "https://viktory-rashica07s-projects.vercel.app/",
    image: "/projects/viktory.webp",
    mark: "/projects/viktory-mark.svg",
    highlight: true,
  },
  // Blues from the Gjoni Decor site tokens (--blue #144264, --blue-on-ink #7fa6c4).
  "Gjoni Decor": {
    tone: "live",
    accent: "#144264",
    accentLight: "#7fa6c4",
    url: "https://gjoni-decor.vercel.app/",
    image: "/projects/gjoni.webp",
  },
  LuxHotelSystem: { tone: "live", credit: "In partnership with BlueSquare AI" },
};
