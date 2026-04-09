import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — Portfolio" }];

export const metadata: Metadata = {
  title: "Portfolio — Projects by Kristian Gjergji",
  description: "Real projects built by Kristian Gjergji — Spindare, TravelMe and more. Full-stack mobile and web development with React Native, Next.js, and Supabase.",
  alternates: { canonical: "https://kiqa-dev.it/portfolio" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
