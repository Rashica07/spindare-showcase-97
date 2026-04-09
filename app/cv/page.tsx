import type { Metadata } from "next";
import CVClient from "./CVClient";

export const metadata: Metadata = {
  title: "CV — Kristian Gjergji, Full-Stack Developer",
  description: "Curriculum vitae of Kristian Gjergji — full-stack developer specialising in React Native and Next.js. Experience with Spindare, KIQA DEV, and freelance projects.",
  alternates: { canonical: "https://kiqa-dev.it/cv" },
};

export default function CVPage() {
  return <CVClient />;
}
