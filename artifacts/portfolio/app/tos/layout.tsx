import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for working with KIQA DEV.",
  alternates: { canonical: "/tos" },
  openGraph: { title: "Terms of Service | KIQA DEV", description: "Terms for working with KIQA DEV.", url: "/tos" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
