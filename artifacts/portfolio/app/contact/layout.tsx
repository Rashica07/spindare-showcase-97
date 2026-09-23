import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Kristian about your project. Reply within 24 hours with a scope, a fixed price and a delivery date.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | KIQA DEV", description: "Tell Kristian about your project. Reply within 24 hours with a scope, a fixed price and a delivery date.", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
