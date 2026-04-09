import type { Metadata } from "next";
import CVClient from "./CVClient";

export const metadata: Metadata = {
  title: "CV — Kristian Gjergji, Full-Stack Developer",
  alternates: { canonical: "https://kiqa-dev.it/cv" },
};

export default function CVPage() {
  return <CVClient />;
}
