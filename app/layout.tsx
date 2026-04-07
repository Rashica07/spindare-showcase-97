import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kristian Gjergji — Developer",
  description:
    "14-year-old self-taught developer from Albania. Building Spindare and TravelMe.",
  authors: [{ name: "Kristian Gjergji" }],
  creator: "Kristian Gjergji",
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    site: "@kristiangjergj4",
    creator: "@kristiangjergj4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
