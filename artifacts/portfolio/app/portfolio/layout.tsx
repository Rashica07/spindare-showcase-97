import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Kristian Gjergji: CraftPanel, Torre Group, Spindare, LuxHotelSystem and more, with the stack behind each one.",
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Work | KIQA DEV", description: "Selected projects by Kristian Gjergji: CraftPanel, Torre Group, Spindare, LuxHotelSystem and more, with the stack behind each one.", url: "/portfolio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
