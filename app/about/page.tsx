import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Kristian Gjergji, Full-Stack Dev",
  alternates: { canonical: "https://kiqa-dev.it/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
