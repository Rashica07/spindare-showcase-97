import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — About Kristian Gjergji" }];

export const metadata: Metadata = {
  title: "About — Kristian Gjergji, Full-Stack Dev",
  description: "Kristian Gjergji is a self-taught full-stack developer from Kosovo & Italy building mobile apps and web platforms. React Native, Next.js, TypeScript, Supabase.",
  alternates: { canonical: "https://kiqa-dev.it/about" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function AboutPage() {
  return <AboutClient />;
}
