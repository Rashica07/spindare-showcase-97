import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Kristian Gjergji",
  description: "Self-taught freelance developer working between Kosovo and Lecco, Italy. Swift/SwiftUI, React Native, Next.js, Supabase, Rust and Tauri.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
