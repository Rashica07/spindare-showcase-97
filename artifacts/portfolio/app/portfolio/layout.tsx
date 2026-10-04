import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description: "Selected projects by Kristian Gjergji: CraftPanel, Torre Group, Spindare, LuxHotelSystem and more, with the stack behind each one.",
  path: "/portfolio",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
