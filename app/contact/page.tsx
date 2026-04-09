import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const OG = [{ url: "https://kiqa-dev.it/og-image.png", width: 1200, height: 630, alt: "KIQA DEV — Contact" }];

export const metadata: Metadata = {
  title: "Contact — Get a Quote or Start a Project",
  description: "Get in touch with KIQA DEV. Start a project, request a quote, or ask a question. Based in Lecco, Italy — working worldwide.",
  alternates: { canonical: "https://kiqa-dev.it/contact" },
  openGraph: { images: OG },
  twitter: { images: ["https://kiqa-dev.it/og-image.png"] },
};

export default function ContactPage() {
  return <ContactClient />;
}
