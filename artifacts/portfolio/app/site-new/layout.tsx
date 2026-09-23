import type { Metadata } from "next";

// Design preview served at new.kiqa-dev.it. Not meant to be indexed, on
// either the subdomain or kiqa-dev.it/site-new.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
