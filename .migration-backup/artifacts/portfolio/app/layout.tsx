import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
