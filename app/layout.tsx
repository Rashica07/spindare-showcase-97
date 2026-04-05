import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.REPLIT_DOMAINS
  ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
  : "https://kiqa-dev.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kristian Gjergji — Full-Stack Developer & App Builder",
  description:
    "14-year-old self-taught developer known as rashica07. Building Spindare and TravelMe — specialising in TypeScript, React Native, Next.js, Node.js, and more.",
  keywords: [
    "Kristian Gjergji",
    "rashica07",
    "kiqa-dev",
    "developer portfolio",
    "react native developer",
    "full stack developer",
    "spindare",
    "travelme",
    "young developer",
    "typescript developer",
  ],
  authors: [{ name: "Kristian Gjergji", url: "https://kiqa-dev.replit.app" }],
  creator: "Kristian Gjergji",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://kiqa-dev.it",
    title: "Kristian Gjergji — Full-Stack Developer & App Builder",
    description:
      "14-year-old developer building incredible digital experiences across mobile, web, and beyond. Creator of Spindare & TravelMe.",
    siteName: "kiqa-dev",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kristiangjergj4",
    creator: "@kristiangjergj4",
    title: "Kristian Gjergji — Full-Stack Developer",
    description: "14-year-old dev from Albania. Building Spindare & TravelMe — mobile apps that actually ship.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head />
      <body>
        {/* Clears URL hash before browser scrolls to it — runs during HTML parsing, before DOMContentLoaded */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `(function(){try{if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}}catch(e){}})();` }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ScrollProgress />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
