import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Get a Quote or Start a Project",
  description: "Get in touch with KIQA DEV. Start a project, request a quote, or ask a question. Based in Lecco, Italy — working worldwide.",
  alternates: { canonical: "https://kiqa-dev.it/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
