import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Kristian Gjergji, Full-Stack Dev",
  description: "Kristian Gjergji is a self-taught full-stack developer from Kosovo & Italy building mobile apps and web platforms. React Native, Next.js, TypeScript, Supabase.",
  alternates: { canonical: "https://kiqa-dev.it/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
