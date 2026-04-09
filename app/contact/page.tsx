import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Get a Quote or Start a Project",
  alternates: { canonical: "https://kiqa-dev.it/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
