import type { Metadata } from "next";
import DevHubClient from "./DevHubClient";

const BASE = "https://kiqa-dev.it";

export const metadata: Metadata = {
  title: "Dev Hub",
  description: "Technical decisions, architecture choices, and the stack behind Spindare and TravelMe. Full-stack developer portfolio by Kristian Gjergji.",
  alternates: {
    canonical: `${BASE}/dev-hub`,
  },
  openGraph: {
    title: "Dev Hub | KIQA DEV",
    description: "Technical decisions, architecture choices, and the full stack behind Spindare and TravelMe.",
    url: `${BASE}/dev-hub`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KIQA DEV Dev Hub" }],
  },
};

export default function DevHubPage() {
  return <DevHubClient />;
}
