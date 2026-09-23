import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes from real projects: debugging, architecture decisions and trade-offs from apps and platforms Kristian has built.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Writing | KIQA DEV", description: "Notes from real projects: debugging, architecture decisions and trade-offs from apps and platforms Kristian has built.", url: "/blog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
