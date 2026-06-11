import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kristian & KIQA DEV Portfolio",
  description: "Kristian & KIQA DEV — Mobile apps, websites, and web platforms built to perform.",
  robots: "index, follow",
  openGraph: {
    title: "Kristian & KIQA DEV Portfolio",
    description: "Mobile apps, websites, and web platforms built to perform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian & KIQA DEV Portfolio",
    description: "Mobile apps, websites, and web platforms built to perform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
