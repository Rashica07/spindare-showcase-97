import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Mobile apps from €799, landing pages from €299, web platforms from €1,299 and custom backends from €499. Fixed price and a delivery date in writing.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services & Pricing | KIQA DEV", description: "Mobile apps from €799, landing pages from €299, web platforms from €1,299 and custom backends from €499. Fixed price and a delivery date in writing.", url: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
