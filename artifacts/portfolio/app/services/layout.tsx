import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services & Pricing",
  description: "Mobile apps from €799, landing pages from €299, web platforms from €1,299 and custom backends from €499. Fixed price and a delivery date in writing.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
