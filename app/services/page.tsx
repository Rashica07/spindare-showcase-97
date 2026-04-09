import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Development Services — Mobile Apps & Web",
  description: "Custom mobile app and web development services by Kristian Gjergji. React Native, Next.js, TypeScript, Supabase — end-to-end, one developer, full ownership.",
  alternates: { canonical: "https://kiqa-dev.it/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
