import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kristian Gjergji",
  description: "Self-taught freelance developer working between Kosovo and Lecco, Italy. Swift/SwiftUI, React Native, Next.js, Supabase, Rust and Tauri.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Kristian Gjergji | KIQA DEV", description: "Self-taught freelance developer working between Kosovo and Lecco, Italy. Swift/SwiftUI, React Native, Next.js, Supabase, Rust and Tauri.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
