import type { Metadata } from "next";
import "./redesign.css";

// Design previews of the feedback pass. Not part of the real site.
export const metadata: Metadata = {
  title: "Redesign previews",
  robots: { index: false, follow: false },
};

export default function RedesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
