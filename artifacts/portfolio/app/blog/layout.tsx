import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Writing",
  description: "Notes from real projects: debugging, architecture decisions and trade-offs from apps and platforms Kristian has built.",
  path: "/blog",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
