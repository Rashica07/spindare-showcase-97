import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE = "https://kiqa-dev.it";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Full-Stack Developer | Mobile Apps & Web Platforms",
    template: "%s | KIQA DEV",
  },
  description:
    "Professional mobile app and web development services by Kristian Gjergji. React Native, Next.js, TypeScript, Supabase. Based in Kosovo & Italy.",
  keywords: [
    "mobile app development", "web development", "React Native", "Next.js",
    "TypeScript", "Supabase", "UI/UX design", "Kosovo developer", "freelance developer",
    "KIQA DEV", "Kristian Gjergji",
  ],
  authors: [{ name: "Kristian Gjergji", url: BASE }],
  creator: "Kristian Gjergji",
  publisher: "KIQA DEV",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE", "it_IT", "sq_AL"],
    url: BASE,
    siteName: "KIQA DEV",
    title: "Full-Stack Developer | Mobile Apps & Web Platforms",
    description: "Professional mobile app and web development services. React Native, Next.js, TypeScript. Based in Kosovo & Italy.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KIQA DEV" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kristiangjergj4",
    creator: "@kristiangjergj4",
    title: "Full-Stack Developer | Mobile Apps & Web Platforms",
    description: "Professional mobile app and web development services by Kristian Gjergji.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "512x512" }],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: BASE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#080808" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "KIQA DEV",
          "url": "https://kiqa-dev.it",
          "description": "Professional development services by Kristian Gjergji. Mobile app and web development using React Native, Next.js, TypeScript, Supabase. Based in Kosovo & Italy.",
          "founder": { "@type": "Person", "name": "Kristian Gjergji", "jobTitle": "Full-stack Developer", "url": "https://kiqa-dev.it" }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Kristian Gjergji",
          "givenName": "Kristian",
          "familyName": "Gjergji",
          "jobTitle": "Full-stack Developer",
          "url": "https://kiqa-dev.it",
          "description": "Professional mobile app and web development services. Based in Kosovo & Italy. Technologies include React Native, Next.js, TypeScript, Supabase.",
          "worksFor": { "@type": "Organization", "name": "KIQA DEV" }
        })}} />
      </head>
      <body>
        <LanguageProvider>
          <Nav />
          <main className="site-main">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
