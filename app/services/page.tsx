import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — Development Services" }];

export const metadata: Metadata = {
  title: "Development Services — Mobile Apps & Web",
  description: "Custom mobile app and web development services by Kristian Gjergji. React Native, Next.js, TypeScript, Supabase — end-to-end, one developer, full ownership.",
  alternates: { canonical: "https://kiqa-dev.it/services" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
