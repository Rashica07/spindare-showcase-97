import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description: "Terms for working with KIQA DEV.",
  path: "/tos",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
