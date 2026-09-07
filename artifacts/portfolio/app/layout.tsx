import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Pixelify_Sans } from "next/font/google";
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

// Pixel/blocky display face, used only for the CraftPanel project card's
// title — a Minecraft-look-alike without touching the trademarked font.
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-pixelify",
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

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kristian Gjergji",
    alternateName: "KIQA DEV",
    url: "https://kiqa-dev.it",
    jobTitle: "Freelance Software Developer",
    description: DESCRIPTION,
    worksFor: { "@type": "Organization", name: "KIQA DEV" },
    knowsAbout: ["Swift", "SwiftUI", "iOS Development", "React Native", "Next.js", "TypeScript", "Supabase", "Node.js"],
    knowsLanguage: ["English", "Italian", "Albanian", "German"],
    sameAs: ["https://github.com/rashica07", "https://discord.com/users/871100378299654194"],
    email: "mailto:contact@kiqa-dev.it",
    address: [
      { "@type": "PostalAddress", addressRegion: "Kosovo" },
      { "@type": "PostalAddress", addressLocality: "Lecco", addressCountry: "IT" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "KIQA DEV",
    url: "https://kiqa-dev.it",
    description: DESCRIPTION,
    founder: { "@type": "Person", name: "Kristian Gjergji" },
    areaServed: ["IT", "XK", "Europe"],
    priceRange: "€299-€1,299+",
    email: "contact@kiqa-dev.it",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KIQA DEV",
    url: "https://kiqa-dev.it",
    description: DESCRIPTION,
    inLanguage: ["en", "it", "sq", "de"],
  },
];

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
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${pixelifySans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
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
