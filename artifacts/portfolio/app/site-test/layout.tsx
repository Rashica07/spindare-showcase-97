import type { Metadata } from "next";

// Design preview served at test.kiqa-dev.it. Not meant to be indexed, on
// either the subdomain or kiqa-dev.it/site-test.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
