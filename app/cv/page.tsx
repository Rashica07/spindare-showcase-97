import type { Metadata } from "next";
import CVClient from "./CVClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — CV of Kristian Gjergji" }];

export const metadata: Metadata = {
  title: "CV — Kristian Gjergji, Full-Stack Developer",
  description: "Curriculum vitae of Kristian Gjergji — full-stack developer specialising in React Native and Next.js. Experience with Spindare, KIQA DEV, and freelance projects.",
  alternates: { canonical: "https://kiqa-dev.it/cv" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function CVPage() {
  return <CVClient />;
}
