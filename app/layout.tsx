import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kristian Gjergji — Developer",
  description:
    "14-year-old self-taught developer from Kosovo. Building Spindare and TravelMe.",
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
    <html
      lang="en"
      className={`${GeistMono.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body>{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
