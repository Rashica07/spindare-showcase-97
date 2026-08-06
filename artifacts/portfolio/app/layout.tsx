import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted at build time: no render-blocking request to fonts.googleapis.com
// and no extra DNS/TLS handshakes, which matters most on slow connections.
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
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/Providers";
import { PulseSyncProvider } from "@/components/PulseSyncProvider";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const DESCRIPTION =
  "Freelance developer building mobile apps, landing pages, and web platforms. Fixed price, fixed delivery date.";

const OG_IMAGE = "/opengraph.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://kiqa-dev.it"),
  title: "Kristian Gjergji | Kiqa DEV | Software Engineer",
  description: DESCRIPTION,
  robots: "index, follow",
  openGraph: {
    title: "Kristian Gjergji | Kiqa DEV | Software Engineer",
    description: DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "KIQA DEV",
    images: [{ url: OG_IMAGE, width: 1280, height: 720, alt: "KIQA DEV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Gjergji & KIQA DEV",
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
        <CustomCursor />
        <ScrollProgress />
        <PulseSyncProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </PulseSyncProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
