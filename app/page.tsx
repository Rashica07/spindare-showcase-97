import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — Full-Stack Developer" }];

export const metadata: Metadata = {
  alternates: { canonical: "https://kiqa-dev.it" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function HomePage() {
  return <HomeClient />;
}
