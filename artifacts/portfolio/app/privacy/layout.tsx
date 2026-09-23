import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KIQA DEV handles personal data sent through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | KIQA DEV", description: "How KIQA DEV handles personal data sent through this website.", url: "/privacy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
