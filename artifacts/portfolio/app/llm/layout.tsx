import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KIQA DEV — Full Portfolio (AI Readable)",
  description: "Complete portfolio content for Kristian (KIQA DEV), full-stack mobile developer specialising in React Native, Supabase, and Clerk. Optimised for AI crawlers and language models.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "KIQA DEV — Full Portfolio (AI Readable)",
    description: "Full-stack mobile developer. React Native, Supabase, Clerk. Spindare & TravelMe.",
  },
};

export default function LLMLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
